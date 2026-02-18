import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // ✅ Clerk teacher
  const { user } = useUser();
  const teacherId = user?.id; // clerk id

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    duration: "",
    totalSlots: 50,
    price: 0,
    thumbnailUrl: "",
    youtubeUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!teacherId) {
      setMsg("Teacher not logged in.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        createdBy: teacherId,
        totalSlots: Number(form.totalSlots),
        price: Number(form.price),
      };

      const res = await axios.post(`${backendUrl}/api/courses/create`, payload);

      setMsg(res.data.message || "Course created successfully!");

      // Show success message briefly then redirect
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      
    } catch (error) {
      console.log(error);
      setMsg(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl border border-slate-200 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Create New Course
      </h1>

      <p className="text-sm text-slate-500 mb-6">
        Your course will be <span className="font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">pending</span> until admin approves it.
      </p>

      {msg && (
        <div className={`p-4 rounded-xl mb-6 ${
          msg.includes("success") 
            ? "bg-green-50 text-green-700 border border-green-200" 
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          <p className="font-medium">{msg}</p>
          {msg.includes("success") && (
            <p className="text-sm mt-1">Redirecting to dashboard...</p>
          )}
        </div>
      )}

      <form onSubmit={handleCreateCourse} className="space-y-4">
        <Input
          label="Course Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <TextArea
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="e.g., Web Development, Data Science, Cloud Computing"
          required
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Level
          </label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <Input
          label="Duration"
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="e.g., 6 weeks, 2 months"
          required
        />

        <Input
          label="Total Slots"
          name="totalSlots"
          type="number"
          value={form.totalSlots}
          onChange={handleChange}
          min="1"
          required
        />

        <Input
          label="Price (₹)"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          min="0"
          required
        />

        <Input
          label="Thumbnail URL"
          name="thumbnailUrl"
          value={form.thumbnailUrl}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/..."
          required
        />

        <Input
          label="YouTube URL"
          name="youtubeUrl"
          value={form.youtubeUrl}
          onChange={handleChange}
          placeholder="https://youtube.com/watch?v=..."
        />

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ----------------- Components ----------------- */

function Input({ label, name, value, onChange, type = "text", placeholder, required, min }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        required={required}
        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
      />
    </div>
  );
}

function TextArea({ label, name, value, onChange, required }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="4"
        required={required}
        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
      />
    </div>
  );
}