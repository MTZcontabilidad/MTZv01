/* ===================================
   Cube.js - Versión Optimizada y Funcional
   =================================== */

// Variables globales
let scene, camera, renderer;
let cube, cubeGroup;
let raycaster, mouse;
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Información de cada cara del cubo
const faceInfo = {
    0: {
        title: "Enlaces Rápidos",
        content: "Portal de acceso instantáneo a todos los organismos fiscales. Conexión directa con SII y servicios tributarios.",
        link: "modules/MTZ-01_Enlaces_Rapidos.html",
        icon: "🔗",
        color: "#00d4ff"
    },
    1: {
        title: "Documentos RRHH",
        content: "Generación automática de documentos laborales con IA. Contratos y certificados con formato profesional.",
        link: "modules/MTZ-02_Documentos_RRHH.html",
        icon: "📄",
        color: "#00ff88"
    },
    2: {
        title: "Calculadoras Tributarias",
        content: "Procesamiento avanzado de cálculos tributarios. IVA, retenciones y honorarios con precisión absoluta.",
        link: "modules/MTZ-03_Calculadoras_Tributarias.html",
        icon: "🧮",
        color: "#ff6600"
    },
    3: {
        title: "Formularios Dinámicos",
        content: "Sistema inteligente de generación de formularios. Cotizaciones procesadas automáticamente.",
        link: "modules/MTZ-04_Formularios_Contacto.html",
        icon: "📝",
        color: "#ff00ff"
    },
    4: {
        title: "Fundación TQF",
        content: "Red neuronal social. Tu uso de estas herramientas impulsa el transporte para personas con discapacidad.",
        link: "#fundacion",
        icon: "❤️",
        color: "#ff0080"
    },
    5: {
        title: "Portal de Contacto",
        content: "Canal de comunicación directa para servicios tributarios personalizados y asistencia profesional.",
        link: "#contacto",
        icon: "📞",
        color: "#8000ff"
    }
};

// Crear cubo interactivo funcional
function createFuturisticCube() {
    // Limpiar cubo existente si hay uno
    if (cube) {
        cubeGroup.remove(cube);
    }

    // Geometría del cubo con bordes redondeados
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5, 2, 2, 2);
    
    // Material base del cubo
    const baseMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0a0a0a,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7,
        envMapIntensity: 1
    });

    // Crear el cubo principal
    cube = new THREE.Mesh(geometry, baseMaterial);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cubeGroup.add(cube);

    // Agregar caras interactivas con colores
    addInteractiveFaces();

    // Agregar wireframe brillante
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        linewidth: 2,
        transparent: true,
        opacity: 0.6
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube.add(wireframe);

    // Agregar glow al cubo
    addCubeGlow();
}

// Agregar caras interactivas
function addInteractiveFaces() {
    const facePositions = [
        { pos: [0, 0, 1.26], rot: [0, 0, 0] },         // Frente
        { pos: [0, 0, -1.26], rot: [0, Math.PI, 0] }, // Atrás
        { pos: [1.26, 0, 0], rot: [0, Math.PI/2, 0] }, // Derecha
        { pos: [-1.26, 0, 0], rot: [0, -Math.PI/2, 0] }, // Izquierda
        { pos: [0, 1.26, 0], rot: [-Math.PI/2, 0, 0] }, // Arriba
        { pos: [0, -1.26, 0], rot: [Math.PI/2, 0, 0] }  // Abajo
    ];

    Object.keys(faceInfo).forEach((key, index) => {
        const info = faceInfo[key];
        const planeGeometry = new THREE.PlaneGeometry(2.4, 2.4);
        
        // Canvas para crear textura con icono
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Fondo con gradiente
        const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
        gradient.addColorStop(0, info.color + '33');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        
        // Icono central
        ctx.font = '120px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = info.color;
        ctx.fillText(info.icon, 256, 256);
        
        // Crear textura
        const texture = new THREE.CanvasTexture(canvas);
        
        // Material de la cara
        const faceMaterial = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: new THREE.Color(info.color),
            emissive: new THREE.Color(info.color),
            emissiveIntensity: 0.1,
            metalness: 0.8,
            roughness: 0.2,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        
        const face = new THREE.Mesh(planeGeometry, faceMaterial);
        face.position.set(...facePositions[index].pos);
        face.rotation.set(...facePositions[index].rot);
        face.userData = {
            faceIndex: index,
            clickable: true,
            originalEmissive: 0.1,
            originalOpacity: 0.3
        };
        
        cube.add(face);
    });
}

