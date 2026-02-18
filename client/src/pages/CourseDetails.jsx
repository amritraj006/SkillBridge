import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../api/courseApi";
import { useAppContext } from "../contexts/AppContext";
import { 
  BookOpen, Clock, Users, Award, 
  ChevronLeft, ShoppingCart, Trash2,
  AlertCircle, Loader2, Calendar,
  Sparkles, GraduationCap, Tag
} from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";

const CourseDetails = () => {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, toggleCart, togglingId } = useAppContext();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getCourseById(id);
        
        if (!response) {
          setError("Course not found.");
          toast.error("Course not found");
        } else {
          setCourse(response);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to fetch course. Please try again.");
        toast.error("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleToggleCart = async () => {
    // Check if user is logged in first
    if (!user) {
      toast.error("Please login to continue", {
        icon: '🔐',
        style: {
          borderRadius: '12px',
          background: '#2563eb',
          color: '#fff',
          fontWeight: '500',
        },
        duration: 3000,
      });
      return;
    }

    try {
      await toggleCart(course._id);
      
      toast.success(
        cart.includes(id) ? "Removed from cart" : "Added to cart successfully!",
        {
          icon: cart.includes(id) ? '🗑️' : '🛒',
          style: {
            borderRadius: '12px',
            background: cart.includes(id) ? '#1e293b' : '#2563eb',
            color: '#fff',
            fontWeight: '500',
          },
          duration: 2000,
        }
      );
    } catch (error) {
      toast.error("Something went wrong", {
        icon: '❌',
        style: {
          borderRadius: '12px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    }
  };

  const formatNumber = (num) => {
    if (!num) return "0";
    return num.toLocaleString();
  };

  const inCart = cart.includes(id);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="mt-4 text-base font-medium text-slate-600">Loading course details</p>
          <p className="text-sm text-slate-400 mt-1">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={48} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Course Not Found</h2>
          <p className="text-slate-500 mb-8">{error || "The course you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate("/courses")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-200"
          >
            <ChevronLeft size={18} />
            Browse All Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/courses")}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 mb-6 group"
        >
          <div className="p-1.5 rounded-lg bg-white border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span>Back to Courses</span>
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200 flex items-center gap-1.5">
                  <Tag size={12} />
                  {course.category || "Course"}
                </span>
                {course.level && (
                  <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-medium rounded-full border border-purple-200 flex items-center gap-1.5">
                    <GraduationCap size={12} />
                    {course.level}
                  </span>
                )}
              </div>
              
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 leading-tight">
                {course.title}
              </h1>
              
              {course.instructor && (
                <p className="mt-3 text-slate-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Created by <span className="font-medium text-slate-700">{course.instructor}</span>
                </p>
              )}
            </div>

            {/* Thumbnail */}
            {course.thumbnailUrl && (
              <div className="relative group rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-[350px] lg:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            {/* Description Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-blue-600" />
                About This Course
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {course.description}
              </p>
            </div>
          </div>

          {/* Right Column - Sticky Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              
              {/* Price Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="text-center pb-6 border-b border-slate-100">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    {course.price === 0 ? "Free" : `₹${course.price}`}
                  </div>
                  {course.price > 0 && (
                    <p className="text-xs text-slate-400 mt-2">One-time payment • Lifetime access</p>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="py-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock size={16} className="text-blue-600" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <span className="font-medium text-slate-900">{course.duration || "Self-paced"}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Users size={16} className="text-blue-600" />
                      <span className="text-sm">Available Slots</span>
                    </div>
                    <span className="font-medium text-slate-900">
                      {course.availableSlots || course.totalSlots || "Unlimited"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Award size={16} className="text-blue-600" />
                      <span className="text-sm">Certificate</span>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Yes
                    </span>
                  </div>

                  {course.enrolledCount > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users size={16} className="text-green-600" />
                        <span className="text-sm">Enrolled</span>
                      </div>
                      <span className="font-medium text-slate-900">
                        {formatNumber(course.enrolledCount)}+ students
                      </span>
                    </div>
                  )}
                </div>

                {/* Cart Button */}
                <button
                  onClick={handleToggleCart}
                  disabled={togglingId === course._id}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-base transition-all shadow-lg ${
                    inCart
                      ? "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-red-200"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-200"
                  } disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]`}
                >
                  {togglingId === course._id ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Updating...
                    </>
                  ) : inCart ? (
                    <>
                      <Trash2 size={18} />
                      Remove from Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add to Cart
                    </>
                  )}
                </button>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 border-2 border-white"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{course.totalEnrolled}+</span> students enrolled
                  </p>
                </div>

                {/* Access Note */}
                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    Full access after purchase
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;