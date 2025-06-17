# 🔥 Firebase Analytics - Fundación Te Quiero Feliz

## 📊 Implementación de Analytics

Este documento describe la implementación de Firebase Analytics en el sitio web de la Fundación Te Quiero Feliz.

> **🌐 IMPORTANTE**: Firebase Analytics **SOLO se activa en PRODUCCIÓN** (fundaciontequierofeliz.cl). En desarrollo local está completamente deshabilitado.

## 🎯 Configuración

### Firebase Project
- **Project ID**: `fundaciontequierofeliz`
- **App ID**: `1:270225829930:web:d2a60e416b569f21321353`
- **Measurement ID**: `G-S2EKD1GYCR`

### Archivos de Configuración
```
public/assets/js/config/
├── firebase.js         # Configuración principal de Firebase (con detección de entorno)
└── constants.js        # Constantes globales (features.firebaseAnalytics: true)

public/assets/js/modules/
└── analytics.js        # Módulo de integración con eventos de la app
```

## 🌐 Detección de Entorno

### Dominios de Producción
Firebase Analytics **SOLO se activa** en:
- ✅ `fundaciontequierofeliz.cl`
- ✅ `www.fundaciontequierofeliz.cl`

### Entornos Deshabilitados
Firebase Analytics **NO se activa** en:
- ❌ `localhost`
- ❌ `127.0.0.1`
- ❌ `192.168.x.x` (redes locales)
- ❌ `10.x.x.x` (redes internas)
- ❌ Cualquier dominio que contenga "local"

### Modo Desarrollo
En desarrollo local verás en la consola:
```
🚫 Firebase deshabilitado en desarrollo local
🧪 Entorno: DESARROLLO - Firebase Analytics DESHABILITADO
💡 Para activar Analytics, sube el sitio a fundaciontequierofeliz.cl
🧪 [DEV] Evento simulado: tab_navigation {tab_name: "mision"}
```

## 📈 Eventos Tracked Automáticamente

### 🧭 Navegación
- **`tab_navigation`**: Cambios entre pestañas
- **`page_view`**: Visualización de página
- **`scroll_depth`**: Profundidad de scroll (25%, 50%, 75%, 100%)
- **`time_on_page`**: Tiempo en página (cada minuto)

### 💰 Interacciones con Donaciones
- **`donation_interaction`**: Interacciones con el muro de transparencia
- **`accordion_open/close`**: Apertura/cierre de categorías de donantes
- **`chart_view`**: Visualización de gráficos de donaciones

### 📞 Contacto y Engagement
- **`contact_interaction`**: Clics en teléfono, email, redes sociales
- **`external_link_click`**: Clics en enlaces externos
- **`hero_interaction`**: Interacciones con el botón CTA principal

### 🎯 Performance y Errores
- **`performance_metrics`**: Core Web Vitals y métricas de carga
- **`javascript_error`**: Errores de JavaScript capturados
- **`counter_animation_complete`**: Finalización de animaciones de contadores

## 🔧 Configuración Técnica

### Carga Condicional de Scripts
```javascript
// Solo cargar Firebase en producción
if (window.location.hostname === 'fundaciontequierofeliz.cl' || 
    window.location.hostname === 'www.fundaciontequierofeliz.cl') {
    
    // Cargar Firebase scripts dinámicamente
    var script1 = document.createElement('script');
    script1.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
    document.head.appendChild(script1);
    
    console.log('🔥 Firebase scripts cargados para producción');
} else {
    console.log('🚫 Firebase deshabilitado en desarrollo local');
}
```

### Inicialización
```javascript
function initializeFirebase() {
    // Verificar que estemos en producción
    if (!isProductionEnvironment()) {
        console.log('🚫 Firebase Analytics deshabilitado en desarrollo local');
        console.log('🌐 Solo se activará en: fundaciontequierofeliz.cl');
        return false;
    }
    
    // Solo aquí se inicializa Firebase realmente
    firebaseApp = firebase.initializeApp(firebaseConfig);
    analytics = firebase.analytics();
}
```

