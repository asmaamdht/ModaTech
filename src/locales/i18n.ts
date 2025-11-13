import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import en from '@/src/locales/en.json';
import ar from '@/src/locales/ar.json';


const getStoredLanguage = async () : Promise <string> => {
  try{
     const lang : string | null = await AsyncStorage.getItem("language");
     return lang || "en" ;
  } catch {
     return "en"
  }
};


getStoredLanguage().then((lang : string) =>{
   const isRTL : boolean = lang === "ar";
   I18nManager.allowRTL(isRTL);
   I18nManager.forceRTL(isRTL);
   i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    lng: lang,
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    interpolation: { escapeValue: false },
  });
}) 


const setLanguage = async (lang : string) : Promise <string> => {
   try{
         await AsyncStorage.setItem("language",lang);
         const isRTL : boolean = lang ==="ar"
         I18nManager.allowRTL(isRTL);
         I18nManager.forceRTL(isRTL);
         await i18n.changeLanguage(lang);
          return lang;
   }catch{
        return "en";
   }
} 

export default i18n;