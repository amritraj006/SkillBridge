
import { User, Mail, Phone, MapPin, Home, Calendar, Sparkles, Loader2 } from "lucide-react";

const ProfileTab = ({ loading, userDetails, onEdit, showValue, formatAddress }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Loader2 size={28} className="animate-spin text-blue-600 mx-auto mb-3" />
        <p className="text-slate-600">Loading profile...</p>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <User size={40} className="text-slate-300 mx-auto mb-3" />
        <h3 className="font-medium text-slate-900 mb-1">No profile data</h3>
        <p className="text-sm text-slate-500">Complete your profile in settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-start gap-5">
          <img
            src={userDetails.image}
            alt={userDetails.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {showValue(userDetails.name)}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <Mail size={15} className="text-blue-600" />
              <span className="text-sm text-slate-600">
                {showValue(userDetails.email)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-slate-900">Contact Information</h3>
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Edit →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Phone size={14} className="text-blue-600" />
              <span className="text-xs text-slate-500">Phone</span>
            </div>
            <p className="font-medium text-slate-900">
              {showValue(userDetails.phone)}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-blue-600" />
              <span className="text-xs text-slate-500">Address</span>
            </div>
            <p className="font-medium text-slate-900">
              {formatAddress(userDetails.address)}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Home size={14} className="text-blue-600" />
              <span className="text-xs text-slate-500">City</span>
            </div>
            <p className="font-medium text-slate-900">
              {showValue(userDetails.address?.city)}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={14} className="text-blue-600" />
              <span className="text-xs text-slate-500">Pincode</span>
            </div>
            <p className="font-medium text-slate-900">
              {showValue(userDetails.address?.pincode)}
            </p>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Account Information</h3>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-slate-400" />
            Joined {new Date().toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-blue-600" />
            Member
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;