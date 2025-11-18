import { Colors } from "@/src/constants/theme";
import { StyleSheet, useColorScheme } from "react-native";

export const useThemedStyles = (styleCreator: any) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  return StyleSheet.create(styleCreator(theme));
};
