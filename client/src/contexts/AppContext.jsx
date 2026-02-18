import { createContext, useContext, useEffect, useState } from "react";
import { getAllCourses } from "../api/courseApi";
import { getAllUsers } from "../api/userApi";
import { getCart, toggleCartApi } from "../api/userApi";
import { useUser } from "@clerk/clerk-react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();

  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [users, setUsers] = useState([]);

  // ✅ CART STATE
  const [cart, setCart] = useState([]); // array of courseIds
  const [loadingCart, setLoadingCart] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

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
    if (!searchQuery.trim()) {
      setFilteredCourses([]);
      return;
    }

    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  const totalCourses = courses.length;

  // ✅ Fetch all users (admin)
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const totalUsers = users.length;

  // ✅ Fetch cart when user logs in
  const fetchCart = async () => {
    if (!isSignedIn || !user?.id) return;

    try {
      setLoadingCart(true);
      const data = await getCart(user.id);

      // store only course ids
      const ids = (data.cartCourses || []).map((c) => c._id);
      setCart(ids);
    } catch (error) {
      console.log("Error fetching cart:", error);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isSignedIn, user?.id]);

  // ✅ Toggle cart (Add/Remove)
  const toggleCart = async (courseId) => {
    if (!isSignedIn || !user?.id) {
      alert("Please login first!");
      return;
    }

    try {
      setTogglingId(courseId);

      const res = await toggleCartApi({
        userId: user.id,
        courseId,
      });

      // update local cart instantly
      setCart((prev) => {
        const exists = prev.includes(courseId);
        if (exists) return prev.filter((id) => id !== courseId);
        return [...prev, courseId];
      });

      return res;
    } catch (error) {
      console.log("toggleCart error:", error);
      alert("Cart update failed!");
    } finally {
      setTogglingId(null);
    }
  };

  const cartCount = cart.length;

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filteredCourses,
        totalCourses,
        totalUsers,

        // ✅ cart values
        cart,
        cartCount,
        loadingCart,
        togglingId,
        toggleCart,
        fetchCart,
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