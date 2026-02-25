import {
  GraduationCap,
  Monitor,
  BarChart2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useAppContext } from "../../contexts/AppContext";

const Features = () => {
  const { teachers, totalUsers } = useAppContext();

  const instructorCount = teachers?.length || 0;
  const userCount = totalUsers || 0;

  const features = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Expert Instructors",
      description:
        "Learn from industry experts and experienced educators who guide you every step of your learning journey.",
      gradient: "from-blue-500 to-indigo-500",
      stats: `${instructorCount}+ Instructors`,
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Flexible Learning",
      description:
        "Access courses anytime, anywhere on any device. Learn at your own pace with our adaptive platform.",
      gradient: "from-indigo-500 to-blue-500",
      stats: "24/7 Access",
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Career Growth",
      description:
        "Gain in-demand skills and industry-recognized certificates to accelerate your career trajectory.",
      gradient: "from-blue-600 to-indigo-600",
      stats: "90% Placement",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-20 lg:py-28">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-6">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Why Choose Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="text-slate-900">Everything you need to</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              succeed in your career
            </span>
          </h2>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Our platform combines expert guidance, flexible learning, and proven
            career outcomes to help you achieve your professional goals.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-slate-200/75 p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-200/50 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="relative mb-6">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />
                <div
                  className={`relative w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3`}
                >
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200 group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-all duration-300">
                  <CheckCircle2 size={14} className="text-blue-600" />
                  <span className="text-xs font-medium text-slate-700 group-hover:text-blue-700">
                    {feature.stats}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative mt-16 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group cursor-pointer">
            <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">
              Join {userCount}+ learners already growing with us
            </span>
            <ArrowRight
              size={16}
              className="text-blue-600 group-hover:translate-x-1 transition-transform"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-slate-100\\/50 {
          background-image: linear-gradient(to right, #f1f5f9 1px, transparent 1px),
            linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
};

export default Features;