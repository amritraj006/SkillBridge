import React from "react";
import { Facebook, Instagram, Linkedin, Github, Mail, Phone, MapPin, Sparkles, Twitter } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/ai", label: "AI Roadmaps" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const resources = [
    { to: "/blog", label: "Blog" },
    { to: "/career-test", label: "Career Test" },
    { to: "/success-stories", label: "Success Stories" },
    { to: "/support", label: "Support" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/AMRITFFYT12521", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/__amrit__raj__0001/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/amrit-raj-54652b294/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/amritraj006", label: "GitHub" },
  ];

  return (
    <footer className="relative bg-white border-t border-slate-200/80">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Column - Wider */}
          <div className="lg:col-span-2 space-y-6">
           <NavLink to="/" className="flex items-center gap-2 shrink-0">
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
            
            <p className="text-sm text-slate-600 leading-relaxed max-w-md">
              Transform your career with AI-powered learning paths, expert-led courses, 
              and a community of motivated learners. Your journey to success starts here.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600 group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <span className="group-hover:text-blue-600 transition-colors">amritsingh5356@gmail.com</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-slate-600 group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Phone size={16} className="text-blue-600" />
                </div>
                <span className="group-hover:text-blue-600 transition-colors">+91 9693 625802</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-slate-600 group">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <MapPin size={16} className="text-blue-600" />
                </div>
                <span className="group-hover:text-blue-600 transition-colors">Phagwara, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-sm text-slate-600 hover:text-blue-600 transition duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-sm text-slate-600 hover:text-blue-600 transition duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
              Connect
            </h3>
            
            <p className="text-sm text-slate-600 mb-4">
              Get career tips and course updates directly in your inbox.
            </p>

            {/* Newsletter Form */}
            <form className="mb-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
                />
                <button className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl">
                  Subscribe
                </button>
              </div>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-slate-500 order-2 md:order-1">
              © {currentYear} SkillBridge. All rights reserved.
            </p>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full order-1 md:order-2">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-xs font-medium text-blue-700">
                AI-Powered Learning Platform
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-xs sm:text-sm text-slate-500 order-3">
              <NavLink to="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy
              </NavLink>
              <NavLink to="/terms" className="hover:text-blue-600 transition-colors">
                Terms
              </NavLink>
              <NavLink to="/cookies" className="hover:text-blue-600 transition-colors">
                Cookies
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;