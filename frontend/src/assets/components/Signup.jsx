import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // student or alumni
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      // ✅ Register user (backend must store role)
      const res = await axios.post("http://localhost:8001/api/auth/register", {
        email,
        password,
        role,
      });

      let token;

      // If backend returns token on register
      if (res.data.token) {
        token = res.data.token;
      }
      // If backend doesn't return token, do login after signup
      else {
        const loginRes = await axios.post("http://localhost:8001/api/auth/login", {
          email,
          password,
        });
        token = loginRes.data.token;
      }

      // ✅ Save token and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Account created successfully 🎉");
      navigate("/home");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-teal-400 font-[Poppins]">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-8">
          Create Account ✨
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
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
              placeholder="Create password"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

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

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
