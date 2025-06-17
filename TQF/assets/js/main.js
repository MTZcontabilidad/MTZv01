/**
 * Fundación Te Quiero Feliz - Main JavaScript
 * Functionality for the foundation's website
 */

// Datos de donaciones
const donorsData = [
    { name: 'Katherine Vasquez', amount: 3700, date: '12/2/2024' },
    { name: 'Raul Alexis Haddad Zelada', amount: 10000, date: '12/2/2024' },
    { name: 'Raul Alexis Haddad Zelada', amount: 10000, date: '12/3/2024' },
    { name: 'Anamour Ledezma', amount: 10000, date: '25/3/2024' },
    { name: 'Paula Vicencio', amount: 3000, date: '1/4/2024' },
    { name: 'Jera Andia', amount: 20000, date: '24/4/2024' },
    { name: 'Constanzavg95', amount: 10000, date: '25/4/2024' },
    { name: 'Paula Vicencio', amount: 6000, date: '2/5/2024' },
    { name: 'Grupo Araos SPA', amount: 15000, date: '3/5/2024' },
    { name: 'Katherine Vasquez', amount: 8000, date: '8/5/2024' },
    { name: 'Maria Paz', amount: 8000, date: '9/5/2024' },
    { name: 'Jera Andia', amount: 1000, date: '22/5/2024' },
    { name: 'Luz Maria', amount: 8000, date: '25/5/2024' },
    { name: 'Pallo Burger', amount: 20000, date: '28/5/2024' },
    { name: 'Botilleria El Tio', amount: 30000, date: '29/5/2024' },
    { name: 'Proyectos y Servicios G y B LTD', amount: 15000, date: '31/5/2024' },
    { name: 'Paula Vicencio', amount: 6000, date: '3/6/2024' },
    { name: 'Estephanie Frez', amount: 7000, date: '3/6/2024' },
    { name: 'Grupo Araos SPA', amount: 30000, date: '6/6/2024' },
    { name: 'D&A Seguridad Spa', amount: 30000, date: '7/6/2024' },
    { name: 'Claudia Chamorro', amount: 40000, date: '7/6/2024' },
    { name: 'Pallo Burger', amount: 20000, date: '10/6/2024' },
    { name: 'Maylin Vildoso', amount: 10000, date: '20/6/2024' },
    { name: 'Delia Schiller', amount: 10000, date: '21/6/2024' },
    { name: 'Mar**gar*****', amount: 10000, date: '23/6/2024' },
    { name: 'Ledezmaan Ledezmaan', amount: 10000, date: '2/7/2024' },
    { name: 'Claudia Chamorro', amount: 10000, date: '1/8/2024' },
    { name: 'KATURRA_17', amount: 100000, date: '2/8/2024' },
    { name: 'Flavia Cerda', amount: 3000, date: '2/8/2024' },
    { name: 'Pallo Burger', amount: 1500, date: '5/8/2024' },
    { name: 'Pallo Burger', amount: 15000, date: '5/8/2024' },
    { name: 'Autoscanner Master', amount: 5000, date: '6/8/2024' },
    { name: 'Kinder y Pre-kinder East', amount: 279000, date: '9/8/2024' },
    { name: 'Ferny R. Merino', amount: 10000, date: '11/8/2024' },
    { name: 'Delia Schiller', amount: 10000, date: '12/8/2024' },
    { name: 'Raul Alarcon', amount: 5000, date: '13/8/2024' },
    { name: 'Grupo Araos SPA', amount: 20000, date: '1/9/2024' },
    { name: 'Jorge Garrido', amount: 5000, date: '12/9/2024' },
    { name: 'Delia Schiller', amount: 20000, date: '13/9/2024' },
    { name: 'Vanessa Bautista', amount: 10000, date: '24/9/2024' },
    { name: 'Mar**gar*****', amount: 10000, date: '29/9/2024' },
    { name: 'Raul Alexis Haddad Zelada', amount: 10000, date: '3/10/2024' },
    { name: 'Karen Sepulveda', amount: 50000, date: '3/10/2024' },
    { name: 'E***** V*****', amount: 50000, date: '10/10/2024' },
    { name: 'Valeria Galleguillos', amount: 5000, date: '24/10/2024' },
    { name: 'Mar**gar*****', amount: 10000, date: '29/10/2024' }
];

