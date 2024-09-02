import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { CoursesContext } from "../../store/courses";
import { DarkModeContext } from "../../store/dark-mode";
import { FontContext } from "../../store/font";
import { Colors } from "../../utils/constants/colors";

const SearchBar = () => {
  const { theme } = useContext(DarkModeContext);
  const { fontSize, fontFamily } = useContext(FontContext);

  const { filters, setFilters } = useContext(CoursesContext);
  const [searchText, setSearchText] = useState(filters.name);

  useEffect(() => {
    setFilters((prev) => {
      return { ...prev, name: searchText };
    });
  }, [searchText, setFilters]);

  const styles = StyleSheet.create({
    container: {
      width: "80%",
      alignItems: "center",
    },
    searchBarContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: theme === "light" ? Colors.blue500 : Colors.blue750,
    },
    searchBar: {
      flex: 1,
      height: 40,
      fontSize: 20 * fontSize,
      color: theme === "light" ? Colors.blue900 : Colors.blue400,
      fontFamily:
        fontFamily === "normal"
          ? "OpenSans_400Regular"
          : fontFamily === "fun"
          ? "BalsamiqSans_400Regular"
          : "ComicNeue_400Regular",
    },
    icon: {
      paddingRight: 10,
      color: theme === "light" ? Colors.blue900 : Colors.blue400,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons
          name='search'
          size={24 * fontSize}
          color='gray'
          style={styles.icon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder='Search...'
          value={searchText}
          onChangeText={setSearchText}
          keyboardAppearance={theme}
          placeholderTextColor={theme === "light" ? Colors.blue900 : Colors.blue400}
        />
      </View>
    </View>
  );
};

export default SearchBar;
