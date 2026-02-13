import AllCourse from './pages/AllCourse'
import CourseDetails from './pages/CourseDetails'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import RoadmapGenerator from './pages/RoadmapGenerator'
import About from './pages/About'
import SearchResult from './components/SearchResult'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/courses" element={<AllCourse />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path='/ai' element={<RoadmapGenerator />} />
        <Route path='/about' element={<About />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App;