// Variables globales
let charts = { impacto: null, donantes: null };
let animationFlags = {
    impactoCounters: false,
    impactoChart: false,
    donantesContent: false
};

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSmoothScrolling();
    initTabNavigation();
    initIntersectionObserver();
    initializeFirstTab();
});

/**
 * Configuración del menú móvil
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = !mobileMenu.classList.contains('hidden');
        mobileMenuButton.setAttribute('aria-expanded', isExpanded);
        menuIconOpen.classList.toggle('hidden', isExpanded);
        menuIconClose.classList.toggle('hidden', !isExpanded);
    });
}

/**
 * Configuración del scroll suave
 */
function initSmoothScrolling() {
    const heroButton = document.querySelector('a[href="#main-content"]');
    if (heroButton) {
        heroButton.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * Configuración de navegación por pestañas
 */
function initTabNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(tab);
        });
        
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                switchTab(tab);
            }
        });
    });
}

/**
 * Cambiar pestaña activa
 */
function switchTab(tabButton) {
    const targetTabId = tabButton.getAttribute('data-tab');
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    
    // Actualizar navegación
    navLinks.forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-selected', 'false');
    });
    
    document.querySelectorAll(`.nav-link[data-tab="${targetTabId}"]`).forEach(link => {
        link.classList.add('active');
        link.setAttribute('aria-selected', 'true');
    });

    // Actualizar contenido
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === targetTabId) {
            content.classList.add('active');
            
            // Verificar animaciones para el contenido recién mostrado
            if (targetTabId === 'impacto') {
                checkImpactoAnimations();
            } else if (targetTabId === 'donantes') {
                checkDonantesAnimations();
            }
        }
    });
    
    // Cerrar menú móvil si está abierto
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
    }
}

/**
 * Verificar y ejecutar animaciones de la sección Impacto
 */
function checkImpactoAnimations() {
    const countersContainer = document.getElementById('impacto-counters-container');
    const chartCanvas = document.getElementById('impactoChart');
    
    if (countersContainer && countersContainer.classList.contains('is-visible') && !animationFlags.impactoCounters) {
        triggerAnimateCounters();
    }
    if (chartCanvas && chartCanvas.classList.contains('is-visible') && !animationFlags.impactoChart) {
        triggerRenderImpactoChart();
    }
}

/**
 * Verificar y ejecutar animaciones de la sección Donantes
 */
function checkDonantesAnimations() {
    const donorSectionContainer = document.getElementById('donors-accordion-container');
    if (donorSectionContainer && donorSectionContainer.classList.contains('is-visible') && !animationFlags.donantesContent) {
        triggerProcessAndRenderDonations();
    }
}

/**
 * Activar animación de contadores
 */
function triggerAnimateCounters() {
    if (animationFlags.impactoCounters) return;
    animateCounters();
    animationFlags.impactoCounters = true;
}

/**
 * Activar renderizado del gráfico de impacto
 */
function triggerRenderImpactoChart() {
    if (animationFlags.impactoChart) return;
    renderImpactoChart();
    animationFlags.impactoChart = true;
}

/**
 * Activar procesamiento y renderizado de donaciones
 */
function triggerProcessAndRenderDonations() {
    if (animationFlags.donantesContent) return;
    processAndRenderDonations();
    animationFlags.donantesContent = true;
}

/**
 * Animar contadores numéricos
 */
function animateCounters() {
    const counters = document.querySelectorAll('#impacto [data-target]');
    const speed = 120;
    
    counters.forEach(counter => {
        counter.innerText = '0';
        const animate = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = Math.max(1, target / speed);

            if (count < target) {
                counter.innerText = Math.min(target, Math.ceil(count + inc));
                setTimeout(animate, 10);
            } else {
                counter.innerText = target;
            }
        };
        animate();
    });
}

