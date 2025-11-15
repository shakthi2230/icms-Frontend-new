import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, LogIn, AlertCircle } from "lucide-react";
import axios from "axios";
import useAdminStore from "../../context/AdminContext";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Check if already authenticated on component mount
  useEffect(() => {
    const checkAuthentication = () => {
      try {
        const { isAuthenticated } = useAdminStore.getState();
        
        if (isAuthenticated) {
          navigate("/admin-dashboard");
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simple static login check
      if (username === "admin" && password === "admin123") {
        useAdminStore.getState().login({
          isAuthenticated: true,
        });

        navigate("/admin-dashboard");
        return; // stop execution after redirect
      }

      // If credentials don't match
      setError("Invalid username or password");

    } catch (error) {
      console.error("Login error:", error);
      setError(
        error?.response?.data?.message ||
        error?.message ||
        "Invalid username or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-[#1E2A38] via-[#2a3a50] to-[#1E2A38] min-h-screen">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg mb-4">
            <LogIn size={22} className="text-[#1E2A38]" />
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Checking Authentication...</h1>
          <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#1E2A38] via-[#2a3a50] to-[#1E2A38] relative overflow-hidden p-3 min-h-screen">
      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 w-56 h-56 bg-yellow-500 opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-8 right-8 w-56 h-56 bg-yellow-400 opacity-5 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-lg mb-4">
            <LogIn size={22} className="text-[#1E2A38]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin Portal</h1>
          <p className="text-gray-300 text-sm">Secure login to your dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-yellow-500/30 rounded-xl shadow-xl p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Username
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400"
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1E2A38] font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4 text-sm"
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
          <div className="pt-4 border-t border-yellow-500/20">
            <p className="text-gray-300 text-xs text-center mb-2">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded border border-yellow-500/20">
                <p className="text-gray-400 text-xs">Username</p>
                <p className="text-yellow-400 font-semibold text-sm">admin</p>
              </div>
              <div className="bg-white/5 p-3 rounded border border-yellow-500/20">
                <p className="text-gray-400 text-xs">Password</p>
                <p className="text-yellow-400 font-semibold text-sm">admin123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6">
          © 2025 Admin Panel. All rights reserved.
        </p>
      </div>
    </div>
  );
}