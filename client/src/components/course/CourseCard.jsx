
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={course.thumbnailUrl || "https://via.placeholder.com/400x200"}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <p className="text-gray-600 mt-2 line-clamp-3">{course.description}</p>
        <p className="text-blue-600 font-bold mt-2">{course.price ? `$${course.price}` : "Free"}</p>

        <button
          onClick={() => navigate(`/courses/${course._id}`)}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;