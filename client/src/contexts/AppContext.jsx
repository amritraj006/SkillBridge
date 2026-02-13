import { createContext, useContext, useEffect, useState } from "react";
import { getAllCourses } from "../api/courseApi";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // ✅ Fetch courses once
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);
      } catch (error) {
        console.log("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // ✅ Filter courses whenever query changes
  useEffect(() => {
    // initially empty
    if (!searchQuery.trim()) {
        setFilteredCourses([]);
        return;
    }

    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filteredCourses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
};