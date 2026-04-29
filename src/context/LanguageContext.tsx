"use client";

import { createContext, useContext, useEffect, useState } from "react";
import i18n from "../components/translations/i18n";

type Language = "en" | "ar";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {

  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem("lang") as Language | null;
    return savedLang || "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", language);

    // 👇 أهم حاجة RTL
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) =>{ 
      const newLang = prev === "en" ? "ar" : "en";
      i18n.changeLanguage(newLang);
      return newLang;});
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside provider");
  return context;
};