### Eventos en Desarrollo vs Producción
```javascript
function logCustomEvent(eventName, parameters = {}) {
    // Solo registrar eventos en producción
    if (!isProductionEnvironment()) {
        if (isLocalDevelopment()) {
            console.log('🧪 [DEV] Evento simulado:', eventName, parameters);
        }
        return;
    }
    
    // Solo aquí se envía a Firebase
    analytics.logEvent(eventName, {
        ...parameters,
        environment: 'production'
    });
}
```

## 📊 Estructura de Datos

### User Properties (Solo Producción)
```javascript
{
    organization: 'Fundacion_Te_Quiero_Feliz',
    site_type: 'nonprofit_website',
    environment: 'production'
}
```

### Event Categories
- **Navigation**: Navegación entre secciones
- **Donations**: Interacciones con donaciones
- **Contact**: Formas de contacto
- **External_Links**: Enlaces a sitios externos
- **Engagement**: Métricas de engagement
- **Data_Visualization**: Interacciones con gráficos

## 🚀 Deployment y Testing

### Testing Local
En desarrollo local:
```bash
npm run dev
# Abre http://localhost:3000
# Verás en consola: "🚫 Firebase deshabilitado en desarrollo local"
# Los eventos se muestran como: "🧪 [DEV] Evento simulado: ..."
```

### Testing Producción
En producción (fundaciontequierofeliz.cl):
```javascript
// Verás en consola:
"🌐 Entorno: PRODUCCIÓN - Firebase Analytics ACTIVO"
"📊 Firebase Analytics inicializado correctamente para PRODUCCIÓN"
"🔥 Firebase Analytics listo para la Fundación Te Quiero Feliz"
```

### Verificación Manual
```javascript
// En consola del navegador (solo en producción):
window.FirebaseConfig.isProductionEnvironment()  // true en producción
window.FirebaseConfig.isLocalDevelopment()       // false en producción
window.FirebaseConfig.isInitialized()            // true si está activo
```

## 📱 Beneficios de esta Configuración

### ✅ Ventajas
1. **Datos limpios**: No se contamina Analytics con datos de desarrollo
2. **Performance**: No se cargan scripts de Firebase en desarrollo
3. **Privacy**: No se envían datos desde entornos de desarrollo
4. **Debugging**: Logs claros en cada entorno
5. **Automático**: No requiere configuración manual por entorno

### 🔍 Logs por Entorno

#### Desarrollo Local
```
🚫 Firebase deshabilitado en desarrollo local
🧪 Entorno: DESARROLLO - Firebase Analytics DESHABILITADO
🧪 [DEV] Navegación a pestaña: mision
🧪 [DEV] Evento: contact_interaction {contact_method: "phone"}
```

#### Producción
```
🔥 Firebase scripts cargados para producción
🌐 Entorno: PRODUCCIÓN - Firebase Analytics ACTIVO
📊 Firebase Analytics inicializado correctamente para PRODUCCIÓN
📊 Evento registrado: tab_navigation {tab_name: "impacto"}
```

## 🔐 Privacidad y GDPR

### Solo en Producción
- ✅ Firebase **SOLO** recolecta datos en fundaciontequierofeliz.cl
- ✅ **NO** se recolectan datos en desarrollo local
- ✅ **NO** se almacenan datos personales
- ✅ IPs anonimizadas automáticamente por Firebase

### Cumplimiento
- Datos **SOLO** de usuarios reales del sitio oficial
- Sin contaminación de datos de desarrollo
- Sin tracking en entornos de testing

## 🔄 Mantenimiento

### Verificación Mensual
1. **Revisar Firebase Console**: Solo datos de producción
2. **Verificar entornos**: Desarrollo sigue sin Firebase
3. **Monitorear errores**: Solo errores de producción
4. **Analizar patrones**: Usuarios reales únicamente

---

**Configurado por**: Equipo de Desarrollo FTQF  
**Fecha**: Diciembre 2024  
**Firebase Project**: fundaciontequierofeliz  
**Entornos**: Producción ÚNICAMENTE 