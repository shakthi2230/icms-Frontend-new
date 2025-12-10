import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, LogIn, AlertCircle, Shield } from "lucide-react";
import useAdminStore from "../../context/AdminContext";

export default function AdminLogin() {
  const [isSuperUser, setIsSuperUser] = useState(false); // false = Admin, true = Super User
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Check if already authenticated
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

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Admin Login Credentials
      if (!isSuperUser && username === "admin" && password === "admin123") {
        useAdminStore.getState().login({ isAuthenticated: true, role: "admin" });
        navigate("/admin-dashboard");
        return;
      }

      // Super User Login Credentials
      if (isSuperUser && username === "superuser" && password === "super123") {
        useAdminStore.getState().login({ isAuthenticated: true, role: "superuser" });
        navigate("/admin-dashboard");
        return;
      }

      setError("Invalid credentials for selected login type");
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Loading screen while checking auth
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
    <div className="flex items-center justify-center bg-[#2a3a50] relative overflow-hidden p-3 min-h-screen">
      <div className="relative z-10 w-full max-w-md">
        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-full p-1.5 flex items-center border border-yellow-500/30 shadow-lg">
            <button
              onClick={() => setIsSuperUser(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                !isSuperUser
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1E2A38] shadow-md"
                  : "text-gray-300"
              }`}
            >
              <User size={18} />
              Admin Login
            </button>
            <button
              onClick={() => setIsSuperUser(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                isSuperUser
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1E2A38] shadow-md"
                  : "text-gray-300"
              }`}
            >
              <Shield size={18} />
              Super User Login
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-xl mb-4">
            {isSuperUser ? (
              <Shield size={28} className="text-[#1E2A38]" />
            ) : (
              <LogIn size={28} className="text-[#1E2A38]" />
            )}
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            {isSuperUser ? "Super User Portal" : "Admin Portal"}
          </h1>
          <p className="text-gray-300 text-sm">
            {isSuperUser ? "Highest privilege access" : "Secure login to your dashboard"}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-yellow-500/30 rounded-xl shadow-2xl p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Username</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-yellow-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle size={18} className="text-red-400" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-[#1E2A38] font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition shadow-lg disabled:opacity-60 text-sm"
            >
              {isLoading ? "Logging in..." : "Login as " + (isSuperUser ? "Super User" : "Admin")}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="pt-5 border-t border-yellow-500/20">
            <p className="text-gray-300 text-xs text-center mb-3 font-semibold">
              {isSuperUser ? "Super User" : "Admin"} Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 p-4 rounded-lg border border-yellow-500/20 text-center">
                <p className="text-gray-400 text-xs">Username</p>
                <p className="text-yellow-400 font-bold">
                  {isSuperUser ? "superuser" : "admin"}
                </p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-yellow-500/20 text-center">
                <p className="text-gray-400 text-xs">Password</p>
                <p className="text-yellow-400 font-bold">
                  {isSuperUser ? "super123" : "admin123"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          © 2025 Admin Panel • {isSuperUser ? "Super User Mode Active" : "Admin Mode"}
        </p>
      </div>
    </div>
  );
}