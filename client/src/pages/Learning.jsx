import React, { useEffect, useMemo, useState, useCallback } from "react";
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
  BookOpen,
  CheckCircle,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Lock
} from "lucide-react";
import toast from "react-hot-toast";

// Constants
const WEEK_TITLES = {
  1: "Foundations & Getting Started",
  2: "Core Concepts & Basics",
  3: "Intermediate Topics",
  4: "Advanced Techniques",
  5: "Project Development",
  6: "Real-world Applications",
  7: "Optimization & Best Practices",
  8: "Final Project & Deployment"
};

const WEEK_DESCRIPTIONS = {
  1: "Learn the fundamentals and set up your development environment.",
  2: "Dive deep into core concepts and start building basic applications.",
  3: "Explore intermediate topics and understand complex scenarios.",
  4: "Master advanced techniques used in production environments.",
  5: "Apply your knowledge to build a complete project.",
  6: "Work on real-world applications and industry use cases.",
  7: "Learn optimization techniques and best practices.",
  8: "Complete your final project and prepare for deployment."
};

// Utility functions
const getWeekTitle = (week, courseTitle) => WEEK_TITLES[week] || `Deep Dive into ${courseTitle}`;
const getWeekDescription = (week, course) => WEEK_DESCRIPTIONS[week] || `Continue learning and practicing ${course.title}`;

const getEmbedUrl = (url) => {
  if (!url) return "";
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
  } catch {
    return url;
  }
};

// Custom hook for purchased courses
const usePurchasedCourses = (userId, isLoaded) => {
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchased = async () => {
      if (!isLoaded) return;
      if (!userId) {
        setPurchasedIds([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getPurchasedCourses(userId);
        setPurchasedIds((data || []).map((x) => x.toString()));
      } catch (err) {
        console.error("Error fetching purchased courses:", err);
        toast.error("Failed to load purchased courses");
      } finally {
        setLoading(false);
      }
    };

    fetchPurchased();
  }, [isLoaded, userId]);

  return { purchasedIds, loading };
};

// Generate weekly content
const generateWeeklyContent = (course) => {
  if (!course) return [];
  if (course.weeks?.length > 0) return course.weeks;

  const weeksCount = parseInt(course.duration) || 4;
  const weeks = [];

  for (let i = 1; i <= weeksCount; i++) {
    weeks.push({
      weekNumber: i,
      title: `Week ${i}: ${getWeekTitle(i, course.title)}`,
      description: getWeekDescription(i, course),
      videos: [
        {
          id: `week-${i}-video-1`,
          title: `Introduction to Week ${i}`,
          duration: "15 mins",
          url: i === 1 ? course.youtubeUrl : null,
          isFree: i === 1
        },
        {
          id: `week-${i}-video-2`,
          title: `Core Concepts - Part 1`,
          duration: "25 mins",
          url: null,
          isFree: false
        },
        {
          id: `week-${i}-video-3`,
          title: `Core Concepts - Part 2`,
          duration: "20 mins",
          url: null,
          isFree: false
        },
        {
          id: `week-${i}-video-4`,
          title: `Practical Examples`,
          duration: "30 mins",
          url: null,
          isFree: false
        }
      ],
      notes: course.notes || [
        { title: `Week ${i} - Lecture Notes`, fileUrl: "#" },
        { title: `Week ${i} - Practice Exercises`, fileUrl: "#" }
      ]
    });
  }
  return weeks;
};

// Sub-components
const LoadingState = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="text-center">
      <Loader2 size={34} className="animate-spin text-blue-600 mx-auto" />
      <p className="mt-3 text-slate-500 text-sm">Loading course...</p>
    </div>
  </div>
);

const NotFoundState = ({ navigate }) => (
  <div className="min-h-[70vh] flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 text-center">
      <AlertCircle size={44} className="text-red-500 mx-auto mb-3" />
      <h2 className="text-xl font-bold text-slate-900 mb-2">Course Not Found</h2>
      <p className="text-slate-500 text-sm mb-6">This course does not exist or has been removed.</p>
      <button
        onClick={() => navigate("/courses")}
        className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
      >
        Browse Courses
      </button>
    </div>
  </div>
);

