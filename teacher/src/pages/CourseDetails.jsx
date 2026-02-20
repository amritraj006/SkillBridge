import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getTeacherCourseById } from "../api/api";
import {
  BookOpen, Calendar, DollarSign, Users,
  Tag, Layers, Clock, Edit, ArrowLeft,
  PieChart, TrendingUp, Loader2, AlertCircle,
  CheckCircle
} from "lucide-react";
import toast from "react-hot-toast";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id && id) {
      fetchCourse();
    }
  }, [user?.id, id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await getTeacherCourseById(id, user.id);
      setCourse(res.data.course);
    } catch (error) {
      console.error("Error fetching course:", error);
      toast.error("Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl border border-slate-200 shadow-lg">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Course Not Found</h2>
          <p className="text-sm text-slate-500 mb-6">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/my-courses")}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Go to My Courses
          </button>
        </div>
      </div>
    );
  }

  const totalRevenue = course.totalRevenue || 0;
  const totalEnrolled = course.totalEnrolled || 0;

  const teacherEarning = totalRevenue * 0.75;
  const platformEarning = totalRevenue * 0.2;
  const taxesAndGst = totalRevenue * 0.05;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 group w-fit"
          >
            <div className="p-1.5 rounded-lg bg-white border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Back</span>
          </button>

          <div className="flex gap-2">
    
            <button
              onClick={() => navigate("/my-courses")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              My Courses
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          
          {/* Course Header */}
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Thumbnail */}
              <div className="md:w-72 lg:w-80 rounded-lg overflow-hidden border border-slate-200">
                <img
                  src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"}
                  alt={course.title}
                  className="w-full h-48 md:h-40 lg:h-48 object-cover"
                />
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                    <Tag size={12} />
                    {course.category || "Course"}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                    course.isApproved 
                      ? "bg-green-100 text-green-700" 
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {course.isApproved ? <CheckCircle size={12} /> : <Clock size={12} />}
                    {course.isApproved ? "Approved" : "Pending"}
                  </span>
                </div>

                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  {course.title}
                </h1>

                <p className="text-sm text-slate-600 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Layers size={16} className="text-blue-600" />
                    <span>{course.level || "All levels"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock size={16} className="text-blue-600" />
                    <span>{course.duration || "Self-paced"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <DollarSign size={16} className="text-blue-600" />
                    <span className="font-semibold text-blue-600">₹{course.price || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 border-b border-slate-200 bg-white">
            <StatCard
              icon={Users}
              label="Total Enrolled"
              value={totalEnrolled}
              color="blue"
            />
            <StatCard
              icon={TrendingUp}
              label="Total Revenue"
              value={`₹${totalRevenue.toLocaleString("en-IN")}`}
              color="green"
            />
            <StatCard
              icon={PieChart}
              label="Your Share (75%)"
              value={`₹${teacherEarning.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`}
              color="purple"
            />
            <StatCard
              icon={Calendar}
              label="Created"
              value={new Date(course.createdAt).toLocaleDateString()}
              color="orange"
            />
          </div>

          {/* Earnings Breakdown */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PieChart size={18} className="text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Revenue Breakdown</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <EarningCard
                label="Teacher (75%)"
                value={teacherEarning}
                color="green"
              />
              <EarningCard
                label="Platform (20%)"
                value={platformEarning}
                color="blue"
              />
              <EarningCard
                label="Taxes & GST (5%)"
                value={taxesAndGst}
                color="yellow"
              />
            </div>

            {/* Total Revenue Bar */}
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Total Revenue</span>
                <span className="text-xl font-bold text-slate-900">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={() => navigate(`/teacher/edit/${course._id}`)}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Edit size={16} />
              Edit Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper Components */

function StatCard({ icon: Icon, label, value, color }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="p-4 rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-1.5 rounded-md ${colorClasses[color]}`}>
          <Icon size={14} />
        </div>
        <span className="text-xs text-slate-500">{label}</span>
      </div>
      <p className="text-base font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function EarningCard({ label, value, color }) {
  const colorClasses = {
    green: "bg-green-50 border-green-200 text-green-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <p className="text-xs mb-1">{label}</p>
      <p className={`text-lg font-bold ${colorClasses[color].split(' ')[2]}`}>
        ₹{value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}