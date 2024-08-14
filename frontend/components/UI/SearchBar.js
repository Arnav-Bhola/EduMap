import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons
          name='search'
          size={24}
          color='gray'
          style={styles.icon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder='Search...'
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
    </View>
  );
};

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
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  icon: {
    paddingRight: 10,
  },
});

export default SearchBar;
