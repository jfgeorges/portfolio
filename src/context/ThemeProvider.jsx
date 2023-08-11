import { createContext, useContext, useState, useEffect } from "react";

// Dark mode exercise
const ThemeContext = createContext({ theme: "dark" });
const LOCAL_STORAGE_KEY = "theme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTheme) {
      setTheme(JSON.parse(storedTheme));
      return;
    }

    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const changePreferenceTheme = () => {
      setTheme(darkModePreference.matches ? "dark" : "light");
    };
    darkModePreference.addEventListener("change", changePreferenceTheme);

    changePreferenceTheme();

    return () =>
      darkModePreference.removeEventListener("change", changePreferenceTheme);
  }, []);

  const values = {
    theme,
    isDark: theme === "dark",
    isLight: theme === "light",
    toggleTheme: () => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTheme));
    },
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const themeContextValue = useContext(ThemeContext);
  // Controle inutile car on fourni une valeur par défaut à createContext
  if (!themeContextValue) throw new Error("ThemeContext not provided");
  return themeContextValue;
};
