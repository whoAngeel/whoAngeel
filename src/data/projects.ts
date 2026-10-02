/**
 * Projects shown in the "Proyectos" section.
 *
 * - `order` controls display order (ascending). Gaps are intentional so new
 *   items can be slotted in without renumbering.
 * - `hidden: true` keeps an entry in the source without rendering it.
 * - `featured: true` renders the card full-width with a side-by-side layout.
 * - Image paths are relative to /public and are prefixed with BASE_URL at
 *   render time.
 * - Translatable fields (`name`, `detail`) are `Localized`; read them with
 *   `localize(value, locale)` from src/i18n.
 */
export type AwardKind = "ganador" | "top";

export interface Award {
  kind: AwardKind;
  /** Event name (proper noun, not translated), e.g. "Interledger Hackathon 2025". */
  event: string;
}

import type { Localized } from "../i18n";

export interface Project {
  /** Stable slug, used for anchors (`#proyecto-<id>`) and cross-links. */
  id: string;
  order: number;
  /** Plain string when the name is the same in every locale. */
  name: string | Localized;
  detail: Localized;
  stack: string[];
  /** Keys of `projects.tags` in the UI dictionary (translated at render). */
  tags: string[];
  images?: string[];
  /**
   * How screenshots fill the 16:9 media box. Default "cover" (crops, good
   * for desktop UIs). Use "contain" for portrait phone screenshots so the
   * whole screen stays visible.
   */
  imageFit?: "cover" | "contain";
  award?: Award;
  code?: string;
  demo?: string;
  featured?: boolean;
  hidden?: boolean;
}

