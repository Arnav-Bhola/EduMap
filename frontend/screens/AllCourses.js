import React, { useContext, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Course from "../components/Courses/Course";
import Filter from "../components/Courses/Filter";
import { CoursesContext } from "../store/courses";
import { DarkModeContext } from "../store/dark-mode";
import { useFilterVisibility } from "../store/filter-visibility";
import { FontContext } from "../store/font";
import { Colors } from "../utils/constants/colors";

const CoursesList = () => {
  const { courses } = useContext(CoursesContext);
  const listRef = useRef(null);
  const { theme } = useContext(DarkModeContext);
  const { fontSize, fontFamily } = useContext(FontContext);
  const { isFilterVisible } = useFilterVisibility();

  const renderItem = ({ item }) => <Course course={item} />;

  const handleApplyFilters = () => {
    listRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      padding: 16,
    },
    background: { flex: 1, backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800 },
    filter: {
      position: "absolute",
      flex: 1,
      width: "100%",
    },
    noFavoritesText: {
      fontSize: 18 * fontSize,
      marginTop: 20,
      color: theme === "light" ? Colors.black : Colors.blue400,
      width: "80%",
      alignSelf: "center",
      textAlign: "center",
    },
  });

  return (
    <>
      <View style={styles.background}>
        {courses.length === 0 ? (
          <>
            <Text style={styles.noFavoritesText}>No courses found...</Text>
            <Text style={styles.noFavoritesText}>
              Please adjust filters or try again later. Note, courses might be loading.
            </Text>
          </>
        ) : (
          <FlatList
            ref={listRef}
            data={courses}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.container}
          />
        )}
      </View>
      {isFilterVisible && (
        <View style={styles.filter}>
          <Filter onApply={handleApplyFilters} />
        </View>
      )}
    </>
  );
};

export default CoursesList;
