/**
 * FUNDACIÓN TE QUIERO FELIZ - FIREBASE CONFIGURATION
 * ==================================================
 * Configuración e inicialización de Firebase Analytics
 * Version: 1.0.0
 */

// ==========================================
// FIREBASE CONFIGURATION
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyDCrxPQ4kD9bMyR8XyVuaPIdP27KdfGcmo",
    authDomain: "fundaciontequierofeliz.firebaseapp.com",
    projectId: "fundaciontequierofeliz",
    storageBucket: "fundaciontequierofeliz.firebasestorage.app",
    messagingSenderId: "270225829930",
    appId: "1:270225829930:web:d2a60e416b569f21321353",
    measurementId: "G-S2EKD1GYCR"
};

// ==========================================
// ENVIRONMENT DETECTION
// ==========================================

/**
 * Detecta si estamos en el entorno de producción
 */
function isProductionEnvironment() {
    const hostname = window.location.hostname;
    const productionDomains = [
        'fundaciontequierofeliz.cl',
        'www.fundaciontequierofeliz.cl'
    ];
    
    return productionDomains.includes(hostname);
}

/**
 * Detecta si estamos en desarrollo local
 */
function isLocalDevelopment() {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || 
           hostname === '127.0.0.1' || 
           hostname.startsWith('192.168.') ||
           hostname.startsWith('10.') ||
           hostname.includes('local');
}

// ==========================================
// FIREBASE INITIALIZATION
// ==========================================

let firebaseApp = null;
let analytics = null;
let isFirebaseInitialized = false;

/**
 * Inicializa Firebase solo en producción
 */
function initializeFirebase() {
    // Verificar que estemos en producción
    if (!isProductionEnvironment()) {
        console.log('🚫 Firebase Analytics deshabilitado en desarrollo local');
        console.log('🌐 Solo se activará en: fundaciontequierofeliz.cl');
        return false;
    }

    try {
        // Verificar que Firebase esté disponible
        if (typeof firebase === 'undefined') {
            console.warn('🔥 Firebase SDK no está cargado');
            return false;
        }

        // Inicializar Firebase App
        firebaseApp = firebase.initializeApp(firebaseConfig);
        
        // Inicializar Analytics si está disponible
        if (firebase.analytics) {
            analytics = firebase.analytics();
            console.log('📊 Firebase Analytics inicializado correctamente para PRODUCCIÓN');
            
            // Configurar Analytics
            configureAnalytics();
        } else {
            console.warn('📊 Firebase Analytics no está disponible');
        }

        isFirebaseInitialized = true;
        return true;
        
    } catch (error) {
        console.error('❌ Error inicializando Firebase:', error);
        return false;
    }
}

/**
 * Configura Firebase Analytics con eventos personalizados
 */
function configureAnalytics() {
    if (!analytics) return;

    try {
        // Configurar propiedades personalizadas
        analytics.setUserProperties({
            organization: 'Fundacion_Te_Quiero_Feliz',
            site_type: 'nonprofit_website'
        });

        // Evento inicial de carga de página
        analytics.logEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href,
            content_group1: 'Fundacion',
            content_group2: 'Homepage'
        });

        console.log('📊 Analytics configurado con eventos personalizados');
        
    } catch (error) {
        console.error('❌ Error configurando Analytics:', error);
    }
}

// ==========================================
// ANALYTICS HELPER FUNCTIONS
// ==========================================

/**
 * Registra un evento personalizado
 * @param {string} eventName - Nombre del evento
 * @param {object} parameters - Parámetros del evento
 */
function logCustomEvent(eventName, parameters = {}) {
    // Solo registrar eventos en producción
    if (!isProductionEnvironment()) {
        if (isLocalDevelopment()) {
            console.log('🧪 [DEV] Evento simulado:', eventName, parameters);
        }
        return;
    }

    if (!analytics || !isFirebaseInitialized) {
        console.warn('📊 Analytics no disponible para evento:', eventName);
        return;
    }

    try {
        analytics.logEvent(eventName, {
            ...parameters,
            timestamp: new Date().toISOString(),
            organization: 'FTQF',
            environment: 'production'
        });
        
        if (APP_CONFIG?.features?.debugMode) {
            console.log('📊 Evento registrado:', eventName, parameters);
        }
    } catch (error) {
        console.error('❌ Error registrando evento:', error);
    }
}

/**
 * Registra navegación entre pestañas
 * @param {string} tabName - Nombre de la pestaña
 */
function logTabNavigation(tabName) {
    logCustomEvent('tab_navigation', {
        tab_name: tabName,
        event_category: 'Navigation',
        event_label: `Tab_${tabName}`
    });
}

/**
 * Registra interacción con donaciones
 * @param {string} action - Acción realizada
 * @param {object} details - Detalles adicionales
 */
function logDonationInteraction(action, details = {}) {
    logCustomEvent('donation_interaction', {
        action: action,
        event_category: 'Donations',
        event_label: action,
        ...details
    });
}

/**
 * Registra visualización de gráficos
 * @param {string} chartType - Tipo de gráfico
 */
function logChartView(chartType) {
    logCustomEvent('chart_view', {
        chart_type: chartType,
        event_category: 'Data_Visualization',
        event_label: `Chart_${chartType}`
    });
}

/**
 * Registra clics en enlaces externos
 * @param {string} url - URL del enlace
 * @param {string} linkText - Texto del enlace
 */
function logExternalLink(url, linkText = '') {
    logCustomEvent('external_link_click', {
        link_url: url,
        link_text: linkText,
        event_category: 'External_Links',
        event_label: url
    });
}

/**
 * Registra contacto/comunicación
 * @param {string} method - Método de contacto (phone, email, social)
 * @param {string} details - Detalles del contacto
 */
function logContactInteraction(method, details = '') {
    logCustomEvent('contact_interaction', {
        contact_method: method,
        contact_details: details,
        event_category: 'Contact',
        event_label: `Contact_${method}`
    });
}

// ==========================================
// AUTO-TRACKING FUNCTIONS
// ==========================================

/**
 * Configura tracking automático de eventos
 */
function setupAutoTracking() {
    // Solo configurar tracking en producción
    if (!isProductionEnvironment()) {
        console.log('🚫 Auto-tracking deshabilitado en desarrollo local');
        return;
    }

    if (!isFirebaseInitialized) return;

    // Tracking de scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            logCustomEvent('scroll_depth', {
                scroll_percent: scrollPercent,
                event_category: 'Engagement'
            });
        }
    }, 1000));

    // Tracking de tiempo en página
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage += 30;
        if (timeOnPage % 60 === 0) { // Cada minuto
            logCustomEvent('time_on_page', {
                time_seconds: timeOnPage,
                event_category: 'Engagement'
            });
        }
    }, 30000);
}

/**
 * Función throttle para limitar eventos
 */
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

// Hacer funciones disponibles globalmente
if (typeof window !== 'undefined') {
    window.FirebaseConfig = {
        initialize: initializeFirebase,
        logCustomEvent,
        logTabNavigation,
        logDonationInteraction,
        logChartView,
        logExternalLink,
        logContactInteraction,
        setupAutoTracking,
        isInitialized: () => isFirebaseInitialized,
        isProductionEnvironment,
        isLocalDevelopment
    };
}

// Export para módulos (si se necesita en futuro)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeFirebase,
        logCustomEvent,
        logTabNavigation,
        logDonationInteraction,
        logChartView,
        logExternalLink,
        logContactInteraction,
        firebaseConfig
    };
} 