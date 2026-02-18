import { useNavigate } from 'react-router-dom';
import { Clock, Users, Sparkles } from 'lucide-react';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  // Default values if not provided
  const {
    title,
    description,
    thumbnailUrl,
    price,
    duration,
    availableSlots,
    level,
    category
  } = course;

  const formatPrice = () => {
    if (price === 0 || !price) return "Free";
    return `$${price}`;
  };

  return (
    <div 
      onClick={() => {navigate(`/courses/${course._id}`);scrollTo(0,0)}}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-medium rounded-full border border-blue-100 shadow-sm">
              {category}
            </span>
          </div>
        )}

        {/* Level Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {level}
          </span>
        </div>

        {/* AI Badge for AI-powered courses */}
        {course.isAIPowered && (
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
              <Sparkles size={12} />
              <span>AI-Powered</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mt-2 line-clamp-2">
          {description}
        </p>

        {/* Stats Grid */}
        <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-slate-400" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-slate-400" />
            <span>{availableSlots}</span>
          </div>
      
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
          {/* Price */}
          <div>
            <span className="text-lg font-bold text-blue-600">
              {formatPrice()}
            </span>
            {price > 0 && (
              <span className="text-xs text-slate-400 ml-1">one-time</span>
            )}
          </div>

          {/* View Button */}
          <button className="px-4 py-2 bg-slate-50 hover:bg-blue-600 text-slate-700 hover:text-white text-sm font-medium rounded-lg border border-slate-200 hover:border-blue-600 transition-all duration-300 group-hover:shadow-md">
            View Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;