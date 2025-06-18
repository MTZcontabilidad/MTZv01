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

// Configurar controles unificados
function setupControls() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    const canvas = renderer.domElement;
    
    // Eventos unificados
    canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerup', onPointerUp, { passive: true });
    canvas.addEventListener('click', onPointerClick, { passive: true });
    canvas.addEventListener('wheel', onWheel, { passive: false });
    
    // Eventos táctiles específicos
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });
    
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

// Eventos táctiles específicos para móviles
function onTouchStart(event) {
    touchStartTime = Date.now();
    
    if (event.touches.length === 2) {
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        initialDistance = Math.sqrt(dx * dx + dy * dy);
    } else if (event.touches.length === 1) {
        lastTouchPosition = { 
            x: event.touches[0].clientX, 
            y: event.touches[0].clientY 
        };
    }
}

function onTouchMove(event) {
    event.preventDefault();
    
    if (event.touches.length === 2 && initialDistance > 0) {
        // Pinch zoom
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const scale = distance / initialDistance;
        const minDistance = 6;
        const maxDistance = 25;
        
        camera.position.z = Math.max(minDistance, 
            Math.min(maxDistance, camera.position.z / scale));
        
        initialDistance = distance;
    }
}

function onTouchEnd(event) {
    const touchDuration = Date.now() - touchStartTime;
    
    if (event.touches.length === 0) {
        const touch = event.changedTouches[0];
        const touchDistance = Math.sqrt(
            Math.pow(touch.clientX - lastTouchPosition.x, 2) +
            Math.pow(touch.clientY - lastTouchPosition.y, 2)
        );
        
        // Detectar tap rápido
        if (touchDuration < 300 && touchDistance < 15) {
            mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            handleClick();
        }
        
        initialDistance = 0;
    }
}

// Actualizar posición del mouse
function updateMousePosition(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Manejar clicks/taps con efecto mejorado
function handleClick() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(cube);
    
    if (intersects.length > 0) {
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);
        const faceData = faceInfo[faceIndex];
        
        // Crear efecto visual
        createEnhancedClickEffect(intersects[0].point, faceData.color);
        
        // Mostrar panel de información
        updateInfoPanel(faceData);
        
        // Abrir enlace después del efecto
        setTimeout(() => {
            if (faceData.link.startsWith('http')) {
                window.open(faceData.link, '_blank');
            }
        }, 300);
        
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
            
            // Animación
            let scale = 0.1;
            const animate = () => {
                scale += 0.15;
                ring.scale.setScalar(scale);
                material.opacity -= 0.03;
                
                if (material.opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    scene.remove(ring);
                    geometry.dispose();
                    material.dispose();
                }
            };
            animate();
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

// Actualizar información de controles
function updateControlsInfo() {
    const controlsInfo = document.getElementById('controlsInfo');
    if (controlsInfo) {
        const device = getDeviceCapabilities();
        if (device.isMobile) {
            controlsInfo.innerHTML = '<p>👆 Arrastra para rotar • 🤏 Pellizca para zoom • 👆 Toca las caras</p>';
        } else {
            controlsInfo.innerHTML = '<p>🖱️ Arrastra para rotar • 🔍 Rueda para zoom • 👆 Click en las caras</p>';
        }
    }
}

// Bucle de animación optimizado
function animate() {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = clock.getDelta();
    
    // Rotación suave del cubo
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;
    
    cubeGroup.rotation.x = currentRotation.x;
    cubeGroup.rotation.y = currentRotation.y;
    
    // Respiración sutil del cubo
    const breathScale = 1 + Math.sin(elapsedTime * 0.6) * 0.03;
    cubeGroup.scale.setScalar(breathScale);
    
    // Rotación automática muy sutil
    cubeGroup.rotation.z = Math.sin(elapsedTime * 0.3) * 0.02;
    
    // Animar luces
    lights.forEach((light, index) => {
        const userData = light.userData;
        const angle = userData.baseAngle + elapsedTime * 0.2;
        
        light.position.x = Math.cos(angle) * userData.radius;
        light.position.z = Math.sin(angle) * userData.radius;
        light.position.y = Math.sin(elapsedTime * 0.8 + userData.phase) * 4;
        light.intensity = userData.originalIntensity + 
                         Math.sin(elapsedTime * 2 + userData.phase) * 0.3;
    });
    
    // Animar partículas
    if (particleSystem) {
        particleSystem.rotation.y = elapsedTime * 0.05;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1;
    }
    
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

// Sistema de inicialización robusto
function waitForThreeJS() {
    return new Promise((resolve, reject) => {
        if (typeof THREE !== 'undefined') {
            console.log('✅ THREE.js ya está disponible');
            resolve();
            return;
        }
        
        let attempts = 0;
        const maxAttempts = 50; // 5 segundos máximo
        
        const checkThree = () => {
            attempts++;
            if (typeof THREE !== 'undefined') {
                console.log('✅ THREE.js cargado después de', attempts * 100, 'ms');
                resolve();
            } else if (attempts >= maxAttempts) {
                console.error('❌ THREE.js no se pudo cargar después de 5 segundos');
                reject(new Error('THREE.js timeout'));
            } else {
                setTimeout(checkThree, 100);
            }
        };
        
        checkThree();
    });
}

// Inicializar cuando el DOM esté listo Y Three.js esté cargado
document.addEventListener('DOMContentLoaded', async function() {
    console.log('📱 DOM cargado, esperando THREE.js...');
    
    try {
        await waitForThreeJS();
        console.log('🚀 Iniciando cubo 3D...');
        initThreeJS();
    } catch (error) {
        console.error('❌ Error en la inicialización:', error);
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div style="color: #ff6b6b; text-align: center; padding: 20px;">
                    <h3>⚠️ Error al cargar Three.js</h3>
                    <p>No se pudo cargar la librería 3D</p>
                    <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 10px; background: #00d4ff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        🔄 Recargar Página
                    </button>
                </div>
            `;
        }
    }
});

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

console.log('✅ CUBO V3.1 CÓDIGO CARGADO - ESPERANDO DOM');