import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen  from-yellow-200 via-yellow-300 to-teal-200 py-20 px-4 font-[Poppins]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-block text-teal-800 font-semibold text-xl hover:underline mb-8">← Back to Home</Link>
          <h1 className="text-5xl lg:text-6xl font-bold text-teal-700 mb-8 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            About Alumni Connect
          </h1>
        </div>

        {/* Content Sections */}
        <div className="space-y-16 max-w-3xl mx-auto">
          {/* Mission */}
          <section className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-teal-700 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Alumni Connect bridges the gap between graduates and opportunities. 
              We help you reconnect with your college network, find mentors, discover jobs, 
              and grow your career through real connections with experienced alumni.
            </p>
          </section>

          {/* Features */}
          <section className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-teal-700 mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-3 text-teal-600">Mentor Matching</h3>
                <p>Find mentors by industry, skills, and experience level.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-3 text-teal-600">Career Opportunities</h3>
                <p>Access exclusive job postings and alumni network referrals.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="text-xl font-semibold mb-3 text-teal-600">Achievement Badges</h3>
                <p>Earn badges for completing your profile and milestones.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-xl font-semibold mb-3 text-teal-600">College Network</h3>
                <p>Stay connected with your alma mater and batchmates.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center pt-12">
            <h2 className="text-3xl font-bold text-teal-700 mb-6">Ready to Connect?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of alumni building meaningful connections and advancing their careers.
            </p>
            <Link to="/alumni">
              <button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                🚀 Start Connecting
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
