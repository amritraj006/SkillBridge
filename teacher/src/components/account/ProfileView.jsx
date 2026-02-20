import React from "react";
import {
  Briefcase, Award, Building2, Calendar,
  MapPin, Globe, Phone, Code, CheckCircle,
  Edit2
} from "lucide-react";
import Section from "./Section";
import InfoCard from "./InfoCard";

const ProfileView = ({ teacher, onEdit }) => {
  return (
    <div className="space-y-6">
      
      {/* Bio Section */}
      {teacher?.bio && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <p className="text-sm text-slate-700 italic">"{teacher.bio}"</p>
        </div>
      )}

      {/* Professional Details Grid */}
      <Section title="Professional Information" icon={Briefcase}>
        <div className="grid sm:grid-cols-2 gap-4">
          <InfoCard
            icon={Award}
            label="Specialization"
            value={teacher?.specialization}
          />
          <InfoCard
            icon={Building2}
            label="Working At"
            value={teacher?.workingAt}
          />
          <InfoCard
            icon={Calendar}
            label="Experience"
            value={teacher?.experienceYears ? `${teacher.experienceYears} years` : null}
          />
          <InfoCard
            icon={MapPin}
            label="Location"
            value={teacher?.location}
          />
          <InfoCard
            icon={Globe}
            label="Website"
            value={teacher?.website}
          />
          <InfoCard
            icon={Phone}
            label="Phone"
            value={teacher?.phone}
          />
        </div>
      </Section>

      {/* Skills Section */}
      {teacher?.skills?.length > 0 && (
        <Section title="Skills & Expertise" icon={Code}>
          <div className="flex flex-wrap gap-2">
            {teacher.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Account Status */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start sm:items-center gap-3">
        <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-green-700">Account Active</p>
          <p className="text-xs text-green-600">Your teacher profile is complete and visible to students</p>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 px-3 py-1.5 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm border border-green-200"
        >
          <Edit2 size={14} />
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProfileView;