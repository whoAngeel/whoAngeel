# Contenido del Portafolio

## Sección principal (Hero + Sobre mí)

La página de inicio (`/`) debe contener:

1. **ASCII art** — animación "whoami" (port vanilla de React Bits `ASCIIText`, en `src/scripts/ascii-text.ts`, cargada en diferido con three.js). Fallback estático figlet si no hay WebGL.
2. **Quién soy** — nombre: Angel Jesus Zorrilla Cuevas (whoAngeel). Rol: desarrollador. Breve presentación de una línea.
3. **Sobre mí** — párrafo corto describiendo stack, experiencia, lo que me apasiona.

## Navbar

El header debe tener el siguiente order:

- **Experiencia**
- **Proyectos**
- **Logros**
- **Habilidades**
- **Contacto**
- **Descargar CV** (botón con acento púrpura)

Ya no mostrar "Home" ni "About" como links separados — la sección principal es el propio home.

## Páginas

Es una sola página (`src/views/Home.astro`, renderizada por `src/pages/index.astro` y `src/pages/en/index.astro`) con secciones ancladas por id. El navbar navega con anchor links `#experiencia`, `#proyectos`, `#logros`, `#habilidades`, `#contacto`.

## Datos

- Proyectos: `src/data/projects.ts` (tipado; `hidden`, `featured`, `order`).
- Logros: `src/data/achievements.ts` (certificados en `public/achievements/`).

## Componentes TUI reutilizables

- `Frame.astro` — caja estilo Lipgloss con título en el borde.
- `SectionHeader.astro` — encabezado de sección (`❯ cd ~/<id>` + h2).
- `ProjectBody.astro` — contenido de un proyecto, compartido por las vistas swap y grid.

## Proyectos: vistas

- Switch `[ swap ] [ grid ]`; **swap es la vista por defecto** (pila animada, port vanilla de React Bits `CardSwap` en `src/scripts/card-swap.ts`) con panel de detalle sincronizado.
- La vista elegida se guarda en `localStorage` (`projects-view`) y se aplica antes del primer render vía script inline en `Layout.astro` (`html[data-projects-view]`). Sin JS se muestra el grid.
- Clases globales en `global.css`: `.tui-chip`, `.tui-badge`, `.tui-btn`, `.tui-prompt`, `.tui-cursor`.

Las animaciones de scroll usan GSAP + ScrollTrigger:
- Hero aparece al cargar (fade-in + slide-up)
- Secciones aparecen con scroll (ScrollTrigger, fade-in + slide-up)
- Tags de habilidades con stagger por categoría
- Todo se desactiva con `prefers-reduced-motion`

## i18n

- Idiomas: `es` (default, raíz `/whoAngeel/`) y `en` (`/whoAngeel/en/`). Routing nativo de Astro (`i18n` en `astro.config.mjs`, `prefixDefaultLocale: false`).
- Textos de UI: `src/i18n/ui/es.ts` (fuente de verdad del shape) y `src/i18n/ui/en.ts` (tipado como `UI`, TypeScript marca claves faltantes).
- Contenido: campos `Localized` en `src/data/*.ts` (`{ es, en }`), leídos con `localize(value, locale)`.
- En componentes: `const locale = getLocale(Astro.currentLocale); const t = useTranslations(locale);`.
- Comandos de terminal (`cat whoami.txt`, `cd ~/projects`) NO se traducen: viven en `shell` (`src/i18n/index.ts`), en inglés para todos los idiomas.
- Los ids de sección son los mismos en ambos idiomas (slugs en español) para que el selector `ES | EN` conserve la sección actual.
- Strings que necesita JS del cliente se pasan como `data-*` desde el servidor (ej. botón de pausa en Proyectos).
- Nunca escribir texto visible hardcodeado en componentes: agregarlo al diccionario.
