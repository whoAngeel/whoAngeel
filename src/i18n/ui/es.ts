/**
 * Spanish UI strings — the source of truth for the dictionary shape.
 * Every other locale must implement the same keys (typed as `UI`).
 * Strings used with `set:html` are authored here only (never user input).
 */
export const es = {
  meta: {
    title: "whoAngeel — Angel Zorrilla · Desarrollador full stack",
    description: "Portafolio de Angel Jesus Zorrilla Cuevas (whoAngeel): desarrollador full stack, backend en Python y Go, IA aplicada y hackathones.",
  },
  a11y: {
    skipLink: "Saltar al contenido",
    opensNewTab: "(abre en otra pestaña)",
    stack: "Stack",
  },
  loader: "cargando",
  nav: {
    label: "Secciones",
    experience: "Experiencia",
    projects: "Proyectos",
    achievements: "Logros",
    skills: "Habilidades",
    contact: "Contacto",
    downloadCv: "Descargar CV",
    language: "Idioma",
  },
  hero: {
    role: "Desarrollador full stack",
    bio:
      'Ingeniero en Sistemas Computacionales. Construyo backends con <span class="text-charm-text">Python</span> y <span class="text-charm-text">Go</span>, y frontends con React, Flutter y Astro. He llevado a producción servicios en Google Cloud — de Cloud Functions a microservicios en GKE — con IA multimodal para validar documentos. Me apasiona resolver problemas reales con tecnología bien hecha, competir en hackathones y construir herramientas de terminal.',
    ctaProjects: "ver proyectos",
    ctaAchievements: "logros",
    ctaContact: "contacto",
    available: "disponible",
  },
  sections: {
    items: (n: string) => `${n} items`,
    experience: { title: "Experiencia" },
    projects: {
      title: "Proyectos",
      lead: "Productos personales y proyectos de hackathones",
    },
    achievements: {
      title: "Logros",
      lead: "Hackathones y reconocimientos. Cada uno enlaza al proyecto con el que se obtuvo.",
    },
    skills: { title: "Habilidades" },
    contact: {
      title: "Contacto",
      lead: "Estoy abierto a colaboraciones, oportunidades o solo un café virtual.",
    },
  },
  projects: {
    view: "vista:",
    viewsLabel: "Vista de proyectos",
    prev: "Proyecto anterior",
    next: "Siguiente proyecto",
    pause: "Pausar rotación automática",
    resume: "Reanudar rotación automática",
    noScreenshots: "sin capturas todavía",
    screenshotAlt: (name: string, i: number, total: number) => `${name} — captura ${i} de ${total}`,
    prevShot: (name: string) => `Captura anterior de ${name}`,
    nextShot: (name: string) => `Siguiente captura de ${name}`,
    demo: "demo",
    code: "código",
    of: (name: string) => `de ${name}`,
    award: { ganador: "GANADOR", top: "TOP NACIONAL" },
    tags: {
      personal: "personal",
      wip: "wip",
      hackathon: "hackathon",
      interledger: "interledger",
      openpayments: "openpayments",
      blockchain: "blockchain",
      escolar: "escolar",
      nasa: "nasa",
    } as Record<string, string>,
  },
  achievements: {
    prizes: (n: number): string => (n === 1 ? "premio" : "premios"),
    tops: (n: number): string => (n === 1 ? "top nacional" : "top nacionales"),
    scope: "hackathones nacionales e internacionales",
    seeProject: "→ ver proyecto",
    credential: "credencial",
    viewCertificate: (title: string) => `Ver certificado de ${title}`,
    kind: {
      "1er-lugar": "1ER LUGAR",
      ganador: "GANADOR",
      finalista: "TOP NACIONAL",
      certificacion: "CERTIFICACIÓN",
    },
  },
  skills: {
    backend: "Backend",
    cloud: "Cloud & DevOps",
    frontend: "Frontend",
    ai: "AI & ML",
    tools: "Herramientas",
  },
  contact: {
    footer: "hecho con Astro y mucho café",
  },
};
