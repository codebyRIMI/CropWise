import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import hi from "./hi.json";
import bn from "./bn.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      english: {
        translation: en,
      },
      hindi: {
        translation: hi,
      },
      bengali: {
        translation: bn,
      },
    },

    lng: localStorage.getItem("language") || "english",
    fallbackLng: "english",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;