import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function AlumniDetail() {
  const { id } = useParams();
  const [alum, setAlum] = useState(null);

  // Mock data - replace with API later
  useEffect(() => {
    const mockAlumni = [
      { id: 1, name: "Mukesh Chettri", profession: "Software Engineer", skills: "React, Node.js", college: "2023", email: "mukesh@example.com", linkedin: "linkedin.com/in/mukesh", achievements: "Led 3 workshops, Built queue system, Google Summer of Code", certificates: ["cert1.jpg", "cert2.pdf"], projects: ["Queue Management System", "Alumni Connect"] }
    ];
    setAlum(mockAlumni.find(a => a.id == id));
  }, [id]);

  if (!alum) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-300 to-gray-200 py-12 px-4 font-[Poppins]">
      <div className="max-w-4xl mx-auto">
        <Link to="/alumni" className="inline-flex items-center gap-2 text-teal-800 font-semibold text-xl hover:underline mb-12">
          ← Back to Alumni
        </Link>
        
        <div className="bg-white rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-5xl">👤</span>
            </div>
            <h1 className="text-4xl font-bold text-teal-700 mb-2">{alum.name}</h1>
            <p className="text-2xl text-teal-600 mb-6">{alum.profession}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold text-teal-700 mb-4">Contact</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">📧</span>
                  <a href={`mailto:${alum.email}`} className="hover:text-teal-600">{alum.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600">💼</span>
                  <a href={`https://${alum.linkedin}`} target="_blank" className="hover:text-teal-600">{alum.linkedin}</a>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-teal-700 mb-4">Skills & Education</h3>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Skills:</span> {alum.skills}</p>
                <p><span className="font-semibold">College:</span> {alum.college}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-teal-700 mb-6">Achievements & Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {alum.projects.map((project, i) => (
                <div key={i} className="bg-teal-50 p-6 rounded-2xl">
                  <h4 className="font-semibold text-teal-700 mb-2">{project}</h4>
                  <p className="text-sm text-gray-600">View project details</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex gap-4 justify-center">
            <Link to="/alumni" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-bold transition">
              Connect Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumniDetail;
