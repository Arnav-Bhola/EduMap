import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <Ionicons name="md-search" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <Text>Open up to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BAD7F2",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
});
