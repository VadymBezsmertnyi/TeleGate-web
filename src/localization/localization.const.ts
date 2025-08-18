import type { Language, Languages } from "./localization.types";

export const defaultLanguage: Language = "en";
export const languagesKeys = [
  "en",
  "uk",
  "fr",
  "de",
  "es",
  "it",
  "sk",
  "sv",
  "da",
  "fi",
  "pl",
  "cs",
  "hu",
  "el",
  "ro",
  "lt",
  "lv",
  "be",
] as const;
export const languageKey = "language";

export const languages: Languages = [
  {
    title: "Українська",
    key: "uk",
    flag: "ua",
  },
  {
    title: "English",
    key: "en",
    flag: "us",
  },
];

export const languages_short = {
  en: "en-EN",
  uk: "uk-UA",
};

export const languagesLinguiAlias = {
  en: "en",
  uk: "uk",
} as const;

export const normalizeLanguages = {
  en: "en",
  uk: "uk",
};

export const LANGUAGE_EN = "en";
export const LANGUAGE_UK = "uk";

export const languagePattern = /\b(en|uk)\b/;
