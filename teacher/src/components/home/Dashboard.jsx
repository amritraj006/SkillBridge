import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getTeacherAllCourses,
  getTeacherPendingCourses,
  getTeacherApprovedCourses,
} from "../../api/api";
import {
  BookOpen, CheckCircle, Clock, DollarSign,
  PlusCircle, LayoutDashboard, TrendingUp,
  AlertCircle, Loader2, ChevronRight, Award,
  GraduationCap, Sparkles, Eye
} from "lucide-react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalCourses: 0,
    approvedCourses: 0,
    pendingCourses: 0,
    totalEarnings: 0,
  });

  const [recentCourses, setRecentCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchTeacherStats();
    }
  }, [user?.id]);

  const fetchTeacherStats = async () => {
    try {
      setIsLoading(true);

      const [allRes, pendingRes, approvedRes] = await Promise.all([
        getTeacherAllCourses(user.id),
        getTeacherPendingCourses(user.id),
        getTeacherApprovedCourses(user.id),
      ]);

      const allCourses = allRes.data.courses || [];

      // Latest 5 courses
      const latestCourses = [...allCourses]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setRecentCourses(latestCourses);

      // Earnings (75%)
      const totalRevenue = allCourses.reduce(
        (sum, course) => sum + (course.totalRevenue || 0),
        0
      );

      const teacherEarning = totalRevenue * 0.75;

      setStats({
        totalCourses: allCourses.length,
        pendingCourses: pendingRes.data.courses?.length || 0,
        approvedCourses: approvedRes.data.courses?.length || 0,
        totalEarnings: teacherEarning,
      });
    } catch (error) {
      console.error("Failed to fetch teacher stats:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ label, value, icon: Icon, color = "blue" }) => {
    const colorClasses = {
      blue: "from-blue-50 to-indigo-50 text-blue-600",
      green: "from-green-50 to-emerald-50 text-green-600",
      yellow: "from-yellow-50 to-amber-50 text-yellow-600",
      purple: "from-purple-50 to-pink-50 text-purple-600",
    };

    return (
      <div className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-slate-200 rounded w-24"></div>
            <div className="h-8 bg-slate-200 rounded w-20"></div>
          </div>
        ) : (
          <>
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
            
            {/* Icon */}
            <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4`}>
              <Icon size={24} className={colorClasses[color].split(' ')[2]} />
            </div>

            {/* Content */}
            <div className="relative">
              <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>

            {/* Decorative corner */}
            <div className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Header Section */}
        <div className="relative mb-10">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={20} className="text-white/90" />
                  <span className="text-sm font-medium text-white/90">Teacher Dashboard</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  Welcome back, {user?.firstName || "Teacher"}! 👋
                </h1>
                <p className="text-blue-50 text-lg">
                  Manage your courses and track approvals in one place
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("/my-courses")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all text-white font-medium"
                >
                  <BookOpen size={18} />
                  My Courses
                </button>
                <button
                  onClick={() => navigate("/add-course")}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <PlusCircle size={18} />
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard
            label="Total Courses"
            value={stats.totalCourses}
            icon={BookOpen}
            color="blue"
          />
          <StatCard
            label="Approved Courses"
            value={stats.approvedCourses}
            icon={CheckCircle}
            color="green"
          />
          <StatCard
            label="Pending Approval"
            value={stats.pendingCourses}
            icon={Clock}
            color="yellow"
          />
          <StatCard
            label="Your Earnings (75%)"
            value={`₹${stats.totalEarnings.toLocaleString("en-IN", {
              maximumFractionDigits: 2,
            })}`}
            icon={DollarSign}
            color="purple"
          />
        </div>

        {/* Recent Courses Section */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-100 rounded-xl">
                  <LayoutDashboard size={20} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Recent Courses
                  </h2>
                  <p className="text-sm text-slate-500">
                    Your latest {recentCourses.length} courses
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/my-courses")}
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium group"
              >
                View All
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-32 bg-slate-200 rounded-t-xl"></div>
                    <div className="p-4 space-y-3 border border-slate-200 rounded-b-xl">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentCourses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No courses created yet
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Start your teaching journey by creating your first course
                </p>
                <button
                  onClick={() => navigate("/add-course")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  <PlusCircle size={18} />
                  Create Your First Course
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {recentCourses.map((course) => (
                  <div
                    key={course._id}
                    onClick={() => navigate(`/teacher/course/${course._id}`)}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Status Badge */}
                      <div className="absolute top-2 right-2">
                        {course.isApproved ? (
                          <span className="flex items-center gap-1 px-2 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            <CheckCircle size={10} />
                            Approved
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                            <Clock size={10} />
                            Pending
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mb-3">
                        {course.category || "Uncategorized"}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Eye size={12} />
                          {course.views || 0}
                        </span>
                        <span className="flex items-center gap-1 text-blue-600 font-medium">
                          ₹{course.price || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/my-courses?filter=approved")}
            className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Approved Courses</h3>
            <p className="text-sm text-slate-500">View your published courses</p>
          </button>

          <button
            onClick={() => navigate("/my-courses?filter=pending")}
            className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-yellow-300 hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Pending Approval</h3>
            <p className="text-sm text-slate-500">Courses under review</p>
          </button>

          <button
            onClick={() => navigate("/earnings")}
            className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">Earnings Report</h3>
            <p className="text-sm text-slate-500">View your revenue analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}