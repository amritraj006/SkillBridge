

import TeacherDashboard from "./pages/TeacherDashboard";
import Navbar from "./components/Navbar";
import AddCourse from "./pages/AddCourse";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {

  return (
    <>
   <Navbar />
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/add-course" element={<AddCourse />} />
    <Route path="/dashboard" element={<TeacherDashboard />} />
   </Routes>
    </>
  );
};

export default App;