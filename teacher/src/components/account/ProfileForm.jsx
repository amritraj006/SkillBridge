import React from "react";
import {
  Phone, MapPin, Globe, Briefcase, Award,
  Building2, Calendar, Code, User, Save, X,
  Loader2
} from "lucide-react";
import Section from "./Section";
import Input from "./Input";

const ProfileForm = ({ form, onChange, onCancel, onSave, saving }) => {
  return (
    <form onSubmit={onSave} className="space-y-6">
      
      {/* Basic Information */}
      <Section title="Basic Information" icon={User}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={onChange}
            icon={Phone}
            placeholder="+91 98765 43210"
          />
          
          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={onChange}
            icon={MapPin}
            placeholder="City, Country"
          />
          
          <Input
            label="Website"
            name="website"
            value={form.website}
            onChange={onChange}
            icon={Globe}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </Section>

      {/* Professional Details */}
      <Section title="Professional Details" icon={Briefcase}>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Specialization"
            name="specialization"
            value={form.specialization}
            onChange={onChange}
            icon={Award}
            placeholder="e.g., Web Development"
          />

          <Input
            label="Working At"
            name="workingAt"
            value={form.workingAt}
            onChange={onChange}
            icon={Building2}
            placeholder="e.g., Google, Microsoft"
          />

          <Input
            label="Years of Experience"
            name="experienceYears"
            type="number"
            value={form.experienceYears}
            onChange={onChange}
            icon={Calendar}
            min="0"
            step="1"
          />

          <div className="sm:col-span-2">
            <Input
              label="Skills (comma separated)"
              name="skills"
              value={form.skills}
              onChange={onChange}
              icon={Code}
              placeholder="React, Node.js, MongoDB, AWS"
            />
          </div>

          <div className="sm:col-span-2">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-700">Bio</label>
              <textarea
                name="bio"
                rows="3"
                value={form.bio}
                onChange={onChange}
                placeholder="Tell students about yourself..."
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm resize-none"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-200 rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 order-2 sm:order-1"
        >
          <X size={16} />
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm disabled:opacity-50 order-1 sm:order-2"
        >
          {saving ? (
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
    </form>
  );
};

export default ProfileForm;