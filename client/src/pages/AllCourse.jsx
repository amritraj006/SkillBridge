import { useState, useEffect } from 'react';
import { getAllCourses } from '../api/courseApi';
import CourseCard from '../components/course/CourseCard';

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-8 text-gray-600">Loading courses...</p>;

  if (courses.length === 0) return <p className="text-center mt-8 text-gray-600">No courses available.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>

      <p className="text-center mt-6 text-gray-700 font-medium">
        Showing {courses.length} course{courses.length > 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default AllCourse;