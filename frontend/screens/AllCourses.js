import React, { useContext, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Course from "../components/Courses/Course";
import Filter from "../components/Courses/Filter";
import { CoursesContext } from "../store/courses";
import { DarkModeContext } from "../store/dark-mode";
import { useFilterVisibility } from "../store/filter-visibility";
import { Colors } from "../utils/constants/colors";

const CoursesList = () => {
  const { courses } = useContext(CoursesContext);
  const listRef = useRef(null);
  const { theme } = useContext(DarkModeContext);
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
  });

  return (
    <>
      <View style={styles.background}>
        <FlatList
          ref={listRef}
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.container}
        />
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
