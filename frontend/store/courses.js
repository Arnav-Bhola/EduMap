import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useMemo, useState } from "react";

export const CoursesContext = createContext({
  courses: [],
  FavoriteCourses: [],
  toggleFavorite: (id) => {},
});

const FAVORITES_KEY = "@favorites";

const CoursesContextProvider = ({ children }) => {
  const [data, setData] = useState();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://edumap.onrender.com");
        const fetchedData = await response.json();
        const fetchedCourses = fetchedData.courses;
        setData(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    loadFavorites();
  }, []);

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((courseId) => courseId !== id)
        : [...prevFavorites, id];

      saveFavorites(updatedFavorites);
      return updatedFavorites;
    });
  };

  const value = useMemo(
    () => ({ courses: data, favoriteCourses: favorites, toggleFavorite }),
    [data, favorites]
  );

  return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
};

export default CoursesContextProvider;
