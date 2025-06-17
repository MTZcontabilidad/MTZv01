/**
 * FUNDACIÓN TE QUIERO FELIZ - CONFIGURATION CONSTANTS
 * ===================================================
 * Constantes de configuración global de la aplicación
 * Version: 1.0.0
 */

// ==========================================
// APPLICATION CONFIG
// ==========================================

const APP_CONFIG = {
    name: 'Fundación Te Quiero Feliz',
    version: '1.0.0',
    description: 'Sitio web oficial de la Fundación Te Quiero Feliz',
    domain: 'fundaciontequierofeliz.cl',
    url: 'https://fundaciontequierofeliz.cl',
    
    // Feature flags
    features: {
        analytics: true,
        firebaseAnalytics: true,
        darkMode: false,
        debugMode: false,
        performanceMonitoring: true
    },
    
    // Performance settings
    performance: {
        animationSpeed: 250,
        scrollOffset: 80,
        debounceDelay: 300,
        intersectionThreshold: 0.1
    }
};

// ==========================================
// CONTACT INFORMATION
// ==========================================

const CONTACT_INFO = {
    phone: {
        number: '+56990062213',
        formatted: '+56 9 9006 2213',
        whatsapp: '56990062213'
    },
    
    email: {
        general: 'contacto@fundaciontequierofeliz.cl',
        donations: 'donaciones@tequierofeliz.cl',
        support: 'soporte@fundaciontequierofeliz.cl'
    },
    
    address: {
        city: 'Iquique',
        region: 'Tarapacá',
        country: 'Chile',
        full: 'Iquique, Región de Tarapacá, Chile'
    },
    
    legal: {
        rut: '65.225.792-5',
        fullName: 'Fundación Te Quiero Feliz',
        abbreviation: 'FTQF',
        type: 'Persona Jurídica sin Fines de Lucro'
    }
};

// ==========================================
// SOCIAL MEDIA LINKS
// ==========================================

const SOCIAL_LINKS = {
    instagram: {
        url: 'https://www.instagram.com/fundaciontequierofeliz',
        handle: '@fundaciontequierofeliz',
        active: true
    },
    
    facebook: {
        url: '#',
        handle: 'Fundación Te Quiero Feliz',
        active: false
    },
    
    twitter: {
        url: '#',
        handle: '@FundacionTQF',
        active: false
    },
    
    youtube: {
        url: '#',
        handle: 'Fundación Te Quiero Feliz',
        active: false
    },
    
    linkedin: {
        url: '#',
        handle: 'Fundación Te Quiero Feliz',
        active: false
    }
};

// ==========================================
// BANKING INFORMATION
// ==========================================

const BANKING_INFO = {
    bank: 'BancoEstado',
    accountType: 'Cuenta Corriente',
    accountNumber: '123456789',
    accountHolder: 'Fundación Te Quiero Feliz',
    rut: '65.225.792-5',
    email: 'donaciones@tequierofeliz.cl'
};

// ==========================================
// CHART CONFIGURATION
// ==========================================

const CHART_CONFIG = {
    colors: {
        primary: 'rgba(14, 165, 233, 0.8)',
        primaryBorder: 'rgba(14, 165, 233, 1)',
        secondary: 'rgba(56, 189, 248, 0.8)',
        secondaryBorder: 'rgba(56, 189, 248, 1)',
        background: '#374151',
        grid: 'rgba(0,0,0,0.05)'
    },
    
    options: {
        responsive: true,
        maintainAspectRatio: false,
        
        tooltips: {
            backgroundColor: '#374151',
            titleFont: { weight: 'bold' },
            bodyFont: { weight: 'normal' }
        },
        
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0,0,0,0.05)' }
            },
            x: {
                grid: { display: false }
            }
        },
        
        plugins: {
            legend: { display: false }
        }
    }
};

// ==========================================
// ANIMATION SETTINGS
// ==========================================