// Agregar efecto glow al cubo
function addCubeGlow() {
    const glowGeometry = new THREE.BoxGeometry(2.8, 2.8, 2.8);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.05,
        side: THREE.BackSide
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    cubeGroup.add(glowMesh);
}

// Manejar interacciones del mouse
function setupMouseControls() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer.domElement.addEventListener('mousedown', onMouseDown, false);
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('mouseup', onMouseUp, false);
    renderer.domElement.addEventListener('click', onMouseClick, false);
    
    // Touch events para móviles
    renderer.domElement.addEventListener('touchstart', onTouchStart, false);
    renderer.domElement.addEventListener('touchmove', onTouchMove, false);
    renderer.domElement.addEventListener('touchend', onTouchEnd, false);
}

function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseMove(event) {
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        targetRotation.y += deltaMove.x * 0.005;
        targetRotation.x += deltaMove.y * 0.005;

        previousMousePosition = {
            x: event.clientX,
            y: event.clientY
        };
    }

    // Actualizar posición del mouse para hover
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    checkHover();
}

function onMouseUp() {
    isDragging = false;
}

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cube.children, false);

    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject.userData.clickable) {
            const faceIndex = clickedObject.userData.faceIndex;
            const info = faceInfo[faceIndex];
            
            // Efecto visual
            animateFaceClick(clickedObject);
            
            // Mostrar información
            showInfo(info);
        }
    }
}

// Touch events
function onTouchStart(event) {
    if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    }
}

function onTouchMove(event) {
    if (isDragging && event.touches.length === 1) {
        const deltaMove = {
            x: event.touches[0].clientX - previousMousePosition.x,
            y: event.touches[0].clientY - previousMousePosition.y
        };

        targetRotation.y += deltaMove.x * 0.005;
        targetRotation.x += deltaMove.y * 0.005;

        previousMousePosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        };
    }
}

function onTouchEnd() {
    isDragging = false;
}

// Verificar hover
function checkHover() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cube.children, false);

    // Resetear todas las caras
    cube.children.forEach(child => {
        if (child.material && child.userData.originalEmissive !== undefined) {
            child.material.emissiveIntensity = child.userData.originalEmissive;
            child.material.opacity = child.userData.originalOpacity;
        }
    });

    // Iluminar cara en hover
    if (intersects.length > 0) {
        const hoveredObject = intersects[0].object;
        if (hoveredObject.userData.clickable) {
            hoveredObject.material.emissiveIntensity = 0.5;
            hoveredObject.material.opacity = 0.6;
            document.body.style.cursor = 'pointer';
        }
    } else {
        document.body.style.cursor = 'default';
    }
}

// Animar click en cara
function animateFaceClick(face) {
    const originalScale = face.scale.clone();
    const duration = 300;
    const startTime = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Efecto de pulso
        const scale = 1 + Math.sin(progress * Math.PI) * 0.2;
        face.scale.set(scale, scale, 1);
        
        // Flash de luz
        face.material.emissiveIntensity = 0.1 + Math.sin(progress * Math.PI) * 0.7;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            face.scale.copy(originalScale);
            face.material.emissiveIntensity = face.userData.originalEmissive;
        }
    };
    
    animate();
}

// Mostrar información de la cara clickeada
function showInfo(info) {
    const panel = document.getElementById('infoPanel');
    const icon = document.getElementById('infoIcon');
    const title = document.getElementById('infoTitle');
    const content = document.getElementById('infoContent');
    const button = document.getElementById('actionButton');

    icon.textContent = info.icon;
    title.textContent = info.title;
    content.textContent = info.content;
    button.href = info.link;

    panel.classList.add('active');
    
    // Auto-ocultar después de 8 segundos
    setTimeout(() => {
        panel.classList.remove('active');
    }, 8000);
}

// Exportar funciones necesarias
window.createFuturisticCube = createFuturisticCube;
window.setupMouseControls = setupMouseControls;