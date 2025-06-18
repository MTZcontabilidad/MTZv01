/* ===================================
   MAIN.JS SIMPLIFICADO - SOLO LOADING
   =================================== */

console.log('🚀 MAIN.JS CARGADO - CONTROLADOR DE LOADING');

// Variables para loading
let loadingProgress = 0;
let loadingComplete = false;

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM CARGADO - INICIANDO LOADING');
    startLoadingSequence();
});

// Escuchar cuando el cubo esté listo
document.addEventListener('cubeReady', function() {
    console.log('🎯 CUBO LISTO - OCULTANDO LOADING');
    setTimeout(() => {
        hideLoadingScreen();
    }, 1000); // Dar un segundo más para mostrar el "Portal cuántico listo!"
});

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
    
    // Simular progreso de carga
    const progressInterval = setInterval(() => {
        loadingProgress += Math.random() * 15 + 5;
        
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
        
        // Actualizar texto
        if (loadingText) {
            if (loadingProgress < 30) {
                loadingText.textContent = 'Cargando servicios tributarios...';
            } else if (loadingProgress < 60) {
                loadingText.textContent = 'Conectando con servidores...';
            } else if (loadingProgress < 90) {
                loadingText.textContent = 'Inicializando cubo cuántico...';
            } else {
                loadingText.textContent = 'Portal cuántico listo!';
            }
        }
        
    }, 100);
}

// Ocultar loading screen
function hideLoadingScreen() {
    const loadingElement = document.getElementById('loadingScreen');
    
    if (loadingElement) {
        console.log('✅ OCULTANDO LOADING SCREEN');
        
        loadingElement.style.opacity = '0';
        loadingElement.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            loadingElement.style.display = 'none';
            loadingComplete = true;
            console.log('🎯 LOADING COMPLETADO - CUBO DISPONIBLE');
        }, 500);
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
        console.log('👁️ PÁGINA OCULTA');
    } else {
        console.log('👁️ PÁGINA VISIBLE');
    }
});

console.log('✅ MAIN.JS INICIALIZADO CORRECTAMENTE');
