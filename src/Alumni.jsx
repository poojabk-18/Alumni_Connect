import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

function Alumni() {
  const { addAlumniBadge } = useAuth();

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

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8001/api/alumni-profile"
      );

      setAlumniList(res.data.alumniProfiles || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8001/api/alumni-profile",
        {
          ...formData,
          linked_in: formData.linkedin,
        }
      );

      addAlumniBadge();

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

      fetchAlumni();

      alert("Profile added!");
    } catch (error) {
      console.error(error);
      alert("Error saving data");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-300 to-gray-200 py-16 px-10 font-[Poppins]">

      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-12">

          <Link
            to="/home"
            className="text-teal-900 font-semibold text-lg hover:underline"
          >
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-teal-900">
            Find Your Nexus Mentor
          </h1>

          <div className="w-[140px]" />

        </div>

        {/* Top Bar */}
        <div className="bg-white rounded-2xl shadow-md px-8 py-6 flex flex-wrap gap-6 justify-between items-center mb-14">

          <div className="flex items-center gap-3">

            <span className="font-medium text-gray-700">
              Industry
            </span>

            <select className="border rounded-lg px-4 py-2">

              <option>Tech</option>
              <option>Finance</option>
              <option>Design</option>

            </select>

          </div>

          <div className="bg-yellow-300 text-yellow-900 px-5 py-2 rounded-full font-semibold text-sm">
            Get matched in 30s • {alumniList.length} Active
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-teal-700 hover:bg-teal-800 text-white px-7 py-3 rounded-full font-semibold shadow-lg transition"
          >
            + Add Profile
          </button>

        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

          {alumniList.map((alum) => (

            <div
              key={alum._id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[300px] flex flex-col justify-between text-center"
            >

              <div>

                {/* Avatar */}
                <div className="w-24 h-24 bg-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                  👤
                </div>

                <h3 className="font-bold text-lg text-teal-800 mb-2">
                  {alum.name}
                </h3>

                <p className="text-gray-600 mb-3">
                  {alum.profession}
                </p>

                <div className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm inline-block mb-4">
                  {alum.skills}
                </div>

                <p className="text-gray-500 text-sm mb-2">
                  {alum.college}
                </p>

                {alum.email && (
                  <p className="text-gray-400 text-sm">
                    {alum.email}
                  </p>
                )}

              </div>

              <span className="bg-yellow-400 px-4 py-1 rounded-full text-sm font-semibold mt-6">
                Alumni
              </span>

            </div>

          ))}

        </div>

        {/* Empty State */}
        {alumniList.length === 0 && (

          <div className="text-center py-24">

            <h3 className="text-2xl font-bold text-teal-800 mb-4">
              No Alumni Profiles Yet
            </h3>

            <button
              onClick={() => setShowModal(true)}
              className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-4 rounded-xl font-semibold shadow-lg"
            >
              Add First Profile
            </button>

          </div>

        )}

      </div>

      {/* Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">

            <h2 className="text-2xl font-bold text-teal-800 mb-6 text-center">
              Complete Your Profile
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="Profession"
                value={formData.profession}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    profession: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="Skills"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skills: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="College"
                value={formData.college}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    college: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="LinkedIn"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    linkedin: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-xl"
                required
              />

              <div className="flex gap-3 pt-4">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 bg-gray-300 hover:bg-gray-400 py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl font-semibold"
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