import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Alumni() {

  const [alumniList, setAlumniList] = useState([]);
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

  // FUNCTION TO FETCH ALUMNI
  const fetchAlumni = async () => {
    try {
      const res = await fetch("http://localhost:3000/alumni-profile");
      const data = await res.json();

      console.log(data); // 👈 check what backend sends

      setAlumniList(data.alumniProfiles);

    } catch (error) {
      console.error(error);
    }
  };

  // FETCH ON PAGE LOAD
  useEffect(() => {
    fetchAlumni();
  }, []);

  // SUBMIT PROFILE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await fetch("http://localhost:3000/alumni-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      // refresh data from backend
      fetchAlumni();

      setShowModal(false);

      setFormData({
        name: "",
        profession: "",
        skills: "",
        college: "",
        email: "",
        linkedin: "",
        achievements: "",
      });

      alert("Profile added! You've earned your first badge 🎉");

    } catch (error) {
      console.error(error);
    }
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

        {/* Filters + Add Button */}
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

        {/* Alumni Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {Array.isArray(alumniList) && alumniList.map((alum) => (

            <div
              key={alum._id || alum.id}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-gray-100"
            >

              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>

              <h3 className="text-xl font-bold text-teal-700 text-center mb-2">
                {alum.name}
              </h3>

              <p className="text-teal-600 font-medium text-center mb-4">
                {alum.profession}
              </p>

              <div className="flex justify-center gap-2 mb-4">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                  {alum.skills}
                </span>
              </div>

              <p className="text-gray-600 text-sm text-center mb-4">
                {alum.college}
              </p>

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

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">

            <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
              Complete Your Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="Profession"
                value={formData.profession}
                onChange={(e) =>
                  setFormData({ ...formData, profession: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="Skills"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="College/Year"
                value={formData.college}
                onChange={(e) =>
                  setFormData({ ...formData, college: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="LinkedIn (linkedin.com/in/username)"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />

              <textarea
                placeholder="Achievements"
                value={formData.achievements}
                onChange={(e) =>
                  setFormData({ ...formData, achievements: e.target.value })
                }
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-xl"
              />

              <div className="flex gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-teal-600 text-white py-3 rounded-xl"
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