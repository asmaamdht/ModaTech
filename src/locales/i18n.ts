import ar from "@/src/locales/ar.json";
import en from "@/src/locales/en.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager, Platform } from "react-native";
import RNRestart from "react-native-restart";

const getStoredLanguage = async (): Promise<string> => {
  try {
    const lang: string | null = await AsyncStorage.getItem("language");
    return lang || "en";
  } catch {
    return "en";
  }
};

getStoredLanguage().then((lang: string) => {
  const isRTL: boolean = lang === "ar";
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
  i18n.use(initReactI18next).init({
    compatibilityJSON: "v4",
    lng: lang,
    fallbackLng: "en",
    debug: false,
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    interpolation: { escapeValue: false },
  });
});

export const setLanguage = async (lang: string): Promise<string> => {
  try {
    const currentLanguage = i18n.language;

    // Check if language is actually changing
    if (currentLanguage === lang) {
      return lang;
    }

    await AsyncStorage.setItem("language", lang);
    const isRTL: boolean = lang === "ar";
    const currentRTL: boolean = I18nManager.isRTL;

    // Only force restart if RTL direction is changing
    if (isRTL !== currentRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      // Reload app to apply RTL changes
      if (Platform.OS !== "web") {
        // Give time for AsyncStorage to save
        setTimeout(async () => {
          try {
            await Updates.reloadAsync();
            RNRestart.Restart();
          } catch (error) {
            console.log("Manual reload required:", error);
            // Fallback: just change language without reload
            await i18n.changeLanguage(lang);
          }
        }, 100);
      } else {
        // For web, just change language
        await i18n.changeLanguage(lang);
      }
    } else {
      // Same direction, just change language
      await i18n.changeLanguage(lang);
    }

    return lang;
  } catch {
    return "en";
  }
};

export default i18n;
