import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { convertDuration } from "../utils/util";

export const CoursesContext = createContext({
  courses: [],
  favoriteCourses: [],
  filters: {
    name: "",
    subject: "any",
    duration: "any",
    price: "any",
    level: "any",
  },
  setFilters: (filters) => {},
  toggleFavorite: (id) => {},
});

const FAVORITES_KEY = "@favorites";

const CoursesContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    subject: "any",
    duration: [
      { number: 0, unit: "hours" },
      { number: 100, unit: "months" },
    ],
    price: "any",
    level: "any",
  });

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

  const filterCourses = () => {
    return data.filter((course) => {
      const matchesName = course.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesSubject = filters.subject === "any" || course.subject === filters.subject;
      const courseDurationString = course.duration.split(" ")[0];
      const courseDuration = parseInt(courseDurationString);
      const courseDurationValue = convertDuration({
        number: courseDuration,
        unit: course.duration.split(" ")[1],
      });

      const matchesDuration =
        filters.duration === "any" ||
        (courseDurationValue >= convertDuration(filters.duration[0]) &&
          courseDurationValue <= convertDuration(filters.duration[1]));
      const matchesPrice =
        filters.price === "any" ||
        (filters.price === "Free" && course.price === 0) ||
        (filters.price === "Paid" && course.price > 0);
      const matchesLevel = filters.level === "any" || course.level === filters.level;
      return matchesName && matchesSubject && matchesDuration && matchesPrice && matchesLevel;
    });
  };

  const value = useMemo(
    () => ({
      courses: filterCourses(),
      favoriteCourses: favorites,
      filters,
      setFilters,
      toggleFavorite,
    }),
    [data, favorites, filters]
  );

  return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
};

export default CoursesContextProvider;
