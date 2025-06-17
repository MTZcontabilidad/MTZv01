/**
 * FUNDACIÓN TE QUIERO FELIZ - ANALYTICS MODULE
 * ============================================
 * Módulo de analytics que integra Firebase con los eventos de la aplicación
 * Version: 1.0.0
 */

// ==========================================
// ANALYTICS MODULE
// ==========================================

const AnalyticsModule = {
    
    /**
     * Inicializa el módulo de analytics
     */
    init() {
        console.log('📊 Módulo de Analytics iniciado');
        this.setupEventListeners();
        this.trackPageLoad();
    },

    /**
     * Configura los event listeners para tracking
     */
    setupEventListeners() {
        // Track navigation entre pestañas
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink && navLink.dataset.tab) {
                this.trackTabNavigation(navLink.dataset.tab);
            }
        });

        // Track enlaces externos
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="http"]');
            if (link && !link.href.includes(window.location.hostname)) {
                this.trackExternalLink(link.href, link.textContent.trim());
            }
        });

        // Track enlaces de contacto
        document.addEventListener('click', (e) => {
            const phoneLink = e.target.closest('a[href^="tel:"]');
            const emailLink = e.target.closest('a[href^="mailto:"]');
            
            if (phoneLink) {
                this.trackContactInteraction('phone', phoneLink.href);
            }
            if (emailLink) {
                this.trackContactInteraction('email', emailLink.href);
            }
        });

        // Track social media links
        document.addEventListener('click', (e) => {
            const socialLink = e.target.closest('.social-link');
            if (socialLink) {
                const platform = this.getSocialPlatform(socialLink.href);
                this.trackContactInteraction('social', platform);
            }
        });

        // Track accordion interactions
        document.addEventListener('click', (e) => {
            const accordionButton = e.target.closest('.accordion-button');
            if (accordionButton) {
                const isExpanded = accordionButton.getAttribute('aria-expanded') === 'true';
                this.trackDonationInteraction(isExpanded ? 'accordion_close' : 'accordion_open', {
                    donor_category: accordionButton.textContent.trim()
                });
            }
        });
    },

    /**
     * Registra la carga inicial de la página
     */
    trackPageLoad() {
        const isProduction = window.FirebaseConfig?.isProductionEnvironment();
        
        if (isProduction && window.FirebaseConfig && window.FirebaseConfig.isInitialized()) {
            window.FirebaseConfig.logCustomEvent('page_load_complete', {
                page_title: document.title,
                user_agent: navigator.userAgent,
                screen_resolution: `${screen.width}x${screen.height}`,
                viewport_size: `${window.innerWidth}x${window.innerHeight}`,
                language: navigator.language,
                timestamp: new Date().toISOString()
            });
        } else if (!isProduction) {
            console.log('🧪 [DEV] Page load tracked (desarrollo)');
        }
    },

    /**
     * Registra navegación entre pestañas
     */
    trackTabNavigation(tabName) {
        const isProduction = window.FirebaseConfig?.isProductionEnvironment();
        
        if (isProduction && window.FirebaseConfig && window.FirebaseConfig.isInitialized()) {
            window.FirebaseConfig.logTabNavigation(tabName);
        } else if (!isProduction) {
            console.log(`🧪 [DEV] Navegación a pestaña: ${tabName}`);
        }
        
        // También registrar como evento de navegación específico
        this.trackCustomEvent('section_view', {
            section_name: tabName,
            navigation_type: 'tab_click'
        });
    },

    /**
     * Registra interacciones con donaciones
     */
    trackDonationInteraction(action, details = {}) {
        if (window.FirebaseConfig && window.FirebaseConfig.isInitialized()) {
            window.FirebaseConfig.logDonationInteraction(action, details);
        }
    },

    /**
     * Registra visualización de gráficos
     */
    trackChartView(chartType) {
        if (window.FirebaseConfig && window.FirebaseConfig.isInitialized()) {
            window.FirebaseConfig.logChartView(chartType);
        }
    },

    /**
     * Registra clics en enlaces externos
     */
    trackExternalLink(url, linkText = '') {
        if (window.FirebaseConfig && window.FirebaseConfig.isInitialized()) {
            window.FirebaseConfig.logExternalLink(url, linkText);
        }
    },

    /**
     * Registra interacciones de contacto
     */
    trackContactInteraction(method, details = '') {
        if (window.FirebaseConfig && window.FirebaseConfig.isInitialized()) {
            window.FirebaseConfig.logContactInteraction(method, details);
        }
    },

    /**
     * Registra eventos personalizados
     */
    trackCustomEvent(eventName, parameters = {}) {
        const isProduction = window.FirebaseConfig?.isProductionEnvironment();
        
        if (isProduction && window.FirebaseConfig && window.FirebaseConfig.isInitialized()) {
            window.FirebaseConfig.logCustomEvent(eventName, parameters);
        } else if (!isProduction) {
            console.log(`🧪 [DEV] Evento: ${eventName}`, parameters);
        }
    },

    /**
     * Registra cuando se completa la animación de contadores
     */
    trackCounterAnimationComplete(section, finalValues) {
        this.trackCustomEvent('counter_animation_complete', {
            section: section,
            final_values: JSON.stringify(finalValues),
            animation_trigger: 'scroll_intersection'
        });
    },

    /**
     * Registra interacciones con el héroe
     */
    trackHeroInteraction(action) {
        this.trackCustomEvent('hero_interaction', {
            action: action,
            button_text: action === 'cta_click' ? 'Conoce Más' : action
        });
    },

    /**
     * Registra errores de JavaScript
     */
    trackError(error, context = '') {
        this.trackCustomEvent('javascript_error', {
            error_message: error.message || 'Unknown error',
            error_stack: error.stack || 'No stack trace',
            context: context,
            user_agent: navigator.userAgent,
            page_url: window.location.href
        });
    },

    /**
     * Identifica la plataforma de redes sociales desde una URL
     */
    getSocialPlatform(url) {
        if (url.includes('instagram.com')) return 'Instagram';
        if (url.includes('facebook.com')) return 'Facebook';
        if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X';
        if (url.includes('linkedin.com')) return 'LinkedIn';
        if (url.includes('youtube.com')) return 'YouTube';
        if (url.includes('whatsapp.com') || url.includes('wa.me')) return 'WhatsApp';
        return 'Other Social';
    },

    /**
     * Registra métricas de performance
     */
    trackPerformanceMetrics() {
        if ('performance' in window && 'getEntriesByType' in performance) {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const paintMetrics = performance.getEntriesByType('paint');
                
                const performanceData = {
                    page_load_time: Math.round(navigation.loadEventEnd - navigation.fetchStart),
                    dom_content_loaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
                    first_paint: paintMetrics.find(m => m.name === 'first-paint')?.startTime || 0,
                    first_contentful_paint: paintMetrics.find(m => m.name === 'first-contentful-paint')?.startTime || 0
                };
                
                this.trackCustomEvent('performance_metrics', performanceData);
            }, 2000);
        }
    }
};

// ==========================================
// ERROR TRACKING
// ==========================================

// Capturar errores globales
window.addEventListener('error', (event) => {
    AnalyticsModule.trackError(event.error, 'Global Error Handler');
});

// Capturar promesas rechazadas
window.addEventListener('unhandledrejection', (event) => {
    AnalyticsModule.trackError(new Error(event.reason), 'Unhandled Promise Rejection');
});

// ==========================================
// EXPORT MODULE
// ==========================================

// Hacer el módulo disponible globalmente
if (typeof window !== 'undefined') {
    window.AnalyticsModule = AnalyticsModule;
}

// Export para módulos (si se necesita en futuro)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsModule;
} 