const ANIMATION_CONFIG = {
    durations: {
        fast: 150,
        normal: 250,
        slow: 350,
        page: 700
    },
    
    easings: {
        easeInOut: 'ease-in-out',
        easeOut: 'ease-out',
        easeIn: 'ease-in',
        bounceOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    
    delays: {
        stagger: 150,
        hero: {
            text1: 400,
            text2: 700,
            button: 1000
        }
    },
    
    counters: {
        speed: 120,
        interval: 10
    }
};

// ==========================================
// ERROR MESSAGES
// ==========================================

const ERROR_MESSAGES = {
    generic: 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.',
    network: 'Error de conexión. Verifica tu conexión a internet.',
    notFound: 'El recurso solicitado no fue encontrado.',
    validation: 'Por favor, verifica que todos los campos estén correctos.',
    
    charts: {
        loadError: 'Error al cargar los gráficos. Recargando...',
        dataError: 'Error en los datos del gráfico.',
        renderError: 'Error al renderizar el gráfico.'
    },
    
    navigation: {
        tabError: 'Error al cambiar de pestaña.',
        menuError: 'Error en el menú de navegación.'
    }
};

// ==========================================
// SUCCESS MESSAGES
// ==========================================

const SUCCESS_MESSAGES = {
    generic: 'Operación completada exitosamente.',
    dataLoaded: 'Datos cargados correctamente.',
    chartRendered: 'Gráfico renderizado exitosamente.',
    animationComplete: 'Animación completada.',
    
    navigation: {
        tabChanged: 'Pestaña cambiada exitosamente.',
        pageLoaded: 'Página cargada correctamente.'
    }
};

// ==========================================
// SEO METADATA
// ==========================================

const SEO_CONFIG = {
    title: 'Fundación Te Quiero Feliz | Movilidad y Dignidad para Iquique',
    description: 'Fundación Te Quiero Feliz - Movilidad y dignidad para personas con discapacidad y adultos mayores en Iquique y Alto Hospicio. Transporte gratuito especializado.',
    keywords: ['fundación', 'Iquique', 'Alto Hospicio', 'discapacidad', 'adultos mayores', 'transporte', 'movilidad', 'ONG'],
    
    openGraph: {
        type: 'website',
        title: 'Fundación Te Quiero Feliz | Movilidad y Dignidad para Iquique',
        description: 'Movilizando la esperanza y la dignidad en Iquique y Alto Hospicio. Transporte gratuito especializado para personas con discapacidad y adultos mayores.',
        image: 'https://fundaciontequierofeliz.cl/assets/images/og-image.jpg',
        url: 'https://fundaciontequierofeliz.cl/'
    },
    
    twitter: {
        card: 'summary_large_image',
        title: 'Fundación Te Quiero Feliz | Movilidad y Dignidad para Iquique',
        description: 'Movilizando la esperanza y la dignidad en Iquique y Alto Hospicio.',
        image: 'https://fundaciontequierofeliz.cl/assets/images/og-image.jpg'
    }
};

// ==========================================
// API ENDPOINTS (Para futuras integraciones)
// ==========================================

const API_CONFIG = {
    baseUrl: 'https://api.fundaciontequierofeliz.cl',
    version: 'v1',
    timeout: 10000,
    
    endpoints: {
        donations: '/donations',
        stats: '/statistics',
        contact: '/contact',
        newsletter: '/newsletter'
    }
};

// ==========================================
// EXPORT CONFIGURATION
// ==========================================

// Make constants available globally
if (typeof window !== 'undefined') {
    window.APP_CONFIG = APP_CONFIG;
    window.CONTACT_INFO = CONTACT_INFO;
    window.SOCIAL_LINKS = SOCIAL_LINKS;
    window.BANKING_INFO = BANKING_INFO;
    window.CHART_CONFIG = CHART_CONFIG;
    window.ANIMATION_CONFIG = ANIMATION_CONFIG;
    window.ERROR_MESSAGES = ERROR_MESSAGES;
    window.SUCCESS_MESSAGES = SUCCESS_MESSAGES;
    window.SEO_CONFIG = SEO_CONFIG;
    window.API_CONFIG = API_CONFIG;
}

// Also export for module systems (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_CONFIG,
        CONTACT_INFO,
        SOCIAL_LINKS,
        BANKING_INFO,
        CHART_CONFIG,
        ANIMATION_CONFIG,
        ERROR_MESSAGES,
        SUCCESS_MESSAGES,
        SEO_CONFIG,
        API_CONFIG
    };
} 