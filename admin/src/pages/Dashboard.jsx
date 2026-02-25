import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { 
  CheckCircle, XCircle, Clock, BookOpen, 
  User, DollarSign, Search, RefreshCw, 
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [pendingCourses, setPendingCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [approvingId, setApprovingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ✅ Fetch Pending Courses
  const fetchPendingCourses = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/courses/pending`);
      const courses = res.data.courses || [];
      setPendingCourses(courses);
      setFilteredCourses(courses);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  // ✅ Approve Course
  const handleApprove = async (courseId) => {
    try {
      setApprovingId(courseId);
      await axios.put(`${backendUrl}/api/courses/approve/${courseId}`);
      
      toast.success("Course approved successfully!", {
        icon: '✅',
        style: { borderRadius: '12px', background: '#10b981', color: '#fff' },
      });
      
      fetchPendingCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Approval failed");
    } finally {
      setApprovingId(null);
    }
  };

  // ✅ Reject Course
  const handleReject = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this course? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      setDeletingId(courseId);
      await axios.delete(`${backendUrl}/api/courses/delete/${courseId}`);
      
      toast.success("Course rejected successfully!", {
        icon: '🗑️',
        style: { borderRadius: '12px', background: '#ef4444', color: '#fff' },
      });
      
      fetchPendingCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || "Reject failed");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter courses based on search
  useEffect(() => {
    const filtered = pendingCourses.filter(course =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacherName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, pendingCourses]);

  useEffect(() => {
    fetchPendingCourses();
  }, [fetchPendingCourses]);

  if (loading && pendingCourses.length === 0) {
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
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-100 rounded-lg">
            <Clock size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Pending Approvals</h1>
            <p className="text-sm text-slate-500">{pendingCourses.length} courses waiting</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title or teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <button
              onClick={fetchPendingCourses}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {/* Results Count */}
        {filteredCourses.length > 0 && (
          <p className="text-sm text-slate-500 mb-4">
            Showing {filteredCourses.length} of {pendingCourses.length} courses
          </p>
        )}

        {/* Courses List */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {searchTerm ? "No matches found" : "All clear!"}
            </h3>
            <p className="text-sm text-slate-500">
              {searchTerm ? "Try a different search term" : "No courses pending approval"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onApprove={handleApprove}
                onReject={handleReject}
                approvingId={approvingId}
                deletingId={deletingId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Course Card Component
const CourseCard = ({ course, onApprove, onReject, approvingId, deletingId }) => {
  const isApproving = approvingId === course._id;
  const isDeleting = deletingId === course._id;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        
        {/* Course Info */}
        <div className="flex-1 flex gap-3">
          {/* Thumbnail */}
          <img
            src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop"}
            alt={course.title}
            className="w-16 h-16 rounded-lg object-cover bg-slate-100"
          />

          {/* Details */}
          <div>
            <h3 className="font-medium text-slate-900">{course.title}</h3>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs">
              <span className="flex items-center gap-1 text-slate-500">
                <User size={11} />
                {course.teacherName || "Unknown"}
              </span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock size={11} />
                {course.duration || "Self-paced"}
              </span>
              <span className="flex items-center gap-1 text-blue-600 font-medium">
                <DollarSign size={11} />
                ₹{course.price || 0}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2 line-clamp-2">
              {course.description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:flex-col sm:items-stretch">
          <button
            onClick={() => onReject(course._id)}
            disabled={isDeleting || isApproving}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-xs disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <XCircle size={14} />
            )}
            <span className="hidden sm:inline">Reject</span>
          </button>

          <button
            onClick={() => onApprove(course._id)}
            disabled={isApproving || isDeleting}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs disabled:opacity-50"
          >
            {isApproving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <CheckCircle size={14} />
            )}
            <span className="hidden sm:inline">Approve</span>
          </button>
        </div>
      </div>
    </div>
  );
};