import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({course}) => {
    const navigate = useNavigate();
  return (
    <div>
        <img src={course.thumbnailUrl} alt={course.title} />
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <p>{course.price}</p>

        <button onClick={() => navigate(`/courses/${course._id}`)}>View Details</button>

    </div>
  )
}

export default CourseCard