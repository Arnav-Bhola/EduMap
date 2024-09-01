import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const FontContext = createContext({
  fontSize: "",
  fontFamily: "",
  setFontSize: () => {},
  setFontFamily: () => {},
});

const FontContextProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(1);
  const [fontFamily, setFontFamily] = useState("System");

  useEffect(() => {
    const loadFontSettings = async () => {
      try {
        const storedFontSize = await AsyncStorage.getItem("fontSize");
        const storedFontFamily = await AsyncStorage.getItem("fontFamily");
        if (storedFontSize) {
          setFontSize(parseFloat(storedFontSize));
        }
        if (storedFontFamily) {
          setFontFamily(storedFontFamily);
        }
      } catch (error) {
        console.error("Failed to load font settings", error);
      }
    };

    loadFontSettings();
  }, []);

  const saveFontSize = async (newFontSize) => {
    try {
      await AsyncStorage.setItem("fontSize", `${newFontSize}`);
    } catch (error) {
      console.error("Failed to save font size", error);
    }
  };

  const saveFontFamily = async (newFontFamily) => {
    try {
      await AsyncStorage.setItem("fontFamily", newFontFamily);
    } catch (error) {
      console.error("Failed to save font family", error);
    }
  };

  const handleSetFontSize = (newFontSize) => {
    setFontSize(newFontSize);
    saveFontSize(newFontSize);
  };

  const handleSetFontFamily = (newFontFamily) => {
    setFontFamily(newFontFamily);
    saveFontFamily(newFontFamily);
  };

  const value = {
    fontSize: fontSize,
    fontFamily: fontFamily,
    setFontSize: handleSetFontSize,
    setFontFamily: handleSetFontFamily,
  };

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
};

export default FontContextProvider;
