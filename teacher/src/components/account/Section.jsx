import React from "react";

const Section = ({ title, icon: Icon, children }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
        <div className="p-1.5 bg-blue-100 rounded-md">
          <Icon size={14} className="text-blue-600" />
        </div>
        {title}
      </h3>
      {children}
    </div>
  );
};

export default Section;