import React, { createContext, useContext, useState } from "react";

const FilterVisibilityContext = createContext();

export const useFilterVisibility = () => useContext(FilterVisibilityContext);

const FilterVisibilityProvider = ({ children }) => {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const toggleFilter = () => {
    setFilterVisible((prev) => !prev);
  };

  return (
    <FilterVisibilityContext.Provider value={{ isFilterVisible, toggleFilter }}>
      {children}
    </FilterVisibilityContext.Provider>
  );
};

export default FilterVisibilityProvider;
