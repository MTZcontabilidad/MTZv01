/**
 * FUNDACIÓN TE QUIERO FELIZ - GLOBAL JAVASCRIPT
 * =============================================
 * JavaScript compartido entre todas las páginas
 * Version: 1.0.0
 */

// ==========================================
// GLOBAL VARIABLES
// ==========================================

let isPageLoaded = false;
let currentPage = '';

// ==========================================
// PAGE DETECTION
// ==========================================

/**
 * Detecta en qué página estamos actualmente
 */
function getCurrentPage() {
    const path = window.location.pathname;
    
    if (path === '/' || path.includes('index.html')) {
        return 'inicio';
    } else if (path.includes('mision.html')) {
        return 'mision';
    } else if (path.includes('impacto.html')) {
        return 'impacto';
    } else if (path.includes('alianza.html')) {
        return 'alianza';
    } else if (path.includes('donantes.html')) {
        return 'donantes';
    } else if (path.includes('sumate.html')) {
        return 'sumate';
    }
    
    return 'unknown';
}

// ==========================================
// GLOBAL NAVIGATION
// ==========================================

/**
 * Configuración de navegación global
 */
const NAVIGATION_CONFIG = {
    pages: {
        inicio: { url: '/index.html', title: 'Inicio' },
        mision: { url: '/pages/mision.html', title: 'Nuestra Misión' },
        impacto: { url: '/pages/impacto.html', title: 'Impacto y Transparencia' },
        alianza: { url: '/pages/alianza.html', title: 'Alianza Estratégica' },
        donantes: { url: '/pages/donantes.html', title: 'Muro de Transparencia' },
        sumate: { url: '/pages/sumate.html', title: 'Súmate' }
    }
};

/**
 * Actualiza la navegación activa
 */
function updateActiveNavigation() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const page = link.dataset.page;
        if (page === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

/**
 * Maneja la navegación entre páginas
 */
function handleNavigation(e) {
    const link = e.target.closest('.nav-link');
    if (!link) return;
    
    const targetPage = link.dataset.page;
    const pageConfig = NAVIGATION_CONFIG.pages[targetPage];
    
    if (pageConfig) {
        // Track navigation si estamos en producción
        if (window.AnalyticsModule) {
            window.AnalyticsModule.trackCustomEvent('page_navigation', {
                from_page: getCurrentPage(),
                to_page: targetPage,
                navigation_type: 'menu_click'
            });
        }
        
        // Navegar a la página
        window.location.href = pageConfig.url;
    }
}

// ==========================================
// MOBILE MENU
// ==========================================

/**
 * Inicializa el menú móvil
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    mobileMenuButton.addEventListener('click', () => {
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        
        // Toggle estado
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        
        if (isExpanded) {
            // Cerrar menú
            mobileMenu.classList.add('hidden');
            if (menuIconOpen) menuIconOpen.classList.remove('hidden');
            if (menuIconClose) menuIconClose.classList.add('hidden');
        } else {
            // Abrir menú
            mobileMenu.classList.remove('hidden');
            if (menuIconOpen) menuIconOpen.classList.add('hidden');
            if (menuIconClose) menuIconClose.classList.remove('hidden');
        }
        
        // Track mobile menu usage
        if (window.AnalyticsModule) {
            window.AnalyticsModule.trackCustomEvent('mobile_menu_toggle', {
                action: isExpanded ? 'close' : 'open',
                page: getCurrentPage()
            });
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            if (menuIconOpen) menuIconOpen.classList.remove('hidden');
            if (menuIconClose) menuIconClose.classList.add('hidden');
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

/**
 * Configuración del Intersection Observer para animaciones de scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Track scroll-based content views
                if (window.AnalyticsModule && entry.target.id) {
                    window.AnalyticsModule.trackCustomEvent('content_view', {
                        content_id: entry.target.id,
                        page: getCurrentPage(),
                        trigger: 'scroll_intersection'
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos con animación
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// ==========================================
// CONTACT LINKS TRACKING
// ==========================================

/**
 * Inicializa el tracking de enlaces de contacto
 */
function initContactTracking() {
    // Track phone links
    document.addEventListener('click', (e) => {
        const phoneLink = e.target.closest('a[href^="tel:"]');
        if (phoneLink && window.AnalyticsModule) {
            window.AnalyticsModule.trackContactInteraction('phone', phoneLink.href);
        }
        
        const emailLink = e.target.closest('a[href^="mailto:"]');
        if (emailLink && window.AnalyticsModule) {
            window.AnalyticsModule.trackContactInteraction('email', emailLink.href);
        }
        
        const socialLink = e.target.closest('.social-link');
        if (socialLink && window.AnalyticsModule) {
            const platform = window.AnalyticsModule.getSocialPlatform ? 
                window.AnalyticsModule.getSocialPlatform(socialLink.href) : 'social';
            window.AnalyticsModule.trackContactInteraction('social', platform);
        }
    });
}

// ==========================================
// PAGE INITIALIZATION
// ==========================================

/**
 * Inicialización global de la página
 */
function initGlobalFeatures() {
    currentPage = getCurrentPage();
    
    // Actualizar navegación activa
    updateActiveNavigation();
    
    // Inicializar menú móvil
    initMobileMenu();
    
    // Inicializar animaciones de scroll
    initScrollAnimations();
    
    // Inicializar tracking de contacto
    initContactTracking();
    
    // Configurar navegación
    document.addEventListener('click', handleNavigation);
    
    // Track page load
    if (window.AnalyticsModule) {
        window.AnalyticsModule.trackCustomEvent('page_load', {
            page: currentPage,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            viewport: `${window.innerWidth}x${window.innerHeight}`
        });
    }
    
    isPageLoaded = true;
    console.log(`📄 Página "${currentPage}" inicializada correctamente`);
}

// ==========================================
// ERROR HANDLING
// ==========================================

/**
 * Manejo global de errores
 */
window.addEventListener('error', (event) => {
    console.error('Error global capturado:', event.error);
    
    if (window.AnalyticsModule) {
        window.AnalyticsModule.trackError(event.error, `Global Error - Page: ${getCurrentPage()}`);
    }
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Función para smooth scroll a un elemento
 */
function scrollToElement(elementId, offset = 80) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Función para mostrar/ocultar elementos con animación
 */
function toggleElement(elementId, show = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const isVisible = !element.classList.contains('hidden');
    const shouldShow = show !== null ? show : !isVisible;
    
    if (shouldShow) {
        element.classList.remove('hidden');
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    } else {
        element.style.opacity = '0';
        setTimeout(() => {
            element.classList.add('hidden');
        }, 300);
    }
}

// ==========================================
// EXPORT GLOBAL FUNCTIONS
// ==========================================

// Hacer funciones disponibles globalmente
window.FTQF = {
    getCurrentPage,
    updateActiveNavigation,
    scrollToElement,
    toggleElement,
    initGlobalFeatures,
    NAVIGATION_CONFIG
};

// ==========================================
// AUTO-INITIALIZATION
// ==========================================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initGlobalFeatures); 