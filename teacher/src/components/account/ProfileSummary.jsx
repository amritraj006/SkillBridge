import React from "react";
import { Mail, Award, Building2, MapPin, Phone } from "lucide-react";

const ProfileSummary = ({ user, teacher }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm sticky top-6">
      {/* Profile Card */}
      <div className="p-6 text-center border-b border-slate-200">
        <div className="relative inline-block">
          <img
            src={user.imageUrl}
            alt={user.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
          />
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mt-4">{user.fullName}</h2>
        <p className="text-sm text-slate-500 flex items-center justify-center gap-1 mt-1">
          <Mail size={14} />
          {user.primaryEmailAddress.emailAddress}
        </p>
        
        {teacher?.specialization && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
            <Award size={12} />
            {teacher.specialization}
          </div>
        )}
      </div>

      {/* Quick Info */}
      <div className="p-4 space-y-3">
        {teacher?.workingAt && (
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Building2 size={16} className="text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Works at</p>
              <p className="font-medium text-slate-900">{teacher.workingAt}</p>
            </div>
          </div>
        )}
        
        {teacher?.location && (
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-slate-100 rounded-lg">
              <MapPin size={16} className="text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Location</p>
              <p className="font-medium text-slate-900">{teacher.location}</p>
            </div>
          </div>
        )}
        
        {teacher?.phone && (
          <div className="flex items-center gap-3 text-sm">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Phone size={16} className="text-slate-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Contact</p>
              <p className="font-medium text-slate-900">{teacher.phone}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSummary;