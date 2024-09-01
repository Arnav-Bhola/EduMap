import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Linking, Pressable, StyleSheet, Switch, Text, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { DarkModeContext } from "../store/dark-mode";
import { FontContext } from "../store/font";
import { Colors } from "../utils/constants/colors";

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const DarkModeCtx = useContext(DarkModeContext);
  const { theme } = DarkModeCtx;
  const { fontSize, fontFamily, setFontSize, setFontFamily } = useContext(FontContext);

  const handleFontSizeChange = (value) => {
    setFontSize(value);
  };

  const handleFontFamilyChange = (value) => {
    setFontFamily(value);
  };

  const fontFamilyOptions = [
    { key: 0, label: "Normal", value: "normal" },
    { key: 1, label: "Fun", value: "fun" },
    { key: 2, label: "Dyslexic", value: "dyslexic" },
  ];

  const fontSizeOptions = [
    { key: 0, label: "Small", value: 0.7 },
    { key: 1, label: "Medium", value: 1 },
    { key: 2, label: "Large", value: 1.3 },
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
      paddingTop: 40,
    },
    header: {
      fontWeight: "bold",
      color: Colors.black,
      marginBottom: 20,
    },

    picker: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme === "light" ? Colors.black : Colors.white,
      color: theme === "light" ? Colors.black : Colors.white,
      backgroundColor: theme === "dark" ? Colors.blue750 : Colors.white,
      width: "80%",
      textAlign: "center",
      marginVertical: 8,
      marginBottom: 30,
      paddingVertical: 8,
    },
    rowPicker: {
      width: "56%",
    },
    pickerText: {
      color: theme === "light" ? Colors.black : Colors.white,
      textAlign: "center",
      fontSize: 16 * fontSize,
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.7)",
    },
    optionContainer: {
      backgroundColor: theme === "light" ? Colors.blue400 : Colors.blue750,
      borderRadius: 8,
      width: "100%",
      alignSelf: "center",
      padding: 0,
      margin: 0,
    },
    option: {
      padding: 12,
      borderBottomWidth: 1,
      width: "90%",
      borderBottomColor: theme === "light" ? Colors.black : Colors.blue400,
      backgroundColor: theme === "light" ? Colors.blue400 : Colors.blue750,
      alignSelf: "center",
    },
    label: {
      fontSize: 20 * fontSize,
      marginBottom: 8,
      color: theme === "light" ? Colors.blue900 : Colors.blue400,
    },
    linkButton: {
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: Colors.blue700,
      marginTop: 30,
    },
    cancelButton: {
      paddingVertical: 10,
      backgroundColor: Colors.red200,
      borderRadius: 5,
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
      fontSize: 18 * fontSize,
      fontWeight: "bold",
    },
    goBackText: {
      color: Colors.white,
      fontSize: 18 * fontSize,
      fontWeight: "bold",
    },
    toggleSetting: {
      flexDirection: "row",
      alignItems: "center",
      textAlignVertical: "center",
      justifyContent: "space-between",
      width: "60%",
      marginBottom: 20,
    },
    fontsize: {
      marginTop: 20,
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
      <View style={styles.toggleSetting}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          trackColor={{ true: Colors.blue750, false: "#81b0ff" }}
          thumbColor={theme === "light" ? "#f4f3f4" : Colors.blue900}
          ios_backgroundColor={Colors.blue900}
          onValueChange={() => DarkModeCtx.toggleTheme()}
          value={theme === "dark"}
        />
      </View>

      <View style={[styles.toggleSetting, styles.notifications]}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          trackColor={{ true: Colors.blue750, false: "#81b0ff" }}
          thumbColor={theme === "light" ? "#f4f3f4" : Colors.blue900}
          ios_backgroundColor={Colors.blue900}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <Text style={[styles.label, styles.fontsize]}>Font Size:</Text>
      <ModalSelector
        data={fontSizeOptions}
        initValue={fontSizeOptions.find((option) => option.value === fontSize)?.label || "Medium"}
        onChange={(option) => handleFontSizeChange(option.value)}
        cancelText='Cancel'
        style={styles.picker} // Style for the overall picker (select box)
        selectTextStyle={styles.pickerText} // Style for the text in the picker
        cancelTextStyle={styles.pickerText} // Style for the cancel button text
        optionTextStyle={styles.pickerText} // Style for option text
        overlayStyle={styles.overlay} // Style for the background overlay
        optionContainerStyle={styles.optionContainer} // Style for the container of options
        optionStyle={styles.option} // Style for each option
        sectionTextStyle={styles.sectionText} // Style for section text (if using sections)
        cancelStyle={styles.cancelButton} // Style for the cancel button
      >
        <Text style={styles.pickerText}>
          {fontSizeOptions.find((option) => option.value === fontSize)?.label || "Medium"}
        </Text>
      </ModalSelector>
      <Text style={styles.label}>Font Style:</Text>
      <ModalSelector
        data={fontFamilyOptions}
        initValue={
          fontFamilyOptions.find((option) => option.value === fontFamily)?.label || "Normal"
        }
        onChange={(option) => handleFontFamilyChange(option.value)}
        cancelText='Cancel'
        style={styles.picker} // Style for the overall picker (select box)
        selectTextStyle={styles.pickerText} // Style for the text in the picker
        cancelTextStyle={styles.pickerText} // Style for the cancel button text
        optionTextStyle={styles.pickerText} // Style for option text
        overlayStyle={styles.overlay} // Style for the background overlay
        optionContainerStyle={styles.optionContainer} // Style for the container of options
        optionStyle={styles.option} // Style for each option
        sectionTextStyle={styles.sectionText} // Style for section text (if using sections)
        cancelStyle={styles.cancelButton} // Style for the cancel button
      >
        <Text style={styles.pickerText}>
          {fontFamilyOptions.find((option) => option.value === fontFamily)?.label || "Normal"}
        </Text>
      </ModalSelector>

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
