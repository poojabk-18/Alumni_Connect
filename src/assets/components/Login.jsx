import { useState } from "react";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");

    console.log({
      role,
      email,
      password
    });

    alert(`Login Successful as ${role} 🚀`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-teal-400 font-[Poppins]">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[90%] max-w-md">

        <h2 className="text-3xl font-bold text-center text-green-900 mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Role Selection */}
          <div>
            <label className="text-sm text-gray-600">Login As</label>
            <select
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 cursor-pointer text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-xl font-semibold transition"
          >
            LOG IN
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <span className="text-teal-600 cursor-pointer">Sign up</span>
        </p>

      </div>
    </div>
  );
}

export default Login;