"use client";
import React, { useState, useEffect, useMemo, useContext } from "react";
import { I18nProvider } from "@lingui/react";
import { Messages, setupI18n } from "@lingui/core";

// types
import { Language, LocalesContext, Props } from "./localization.types";

// helps
import {
  dynamicActivateLanguage,
  getDeviceLanguage,
  isLanguage,
} from "./localization.helpers";

// locales
import { messages as translationsUk } from "./uk/messages";
import { messages as translationsEn } from "./en/messages";

// constants
import {
  defaultLanguage,
  languageKey,
  languagesLinguiAlias,
} from "./localization.const";
import { useRouter } from "next/router";
const CATALOGS_LANGUAGES = {
  uk: translationsUk as Messages,
  en: translationsEn as Messages,
};

export const localesContext = React.createContext({} as LocalesContext);

const LocalesProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const [languageUser, setLanguage] = useState<Language>(defaultLanguage);
  const language = languageUser || defaultLanguage;
  const i18n = setupI18n({
    messages: CATALOGS_LANGUAGES,
    locale: languagesLinguiAlias[language],
  });

  const setLanguageAsync = async (language: Language): Promise<void> => {
    try {
      await dynamicActivateLanguage(language, i18n);
      localStorage.setItem(languageKey, language);
      setLanguage(language);
      if (router.query.language) {
        router.query.language = language;
        router.push(router);
      }
    } catch (error: any) {}
  };

  const getLanguageStorage = async () => {
    try {
      const language = await getDeviceLanguage();
      const routeLanguage =
        router.query.language &&
        typeof router.query.language === "string" &&
        isLanguage(router.query.language)
          ? router.query.language
          : language;
      await setLanguageAsync(routeLanguage);
      setLanguage(routeLanguage);
    } catch (error: any) {}
  };

  const contextValue: LocalesContext = useMemo(
    () => ({
      i18n,
      language,
      getLanguageStorage,
      setLanguage: setLanguageAsync,
    }),
    [i18n, language]
  );

  useEffect(() => {
    getLanguageStorage();
  }, [router.query?.language]);

  return (
    <I18nProvider i18n={i18n}>
      <localesContext.Provider value={contextValue}>
        {children}
      </localesContext.Provider>
    </I18nProvider>
  );
};

export const useLocalesProvider = (): LocalesContext =>
  useContext(localesContext);

export default LocalesProvider;
