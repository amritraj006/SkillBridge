import React from "react";
import { NavLink } from "react-router-dom";
import { 
  User, BookOpen, Settings, LogOut, ChevronRight, X
} from "lucide-react";

const iconMap = {
  User,
  BookOpen,
  Settings,
};

const DashboardSidebar = ({
  user,
  activeTab,
  sidebarOpen,
  setSidebarOpen,
  onTabChange,
  onSignOut,
  tabs,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 bg-white border-r border-slate-200
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-6">
          <NavLink to="/" className="flex items-center gap-2.5">
            <img src="/logo2.svg" alt="SkillBridge" className="h-9 w-9" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-slate-900">Skill</span>
              <span className="text-blue-600">Bridge</span>
            </span>
          </NavLink>
        </div>

        {/* User Info */}
        {user && (
          <div className="px-6 py-4 border-y border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={user.imageUrl}
                alt={user.fullName}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">
                  {user.fullName || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 px-4 py-6">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = iconMap[tab.icon];
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                  {activeTab === tab.id && (
                    <ChevronRight size={16} className="ml-auto" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Logout */}
        <div className="p-6 pt-4 border-t border-slate-200">
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg"
        >
          <X size={20} className="text-slate-500" />
        </button>
      </div>
    </>
  );
};

export default DashboardSidebar;