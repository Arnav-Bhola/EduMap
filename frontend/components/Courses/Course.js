import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CoursesContext } from "../../store/courses";
import { DarkModeContext } from "../../store/dark-mode";
import { Colors } from "../../utils/constants/colors";

const Course = ({ course, screenType }) => {
  // Added screenType prop
  const { favoriteCourses, toggleFavorite } = useContext(CoursesContext);
  const isFavorite = favoriteCourses.includes(course._id);

  const { theme } = useContext(DarkModeContext);

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    item: {
      backgroundColor: theme === "light" ? Colors.white : Colors.blue750,
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      elevation: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      width: "80%",
      paddingTop: 10,
      color: theme === "light" ? Colors.black : Colors.blue400,
    },
    duration: {
      fontSize: 18,
      textTransform: "capitalize",
      color: theme === "light" ? Colors.black : Colors.blue400,
    },
    level: {
      fontSize: 18,
      textTransform: "capitalize",
      color: theme === "light" ? Colors.black : Colors.blue400,
    },
    price: {
      fontSize: 18,
      color: theme === "light" ? Colors.black : Colors.blue400,
    },
    description: {
      paddingTop: 20,
      paddingBottom: 5,
    },
    details: {
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    detail: {
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue800,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 5,
      marginRight: 15,
      marginBottom: 8,
    },
    favoriteButton: {
      padding: 10,
      paddingTop: 0,
      borderRadius: 5,
      position: "absolute",
      right: "4%",
      top: 5,
    },
    buttonText: {
      color: Colors.white,
      textAlign: "center",
    },
  });

  const clickHandler = () => {
    const routeName = screenType === "favorites" ? "FavoriteCourseDetails" : "AllCoursesDetail";
    navigation.navigate(routeName, {
      courseId: course._id,
    });
  };

  const price = course.price === 0 ? "Free" : course.price + " usd";

  return (
    <Pressable
      onPress={clickHandler}
      style={({ pressed }) => [styles.item, pressed && { opacity: 0.6 }]}
    >
      <View>
        <Text style={styles.title}>{course.name}</Text>
        <View style={styles.description}>
          <View style={styles.details}>
            <View style={styles.detail}>
              <Text style={styles.duration}>{course.duration}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.level}>{course.level}</Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.price}>{price}</Text>
            </View>
          </View>
        </View>
        <Pressable
          onPress={() => toggleFavorite(course._id)}
          style={({ pressed }) => [styles.favoriteButton, pressed && { opacity: 0.6 }]}
        >
          <View>
            <Ionicons
              name={isFavorite ? "star" : "star-outline"}
              color={theme === "light" ? Colors.gold500 : Colors.gold700}
              size={30}
            />
          </View>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default Course;
