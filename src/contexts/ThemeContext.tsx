// ThemeContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useRNColorScheme } from "react-native";
import { Colors, ThemeMode, ThemeColors } from "../constants/theme";

interface ThemeContextType {
  theme: ThemeMode;
  colors: ThemeColors;
  changeTheme: (newTheme: ThemeMode) => void;
  toggleTheme: () => void;
  useSystemTheme: boolean;
  toggleSystemTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useRNColorScheme() ?? "light"; 
  const [theme, setTheme] = useState<ThemeMode>(systemTheme);
  const [useSystemTheme, setUseSystemTheme] = useState(true);
  const [colors, setColors] = useState<ThemeColors>(Colors[systemTheme]);

  useEffect(() => {
    loadTheme();
  }, []);

  
  useEffect(() => {
    if (useSystemTheme) {
      setTheme(systemTheme);
      setColors(Colors[systemTheme]);
    }
  }, [systemTheme, useSystemTheme]);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      const savedUseSystem = await AsyncStorage.getItem("useSystemTheme");

      if (savedUseSystem === "false" && (savedTheme === "light" || savedTheme === "dark")) {
        setUseSystemTheme(false);
        setTheme(savedTheme);
        setColors(Colors[savedTheme]);
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const changeTheme = async (newTheme: ThemeMode) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
      await AsyncStorage.setItem("useSystemTheme", "false"); 
      setUseSystemTheme(false);
      setTheme(newTheme);
      setColors(Colors[newTheme]);
    } catch (error) {
      console.error("Error changing theme:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    changeTheme(newTheme);
  };

  const toggleSystemTheme = async () => {
    const newValue = !useSystemTheme;
    setUseSystemTheme(newValue);
    await AsyncStorage.setItem("useSystemTheme", String(newValue));

    if (newValue) {
      setTheme(systemTheme);
      setColors(Colors[systemTheme]);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, colors, changeTheme, toggleTheme, useSystemTheme, toggleSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