/**
 * Renderizar gráfico de impacto
 */
function renderImpactoChart() {
    if (charts.impacto) return;
    
    const canvas = document.getElementById('impactoChart');
    if (!canvas || !canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    charts.impacto = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            datasets: [{
                label: 'Beneficiarios por Mes',
                data: [48, 52, 55, 49, 53, 50, 56, 51, 49, 54, 58, 60],
                backgroundColor: 'rgba(14, 165, 233, 0.7)',
                borderColor: 'rgba(14, 165, 233, 1)',
                borderWidth: 1,
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true, 
            maintainAspectRatio: false,
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
                legend: { display: false }, 
                tooltip: { 
                    backgroundColor: '#374151', 
                    titleFont: { weight: 'bold' }, 
                    bodyFont: { weight: 'normal' }, 
                    callbacks: { 
                        label: context => ` ${context.parsed.y} personas` 
                    } 
                } 
            }
        }
    });
}

/**
 * Procesar y renderizar datos de donaciones
 */
function processAndRenderDonations() {
    if (charts.donantes) return;
    
    const currencyFormatter = new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP', 
        minimumFractionDigits: 0 
    });
    
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    // Procesar datos por mes
    const donationsByMonth = {};
    let totalAmount = 0;
    
    donorsData.forEach(donor => {
        const [day, month, year] = donor.date.split('/');
        const date = new Date(+year, +month - 1, +day);
        const monthKey = `${monthNames[date.getMonth()]} ${year}`;
        
        if (!donationsByMonth[monthKey]) {
            donationsByMonth[monthKey] = { donors: [], total: 0, date: date };
        }
        
        donationsByMonth[monthKey].donors.push(donor);
        donationsByMonth[monthKey].total += donor.amount;
        totalAmount += donor.amount;
    });
    
    const sortedMonths = Object.keys(donationsByMonth).sort((a, b) => 
        donationsByMonth[a].date - donationsByMonth[b].date
    );

    // Actualizar totales
    const totalDonatedElement = document.getElementById('total-donated');
    const totalDonationsElement = document.getElementById('total-donations');
    
    if (totalDonatedElement) {
        totalDonatedElement.textContent = currencyFormatter.format(totalAmount);
    }
    if (totalDonationsElement) {
        totalDonationsElement.textContent = donorsData.length;
    }

    // Crear acordeón de donaciones
    createDonationsAccordion(sortedMonths, donationsByMonth, currencyFormatter);
    
    // Crear gráfico de donaciones
    createDonationsChart(sortedMonths, donationsByMonth, currencyFormatter);
}

/**
 * Crear acordeón de donaciones por mes
 */
function createDonationsAccordion(sortedMonths, donationsByMonth, currencyFormatter) {
    const accordionContainer = document.getElementById('donors-accordion-container');
    if (!accordionContainer) return;
    
    accordionContainer.innerHTML = '';
    
    sortedMonths.forEach((monthKey, index) => {
        const monthData = donationsByMonth[monthKey];
        const accordionItemId = `accordion-item-${index}`;
        const accordionButtonId = `accordion-button-${index}`;
        const accordionContentId = `accordion-content-${index}`;
        
        const accordionItem = document.createElement('div');
        accordionItem.className = 'bg-white rounded-xl shadow-md overflow-hidden';
        
        const sortedDonors = monthData.donors.sort((a, b) => 
            new Date(b.date.split('/').reverse().join('-')) - 
            new Date(a.date.split('/').reverse().join('-'))
        );

        accordionItem.innerHTML = `
            <button id="${accordionButtonId}" 
                    aria-expanded="false" 
                    aria-controls="${accordionContentId}" 
                    class="accordion-button w-full p-4 text-left font-semibold flex justify-between items-center hover:bg-gray-50 focus:outline-none">
                <span>${monthKey}</span>
                <span class="flex items-center">
                    <span class="text-accent font-bold mr-2">${currencyFormatter.format(monthData.total)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </span>
            </button>
            <div id="${accordionContentId}" 
                 role="region" 
                 aria-labelledby="${accordionButtonId}" 
                 class="accordion-content">
                <div class="p-4 border-t border-gray-200">
                    <table class="w-full text-left">
                        <caption class="sr-only">Donaciones para ${monthKey}</caption>
                        <thead class="sr-only">
                            <tr>
                                <th>Donante</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${sortedDonors.map(d => `
                                <tr class="text-sm">
                                    <td class="py-2 pr-2">${d.name}</td>
                                    <td class="py-2 px-2 text-right font-medium">${currencyFormatter.format(d.amount)}</td>
                                    <td class="py-2 pl-2 text-right text-gray-500">${d.date}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        accordionContainer.appendChild(accordionItem);
    });
    
    // Agregar eventos a los botones del acordeón
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const content = document.getElementById(button.getAttribute('aria-controls'));
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            button.setAttribute('aria-expanded', !isExpanded);
            content.style.maxHeight = !isExpanded ? content.scrollHeight + "px" : null;
        });
    });
}

