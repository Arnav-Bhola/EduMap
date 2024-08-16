import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
import Course from "../components/Courses/Course";
import { CoursesContext } from "../store/courses";
import { DarkModeContext } from "../store/dark-mode";
import { Colors } from "../utils/constants/colors";

const CoursesList = () => {
  const { courses } = useContext(CoursesContext);
  const { theme } = useContext(DarkModeContext);

  const renderItem = ({ item }) => <Course course={item} />;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      padding: 16,
    },
  });

  return (
    <FlatList
      data={courses}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
    />
  );
};

export default CoursesList;
