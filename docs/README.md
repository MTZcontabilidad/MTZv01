# MTZ Tributarias - Portal 3D

## 🚀 Estructura del Proyecto

```
HTML GRATUITO/
├── index.html                    # Landing page principal
├── assets/
│   ├── css/
│   │   ├── main.css             # Estilos principales
│   │   └── animations.css       # Animaciones y efectos
│   ├── js/
│   │   ├── config.json          # Configuración del cubo
│   │   ├── main.js              # Lógica principal
│   │   ├── cube.js              # Geometría 3D
│   │   └── effects.js           # Sistema de partículas
│   └── media/                   # Imágenes y videos
├── modules/                     # Módulos MTZ
│   ├── MTZ-01_Enlaces_Rapidos.html
│   ├── MTZ-02_Documentos_RRHH.html
│   ├── MTZ-03_Calculadoras_Tributarias.html
│   └── MTZ-04_Formularios_Contacto.html
└── docs/                        # Documentación
    └── README.md               # Este archivo
```

## 🎮 Características

- **Cubo 3D Interactivo**: Navegación futurista con esquinas redondeadas
- **Click en Caras**: Solo se puede hacer clic en las caras del cubo
- **Efectos Visuales**: Partículas, glow, wireframe holográfico
- **Responsive**: Adaptado para móviles y tablets
- **Modular**: Código separado en archivos para fácil mantenimiento

## 🛠️ Configuración

Edita `assets/js/config.json` para:
- Cambiar información de las caras del cubo
- Modificar colores e iconos
- Ajustar velocidades de animación
- Personalizar el menú de navegación

## 📱 Controles

- **Arrastrar**: Rotar el cubo
- **Click**: Acceder a los módulos
- **Scroll**: Zoom in/out
- **Touch**: Gestos táctiles en móvil

## 🎨 Personalización

### Colores
En `assets/css/main.css`:
```css
:root {
    --primary-cyan: #00d4ff;
    --primary-pink: #ff0080;
    --primary-purple: #8000ff;
    --primary-green: #00ff88;
}
```

### Velocidad de Rotación
En `assets/js/config.json`:
```json
"settings": {
    "rotationSpeed": 0.0005
}
```

## 📄 Licencia

© 2025 MTZ Tributarias - Todos los derechos reservados
