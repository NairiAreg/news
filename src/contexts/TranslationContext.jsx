import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation as i18useTranslation } from "react-i18next";
import { useLocalStorage } from "../hooks";

export const TranslationContext = createContext({
  language: "",
  setLanguage: () => {},
  t: () => {},
});

export const useTranslation = () => useContext(TranslationContext);

export function TranslationProvider({ children }) {
  const { put, get } = useLocalStorage();

  const [language, setLanguage] = useState(null);
  const { t, i18n } = i18useTranslation();

  useEffect(() => {
    const localStorageLang = get("lang");
    setLanguage(localStorageLang || "en");
  }, []);

  useEffect(() => {
    if (language) {
      put("lang", language);
      i18n.changeLanguage(language);
    }
  }, [language]);

  const languageProviderValue = useMemo(
    () => ({
      setLanguage,
      language,
      t: (text) => t(text),
    }),
    [language, setLanguage, t]
  );
  return (
    <TranslationContext.Provider value={languageProviderValue}>
      {children}
    </TranslationContext.Provider>
  );
}
