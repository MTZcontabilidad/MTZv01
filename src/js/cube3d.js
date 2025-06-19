/* ===========================================
   CUBO MTZ - VERSIÓN LIMPIA Y BÁSICA
   Solo cubo funcional - Base para mejoras
   =========================================== */

// Variables globales básicas
let scene, camera, renderer, cube;
let raycaster, mouse;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };

console.log('🎯 MTZ Cubo 3D - Inicializando');

// Información de cada cara del cubo
const faceInfo = {
    0: { title: "SII CHILE", content: "Servicio de Impuestos Internos", link: "https://www.sii.cl", color: "#00d4ff", emoji: "🏛️" },
    1: { title: "PREVIRED", content: "Cotizaciones previsionales", link: "https://www.previred.com", color: "#00ff88", emoji: "💰" },
    2: { title: "DIRECCIÓN DEL TRABAJO", content: "Legislación laboral", link: "https://www.dt.gob.cl", color: "#ff6600", emoji: "⚖️" },
    3: { title: "TESORERÍA GENERAL", content: "Pagos fiscales", link: "https://www.tesoreria.cl", color: "#00ccff", emoji: "💸" },
    4: { title: "FUNDACIÓN TQF", content: "Transporte inclusivo", link: "#fundacion", color: "#ff0080", emoji: "🚚" },
    5: { title: "CONTACTO MTZ", content: "Asesoría tributaria WhatsApp", link: "https://wa.me/56990062213?text=Hola,%20necesito%20asesoría%20tributaria", color: "#25D366", emoji: "📱" }
};

// Detectar si es móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Inicializar Three.js básico
function initThreeJS() {
    try {
        const container = document.getElementById('canvas-container');
        if (!container) {
            throw new Error('Canvas container not found');
        }

        // Crear escena
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000511);

        // Añadir luces básicas
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Crear cámara
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 8);

        // Crear renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Crear cubo básico
        createBasicCube();
        
        // Configurar controles
        setupControls();
        
        // Iniciar animación
        animate();
        
        console.log('✅ Cubo 3D inicializado correctamente');
        
        // Notificar que está listo
        document.dispatchEvent(new CustomEvent('cubeReady'));
        
    } catch (error) {
        console.error('❌ Error inicializando cubo:', error);
    }
}

// Crear cubo básico con materiales simples
function createBasicCube() {
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const materials = [];
    
    // Crear material para cada cara en el orden correcto
    // Three.js usa: +X, -X, +Y, -Y, +Z, -Z
    const faceOrder = [0, 1, 2, 3, 4, 5]; // SII, PREVIRED, DT, TESORERIA, TQF, MTZ
    
    for (let i = 0; i < 6; i++) {
        const faceData = faceInfo[faceOrder[i]];
        const material = new THREE.MeshLambertMaterial({
            color: faceData.color,
            transparent: true,
            opacity: 0.9
        });
        materials.push(material);
    }
    
    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    

}

// Configurar controles básicos
function setupControls() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    const canvas = renderer.domElement;
    
    if (isMobile()) {
        // Controles táctiles
        canvas.addEventListener('touchstart', onTouchStart, { passive: false });
        canvas.addEventListener('touchmove', onTouchMove, { passive: false });
        canvas.addEventListener('touchend', onTouchEnd, { passive: false });
    } else {
        // Controles de mouse
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('wheel', onWheel, { passive: false });
        canvas.addEventListener('click', onClick);
    }
}

// Eventos de mouse
function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onMouseMove(event) {
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };
        
        targetRotation.y += deltaMove.x * 0.01;
        targetRotation.x += deltaMove.y * 0.01;
        
        previousMousePosition = { x: event.clientX, y: event.clientY };
    }
}

function onMouseUp() {
    isDragging = false;
}

function onWheel(event) {
    event.preventDefault();
    const zoomSpeed = 0.1;
    camera.position.z += event.deltaY * zoomSpeed * 0.01;
    camera.position.z = Math.max(4, Math.min(20, camera.position.z));
}

