import { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTeacherAllCourses, getTeacherApprovedCourses, getTeacherPendingCourses } from "../api/api";
import {
  BookOpen, CheckCircle, Clock, PlusCircle,
  ArrowLeft, Search, DollarSign,
  Grid, List, Loader2, AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

// Constants
const FILTER_OPTIONS = [
  { value: "all", label: "All", icon: BookOpen },
  { value: "approved", label: "Approved", icon: CheckCircle },
  { value: "pending", label: "Pending", icon: Clock },
];

const VIEW_MODES = {
  GRID: "grid",
  LIST: "list"
};

// Utility function for status badge
const getStatusBadge = (isApproved) => ({
  bg: isApproved ? "bg-green-100" : "bg-yellow-100",
  text: isApproved ? "text-green-700" : "text-yellow-700",
  icon: isApproved ? CheckCircle : Clock,
  label: isApproved ? "Approved" : "Pending"
});

export default function AllCourse() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState(VIEW_MODES.GRID);

  // Get filter from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterParam = params.get("filter");
    if (filterParam && FILTER_OPTIONS.some(opt => opt.value === filterParam)) {
      setFilter(filterParam);
    }
  }, [location]);

  // Fetch courses
  useEffect(() => {
    if (user?.id) {
      fetchCourses();
    }
  }, [user?.id, filter]);

  const fetchCourses = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      const apiCalls = {
        all: getTeacherAllCourses,
        approved: getTeacherApprovedCourses,
        pending: getTeacherPendingCourses
      };

      const response = await apiCalls[filter](user.id);
      setCourses(response.data.courses || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
    navigate(`/my-courses?filter=${newFilter}`);
  }, [navigate]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Memoized filtered courses
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) return courses;
    
    const searchLower = searchTerm.toLowerCase();
    return courses.filter(course =>
      course.title?.toLowerCase().includes(searchLower) ||
      course.category?.toLowerCase().includes(searchLower)
    );
  }, [courses, searchTerm]);

  const handleCourseClick = useCallback((courseId) => {
    navigate(`/teacher/course/${courseId}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-lg">
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Courses</h1>
              <p className="text-sm text-slate-500">{filteredCourses.length} courses</p>
            </div>
          </div>

          <div className="flex gap-2">
       

            <button
              onClick={() => navigate("/add-course")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              aria-label="Create new course"
            >
              <PlusCircle size={16} />
              New Course
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            {/* Filter Tabs */}
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {FILTER_OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => handleFilterChange(value)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    filter === value
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-pressed={filter === value}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                aria-label="Search courses"
              />
            </div>

            {/* View Toggle */}
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setViewMode(VIEW_MODES.GRID)}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === VIEW_MODES.GRID ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
                }`}
                aria-label="Grid view"
                aria-pressed={viewMode === VIEW_MODES.GRID}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode(VIEW_MODES.LIST)}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === VIEW_MODES.LIST ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
                }`}
                aria-label="List view"
                aria-pressed={viewMode === VIEW_MODES.LIST}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid/List */}
        {filteredCourses.length === 0 ? (
          <EmptyState searchTerm={searchTerm} onNavigate={navigate} />
        ) : (
          <CourseList
            courses={filteredCourses}
            viewMode={viewMode}
            onCourseClick={handleCourseClick}
          />
        )}
      </div>
    </div>
  );
}

// Empty State Component
const EmptyState = ({ searchTerm, onNavigate }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <AlertCircle size={24} className="text-slate-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 mb-2">
      {searchTerm ? "No matches found" : "No courses yet"}
    </h3>
    <p className="text-sm text-slate-500 mb-5">
      {searchTerm ? "Try a different search term" : "Create your first course to get started"}
    </p>
    {!searchTerm && (
      <button
        onClick={() => onNavigate("/add-course")}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        <PlusCircle size={16} />
        Create Course
      </button>
    )}
  </div>
);

// Course List Component
const CourseList = ({ courses, viewMode, onCourseClick }) => {
  return (
    <div className={
      viewMode === VIEW_MODES.GRID
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        : "space-y-3"
    }>
      {courses.map((course) => (
        <CourseItem
          key={course._id}
          course={course}
          viewMode={viewMode}
          onClick={() => onCourseClick(course._id)}
        />
      ))}
    </div>
  );
};

// Course Item Component
const CourseItem = ({ course, viewMode, onClick }) => {
  const status = useMemo(() => getStatusBadge(course.isApproved), [course.isApproved]);
  const StatusIcon = status.icon;

  if (viewMode === VIEW_MODES.GRID) {
    return (
      <div
        onClick={onClick}
        className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
      >
        <div className="relative h-36 overflow-hidden">
          <img
            src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <span className={`flex items-center gap-1 px-2 py-0.5 ${status.bg} ${status.text} text-xs font-medium rounded-full`}>
              <StatusIcon size={10} />
              {status.label}
            </span>
          </div>
        </div>

        <div className="p-3">
          <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-1">
            {course.title}
          </h3>
          
          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
            {course.category || "Uncategorized"} • {course.level || "All"}
          </p>

          <div className="flex items-center justify-between mt-2 text-xs">
          
            <span className="font-medium text-blue-600">
              ₹{course.price || 0}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-lg border border-slate-200 p-3 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <img
          src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=60&h=60&fit=crop"}
          alt={course.title}
          loading="lazy"
          className="w-12 h-12 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                {course.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {course.category} • {course.price ? `₹${course.price}` : "Free"}
              </p>
            </div>
            <span className={`flex items-center gap-1 px-2 py-0.5 ${status.bg} ${status.text} text-xs font-medium rounded-full whitespace-nowrap`}>
              <StatusIcon size={10} />
              {status.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};