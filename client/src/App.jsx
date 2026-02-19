import AllCourse from './pages/AllCourse'
import CourseDetails from './pages/CourseDetails'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import RoadmapGenerator from './pages/RoadmapGenerator'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import { useLocation } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Learning from './pages/Learning'


const App = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname.includes("dashboard");
  const isPaymentPage = location.pathname.includes("payment");
  const isCoursePage = location.pathname.includes("course");
  return (
    <>
      {!isDashboardPage && !isPaymentPage && <Navbar />}
      <Toaster />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/courses" element={<AllCourse />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path='/ai' element={<RoadmapGenerator />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/cart' element={<Cart />}/>
        <Route path='/payment' element={<Payment />} />
        <Route path="/course/learning/:id" element={<Learning />} />
      </Routes>
      {!isDashboardPage && !isPaymentPage && !isCoursePage && <Footer />}
    </>
  )
}

export default App;