function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);
    
    if (intersects.length > 0) {
        // Calcular el índice de la cara basado en faceIndex
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        
        if (faceIndex >= 0 && faceIndex < 6) {
            const faceData = faceInfo[faceIndex];

            showInfoPanel(faceData);
        }
    }
}

// Variables táctiles
let initialDistance = 0;
let lastTouchPosition = { x: 0, y: 0 };

// Eventos táctiles
function onTouchStart(event) {
    event.preventDefault();
    
    if (event.touches.length === 2) {
        // Zoom con dos dedos
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        initialDistance = Math.sqrt(dx * dx + dy * dy);
    } else if (event.touches.length === 1) {
        // Rotación con un dedo
        const touch = event.touches[0];
        lastTouchPosition = { x: touch.clientX, y: touch.clientY };
        isDragging = true;
    }
}

function onTouchMove(event) {
    event.preventDefault();
    
    if (event.touches.length === 2 && initialDistance > 0) {
        // Zoom
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        
        const zoomRatio = currentDistance / initialDistance;
        const zoomDelta = zoomRatio - 1;
        camera.position.z -= zoomDelta * 2;
        camera.position.z = Math.max(4, Math.min(20, camera.position.z));
        
        initialDistance = currentDistance;
    } else if (event.touches.length === 1 && isDragging) {
        // Rotación
        const touch = event.touches[0];
        const deltaMove = {
            x: touch.clientX - lastTouchPosition.x,
            y: touch.clientY - lastTouchPosition.y
        };
        
        targetRotation.y += deltaMove.x * 0.01;
        targetRotation.x += deltaMove.y * 0.01;
        
        lastTouchPosition = { x: touch.clientX, y: touch.clientY };
    }
}

function onTouchEnd(event) {
    event.preventDefault();
    isDragging = false;
    initialDistance = 0;
    
    // Click en táctil
    if (event.changedTouches.length === 1) {
        const touch = event.changedTouches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(cube);
        
        if (intersects.length > 0) {
            // Calcular el índice de la cara basado en faceIndex
            const faceIndex = Math.floor(intersects[0].faceIndex / 2);
            
            if (faceIndex >= 0 && faceIndex < 6) {
                const faceData = faceInfo[faceIndex];

                showInfoPanel(faceData);
            }
        }
    }
}

// Mostrar panel de información
function showInfoPanel(faceData) {
    const infoPanel = document.getElementById('infoPanel');
    const infoIcon = document.getElementById('infoIcon');
    const infoTitle = document.getElementById('infoTitle');
    const infoContent = document.getElementById('infoContent');
    const actionButton = document.getElementById('actionButton');
    
    if (infoPanel && infoIcon && infoTitle && infoContent && actionButton) {
        infoIcon.textContent = faceData.emoji;
        infoTitle.textContent = faceData.title;
        infoContent.textContent = faceData.content;
        
        actionButton.onclick = () => {
            if (faceData.link && faceData.link !== '#fundacion') {
                window.open(faceData.link, '_blank');
            }
        };
        
        infoPanel.classList.add('active');
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            infoPanel.classList.remove('active');
        }, 5000);
    }
}

// Bucle de animación
function animate() {
    requestAnimationFrame(animate);
    
    // Suavizar rotación
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;
    
    if (cube) {
        cube.rotation.x = currentRotation.x;
        cube.rotation.y = currentRotation.y;
        
        // Rotación automática muy sutil si no se está arrastrando
        if (!isDragging) {
            cube.rotation.y += 0.003; // Rotación muy lenta
        }
    }
    
    renderer.render(scene, camera);
}

// Manejar redimensionamiento
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleResize);

// Función principal de inicialización
function startCube() {
    console.log('🚀 Iniciando cubo 3D...');
    
    if (typeof THREE === 'undefined') {
        console.error('❌ THREE.js no disponible');
        return false;
    }
    
    try {
        initThreeJS();
        console.log('✅ Cubo 3D listo');
        return true;
    } catch (error) {
        console.error('❌ Error iniciando cubo:', error);
        return false;
    }
}

console.log('✅ MTZ Cubo 3D - Código cargado');