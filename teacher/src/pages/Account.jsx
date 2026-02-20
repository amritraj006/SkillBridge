import { useUser } from "@clerk/clerk-react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  User, AlertCircle, GraduationCap
} from "lucide-react";
import toast from "react-hot-toast";

// Import components
import AccountHeader from "../components/account/AccountHeader";
import ProfileSummary from "../components/account/ProfileSummary";
import ProfileForm from "../components/account/ProfileForm";
import ProfileView from "../components/account/ProfileView";

export default function Account() {
  const { user } = useUser();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [form, setForm] = useState({
    phone: "",
    specialization: "",
    skills: "",
    workingAt: "",
    experienceYears: 0,
    bio: "",
    location: "",
    website: "",
  });

  // Fetch teacher profile
  useEffect(() => {
    if (!user) return;
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/teachers/${user.id}`);
      setTeacher(res.data);
      
      setForm({
        phone: res.data.phone || "",
        specialization: res.data.specialization || "",
        skills: res.data.skills?.join(", ") || "",
        workingAt: res.data.workingAt || "",
        experienceYears: res.data.experienceYears || 0,
        bio: res.data.bio || "",
        location: res.data.location || "",
        website: res.data.website || "",
      });
    } catch (error) {
      console.log("No teacher profile yet");
      setTeacher({});
    } finally {
      setLoading(false);
    }
  };

  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : Number(value)) : value,
    }));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      
      const payload = {
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        image: user.imageUrl,
        ...form,
        skills: form.skills
          ? form.skills.split(",").map(s => s.trim()).filter(Boolean)
          : [],
      };

      const res = await axios.put(
        `${backendUrl}/api/teachers/${user.id}`,
        payload
      );

      setTeacher(res.data);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = useCallback(() => {
    setEditMode(false);
    if (teacher) {
      setForm({
        phone: teacher.phone || "",
        specialization: teacher.specialization || "",
        skills: teacher.skills?.join(", ") || "",
        workingAt: teacher.workingAt || "",
        experienceYears: teacher.experienceYears || 0,
        bio: teacher.bio || "",
        location: teacher.location || "",
        website: teacher.website || "",
      });
    }
  }, [teacher]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={40} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Authentication Required</h2>
          <p className="text-sm text-slate-500">Please sign in to access your teacher account</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <AccountHeader 
          teacher={teacher} 
          onEdit={() => setEditMode(true)} 
          editMode={editMode}
        />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1">
            <ProfileSummary 
              user={user} 
              teacher={teacher} 
            />
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 sm:p-6">
                {editMode ? (
                  <ProfileForm
                    form={form}
                    onChange={handleChange}
                    onCancel={handleCancel}
                    onSave={handleUpdate}
                    saving={saving}
                  />
                ) : (
                  <ProfileView
                    teacher={teacher}
                    onEdit={() => setEditMode(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}