import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 py-20 lg:py-24">
      {/* Simple background pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm mb-8">
          <Sparkles size={16} className="text-white" />
          <span className="text-sm font-medium text-white/90">
            Limited Time Offer
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          <span className="text-white">Ready to Start</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
            Learning Today?
          </span>
        </h2>

        {/* Description */}
        <p className="text-blue-50 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Join <span className="font-semibold text-white">50,000+ learners</span> already advancing 
          their careers with our AI-powered platform.
        </p>

        {/* CTA Buttons - Simple & Clean */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#signup"
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-4 rounded-full text-base hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get Started Free</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#demo"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-medium text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            Watch Demo
          </a>
        </div>

        {/* Simple trust indicator */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-sm text-white/80">
            ⚡️ <span className="font-semibold text-white">1,000+</span> learners joined today
          </p>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-white\\/10 {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;