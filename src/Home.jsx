// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import LogoutButton from "./assets/components/LogoutButton";

// function Home() {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-teal-400 font-[Poppins]">
//       <div className="w-[90%] max-w-6xl bg-gray-100 rounded-3xl shadow-2xl p-10 lg:p-16">
        
//         <header className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-teal-600 flex items-center justify-center rounded-lg text-white font-bold text-sm">
//               AC
//             </div>
//             <h1 className="text-teal-600 font-semibold text-xl">Alumni Connect</h1>
//           </div>

//           {/* Navigation - NO LOGIN LINKS! */}
//           <nav className="hidden md:flex items-center gap-8 text-gray-600 font-semibold text-lg">
//             <Link to="/home" className="hover:underline">Home</Link>
//             <Link to="/about" className="hover:underline">About</Link>
//             <Link to="/alumni" className="hover:underline">Alumni</Link>
//             <Link to="/posts" className="hover:underline">Posts</Link>

//             {/* Profile Dropdown */}
//             <div className="relative">
//               <button 
//                 onClick={() => setProfileOpen(!profileOpen)}
//                 className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-full transition-all duration-200"
//               >
//                 👤 Profile
//               </button>

//               {profileOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl py-2 z-50 border">
//                   <Link 
//                     to="/profile" 
//                     className="block px-6 py-3 hover:bg-teal-50 transition-colors"
//                     onClick={() => setProfileOpen(false)}
//                   >
//                     👤 My Profile
//                   </Link>

//                   <Link 
//                     to="/dashboard" 
//                     className="block px-6 py-3 hover:bg-teal-50 transition-colors"
//                     onClick={() => setProfileOpen(false)}
//                   >
//                     📊 Dashboard
//                   </Link>

//                   <Link 
//                     to="/posts" 
//                     className="block px-6 py-3 hover:bg-teal-50 transition-colors"
//                     onClick={() => setProfileOpen(false)}
//                   >
//                     ✍️ Posts
//                   </Link>

//                   {/* Logout Separator + Button */}
//                   <div className="border-t border-gray-100 my-1">
//                     <LogoutButton />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </nav>

//           {/* Mobile hamburger - for responsiveness */}
//           <button className="md:hidden text-2xl p-2 text-teal-600 hover:bg-teal-100 rounded-xl">
//             ☰
//           </button>
//         </header>

//         {/* Hero Section */}
//         <section className="mt-16 flex flex-col lg:flex-row items-center justify-between gap-12">
//           <div className="max-w-xl">
//             <h2 className="text-5xl font-bold text-green-900 leading-tight">
//               Alumni <br /> Connect
//             </h2>

//             <p className="mt-6 text-gray-700 text-sm leading-relaxed">
//               Reconnect with your alumni community.
//             </p>

//             <Link to="/about">
//               <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-200">
//                 Learn More →
//               </button>
//             </Link>
//           </div>

//           <div className="w-full lg:w-[450px]">
//             <img
//               src="https://media.istockphoto.com/id/1403347545/vector/man-looking-data-of-new-candidate.jpg?s=612x612&w=0&k=20&c=LDvoaYNUJdA7N5IGd6Md_aMf2cEjCGzp5r2n6TeekCM="
//               alt="Alumni community illustration"
//               className="w-full rounded-xl shadow-2xl"
//             />
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Home;
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "./assets/components/LogoutButton";
import { useAuth } from "./hooks/UseAuth"; 

