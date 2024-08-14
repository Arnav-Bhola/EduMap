import { useContext } from "react";
import { Button, StyleSheet, View } from "react-native";
import { DarkModeContext } from "../store/dark-mode";
import { Colors } from "../utils/constants/colors";

const Settings = () => {
  const DarkModeCtx = useContext(DarkModeContext);
  const theme = DarkModeCtx.theme;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
    },
  });

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          DarkModeCtx.toggleTheme();
        }}
        title='Toggle Color'
      ></Button>
      <Button title='Dropdown - Fonts: dyslexic, normal, fun'></Button>
      <Button title='Notifications'></Button>
      <Button title='Font Size'></Button>
      <Button title='Support and Feedback Form'></Button>
    </View>
  );
};

export default Settings;
