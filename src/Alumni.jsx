import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

  // ✅ Fetch from backend
  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await axios.get("http://localhost:8001/alumni-profile");
      setAlumniList(res.data.alumniProfiles);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        linked_in: formData.linkedin, // match backend
      };

      await axios.post(
        "http://localhost:8001/alumni-profile",
        dataToSend
      );

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

      fetchAlumni(); // refresh data
      alert("Profile added! You've earned your first badge 🎉");

    } catch (error) {
      console.error(error);
      alert("Error saving data");
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

        {/* Filters & Add Button */}
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
            Get matched in 30s • {alumniList.length} Active
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-medium transition shadow-lg"
          >
            ➕ Add Profile
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumniList.map((alum) => (
            <div key={alum._id} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-gray-100">
              
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

              <p className="text-gray-600 text-sm text-center mb-2">
                {alum.college}
              </p>

              <div className="space-y-1 mb-4 text-xs text-gray-500 text-center">
                <div>📧 {alum.email}</div>
                <div>💼 {alum.linked_in}</div>
              </div>

              <div className="flex justify-center">
                <span className="px-4 py-1 bg-yellow-400 text-black rounded-full text-xs font-bold">
                  ⭐ Alumni
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            
            <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">
              Complete Your Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {Object.keys(formData).map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  required={field !== "achievements"}
                />
              ))}

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
                  Submit
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