import i18n from 'i18next';
import lodash from 'lodash';
import {initReactI18next} from 'react-i18next';

const resources = {
  en: {
    translation: require('./en.json'),
  },
  vi: {
    translation: require('./vi.json'),
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  debug: false,
  resources: resources,
});

let currentLanguage = 'en';

export const getCurrentLanguage = () => {
  return currentLanguage;
};

export const setLanguage = language => {
  if (!lodash.isString(language)) {
    currentLanguage = 'en';
  }
  currentLanguage = language;
  i18n.changeLanguage(currentLanguage, (error, _) => {
    if (error) {
      console.error('changeLanguage error', error);
    } else {
      console.log('changeLanguage DONE', language);
    }
  });
};

export default i18n;
