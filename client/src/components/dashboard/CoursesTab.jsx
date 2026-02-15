import React from "react";
import { BookOpen } from "lucide-react";

const CoursesTab = ({ onBrowse }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
      <BookOpen size={40} className="text-slate-300 mx-auto mb-3" />
      <h3 className="font-medium text-slate-900 mb-1">No courses yet</h3>
      <p className="text-sm text-slate-500 mb-5">Start your learning journey today</p>
      <button
        onClick={onBrowse}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
      >
        Browse Courses
      </button>
    </div>
  );
};

export default CoursesTab;