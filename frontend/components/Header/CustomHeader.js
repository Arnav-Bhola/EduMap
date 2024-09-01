import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { DarkModeContext } from "../../store/dark-mode";
import { useFilterVisibility } from "../../store/filter-visibility";
import { FontContext } from "../../store/font";
import { Colors } from "../../utils/constants/colors";
import SearchBar from "../UI/SearchBar";

const CustomHeader = ({ saved = false }) => {
  const { theme } = useContext(DarkModeContext);
  const { fontSize, fontFamily } = useContext(FontContext);
  const { toggleFilter, isFilterVisible } = useFilterVisibility();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 10,
      justifyContent: "space-around",
      paddingTop: 55,
      paddingBottom: 15,
      borderBottomColor: theme === "light" ? Colors.black : Colors.white,
      borderBottomWidth: 1,
      backgroundColor: theme === "light" ? Colors.blue700 : Colors.blue900,
    },
    searchBar: {
      flex: 1,
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },
    icon: {
      textAlign: "center",
    },
  });

  return (
    <View style={styles.headerContainer}>
      <SearchBar style={styles.searchBar} />
      {!saved && (
        <Pressable
          onPress={() => {
            navigation.navigate("AllCoursesList");
            toggleFilter();
          }}
          style={({ pressed }) => [styles.iconContainer, { opacity: pressed ? 0.5 : 1 }]}
        >
          <Ionicons
            name={isFilterVisible ? "close-circle-outline" : "options-outline"}
            color={theme === "light" ? Colors.black : Colors.blue500}
            size={40 * fontSize}
            style={styles.icon}
          />
        </Pressable>
      )}
    </View>
  );
};

export default CustomHeader;
