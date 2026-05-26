# Contenido del Portafolio

## Sección principal (Hero + Sobre mí)

La página de inicio (`/`) debe contener:

1. **ASCII art placeholder** — un bloque de arte ASCII decorativo. Aún no definido qué va, dejar un placeholder comentado como `<!-- ASCII ART PLACEHOLDER -->`.
2. **Quién soy** — nombre: Angel Jesus Zorrilla Cuevas (whoAngeel). Rol: desarrollador. Breve presentación de una línea.
3. **Sobre mí** — párrafo corto describiendo stack, experiencia, lo que me apasiona.

## Navbar

El header debe tener el siguiente order:

- **Experiencia**
- **Proyectos**
- **Habilidades**
- **Contacto**
- **Descargar CV** (botón con acento púrpura)

Ya no mostrar "Home" ni "About" como links separados — la sección principal es el propio home.

## Páginas

Es una sola página (`/index.astro`) con secciones ancladas por id. El navbar navega con anchor links `#experiencia`, `#proyectos`, `#habilidades`, `#contacto`.

Las animaciones de scroll usan GSAP + ScrollTrigger:
- Hero aparece al cargar (fade-in + slide-up)
- Secciones aparecen con scroll (ScrollTrigger, fade-in + slide-up)
- Tags de habilidades con stagger por categoría
