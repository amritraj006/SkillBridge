import React from "react";
import { 
  Github, Linkedin, Mail, 
  Sparkles, Code, Server, Database, 
  Globe, Layout, Zap, Smartphone,
  Github as GitIcon, Cloud, Palette
} from "lucide-react";

const About = () => {
  const developers = [
    {
      id: 1,
      name: "Amrit Raj",
      role: "Full Stack Developer",
      description: "Full-stack engineer who built the entire platform from ground up - from database design to responsive UI.",
      image: "https://avatars.githubusercontent.com/u/150701418?v=4",
      expertise: ["React", "Node.js", "MongoDB", "Express", "Tailwind", "REST APIs"],
      achievement: "Full Stack",
      color: "blue",
      social: {
        github: "https://github.com/amritraj006",
        linkedin: "https://www.linkedin.com/in/amrit-raj-54652b294/",
        mail: "mailto:amritsingh5356@gmail.com"
      }
    },
    {
      id: 2,
      name: "Nikhil Ahlawat",
      role: "Cloud & DevOps Engineer",
      description: "Cloud infrastructure specialist who manages MongoDB Atlas clusters and handles website deployment with 99.9% uptime.",
      image: "https://images.unsplash.com/photo-1494790108755-2097e1a5d2c6?w=400&h=400&fit=crop&crop=faces",
      expertise: ["MongoDB Atlas", "AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
      achievement: "Cloud Expert",
      color: "blue",
      social: {
        github: "https://github.com/nikhilahlawat",
        linkedin: "https://linkedin.com/in/nikhilahlawat",
        mail: "mailto:nikhil@skillbridge.com"
      }
    }
  ];

  const techStack = [
    { name: "React", icon: Code, color: "text-blue-600" },
    { name: "Node.js", icon: Server, color: "text-green-600" },
    { name: "MongoDB", icon: Database, color: "text-green-700" },
    { name: "Express", icon: Zap, color: "text-slate-600" },
    { name: "Tailwind CSS", icon: Palette, color: "text-cyan-600" },
    { name: "React Router", icon: Globe, color: "text-red-500" },
    { name: "Git", icon: GitIcon, color: "text-orange-600" },
    { name: "REST APIs", icon: Cloud, color: "text-purple-600" },
    { name: "Responsive", icon: Smartphone, color: "text-blue-600" },
    { name: "Component UI", icon: Layout, color: "text-indigo-600" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-slate-200/80 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/50 rounded-full border border-blue-200 mb-6">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">The Team Behind SkillBridge</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Full Stack{" "}
            <span className="text-blue-600">MERN Application</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Built from scratch with modern technologies and best practices
          </p>
        </div>
      </div>

      {/* Tech Stack Showcase */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Technology Stack</h2>
          <p className="text-slate-600">Modern tools powering our learning platform</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full hover:border-blue-300 hover:shadow-md transition-all"
            >
              <tech.icon size={16} className={tech.color} />
              <span className="text-sm font-medium text-slate-700">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Architecture Overview */}
        <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 mb-16">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">Full Stack Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Layout size={20} className="text-blue-600" />
              </div>
              <h4 className="font-medium text-slate-900 mb-1">Frontend</h4>
              <p className="text-sm text-slate-500">React, Tailwind, React Router</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Server size={20} className="text-blue-600" />
              </div>
              <h4 className="font-medium text-slate-900 mb-1">Backend</h4>
              <p className="text-sm text-slate-500">Node.js, Express, REST APIs</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Database size={20} className="text-blue-600" />
              </div>
              <h4 className="font-medium text-slate-900 mb-1">Database</h4>
              <p className="text-sm text-slate-500">MongoDB, Mongoose ODM</p>
            </div>
          </div>
        </div>

        {/* Developer Cards */}
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
                  <div className="flex items-center gap-2 mt-3">
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                      {dev.id === 1 ? (
                        <Code size={16} className="text-blue-600" />
                      ) : (
                        <Cloud size={16} className="text-blue-600" />
                      )}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      {dev.id === 1 ? "MERN Stack" : "Cloud Infrastructure"}
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

              {/* Social Links - Separate for each developer */}
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-slate-100">
                <a 
                  href={dev.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  aria-label={`${dev.name}'s GitHub`}
                >
                  <Github size={18} />
                </a>
                <a 
                  href={dev.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  aria-label={`${dev.name}'s LinkedIn`}
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href={dev.social.mail}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  aria-label={`Email ${dev.name}`}
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Project Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-blue-200 transition-colors">
            <div className="text-2xl font-bold text-blue-600">50K+</div>
            <div className="text-xs text-slate-500 mt-1">Lines of Code</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-blue-200 transition-colors">
            <div className="text-2xl font-bold text-blue-600">30+</div>
            <div className="text-xs text-slate-500 mt-1">Components</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-blue-200 transition-colors">
            <div className="text-2xl font-bold text-blue-600">10</div>
            <div className="text-xs text-slate-500 mt-1">Technologies</div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-blue-200 transition-colors">
            <div className="text-2xl font-bold text-blue-600">100%</div>
            <div className="text-xs text-slate-500 mt-1">Responsive</div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-50 rounded-full border border-blue-200">
            <Code size={16} className="text-blue-600" />
            <span className="text-sm text-slate-700">
              Full Stack <span className="font-semibold text-blue-700">MERN Application</span>
            </span>
            <span className="text-slate-300 mx-1">•</span>
            <Server size={16} className="text-blue-600" />
            <span className="text-sm text-slate-700">
              <span className="font-semibold text-blue-700">REST APIs</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-4">
            © 2024 SkillBridge. Built from scratch with ❤️ by Amrit & Nikhil
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;