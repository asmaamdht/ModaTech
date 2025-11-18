import { Colors } from "../constants/theme";
import { useTheme } from "../contexts/ThemeContext";
import { useColorScheme } from "./use-color-scheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  let theme: "light" | "dark";

  try {
    theme = useTheme()?.theme ?? useColorScheme() ?? "light";
  } catch {
    theme = useColorScheme() ?? "light";
  }

  const colorFromProps = props[theme];
  return colorFromProps ?? Colors[theme][colorName];
}
