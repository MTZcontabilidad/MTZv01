# 📁 Estructura del Proyecto - Fundación Te Quiero Feliz

## 🎯 Arquitectura del Proyecto

Este proyecto sigue una arquitectura **modular y escalable** diseñada para facilitar el mantenimiento y futuras expansiones.

```
fundacion-te-quiero-feliz/
├── 📁 public/                          # Archivos públicos del sitio web
│   ├── 📄 index.html                   # Página principal
│   ├── 📄 404.html                     # Página de error personalizada
│   ├── 📄 robots.txt                   # Directivas para bots de búsqueda
│   ├── 📄 sitemap.xml                  # Mapa del sitio para SEO
│   └── 📁 assets/                      # Recursos estáticos
│       ├── 📁 css/                     # Hojas de estilo
│       │   ├── 📄 main.css             # Estilos principales y variables
│       │   └── 📄 components.css       # Estilos de componentes específicos
│       ├── 📁 js/                      # Scripts JavaScript
│       │   ├── 📁 config/              # Configuraciones
│       │   │   └── 📄 constants.js     # Constantes globales
│       │   ├── 📁 data/                # Datos de la aplicación
│       │   │   └── 📄 donations.js     # Datos de donaciones
│       │   ├── 📁 modules/             # Módulos específicos
│       │   │   ├── 📄 navigation.js    # Navegación y pestañas
│       │   │   ├── 📄 animations.js    # Sistema de animaciones
│       │   │   └── 📄 charts.js        # Gráficos y visualizaciones
│       │   └── 📄 main.js              # Archivo principal de inicialización
│       ├── 📁 images/                  # Imágenes del sitio
│       │   └── 📄 .gitkeep            # Mantener carpeta en git
│       └── 📁 fonts/                   # Fuentes personalizadas (futuro)
│           └── 📄 .gitkeep            # Mantener carpeta en git
├── 📁 config/                          # Configuraciones del proyecto
│   ├── 📄 .htaccess                   # Configuración del servidor Apache
│   └── 📄 deploy.config.js            # Configuración de despliegue (futuro)
├── 📁 docs/                            # Documentación del proyecto
│   ├── 📄 ESTRUCTURA_PROYECTO.md      # Este archivo
│   ├── 📄 GUIA_DESARROLLO.md          # Guía para desarrolladores
│   ├── 📄 INSTALACION_CPANEL.md       # Guía de instalación en cPanel
│   └── 📄 MANTENIMIENTO.md            # Guía de mantenimiento
├── 📁 src/                             # Código fuente (para desarrollo futuro)
│   └── 📄 .gitkeep                    # Mantener carpeta en git
├── 📁 tests/                           # Tests automatizados (futuro)
│   └── 📄 .gitkeep                    # Mantener carpeta en git
├── 📄 package.json                     # Configuración de Node.js y scripts
├── 📄 .gitignore                       # Archivos a ignorar en git
├── 📄 README.md                        # Documentación principal
└── 📄 CHANGELOG.md                     # Registro de cambios
```

## 🏗️ Principios de Arquitectura

### 1. **Separación de Responsabilidades**
- **HTML**: Estructura semántica
- **CSS**: Presentación visual modular
- **JavaScript**: Funcionalidad organizada en módulos

### 2. **Modularidad**
```javascript
// Estructura modular de JavaScript
├── config/constants.js     // Configuración global
├── data/donations.js       // Datos de negocio
├── modules/
│   ├── navigation.js       // Navegación entre pestañas
│   ├── animations.js       // Sistema de animaciones
│   └── charts.js          // Visualización de datos
└── main.js                // Orquestador principal
```

### 3. **Escalabilidad**
- Preparado para agregar nuevas funcionalidades
- Sistema de configuración centralizado
- API endpoints preparados para futuras integraciones

### 4. **Performance**
- Carga lazy de imágenes
- CSS y JS separados por responsabilidad
- Compresión y caché configurados

## 📋 Convenciones de Nomenclatura

### Archivos y Carpetas
```
kebab-case          // Para nombres de archivos y carpetas
camelCase           // Para variables JavaScript
PascalCase          // Para constructores y clases
UPPER_SNAKE_CASE    // Para constantes
```

### CSS
```css
/* BEM Methodology */
.component-name              /* Bloque */
.component-name__element     /* Elemento */
.component-name--modifier    /* Modificador */

/* Utility Classes */
.text-accent                 /* Utilidades con prefijo */
.bg-secondary               /* Prefijos descriptivos */
```

