import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { DarkModeContext } from "../store/dark-mode";
import { Colors } from "../utils/constants/colors";

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
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

  useEffect(() => {
    // Load the saved notification setting from AsyncStorage
    const loadNotificationSetting = async () => {
      try {
        const savedSetting = await AsyncStorage.getItem("notificationsEnabled");
        if (savedSetting !== null) {
          setIsEnabled(JSON.parse(savedSetting));
        }
      } catch (error) {
        console.error("Failed to load notification setting:", error);
      }
    };

    loadNotificationSetting();
  }, []);

  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);

    try {
      await AsyncStorage.setItem("notificationsEnabled", JSON.stringify(newValue));
    } catch (error) {
      console.error("Failed to save notification setting:", error);
    }
  };

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
    linkButton: {
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: Colors.blue700,
    },
    goBackButton: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: theme === "light" ? Colors.blue750 : Colors.blue900,
      color: theme === "light" ? Colors.white : Colors.blue400,
      alignItems: "center",
    },
    linkText: {
      color: theme === "light" ? Colors.white : Colors.blue800,
      fontSize: 18,
      fontWeight: "bold",
    },
    goBackText: {
      color: Colors.white,
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  const handleSupportForm = () => {
    Linking.openURL("https://docs.google.com/forms/d/1f6NHBDNgzAoDzsATZ0sNtz7sPNBHBqRp_mkrxdEgU2Y");
  };

  const handleSuggestForm = () => {
    Linking.openURL("https://docs.google.com/forms/d/1PW4fl59Yiualba2r-4ZnOBnaEopqsB9LBrn5DGG-J0Y");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>Dark Mode</Text>
      <Switch
        trackColor={{ true: Colors.blue750, false: "#81b0ff" }}
        thumbColor={theme === "light" ? "#f4f3f4" : Colors.blue900}
        ios_backgroundColor='#3e3e3e'
        onValueChange={() => DarkModeCtx.toggleTheme()}
        value={theme === "dark"}
      />
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

      <Text style={styles.label}>Notifications</Text>
      <Switch
        trackColor={{ true: Colors.blue750, false: "#81b0ff" }}
        thumbColor={theme === "light" ? "#f4f3f4" : Colors.blue900}
        ios_backgroundColor='#3e3e3e'
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <Pressable
        style={({ pressed }) => [styles.linkButton, { opacity: pressed ? 0.75 : 1 }]}
        onPress={handleSupportForm}
      >
        <Text style={styles.linkText}>Support & Feedback</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.goBackButton, { opacity: pressed ? 0.75 : 1 }]}
        onPress={handleSuggestForm}
      >
        <Text style={styles.goBackText}>Suggest a Course</Text>
      </Pressable>
    </View>
  );
};

export default Settings;
