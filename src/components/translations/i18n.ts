import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// استدعاء ملفات الترجمة
import { admins } from "./admins_Tr";
import { companies } from "./companies_Tr";
import Transactions from "./transactions_tr";
import { common } from "./common_Tr";




i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ...admins.en.translation,       
        ...companies.en.translation,    
        ...Transactions.en.translation,
        ...common.en.translation,
      },
    },
    ar: {
      translation: {
        ...admins.ar.translation,
        ...companies.ar.translation,
        ...Transactions.ar.translation,
                ...common.ar.translation,

      },
    },
  },
  lng: localStorage.getItem("lang") || "en", 
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;