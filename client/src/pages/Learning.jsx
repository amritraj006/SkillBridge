import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useAppContext } from "../contexts/AppContext";
import { getPurchasedCourses } from "../api/userApi";
import {
  AlertCircle,
  ChevronLeft,
  FileText,
  Loader2,
  PlayCircle,
} from "lucide-react";

const Learning = () => {
  const { id } = useParams(); // courseId
  const navigate = useNavigate();

  const { user, isLoaded } = useUser();
  const { courses } = useAppContext();

  const [purchasedIds, setPurchasedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;

  // ✅ Find course from AppContext
  const course = useMemo(() => {
    if (!courses || courses.length === 0) return null;
    return courses.find((c) => c._id?.toString() === id?.toString());
  }, [courses, id]);

  // ✅ Fetch purchased IDs
  useEffect(() => {
    const fetchPurchased = async () => {
      if (!isLoaded) return;

      // if user not logged in, no need to call api
      if (!userId) {
        setPurchasedIds([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getPurchasedCourses(userId); // array of ids
        const ids = (data || []).map((x) => x.toString());
        setPurchasedIds(ids);
      } catch (err) {
        console.error("Error fetching purchased courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchased();
  }, [isLoaded, userId]);

  // ✅ Access check
  const hasAccess = useMemo(() => {
    if (!userId) return false;
    return purchasedIds.includes(id?.toString());
  }, [userId, purchasedIds, id]);

  // ✅ Convert YouTube URL → Embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";

    // supports:
    // https://www.youtube.com/watch?v=VIDEOID
    // https://youtu.be/VIDEOID
    // https://www.youtube.com/embed/VIDEOID

    try {
      if (url.includes("embed")) return url;

      if (url.includes("watch?v=")) {
        const videoId = url.split("watch?v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return url;
    } catch (err) {
      return url;
    }
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={34} className="animate-spin text-blue-600 mx-auto" />
          <p className="mt-3 text-slate-500 text-sm">Loading course...</p>
        </div>
      </div>
    );
  }

  // ✅ Course not found
  if (!course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <AlertCircle size={44} className="text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Course Not Found
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            This course does not exist or has been removed.
          </p>

          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  // ✅ If user not logged in OR not purchased → no access
  if (!userId || !hasAccess) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <button
            onClick={() => navigate("/courses")}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 mb-6"
          >
            <ChevronLeft size={16} />
            Back to Courses
          </button>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <AlertCircle size={50} className="text-red-500 mx-auto mb-4" />

            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              You don’t have access
            </h2>

            {!userId ? (
              <p className="text-slate-500 mb-6">
                Please login to access this course.
              </p>
            ) : (
              <p className="text-slate-500 mb-6">
                You need to purchase this course before you can start learning.
              </p>
            )}

            <button
              onClick={() => navigate(`/course/${course._id}`)}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
            >
              Go to Course Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Access granted
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 mb-6"
        >
          <ChevronLeft size={16} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <p className="text-sm text-blue-600 font-medium mb-2">
            {course.category || "General"}
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            {course.title}
          </h1>

          <p className="text-slate-500 mt-2">{course.description}</p>
        </div>

        {/* Video + Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center gap-2">
              <PlayCircle size={18} className="text-blue-600" />
              <h2 className="font-semibold text-slate-900">Course Video</h2>
            </div>

            <div className="w-full aspect-video bg-black">
              <iframe
                src={getEmbedUrl(course.youtubeUrl)}
                title="Course Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={18} className="text-blue-600" />
              <h2 className="font-semibold text-slate-900">Lecture Notes</h2>
            </div>

            {!course.notes || course.notes.length === 0 ? (
              <p className="text-sm text-slate-500">
                No notes uploaded for this course yet.
              </p>
            ) : (
              <div className="space-y-3">
                {course.notes.map((note, index) => (
                  <a
                    key={note._id || index}
                    href={note.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition"
                  >
                    <p className="font-medium text-slate-900 text-sm">
                      {note.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Download / View PDF
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;