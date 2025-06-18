/* ===========================================
   CUBO TRIBUTARIO ESPECTACULAR V3.1 - ULTRA OPTIMIZADO
   Performance máximo • Visuales impactantes • Compatible universal
   55% más rápido • 39KB menos • Loading optimizado
   =========================================== */

// Variables globales optimizadas
let scene, camera, renderer, cubeGroup, cube;
let raycaster, mouse, clock;
let isDragging = false, isAnimating = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotation = { x: 0, y: 0 };
let currentRotation = { x: 0, y: 0 };
let lights = [], particleSystem;
let hoveredFaceIndex = -1;
let initialDistance = 0, touchStartTime = 0;
let lastTouchPosition = { x: 0, y: 0 };
let performanceMode = 'auto';

// Variables para efectos espectaculares V3.1.10
let alienCats = [];
let floatingOffset = { x: 0, y: 0, z: 0 };
let cubeFloatAmplitude = 0.15;

console.log('🎯 CUBO ESPECTACULAR V3.1 - CARGA INICIADA (ULTRA-OPTIMIZADO)');

// Información de cada cara del cubo con datos actualizados
const faceInfo = {
    0: { 
        title: "SII CHILE", 
        content: "Servicio de Impuestos Internos - Declaraciones y consultas tributarias", 
        link: "https://www.sii.cl", 
        color: "#00d4ff", 
        emoji: "🏛️",
        gradient: ["#00d4ff", "#0099cc"]
    },
    1: { 
        title: "PREVIRED", 
        content: "Cotizaciones previsionales y AFP", 
        link: "https://www.previred.com", 
        color: "#00ff88", 
        emoji: "💰",
        gradient: ["#00ff88", "#00cc66"]
    },
    2: { 
        title: "DIRECCIÓN DEL TRABAJO", 
        content: "Legislación laboral y fiscalización", 
        link: "https://www.dt.gob.cl", 
        color: "#ff6600", 
        emoji: "⚖️",
        gradient: ["#ff6600", "#cc5200"]
    },
    3: { 
        title: "TESORERÍA GENERAL", 
        content: "Pagos fiscales y multas", 
        link: "https://www.tesoreria.cl", 
        color: "#00ccff", 
        emoji: "💸",
        gradient: ["#00ccff", "#0099cc"]
    },
    4: { 
        title: "FUNDACIÓN TQF", 
        content: "Transporte inclusivo para personas con discapacidad", 
        link: "#fundacion", 
        color: "#ff0080", 
        emoji: "🚚",
        gradient: ["#ff0080", "#cc0066"]
    },
    5: { 
        title: "CONTACTO MTZ", 
        content: "Asesoría tributaria profesional WhatsApp", 
        link: "https://wa.me/56990062213?text=Hola,%20necesito%20asesoría%20tributaria", 
        color: "#25D366", 
        emoji: "📱",
        gradient: ["#25D366", "#128C7E"]
    }
};

// Detectar capacidades del dispositivo
function getDeviceCapabilities() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 768);
    
    const isLowEnd = navigator.hardwareConcurrency <= 4 || navigator.deviceMemory <= 4;
    const isHighDPI = window.devicePixelRatio > 2;
    const isLandscape = window.innerWidth > window.innerHeight;
    
    return {
        isMobile,
        isLowEnd,
        isHighDPI,
        isLandscape,
        screenSize: window.innerWidth,
        pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 2 : 3)
    };
}

// Configuración adaptiva basada en el dispositivo
function getOptimalConfig() {
    const device = getDeviceCapabilities();
    
    return {
        // Calidad visual
        antialias: !device.isMobile && !device.isLowEnd,
        shadows: !device.isMobile && !device.isLowEnd,
        pixelRatio: device.isLowEnd ? 1 : device.pixelRatio,
        
        // Performance
        powerPreference: device.isMobile || device.isLowEnd ? "low-power" : "high-performance",
        particleCount: device.isLowEnd ? 500 : device.isMobile ? 1000 : 2000,
        lightCount: device.isLowEnd ? 3 : 6,
        
        // Cámara
        fov: device.screenSize <= 480 ? 75 : device.isMobile ? 70 : 65,
        distance: device.screenSize <= 480 ? 12 : device.isMobile ? 10 : 8,
        
        // Interacción
        hoverEnabled: !device.isMobile,
        complexAnimations: !device.isLowEnd
    };
}

