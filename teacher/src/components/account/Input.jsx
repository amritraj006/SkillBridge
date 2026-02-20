import React from "react";

const Input = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  icon: Icon, 
  placeholder, 
  min, 
  step 
}) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        )}
        <input
          type={type}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          min={min}
          step={step}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm`}
        />
      </div>
    </div>
  );
};

export default Input;