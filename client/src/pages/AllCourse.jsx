
import { useState, useEffect } from 'react';
import { getAllCourses } from '../api/api';

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

        {courses.length === 0 ? (
            <p>No courses available.</p>
        ) : (
            <ul>
                {courses.map(course => (
                    <li key={course._id}>{course._id} {course.title}</li>
                ))}
            </ul>
        )}

    </div>
  )
}

export default AllCourse