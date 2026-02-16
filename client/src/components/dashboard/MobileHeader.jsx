
import { Menu, X } from "lucide-react";

const MobileHeader = ({ user, sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-30">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <span className="font-medium text-slate-700">Dashboard</span>
      {user && (
        <img
          src={user.imageUrl}
          alt={user.fullName}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
    </div>
  );
};

export default MobileHeader;