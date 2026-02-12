import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../api/courseApi';

const CourseDetails = () => {
  const { id } = useParams(); // get course ID from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getCourseById(id);

      if (!response) {
        setError('Course not found.');
      } else {
        setCourse(response);
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to fetch course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {loading && <p className="text-center text-gray-500">Loading course data...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {course && (
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <h1 className="text-2xl font-bold text-blue-600">{course.title}</h1>
          
          {course.thumbnailUrl && (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          )}

          <p className="text-gray-700">{course.description}</p>

          {course.instructor && (
            <p>
              <span className="font-semibold">Instructor:</span> {course.instructor}
            </p>
          )}

          {course.duration && (
            <p>
              <span className="font-semibold">Duration:</span> {course.duration}
            </p>
          )}

          {course.price && (
            <p className="text-blue-600 font-semibold">Price: {course.price === 0 ? 'Free' : `$${course.price}`}</p>
          )}

          {/* Optional: Add Enroll button */}
          <button
            className="mt-4 bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Enroll Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;