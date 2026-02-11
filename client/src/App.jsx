import AllCourse from './pages/AllCourse'
import CourseDetails from './pages/CourseDetails'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path="/courses" element={<AllCourse />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
    </Routes>
  )
}

export default App