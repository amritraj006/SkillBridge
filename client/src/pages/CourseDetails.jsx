// CourseDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById } from '../api/api';

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
    <div style={{ padding: '2rem' }}>
      <h1>Course Details</h1>
      <h2>ID: {id}</h2>

      {loading && <p>Loading course data...</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {course && (
        <div style={{ marginTop: '1rem' }}>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          {course.instructor && <p><strong>Instructor:</strong> {course.instructor}</p>}
          {course.duration && <p><strong>Duration:</strong> {course.duration}</p>}
          {/* Add more course fields here if needed */}
        </div>
      )}
    </div>
  );
};

export default CourseDetails;