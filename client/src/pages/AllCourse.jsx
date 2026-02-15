import { useState, useEffect } from 'react';
import { getAllCourses } from '../api/courseApi';
import CourseCard from '../components/course/CourseCard';
import { ChevronDown, X, BookOpen, Sparkles } from 'lucide-react';

const AllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'cloud-computing', name: 'Cloud Computing' },
    {id: 'machine-learning', name: 'Machine Learning'},
    { id: 'business', name: 'Business' },
  ];

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response);
      setFilteredCourses(response);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course => 
        course.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredCourses(filtered);
    }
  }, [selectedCategory, courses]);

  const clearFilters = () => {
    setSelectedCategory('all');
  };

  if (loading) {
    return (
      <div className="min-h-[400px]  flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-sm text-slate-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-slate-50 via-white to-blue-50/30 w-full min-h-screen'>
    <div className="max-w-7xl   mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      {/* Hero Header - Updated */}
      <div className="text-center mb-8 lg:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-4">
          <Sparkles size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-700">AI-Powered Learning Paths</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
          Course<span className="text-blue-600">.ai</span>
        </h1>
        <p className="text-slate-600 text-base lg:text-lg max-w-2xl mx-auto">
          Discover expert-crafted courses powered by AI to accelerate your career growth
        </p>
      </div>

      {/* Header - Simplified */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm text-slate-500">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} available
          </p>
        </div>

        {/* Category Filter - Desktop */}
        <div className="hidden sm:block relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer min-w-[180px]"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>

        {/* Category Filter - Mobile */}
        <div className="sm:hidden relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full appearance-none px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Active Filter Badge */}
      {selectedCategory !== 'all' && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-slate-500">Filtered by:</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
            <span className="text-xs font-medium">
              {categories.find(c => c.id === selectedCategory)?.name}
            </span>
            <button
              onClick={clearFilters}
              className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen size={24} className="text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 mb-2">
            No courses found
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Try selecting a different category
          </p>
          <button
            onClick={clearFilters}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            View All Courses
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          {/* Simple Result Summary */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-400">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default AllCourse;