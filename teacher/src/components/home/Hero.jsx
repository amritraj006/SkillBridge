import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Hero() {
  const { user } = useUser();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalRevenue: 0,
    pendingApprovals: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchTeacherStats();
    }
  }, [user?.id]);

  const fetchTeacherStats = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/teachers/${user.id}/stats`
      );
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      label: "Create New Course",
      icon: "➕",
      onClick: () => navigate("/add-course"),
      primary: true,
      color: "blue"
    },
    {
      label: "View Analytics",
      icon: "📊",
      onClick: () => navigate("/analytics"),
      color: "purple"
    },
    {
      label: "Messages",
      icon: "💬",
      onClick: () => navigate("/messages"),
      badge: 3,
      color: "green"
    },
    {
      label: "Earnings",
      icon: "💰",
      onClick: () => navigate("/earnings"),
      color: "yellow"
    }
  ];

  const StatCard = ({ label, value, icon, trend, loading }) => (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
          <div className="h-8 bg-slate-200 rounded w-16"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">{label}</span>
            <span className="text-xl">{icon}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-slate-900">{value}</span>
            {trend && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                trend > 0 
                  ? "bg-green-100 text-green-700" 
                  : "bg-red-100 text-red-700"
              }`}>
                {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );

  const QuickActionButton = ({ action }) => (
    <button
      onClick={action.onClick}
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-xl 
        transition-all duration-200 font-medium
        ${action.primary 
          ? `bg-${action.color}-600 text-white hover:bg-${action.color}-700 shadow-lg hover:shadow-xl` 
          : `bg-${action.color}-50 text-${action.color}-700 hover:bg-${action.color}-100 border border-${action.color}-200`
        }
      `}
    >
      <span className="text-xl">{action.icon}</span>
      <span className="flex-1 text-left">{action.label}</span>
      {action.badge && (
        <span className={`
          absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs 
          flex items-center justify-center bg-red-500 text-white font-bold
        `}>
          {action.badge}
        </span>
      )}
    </button>
  );

  const WelcomeSection = () => (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        {user?.imageUrl ? (
          <img 
            src={user.imageUrl} 
            alt={user.fullName}
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user?.firstName?.charAt(0) || "T"}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.firstName || "Teacher"}! 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Ready to shape the next generation of learners?
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Teacher's Spotlight ✨</h2>
            <p className="text-blue-100">
              Your courses are making a difference. Keep up the great work!
            </p>
          </div>
          <button
            onClick={() => navigate("/create-quick-course")}
            className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium 
                     hover:bg-blue-50 transition-colors shadow-lg whitespace-nowrap"
          >
            Create Quick Course
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <WelcomeSection />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Courses"
            value={stats.totalCourses}
            icon="📚"
            trend={+12}
            loading={isLoading}
          />
          <StatCard
            label="Enrolled Students"
            value={stats.totalStudents}
            icon="👥"
            trend={+23}
            loading={isLoading}
          />
          <StatCard
            label="Revenue (This Month)"
            value={`₹${stats.totalRevenue.toLocaleString()}`}
            icon="💰"
            trend={+8}
            loading={isLoading}
          />
          <StatCard
            label="Pending Approvals"
            value={stats.pendingApprovals}
            icon="⏳"
            loading={isLoading}
          />
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <QuickActionButton key={index} action={action} />
            ))}
          </div>
        </div>

        {/* Recent Activity & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Recent Courses</h3>
              <button 
                onClick={() => navigate("/my-courses")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All →
              </button>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="animate-pulse flex items-center gap-4 p-3 border border-slate-100 rounded-lg">
                    <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Sample recent courses - replace with actual data */}
                <CourseRow 
                  title="Web Development Bootcamp"
                  students={45}
                  status="published"
                  image="🌐"
                />
                <CourseRow 
                  title="Data Science Fundamentals"
                  students={32}
                  status="pending"
                  image="📊"
                />
                <CourseRow 
                  title="UI/UX Design Masterclass"
                  students={28}
                  status="published"
                  image="🎨"
                />
              </div>
            )}
          </div>

          {/* Teacher Tips */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <span>💡</span> Pro Tips for Teachers
            </h3>
            <div className="space-y-4">
              <Tip 
                tip="Engage with your students in the discussion forums to boost course ratings"
                icon="💬"
              />
              <Tip 
                tip="Update your course content regularly to keep it relevant"
                icon="🔄"
              />
              <Tip 
                tip="Share success stories to attract more students"
                icon="📈"
              />
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-700">
              <button 
                onClick={() => navigate("/resources")}
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2"
              >
                <span>📚</span> Browse Teacher Resources
              </button>
            </div>
          </div>
        </div>

        {/* Achievement Banner */}
        <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🏆</span>
              <div>
                <h4 className="font-bold text-lg">Teacher Achievement Unlocked!</h4>
                <p className="text-yellow-100">
                  You've reached 100+ total students. Claim your badge!
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-white text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors">
              Claim Reward
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function CourseRow({ title, students, status, image }) {
  const statusColors = {
    published: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    draft: "bg-slate-100 text-slate-700"
  };

  return (
    <div className="flex items-center gap-4 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-2xl">
        {image}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-slate-900">{title}</h4>
        <p className="text-sm text-slate-600">{students} students enrolled</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[status]}`}>
        {status}
      </span>
    </div>
  );
}

function Tip({ tip, icon }) {
  return (
    <div className="flex gap-3">
      <span className="text-xl">{icon}</span>
      <p className="text-sm text-slate-300">{tip}</p>
    </div>
  );
}