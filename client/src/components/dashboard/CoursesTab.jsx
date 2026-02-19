import React, { useEffect, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { getPurchasedCourses } from "../../api/userApi";
import { useUser } from "@clerk/clerk-react";
import { useAppContext } from "../../contexts/AppContext";
import PurchasedCourseCard from "./PurchasedCourseCard";

const CoursesTab = ({ onBrowse }) => {
  const { user, isLoaded } = useUser();
  const { courses } = useAppContext();

  const [purchasedIds, setPurchasedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user?.id;

  // ✅ Fetch purchased course IDs
  useEffect(() => {
    const fetchPurchased = async () => {
      if (!isLoaded) return;

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getPurchasedCourses(userId); // array of ids
        const ids = (data || []).map((id) => id.toString());
        setPurchasedIds(ids);
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchased();
  }, [isLoaded, userId]);

  // ✅ Match purchased IDs with actual course objects
  const myCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];
    if (!purchasedIds || purchasedIds.length === 0) return [];

    return courses.filter((c) => purchasedIds.includes(c._id?.toString()));
  }, [courses, purchasedIds]);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <p className="text-slate-500 text-sm">Loading your courses...</p>
      </div>
    );
  }

  // ✅ No purchased courses UI
  if (!myCourses || myCourses.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <BookOpen size={40} className="text-slate-300 mx-auto mb-3" />
        <h3 className="font-medium text-slate-900 mb-1">No courses yet</h3>
        <p className="text-sm text-slate-500 mb-5">
          Start your learning journey today
        </p>
        <button
          onClick={onBrowse}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  // ✅ Display purchased courses
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Purchased Courses
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {myCourses.map((course) => (
          <PurchasedCourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesTab;