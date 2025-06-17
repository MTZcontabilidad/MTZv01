# 🚀 Guía de Instalación en cPanel - Fundación Te Quiero Feliz

Esta guía te ayudará a subir y configurar el sitio web de la fundación en tu hosting compartido con cPanel.

## 📋 Requisitos Previos

- Acceso a cPanel de tu hosting
- Dominio **fundaciontequierofeliz.cl** configurado
- Los archivos del proyecto descargados

## 🔧 Paso 1: Acceder a cPanel

1. Ve a tu panel de control de hosting
2. Busca e ingresa a **cPanel**
3. Localiza la sección **"Archivos"**
4. Haz clic en **"Administrador de archivos"**

## 📁 Paso 2: Navegar a la Carpeta Correcta

### Para dominio principal (fundaciontequierofeliz.cl):
- Ve a la carpeta **`public_html`**

### Para subdominio (ej: www.fundaciontequierofeliz.cl):
- Ve a la carpeta **`public_html/subdominio`** (si aplica)

## ⬆️ Paso 3: Subir Archivos

### Opción A: Subir archivo ZIP
1. Comprime todos los archivos del proyecto en un ZIP
2. En el administrador de archivos, haz clic en **"Subir"**
3. Selecciona tu archivo ZIP
4. Una vez subido, haz clic derecho sobre el ZIP
5. Selecciona **"Extraer"**
6. Elimina el archivo ZIP después de extraer

### Opción B: Subir archivos individuales
1. Haz clic en **"Subir"**
2. Selecciona todos los archivos y carpetas
3. Espera a que se complete la subida

## 📋 Paso 4: Verificar Estructura de Archivos

Asegúrate de que la estructura sea:
```
public_html/
├── index.html
├── 404.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── README.md
├── INSTALACION_CPANEL.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── main.js
    └── images/
        └── .gitkeep
```

## 🔑 Paso 5: Configurar Permisos

1. Selecciona todos los archivos (excepto .htaccess)
2. Haz clic derecho y selecciona **"Permisos"**
3. Configura:
   - **Archivos**: 644
   - **Carpetas**: 755
   - **.htaccess**: 644

### Para configurar permisos específicos:
- Haz clic derecho en cada archivo/carpeta
- Selecciona **"Permisos"**
- Ingresa el número correspondiente

## 🌐 Paso 6: Configurar Dominio (si es necesario)

### Si usas el dominio principal:
- Los archivos ya están en la ubicación correcta

### Si usas un subdominio:
1. En cPanel, ve a **"Subdominios"**
2. Crea el subdominio si no existe
3. Asegúrate de que apunte a la carpeta correcta

## ✅ Paso 7: Verificar Funcionamiento

1. Ve a **https://fundaciontequierofeliz.cl**
2. Verifica que el sitio carga correctamente
3. Prueba la navegación entre pestañas
4. Verifica que los gráficos se cargan en las secciones correspondientes

## 🔧 Paso 8: Configuraciones Adicionales

### SSL/HTTPS
1. En cPanel, ve a **"SSL/TLS"**
2. Activa **"Force HTTPS Redirect"** si está disponible
3. El archivo .htaccess ya incluye redirección HTTPS

### Configuración de Email (Opcional)
Si quieres usar emails con tu dominio:
1. Ve a **"Cuentas de correo"** en cPanel
2. Crea: `contacto@fundaciontequierofeliz.cl`
3. Crea: `donaciones@fundaciontequierofeliz.cl`

## 📊 Paso 9: Configurar Estadísticas (Opcional)

### Google Analytics
1. Crea una cuenta en Google Analytics
2. Obtén tu código de seguimiento
3. Edita `index.html` y añade el código antes de `</head>`

### Google Search Console
1. Ve a Google Search Console
2. Añade tu dominio
3. Verifica la propiedad subiendo el archivo de verificación

## 🔍 Paso 10: Verificaciones Finales

### ✅ Lista de Verificación:
- [ ] El sitio carga en **https://fundaciontequierofeliz.cl**
- [ ] Todas las pestañas funcionan correctamente
- [ ] Los gráficos se muestran en las secciones de impacto y donantes
- [ ] El menú móvil funciona
- [ ] La página 404 se muestra correctamente
- [ ] El sitemap.xml es accesible
- [ ] Los redirects HTTPS funcionan

### 🧪 Pruebas de Funcionalidad:
1. **Navegación**: Prueba cada pestaña del menú
2. **Responsive**: Verifica en móvil, tablet y desktop
3. **Velocidad**: Usa PageSpeed Insights de Google
4. **SEO**: Verifica con herramientas como SEMrush o Ahrefs

## 🛠️ Solución de Problemas Comunes

### El sitio no carga:
- Verifica que `index.html` esté en la carpeta correcta
- Comprueba los permisos de archivos
- Revisa si hay errores en el log de errores de cPanel

### Error 500:
- Verifica la sintaxis del archivo `.htaccess`
- Comprueba los permisos (644 para archivos, 755 para carpetas)

### Las imágenes no cargan:
- Sube las imágenes necesarias a `assets/images/`
- Verifica las rutas en el HTML
- Comprueba los permisos de la carpeta images

### Los gráficos no se muestran:
- Verifica que Chart.js se carga desde el CDN
- Comprueba la consola del navegador por errores
- Asegúrate de que JavaScript esté habilitado

## 📞 Soporte

Si necesitas ayuda adicional:
- **Contacto técnico**: Consulta con tu proveedor de hosting
- **Dudas del sitio**: +56 9 9006 2213

## 🎉 ¡Felicitaciones!

Tu sitio web ya está online y funcionando. Recuerda:
- Hacer backups regulares
- Mantener actualizado el contenido
- Monitorear el rendimiento
- Actualizar los datos de donaciones periódicamente

---

**Fundación Te Quiero Feliz**  
*Tecnología al servicio de la comunidad* 