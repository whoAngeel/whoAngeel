/**
 * Work experience shown in the "Experiencia" timeline (newest first).
 * Each role contains one or more projects rendered as tree nodes.
 * Translatable fields are `Localized`; read with `localize()` from src/i18n.
 */
import type { Localized } from "../i18n";

export interface ExperienceProject {
  title: Localized;
  detail: Localized;
  stack: string[];
}

export interface ExperienceRole {
  id: string;
  period: Localized;
  title: Localized;
  /** Company / context line under the title. */
  org: Localized;
  projects: ExperienceProject[];
}

export const experience: ExperienceRole[] = [
  {
    id: "scory",
    period: { es: "Nov 2025 — Presente", en: "Nov 2025 — Present" },
    title: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    org: {
      es: "Scory · KYC/KYB · Medio tiempo desde Nov 2025, tiempo completo (freelance) desde Mar 2026",
      en: "Scory · KYC/KYB · Part-time since Nov 2025, full-time (freelance) since Mar 2026",
    },
    projects: [
      {
        title: { es: "Plataforma de verificación KYC/KYB", en: "KYC/KYB verification platform" },
        detail: {
          es: "Desarrollo full stack de la plataforma: backend en Python sobre PostgreSQL y frontend en React y Next.js. Diseño y mantengo agentes de IA con n8n y LangChain que procesan grandes volúmenes de documentos de identidad y empresariales, orquestados en más de 60 workflows de n8n.",
          en: "Full stack development of the platform: Python backend on PostgreSQL and a React and Next.js frontend. I design and maintain AI agents with n8n and LangChain that process large volumes of identity and business documents, orchestrated across 60+ n8n workflows.",
        },
        stack: ["Python", "PostgreSQL", "React", "Next.js", "n8n", "LangChain"],
      },
      {
        title: { es: "Infraestructura y DevOps", en: "Infrastructure & DevOps" },
        detail: {
          es: "Responsable de despliegues y administración de servidores en DigitalOcean. Pipelines de CI/CD con GitHub Actions para la entrega continua de los servicios.",
          en: "I own deployments and server administration on DigitalOcean, with CI/CD pipelines on GitHub Actions for continuous delivery of the services.",
        },
        stack: ["DigitalOcean", "GitHub Actions", "CI/CD", "Linux"],
      },
    ],
  },
  {
    id: "sweettech",
    period: { es: "Ago 2024 — Mar 2026", en: "Aug 2024 — Mar 2026" },
    title: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
    org: {
      es: "SWEETTECH · Asignado a proyectos vía INSAITE",
      en: "SWEETTECH · Assigned to projects through INSAITE",
    },
    projects: [
      {
        title: { es: "Validocu — TRAXION", en: "Validocu — TRAXION" },
        detail: {
          es: "Sistema de validación documental con IA multimodal (LLM). En la primera versión implementé el backend con Cloud Functions. Al cliente le gustó tanto que quisieron implementarlo en varias áreas del corporativo, lo que llevó a Validocu 2.0: un backend multitenant con microservicios desplegados en GKE, integrando PubSub para encolamiento de documentos (evitando errores de cuota). Validocu tuvo una mejora de x15 en validaciones por documento por validador respecto al proceso manual.",
          en: "Document validation system powered by multimodal AI (LLM). For the first version I built the backend on Cloud Functions. The client liked it so much they wanted it across several areas of the corporation, which led to Validocu 2.0: a multitenant backend with microservices deployed on GKE, using Pub/Sub to queue documents (avoiding quota errors). Validocu delivered a 15x improvement in validations per document per validator compared to the manual process.",
        },
        stack: ["Python", "FastAPI", "Cloud Functions", "GKE", "PubSub", "Vertex AI", "Docker", "Cloud Storage", "Firestore", "Secret Manager", "Cloud Scheduler"],
      },
      {
        title: { es: "Confrontas UI — FERROMEX", en: "Confrontas UI — FERROMEX" },
        detail: {
          es: "Desarrollo del ecosistema frontend en Flutter Web para la gestión operativa de confrontas, estructurado bajo Clean Architecture y modularización por features para garantizar escalabilidad. Con el fin de optimizar el ciclo DevOps, diseñé una CLI personalizada que automatiza el versionamiento y la entrega continua de la aplicación.",
          en: "Built the Flutter Web frontend ecosystem for the operational management of confrontas, structured with Clean Architecture and feature-based modules for scalability. To streamline the DevOps cycle, I designed a custom CLI that automates versioning and continuous delivery of the app.",
        },
        stack: ["Flutter", "Clean Architecture", "Go", "DevOps", "Docker"],
      },
      {
        title: { es: "Sistema de Evidencias de PODs — TRAXION", en: "POD Evidence System — TRAXION" },
        detail: {
          es: "Desarrollo del ecosistema backend en Python para el registro, procesamiento y seguimiento automatizado de evidencias operativas provenientes de dispositivos móviles. La solución se implementó con una arquitectura serverless en Google Cloud Platform para garantizar escalabilidad y resiliencia, con despliegues gestionados mediante gcloud-cli.",
          en: "Built the Python backend ecosystem for automated capture, processing and tracking of operational evidence coming from mobile devices. Implemented on a serverless architecture on Google Cloud Platform for scalability and resilience, with deployments managed through gcloud-cli.",
        },
        stack: ["Python", "Cloud Functions", "Firestore", "Cloud Storage", "gcloud-cli", "Go"],
      },
      {
        title: {
          es: "ProShooter — Proyecto de Residencia Profesional",
          en: "ProShooter — Professional Residency Project",
        },
        detail: {
          es: "Diseño e implementación de la arquitectura backend completa para una plataforma de seguimiento de sesiones de entrenamiento táctico de tiro. El proyecto destacó por el modelado y estructuración de una base de datos relacional de alta complejidad con más de 16 tablas, además de la integración, entrenamiento y despliegue de un modelo de CV con YOLOv8 para la detección y conteo de impactos en blancos.",
          en: "Designed and implemented the complete backend architecture for a platform that tracks tactical shooting training sessions. Highlights include modeling a complex relational database with 16+ tables, plus integrating, training and deploying a YOLOv8 computer vision model to detect and count hits on targets.",
        },
        stack: ["FastAPI", "PostgreSQL", "YOLO", "Python", "Docker", "AWS"],
      },
    ],
  },
];
