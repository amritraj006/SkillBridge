import React, { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { getUserDetails } from "../api/userApi";
import { useNavigate } from "react-router-dom";

// Import dashboard components
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import ProfileTab from "../components/dashboard/ProfileTab";
import CoursesTab from "../components/dashboard/CoursesTab";
import SettingsTab from "../components/dashboard/SettingsTab";
import MobileHeader from "../components/dashboard/MobileHeader";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const userId = user?.id;

  const [activeTab, setActiveTab] = useState("profile");
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "courses", label: "My Courses", icon: "BookOpen" },
    { id: "settings", label: "Settings", icon: "Settings" },
  ];

  const fetchUser = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await getUserDetails(userId);
      setUserDetails(res);
    } catch (err) {
      console.error("Error fetching user details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-sm text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden">
      {/* Mobile Header */}
      <MobileHeader 
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Sidebar */}
      <DashboardSidebar
        user={user}
        userId={userId}
        activeTab={activeTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onTabChange={handleTabChange}
        onSignOut={handleSignOut}
        tabs={tabs}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-[60px] lg:pt-0">
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              {activeTab === "profile" && "Profile"}
              {activeTab === "courses" && "My Courses"}
              {activeTab === "settings" && "Settings"}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {activeTab === "profile" && "Manage your personal information"}
              {activeTab === "courses" && "Track your learning progress"}
              {activeTab === "settings" && "Manage your account preferences"}
            </p>
          </div>

          {/* Tab Content */}
          {activeTab === "profile" && (
            <ProfileTab 
              loading={loading} 
              userDetails={userDetails} 
              onEdit={() => handleTabChange("settings")}
              showValue={(val) => val || "Not provided"}
              formatAddress={(address) => {
                if (!address) return "Not provided";
                const parts = [
                  address.street,
                  address.city,
                  address.state,
                  address.country,
                  address.pincode,
                ].filter(Boolean);
                return parts.length ? parts.join(", ") : "Not provided";
              }}
            />
          )}

          {activeTab === "courses" && (
            <CoursesTab onBrowse={() => navigate("/courses")} />
          )}

          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;