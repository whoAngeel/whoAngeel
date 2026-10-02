/**
 * Achievements shown in the "Logros" section (hackathons, certificates…).
 *
 * To attach a certificate:
 *   1. Drop the image/PDF in `public/achievements/` (e.g. `itiz-2025.png`).
 *   2. Set `certificate: "/achievements/itiz-2025.png"`.
 *   3. Optionally set `credentialUrl` for an external verification link.
 * Cards render without a preview when neither is set.
 * `title`/`issuer` are proper nouns (not translated); `summary` is Localized.
 * Kind labels live in the UI dictionary (`achievements.kind`).
 */
import type { Localized } from "../i18n";

export type AchievementKind = "1er-lugar" | "ganador" | "finalista" | "certificacion";

export interface Achievement {
  id: string;
  kind: AchievementKind;
  title: string;
  /** Organiser / issuer. */
  issuer: string;
  /** Free-form date; omit when unknown rather than guessing. */
  date?: string;
  summary: Localized;
  /** Links to a card in the Projects section (`Project.id`). */
  projectId?: string;
  /** Path under /public to a certificate image. */
  certificate?: string;
  credentialUrl?: string;
}

export const achievements: Achievement[] = [
  {
    id: "interledger-2025",
    kind: "1er-lugar",
    title: "Interledger Hackathon 2025",
    issuer: "Interledger Foundation",
    date: "2025",
    summary: {
      es: "Primer lugar con un motor de pagos interoperables sobre Interledger y Open Payments: split payments automatizados, seguridad GNAP y despliegue en Cloud Run.",
      en: "First place with an interoperable payments engine on Interledger and Open Payments: automated split payments, GNAP security and deployment on Cloud Run.",
    },
    projectId: "interledger-orquestacion",
  },
  {
    id: "open-payments",
    kind: "ganador",
    title: "Open Payments Hackathon",
    issuer: "Interledger Foundation",
    summary: {
      es: "Proyecto ganador: FundUP, backend de crowdfunding en NestJS con pagos vía Open Payments, Redis y webhooks.",
      en: "Winning project: FundUP, a NestJS crowdfunding backend with payments via Open Payments, Redis and webhooks.",
    },
    projectId: "fundup",
  },
  {
    id: "itiz-2025",
    kind: "ganador",
    title: "Hackathon ITIZ 2025",
    issuer: "ITIZ",
    date: "2025",
    summary: {
      es: "Proyecto ganador: monitoreo en tiempo real de las operaciones aéreas de la CDMX con WebSockets y un panel interactivo.",
      en: "Winning project: real-time monitoring of Mexico City air operations with WebSockets and an interactive dashboard.",
    },
    projectId: "flight-monitor",
  },
  {
    id: "nasa-space-apps-2025",
    kind: "finalista",
    title: "NASA Space Apps Challenge 2025",
    issuer: "NASA",
    date: "2025",
    summary: {
      es: "Top nacional con Exoplanets with AI: modelos predictivos sobre datos abiertos de misiones espaciales para analizar habitabilidad.",
      en: "National top with Exoplanets with AI: predictive models over open space-mission data to analyze habitability.",
    },
    projectId: "exoplanets",
  },
];

