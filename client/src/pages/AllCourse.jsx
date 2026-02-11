
import { useState, useEffect } from 'react';
import { getAllCourses } from '../api/api';
import CourseCard from '../components/course/CourseCard';

const AllCourse = () => {
    const [courses, setCourses] = useState([]);
    
    const fetchCourses = async () => {
        try {
            const response = await getAllCourses();
            setCourses(response);
        }           
        catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

  return (
    <div>

        {courses.map(course => (
            <div>
            
            <CourseCard key={course._id} course={course} />
            </div>
        ))}
        <p className="text-center mt-4">Showing {courses.length} courses</p>

    </div>
  )
}

export default AllCourse