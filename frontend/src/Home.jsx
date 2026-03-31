import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "./assets/components/LogoutButton";
import { useAuth } from "./hooks/UseAuth";

function Home() {
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAlumni, isStudent, isLoading } = useAuth();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 via-yellow-200 to-teal-400">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-600 border-t-transparent"></div>
    </div>
  );

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-yellow-100 to-teal-300 font-[Poppins] flex items-center justify-center p-10">

      {/* Main Card */}
      <div className="w-full max-w-6xl bg-gray-100 rounded-3xl shadow-2xl overflow-visible">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-12 py-7 border-b border-gray-200">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-black text-sm">AC</span>
            </div>
            <span className="text-teal-700 font-black text-xl tracking-tight">Alumni Connect</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/home" className="text-gray-600 font-semibold hover:text-teal-600 transition-colors text-sm">Home</Link>
            <Link to="/about" className="text-gray-600 font-semibold hover:text-teal-600 transition-colors text-sm">About</Link>
            <Link to="/alumni" className="text-gray-600 font-semibold hover:text-teal-600 transition-colors text-sm">Alumni</Link>

            {isStudent && (
              <Link to="/feed" className="text-gray-600 font-semibold hover:text-teal-600 transition-colors text-sm">Posts</Link>
            )}

            {isAlumni && (
              <>
                <Link to="/feed" className="text-gray-600 font-semibold hover:text-teal-600 transition-colors text-sm">Posts</Link>
                <Link to="/create-post" className="text-gray-600 font-semibold hover:text-teal-600 transition-colors text-sm">New Post</Link>
              </>
            )}

            <LogoutButton />

            {isAlumni && (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-md"
                >
                  <span>👤</span> Profile
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <Link to="/profile" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-teal-50 hover:text-teal-700 text-gray-700 font-medium text-sm transition-colors">
                      👤 My Profile
                    </Link>
                    <Link to="/dashboard" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-teal-50 hover:text-teal-700 text-gray-700 font-medium text-sm transition-colors">
                      📊 Dashboard
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 text-teal-600 hover:bg-white/50 rounded-xl transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between px-16 py-16 gap-16">

          {/* Left */}
          <div className="lg:w-1/2 space-y-7 pl-4">

            <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
               Welcome {isStudent ? "Student" : isAlumni ? "Alumni" : "Guest"}
            </div>

            <h1 className="text-6xl lg:text-7xl font-black text-green-900 leading-[1.05] tracking-tight">
              Alumni <br /> Connect
            </h1>

            <p className="text-gray-500 text-base leading-relaxed max-w-xs">
              {isStudent && "Discover inspiring alumni stories, connect with mentors, and unlock career opportunities."}
              {isAlumni && "Share your journey, mentor students, and build your professional network."}
              {!isStudent && !isAlumni && "Reconnect with your alumni community."}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/about">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  Learn More
                </button>
              </Link>
              <Link to="/alumni">
                <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-3 rounded-full font-semibold text-sm shadow-sm transition-all hover:-translate-y-0.5">
                  View Alumni
                </button>
              </Link>
            </div>

            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-black text-gray-800">5K+</div>
                <div className="text-gray-400 text-xs font-medium mt-0.5">Alumni</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div>
                <div className="text-2xl font-black text-gray-800">2K+</div>
                <div className="text-gray-400 text-xs font-medium mt-0.5">Posts</div>
              </div>
              <div className="w-px h-10 bg-gray-300"></div>
              <div>
                <div className="text-2xl font-black text-gray-800">98%</div>
                <div className="text-gray-400 text-xs font-medium mt-0.5">Satisfaction</div>
              </div>
            </div>

          </div>

          {/* Right - Image */}
          <div className="lg:w-1/2 flex justify-center pr-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
              <img
                src="https://media.istockphoto.com/id/1403347545/vector/man-looking-data-of-new-candidate.jpg?s=612x612&w=0&k=20&c=LDvoaYNUJdA7N5IGd6Md_aMf2cEjCGzp5r2n6TeekCM="
                alt="Alumni community"
                className="w-full rounded-xl"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;