function Home() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAlumni, isStudent, isLoading } = useAuth();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-teal-400">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-200 to-teal-400 font-[Poppins] overflow-x-hidden">
      {/* ✨ Glassmorphism Navbar */}
      <header className="backdrop-blur-xl bg-white/20 sticky top-0 z-50 border-b border-white/30">
        <div className="w-[90%] max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center rounded-2xl shadow-xl group-hover:scale-105 transition-all duration-300 border-4 border-white/50">
                <span className="text-white font-bold text-lg">AC</span>
              </div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
                Alumni Connect
              </h1>
            </div>

            {/* ✨ Modern Navbar */}
            <nav className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-8 py-3 rounded-3xl border border-white/20 shadow-2xl">
                <Link to="/home" className="px-4 py-2 text-gray-700 font-semibold hover:text-teal-600 transition-all duration-200 hover:scale-105">Home</Link>
                <Link to="/about" className="px-4 py-2 text-gray-700 font-semibold hover:text-teal-600 transition-all duration-200 hover:scale-105">About</Link>
                <Link to="/alumni" className="px-4 py-2 text-gray-700 font-semibold hover:text-teal-600 transition-all duration-200 hover:scale-105">Alumni</Link>

                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                {isStudent && (
                  <Link to="/posts" className="px-4 py-2 text-gray-700 font-semibold hover:text-teal-600 transition-all duration-200 hover:scale-105">
                    📖 Posts
                  </Link>
                )}
                {isAlumni && (
                  <>
                    <Link to="/posts" className="px-4 py-2 text-gray-700 font-semibold hover:text-teal-600 transition-all duration-200 hover:scale-105">
                      📝 Posts
                    </Link>
                    <Link to="/postpage" className="px-4 py-2 text-gray-700 font-semibold hover:text-teal-600 transition-all duration-200 hover:scale-105">
                      ✍️ New Post
                    </Link>
                  </>
                )}
              </div>

              {/* 🔥 LOGOUT BUTTON */}
              <LogoutButton />

              {/* Profile Dropdown */}
              {isAlumni && (
                <div className="relative group">
                  <button 
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-white/30 hover:scale-105"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">👤</div>
                    Profile
                  </button>
                  
                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl py-4 z-50 border border-white/50 animate-in slide-in-from-top-4 duration-200">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-6 py-4 hover:bg-teal-50 rounded-2xl transition-all duration-200 mx-2" 
                        onClick={() => setProfileOpen(false)}
                      >
                        <div className="w-10 h-10 bg-teal-100 rounded-2xl flex items-center justify-center">👤</div>
                        <div>
                          <div className="font-semibold text-gray-900">My Profile</div>
                          <div className="text-sm text-gray-500">View & edit profile</div>
                        </div>
                      </Link>
                      <Link 
                        to="/dashboard" 
                        className="flex items-center gap-3 px-6 py-4 hover:bg-teal-50 rounded-2xl transition-all duration-200 mx-2" 
                        onClick={() => setProfileOpen(false)}
                      >
                        <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">📊</div>
                        <div>
                          <div className="font-semibold text-gray-900">Dashboard</div>
                          <div className="text-sm text-gray-500">Analytics & stats</div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </nav>

            <button className="md:hidden p-2 text-teal-600 hover:bg-white/50 rounded-xl transition-all">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="w-[90%] max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-1/2 space-y-8">
            <span className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-opacity-90 text-black font-bold rounded-full text-sm tracking-wider inline-block">
              🚀 Welcome {isStudent ? "Student" : isAlumni ? "Alumni" : "Guest"}
            </span>
            
            <h2 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-green-900 via-teal-800 to-teal-600 bg-clip-text text-transparent leading-tight">
              Alumni <br className="hidden lg:block" />
              <span className="text-5xl lg:text-6xl">Connect</span>
            </h2>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-lg">
              {isStudent && "Discover inspiring alumni stories, connect with mentors, and unlock career opportunities."}
              {isAlumni && "Share your journey, mentor students, and build your professional network."}
              {!isStudent && !isAlumni && "Join our vibrant alumni community and unlock endless opportunities."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/about">
                <button className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-10 py-5 rounded-3xl font-black text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                  <span className="flex items-center gap-2">
                    Explore Now → 
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </Link>
              <Link to="/alumni">
                <button className="border-2 border-white/50 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-teal-500 text-gray-800 px-10 py-5 rounded-3xl font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  View Alumni
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center gap-3 text-lg font-semibold text-gray-700">
                <div className="w-10 h-10 bg-teal-500/20 rounded-2xl flex items-center justify-center">👥</div>
                <span>5K+ Alumni</span>
              </div>
              <div className="flex items-center gap-3 text-lg font-semibold text-gray-700">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-2xl flex items-center justify-center">💬</div>
                <span>2K+ Posts</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src="https://media.istockphoto.com/id/1403347545/vector/man-looking-data-of-new-candidate.jpg?s=612x612&w=0&k=20&c=LDvoaYNUJdA7N5IGd6Md_aMf2cEjCGzp5r2n6TeekCM="
                alt="Alumni community"
                className="w-full max-w-md mx-auto rounded-3xl shadow-3xl border-8 border-white/50"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