const raw: Project[] = [
  {
    id: "rago",
    order: 1,
    featured: true,
    name: "RAGO",
    images: [
      "/projects/rago/image.png",
      "/projects/rago/image-copy.png",
      "/projects/rago/image-3.png",
      "/projects/rago/image-4.png",
    ],
    stack: ["Go", "RAG", "PostgreSQL", "Qdrant", "LangChain", "React", "JWT"],
    tags: ["personal"],
    detail: {
      es: "Sistema de Recuperación Aumentada por Generación (RAG) para la gestión y consulta inteligente de documentos. Los usuarios autenticados suben archivos y los organizan en colecciones indexadas, generando salas de chat dinámicas para que usuarios externos, sin autenticación, conversen directamente con la información.",
      en: "Retrieval-Augmented Generation (RAG) system for intelligent document management and querying. Authenticated users upload files and organize them into indexed collections, generating dynamic chat rooms where external, unauthenticated users can talk directly to the information.",
    },
    code: "https://github.com/whoAngeel/rago",
    demo: "https://rago.whoangel.work",
  },
  {
    id: "senda",
    order: 2,
    name: "Senda",
    stack: ["Go", "Gin", "MongoDB", "MinIO", "Redis", "Ollama", "WebSockets"],
    tags: ["personal", "wip"],
    detail: {
      es: "Extractor de documentos en Go que procesa PDFs localmente con LLMs vía Ollama. Content-Addressable Storage (SHA-256 + MinIO) para evitar duplicados, MongoDB para persistencia, cola en Redis para procesamiento asíncrono y actualizaciones en tiempo real por WebSockets.",
      en: "Go document extractor that processes PDFs locally with LLMs via Ollama. Content-Addressable Storage (SHA-256 + MinIO) to avoid duplicates, MongoDB for persistence, a Redis queue for async processing and real-time updates over WebSockets.",
    },
    code: "https://github.com/whoAngeel/senda",
  },
  {
    id: "oaxaca-artisan",
    order: 3,
    name: "Oaxaca Artisan",
    images: [
      "/projects/split-payments/image.png",
      "/projects/split-payments/image-2.png",
      "/projects/split-payments/image-3.png",
    ],
    stack: ["Go", "Flutter", "PostgreSQL", "Docker", "Open Payments", "WebSockets"],
    tags: ["personal", "interledger"],
    detail: {
      es: "Plataforma de pagos divididos sobre Open Payments de Interledger. Microservicios: Splitter API (motor genérico de split payments con GNAP + ILP), Gallery API (dominio de galerías y artesanos de Oaxaca) y app Flutter para compradores, con confirmación de pagos en tiempo real vía WebSocket.",
      en: "Split-payments platform built on Interledger's Open Payments. Microservices: Splitter API (generic split-payment engine with GNAP + ILP), Gallery API (domain for Oaxacan galleries and artisans) and a Flutter app for buyers, with real-time payment confirmation over WebSocket.",
    },
    code: "https://github.com/whoAngeel/split-payments",
  },
  {
    id: "mori",
    order: 4,
    name: "Mori",
    images: [
      "/projects/mori/home.png",
      "/projects/mori/draw-reveal.png",
      "/projects/mori/board.png",
      "/projects/mori/pair-qr.png",
      "/projects/mori/onboarding.png",
    ],
    imageFit: "contain",
    stack: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite", "Clean Architecture", "QR"],
    tags: ["personal"],
    detail: {
      es: "App Android de ahorro offline y sin backend para que dos personas hagan juntas el reto de los 365 días. Cada quien tiene su tablero de 365 casillas (la casilla 45 son $45 MXN) y cada día se sortea una casilla libre al azar. Sin servidor ni cuentas: el avance de la pareja se sincroniza mostrando y escaneando un código QR. Clean Architecture por features, Riverpod 3 y Drift sobre SQLite.",
      en: "Offline, backend-free Android savings app for two people to take on the 365-day challenge together. Each person gets a 365-square board (square 45 = $45 MXN) and a random free square is drawn every day. No server, no accounts: partners sync their progress by showing and scanning a QR code. Feature-based Clean Architecture, Riverpod 3 and Drift on SQLite.",
    },
    code: "https://github.com/whoAngeel/mori",
  },
  {
    id: "interledger-orquestacion",
    order: 10,
    name: { es: "Plataforma de Orquestación de Pagos Interoperables", en: "Interoperable Payments Orchestration Platform" },
    images: ["/projects/hackathon_interledger_2025.png", "/projects/hackathon_interledger_2025_2.png"],
    stack: ["GCP", "OpenPayments SDK", "Express.js", "Firestore", "Redis", "Docker"],
    tags: ["hackathon", "interledger"],
    award: { kind: "ganador", event: "Interledger Hackathon 2025" },
    detail: {
      es: "API en Node.js que actúa como motor de pagos interoperables con el protocolo Interledger y Open Payments. Arquitectura desacoplada, seguridad GNAP y flujo automatizado de split payments, desplegada en Google Cloud Run.",
      en: "Node.js API that acts as an interoperable payments engine using the Interledger protocol and Open Payments. Decoupled architecture, GNAP security and an automated split-payments flow, deployed on Google Cloud Run.",
    },
    code: "https://github.com/whoAngeel/interledger-hackathon-2025",
  },
  {
    id: "fundup",
    order: 15,
    name: { es: "FundUP — Crowdfunding con Open Payments", en: "FundUP — Crowdfunding with Open Payments" },
    images: ["/projects/fundup/image1.png", "/projects/fundup/image2.png", "/projects/fundup/image3.png"],
    stack: ["NestJS", "TypeScript", "MongoDB", "Redis", "Docker", "Open Payments"],
    tags: ["hackathon", "openpayments"],
    award: { kind: "ganador", event: "Open Payments Hackathon" },
    detail: {
      es: "Backend en NestJS para una plataforma de crowdfunding con pagos vía Open Payments e Interledger. Arquitectura modular con MongoDB, Redis, autenticación JWT y webhooks. Despliegue con Docker.",
      en: "NestJS backend for a crowdfunding platform with payments via Open Payments and Interledger. Modular architecture with MongoDB, Redis, JWT authentication and webhooks. Deployed with Docker.",
    },
    code: "https://github.com/whoAngeel/fundup-backend",
  },
  {
    id: "interledger-tourism",
    order: 18,
    hidden: true,
    name: "Interledger Tourism — Open Payments",
    stack: ["Node.js", "Express", "Open Payments", "Firestore", "Redis", "GCP", "Docker"],
    tags: ["hackathon", "interledger"],
    award: { kind: "ganador", event: "Interledger Hackathon 2025" },
    detail: {
      es: "Plataforma de orquestación de pagos para turismo sostenible con Interledger Protocol y Open Payments. Split payments, transferencias P2P, autorización GNAP y despliegue en GCP Cloud Run.",
      en: "Payment orchestration platform for sustainable tourism with the Interledger Protocol and Open Payments. Split payments, P2P transfers, GNAP authorization and deployment on GCP Cloud Run.",
    },
    code: "https://github.com/whoAngeel/interledger-hackathon-2025",
  },
  {
    id: "crowdfunding-desastres",
    order: 20,
    hidden: true,
    name: { es: "Crowdfunding para Desastres Naturales", en: "Natural Disaster Crowdfunding" },
    stack: ["Blockchain", "Web3", "Python"],
    tags: ["hackathon", "blockchain"],
    award: { kind: "ganador", event: "Interledger Foundation" },
    detail: {
      es: "Hackathon local → nacional/internacional con todo pagado. Ganamos porque resolvíamos problemas reales, no solo implementábamos la tecnología que la fundación quería.",
      en: "Local hackathon → national/international stage, all expenses paid. We won because we solved real problems, not just implemented the technology the foundation wanted.",
    },
  },
  {
    id: "flight-monitor",
    order: 22,
    name: { es: "Monitoreo de Vuelos CDMX", en: "CDMX Flight Monitor" },
    images: [
      "/projects/flight-monitor/image.png",
      "/projects/flight-monitor/image2.png",
      "/projects/flight-monitor/image-3.png",
    ],
    stack: ["Python", "API", "React", "WebSockets", "Snowflake"],
    tags: ["hackathon"],
    award: { kind: "ganador", event: "Hackathon ITIZ 2025" },
    detail: {
      es: "Aplicación web para centralizar, rastrear y administrar las operaciones aéreas del espacio metropolitano de la Ciudad de México en tiempo real. Captura los datos de vuelos, procesa itinerarios y los proyecta en un panel interactivo para supervisar despegues, aterrizajes y estados de las aeronaves.",
      en: "Web app to centralize, track and manage air operations across Mexico City's metropolitan airspace in real time. It captures flight data, processes itineraries and projects them onto an interactive dashboard to monitor takeoffs, landings and aircraft status.",
    },
    code: "https://github.com/whoAngeel/flight-monitor-backend",
  },
  {
    id: "n8n-exporter",
    order: 27,
    name: "n8n-exporter",
    images: ["/projects/n8n-exporter/image-copy.png", "/projects/n8n-exporter/image-copy-2.png"],
    stack: ["Go", "Charm CLI", "TUI"],
    tags: ["personal"],
    detail: {
      es: "Herramienta de terminal que simplifica la exportación de workflows de n8n. Automatiza la limpieza de los flujos y elimina datos basura o temporales.",
      en: "Terminal tool that simplifies exporting n8n workflows. Automates workflow cleanup and strips junk or temporary data.",
    },
  },
  {
    id: "seci",
    order: 28,
    name: "SECI",
    images: ["/projects/seci/image.png", "/projects/seci/image-copy.png"],
    stack: ["Flutter", "Hive"],
    tags: ["personal", "escolar"],
    detail: {
      es: "Sistema de Entradas para el Centro de Información. Contabiliza las entradas a la biblioteca universitaria por carrera; antes se hacía manualmente en Excel.",
      en: "Entry system for the university Information Center. Counts library entries by degree program; it used to be done manually in Excel.",
    },
    code: "https://github.com/whoAngeel/seci-desktop-offline",
  },
  {
    id: "exoplanets",
    order: 30,
    name: "Exoplanets with AI",
    stack: ["Python", "Machine Learning", "NASA", "Cloud Functions", "GCP"],
    tags: ["hackathon", "nasa"],
    award: { kind: "top", event: "NASA Space Apps Challenge 2025" },
    detail: {
      es: "Aplicación web interactiva para democratizar el estudio de exoplanetas con Inteligencia Artificial, destacada en la etapa nacional del hackathon de la NASA. Unifica datos públicos de misiones espaciales y usa modelos predictivos para analizar y visualizar la habitabilidad de mundos distantes en tiempo real.",
      en: "Interactive web app that democratizes the study of exoplanets with Artificial Intelligence, a standout project in the national stage of NASA's hackathon. It unifies public space-mission data and uses predictive models to analyze and visualize the habitability of distant worlds in real time.",
    },
    code: "https://github.com/whoAngeel/exoplanets-with-ai",
  },
];

export const projects = raw
  .filter((p) => !p.hidden)
  .sort((a, b) => a.order - b.order);

