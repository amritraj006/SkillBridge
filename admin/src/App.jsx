import { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle, Users, Settings } from "lucide-react";

export default function Dashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [activeTab, setActiveTab] = useState("approve");

  // 🔹 Pending Courses State
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [approvingId, setApprovingId] = useState(null);

  // ✅ Fetch Pending Courses
  const fetchPendingCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/courses/pending`);
      setPendingCourses(res.data.courses || []);
    } catch (error) {
      setMsg(error.response?.data?.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve Course
  const handleApprove = async (courseId) => {
    try {
      setApprovingId(courseId);
      setMsg("");

      await axios.put(`${backendUrl}/api/courses/approve/${courseId}`);

      setMsg("✅ Course Approved Successfully!");
      fetchPendingCourses();
    } catch (error) {
      setMsg(error.response?.data?.message || "Approval failed");
    } finally {
      setApprovingId(null);
    }
  };

  // Fetch only when Approve tab active
  useEffect(() => {
    if (activeTab === "approve") {
      fetchPendingCourses();
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "approve":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Approve Requests</h2>

            {msg && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                {msg}
              </div>
            )}

            {loading ? (
              <p className="text-gray-600">Loading pending courses...</p>
            ) : pendingCourses.length === 0 ? (
              <p className="text-green-600 font-semibold">
                🎉 No pending courses
              </p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {pendingCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                  >
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-40 object-cover rounded-lg"
                    />

                    <h3 className="mt-4 text-lg font-semibold">
                      {course.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {course.category} • {course.level}
                    </p>

                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p><b>Duration:</b> {course.duration}</p>
                      <p><b>Price:</b> ₹{course.price}</p>
                      <p><b>Teacher ID:</b> {course.createdBy}</p>
                    </div>

                    {/* ✅ Checkbox Approve */}
                    <div className="mt-5 flex items-center gap-3">
                      <input
                        type="checkbox"
                        disabled={approvingId === course._id}
                        onChange={() => handleApprove(course._id)}
                        className="w-5 h-5 accent-black cursor-pointer disabled:opacity-50"
                      />
                      <label className="font-semibold text-gray-700">
                        {approvingId === course._id
                          ? "Approving..."
                          : "Approve Course"}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "users":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Users Details</h2>
            <p className="text-gray-600">
              Here you will see all registered users. (Coming Soon)
            </p>
          </div>
        );

      case "settings":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-gray-600">
              Update admin settings and configurations here. (Coming Soon)
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab("approve")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition 
              ${activeTab === "approve"
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-200"}`}
          >
            <CheckCircle size={18} />
            Approve Requests
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition 
              ${activeTab === "users"
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-200"}`}
          >
            <Users size={18} />
            Users Details
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-3 w-full p-3 rounded-lg transition 
              ${activeTab === "settings"
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-200"}`}
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {renderContent()}
      </div>
    </div>
  );
}