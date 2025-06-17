# 🏆 Fundación Te Quiero Feliz - Sitio Web Oficial

Este es el sitio web oficial de la **Fundación Te Quiero Feliz**, una organización sin fines de lucro que proporciona transporte gratuito especializado para personas con discapacidad y adultos mayores en Iquique y Alto Hospicio, Chile.

## 🚀 Características

- **🌐 Single Page Application (SPA)**: Navegación fluida sin recarga de página
- **📱 Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **♿ Accesibilidad**: Cumple con estándares WCAG para inclusión digital
- **📊 Visualización de Datos**: Gráficos interactivos con Chart.js
- **🎨 Animaciones CSS**: Transiciones suaves y efectos visuales
- **🚀 SEO Optimizado**: Meta tags, Schema.org y Open Graph
- **⚡ Performance**: Optimizado para carga rápida y Core Web Vitals
- **🏗️ Arquitectura Modular**: Código organizado y escalable
- **🔐 Seguridad**: Headers de seguridad y protección XSS

## 📁 Estructura del Proyecto

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
│       └── 📁 fonts/                   # Fuentes personalizadas
├── 📁 config/                          # Configuraciones del proyecto
│   └── 📄 .htaccess                   # Configuración del servidor Apache
├── 📁 docs/                            # Documentación del proyecto
│   ├── 📄 ESTRUCTURA_PROYECTO.md      # Arquitectura del proyecto
│   └── 📄 INSTALACION_CPANEL.md       # Guía de instalación en cPanel
├── 📁 src/                             # Código fuente (para desarrollo futuro)
├── 📁 tests/                           # Tests automatizados
├── 📄 package.json                     # Configuración de Node.js y scripts
├── 📄 .gitignore                       # Archivos a ignorar en git
├── 📄 README.md                        # Documentación principal
└── 📄 CHANGELOG.md                     # Registro de cambios
```

## 🛠️ Instalación en cPanel

### Paso 1: Preparar los Archivos
1. Descarga todos los archivos del proyecto
2. Asegúrate de que la estructura de carpetas esté correcta

### Paso 2: Subir al Hosting
1. Accede a tu cPanel
2. Ve a "Administrador de archivos"
3. Navega a la carpeta `public_html`
4. Sube todos los archivos manteniendo la estructura

### Paso 3: Configurar el Dominio
1. Si usas un subdominio, asegúrate de que apunte a la carpeta correcta
2. Para el dominio principal, los archivos deben estar en `public_html`

### Paso 4: Verificar Permisos
- Archivos: 644
- Carpetas: 755
- .htaccess: 644

## 📝 Personalización

### Modificar Información de Contacto
Edita `index.html` y busca:
- Número de teléfono: `+56990062213`
- Email: `donaciones@tequierofeliz.cl`
- Datos bancarios en la sección "Apoyo Directo"

### Actualizar Datos de Donaciones
En `assets/js/main.js`, modifica el array `donorsData` con nuevos datos.

### Cambiar Contenido
Todas las secciones están en `index.html` con IDs claros:
- `#mision`: Información sobre la misión
- `#impacto`: Estadísticas e impacto
- `#alianza`: Información sobre alianzas
- `#donantes`: Muro de transparencia
- `#sumate`: Formas de apoyar

## 🎨 Personalización Visual

### Colores
Los colores principales están definidos en `assets/css/styles.css`:
```css
:root {
    --color-accent: #0EA5E9;        /* Color principal */
    --color-accent-rgb: 14, 165, 233;
    --color-secondary-bg: #F0F9FF;  /* Fondo secundario */
    --color-text-primary: #374151;  /* Texto principal */
    --color-text-secondary: #4B5563; /* Texto secundario */
}
```

### Fuentes
El sitio usa Inter desde Google Fonts. Para cambiar:
1. Modifica el link en `index.html`
2. Actualiza `--font-primary` en CSS

## 🔧 Mantenimiento

### Actualizar Datos de Donaciones
1. Edita `assets/js/main.js`
2. Añade nuevas entradas al array `donorsData`
3. Sube el archivo modificado

### Backup Regular
- Respalda la carpeta completa mensualmente
- Usa la función de backup de cPanel

### Monitoreo
- Revisa Google Analytics (si está configurado)
- Verifica el funcionamiento de formularios
- Comprueba links rotos regularmente

## 📱 Funcionalidades Técnicas

### Responsive Design
- Mobile-first approach
- Breakpoints de Tailwind CSS
- Navegación móvil optimizada

### SEO Optimizado
- Meta tags completos
- Schema.org markup
- Sitemap XML
- URLs amigables
- Open Graph para redes sociales

### Performance
- Compresión GZIP activada
- Caché de navegador configurado
- CDN para librerías externas
- Imágenes optimizadas

## 🛡️ Seguridad

### Headers de Seguridad
- X-Content-Type-Options
- X-XSS-Protection
- X-Frame-Options
- Content Security Policy

### Protección de Archivos
- .htaccess protegido
- Logs protegidos
- Directory browsing deshabilitado

## 📞 Soporte

Para soporte técnico o modificaciones:
- **Teléfono**: +56 9 9006 2213
- **Email**: contacto@fundaciontequierofeliz.cl

## 📄 Licencia

Este proyecto está desarrollado específicamente para la Fundación Te Quiero Feliz. Todos los derechos reservados.

---

**Fundación Te Quiero Feliz**  
*Movilizando la esperanza y la dignidad en Iquique y Alto Hospicio* 