import React from "react";
import { NavLink } from "react-router-dom";
import { Sparkles, BookOpen, ArrowRight, Users, Trophy, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl" />
      
      {/* Floating elements */}
      <div className="absolute top-40 left-10 animate-float">
        <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 flex items-center justify-center">
          <BookOpen size={20} className="text-blue-600" />
        </div>
      </div>
      <div className="absolute bottom-40 right-10 animate-float-delayed">
        <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 flex items-center justify-center">
          <Zap size={20} className="text-blue-600" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Section */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-6 animate-fade-in">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                AI-Powered Learning Platform
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
              <span className="text-slate-900">Learn Anytime,</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Anywhere
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 mb-8 animate-slide-up-delayed">
              Access hundreds of online courses, tutorials, and AI-powered resources to upskill yourself.
              Join <span className="font-semibold text-blue-600">thousands of learners</span> who are achieving their goals every day.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 justify-center lg:justify-start mb-10 animate-slide-up-delayed-2">
              <NavLink
                to="/courses"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium px-7 py-3.5 rounded-full text-sm transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
              >
                <BookOpen size={18} />
                <span>Explore Courses</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </NavLink>

              <NavLink
                to="/ai"
                className="group inline-flex items-center gap-2 border-2 border-slate-200 hover:border-blue-500 bg-white text-slate-700 hover:text-blue-600 px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105"
              >
                <Sparkles size={18} className="text-blue-500" />
                <span>AI Roadmap Generator</span>
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </NavLink>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 border-t border-slate-200 animate-fade-in">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users size={16} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900">50K+</p>
                  <p className="text-xs text-slate-500">Active Learners</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Trophy size={16} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900">500+</p>
                  <p className="text-xs text-slate-500">Courses</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Zap size={16} className="text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900">AI-Powered</p>
                  <p className="text-xs text-slate-500">Personalized</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative order-1 lg:order-2 animate-scale-in">
            {/* Decorative frame */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-20 animate-pulse-slow" />
            
            {/* Main image container */}
            <div className="relative bg-white rounded-2xl shadow-2xl shadow-blue-500/20 border border-slate-200/60 overflow-hidden group hover:shadow-3xl transition-shadow duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image */}
              <img
                src="https://cdn.prod.website-files.com/65fabbf8f7f7323a634a308c/6696050095a41898d419a8a8_Blog%2002.png"
                alt="Learning Illustration"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-slate-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-slate-700">Live Classes Available</span>
                </div>
              </div>
            </div>

            {/* Stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl border border-slate-200 p-4 hidden lg:block animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <Zap size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">AI Roadmaps</p>
                  <p className="text-xs text-slate-500">Personalized for you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-up-delayed {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        
        .animate-slide-up-delayed-2 {
          animation: slide-up 0.8s ease-out 0.4s both;
        }
        
        .animate-scale-in {
          animation: scale-in 1s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .bg-grid-slate-100 {
          background-image: linear-gradient(to right, #f1f5f9 1px, transparent 1px),
            linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default Hero;