### JavaScript
```javascript
// Funciones
function initMobileMenu() {}
function processAndRenderDonations() {}

// Variables
const donorsData = [];
let animationFlags = {};

// Constantes
const APP_CONFIG = {};
const CONTACT_INFO = {};
```

## 🔧 Configuración por Capas

### 1. **Configuración Global** (`config/constants.js`)
```javascript
const APP_CONFIG = {
    name: 'Fundación Te Quiero Feliz',
    version: '1.0.0',
    features: { ... },
    performance: { ... }
};
```

### 2. **Configuración de Estilos** (`css/main.css`)
```css
:root {
    --color-accent: #0EA5E9;
    --font-primary: 'Inter', sans-serif;
    --spacing-md: 1rem;
}
```

### 3. **Configuración del Servidor** (`.htaccess`)
- Compresión GZIP
- Headers de seguridad
- Caché del navegador
- Redirects HTTPS

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First */
@media (max-width: 767px)    { /* Mobile */ }
@media (min-width: 768px)    { /* Tablet */ }
@media (min-width: 1024px)   { /* Desktop */ }
@media (min-width: 1200px)   { /* Large Desktop */ }
```

### Grid System
- CSS Grid para layouts complejos
- Flexbox para componentes
- Container responsivo centralizado

## 🎨 Sistema de Design

### Colores
```css
:root {
    --color-accent: #0EA5E9;           /* Azul principal */
    --color-accent-light: #38BDF8;     /* Azul claro */
    --color-accent-dark: #0284C7;      /* Azul oscuro */
    --color-secondary-bg: #F0F9FF;     /* Fondo secundario */
    --color-text-primary: #374151;     /* Texto principal */
}
```

### Tipografía
```css
:root {
    --font-primary: 'Inter', sans-serif;
    --font-size-base: 1rem;
    --line-height-normal: 1.5;
    --font-weight-bold: 700;
}
```

### Espaciado
```css
:root {
    --spacing-xs: 0.25rem;    /* 4px */
    --spacing-sm: 0.5rem;     /* 8px */
    --spacing-md: 1rem;       /* 16px */
    --spacing-lg: 1.5rem;     /* 24px */
    --spacing-xl: 2rem;       /* 32px */
}
```

## 🔄 Flujo de Datos

### 1. **Inicialización**
```
index.html → main.js → modules → components
```

### 2. **Navegación**
```
User Action → navigation.js → tab switching → content update
```

### 3. **Datos**
```
donations.js → charts.js → Chart.js → DOM rendering
```

## 🚀 Proceso de Despliegue

### 1. **Desarrollo Local**
```bash
npm run dev          # Servidor de desarrollo
npm run lint:css     # Validar CSS
npm run lint:js      # Validar JavaScript
```

### 2. **Construcción**
```bash
npm run build        # Optimizar assets
npm run validate     # Validar HTML
```

### 3. **Despliegue**
```bash
npm run deploy       # Subir a cPanel
```

## 📊 Métricas de Performance

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimizaciones
- Images: WebP format, lazy loading
- CSS: Critical path, minification
- JS: Code splitting, defer loading
- Fonts: Font display swap

## 🔐 Seguridad

### Headers de Seguridad
```apache
# .htaccess
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set X-Frame-Options SAMEORIGIN
```

### Content Security Policy
```
script-src 'self' 'unsafe-inline' cdn.tailwindcss.com cdn.jsdelivr.net
style-src 'self' 'unsafe-inline' fonts.googleapis.com
```

## 🧪 Testing Strategy

### Niveles de Testing
1. **Unit Tests**: Funciones individuales
2. **Integration Tests**: Módulos interactuando
3. **E2E Tests**: Flujos completos de usuario
4. **Visual Tests**: Regresión visual

### Herramientas Sugeridas
- Jest (Unit testing)
- Cypress (E2E testing)
- Lighthouse (Performance)
- axe-core (Accessibility)

## 📈 Monitoreo y Analytics

### Métricas Clave
- Page views y unique visitors
- Bounce rate y session duration
- Core Web Vitals
- Error tracking

### Herramientas
- Google Analytics 4
- Google Search Console
- Real User Monitoring (RUM)

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.0.0  
**Mantenido por**: Equipo de Desarrollo FTQF 