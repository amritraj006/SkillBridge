import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SearchResult from "./SearchResult";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(3); // This would come from your cart state
  const navigate = useNavigate();
  const {searchQuery, setSearchQuery} = useAppContext();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/ai", label: "AI Generator" },
    { to: "/dashboard", label: "Dashboard", protected: true },
  ];

  // ✅ Filter links based on login
  const filteredLinks = navLinks.filter((link) => {
    if (link.protected) return isSignedIn;
    return true;
  });

  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
       <NavLink to="/" onClick={() => scrollTo(0,0)} className="flex items-center gap-2 shrink-0">
  <img 
    src="/logo2.svg" 
    alt="SkillBridge" 
    className="h-10 w-10" 
  />
  <span className="text-2xl font-bold tracking-tight">
    <span className="text-slate-900">Skill</span>
    <span className="text-blue-600">Bridge</span>
  </span>
</NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8 lg:gap-12">
            {/* Nav Links */}
            <div className="flex items-center gap-6 lg:gap-8">
              {filteredLinks.map((link) => (
                <NavLink
                onClick={() => scrollTo(0,0)}
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600 py-4"
                        : "text-slate-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative hidden lg:block">
              <input
              value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search courses..."
                className="w-64 pl-4 pr-10 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <SearchResult />
            </div>

            {/* Cart */}
            {/* Cart (only when signed in) */}
{isSignedIn && (
  <div className="relative" onClick={() => navigate("/cart")}>
    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
      <ShoppingCart className="w-5 h-5 text-slate-600 hover:text-blue-600 transition-colors" />
    </button>

    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-medium rounded-full flex items-center justify-center ring-2 ring-white">
        {cartCount}
      </span>
    )}
  </div>
)}

            {/* Auth Button / User */}
            {!user ? (
              <button
                onClick={() => window.Clerk?.openSignUp()}
                className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Sign In
              </button>
            ) : (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "w-8 h-8 ring-2 ring-slate-200 hover:ring-blue-500 transition-all",
                    userButtonTrigger: "hover:opacity-80 transition-opacity",
                  },
                }}
              />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-slate-600" />
            ) : (
              <Menu className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-slate-200 shadow-lg animate-slide-down">
          <div className="px-4 py-5 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
                type="text"
                placeholder="Search courses..."
                className="w-full pl-4 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <SearchResult />
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-1">
              {filteredLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleMobileLinkClick}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Cart & Auth */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              {/* Cart */}
              {/* Cart (only when signed in) */}
{isSignedIn && (
  <div className="flex items-center justify-between px-4" onClick={() => navigate("/cart")}>
    <span className="text-sm font-medium text-slate-600">Cart</span>

    <div className="relative" >
      <ShoppingCart  className="w-5 h-5 text-slate-600" />

      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs font-medium rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </div>
  </div>
)}

              {/* Auth Button / User */}
              {!user ? (
                <button
                  onClick={() => {
                    window.Clerk?.openSignUp();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg"
                >
                  Get Started
                </button>
              ) : (
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm font-medium text-slate-600">
                    Account
                  </span>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8 ring-2 ring-slate-200",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;