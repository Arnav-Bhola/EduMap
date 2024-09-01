import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CoursesContext } from "../store/courses";
import { DarkModeContext } from "../store/dark-mode";
import { FontContext } from "../store/font";
import { Colors } from "../utils/constants/colors";

const CourseDetails = ({ route }) => {
  const navigation = useNavigation();
  const { theme } = useContext(DarkModeContext);
  const { courses } = useContext(CoursesContext);
  const { fontSize, fontFamily } = useContext(FontContext);
  const { courseId } = route.params;
  console.log(fontSize);

  const course = courses.find((course) => course.id === courseId);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 30,
    },
    title: {
      fontSize: 24 * fontSize,
      fontWeight: "bold",
      marginBottom: 16,
    },
    detailsContainer: {
      marginBottom: 16,
    },
    detail: {
      fontSize: 20 * fontSize,
      marginBottom: 10,
      color: theme === "light" ? Colors.black : Colors.blue400,
    },
    authors: {
      fontSize: 20 * fontSize,
      marginBottom: 14,
      color: theme === "light" ? Colors.black : Colors.blue400,
    },
    linkButton: {
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: Colors.blue700,
    },
    linkText: {
      color: theme === "light" ? Colors.white : Colors.blue800,
      fontSize: 18 * fontSize,
      fontWeight: "bold",
    },
    goBackButton: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: theme === "light" ? Colors.blue750 : Colors.blue900,
      color: theme === "light" ? Colors.white : Colors.blue400,
      alignItems: "center",
    },
    goBackText: {
      color: Colors.white,
      fontSize: 18 * fontSize,
      fontWeight: "bold",
    },
    errorText: {
      fontSize: 18 * fontSize,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  if (!course) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme === "light" ? Colors.blue400 : Colors.blue800 },
        ]}
      >
        <Text style={[styles.errorText, { color: theme === "light" ? Colors.red : Colors.white }]}>
          Course not found
        </Text>
      </View>
    );
  }

  const handleLinkPress = () => {
    Linking.openURL(course.link);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme === "light" ? Colors.blue400 : Colors.blue800 },
      ]}
    >
      <Text style={[styles.title, { color: theme === "light" ? Colors.black : Colors.white }]}>
        {course.name}
      </Text>
      <View style={styles.detailsContainer}>
        <Text style={[styles.detail]}>Duration: {course.duration}</Text>
        <Text style={[styles.detail]}>Institution: {course.institution}</Text>
        <Text style={[styles.detail]}>Subject: {course.subject}</Text>
        <Text style={[styles.detail]}>
          Price: {course.price === 0 ? "Free" : `${course.price} USD`}
        </Text>
        <Text style={[styles.detail]}>Level: {course.level}</Text>
        <Text style={[styles.detail]}>Prerequisites: {course.prereqs}</Text>
        <Text style={[styles.detail, styles.authors]}>Authors: {course.authors.join(", ")}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [styles.linkButton, { opacity: pressed ? 0.75 : 1 }]}
        onPress={handleLinkPress}
      >
        <Text style={styles.linkText}>Check it out</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.goBackButton, { opacity: pressed ? 0.75 : 1 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackText}>Go Back</Text>
      </Pressable>
    </ScrollView>
  );
};
export default CourseDetails;
