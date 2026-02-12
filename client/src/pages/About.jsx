import React from "react";
import { Github, Linkedin, Mail, Database, Cloud, Sparkles, Award } from "lucide-react";

const About = () => {
  const developers = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Full Stack Developer",
      description: "MongoDB Atlas expert who built our scalable database architecture serving 50k+ users.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=faces",
      expertise: ["MongoDB Atlas", "React", "Node.js", "Express"],
      icon: <Database size={18} className="text-blue-600" />,
      achievement: "Atlas Expert",
      color: "blue"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Cloud Solutions Architect",
      description: "AWS specialist who designed our cloud infrastructure with 99.9% uptime and global CDN.",
      image: "https://images.unsplash.com/photo-1494790108755-2097e1a5d2c6?w=400&h=400&fit=crop&crop=faces",
      expertise: ["AWS", "MongoDB Atlas", "Docker", "Kubernetes"],
      icon: <Cloud size={18} className="text-blue-600" />,
      achievement: "AWS Certified",
      color: "blue"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Light Theme Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-slate-200/80 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 rounded-full border border-blue-200 mb-6">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">The Team Behind SkillBridge</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Built with{" "}
            <span className="text-blue-600">MongoDB Atlas & AWS</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Enterprise-grade infrastructure, human expertise
          </p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {developers.map((dev) => (
            <div 
              key={dev.id}
              className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300"
            >
              {/* Card Header */}
              <div className="flex items-start gap-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-100 rounded-full blur-md opacity-0 group-hover:opacity-70 transition-opacity" />
                  <img
                    src={dev.image}
                    alt={dev.name}
                    className="relative w-20 h-20 rounded-full object-cover border-2 border-white group-hover:border-blue-300 transition-all shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {dev.name}
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                      {dev.achievement}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium text-sm mt-1">
                    {dev.role}
                  </p>
                  {/* Tech Icon */}
                  <div className="flex items-center gap-2 mt-3">
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                      {dev.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      {dev.id === 1 ? "MongoDB Atlas" : "AWS Cloud"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                {dev.description}
              </p>

              {/* Expertise Pills */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {dev.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-50 text-slate-700 rounded-lg border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                <a 
                  href="#" 
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Github size={18} />
                </a>
                <a 
                  href="#" 
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="#" 
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Light Theme Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-blue-200 transition-colors">
            <div className="text-2xl font-bold text-blue-600">50K+</div>
            <div className="text-xs text-slate-500 mt-1">Active Users</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-blue-200 transition-colors">
            <div className="text-2xl font-bold text-blue-600">99.9%</div>
            <div className="text-xs text-slate-500 mt-1">Uptime SLA</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-blue-200 transition-colors">
            <div className="text-2xl font-bold text-blue-600">Atlas</div>
            <div className="text-xs text-slate-500 mt-1">Multi-region</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-blue-200 transition-colors">
            <div className="text-2xl font-bold text-blue-600">AWS</div>
            <div className="text-xs text-slate-500 mt-1">Global CDN</div>
          </div>
        </div>

        {/* Simple Footer Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 rounded-full border border-blue-200">
            <Database size={16} className="text-blue-600" />
            <span className="text-sm text-slate-700">
              Powered by <span className="font-semibold text-blue-700">MongoDB Atlas</span>
            </span>
            <span className="text-slate-300 mx-1">•</span>
            <Cloud size={16} className="text-blue-600" />
            <span className="text-sm text-slate-700">
              <span className="font-semibold text-blue-700">AWS Cloud</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            © 2024 SkillBridge. Built with ❤️ by our team
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;