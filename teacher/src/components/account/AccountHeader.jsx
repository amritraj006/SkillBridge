import React from "react";
import { User, GraduationCap } from "lucide-react";

const AccountHeader = ({ teacher, onEdit, editMode }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
          <User size={20} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Teacher Account</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your professional profile and settings</p>
        </div>
      </div>
      
      {/* Quick stats */}
      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
        <GraduationCap size={16} className="text-blue-600" />
        <span className="text-sm font-medium text-slate-700">
          {teacher?.experienceYears || 0} years experience
        </span>
      </div>
    </div>
  );
};

export default AccountHeader;