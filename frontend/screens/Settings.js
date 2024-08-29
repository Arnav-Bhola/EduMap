import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { DarkModeContext } from "../store/dark-mode";
import { Colors } from "../utils/constants/colors";

const Settings = () => {
  const DarkModeCtx = useContext(DarkModeContext);
  const { theme } = DarkModeCtx;

  const [fontSize, setFontSize] = useState("medium");
  const [fontType, setFontType] = useState("normal");

  const handleFontSizeChange = (value) => {
    setFontSize(value);
  };

  const handleFontTypeChange = (value) => {
    setFontType(value);
  };

  const fontFamilyOptions = [
    { key: 0, label: "Normal", value: "normal" },
    { key: 1, label: "Fun", value: "fun" },
    { key: 2, label: "Dyslexic", value: "dyslexic" },
  ];

  const fontSizeOptions = [
    { key: 0, label: "Small", value: "small" },
    { key: 1, label: "Medium", value: "medium" },
    { key: 2, label: "Large", value: "large" },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      padding: 20,
      alignItems: "center",
    },
    header: {
      fontWeight: "bold",
      color: Colors.black,
      marginBottom: 20,
    },
    picker: {
      height: 50,
      width: "100%",
      marginBottom: 16,
      color: Colors.black,
    },
    pickerText: {
      fontSize: 16,
      color: Colors.black,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    buttonText: {
      fontSize: 26,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => DarkModeCtx.toggleTheme()}
      >
        <Text style={styles.buttonText}>Toggle Color</Text>
      </Pressable>
      <Text style={styles.label}>Font Size:</Text>
      <ModalSelector
        data={fontSizeOptions}
        initValue={fontSizeOptions.find((option) => option.value === fontSize)?.label || "Medium"}
        onChange={(option) => handleFontSizeChange(option.value)}
        style={styles.picker}
        selectTextStyle={styles.pickerText}
        cancelText='Cancel'
        cancelTextStyle={styles.pickerText}
        optionTextStyle={styles.pickerText}
      />

      <Text style={styles.label}>Font Style:</Text>
      <ModalSelector
        data={fontFamilyOptions}
        initValue={fontFamilyOptions.find((option) => option.value === fontType)?.label || "Normal"}
        onChange={(option) => handleFontTypeChange(option.value)}
        style={styles.picker}
        selectTextStyle={styles.pickerText}
        cancelText='Cancel'
        cancelTextStyle={styles.pickerText}
        optionTextStyle={styles.pickerText}
      />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Notifications</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Support and Feedback Form</Text>
      </Pressable>
    </View>
  );
};

export default Settings;
