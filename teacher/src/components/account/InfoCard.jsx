import React from "react";

const InfoCard = ({ icon: Icon, label, value }) => {
  if (!value) return null;
  
  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-200 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-blue-100 rounded-md">
          <Icon size={14} className="text-blue-600" />
        </div>
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <p className="text-sm font-medium text-slate-900 break-words">{value}</p>
    </div>
  );
};

export default InfoCard;