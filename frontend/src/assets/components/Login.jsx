// import { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);

//       navigate("/home");

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-300 via-yellow-200 to-teal-400 font-[Poppins]">
//       <div className="bg-white rounded-3xl shadow-2xl p-10 w-[90%] max-w-md">

//         <h2 className="text-3xl font-bold text-center text-green-900 mb-8">
//           Welcome Back 
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Email */}
//           <div>
//             <label className="text-sm text-gray-600">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm text-gray-600">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           {error && (
//             <p className="text-red-500 text-sm text-center">{error}</p>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-xl font-semibold transition"
//           >
//             Log In
//           </button>

//           <p className="text-center text-sm text-gray-600">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-teal-600 font-semibold hover:underline">
//               Sign up
//             </Link>
//           </p>

//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8001/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role); // <-- role from backend

      navigate("/home");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-teal-400 font-[Poppins]">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-900 mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 py-3 rounded-xl font-semibold transition"
          >
            Log In
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-teal-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
