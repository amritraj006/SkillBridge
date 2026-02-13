import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

const SearchResult = () => {
  const { searchQuery, filteredCourses, setSearchQuery } = useAppContext();
  const navigate = useNavigate();

  if (!searchQuery.trim()) return null;

  return (
    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Search size={14} className="text-blue-600" />
          <span>{filteredCourses.length} results</span>
        </div>
        <button
          onClick={() => setSearchQuery("")}
          className="p-1 hover:bg-slate-100 rounded"
        >
          <X size={14} className="text-slate-400" />
        </button>
      </div>

      {/* Results */}
      <div className="max-h-[350px] overflow-y-auto">
        {filteredCourses.length === 0 ? (
          <p className="px-4 py-6 text-sm text-slate-500 text-center">
            No courses found
          </p>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course._id}
              onClick={() => {
                navigate(`/courses/${course._id}`);
                setSearchQuery("");
              }}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0"
            >
              <img
                src={course.thumbnailUrl || "https://via.placeholder.com/40"}
                alt={course.title}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-slate-800">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {course.category || "Course"} • {course.price ? `$${course.price}` : "Free"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResult;