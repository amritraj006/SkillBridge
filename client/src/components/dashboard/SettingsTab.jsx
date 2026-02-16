
import { Settings } from "lucide-react";

const SettingsTab = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
      <Settings size={40} className="text-slate-300 mx-auto mb-3" />
      <h3 className="font-medium text-slate-900 mb-1">Settings coming soon</h3>
      <p className="text-sm text-slate-500">We're working on it!</p>
    </div>
  );
};

export default SettingsTab;