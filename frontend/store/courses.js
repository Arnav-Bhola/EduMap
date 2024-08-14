import React, { createContext, useEffect, useMemo, useState } from "react";

export const CoursesContext = createContext({
  courses: [],
});

const CoursesContextProvider = ({ children }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("");
        console.log("response is ", response);
        const fetchedData = await response.json();
        const fetchedCourses = fetchedData.courses;
        setData(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  const value = useMemo(() => ({ courses: data }), [data]);

  return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>;
};

export default CoursesContextProvider;
