import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Course from "../components/Courses/Course";
import { CoursesContext } from "../store/courses";
import { DarkModeContext } from "../store/dark-mode";
import { FontContext } from "../store/font";
import { Colors } from "../utils/constants/colors";

const FavoriteCourses = () => {
  const { favoriteCourses, courses } = useContext(CoursesContext);
  const { theme } = useContext(DarkModeContext);
  const { fontSize, fontFamily } = useContext(FontContext);

  const favoriteCoursesData = courses.filter((course) => favoriteCourses.includes(course._id));

  const renderItem = ({ item }) => (
    <Course
      course={item}
      screenType='favorites'
    />
  );

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      padding: 16,
    },
    background: {
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      flex: 1,
    },
    noFavoritesText: {
      fontSize: 18 * fontSize,
      textAlign: "center",
      marginTop: 20,
      color: theme === "light" ? Colors.black : Colors.blue400,
    },
  });

  return (
    <View style={styles.background}>
      {favoriteCoursesData.length === 0 ? (
        <Text style={styles.noFavoritesText}>No courses favorited yet.</Text>
      ) : (
        <FlatList
          data={favoriteCoursesData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.container}
        />
      )}
    </View>
  );
};

export default FavoriteCourses;
