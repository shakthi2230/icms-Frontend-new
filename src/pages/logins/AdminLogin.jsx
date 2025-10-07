  import { useState } from "react";
  import { useNavigate } from "react-router-dom";

  export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {  
      e.preventDefault();
      if (username === "admin" && password === "admin123") {
        setError("");
        navigate("/admin-dashboard"); // Redirect to admin dashboard
      } else {
        setError("Invalid username or password");
      }
    };

    return (
      <div className="h-full flex items-center justify-center bg-gray-400">
        <div className="w-full max-w-md p-10 bg-gray-800 border border-yellow-500 rounded-2xl shadow-2xl">
          <h2 className="text-white text-3xl font-extrabold text-center mb-8">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Username"
              className="px-4 py-3 rounded-lg border border-yellow-500 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-3 rounded-lg border border-yellow-500 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-yellow-500 text-center text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="mt-4 py-3 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition text-lg"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
