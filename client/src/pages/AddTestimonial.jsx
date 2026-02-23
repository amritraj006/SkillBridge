import { useState } from "react";
import toast from "react-hot-toast";
import { Star, Send, Sparkles, User, Award } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { addTestimonial } from "../api/testimonialsApi";

const AddTestimonial = () => {
  const { user } = useUser();

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to submit feedback", {
        icon: '🔐',
        style: {
          borderRadius: '12px',
          background: '#2563eb',
          color: '#fff',
        },
      });
      return;
    }

    if (!message.trim()) {
      toast.error("Please share your experience");
      return;
    }

    try {
      setLoading(true);

      await addTestimonial({
          userId: user.id,
          name: user.fullName,
          role: "Student",
          avatar: user.imageUrl,
          message,
          rating,
          achievement: "Verified Learner",
        }
      );

      toast.success("Thank you for your feedback! 🎉", {
        icon: '🌟',
        style: {
          borderRadius: '12px',
          background: '#10b981',
          color: '#fff',
        },
      });

      // Reset form
      setMessage("");
      setRating(5);
      setHover(null);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit feedback"
      );
    } finally {
      setLoading(false);
    }
  };

  const getRatingText = (rating) => {
    const texts = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent"
    };
    return texts[rating] || `${rating}/5`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-20 lg:py-28">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Share Your Experience</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            We Value Your Feedback
          </h1>
          <p className="text-slate-600">
            Help us improve by sharing your learning experience
          </p>
        </div>

        {/* User Info Card */}
        {user && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-4 mb-6 flex items-center gap-4">
            <img
              src={user.imageUrl}
              alt={user.fullName}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
            />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{user.fullName}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <Award size={12} className="text-blue-600" />
                Sharing as verified student
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg space-y-6"
        >
          {/* Rating Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-yellow-50 rounded-full">
                  <span className="text-sm font-semibold text-yellow-700">
                    {rating}/5
                  </span>
                </div>
                <span className="text-sm text-slate-500">
                  {getRatingText(rating)}
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <button
                  key={starValue}
                  type="button"
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                  className="focus:outline-none transition-transform hover:scale-110"
                  aria-label={`Rate ${starValue} stars`}
                >
                  <Star
                    size={36}
                    className={`cursor-pointer transition-all duration-200 ${
                      starValue <= (hover ?? rating)
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Message Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Your Experience
            </label>
            <textarea
              placeholder="Tell us what you liked about the course, how it helped you, or any suggestions for improvement..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
            />
            <p className="text-xs text-slate-400 text-right">
              {message.length} characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Feedback
              </>
            )}
          </button>

          {/* Trust Badge */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
              <span className="w-1 h-1 bg-green-500 rounded-full"></span>
              Your feedback helps us improve
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonial;