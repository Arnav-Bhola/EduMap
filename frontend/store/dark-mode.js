import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

export const DarkModeContext = createContext({
  theme: "",
  toggleTheme: () => {},
});

const DarkModeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("theme");
        if (storedTheme) {
          setTheme(storedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme", error);
      }
    };

    loadTheme();

    const listener = ({ colorScheme }) => {
      setTheme(colorScheme);
      saveTheme(colorScheme);
    };

    const subscription = Appearance.addChangeListener(listener);

    return () => {
      subscription.remove();
    };
  }, []);

  const saveTheme = async (newTheme) => {
    try {
      await AsyncStorage.setItem("theme", newTheme);
    } catch (error) {
      console.error("Failed to save theme", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  const value = {
    theme: theme,
    toggleTheme: toggleTheme,
  };

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
};

export default DarkModeContextProvider;
