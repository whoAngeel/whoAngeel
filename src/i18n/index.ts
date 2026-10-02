/**
 * i18n core: supported locales, helpers and the UI string dictionary.
 *
 * - Routing is handled by Astro (see `i18n` in astro.config.mjs): Spanish at
 *   the root, English under /en/. Keep `locales` in sync with that config.
 * - Components get the active locale with `getLocale(Astro.currentLocale)`
 *   and strings with `useTranslations(locale)`.
 * - Content data (projects, experience, achievements) stores translatable
 *   fields as `Localized<string>` and is read with `localize(value, locale)`.
 *
 * Adding a locale: add it to `locales`, astro.config.mjs, `localeMeta`, a
 * dictionary below (TypeScript will flag missing keys) and every
 * `Localized` field in src/data/*.
 */
import { en } from "./ui/en";
import { es } from "./ui/es";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Display + SEO metadata per locale. */
export const localeMeta: Record<Locale, { label: string; name: string; bcp47: string; og: string }> = {
  es: { label: "ES", name: "Español", bcp47: "es-MX", og: "es_MX" },
  en: { label: "EN", name: "English", bcp47: "en-US", og: "en_US" },
};

/** A value that has one variant per locale. */
export type Localized<T = string> = Record<Locale, T>;

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

/** Normalise `Astro.currentLocale` (may be undefined) to a supported locale. */
export const getLocale = (current: string | undefined): Locale => (isLocale(current) ? current : defaultLocale);

const isLocalized = <T>(value: T | Localized<T>): value is Localized<T> =>
  typeof value === "object" && value !== null && locales.every((l) => l in (value as object));

/** Resolve a plain or localized value for the given locale. */
export const localize = <T>(value: T | Localized<T>, locale: Locale): T =>
  isLocalized(value) ? value[locale] : value;

/**
 * Terminal commands and paths shown in the UI (`❯ cat whoami.txt`,
 * `❯ cd ~/projects`). Deliberately NOT translated: a shell speaks English
 * in every locale, and mixed-language commands read oddly.
 */
export const shell = {
  who: "cat whoami.txt",
  bio: "cat about-me.md",
  paths: {
    experience: "experience",
    projects: "projects",
    achievements: "achievements",
    skills: "skills",
    contact: "contact",
  },
} as const;

const dictionaries = { es, en } as const;

export const useTranslations = (locale: Locale) => dictionaries[locale];

export type UI = typeof es;