const NoAccessState = ({ userId, course, navigate }) => (
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
        <h2 className="text-2xl font-bold text-slate-900 mb-2">You don't have access</h2>
        <p className="text-slate-500 mb-6">
          {!userId 
            ? "Please login to access this course."
            : "You need to purchase this course before you can start learning."}
        </p>
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

const BackButton = ({ onClick, label = "Back" }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 mb-6 group"
  >
    <div className="p-1.5 rounded-lg bg-white border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
      <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
    </div>
    <span>{label}</span>
  </button>
);

const ProgressCard = ({ progressPercentage, completedCount, totalLessons }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4 min-w-[200px]">
    <div className="flex items-center gap-2 mb-2">
      <BookOpen size={16} className="text-blue-600" />
      <span className="text-sm font-medium text-slate-700">Your Progress</span>
    </div>
    <div className="text-2xl font-bold text-blue-600 mb-2">{progressPercentage}%</div>
    <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
    <p className="text-xs text-slate-500 mt-2">
      {completedCount} of {totalLessons} lessons completed
    </p>
  </div>
);

const VideoPlayer = ({ currentVideo, course, weeklyContent, getEmbedUrl }) => (
  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm sticky top-6">
    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <PlayCircle size={18} className="text-blue-600" />
        <h2 className="font-semibold text-slate-900">
          {currentVideo?.title || "Course Content"}
        </h2>
      </div>
      {currentVideo?.duration && (
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Clock size={12} />
          {currentVideo.duration}
        </span>
      )}
    </div>

    <div className="w-full aspect-video bg-black">
      {currentVideo?.url ? (
        <iframe
          src={getEmbedUrl(currentVideo.url)}
          title={currentVideo.title}
          className="w-full h-full"
          allowFullScreen
        />
      ) : course.youtubeUrl && weeklyContent[0]?.videos[0]?.isFree ? (
        <iframe
          src={getEmbedUrl(course.youtubeUrl)}
          title="Course Preview"
          className="w-full h-full"
          allowFullScreen
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-900">
          <div className="text-center">
            <PlayCircle size={48} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">Select a video to start learning</p>
          </div>
        </div>
      )}
    </div>
  </div>
);

const WeekItem = ({ week, expanded, onToggle, onVideoSelect, onLessonComplete, completedLessons }) => (
  <div className="p-4">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left mb-2 group"
    >
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          {week.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1">{week.videos?.length || 0} lessons</p>
      </div>
      {expanded ? (
        <ChevronUp size={18} className="text-slate-400 group-hover:text-blue-600" />
      ) : (
        <ChevronDown size={18} className="text-slate-400 group-hover:text-blue-600" />
      )}
    </button>

    {expanded && (
      <div className="mt-3 space-y-3">
        {week.videos?.map((video) => (
          <div key={video.id} className="space-y-2">
            <div className="flex items-start gap-3">
              <button
                onClick={() => onLessonComplete(video.id)}
                className={`mt-0.5 transition-colors ${
                  completedLessons[video.id] ? 'text-green-600' : 'text-slate-300 hover:text-blue-600'
                }`}
              >
                <CheckCircle size={16} />
              </button>
              <button
                onClick={() => onVideoSelect(video)}
                className="flex-1 text-left group"
              >
                <div className="flex items-center gap-2">
                  <PlayCircle 
                    size={14} 
                    className={video.url || video.isFree ? 'text-blue-600' : 'text-slate-300'} 
                  />
                  <span className={`text-sm flex-1 ${
                    completedLessons[video.id] ? 'text-slate-400 line-through' : 'text-slate-700 group-hover:text-blue-600'
                  }`}>
                    {video.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 ml-6">
                  <span className="text-xs text-slate-400">{video.duration}</span>
                  {video.isFree && (
                    <span className="px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-medium rounded">
                      Free Preview
                    </span>
                  )}
                  {!video.url && !video.isFree && (
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-medium rounded flex items-center gap-0.5">
                      <Lock size={8} /> Coming Soon
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        ))}

        {week.notes?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
              <FileText size={12} /> Week {week.weekNumber} Resources
            </p>
            <div className="space-y-2">
              {week.notes.map((note, idx) => (
                <a
                  key={idx}
                  href={note.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <FileText size={12} className="text-slate-400 group-hover:text-blue-600" />
                  <span className="text-xs text-slate-600 group-hover:text-blue-600">{note.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);

// Main Component
const Learning = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { courses } = useAppContext();
  const userId = user?.id;

  const { purchasedIds, loading: purchasedLoading } = usePurchasedCourses(userId, isLoaded);
  
  const [expandedWeeks, setExpandedWeeks] = useState({});
  const [currentVideo, setCurrentVideo] = useState(null);
  const [completedLessons, setCompletedLessons] = useState({});

  // Memoized values
  const course = useMemo(() => 
    courses?.find((c) => c._id?.toString() === id?.toString()), 
    [courses, id]
  );

  const weeklyContent = useMemo(() => generateWeeklyContent(course), [course]);

  const hasAccess = useMemo(() => 
    userId ? purchasedIds.includes(id?.toString()) : false, 
    [userId, purchasedIds, id]
  );

  const totalLessons = useMemo(() => 
    weeklyContent.reduce((acc, week) => acc + (week.videos?.length || 0), 0),
    [weeklyContent]
  );

  const completedCount = useMemo(() => 
    Object.values(completedLessons).filter(Boolean).length,
    [completedLessons]
  );

  const progressPercentage = useMemo(() => 
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0,
    [totalLessons, completedCount]
  );

  // Callbacks
  const toggleWeek = useCallback((weekNumber) => {
    setExpandedWeeks(prev => ({ ...prev, [weekNumber]: !prev[weekNumber] }));
  }, []);

  const handleVideoSelect = useCallback((video) => {
    if (video.url || video.isFree) {
      setCurrentVideo(video);
    } else {
      toast.error("Video content is being prepared", {
        icon: '🎥',
        style: { borderRadius: '12px', background: '#2563eb', color: '#fff' },
      });
    }
  }, []);

  const toggleLessonComplete = useCallback((lessonId) => {
    setCompletedLessons(prev => ({ ...prev, [lessonId]: !prev[lessonId] }));
    toast.success("Progress saved!", { icon: '✅', duration: 2000 });
  }, []);

  const handleBack = useCallback(() => navigate("/dashboard"), [navigate]);

  if (purchasedLoading) return <LoadingState />;
  if (!course) return <NotFoundState navigate={navigate} />;
  if (!userId || !hasAccess) return <NoAccessState userId={userId} course={course} navigate={navigate} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BackButton onClick={handleBack} label="Back to Dashboard" />

        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  {course.category || "General"}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {course.level || "All Levels"}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{course.title}</h1>
              <p className="text-slate-500 mt-2 max-w-2xl">{course.description}</p>
            </div>
            <ProgressCard 
              progressPercentage={progressPercentage}
              completedCount={completedCount}
              totalLessons={totalLessons}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer 
              currentVideo={currentVideo}
              course={course}
              weeklyContent={weeklyContent}
              getEmbedUrl={getEmbedUrl}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar size={16} className="text-blue-600" />
                  Course Curriculum
                </h2>
              </div>

              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {weeklyContent.map((week) => (
                  <WeekItem
                    key={week.weekNumber}
                    week={week}
                    expanded={expandedWeeks[week.weekNumber]}
                    onToggle={() => toggleWeek(week.weekNumber)}
                    onVideoSelect={handleVideoSelect}
                    onLessonComplete={toggleLessonComplete}
                    completedLessons={completedLessons}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;