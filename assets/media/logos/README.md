# 🎨 Logos para MTZ Tributarias + Fundación Te Quiero Feliz

## 🏢 **LOGOS NECESARIOS:**

### **1. MTZ TRIBUTARIAS:**
- `mtz-logo-principal.png` - ✅ **RECIBIDO** - Mapache con sombrero (400x400px)
- `mtz-logo-horizontal.png` - Versión horizontal para header (600x200px)
- `mtz-logo-vertical.png` - Versión vertical para footer
- `mtz-logo-small.png` - Versión pequeña (100x100px)
- `mtz-favicon.png` - Para favicon (64x64px)

### **2. FUNDACIÓN TE QUIERO FELIZ:**
- `tqf-logo-principal.png` - Logo principal de la fundación
- `tqf-logo-horizontal.png` - Versión horizontal
- `tqf-logo-simbolo.png` - Solo el símbolo/icono
- `tqf-logo-texto.png` - Solo el texto

### **3. LOGOS COMBINADOS:**
- `mtz-tqf-alianza.png` - Logo conjunto de la alianza
- `mtz-tqf-horizontal.png` - Versión horizontal de ambos
- `colaboracion-logo.png` - Logo de colaboración

## 📐 **ESPECIFICACIONES TÉCNICAS:**

### **TAMAÑOS RECOMENDADOS:**
- **Principal:** 512x512px (cuadrado)
- **Header:** 200x80px (horizontal)
- **Footer:** 150x150px (cuadrado)
- **Favicon:** 32x32px, 64x64px

### **FORMATOS NECESARIOS:**
- **PNG:** Con transparencia (principal)
- **SVG:** Vectorial escalable (opcional)
- **ICO:** Para favicon del sitio
- **JPG:** Con fondo blanco (respaldo)

### **CALIDAD:**
- Resolución mínima: 300 DPI
- Peso máximo: 200KB por logo
- Fondo transparente preferible

## 🎯 **UBICACIONES EN LA LANDING:**

### **HEADER/NAVEGACIÓN:**
- Logo MTZ horizontal (esquina superior izquierda)
- Tamaño: ~180x60px

### **HERO SECTION:**
- Logo principal MTZ + TQF
- Tamaño: ~300x100px

### **SECCIÓN FUNDACIÓN:**
- Logo Te Quiero Feliz
- Tamaño: ~200x200px

### **FOOTER:**
- Logos combinados
- Tamaño: ~150x150px cada uno

### **FAVICON:**
- Icono en pestaña del navegador
- Tamaño: 32x32px

## 🎨 **COLORES DEL BRAND:**

### **MTZ TRIBUTARIAS:**
- Azul Corporativo: `#00d4ff`
- Negro: `#000000` (fondo texto MTZ)
- Rojo: `#FF0000` (corbata y detalles)
- Naranja: `#FF6600` (ojos del mapache)
- Blanco: `#FFFFFF` (texto y detalles)

### **FUNDACIÓN TQF:**
- Azul Cielo: `#00d4ff`
- Verde Esperanza: `#00ff88`
- Blanco: `#ffffff`
- Gris Oscuro: `#333333`

## 📁 **ESTRUCTURA DE ARCHIVOS:**
```
assets/media/logos/
├── mtz/
│   ├── mtz-logo-principal.png
│   ├── mtz-logo-horizontal.png
│   ├── mtz-logo-vertical.png
│   ├── mtz-logo-blanco.png
│   └── mtz-logo-negro.png
├── tqf/
│   ├── tqf-logo-principal.png
│   ├── tqf-logo-horizontal.png
│   ├── tqf-logo-simbolo.png
│   └── tqf-logo-texto.png
├── alianza/
│   ├── mtz-tqf-alianza.png
│   ├── mtz-tqf-horizontal.png
│   └── colaboracion-logo.png
└── favicon/
    ├── favicon-32x32.ico
    └── favicon-64x64.ico
```

## 🔧 **IMPLEMENTACIÓN EN CÓDIGO:**

### **CSS para logos responsivos:**
```css
.logo-principal {
    max-width: 200px;
    height: auto;
    transition: transform 0.3s ease;
}

.logo-principal:hover {
    transform: scale(1.05);
}

@media (max-width: 768px) {
    .logo-principal {
        max-width: 150px;
    }
}
```

### **HTML básico:**
```html
<img src="assets/media/logos/mtz/mtz-logo-principal.png" 
     alt="MTZ Tributarias" 
     class="logo-principal">
``` 