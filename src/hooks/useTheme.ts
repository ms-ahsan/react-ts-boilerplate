import { useState, useEffect } from "react";
import { THEME_CONFIG, STORAGE_KEYS } from "../constants/routes";

type Theme = (typeof THEME_CONFIG.THEMES)[number];

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
      if (stored && THEME_CONFIG.THEMES.includes(stored)) {
        return stored;
      }
      return THEME_CONFIG.DEFAULT_THEME;
    }
    return THEME_CONFIG.DEFAULT_THEME;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  return { theme, setTheme };
};
