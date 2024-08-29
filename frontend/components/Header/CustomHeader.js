import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { DarkModeContext } from "../../store/dark-mode";
import { useFilterVisibility } from "../../store/filter-visibility";
import { Colors } from "../../utils/constants/colors";
import SearchBar from "../UI/SearchBar";

const CustomHeader = ({ saved = false }) => {
  const { theme } = useContext(DarkModeContext);
  const { toggleFilter } = useFilterVisibility();

  const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
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
    icon: {
      textAlign: "center",
    },
  });

  return (
    <View style={styles.headerContainer}>
      <SearchBar style={styles.searchBar} />
      {!saved && (
        <Ionicons
          name='options-outline'
          color={theme === "light" ? Colors.black : Colors.blue500}
          size={40}
          style={styles.icon}
          onPress={toggleFilter}
        />
      )}
    </View>
  );
};

export default CustomHeader;
