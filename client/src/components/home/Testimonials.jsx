import React, { useEffect, useState } from "react";
import { Star, Quote, Sparkles, Award } from "lucide-react";
import { getTestimonials } from "../../api/testimonialsApi";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTestimonials();
}, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-indigo-50/30 py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="absolute top-40 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-6">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Trusted by 50,000+ Learners
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            <span className="text-slate-900">Real stories from</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              successful learners
            </span>
          </h2>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers
            through our platform
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-slate-500">
            Loading testimonials...
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...testimonials]
              .sort(
                (a, b) =>
                  new Date(b.createdAt) - new Date(a.createdAt)
              )
              .slice(0, 3)
              .map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="group relative bg-white rounded-2xl border border-slate-200/75 p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:border-blue-200/50 hover:-translate-y-2"
                >
                  {/* Gradient overlay (fallback safe) */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      testimonial.gradient ||
                      "from-blue-500 to-indigo-500"
                    } opacity-0 group-hover:opacity-[0.02] rounded-2xl transition-opacity duration-500`}
                  />

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < (testimonial.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="absolute top-6 right-6 text-blue-200 group-hover:text-blue-300 transition-colors">
                    <Quote size={32} strokeWidth={1} />
                  </div>

                  {/* Message */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                    "{testimonial.message}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${
                          testimonial.gradient ||
                          "from-blue-500 to-indigo-500"
                        } rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                      />
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="relative w-14 h-14 rounded-full object-cover border-2 border-white group-hover:border-blue-500 transition-colors duration-300 shadow-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {testimonial.name}
                      </h4>
                      <span className="text-xs text-slate-500 block">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>

                  {/* Achievement */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full">
                      <Award size={14} className="text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">
                        {testimonial.achievement}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-grid-slate-100\\/50 {
          background-image: linear-gradient(to right, #f1f5f9 1px, transparent 1px),
            linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;