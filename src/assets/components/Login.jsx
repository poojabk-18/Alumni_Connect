import { useState } from "react";
import axios from "axios";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
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
    setSuccess("");

    try {
      // Send data directly to backend
      const res = await axios.post("http://localhost:3000/api/users", {
        email,
        password,
        role
      });

      setSuccess(res.data.message || "User added successfully");
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error(err); // see actual backend error
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-teal-400 font-[Poppins]">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-8">
          Add User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role */}
          <div>
            <label className="text-sm text-gray-600">Role</label>
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
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-xl font-semibold transition"
          >
            ADD USER
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;