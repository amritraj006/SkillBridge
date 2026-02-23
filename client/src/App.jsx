import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import AddTestimonial from "./pages/AddTestimonial";

const Home = lazy(() => import("./pages/Home"));
const AllCourse = lazy(() => import("./pages/AllCourse"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const RoadmapGenerator = lazy(() => import("./pages/RoadmapGenerator"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Cart = lazy(() => import("./pages/Cart"));
const Payment = lazy(() => import("./pages/Payment"));
const Learning = lazy(() => import("./pages/Learning"));


const App = () => {
  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/payment") ||
    location.pathname.startsWith("/course/learning");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Toaster />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<AllCourse />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/ai" element={<RoadmapGenerator />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/course/learning/:id" element={<Learning />} />
          <Route path="/feedback" element={<AddTestimonial />}/>

          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-[70vh] text-2xl font-semibold">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;