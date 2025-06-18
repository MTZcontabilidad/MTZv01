/* ===================================
   MAIN.JS V3.1 - CONTROLADOR ULTRA-OPTIMIZADO
   =================================== */

console.log('🚀 MAIN.JS V3.1 CARGADO - CONTROLADOR INTELIGENTE');

// Variables para loading
let loadingProgress = 0;
let loadingComplete = false;

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 MTZ Portal 3D V3.1.12 - Inicializando...');
    
    // Verificar soporte WebGL
    if (!window.WebGLRenderingContext) {
        console.error('❌ WebGL no soportado');
        document.getElementById('webgl-error').style.display = 'block';
        return;
    }
    
    // Inicializar el cubo 3D
    try {
        if (typeof initCube === 'function') {
            initCube();
            console.log('✅ Cubo 3D inicializado correctamente');
        } else {
            console.error('❌ Función initCube no encontrada');
        }
    } catch (error) {
        console.error('❌ Error al inicializar cubo:', error);
    }
    
    // Sistema de detección de dispositivos
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768 && window.innerWidth <= 1024;
    
    console.log(`📱 Dispositivo detectado: ${isMobile ? 'Móvil' : isTablet ? 'Tablet' : 'Desktop'}`);
    
    // Aplicar estilos específicos del dispositivo
    document.body.classList.add(isMobile ? 'mobile-device' : isTablet ? 'tablet-device' : 'desktop-device');
    
    // Optimizaciones de rendimiento
    if (isMobile) {
        // Reducir calidad en móviles
        document.documentElement.style.setProperty('--particle-count', '50');
        document.documentElement.style.setProperty('--animation-speed', '0.8');
    } else {
        document.documentElement.style.setProperty('--particle-count', '100');
        document.documentElement.style.setProperty('--animation-speed', '1.0');
    }
    
    // Control de modal de confirmación
    setupModalControls();
    
    // Manejo de errores globales
    window.addEventListener('error', function(e) {
        console.error('❌ Error global capturado:', e.error);
    });
    
    // Prevenir zoom accidental en iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        document.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    console.log('🎉 MTZ Portal 3D completamente cargado');
});

function setupModalControls() {
    // Modal de confirmación para navegación
    const modal = document.getElementById('confirmModal');
    const confirmBtn = document.getElementById('confirmNavigation');
    const cancelBtn = document.getElementById('cancelNavigation');
    
    let pendingUrl = '';
    
    // Interceptar clics en enlaces de servicios
    document.querySelectorAll('a[data-service]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            pendingUrl = this.href;
            
            const serviceName = this.getAttribute('data-service') || 'este servicio';
            document.getElementById('serviceName').textContent = serviceName;
            
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
        });
    });
    
    // Confirmar navegación
    confirmBtn.addEventListener('click', function() {
        if (pendingUrl) {
            window.open(pendingUrl, '_blank');
        }
        closeModal();
    });
    
    // Cancelar navegación
    cancelBtn.addEventListener('click', closeModal);
    
    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            pendingUrl = '';
        }, 300);
    }
}

// Función de utilidad para debugging
window.MTZDebug = {
    version: '3.1.12',
    checkStatus: function() {
        console.log('🔍 Estado del Portal MTZ:');
        console.log('- Versión:', this.version);
        console.log('- WebGL:', window.WebGLRenderingContext ? '✅' : '❌');
        console.log('- Three.js:', typeof THREE !== 'undefined' ? '✅' : '❌');
        console.log('- Cubo inicializado:', typeof scene !== 'undefined' ? '✅' : '❌');
        console.log('- Dispositivo:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Móvil' : 'Desktop');
    }
};

// Escuchar cuando el cubo esté listo
document.addEventListener('cubeReady', function() {
    console.log('🎯 EVENTO cubeReady RECIBIDO - OCULTANDO LOADING');
    loadingComplete = true;
    setTimeout(() => {
        hideLoadingScreen();
    }, 1000); // Reducido a 1 segundo
});

// Backup timer - si el cubo no se carga en 15 segundos, forzar hide
setTimeout(() => {
    if (!loadingComplete) {
        console.log('⚠️ TIMEOUT EXTENDIDO - FORZANDO HIDE LOADING (15s)');
        console.log('🔍 Estado actual del sistema:');
        console.log('  - THREE disponible:', typeof THREE !== 'undefined');
        console.log('  - startCube disponible:', typeof startCube === 'function');
        console.log('  - Canvas container:', document.getElementById('canvas-container') ? 'Existe' : 'No existe');
        hideLoadingScreen();
    }
}, 15000); // Aumentado a 15 segundos

// Secuencia de loading
function startLoadingSequence() {
    const loadingElement = document.getElementById('loadingScreen');
    const progressBar = document.querySelector('.progress-bar');
    const loadingText = document.querySelector('.loading-text');
    
    if (!loadingElement) {
        console.log('❌ No se encontró elemento loading');
        return;
    }
    
    console.log('⏳ INICIANDO SECUENCIA DE LOADING');
    
    // Simular progreso de carga más lento y realista
    const progressInterval = setInterval(() => {
        loadingProgress += Math.random() * 8 + 3;
        
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(progressInterval);
            
            // NO ocultar automáticamente - esperar señal del cubo
            console.log('📊 PROGRESO COMPLETADO - ESPERANDO CUBO');
        }
        
        // Actualizar barra de progreso
        if (progressBar) {
            progressBar.style.width = loadingProgress + '%';
        }
        
        // Actualizar texto con más pasos
        if (loadingText) {
            if (loadingProgress < 20) {
                loadingText.textContent = 'Iniciando sistema tributario...';
            } else if (loadingProgress < 40) {
                loadingText.textContent = 'Cargando servicios del SII...';
            } else if (loadingProgress < 60) {
                loadingText.textContent = 'Conectando con PREVIRED...';
            } else if (loadingProgress < 80) {
                loadingText.textContent = 'Inicializando cubo cuántico...';
            } else if (loadingProgress < 95) {
                loadingText.textContent = 'Activando efectos visuales...';
            } else {
                loadingText.textContent = 'Portal cuántico listo!';
            }
        }
        
    }, 150); // Intervalo más lento para mejor apreciación
}

// Ocultar loading screen con transición más suave
function hideLoadingScreen() {
    const loadingElement = document.getElementById('loadingScreen');
    
    if (loadingElement) {
        console.log('✅ OCULTANDO LOADING SCREEN');
        
        // Transición más suave y lenta
        loadingElement.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        loadingElement.style.opacity = '0';
        loadingElement.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            loadingElement.style.display = 'none';
            loadingComplete = true;
            console.log('🎯 LOADING COMPLETADO - CUBO DISPONIBLE');
        }, 1000); // Tiempo aumentado para la transición
    }
}

// Función para mostrar/ocultar panel de información
function toggleInfoPanel(show = false) {
    const panel = document.getElementById('infoPanel');
    if (panel) {
        if (show) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    }
}

// Funciones de utilidad
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Manejar redimensionamiento de ventana
window.addEventListener('resize', throttle(() => {
    // El cube.js maneja su propio resize
    console.log('📐 VENTANA REDIMENSIONADA');
}, 250));

// Manejar visibilidad de la página
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('��️ PÁGINA OCULTA');
    } else {
        console.log('👁️ PÁGINA VISIBLE');
    }
});

console.log('✅ MAIN.JS INICIALIZADO CORRECTAMENTE');
