import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DarkModeContext } from "../store/dark-mode";
import { Colors } from "../utils/constants/colors";

const FavoriteCourses = () => {
  const { theme } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Text>{theme}</Text>
    </View>
  );
};

export default FavoriteCourses;
