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

// Crear textura personalizada para cada cara
function createFaceTexture(faceData, index) {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Fondo con gradiente radial
    const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    gradient.addColorStop(0, faceData.color + '80');
    gradient.addColorStop(0.7, faceData.color + '40');
    gradient.addColorStop(1, faceData.color + '20');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Patrón de grid sutil
    ctx.strokeStyle = faceData.color + '30';
    ctx.lineWidth = 1;
    const gridSize = size / 16;
    
    for (let i = 0; i <= 16; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, size);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(size, i * gridSize);
        ctx.stroke();
    }
    
    // Círculo central con borde brillante
    const center = size / 2;
    ctx.beginPath();
    ctx.arc(center, center, size * 0.25, 0, Math.PI * 2);
    ctx.strokeStyle = faceData.color;
    ctx.lineWidth = 6;
    ctx.stroke();
    
    // Círculo interior
    ctx.beginPath();
    ctx.arc(center, center, size * 0.22, 0, Math.PI * 2);
    ctx.strokeStyle = faceData.color + 'AA';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Emoji con sombra
    const emojiSize = size * 0.12;
    ctx.font = `bold ${emojiSize}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Sombra del emoji
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText(faceData.emoji, center + 3, center + 3);
    
    // Emoji principal
    ctx.fillStyle = '#ffffff';
    ctx.fillText(faceData.emoji, center, center);
    
    // Título con mejor tipografía
    const titleSize = size * 0.05;
    ctx.font = `bold ${titleSize}px Arial, sans-serif`;
    ctx.fillStyle = faceData.color;
    ctx.fillText(faceData.title, center, center + size * 0.35);
    
    return canvas;
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

        // Sistema de luces mejorado
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);
        
        // Luz principal
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
        mainLight.position.set(10, 10, 5);
        scene.add(mainLight);
        
        // Luces de colores para efectos
        const colorLights = [
            { color: 0x00d4ff, position: [8, 0, 0] },
            { color: 0x00ff88, position: [-8, 0, 0] },
            { color: 0xff6600, position: [0, 8, 0] },
            { color: 0x25D366, position: [0, -8, 0] }
        ];
        
        colorLights.forEach(lightData => {
            const light = new THREE.PointLight(lightData.color, 0.5, 20);
            light.position.set(...lightData.position);
            scene.add(light);
        });

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
        
        // Agregar partículas de fondo
        createStarField();
        
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

// Crear cubo con materiales mejorados y efectos visuales
function createBasicCube() {
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const materials = [];
    
    // Crear material para cada cara en el orden correcto
    // Three.js usa: +X, -X, +Y, -Y, +Z, -Z
    const faceOrder = [0, 1, 2, 3, 4, 5]; // SII, PREVIRED, DT, TESORERIA, TQF, MTZ
    
    for (let i = 0; i < 6; i++) {
        const faceData = faceInfo[faceOrder[i]];
        
        // Crear canvas para cada cara con diseño mejorado
        const canvas = createFaceTexture(faceData, i);
        const texture = new THREE.CanvasTexture(canvas);
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        
        const material = new THREE.MeshPhongMaterial({
            map: texture,
            color: new THREE.Color(faceData.color),
            transparent: true,
            opacity: 0.95,
            shininess: 30,
            specular: 0x222222
        });
        materials.push(material);
    }
    
    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Agregar wireframe sutil
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube.add(wireframe);
}

// Crear campo de estrellas de fondo
function createStarField() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    const starColors = [
        [1, 1, 1],      // Blanco
        [0.8, 0.9, 1],  // Azul claro
        [1, 0.9, 0.8],  // Amarillo suave
        [0.9, 0.8, 1],  // Violeta suave
        [0.8, 1, 0.9]   // Verde suave
    ];
    
    for (let i = 0; i < starCount; i++) {
        // Posiciones aleatorias en una esfera
        const radius = 30 + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Colores aleatorios
        const colorIndex = Math.floor(Math.random() * starColors.length);
        colors[i * 3] = starColors[colorIndex][0];
        colors[i * 3 + 1] = starColors[colorIndex][1];
        colors[i * 3 + 2] = starColors[colorIndex][2];
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Guardar referencia para animación
    window.stars = stars;
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

// Mostrar panel de información con estándar mundial
function showInfoPanel(faceData) {
    const infoPanel = document.getElementById('infoPanel');
    const panelOverlay = document.getElementById('panelOverlay');
    const infoIcon = document.getElementById('infoIcon');
    const infoTitle = document.getElementById('infoTitle');
    const infoContent = document.getElementById('infoContent');
    const actionButton = document.getElementById('actionButton');
    const closeButton = document.getElementById('closeButton');
    const closePanel = document.getElementById('closePanel');
    
    if (infoPanel && panelOverlay && infoIcon && infoTitle && infoContent && actionButton) {
        // Configurar contenido
        infoIcon.textContent = faceData.emoji;
        infoTitle.textContent = faceData.title;
        infoContent.textContent = faceData.content;
        
        // Configurar botón principal
        actionButton.onclick = () => {
            if (faceData.link && faceData.link !== '#fundacion') {
                window.open(faceData.link, '_blank');
                hideInfoPanel();
            }
        };
        
        // Configurar botones de cerrar
        const hidePanel = () => hideInfoPanel();
        if (closeButton) closeButton.onclick = hidePanel;
        if (closePanel) closePanel.onclick = hidePanel;
        if (panelOverlay) panelOverlay.onclick = hidePanel;
        
        // Mostrar panel con overlay
        panelOverlay.classList.add('active');
        infoPanel.classList.add('active');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        console.log('📋 Panel de información mostrado:', faceData.title);
    }
}

// Ocultar panel de información
function hideInfoPanel() {
    const infoPanel = document.getElementById('infoPanel');
    const panelOverlay = document.getElementById('panelOverlay');
    
    if (infoPanel && panelOverlay) {
        infoPanel.classList.remove('active');
        panelOverlay.classList.remove('active');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
        
        console.log('❌ Panel de información cerrado');
    }
}

// Cerrar panel con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        hideInfoPanel();
    }
});

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
        
        // Efecto de pulsación sutil en el cubo
        const time = Date.now() * 0.001;
        cube.scale.setScalar(1 + Math.sin(time * 2) * 0.02);
    }
    
    // Animar estrellas de fondo
    if (window.stars) {
        window.stars.rotation.y += 0.0005;
        window.stars.rotation.x += 0.0002;
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
console.log('✅ MTZ Cubo 3D - Código cargado');