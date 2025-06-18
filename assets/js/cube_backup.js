/* BACKUP ORIGINAL - cube.js */
/* ===================================
   Lógica del Cubo 3D
   =================================== */

// Variables globales
let scene, camera, renderer;
let cube, cubeGroup;
let raycaster, mouse;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
let glowMeshes = [];

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
        icon: "📋",
        color: "#00ff88"
    },
    2: {
        title: "Calculadoras Cuánticas",
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

// Crear geometría redondeada
function createRoundedBoxGeometry(width, height, depth, radius, smoothness) {
    const shape = new THREE.Shape();
    const eps = 0.00001;
    const radius0 = radius - eps;
    
    shape.absarc(radius0, radius0, radius0, -Math.PI / 2, -Math.PI, true);
    shape.absarc(radius0, height - radius * 2 + radius0, radius0, Math.PI, Math.PI / 2, true);
    shape.absarc(width - radius * 2 + radius0, height - radius * 2 + radius0, radius0, Math.PI / 2, 0, true);
    shape.absarc(width - radius * 2 + radius0, radius0, radius0, 0, -Math.PI / 2, true);
    
    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: depth - radius * 2,
        bevelEnabled: true,
        bevelSegments: smoothness * 2,
        steps: 1,
        bevelSize: radius,
        bevelThickness: radius,
        curveSegments: smoothness
    });
    
    geometry.center();
    return geometry;
}

// Crear cubo futurista
function createFuturisticCube() {
    // Geometría redondeada
    const geometry = createRoundedBoxGeometry(2.5, 2.5, 2.5, 0.3, 12);
    
    // Material principal
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        reflectivity: 1,
        envMapIntensity: 2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
    });

    // Crear el cubo principal
    cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cubeGroup.add(cube);

    // Agregar caras con colores
    addColoredFaces(geometry);

    // Wireframe holográfico
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        linewidth: 2,
        transparent: true,
        opacity: 0.6
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    cube.add(wireframe);

    // Múltiples capas de glow
    for (let i = 1; i <= 3; i++) {
        const glowScale = 1 + (i * 0.08);
        const glowGeometry = createRoundedBoxGeometry(
            2.5 * glowScale, 
            2.5 * glowScale, 
            2.5 * glowScale, 
            0.3, 
            8
        );
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: i === 1 ? 0x00d4ff : i === 2 ? 0x0088ff : 0x0044ff,
            transparent: true,
            opacity: 0.15 / i,
            side: THREE.BackSide
        });
        const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
        cubeGroup.add(glowMesh);
        glowMeshes.push(glowMesh);
    }

    // Agregar iconos flotantes
    addFloatingIcons();

    // Sin anillos orbitales para mantenerlo más limpio
    // createOrbitalRings();
}

// Agregar caras coloreadas
function addColoredFaces(geometry) {
    const faceColors = [
        0x00d4ff, // Cyan
        0x00ff88, // Verde
        0xff6600, // Naranja
        0xff00ff, // Magenta
        0xff0080, // Rosa
        0x8000ff  // Púrpura
    ];

    const planeSize = 2.3;
    const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
    
    const positions = [
        { pos: [0, 0, 1.25], rot: [0, 0, 0] },           // Frente
        { pos: [0, 0, -1.25], rot: [0, Math.PI, 0] },   // Atrás
        { pos: [1.25, 0, 0], rot: [0, Math.PI/2, 0] },  // Derecha
        { pos: [-1.25, 0, 0], rot: [0, -Math.PI/2, 0] },// Izquierda
        { pos: [0, 1.25, 0], rot: [-Math.PI/2, 0, 0] }, // Arriba
        { pos: [0, -1.25, 0], rot: [Math.PI/2, 0, 0] }  // Abajo
    ];

    positions.forEach((config, index) => {
        const planeMaterial = new THREE.MeshPhysicalMaterial({
            color: faceColors[index],
            emissive: faceColors[index],
            emissiveIntensity: 0.1,
            metalness: 0.8,
            roughness: 0.2,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });

        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(...config.pos);
        plane.rotation.set(...config.rot);
        plane.userData.faceIndex = index;
        plane.userData.clickable = true;
        cube.add(plane);
    });
}

// Agregar iconos flotantes (solo visuales, no clicables)
function addFloatingIcons() {
    const iconPositions = [
        { x: 0, y: 0, z: 1.6 },      // Frente
        { x: 0, y: 0, z: -1.6 },     // Atrás
        { x: 1.6, y: 0, z: 0 },      // Derecha
        { x: -1.6, y: 0, z: 0 },     // Izquierda
        { x: 0, y: 1.6, z: 0 },      // Arriba
        { x: 0, y: -1.6, z: 0 }      // Abajo
    ];

    Object.keys(faceInfo).forEach((key, index) => {
        // Crear solo sprites de iconos, no esferas clicables
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const context = canvas.getContext('2d');
        
        // Fondo circular con gradiente
        const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 100);
        gradient.addColorStop(0, faceInfo[key].color + '66');
        gradient.addColorStop(1, 'transparent');
        context.fillStyle = gradient;
        context.arc(128, 128, 100, 0, Math.PI * 2);
        context.fill();
        
        // Icono
        context.font = 'bold 120px Arial';
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(faceInfo[key].icon, 128, 128);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: texture,
            transparent: true,
            opacity: 0.9
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.8, 0.8, 0.8);
        sprite.position.copy(iconPositions[index]);
        sprite.userData.faceIndex = index;
        cubeGroup.add(sprite);
    });
}

// Crear anillos orbitales
function createOrbitalRings() {
    const ringConfigs = [
        { radius: 3.5, thickness: 0.02, color: 0x00d4ff, speed: 0.01 },
        { radius: 4, thickness: 0.015, color: 0xff0080, speed: -0.008 },
        { radius: 4.5, thickness: 0.01, color: 0x00ff88, speed: 0.005 }
    ];

    ringConfigs.forEach((config, index) => {
        const ringGeometry = new THREE.TorusGeometry(
            config.radius, 
            config.thickness, 
            8, 
            64
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: config.color,
            transparent: true,
            opacity: 0.3
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        
        ring.rotation.x = (Math.PI / 3) * index;
        ring.rotation.y = (Math.PI / 4) * index;
        
        ring.userData.speed = config.speed;
        ring.userData.axis = index;
        cubeGroup.add(ring);
    });
}

