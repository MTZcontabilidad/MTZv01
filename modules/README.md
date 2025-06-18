# Módulos MTZ - Documentación

## Estructura de Archivos

```
modules/
├── MTZ-01_Enlaces_Rapidos.html     # Enlaces a organismos fiscales
├── MTZ-02_Documentos_RRHH.html      # Generador de documentos RRHH
├── MTZ-03_Calculadoras_Tributarias.html # Calculadoras tributarias
├── MTZ-04_Formularios_Contacto.html  # Formularios de contacto
└── shared/                          # Recursos compartidos
    └── assets/
        ├── css/
        │   └── components.css       # Estilos compartidos
        └── js/
            └── mtz-common.js        # Funciones JavaScript compartidas
```

## Correcciones Realizadas

### 1. Estructura de Carpetas
- Creada la carpeta `shared/assets/css/` para estilos compartidos
- Creada la carpeta `shared/assets/js/` para scripts compartidos

### 2. Archivos Creados

#### components.css
Contiene todos los estilos compartidos necesarios:
- Estilos base y reset
- Clases para navegación (.mtz-back-navigation, .mtz-back-btn)
- Clases para headers (.mtz-header, .mtz-header-simple)
- Clases para secciones (.mtz-section, .mtz-section-title)
- Clases para botones (.mtz-link-button)
- Estilos responsive
- Animaciones y transiciones

#### mtz-common.js
Librería JavaScript con funciones compartidas:
- **MTZ.Format**: Funciones de formato (fechas, RUT, moneda)
- **MTZ.Analytics**: Tracking y analytics
- **MTZ.Utils**: Utilidades generales (notificaciones, validaciones)
- **MTZ.Storage**: Manejo de localStorage
- **MTZ.Forms**: Utilidades para formularios
- **MTZ.Calculations**: Cálculos tributarios (IVA, PPM, honorarios, sueldos)
- **MTZ.Notifications**: Sistema de notificaciones

### 3. Correcciones en HTML
- Corregidas todas las rutas a `../index.html` en los enlaces de navegación
- Mantenidas las referencias correctas a archivos compartidos

## Uso de los Módulos

### Enlaces de Navegación
Todos los módulos ahora tienen enlaces correctos para volver al index:
```html
<a href="../index.html" class="mtz-back-btn">
```

### Estilos Compartidos
Los módulos cargan los estilos compartidos:
```html
<link rel="stylesheet" href="shared/assets/css/components.css">
```

### Funciones JavaScript
Los módulos pueden usar las funciones compartidas:
```javascript
// Formatear RUT
MTZ.Format.formatRUT('123456789');

// Mostrar notificación
MTZ.Utils.showNotification('Mensaje', 'success');

// Calcular IVA
const resultado = MTZ.Calculations.iva.add(100000);

// Analytics
MTZ.Analytics.trackEvent('evento_personalizado');
```

## Notas Importantes

1. **Google Analytics**: El ID configurado es `G-MTZQF2024`. Debe reemplazarse con un ID real para producción.

2. **Compatibilidad**: Se mantuvieron clases sin prefijo "mtz-" para compatibilidad con código existente.

3. **Responsive**: Todos los estilos incluyen media queries para dispositivos móviles.

4. **Accesibilidad**: Se incluyen estados de focus y estilos para mejorar la accesibilidad.

## Problemas Resueltos

1. ✅ Referencias a archivos inexistentes
2. ✅ Funciones JavaScript no definidas
3. ✅ Rutas incorrectas de navegación
4. ✅ Inconsistencias en nombres de clases CSS
5. ✅ Falta de estructura organizada para recursos compartidos

## Próximos Pasos Recomendados

1. Implementar un sistema de build para minificar CSS/JS
2. Agregar más validaciones en los formularios
3. Implementar conexión real con backend para formularios
4. Agregar más calculadoras tributarias
5. Mejorar el sistema de analytics con eventos más detallados
