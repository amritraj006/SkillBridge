import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { getCart } from "../api/userApi";
import { useAppContext } from "../contexts/AppContext";
import { 
  ShoppingCart, Trash2, Clock, BookOpen, 
  ChevronRight, AlertCircle, Loader2, 
  ArrowLeft, IndianRupee, CreditCard
} from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { toggleCart, togglingId, fetchCart } = useAppContext();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const loadCart = async () => {
    if (!isSignedIn || !user?.id) return;

    try {
      setLoading(true);
      const data = await getCart(user.id);
      const items = Array.isArray(data) ? data : [];
      setCartItems(items);
    } catch (error) {
      console.log("Cart fetch error:", error);
      setCartItems([]);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [isSignedIn, user?.id]);

  const totalAmount = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [cartItems]);

  const handleRemove = async (courseId) => {
    setRemovingId(courseId);
    try {
      await toggleCart(courseId);
      await fetchCart();
      await loadCart();
      toast.success("Removed from cart", {
        icon: '🗑️',
        style: {
          borderRadius: '12px',
          background: '#1e293b',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setRemovingId(null);
    }
  };

  const handleProceed = () => {
    if (cartItems.length === 0) return;
    navigate("/payment", {
      state: { cartItems, totalAmount },
    });
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl border border-slate-200 shadow-lg">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart size={32} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Login to View Cart</h2>
          <p className="text-slate-500 mb-6">Please sign in to see your saved courses</p>
          <button
            onClick={() => window.Clerk?.openSignIn()}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <ShoppingCart size={24} className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Your Cart</h1>
              <p className="text-sm text-slate-500 mt-1">
                {cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'} selected
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/courses")}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>
        </div>

        {loading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen size={20} className="text-blue-600" />
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">Loading your cart...</p>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={40} className="text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added any courses to your cart yet.
            </p>
            <button
              onClick={() => navigate("/courses")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Browse Courses
              <ChevronRight size={16} />
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow group"
                >
                  <div className="flex gap-4">
                    {/* Course Image */}
                    <div className="w-28 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&h=150&fit=crop"}
                        alt={course.title || "Course"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {course.title}
                          </h3>
                          
                          <div className="flex items-center gap-3 mt-2">
                            {course.category && (
                              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                {course.category}
                              </span>
                            )}
                            {course.duration && (
                              <span className="flex items-center gap-1 text-xs text-slate-500">
                                <Clock size={12} />
                                {course.duration}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600 flex items-center gap-0.5">
                            <IndianRupee size={16} />
                            {course.price || 0}
                          </p>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <div className="flex justify-end mt-3">
                        <button
                          disabled={removingId === course._id || togglingId === course._id}
                          onClick={() => handleRemove(course._id)}
                          className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {removingId === course._id ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              Removing...
                            </>
                          ) : (
                            <>
                              <Trash2 size={14} />
                              Remove
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary - Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <CreditCard size={18} className="text-blue-600" />
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className="space-y-3 pb-4 border-b border-slate-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium text-slate-900 flex items-center">
                      <IndianRupee size={14} />
                      {totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Discount</span>
                    <span className="text-green-600 font-medium">- ₹0</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-4">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600 flex items-center">
                    <IndianRupee size={20} />
                    {totalAmount}
                  </span>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleProceed}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-blue-200 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Proceed to Payment
                </button>

                {/* Secure Checkout Note */}
                <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1.5">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;