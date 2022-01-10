import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "../locales/en/translation.json";
import translationFR from "../locales/fr/translation.json";

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react:{
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['strong', 'small'],
    }
  });

export default i18n;
