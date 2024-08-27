import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { StyleSheet } from "react-native";
import CustomHeader from "./components/Header/CustomHeader";
import CustomStatusBar from "./components/UI/StatusBar";
import AllCourses from "./screens/AllCourses";
import CourseDetails from "./screens/CourseDetails";
import FavoriteCourses from "./screens/FavoriteCourses";
import Settings from "./screens/Settings";
import CoursesContextProvider from "./store/courses";
import DarkModeContextProvider, { DarkModeContext } from "./store/dark-mode";
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
      name='AllCourses'
      component={AllCourses}
    />
    <Stack.Screen
      name='CourseDetail'
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
      name='FavoriteCourses'
      component={FavoriteCourses}
    />
    <Stack.Screen
      name='CourseDetail'
      component={CourseDetails}
    />
  </Stack.Navigator>
);

const Navigator = () => {
  const darkModeCtx = useContext(DarkModeContext);
  const theme = darkModeCtx.theme;

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
              fontSize: 20,
              color: theme === "light" ? Colors.black : Colors.blue500,
              marginBottom: 10,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <CoursesContextProvider>
      <DarkModeContextProvider>
        <CustomStatusBar />
        <Navigator />
      </DarkModeContextProvider>
    </CoursesContextProvider>
  );
}

const styles = StyleSheet.create({});