/**
 * Crear gráfico de donaciones por mes
 */
function createDonationsChart(sortedMonths, donationsByMonth, currencyFormatter) {
    const canvas = document.getElementById('donationsByMonthChart');
    if (!canvas || !canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    charts.donantes = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedMonths,
            datasets: [{
                label: 'Donaciones por Mes',
                data: sortedMonths.map(m => donationsByMonth[m].total),
                backgroundColor: 'rgba(14, 165, 233, 0.7)',
                borderColor: 'rgba(14, 165, 233, 1)',
                borderWidth: 1,
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#374151',
                    titleFont: { weight: 'bold' },
                    bodyFont: { weight: 'normal' },
                    callbacks: {
                        label: context => ` ${currencyFormatter.format(context.parsed.y)}`
                    }
                }
            }
        }
    });
}

/**
 * Configurar Intersection Observer para animaciones
 */
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Animaciones escalonadas para hijos
                if (entry.target.classList.contains('stagger-children-js')) {
                    const children = Array.from(entry.target.children);
                    children.forEach((child, index) => {
                        child.style.animationDelay = `${index * 0.15}s`;
                        child.classList.add('animate-child-item');
                    });
                }
                
                // Inicializaciones específicas de contenido
                const currentTabId = document.querySelector('.nav-link.active')?.getAttribute('data-tab');

                if (currentTabId === 'impacto') {
                    if (entry.target.id === 'impacto-counters-container') {
                        triggerAnimateCounters();
                    }
                    if (entry.target.id === 'impactoChart') {
                        triggerRenderImpactoChart();
                    }
                } else if (currentTabId === 'donantes') {
                    if (entry.target.id === 'donors-accordion-container' || entry.target.id === 'donationsByMonthChart') {
                        triggerProcessAndRenderDonations();
                    }
                }
                
                // Dejar de observar después de la animación para la mayoría de elementos
                if (!entry.target.classList.contains('observe-continuously')) {
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    const elementsToObserve = document.querySelectorAll(
        '.animate-on-scroll, #impacto-counters-container, #impactoChart, #donors-accordion-container, #donationsByMonthChart'
    );
    
    elementsToObserve.forEach(el => {
        elementObserver.observe(el);
    });
}

/**
 * Inicializar la primera pestaña
 */
function initializeFirstTab() {
    const initialActiveTabButton = document.querySelector('.nav-link.active[role="tab"]');
    if (initialActiveTabButton) {
        switchTab(initialActiveTabButton);
    }
}

/**
 * Función de utilidad para logging (desarrollo)
 */
function log(message, data = null) {
    if (typeof console !== 'undefined' && console.log) {
        if (data) {
            console.log(`[FTQF] ${message}`, data);
        } else {
            console.log(`[FTQF] ${message}`);
        }
    }
}

// Exportar funciones principales para uso global si es necesario
window.FTQF = {
    switchTab,
    triggerAnimateCounters,
    triggerRenderImpactoChart,
    triggerProcessAndRenderDonations,
    log
}; 