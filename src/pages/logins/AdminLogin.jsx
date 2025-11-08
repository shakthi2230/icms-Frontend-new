import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, LogIn, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // ADD THIS LINE

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        setError("");
        navigate("/admin-dashboard"); // This will now work
      } else {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1E2A38] via-[#2a3a50] to-[#1E2A38] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-500 opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-yellow-400 opacity-5 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        {/* Logo/Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg mb-4 sm:mb-6">
            <LogIn size={24} className="sm:w-8 sm:h-8 text-[#1E2A38]" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">Admin Portal</h1>
          <p className="text-gray-300 text-xs sm:text-sm">Secure login to your dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-yellow-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 sm:space-y-6">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-200">
                Username
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-xs sm:text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1E2A38] font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-6 text-sm sm:text-base"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#1E2A38] border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="pt-4 sm:pt-6 border-t border-yellow-500/20">
            <p className="text-gray-300 text-xs text-center mb-2 sm:mb-3">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
              <div className="bg-white/5 p-2 sm:p-3 rounded border border-yellow-500/20">
                <p className="text-gray-400 text-xs">Username</p>
                <p className="text-yellow-400 font-semibold text-sm">admin</p>
              </div>
              <div className="bg-white/5 p-2 sm:p-3 rounded border border-yellow-500/20">
                <p className="text-gray-400 text-xs">Password</p>
                <p className="text-yellow-400 font-semibold text-sm">admin123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6 sm:mt-8">
          © 2025 Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
}