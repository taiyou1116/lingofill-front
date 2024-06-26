import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationJa from "./i18n/ja.json";
import translationEn from "./i18n/en.json";
import translationZh from "./i18n/zh.json";
import translationHi from "./i18n/hi.json";
import translationEs from "./i18n/es.json";

const resources = {
  ja: {
    translation: translationJa,
  },
  en: {
    translation: translationEn,
  },
  zh: {
    translation: translationZh,
  },
  hi: {
    translation: translationHi,
  },
  es: {
    translation: translationEs,
  }
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: "ja",
    lng: "ja",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;