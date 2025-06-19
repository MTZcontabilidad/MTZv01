# 📝 CHANGELOG - MTZ Portal 3D

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-06-18

### ✨ Agregado
- Portal 3D interactivo con cubo de servicios tributarios
- 6 caras de servicios: SII, PREVIRED, Dirección del Trabajo, Tesorería, TQF, MTZ
- Controles táctiles para dispositivos móviles
- Controles de mouse para desktop
- Sistema de luces básicas con iluminación profesional
- Panel de información interactivo
- Rotación automática sutil
- Detección de caras mejorada
- Sistema de loading con transiciones suaves
- Diseño responsive universal

### 🔧 Técnico
- Three.js R150 como motor 3D
- MeshLambertMaterial para mejor respuesta a luces
- Sistema de raycasting para detección de clicks
- Manejo robusto de errores
- Arquitectura modular y limpia

### 🧹 Limpieza
- Eliminados módulos innecesarios (MTZ-01 a MTZ-08)
- Removida carpeta modules completa
- Estructura de archivos reorganizada
- Código optimizado y comentarios limpios
- Logs de debug profesionales

### 📁 Estructura
- Reorganización completa de carpetas
- Separación clara entre src/ y docs/
- Nombres de archivos más descriptivos
- Referencias actualizadas en HTML

## [0.9.0] - 2025-06-18

### 🔄 Cambios Mayores
- Limpieza total del código base
- Eliminación de efectos complejos innecesarios
- Simplificación de la lógica de inicialización

### 🐛 Corregido
- Detección de caras del cubo funcionando correctamente
- Problema con materialIndex resuelto
- Sistema de clicks/touch mejorado

## [0.8.0] - 2025-06-18

### 🎯 Inicial
- Versión inicial del cubo 3D básico
- Funcionalidad core implementada
- Base para futuras mejoras

---

## 🔮 Próximas Versiones

### [1.1.0] - Planificado
- [ ] Mejoras visuales graduales
- [ ] Texturas personalizadas para cada cara
- [ ] Efectos de hover más sutiles
- [ ] Optimizaciones de rendimiento adicionales

### [1.2.0] - Futuro
- [ ] Modo oscuro/claro
- [ ] Configuraciones de usuario
- [ ] Analytics de interacción
- [ ] PWA con funcionalidad offline

---

**Formato de versiones:**
- **MAJOR**: Cambios incompatibles en la API
- **MINOR**: Funcionalidades nuevas compatibles
- **PATCH**: Correcciones de bugs compatibles 