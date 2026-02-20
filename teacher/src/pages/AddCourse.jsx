import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen, FileText, Tag, Layers, Clock,
  Users, DollarSign, Image, Youtube, 
  Loader2, ArrowLeft, Sparkles, CheckCircle
} from "lucide-react";
import toast from "react-hot-toast";
import { createCourse } from "../api/api";

export default function AddCourse() {
  const navigate = useNavigate();
  const { user } = useUser();
  const teacherId = user?.id;

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

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const handleCreateCourse = async (e) => {
  e.preventDefault();

  if (!teacherId) {
    toast.error("Teacher not logged in");
    return;
  }

  // Validation
  if (!form.title || !form.description || !form.category) {
    toast.error("Please fill in all required fields");
    return;
  }

  try {
    setLoading(true);

    const payload = {
      ...form,
      createdBy: teacherId,
      totalSlots: Number(form.totalSlots) || 0,
      price: Number(form.price) || 0,
    };

    await createCourse(payload);

    toast.success("Course created successfully!");

    setTimeout(() => {
      navigate("/");
    }, 1500);

  } catch (error) {
    console.error("Error creating course:", error);
    toast.error(
      error.response?.data?.message || "Failed to create course"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl sm:px-6 lg:px-8 py-8 mx-auto ">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
        
        </div>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-100 rounded-lg">
            <BookOpen size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Create New Course</h1>
            <p className="text-sm text-slate-500">Share your knowledge with students</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-50 text-yellow-700 text-sm rounded-lg border border-yellow-200">
            <Clock size={16} />
            Pending Approval
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleCreateCourse} className="space-y-6">
          
          {/* Basic Info */}
          <Section title="Basic Information" icon={FileText}>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Course Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                icon={BookOpen}
                required
                placeholder="e.g., React for Beginners"
              />

              <Input
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                icon={Tag}
                required
                placeholder="e.g., Web Development"
              />

              <Select
                label="Level"
                name="level"
                value={form.level}
                onChange={handleChange}
                icon={Layers}
                options={[
                  { value: "Beginner", label: "Beginner" },
                  { value: "Intermediate", label: "Intermediate" },
                  { value: "Advanced", label: "Advanced" },
                ]}
              />

              <Input
                label="Duration"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                icon={Clock}
                required
                placeholder="e.g., 6 weeks"
              />
            </div>
          </Section>

          {/* Description */}
          <Section title="Description" icon={FileText}>
            <TextArea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              placeholder="Describe your course content, objectives, and what students will learn..."
            />
          </Section>

          {/* Pricing & Slots */}
          <Section title="Pricing & Slots" icon={DollarSign}>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Price (₹)"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                icon={DollarSign}
                min="0"
                step="1"
                required
              />

              <Input
                label="Total Slots"
                name="totalSlots"
                type="number"
                value={form.totalSlots}
                onChange={handleChange}
                icon={Users}
                min="1"
                step="1"
                required
              />
            </div>
          </Section>

          {/* Media */}
          <Section title="Media" icon={Image}>
            <div className="space-y-4">
              <Input
                label="Thumbnail URL"
                name="thumbnailUrl"
                value={form.thumbnailUrl}
                onChange={handleChange}
                icon={Image}
                required
                placeholder="https://images.unsplash.com/..."
              />

              <Input
                label="YouTube URL (Optional)"
                name="youtubeUrl"
                value={form.youtubeUrl}
                onChange={handleChange}
                icon={Youtube}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </Section>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex-1 px-6 py-3 border border-slate-200 bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Create Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable Components */

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Icon size={16} className="text-blue-600" />
        {title}
      </h2>
      {children}
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text", icon: Icon, required, placeholder, min, step }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        <input
          type={type}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          required={required}
          min={min}
          step={step}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm`}
        />
      </div>
    </div>
  );
}

function TextArea({ name, value, onChange, required, placeholder }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">
        Description {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        rows="4"
        value={value ?? ''}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, icon: Icon, options }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm appearance-none bg-white"
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}