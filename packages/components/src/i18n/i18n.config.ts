import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {en,ar} from "./translations";
const resources = {
    en:{
        translation:en,
    },
    ar:{
        translation:ar,
    }
}


i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    debug: true,
    lng:'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
})

export default i18n