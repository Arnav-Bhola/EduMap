import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CoursesContext } from "../store/courses";
import { DarkModeContext } from "../store/dark-mode";
import { Colors } from "../utils/constants/colors";

const AllCourses = () => {
  const { courses } = useContext(CoursesContext);
  const { theme } = useContext(DarkModeContext);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Text>{courses}</Text>
    </View>
  );
};

export default AllCourses;
