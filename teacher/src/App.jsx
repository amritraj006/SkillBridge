import Navbar from "./components/Navbar";
import AddCourse from "./pages/AddCourse";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllCourse from "./pages/AllCourse";
import CourseDetails from "./pages/CourseDetails";
import EditCourse from "./pages/EditCourse";
import { Toaster } from "react-hot-toast";

const App = () => {

  return (
    <>
    <Toaster />
   <Navbar />
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/add-course" element={<AddCourse />} />
    <Route path="/my-courses" element={<AllCourse />} />
    <Route path="/teacher/course/:id" element={<CourseDetails />} />
    <Route path="/teacher/edit/:id" element={<EditCourse />} />
   </Routes>
    </>
  );
};

export default App;