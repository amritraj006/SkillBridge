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


const App = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname.includes("dashboard");
  return (
    <>
      {!isDashboardPage && <Navbar />}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/courses" element={<AllCourse />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path='/ai' element={<RoadmapGenerator />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      {!isDashboardPage && <Footer />}
    </>
  )
}

export default App;