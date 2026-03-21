import { useState } from "react";
import { Link } from "react-router-dom";

const mockAlumni = [  
  { id: 1, name: "Mukesh Chettri", profession: "Core Guidance", skills: "Tech", college: "2023", email: "mukesh@example.com", linkedin: "linkedin.com/in/mukesh", badge: true },
  { id: 2, name: "Sarah Shenoy", profession: "Core Guidance", skills: "Finance", college: "2027", email: "sarah@example.com", linkedin: "linkedin.com/in/sarah", badge: false },
  { id: 3, name: "Manish S", profession: "Core Guidance", skills: "Tech", college: "2023", email: "manish@example.com", linkedin: "linkedin.com/in/manish", badge: true },
  { id: 4, name: "Bhushan C", profession: "Core Guidance", skills: "Design", college: "2023", email: "bhushan@example.com", linkedin: "linkedin.com/in/bhushan", badge: false },
  { id: 5, name: "Eshwar C", profession: "15+ Guide", skills: "Finance", college: "2023", email: "eshwar@example.com", linkedin: "linkedin.com/in/eshwar", badge: true },
  { id: 6, name: "Evan Chettri", profession: "15+ Guide", skills: "Tech", college: "2023", email: "evan@example.com", linkedin: "linkedin.com/in/evan", badge: false },
  { id: 7, name: "Ryan Dutta", profession: "10+ Guide", skills: "Company", college: "2023", email: "ryan@example.com", linkedin: "linkedin.com/in/ryan", badge: true },
  { id: 8, name: "Ria Mistry", profession: "10+ Guide", skills: "Expert", college: "2023", email: "ria@example.com", linkedin: "linkedin.com/in/ria", badge: false },
];

function Alumni() {
  const [alumniList, setAlumniList] = useState(mockAlumni);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    skills: "",
    college: "",
    email: "",
    linkedin: "",
    achievements: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAlum = {
      id: Date.now(),
      ...formData,
      badge: true,  // Earns first badge
    };
    setAlumniList([newAlum, ...alumniList]);
    setShowModal(false);
    setFormData({ name: "", profession: "", skills: "", college: "", email: "", linkedin: "", achievements: "" });
    alert("Profile added! You've earned your first badge 🎉");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-300 to-gray-200 font-[Poppins] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="text-teal-800 font-semibold text-xl hover:underline">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-teal-700 tracking-wide">
            Find Your Nexus Mentor
          </h1>
        </div>

        {/* Filters & Add Button - Matching reference */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <div className="flex gap-2 text-sm text-teal-700 bg-teal-100 px-4 py-2 rounded-full">
            <span>Industry</span>
            <select className="bg-transparent border-none outline-none">
              <option>Tech</option>
              <option>Finance</option>
              <option>Company</option>
              <option>Design</option>
              <option>Expert</option>
            </select>
          </div>
          <div className="text-teal-600 text-sm bg-yellow-200 px-4 py-2 rounded-full">
            Get matched in 30s • 232 Active
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium transition shadow-lg"
          >
            ➕ Add Profile
          </button>
        </div>

        {/* Alumni Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumniList.map((alum) => (
            <div key={alum.id} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-xl font-bold text-teal-700 text-center mb-2">{alum.name}</h3>
              <p className="text-teal-600 font-medium text-center mb-4">{alum.profession}</p>
              <div className="flex justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">{alum.skills}</span>
              </div>
              <p className="text-gray-600 text-sm text-center mb-2">{alum.college}</p>
              
              {/* Email & LinkedIn on Cards */}
              <div className="space-y-1 mb-4 text-xs text-gray-500 text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>📧</span>
                  <a href={`mailto:${alum.email}`} className="hover:text-teal-600 truncate max-w-[140px]">{alum.email}</a>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <span>💼</span>
                  <a href={`https://${alum.linkedin}`} target="_blank" className="hover:text-teal-600 truncate max-w-[140px]">{alum.linkedin}</a>
                </div>
              </div>
              
              {alum.badge && (
                <div className="flex justify-center">
                  <span className="px-4 py-1 bg-yellow-400 text-black rounded-full text-xs font-bold">
                    First Badge Earned! ⭐
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* UPDATED Add Profile Modal with Email + LinkedIn */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Complete Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-500"
                required
              />
              <input
                type="text"
                placeholder="Profession (e.g., Core Guidance) *"
                value={formData.profession}
                onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-500"
                required
              />
              <input
                type="text"
                placeholder="Skills (e.g., Tech, Finance) *"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-500"
                required
              />
              <input
                type="text"
                placeholder="College/Year (e.g., 2023) *"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-500"
                required
              />
              {/* NEW EMAIL FIELD */}
              <input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-500"
                required
              />
              {/* NEW LINKEDIN FIELD */}
              <input
                type="text"
                placeholder="LinkedIn (linkedin.com/in/username) *"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-500"
                required
              />
              <textarea
                placeholder="Achievements/Projects/Workshops/Talks"
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-teal-500"
              />
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-xl transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl transition font-bold"
                >
                  Submit & Earn Badge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alumni;