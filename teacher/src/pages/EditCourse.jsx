import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getTeacherCourseById, updateTeacherCourse } from "../api/api";
import {
  BookOpen, Save, ArrowLeft, Loader2,
  Tag, DollarSign, Users, Clock, 
  Image, FileText, Layers, Sparkles,
  Lock
} from "lucide-react";
import toast from "react-hot-toast";

export default function EditCourse() {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    duration: "",
    price: 0,
    totalSlots: 0,
    thumbnailUrl: "",
    youtubeUrl: "",
  });

  useEffect(() => {
    if (user?.id && id) fetchCourse();
  }, [user?.id, id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await getTeacherCourseById(id, user.id);
      const courseData = res.data.course;
      
      setFormData({
        ...courseData,
        price: courseData.price || 0,
        totalSlots: courseData.totalSlots || 0,
      });
    } catch (error) {
      console.error("Error fetching course", error);
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Prevent changes to price field
    if (name === 'price') return;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setUpdating(true);
      await updateTeacherCourse(id, user.id, {
        ...formData,
        price: Number(formData.price) || 0, // Keep original price
        totalSlots: Number(formData.totalSlots) || 0,
      });
      
      toast.success("Course updated successfully!");
      navigate(`/teacher/course/${id}`);
    } catch (error) {
      console.error("Update failed", error);
      toast.error(error.response?.data?.message || "Failed to update course");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <Sparkles size={16} className="text-blue-600" />
              {previewMode ? "Edit" : "Preview"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors"
            >
              Home
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-100 rounded-lg">
            <BookOpen size={20} className="text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Course</h1>
            <p className="text-sm text-slate-500">Update your course information (price cannot be changed)</p>
          </div>
        </div>

        {previewMode ? (
          // Preview Mode
          <PreviewCard formData={formData} />
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit}>
            <EditForm 
              formData={formData}
              onChange={handleChange}
              onCancel={() => navigate(`/teacher/course/${id}`)}
              isUpdating={updating}
            />
          </form>
        )}
      </div>
    </div>
  );
}

// Preview Component
function PreviewCard({ formData }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Course Preview</h2>
      
      {formData.thumbnailUrl && (
        <div className="mb-6 rounded-lg overflow-hidden border border-slate-200">
          <img
            src={formData.thumbnailUrl}
            alt={formData.title}
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      <div className="space-y-4">
        <PreviewItem label="Title" value={formData.title} />
        <PreviewItem label="Description" value={formData.description} multiline />
        
        <div className="grid grid-cols-2 gap-4">
          <PreviewItem label="Category" value={formData.category} />
          <PreviewItem label="Level" value={formData.level} />
          <PreviewItem label="Duration" value={formData.duration} />
          <PreviewItem label="Price" value={`₹${formData.price}`} highlight />
          <PreviewItem label="Total Slots" value={formData.totalSlots} />
        </div>
      </div>
    </div>
  );
}

function PreviewItem({ label, value, multiline, highlight }) {
  if (!value && value !== 0) return null;
  
  return (
    <div>
      <span className="text-xs text-slate-500">{label}</span>
      <p className={`${multiline ? 'text-sm' : 'font-medium'} ${highlight ? 'text-blue-600' : 'text-slate-900'}`}>
        {value || "Not set"}
      </p>
    </div>
  );
}

// Edit Form Component
function EditForm({ formData, onChange, onCancel, isUpdating }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
      
      {/* Basic Info */}
      <Section title="Basic Information" icon={FileText}>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={onChange}
            icon={BookOpen}
            required
            placeholder="e.g., React for Beginners"
          />

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={onChange}
            icon={Tag}
            required
            placeholder="e.g., Web Development"
          />

          <Select
            label="Level"
            name="level"
            value={formData.level}
            onChange={onChange}
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
            value={formData.duration}
            onChange={onChange}
            icon={Clock}
            placeholder="e.g., 6 weeks"
          />
        </div>
      </Section>

      {/* Description */}
      <Section title="Description" icon={FileText}>
        <TextArea
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          placeholder="Describe your course content, objectives, and target audience..."
        />
      </Section>

      {/* Pricing */}
      <Section title="Pricing & Slots" icon={DollarSign}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Price (₹) <span className="text-xs text-slate-400 ml-2">(Cannot be changed)</span>
            </label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                name="price"
                value={formData.price}
                disabled
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed text-sm"
              />
              <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">Price is locked after creation</p>
          </div>

          <Input
            label="Total Slots"
            name="totalSlots"
            type="number"
            value={formData.totalSlots}
            onChange={onChange}
            icon={Users}
            min="1"
            step="1"
          />
        </div>
      </Section>

      {/* Media */}
      <Section title="Media" icon={Image}>
        <div className="space-y-4">
          <Input
            label="Thumbnail URL"
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={onChange}
            icon={Image}
            placeholder="https://images.unsplash.com/..."
          />

          <Input
            label="YouTube URL"
            name="youtubeUrl"
            value={formData.youtubeUrl}
            onChange={onChange}
            icon={Image}
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>
      </Section>

      {/* Actions */}
      <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Section Component
function Section({ title, icon: Icon, children }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <Icon size={16} className="text-blue-600" />
        {title}
      </h2>
      {children}
    </div>
  );
}

// Input Component
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

// Select Component
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

// TextArea Component
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