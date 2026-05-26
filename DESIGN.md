---
name: whoAngeel Portfolio
description: Portafolio personal de Angel Jesus Zorrilla Cuevas (whoAngeel)
colors:
  primary: "#7c3aed"
  primary-strong: "#6d28d9"
  primary-soft: "#9d79f3"
  bg: "#09090d"
  surface: "#111214"
  surface-strong: "#16161d"
  border: "#27272e"
  border-soft: "#34343c"
  text: "#e6e9ef"
  muted: "#94a3b8"
  muted-soft: "#6b7280"
  success: "#22c55e"
  warning: "#f59e0b"
  danger: "#ef4444"
  info: "#38bdf8"
typography:
  display:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
  heading:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
  subheading:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
  caption:
    fontFamily: "Onest, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
---

# Design System: whoAngeel Portfolio

## 1. Overview

**Creative North Star: "La Terminal del Artesano"**

Un portafolio que se presenta como una interfaz de terminal de código — precisa, oscura, técnica. Cada elemento visual comunica que está hecho por un desarrollador que cuida los detalles. La pantalla de píxeles CRT no es decorativa: es la identidad misma, el código como medio de expresión.

El diseño es minimalista funcional. Nada sobra. Los espaciados son exactos, los colores tienen propósito, el contenido es lo único que compite por atención. Rechaza explícitamente el look de template de portafolio comprado, los gradients genéricos, el glassmorphism y cualquier adorno que no aporte significado.

**Key Characteristics:**
- Oscuro con acento púrpura técnico
- Fondo de terminal CRT (pixel grid + scanlines + viñeta)
- Sin sombras ni elevación artificial
- Tipografía de sistema (sin fuentes custom)
- Español como lengua del contenido

## 2. Colors

La paleta es deep dark con un solo acento cromático: el púrpura, usado con precisión quirúrgica.

### Primary
- **Púrpura Técnico** (#7c3aed): El único color cromático. Se usa en CTAs, links, y highlights interaccionales. Máximo ~10% de la superficie.
- **Púrpura Fuerte** (#6d28d9): Hover state del acento. Más profundo, mantiene contraste.
- **Púrpura Suave** (#9d79f3): Versión más clara para estados sutiles.

### Neutral
- **Fondo** (#09090d): Casi negro. La base de toda la interfaz.
- **Superficie** (#111214): Una muesca más clara que el fondo. Cards, contenedores.
- **Superficie Fuerte** (#16161d): Otra muesca. Elementos elevados dentro de superficies.
- **Borde** (#27272e): Líneas divisorias, bordes de componentes.
- **Borde Suave** (#34343c): Bordes secundarios, separaciones sutiles.
- **Texto** (#e6e9ef): Blanco ligeramente cálido para cuerpo.
- **Texto Apagado** (#94a3b8): Metadatos, descripciones secundarias.
- **Texto Apagado Suave** (#6b7280): Placeholders, lowest priority information.

### Semantic
- **Success** (#22c55e), **Warning** (#f59e0b), **Danger** (#ef4444), **Info** (#38bdf8): Solo en contextos funcionales.

### Named Rules
**La Regla del Acento Único.** El púrpura aparece en ≤10% de cualquier pantalla. Su rareza es lo que le da poder.

**La Regla de la Superficie Plana.** Sin sombras. La profundidad se construye exclusivamente por capas tonales: fondo → surface → surface-strong.

## 3. Typography

**Display Font:** Onest (con sistema como fallback)
**Body Font:** Onest (con sistema como fallback)

**Carácter:** Onest es una geométrica sans ucraniana — precisa, moderna, técnica sin ser fría. Un solo peso variable (300-900) que cubre todo el sistema. Cargada desde Google Fonts con `font-display: swap`.

La escala sigue una proporción 1.25 (major third), con tamaños fluidos para headings y fijos para body/texto funcional.

### Hierarchy
- **Display** (700, clamp(2.25rem, 5vw, 3rem), 1.15): Hero name en la home. Uso exclusivo.
- **Heading** (700, clamp(1.75rem, 3vw, 2.25rem), 1.15): Títulos de página (h1).
- **Subheading** (600, clamp(1.25rem, 2vw, 1.5rem), 1.3): Títulos de sección (h2), tarjetas.
- **Body** (400, 1rem / 16px, 1.6): Texto corriente. Límite de línea 65ch. Line-height aumentado para legibilidad en fondo oscuro.
- **Small** (400, 0.875rem / 14px, 1.4): Metadatos, navegación, secundario.
- **Caption** (400, 0.75rem / 12px, 1.4): Notas al pie, información de baja prioridad.

### Named Rules
**La Regla de la Precisión Geométrica.** Onest es una sola familia con rango completo de pesos. No se necesitan fuentes satélite. La personalidad viene del peso y espaciado, no de cambiar de tipo. 1.25 de ratio constante entre niveles.

## 4. Elevation

Sin sombras. Cero box-shadow en el sistema. La profundidad y jerarquía visual se logran exclusivamente mediante capas tonales de color: fondo (#09090d) → superficie (#111214) → superficie fuerte (#16161d). Un elemento darker es un plano más profundo; un elemento lighter está más cerca del usuario.

La única excepción es el shadow de Tailwind en el header, que puede reemplazarse por un borde inferior sutil para mantener la coherencia plana.

### Named Rules
**La Regla del Plano por Defecto.** Las superficies son planas en reposo. Sin sombras, sin blurs, sin elevación fingida.

## 5. Components

### Header
- **Fondo:** Hereda de body (transparente). Se apoya en el fondo global de terminal.
- **Layout:** Flexbox horizontal (justify-between). Logo/links a izquierda, CTA a derecha.
- **Navegación:** Links en fila con gap de 40px. Texto muted, opacidad 0.8.
- **CTA Button:** Fondo primary (#7c3aed), texto claro heredado, padding 4px.

### Links
- **Default:** color primary (#7c3aed), sin text-decoration.
- **Hover:** color primary-strong (#6d28d9).
- **Nav links:** muted text, sin subrayado.

### Selection
- **Background:** purple semi-transparent (rgba(124, 58, 237, 0.35)).

### CRT Background Overlay
- **Comportamiento:** Fijo (position: fixed), z-index 1000, pointer-events: none.
- **Scanlines:** repeating-linear-gradient, 1px dark cada 4px, opacidad 0.07.
- **Viñeta:** radial-gradient, transparent 55% → black 0.35 opacidad en bordes.

## 6. Do's and Don'ts

### Do:
- **Do** usar el púrpura como único acento cromático, en ≤10% de la superficie.
- **Do** construir jerarquía por capas tonales (bg → surface → surface-strong).
- **Do** mantener el fondo de terminal CRT como identidad visual.
- **Do** usar tipografía del sistema (system-ui stack).
- **Do** mantener el minimalismo funcional: cada elemento tiene un propósito.

### Don't:
- **Don't** usar gradients, glassmorphism, o decoración sin propósito.
- **Don't** usar más de 2 familias tipográficas.
- **Don't** usar sombras ni box-shadow (usar capas tonales en su lugar).
- **Don't** crear un look de template de portafolio comprado o "sacado de un tutorial".
- **Don't** usar más de un color acento.
- **Don't** usar cards idénticas con icono + heading + texto repetidas.
- **Don't** usar border-left mayor a 1px como stripe decorativo.
- **Don't** usar gradient text (background-clip: text).
