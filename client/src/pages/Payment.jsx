import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { paymentSuccessApi } from "../api/userApi";
import { useAppContext } from "../contexts/AppContext";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSignedIn } = useUser();
  const { refreshCart } = useAppContext();

  const cartItems = location.state?.cartItems || [];
  const totalAmountFromState = location.state?.totalAmount || 0;

  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [countdown, setCountdown] = useState(3);

  const totalAmount = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }, [cartItems]);

  const finalAmount = totalAmountFromState || totalAmount;

  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    let timer;
    if (paymentStatus === 'success') {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/dashboard');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paymentStatus, navigate]);

  const processPayment = async () => {
    try {
      setPaymentStatus('processing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      await paymentSuccessApi(user.id);
      await refreshCart(user.id);
      setPaymentStatus('success');
    } catch (err) {
      console.log("Payment error:", err);
      setPaymentStatus('error');
      setTimeout(() => setPaymentStatus('idle'), 3000);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="text-center bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to complete your purchase</p>
          <button
            onClick={() => navigate('/sign-in')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="text-center bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some courses to get started</p>
          <button
            onClick={() => navigate('/courses')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
        <div className="text-center bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center animate-pulse">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border-4 border-green-500 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-2">Your courses have been added to your dashboard</p>
          <p className="text-sm text-gray-500 mb-6">Redirecting in <span className="font-bold text-green-600">{countdown}s</span></p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group mb-4"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="text-gray-600 mt-2">You're just one step away from unlocking new skills</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div 
                    key={item._id} 
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all hover:shadow-md"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative">
                      <img
                        src={item.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"}
                        alt={item.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Lifetime Access
                        </span>
                        <span className="text-xs flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item.duration || "Self-paced"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-xl text-gray-900">₹{formatPrice(item.price || 0)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Summary</h2>
              
              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{formatPrice(finalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Platform Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span className="text-green-600 font-medium">Included</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      ₹{formatPrice(finalAmount)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    You save ₹{formatPrice(finalAmount * 0.18)} in taxes
                  </p>
                </div>
              </div>

              {/* Payment Button */}
              <button
                onClick={processPayment}
                disabled={paymentStatus === 'processing'}
                className={`
                  w-full py-4 rounded-xl font-medium text-lg transition-all transform hover:scale-105
                  flex items-center justify-center gap-2
                  ${paymentStatus === 'error' 
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  }
                  text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                `}
              >
                {paymentStatus === 'processing' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : paymentStatus === 'error' ? (
                  'Payment Failed - Try Again'
                ) : (
                  'Pay Securely'
                )}
              </button>

              {/* Error Message */}
              {paymentStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">
                    Payment failed. Please try again.
                  </p>
                </div>
              )}

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure 256-bit SSL Encrypted</span>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4">
                Demo payment - no real transaction
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Payment;