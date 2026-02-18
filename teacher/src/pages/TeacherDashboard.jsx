import React, { useEffect, useMemo, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Clock,
  CheckCircle2,
  Menu,
  X,
  RefreshCcw,
} from "lucide-react";
import axios from "axios";

const TeacherDashboard = () => {
  const { user, isSignedIn } = useUser();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Create Course Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    level: "Beginner",
    duration: "",
    totalSlots: 50,
    price: 0,
    thumbnailUrl: "",
    youtubeUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Courses State
  const [allCourses, setAllCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [approvedCourses, setApprovedCourses] = useState([]);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const teacherId = user?.id; // Clerk userId

  // 🔥 Change if deployed
  const BASE_URL = "http://localhost:5003";

  const links = useMemo(
    () => [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: <LayoutDashboard className="w-5 h-5" />,
      },
      {
        key: "create",
        label: "Create Course",
        icon: <PlusCircle className="w-5 h-5" />,
      },
      {
        key: "mycourses",
        label: "My Courses",
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        key: "pending",
        label: "Pending",
        icon: <Clock className="w-5 h-5" />,
      },
      {
        key: "approved",
        label: "Approved",
        icon: <CheckCircle2 className="w-5 h-5" />,
      },
    ],
    []
  );

  // =========================================================
  // ✅ Fetch teacher courses
  // =========================================================
  const fetchTeacherCourses = async () => {
    if (!teacherId) return;

    try {
      setFetchLoading(true);
      setFetchError("");

      const [allRes, pendingRes, approvedRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/courses/teacher/${teacherId}/all`),
        axios.get(`${BASE_URL}/api/courses/teacher/${teacherId}/pending`),
        axios.get(`${BASE_URL}/api/courses/teacher/${teacherId}/approved`),
      ]);

      setAllCourses(allRes.data || []);
      setPendingCourses(pendingRes.data || []);
      setApprovedCourses(approvedRes.data || []);
    } catch (error) {
      console.log(error);
      setFetchError(
        error?.response?.data?.message ||
          "Failed to fetch courses. Check backend routes."
      );
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn && teacherId) {
      fetchTeacherCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, teacherId]);

  // =========================================================
  // ✅ Handle Create Course
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const payload = {
        ...formData,
        createdBy: teacherId,
      };

      const res = await axios.post(`${BASE_URL}/api/courses/create`, payload);

      setMessage(res.data.message || "Course created successfully!");

      setFormData({
        title: "",
        description: "",
        category: "General",
        level: "Beginner",
        duration: "",
        totalSlots: 50,
        price: 0,
        thumbnailUrl: "",
        youtubeUrl: "",
      });

      // ✅ Refresh courses immediately
      fetchTeacherCourses();
      setActiveTab("pending");
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // ✅ UI Helper Component
  // =========================================================
  const CourseCard = ({ course }) => {
    return (
      <div className="p-5 rounded-2xl border bg-white shadow-sm hover:shadow transition">
        <div className="flex gap-4">
          <img
            src={course?.thumbnailUrl}
            alt={course?.title}
            className="w-24 h-20 rounded-xl object-cover border"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/300x200?text=Course";
            }}
          />

          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 line-clamp-1">
              {course?.title}
            </h3>

            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              {course?.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border">
                {course?.category || "General"}
              </span>

              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border">
                {course?.level || "Beginner"}
              </span>

              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border">
                ⏱ {course?.duration || "N/A"}
              </span>

              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border">
                ₹{course?.price || 0}
              </span>

              <span
                className={`text-xs px-2.5 py-1 rounded-full border ${
                  course?.isApproved
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-orange-50 text-orange-700 border-orange-200"
                }`}
              >
                {course?.isApproved ? "Approved" : "Pending"}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // =========================================================
  // ✅ If not logged in
  // =========================================================
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-6 rounded-2xl shadow border border-slate-200 text-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Teacher Dashboard
          </h2>
          <p className="text-slate-500 mt-2">
            Please login to access your dashboard.
          </p>

          <button
            onClick={() => window.Clerk?.openSignIn()}
            className="mt-5 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // ✅ CONTENT AREA BASED ON TAB
  // =========================================================
  const renderContent = () => {
    // 1️⃣ Dashboard Tab
    if (activeTab === "dashboard") {
      return (
        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Welcome, {user?.firstName} 👋
              </h2>
              <p className="text-slate-500 mt-2">
                Manage your courses, create new ones, and check approval status.
              </p>
            </div>

            <button
              onClick={fetchTeacherCourses}
              disabled={fetchLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium disabled:opacity-60"
            >
              <RefreshCcw className="w-4 h-4" />
              {fetchLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {fetchError && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {fetchError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="p-5 rounded-2xl border bg-slate-50">
              <p className="text-sm text-slate-500">Total Courses</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">
                {allCourses.length}
              </p>
            </div>

            <div className="p-5 rounded-2xl border bg-slate-50">
              <p className="text-sm text-slate-500">Approved</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {approvedCourses.length}
              </p>
            </div>

            <div className="p-5 rounded-2xl border bg-slate-50">
              <p className="text-sm text-slate-500">Pending</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">
                {pendingCourses.length}
              </p>
            </div>

            <div className="p-5 rounded-2xl border bg-slate-50">
              <p className="text-sm text-slate-500">Revenue</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">₹0</p>
              <p className="text-xs text-slate-400 mt-1">
                (Add payments later)
              </p>
            </div>
          </div>
        </div>
      );
    }

    // 2️⃣ Create Course Tab
    if (activeTab === "create") {
      return (
        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-800">
            Create a New Course
          </h2>
          <p className="text-slate-500 mt-2">
            Fill the form below. Course will be pending until approved.
          </p>

          {message && (
            <div className="mt-4 p-3 rounded-xl bg-slate-100 text-slate-700 text-sm">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="React Full Course"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="Web Development"
              />
            </div>

            {/* Level */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Level
              </label>
              <select
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Duration *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="10 hours"
                required
              />
            </div>

            {/* Slots */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Total Slots
              </label>
              <input
                type="number"
                value={formData.totalSlots}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalSlots: Number(e.target.value),
                  })
                }
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Price (₹)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Thumbnail URL *
              </label>
              <input
                type="text"
                value={formData.thumbnailUrl}
                onChange={(e) =>
                  setFormData({ ...formData, thumbnailUrl: e.target.value })
                }
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="https://image.com/thumb.png"
                required
              />
            </div>

            {/* Youtube */}
            <div>
              <label className="text-sm font-medium text-slate-700">
                Youtube URL *
              </label>
              <input
                type="text"
                value={formData.youtubeUrl}
                onChange={(e) =>
                  setFormData({ ...formData, youtubeUrl: e.target.value })
                }
                className="mt-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="https://youtube.com/..."
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-2 w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/30 min-h-[120px]"
                placeholder="Write course details..."
                required
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Course"}
              </button>
            </div>
          </form>
        </div>
      );
    }

    // 3️⃣ My Courses Tab
    if (activeTab === "mycourses") {
      return (
        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                My Courses
              </h2>
              <p className="text-slate-500 mt-2">
                All courses created by you (Approved + Pending).
              </p>
            </div>

            <button
              onClick={fetchTeacherCourses}
              disabled={fetchLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium disabled:opacity-60"
            >
              <RefreshCcw className="w-4 h-4" />
              {fetchLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {fetchLoading ? (
            <p className="mt-6 text-slate-500">Loading...</p>
          ) : allCourses.length === 0 ? (
            <div className="mt-6 p-5 rounded-2xl border bg-slate-50">
              <p className="text-slate-700 font-medium">
                You haven’t created any courses yet.
              </p>
              <p className="text-slate-500 text-sm mt-1">
                Go to “Create Course” and publish your first course.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {allCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      );
    }

    // 4️⃣ Pending Tab
    if (activeTab === "pending") {
      return (
        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Pending Courses
              </h2>
              <p className="text-slate-500 mt-2">
                These courses are waiting for admin approval.
              </p>
            </div>

            <button
              onClick={fetchTeacherCourses}
              disabled={fetchLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium disabled:opacity-60"
            >
              <RefreshCcw className="w-4 h-4" />
              {fetchLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {fetchLoading ? (
            <p className="mt-6 text-slate-500">Loading...</p>
          ) : pendingCourses.length === 0 ? (
            <div className="mt-6 p-5 rounded-2xl border bg-green-50 border-green-200">
              <p className="text-green-800 font-semibold">
                No pending courses 🎉
              </p>
              <p className="text-green-700 text-sm mt-1">
                All your courses are approved.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pendingCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      );
    }

    // 5️⃣ Approved Tab
    if (activeTab === "approved") {
      return (
        <div className="bg-white rounded-2xl shadow border border-slate-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">
                Approved Courses
              </h2>
              <p className="text-slate-500 mt-2">
                These courses are live and visible to students.
              </p>
            </div>

            <button
              onClick={fetchTeacherCourses}
              disabled={fetchLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium disabled:opacity-60"
            >
              <RefreshCcw className="w-4 h-4" />
              {fetchLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {fetchLoading ? (
            <p className="mt-6 text-slate-500">Loading...</p>
          ) : approvedCourses.length === 0 ? (
            <div className="mt-6 p-5 rounded-2xl border bg-orange-50 border-orange-200">
              <p className="text-orange-800 font-semibold">
                No approved courses yet.
              </p>
              <p className="text-orange-700 text-sm mt-1">
                Your courses will appear here after admin approval.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {approvedCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ✅ Sidebar Desktop */}
      <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <img src="/logo2.svg" alt="SkillBridge" className="h-9 w-9" />
          <span className="ml-2 text-xl font-bold">
            <span className="text-slate-900">Skill</span>
            <span className="text-blue-600">Bridge</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => (
            <button
              key={link.key}
              onClick={() => setActiveTab(link.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === link.key
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-5 border-t border-slate-200">
          <p className="text-xs text-slate-500">Logged in as</p>
          <p className="text-sm font-semibold text-slate-800 truncate">
            {user?.fullName || user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </aside>

      {/* ✅ Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="w-72 bg-white h-full shadow-lg flex flex-col">
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <img src="/logo2.svg" alt="SkillBridge" className="h-9 w-9" />
                <span className="text-lg font-bold">
                  <span className="text-slate-900">Skill</span>
                  <span className="text-blue-600">Bridge</span>
                </span>
              </div>

              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
              {links.map((link) => (
                <button
                  key={link.key}
                  onClick={() => {
                    setActiveTab(link.key);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    activeTab === link.key
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="px-6 py-5 border-t border-slate-200">
              <p className="text-xs text-slate-500">Logged in as</p>
              <p className="text-sm font-semibold text-slate-800 truncate">
                {user?.fullName || user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5 text-slate-700" />
            </button>

            <h1 className="text-lg font-semibold text-slate-800">
              Teacher Panel
            </h1>
          </div>

          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "w-9 h-9 ring-2 ring-slate-200 hover:ring-blue-500 transition-all",
              },
            }}
          />
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8">{renderContent()}</main>
      </div>
    </div>
  );
};

export default TeacherDashboard;