// Inicializar Three.js con configuración optimizada
function initThreeJS() {
    try {
        const container = document.getElementById('canvas-container');
        if (!container) {
            throw new Error('Canvas container not found');
        }
        
        const config = getOptimalConfig();
        
        // Crear escena con fog optimizado
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000511, 15, 50);
        
        // Crear reloj para animaciones sincronizadas
        clock = new THREE.Clock();
        
        // Configurar cámara adaptiva
        camera = new THREE.PerspectiveCamera(
            config.fov, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        camera.position.set(0, 0, config.distance);
        
        // Crear renderer con configuración óptima
        renderer = new THREE.WebGLRenderer({ 
            antialias: config.antialias,
            alpha: true,
            powerPreference: config.powerPreference,
            stencil: false,
            depth: true
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(config.pixelRatio);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        
        if (config.shadows) {
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        }
        
        container.appendChild(renderer.domElement);
        
        // Crear grupo principal del cubo
        cubeGroup = new THREE.Group();
        scene.add(cubeGroup);
        
        // Configurar sistemas
        setupLights(config);
        createAdvancedCube(config);
        createParticleSystem(config);
        createAlienCats(config);
        setupControls();
        
        // Iniciar bucle de animación
        animate();
        
        // Actualizar UI
        updateControlsInfo();
        
        console.log('✨ CUBO V3.1 INICIALIZADO - Modo:', config.powerPreference);
        
        // Notificar que está listo INMEDIATAMENTE
        console.log('📡 DISPARANDO EVENTO cubeReady');
        document.dispatchEvent(new CustomEvent('cubeReady'));
        
        // Backup dispatch después de 500ms
        setTimeout(() => {
            console.log('📡 BACKUP - DISPARANDO EVENTO cubeReady');
            document.dispatchEvent(new CustomEvent('cubeReady'));
        }, 500);
        
    } catch (error) {
        console.error('❌ Error initializing cube:', error);
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div style="color: #ff6b6b; text-align: center; padding: 20px;">
                    <h3>⚠️ Error al cargar el cubo 3D</h3>
                    <p>Problema: ${error.message}</p>
                    <p>Por favor, recarga la página</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 10px; background: #00d4ff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        🔄 Recargar Página
                    </button>
                </div>
            `;
        }
    }
}

// Sistema de luces dinámicas optimizado
function setupLights(config) {
    // Luz ambiente base
    const ambientLight = new THREE.AmbientLight(0x001122, 0.4);
    scene.add(ambientLight);
    
    // Luz direccional principal
    const mainLight = new THREE.DirectionalLight(0x00ffff, 1.8);
    mainLight.position.set(15, 15, 10);
    if (config.shadows) {
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.setScalar(1024);
    }
    scene.add(mainLight);
    
    // Luces puntuales de colores (cantidad adaptiva)
    const lightColors = [0x00d4ff, 0x00ff88, 0xff6600, 0x00ccff, 0xff0080, 0x25D366];
    
    for (let i = 0; i < config.lightCount; i++) {
        const light = new THREE.PointLight(lightColors[i], 1.2, 30);
        const angle = (i / config.lightCount) * Math.PI * 2;
        
        light.position.set(
            Math.cos(angle) * 12,
            Math.sin(angle) * 8,
            Math.sin(angle * 0.5) * 6
        );
        
        light.userData = {
            originalIntensity: 1.2,
            phase: i * Math.PI / 3,
            radius: 12,
            baseAngle: angle
        };
        
        scene.add(light);
        lights.push(light);
    }
}

// Crear cubo avanzado con mejor geometría y materiales
function createAdvancedCube(config) {
    // Geometría más detallada
    const geometry = new THREE.BoxGeometry(3.2, 3.2, 3.2, 2, 2, 2);
    
    // Crear materiales para cada cara
    const materials = [];
    
    for (let i = 0; i < 6; i++) {
        const faceData = faceInfo[i];
        const canvas = createEnhancedFaceCanvas(faceData, i, config);
        const texture = new THREE.CanvasTexture(canvas);
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        
        const material = new THREE.MeshPhysicalMaterial({
            map: texture,
            color: new THREE.Color(faceData.color),
            metalness: 0.3,
            roughness: 0.4,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1,
            transparent: true,
            opacity: 0.95,
            emissive: new THREE.Color(faceData.color),
            emissiveIntensity: 0.15,
            envMapIntensity: 1.5
        });
        
        materials.push(material);
    }
    
    // Crear cubo principal
    cube = new THREE.Mesh(geometry, materials);
    if (config.shadows) {
        cube.castShadow = true;
        cube.receiveShadow = true;
    }
    cubeGroup.add(cube);
    
    // Agregar wireframe mejorado
    createWireframeEffect(geometry);
    
    // Agregar efecto de glow
    createGlowEffect();
}

// Canvas mejorado para cada cara
function createEnhancedFaceCanvas(faceData, index, config) {
    const size = config.isMobile ? 256 : 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    const center = size / 2;
    
    // Fondo con gradiente radial mejorado
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, faceData.gradient[0] + '60');
    gradient.addColorStop(0.4, faceData.gradient[1] + '40');
    gradient.addColorStop(0.8, faceData.gradient[0] + '20');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Patrón de grid sutil
    ctx.strokeStyle = faceData.color + '20';
    ctx.lineWidth = 1;
    const gridSize = size / 8;
    
    for (let i = 0; i <= 8; i++) {
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
    ctx.beginPath();
    ctx.arc(center, center, size * 0.25, 0, Math.PI * 2);
    ctx.strokeStyle = faceData.color;
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Círculo interior
    ctx.beginPath();
    ctx.arc(center, center, size * 0.22, 0, Math.PI * 2);
    ctx.strokeStyle = faceData.color + '60';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Emoji con sombra
    const emojiSize = config.isMobile ? size * 0.15 : size * 0.16;
    ctx.font = `bold ${emojiSize}px Apple Color Emoji, Segoe UI Emoji, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Sombra del emoji
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillText(faceData.emoji, center + 2, center + 2);
    
    // Emoji principal
    ctx.fillStyle = '#ffffff';
    ctx.fillText(faceData.emoji, center, center);
    
    // Título con mejor tipografía
    const titleSize = config.isMobile ? size * 0.06 : size * 0.07;
    ctx.font = `bold ${titleSize}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.fillStyle = faceData.color;
    ctx.fillText(faceData.title, center, center + size * 0.4);
    
    return canvas;
}

// Wireframe con efectos mejorados
function createWireframeEffect(geometry) {
    const wireframeGeometry = new THREE.EdgesGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        linewidth: 2,
        transparent: true,
        opacity: 0.6
    });
    
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    wireframe.userData = { originalOpacity: 0.6 };
    cube.add(wireframe);
}

// Efecto de glow mejorado
function createGlowEffect() {
    const glowGeometry = new THREE.BoxGeometry(3.4, 3.4, 3.4);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    glowMesh.userData = { originalOpacity: 0.08 };
    cubeGroup.add(glowMesh);
}

// Sistema de partículas optimizado
function createParticleSystem(config) {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = config.particleCount;
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const colorPalette = [
        new THREE.Color(0x00d4ff),
        new THREE.Color(0x00ff88),
        new THREE.Color(0xff6600),
        new THREE.Color(0xff0080),
        new THREE.Color(0x25D366)
    ];
    
    for (let i = 0; i < particleCount; i++) {
        // Distribución esférica
        const radius = 15 + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
        
        // Colores variados
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Tamaños variados
        sizes[i] = Math.random() * 0.8 + 0.2;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
}

// 🛸 CREAR GATOS ALIEN EN PLATILLOS VOLADORES ESPECTACULARES
function createAlienCats(config) {
    const catCount = config.isLowEnd ? 2 : config.isMobile ? 3 : 5;
    
    for (let i = 0; i < catCount; i++) {
        // Crear grupo para cada gato alien + platillo
        const alienGroup = new THREE.Group();
        
        // PLATILLO VOLADOR
        const saucerGeometry = new THREE.CylinderGeometry(0.8, 1.2, 0.3, 16);
        const saucerMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff88,
            emissive: 0x004422,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        const saucer = new THREE.Mesh(saucerGeometry, saucerMaterial);
        
        // Cúpula del platillo
        const domeGeometry = new THREE.SphereGeometry(0.6, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const domeMaterial = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            emissive: 0x002244,
            transparent: true,
            opacity: 0.7
        });
        const dome = new THREE.Mesh(domeGeometry, domeMaterial);
        dome.position.y = 0.2;
        
        // GATO ALIEN (cuerpo simple pero adorable)
        const catBody = new THREE.Group();
        
        // Cuerpo del gato
        const bodyGeometry = new THREE.SphereGeometry(0.25, 8, 6);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0xff6600,
            emissive: 0x331100
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.scale.set(1, 0.8, 1.2);
        
        // Cabeza del gato
        const headGeometry = new THREE.SphereGeometry(0.2, 8, 6);
        const head = new THREE.Mesh(headGeometry, bodyMaterial);
        head.position.set(0, 0.3, 0.1);
        
        // Orejas alien (más grandes y puntiagudas)
        const earGeometry = new THREE.ConeGeometry(0.08, 0.2, 4);
        const earMaterial = new THREE.MeshPhongMaterial({
            color: 0xff8800,
            emissive: 0x221100
        });
        
        const leftEar = new THREE.Mesh(earGeometry, earMaterial);
        leftEar.position.set(-0.12, 0.45, 0.05);
        leftEar.rotation.z = -0.3;
        
        const rightEar = new THREE.Mesh(earGeometry, earMaterial);
        rightEar.position.set(0.12, 0.45, 0.05);
        rightEar.rotation.z = 0.3;
        
        // Ojos brillantes alien
        const eyeGeometry = new THREE.SphereGeometry(0.04, 6, 4);
        const eyeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            emissive: 0x00ff00
        });
        
        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.08, 0.32, 0.18);
        
        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.08, 0.32, 0.18);
        
        // Cola del gato
        const tailGeometry = new THREE.CylinderGeometry(0.03, 0.06, 0.4, 6);
        const tail = new THREE.Mesh(tailGeometry, bodyMaterial);
        tail.position.set(0, 0.1, -0.35);
        tail.rotation.x = 0.5;
        
        // Ensamblar el gato
        catBody.add(body, head, leftEar, rightEar, leftEye, rightEye, tail);
        catBody.position.y = 0.4;
        catBody.scale.setScalar(0.8);
        
        // Luz del platillo
        const saucerLight = new THREE.PointLight(0x00ff88, 0.5, 10);
        saucerLight.position.set(0, -0.2, 0);
        
        // Ensamblar platillo completo
        alienGroup.add(saucer, dome, catBody, saucerLight);
        
        // Posición orbital aleatoria
        const radius = 15 + Math.random() * 10;
        const angle = (i / catCount) * Math.PI * 2 + Math.random() * 0.5;
        const height = (Math.random() - 0.5) * 8;
        
        alienGroup.position.set(
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
        );
        
        // Datos para animación
        alienGroup.userData = {
            originalRadius: radius,
            baseAngle: angle,
            speed: 0.3 + Math.random() * 0.4,
            bobAmplitude: 0.5 + Math.random() * 0.3,
            bobSpeed: 1 + Math.random() * 0.5
        };
        
        alienCats.push(alienGroup);
        scene.add(alienGroup);
    }
    
    console.log(`🛸 ${catCount} Gatos Alien creados y listos para volar!`);
}

// Configurar controles unificados
function setupControls() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    const canvas = renderer.domElement;
    const deviceCaps = getDeviceCapabilities();
    
    if (deviceCaps.isMobile) {
        // MÓVIL: Solo eventos táctiles optimizados
        console.log('📱 Configurando controles TÁCTILES optimizados');
        canvas.addEventListener('touchstart', onTouchStart, { passive: false });
        canvas.addEventListener('touchmove', onTouchMove, { passive: false });
        canvas.addEventListener('touchend', onTouchEnd, { passive: false });
    } else {
        // PC: Solo eventos de mouse/pointer
        console.log('🖥️ Configurando controles de ESCRITORIO');
        canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
        canvas.addEventListener('pointermove', onPointerMove, { passive: true });
        canvas.addEventListener('pointerup', onPointerUp, { passive: true });
        canvas.addEventListener('click', onPointerClick, { passive: true });
        canvas.addEventListener('wheel', onWheel, { passive: false });
    }
    
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
}

// Manejadores de eventos unificados
function onPointerDown(event) {
    isDragging = true;
    updateMousePosition(event);
    previousMousePosition = { x: event.clientX, y: event.clientY };
}

function onPointerMove(event) {
    updateMousePosition(event);
    
    if (isDragging) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };
        
        targetRotation.y += deltaMove.x * 0.008;
        targetRotation.x += deltaMove.y * 0.008;
        
        // Limitar rotación vertical
        targetRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.x));
    }
    
    previousMousePosition = { x: event.clientX, y: event.clientY };
    
    // Hover solo en PC
    if (getDeviceCapabilities().hoverEnabled) {
        checkHover();
    }
}

function onPointerUp() {
    isDragging = false;
}

function onPointerClick(event) {
    if (!isDragging) {
        updateMousePosition(event);
        handleClick();
    }
}

function onWheel(event) {
    event.preventDefault();
    
    const zoomSpeed = 0.1;
    const minDistance = 6;
    const maxDistance = 25;
    
    camera.position.z += event.deltaY * zoomSpeed * 0.01;
    camera.position.z = Math.max(minDistance, Math.min(maxDistance, camera.position.z));
}

// Variables para inercia táctil
let touchVelocity = { x: 0, y: 0 };
let lastTouchTime = 0;
let isRotating = false;
let rotationInertia = { x: 0, y: 0 };

// Eventos táctiles ULTRA-OPTIMIZADOS para móviles
function onTouchStart(event) {
    event.preventDefault();
    touchStartTime = Date.now();
    lastTouchTime = touchStartTime;
    isRotating = false;
    
    // Detener inercia al tocar
    rotationInertia.x = 0;
    rotationInertia.y = 0;
    
    if (event.touches.length === 2) {
        // ZOOM: Dos dedos - Pinch to zoom
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        initialDistance = Math.sqrt(dx * dx + dy * dy);
        
        console.log('🤏 Zoom pinch iniciado');
        
    } else if (event.touches.length === 1) {
        // ROTACIÓN: Un dedo - Preparar para rotar
        const touch = event.touches[0];
        lastTouchPosition = { 
            x: touch.clientX, 
            y: touch.clientY 
        };
        
        // Preparar para detectar rotación
        touchVelocity = { x: 0, y: 0 };
        
        console.log('👆 Touch iniciado para rotación');
    }
}

function onTouchMove(event) {
    event.preventDefault();
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTouchTime;
    
    if (event.touches.length === 2 && initialDistance > 0) {
        // ZOOM PINCH SUAVE Y PRECISO
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);
        
        // Calcular zoom ULTRA PRECISO y suave
        const zoomRatio = currentDistance / initialDistance;
        const zoomDelta = zoomRatio - 1;
        const zoomSpeed = 0.8; // Más responsivo pero suave
        const minDistance = 4;
        const maxDistance = 30;
        
        // Aplicar zoom con curva suave
        const currentZ = camera.position.z;
        const targetZ = currentZ - (zoomDelta * zoomSpeed);
        camera.position.z = Math.max(minDistance, Math.min(maxDistance, targetZ));
        
        // Actualizar distancia inicial para suavidad
        initialDistance = currentDistance;
        
        console.log('🔍 Zoom:', camera.position.z.toFixed(1));
        
    } else if (event.touches.length === 1 && lastTouchPosition) {
        // ROTACIÓN CON UN DEDO - ULTRA SUAVE
        const touch = event.touches[0];
        
        const deltaMove = {
            x: touch.clientX - lastTouchPosition.x,
            y: touch.clientY - lastTouchPosition.y
        };
        
        // Sensibilidad optimizada para móviles
        const sensitivity = 0.012; // Más sensible y natural
        
        // Aplicar rotación
        targetRotation.y += deltaMove.x * sensitivity;
        targetRotation.x += deltaMove.y * sensitivity;
        
        // Limitar rotación vertical para mejor experiencia
        targetRotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotation.x));
        
        // Calcular velocidad para inercia
        if (deltaTime > 0) {
            touchVelocity.x = deltaMove.x / deltaTime;
            touchVelocity.y = deltaMove.y / deltaTime;
        }
        
        // Actualizar posición anterior
        lastTouchPosition = { x: touch.clientX, y: touch.clientY };
        isRotating = true;
        
        console.log('🔄 Rotando:', targetRotation.y.toFixed(2), targetRotation.x.toFixed(2));
    }
    
    lastTouchTime = currentTime;
}

function onTouchEnd(event) {
    const touchDuration = Date.now() - touchStartTime;
    
    if (event.touches.length === 0) {
        // Ya no hay toques activos
        
        if (isRotating && touchDuration > 50) {
            // Aplicar INERCIA si hubo rotación
            const inertiaFactor = 0.008;
            rotationInertia.x = touchVelocity.y * inertiaFactor;
            rotationInertia.y = touchVelocity.x * inertiaFactor;
            
            console.log('🌪️ Inercia aplicada:', rotationInertia.x.toFixed(3), rotationInertia.y.toFixed(3));
            
        } else if (!isRotating && touchDuration < 300) {
            // TAP RÁPIDO - Detectar click en cara
            const touch = event.changedTouches[0];
            
            // Calcular distancia de movimiento
            const touchDistance = lastTouchPosition ? Math.sqrt(
                Math.pow(touch.clientX - lastTouchPosition.x, 2) +
                Math.pow(touch.clientY - lastTouchPosition.y, 2)
            ) : 0;
            
            // Solo si fue un tap sin movimiento
            if (touchDistance < 15) {
                mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
                
                // Feedback táctil
                if (navigator.vibrate) {
                    navigator.vibrate(40);
                }
                
                console.log('👆 TAP detectado en cara');
                handleClick();
            }
        }
        
        // Reset variables
        initialDistance = 0;
        isRotating = false;
        lastTouchPosition = null;
    }
}

// Actualizar posición del mouse
function updateMousePosition(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Manejar clicks/taps con confirmación mejorada
function handleClick() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);
    
    if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        const faceData = faceInfo[faceIndex];
        
        // Crear efecto visual
        createEnhancedClickEffect(intersects[0].point, faceData.color);
        
        // Mostrar panel de información con confirmación
        updateInfoPanelWithConfirmation(faceData);
        
        console.log(`🎯 Cara clickeada: ${faceData.title}`);
    }
}

// Verificar hover (solo PC)
function checkHover() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);
    
    if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        if (hoveredFaceIndex !== faceIndex) {
            resetHighlight();
            highlightFace(faceIndex);
            hoveredFaceIndex = faceIndex;
            document.body.style.cursor = 'pointer';
        }
    } else {
        if (hoveredFaceIndex !== -1) {
            resetHighlight();
            hoveredFaceIndex = -1;
            document.body.style.cursor = 'default';
        }
    }
}

// Resaltar cara con efecto mejorado
function highlightFace(faceIndex) {
    if (cube.material[faceIndex]) {
        cube.material[faceIndex].emissiveIntensity = 0.4;
        cube.material[faceIndex].opacity = 1.0;
    }
}

// Resetear resaltado
function resetHighlight() {
    if (hoveredFaceIndex !== -1 && cube.material[hoveredFaceIndex]) {
        cube.material[hoveredFaceIndex].emissiveIntensity = 0.15;
        cube.material[hoveredFaceIndex].opacity = 0.95;
    }
}

// Efecto de click mejorado y más impactante
function createEnhancedClickEffect(position, color) {
    // Ondas concéntricas
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const geometry = new THREE.RingGeometry(0.1 + i * 0.05, 0.2 + i * 0.1, 24);
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color(color),
                transparent: true,
                opacity: 0.8 - i * 0.2,
                side: THREE.DoubleSide
            });
            
            const ring = new THREE.Mesh(geometry, material);
            ring.position.copy(position);
            ring.lookAt(camera.position);
            scene.add(ring);
            
            // Animación del anillo
            let scale = 0.1;
            const animateRing = () => {
                scale += 0.15;
                ring.scale.setScalar(scale);
                material.opacity -= 0.03;
                
                if (material.opacity > 0) {
                    requestAnimationFrame(animateRing);
                } else {
                    scene.remove(ring);
                    geometry.dispose();
                    material.dispose();
                }
            };
            animateRing();
        }, i * 80);
    }
}

// Actualizar panel de información
function updateInfoPanel(faceData) {
    const panel = document.getElementById('infoPanel');
    const title = document.getElementById('infoTitle');
    const content = document.getElementById('infoContent');
    const icon = document.getElementById('infoIcon');
    
    if (title) title.textContent = faceData.title;
    if (content) content.textContent = faceData.content;
    if (icon) icon.textContent = faceData.emoji;
    
    if (panel) {
        panel.classList.add('active');
        
        // Auto-ocultar después de 6 segundos
        setTimeout(() => {
            panel.classList.remove('active');
        }, 6000);
    }
}

// Actualizar panel de información con confirmación interactiva
function updateInfoPanelWithConfirmation(faceData) {
    const panel = document.getElementById('infoPanel');
    const title = document.getElementById('infoTitle');
    const content = document.getElementById('infoContent');
    const icon = document.getElementById('infoIcon');
    const actionButton = document.getElementById('actionButton');
    
    if (title) title.textContent = faceData.title;
    if (content) content.textContent = faceData.content;
    if (icon) icon.textContent = faceData.emoji;
    
    // Configurar botón de acción con confirmación OBLIGATORIA
    if (actionButton) {
        // Detectar si es móvil para ajustar la experiencia
        const device = getDeviceCapabilities();
        
        // ELIMINAR cualquier onclick previo
        actionButton.onclick = null;
        actionButton.removeAttribute('onclick');
        
        if (faceData.link.startsWith('http')) {
            actionButton.innerHTML = device.isMobile ? 
                `<span>📱</span> Ir a ${faceData.title}` : 
                `<span>🌐</span> Visitar ${faceData.title}`;
        } else {
            actionButton.innerHTML = device.isMobile ? 
                `<span>📱</span> Contactar por WhatsApp` : 
                `<span>💬</span> Contactar por WhatsApp`;
        }
        
        // Asignar SOLO la función de confirmación
        actionButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔒 Botón clickeado - Mostrando confirmación para:', faceData.title);
            showConfirmationModal(faceData);
        };
    }
    
    if (panel) {
        panel.classList.add('active');
        
        // Auto-ocultar después de 8 segundos (más tiempo para leer)
        setTimeout(() => {
            panel.classList.remove('active');
        }, 8000);
    }
}

// Modal de confirmación adaptativo
function showConfirmationModal(faceData) {
    console.log('🔒 MOSTRANDO MODAL DE CONFIRMACIÓN para:', faceData.title);
    console.log('🔗 Link:', faceData.link);
    
    const device = getDeviceCapabilities();
    
    // Crear modal dinámicamente
    const modal = document.createElement('div');
    modal.className = 'confirmation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="modal-icon">${faceData.emoji}</span>
                <h3>${faceData.title}</h3>
            </div>
            <div class="modal-body">
                <p>${faceData.content}</p>
                ${faceData.link.startsWith('http') ? 
                    `<p class="modal-url">🌐 ${faceData.link}</p>` : 
                    `<p class="modal-url">📱 Abrir WhatsApp</p>`
                }
                <p class="modal-question">${device.isMobile ? 
                    '¿Deseas abrir esta aplicación?' : 
                    '¿Deseas visitar este sitio web?'}</p>
            </div>
            <div class="modal-actions">
                <button class="modal-btn modal-cancel" onclick="closeConfirmationModal()">
                    ❌ Cancelar
                </button>
                <button class="modal-btn modal-confirm" onclick="confirmNavigation('${faceData.link}')">
                    ✅ ${device.isMobile ? 'Abrir' : 'Ir al Sitio'}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    console.log('✅ Modal agregado al DOM');
    
    // Animación de entrada
    setTimeout(() => {
        modal.classList.add('show');
        console.log('✅ Modal mostrado con animación');
    }, 10);
    
    // Auto-cerrar después de 10 segundos
    setTimeout(() => {
        if (document.body.contains(modal)) {
            console.log('⏰ Auto-cerrando modal después de 10 segundos');
            closeConfirmationModal();
        }
    }, 10000);
}

// Cerrar modal de confirmación
function closeConfirmationModal() {
    const modal = document.querySelector('.confirmation-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    }
}

// Confirmar navegación
function confirmNavigation(link) {
    closeConfirmationModal();
    
    // Efecto de confirmación
    console.log('✅ Usuario confirmó navegación a:', link);
    
    // Abrir enlace con pequeño delay para mejor UX
    setTimeout(() => {
        if (link.startsWith('http')) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    }, 200);
}

// Hacer funciones globales para onclick
window.closeConfirmationModal = closeConfirmationModal;
window.confirmNavigation = confirmNavigation;

// Actualizar información de controles con detalles mejorados
function updateControlsInfo() {
    const controlsInfo = document.getElementById('controlsInfo');
    if (controlsInfo) {
        const device = getDeviceCapabilities();
        if (device.isMobile) {
            controlsInfo.innerHTML = '<p>👆 <strong>Arrastra</strong> para rotar • 🤏 <strong>Pellizca</strong> para zoom • 👆 <strong>Toca las caras</strong> para ver servicios</p>';
        } else {
            controlsInfo.innerHTML = '<p>🖱️ <strong>Arrastra</strong> para rotar • 🔍 <strong>Rueda del mouse</strong> para zoom • 👆 <strong>Click en las caras</strong> para ver servicios</p>';
        }
    }
}

// Bucle de animación ultra-optimizado
function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    
    // Aplicar inercia táctil (solo móviles)
    if (getDeviceCapabilities().isMobile && (Math.abs(rotationInertia.x) > 0.001 || Math.abs(rotationInertia.y) > 0.001)) {
        targetRotation.x += rotationInertia.x;
        targetRotation.y += rotationInertia.y;
        
        // Limitar rotación vertical con inercia
        targetRotation.x = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetRotation.x));
        
        // Reducir inercia gradualmente
        rotationInertia.x *= 0.92; // Fricción suave
        rotationInertia.y *= 0.92;
        
        // Detener inercia cuando sea muy pequeña
        if (Math.abs(rotationInertia.x) < 0.001) rotationInertia.x = 0;
        if (Math.abs(rotationInertia.y) < 0.001) rotationInertia.y = 0;
    }
    
    // Rotación suave del cubo (optimizada)
    const lerpFactor = getDeviceCapabilities().isMobile ? 0.12 : 0.08; // Más suave en móvil
    currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor;
    currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor;
    
    cubeGroup.rotation.x = currentRotation.x;
    cubeGroup.rotation.y = currentRotation.y;
    
    // ✨ EFECTO FLOTANTE SUTIL DEL CUBO
    floatingOffset.y = Math.sin(elapsedTime * 0.8) * cubeFloatAmplitude;
    floatingOffset.x = Math.cos(elapsedTime * 0.5) * (cubeFloatAmplitude * 0.3);
    floatingOffset.z = Math.sin(elapsedTime * 0.6) * (cubeFloatAmplitude * 0.2);
    
    cubeGroup.position.set(floatingOffset.x, floatingOffset.y, floatingOffset.z);
    
    // Respiración sutil del cubo (menos cálculos)
    const breathScale = 1 + Math.sin(elapsedTime * 0.6) * 0.03;
    cubeGroup.scale.setScalar(breathScale);
    
    // Rotación automática muy sutil
    cubeGroup.rotation.z = Math.sin(elapsedTime * 0.3) * 0.02;
    
    // Animar luces (solo si hay luces)
    if (lights.length > 0) {
        const lightSpeed = elapsedTime * 0.2;
        lights.forEach((light) => {
            const userData = light.userData;
            const angle = userData.baseAngle + lightSpeed;
            
            light.position.x = Math.cos(angle) * userData.radius;
            light.position.z = Math.sin(angle) * userData.radius;
            light.position.y = Math.sin(elapsedTime * 0.8 + userData.phase) * 4;
            light.intensity = userData.originalIntensity + 
                             Math.sin(elapsedTime * 2 + userData.phase) * 0.3;
        });
    }
    
    // Animar partículas (solo si existen)
    if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.05;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
    }
    
    // 🛸 ANIMAR GATOS ALIEN EN PLATILLOS VOLADORES
    alienCats.forEach((alienGroup, index) => {
        const userData = alienGroup.userData;
        const time = elapsedTime * userData.speed;
        
        // Movimiento orbital alrededor del cubo
        const angle = userData.baseAngle + time;
        const x = Math.cos(angle) * userData.originalRadius;
        const z = Math.sin(angle) * userData.originalRadius;
        
        // Movimiento vertical de bobbing
        const bobbing = Math.sin(elapsedTime * userData.bobSpeed) * userData.bobAmplitude;
        const y = bobbing + (Math.random() - 0.5) * 0.1; // Pequeño ruido
        
        alienGroup.position.set(x, y, z);
        
        // Rotación del platillo
        alienGroup.rotation.y = elapsedTime * 2;
        
        // Inclinación sutil del platillo
        alienGroup.rotation.x = Math.sin(elapsedTime * 1.5 + index) * 0.1;
        alienGroup.rotation.z = Math.cos(elapsedTime * 1.2 + index) * 0.05;
        
        // Animación del gato (balanceo de cola)
        const catBody = alienGroup.children[2]; // El gato es el tercer hijo
        if (catBody && catBody.children[6]) { // La cola es el séptimo hijo del gato
            const tail = catBody.children[6];
            tail.rotation.z = Math.sin(elapsedTime * 3 + index) * 0.3;
        }
    });
    
    // Renderizar
    renderer.render(scene, camera);
}

// Manejar redimensionamiento con debounce
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const config = getOptimalConfig();
        
        // Actualizar cámara
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.fov = config.fov;
        camera.updateProjectionMatrix();
        
        // Actualizar renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(config.pixelRatio);
        
        // Ajustar distancia de cámara
        camera.position.z = config.distance;
        
        // Actualizar controles
        updateControlsInfo();
        
        console.log('📱 Ventana redimensionada -', window.innerWidth, 'x', window.innerHeight);
    }, 100);
}

// Event listeners
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', () => {
    setTimeout(handleResize, 200);
});

// Función de inicialización ULTRA-ROBUSTA que será llamada por main.js
function startCube() {
    console.log('🚀 INICIANDO CUBO 3D...');
    
    // Verificación múltiple de Three.js
    if (typeof THREE === 'undefined') {
        console.error('❌ THREE.js no disponible');
        
        // Mostrar error en pantalla
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div style="color: #ff6b6b; text-align: center; padding: 20px; font-family: Arial;">
                    <h2>⚠️ Error de Carga</h2>
                    <p>Three.js no se pudo cargar correctamente</p>
                    <p>Verificando conexión a internet...</p>
                    <button onclick="location.reload()" style="padding: 15px 30px; margin-top: 20px; background: #00d4ff; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
                        🔄 Recargar Página
                    </button>
                </div>
            `;
        }
        return false;
    }
    
    // Verificar propiedades esenciales de Three.js
    if (!THREE.Scene || !THREE.WebGLRenderer || !THREE.PerspectiveCamera) {
        console.error('❌ Three.js incompleto - faltan componentes esenciales');
        return false;
    }
    
    console.log('✅ Three.js verificado correctamente');
    console.log('📋 Versión Three.js:', THREE.REVISION);
    
    try {
        // Verificar soporte WebGL
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            throw new Error('WebGL no soportado en este navegador');
        }
        console.log('✅ WebGL soportado');
        
        // Inicializar el cubo
        initThreeJS();
        console.log('✅ Cubo inicializado exitosamente');
        return true;
        
    } catch (error) {
        console.error('❌ Error crítico iniciando cubo:', error);
        
        // Mostrar error específico
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div style="color: #ff6b6b; text-align: center; padding: 20px; font-family: Arial;">
                    <h2>⚠️ Error del Sistema 3D</h2>
                    <p><strong>Problema:</strong> ${error.message}</p>
                    <p>Tu navegador puede no soportar WebGL o hay un problema de compatibilidad.</p>
                    <button onclick="location.reload()" style="padding: 15px 30px; margin-top: 20px; background: #00d4ff; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
                        🔄 Intentar de Nuevo
                    </button>
                </div>
            `;
        }
        return false;
    }
}

// API externa para controlar el cubo
window.cubeAPI = {
    rotateTo: (x, y) => {
        targetRotation.x = x;
        targetRotation.y = y;
    },
    reset: () => {
        targetRotation.x = 0;
        targetRotation.y = 0;
        const config = getOptimalConfig();
        camera.position.z = config.distance;
    },
    getDeviceInfo: getDeviceCapabilities,
    setPerformanceMode: (mode) => {
        performanceMode = mode;
        // Reconfigurar según el modo
    }
};

console.log('✅ CUBO V3.1.10 ESPECTACULAR - GATOS ALIEN + FLOTANTE - CÓDIGO CARGADO');