/* ===========================================
   MAIN.JS - INICIALIZADOR LIMPIO
   Solo inicialización básica del cubo
   =========================================== */

console.log('🎯 MTZ Portal - Inicializando');

// Variables globales básicas
let cubeInitialized = false;
let initAttempts = 0;
const maxAttempts = 5;

// Función principal de inicialización
function initPortal() {
    console.log('🚀 Iniciando portal MTZ...');
    
    // Verificar que THREE.js esté disponible
    if (typeof THREE === 'undefined') {
        console.error('❌ THREE.js no disponible');
        return false;
    }
    
    // Verificar que startCube esté disponible
    if (typeof startCube !== 'function') {
        console.error('❌ startCube no disponible');
        return false;
    }
    
    // Intentar inicializar el cubo
    try {
        const success = startCube();
        if (success) {
            cubeInitialized = true;
            console.log('✅ Portal MTZ inicializado correctamente');
            return true;
        } else {
            console.error('❌ Error inicializando cubo');
            return false;
        }
    } catch (error) {
        console.error('❌ Error en inicialización:', error);
        return false;
    }
}

// Función de reintentos
function tryInitialize() {
    initAttempts++;
    console.log(`🔄 Intento ${initAttempts}/${maxAttempts} de inicialización`);
    
    const success = initPortal();
    
    if (!success && initAttempts < maxAttempts) {
        console.log(`⏳ Reintentando en 1 segundo...`);
        setTimeout(tryInitialize, 1000);
    } else if (!success) {
        console.error('❌ No se pudo inicializar después de múltiples intentos');
        showError();
    }
}

// Mostrar error básico
function showError() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.innerHTML = `
            <div style="color: #ff6b6b; text-align: center; padding: 20px;">
                <h3>⚠️ Error al cargar</h3>
                <p>No se pudo inicializar el cubo 3D</p>
                <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 10px; background: #00d4ff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    🔄 Recargar
                </button>
            </div>
        `;
    }
}

// Ocultar pantalla de carga
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM cargado, esperando recursos...');
    
    // Esperar un poco para que se carguen todos los recursos
    setTimeout(() => {
        tryInitialize();
    }, 500);
});

// Escuchar cuando el cubo esté listo
document.addEventListener('cubeReady', function() {
    console.log('✅ Cubo listo, ocultando pantalla de carga');
    hideLoadingScreen();
});

// Manejo de errores globales
window.addEventListener('error', function(event) {
    console.error('❌ Error global:', event.error);
});

console.log('✅ MTZ Portal - Código cargado');
