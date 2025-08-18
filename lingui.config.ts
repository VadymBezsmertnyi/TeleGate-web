/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  catalogs: [
    {
      path: "<rootDir>/src/localization/{locale}/messages",
      include: ["<rootDir>/src", "<rootDir>/App.tsx", "<rootDir>/src/**/*.tsx"],
      exclude: ["**/node_modules/**"],
    },
  ],
  locales: ["en", "uk"],
  format: "po",
  sourceLocale: "en",
  fallbackLocales: {
    en: "en",
    uk: "uk",
    default: "en",
  },
  compileNamespace: "ts",
  formatOptions: {
    origins: false,
  },
};
