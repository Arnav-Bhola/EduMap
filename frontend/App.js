import {
  BalsamiqSans_400Regular,
  BalsamiqSans_400Regular_Italic,
  BalsamiqSans_700Bold,
  BalsamiqSans_700Bold_Italic,
} from "@expo-google-fonts/balsamiq-sans";
import {
  ComicNeue_300Light,
  ComicNeue_300Light_Italic,
  ComicNeue_400Regular,
  ComicNeue_400Regular_Italic,
  ComicNeue_700Bold,
  ComicNeue_700Bold_Italic,
} from "@expo-google-fonts/comic-neue";
import {
  OpenSans_300Light,
  OpenSans_300Light_Italic,
  OpenSans_400Regular,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import CustomHeader from "./components/Header/CustomHeader";
import CustomStatusBar from "./components/UI/StatusBar";
import AllCourses from "./screens/AllCourses";
import CourseDetails from "./screens/CourseDetails";
import FavoriteCourses from "./screens/FavoriteCourses";
import Settings from "./screens/Settings";
import CoursesContextProvider from "./store/courses";
import DarkModeContextProvider, { DarkModeContext } from "./store/dark-mode";
import FilterVisibilityProvider from "./store/filter-visibility";
import FontContextProvider, { FontContext } from "./store/font";
import { Colors } from "./utils/constants/colors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AllCoursesStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: () => {},
    }}
  >
    <Stack.Screen
      name='AllCoursesList'
      component={AllCourses}
    />
    <Stack.Screen
      name='AllCoursesDetail'
      component={CourseDetails}
    />
  </Stack.Navigator>
);

const FavoriteCoursesStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: () => {},
    }}
  >
    <Stack.Screen
      name='FavoriteCoursesList'
      component={FavoriteCourses}
    />
    <Stack.Screen
      name='FavoriteCourseDetails'
      component={CourseDetails}
    />
  </Stack.Navigator>
);

const Navigator = () => {
  const darkModeCtx = useContext(DarkModeContext);
  const theme = darkModeCtx.theme;
  const { fontSize, fontFamily } = useContext(FontContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: theme === "light" ? Colors.blue700 : Colors.blue900,
            paddingVertical: 10,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === "AllCourses") {
              iconName = focused ? "library" : "library-outline";
            } else if (route.name === "FavoriteCourses") {
              iconName = focused ? "star" : "star-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "cog" : "cog-outline";
            }

            return (
              <Ionicons
                name={iconName}
                size={37}
                color={color}
              />
            );
          },
          tabBarLabel: () => {
            return null;
          },
          tabBarActiveTintColor: theme === "light" ? Colors.blue800 : Colors.blue700, // Active tab icon color
          tabBarInactiveTintColor: theme === "light" ? Colors.black : Colors.blue500, // Inactive tab icon color
        })}
      >
        <Tab.Screen
          name='AllCourses'
          component={AllCoursesStack}
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Tab.Screen
          name='FavoriteCourses'
          component={FavoriteCoursesStack}
          options={{
            header: () => <CustomHeader saved />,
          }}
        />
        <Tab.Screen
          name='Settings'
          component={Settings}
          options={{
            title: "Settings",
            headerStyle: {
              borderBottomColor: theme === "light" ? Colors.black : Colors.white,
              borderBottomWidth: 1,
              backgroundColor: theme === "light" ? Colors.blue700 : Colors.blue900,
            },
            headerTitleStyle: {
              fontSize: 20 * fontSize,
              color: theme === "light" ? Colors.black : Colors.blue500,
              marginBottom: 10,
              fontFamily:
                fontFamily === "normal"
                  ? "OpenSans_400Regular"
                  : fontFamily === "fun"
                  ? "BalsamiqSans_400Regular"
                  : "ComicNeue_400Regular",
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
    BalsamiqSans_400Regular_Italic,
    BalsamiqSans_700Bold,
    BalsamiqSans_700Bold_Italic,
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
    ComicNeue_300Light,
    ComicNeue_300Light_Italic,
    ComicNeue_400Regular,
    ComicNeue_400Regular_Italic,
    ComicNeue_700Bold,
    ComicNeue_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <FontContextProvider>
      <FilterVisibilityProvider>
        <CoursesContextProvider>
          <DarkModeContextProvider>
            <CustomStatusBar />
            <Navigator />
          </DarkModeContextProvider>
        </CoursesContextProvider>
      </FilterVisibilityProvider>
    </FontContextProvider>
  );
}

const styles = StyleSheet.create({});
