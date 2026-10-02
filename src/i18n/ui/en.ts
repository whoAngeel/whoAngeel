/** English UI strings. Must match the shape of `es` (see src/i18n/ui/es.ts). */
import type { UI } from "../index";

export const en: UI = {
  meta: {
    title: "whoAngeel — Angel Zorrilla · Full stack developer",
    description: "Portfolio of Angel Jesus Zorrilla Cuevas (whoAngeel): full stack developer, Python and Go backends, applied AI and hackathons.",
  },
  a11y: {
    skipLink: "Skip to content",
    opensNewTab: "(opens in a new tab)",
    stack: "Stack",
  },
  loader: "loading",
  nav: {
    label: "Sections",
    experience: "Experience",
    projects: "Projects",
    achievements: "Achievements",
    skills: "Skills",
    contact: "Contact",
    downloadCv: "Download CV",
    language: "Language",
  },
  hero: {
    role: "Full stack developer",
    bio:
      'Computer Systems Engineer. I build backends with <span class="text-charm-text">Python</span> and <span class="text-charm-text">Go</span>, and frontends with React, Flutter and Astro. I have shipped production services on Google Cloud — from Cloud Functions to microservices on GKE — using multimodal AI to validate documents. I love solving real problems with well-built technology, competing in hackathons and building terminal tools.',
    ctaProjects: "see projects",
    ctaAchievements: "achievements",
    ctaContact: "contact",
    available: "available",
  },
  sections: {
    items: (n: string) => `${n} items`,
    experience: { title: "Experience" },
    projects: {
      title: "Projects",
      lead: "Personal products and hackathon projects",
    },
    achievements: {
      title: "Achievements",
      lead: "Hackathons and recognitions. Each one links to the project that earned it.",
    },
    skills: { title: "Skills" },
    contact: {
      title: "Contact",
      lead: "Open to collaborations, opportunities or just a virtual coffee.",
    },
  },
  projects: {
    view: "view:",
    viewsLabel: "Projects view",
    prev: "Previous project",
    next: "Next project",
    pause: "Pause auto-rotation",
    resume: "Resume auto-rotation",
    noScreenshots: "no screenshots yet",
    screenshotAlt: (name, i, total) => `${name} — screenshot ${i} of ${total}`,
    prevShot: (name) => `Previous screenshot of ${name}`,
    nextShot: (name) => `Next screenshot of ${name}`,
    demo: "demo",
    code: "code",
    of: (name) => `for ${name}`,
    award: { ganador: "WINNER", top: "NATIONAL TOP" },
    tags: {
      personal: "personal",
      wip: "wip",
      hackathon: "hackathon",
      interledger: "interledger",
      openpayments: "openpayments",
      blockchain: "blockchain",
      escolar: "school",
      nasa: "nasa",
    },
  },
  achievements: {
    prizes: (n) => (n === 1 ? "award" : "awards"),
    tops: (n) => (n === 1 ? "national top" : "national tops"),
    scope: "national and international hackathons",
    seeProject: "→ see project",
    credential: "credential",
    viewCertificate: (title) => `View certificate for ${title}`,
    kind: {
      "1er-lugar": "1ST PLACE",
      ganador: "WINNER",
      finalista: "NATIONAL TOP",
      certificacion: "CERTIFICATION",
    },
  },
  skills: {
    backend: "Backend",
    cloud: "Cloud & DevOps",
    frontend: "Frontend",
    ai: "AI & ML",
    tools: "Tools",
  },
  contact: {
    footer: "made with Astro and lots of coffee",
  },
};
