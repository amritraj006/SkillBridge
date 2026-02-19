import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const PurchasedCourseCard = memo(({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/learning/${course._id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/course/learning/${course._id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      className="group relative bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x225?text=Course";
          }}
        />
        
        {/* Category Tag */}
        {course.category && (
          <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-md">
            {course.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
      </div>
    </div>
  );
});

PurchasedCourseCard.displayName = 'PurchasedCourseCard';

export default PurchasedCourseCard;