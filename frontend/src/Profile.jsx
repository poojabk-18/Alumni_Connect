import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Profile() {
  const { saveProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    skills: "",
    college: "",
    year: "",
    email: "",
    linkedin: "",
    achievements: "",
    optionalLinks: "",
    profilePicture: null,
    picturePreview: ""
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [profileAdded, setProfileAdded] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);

  // **KEY: Load profile from sessionStorage on mount**
  useEffect(() => {
    const saved = sessionStorage.getItem('tempProfile');
    if (saved) {
      const profile = JSON.parse(saved);
      setCurrentProfile(profile);
      setProfileAdded(true);
      // Reset form for new additions
      setFormData({
        name: "", profession: "", skills: "", college: "", year: "",
        email: "", linkedin: "", achievements: "", optionalLinks: "",
        profilePicture: null, picturePreview: ""
      });
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profilePicture: file,
          picturePreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProfile = {
      id: Date.now(),
      ...formData,
      hasBadge: true,
      badgeEarnedDate: new Date().toLocaleDateString()
    };
    
    // Save to AuthContext for badge
    saveProfile(newProfile);
    
    // **KEY: Save to sessionStorage (persists during session)**
    sessionStorage.setItem('tempProfile', JSON.stringify(newProfile));
    
    setCurrentProfile(newProfile);
    setProfileAdded(true);
    setShowAddModal(false);
    alert('🎉 Profile added! Badge awarded!');
  };

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #fafa73,#fafa85, #41faea)', padding: '2rem'}}>
      <Link to="/" style={{color: '#008080', fontSize: '1.25rem', fontWeight: 'bold', textDecoration: 'none'}}>← Back to Home</Link>
      
      <div style={{maxWidth: '800px', margin: '2rem auto'}}>
        {/* Header */}
        <div style={{background: 'rgba(255,255,255,0.95)', padding: '2.5rem', borderRadius: '24px', marginBottom: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', textAlign: 'center'}}>
          <h1 style={{fontSize: '2.8rem', color: '#0f766e', marginBottom: '1rem'}}>
            👤 Your Profile
          </h1>
          
          {!profileAdded ? (
            <>
              <p style={{color: '#6b7280', fontSize: '1.25rem', marginBottom: '2.5rem'}}>
                Add your alumni profile to earn a badge!
              </p>
              <button 
                onClick={() => setShowAddModal(true)}
                style={{
                  padding: '1.5rem 4rem', background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white', border: 'none', borderRadius: '50px', fontSize: '1.3rem', fontWeight: 'bold',
                  boxShadow: '0 15px 35px rgba(16,185,129,0.4)', cursor: 'pointer'
                }}
              >
                ➕ Add Profile
              </button>
            </>
          ) : (
            <>
              <p style={{color: '#059669', fontSize: '1.25rem', marginBottom: '1.5rem'}}>
                ✅ Profile added successfully!
              </p>
              <div style={{marginBottom: '1rem', fontSize: '1.1rem', color: '#6b7280'}}>
              </div>
            </>
          )}
        </div>

        {/* Current Profile Display */}
        {profileAdded && currentProfile && (
          <div style={{background: 'rgba(255,255,255,0.95)', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', marginBottom: '2rem'}}>
            {/* Profile Header */}
            <div style={{display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem'}}>
              <div>
                <div style={{
                  width: '140px', height: '140px', borderRadius: '50%', 
                  backgroundImage: currentProfile.picturePreview ? `url(${currentProfile.picturePreview})` : 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  border: '6px solid white', boxShadow: '0 15px 40px rgba(0,0,0,0.2)'
                }}>
                  {!currentProfile.picturePreview && <span style={{fontSize: '3.5rem', lineHeight: '140px', textAlign: 'center'}}>👤</span>}
                </div>
              </div>
              
              <div style={{flex: 1}}>
                <h2 style={{fontSize: '2.5rem', color: '#0f766e', margin: '0 0 0.25rem 0'}}>
                  {currentProfile.name}
                </h2>
                <p style={{fontSize: '1.4rem', color: '#14b8a6', margin: '0 0 0.5rem 0'}}>
                  {currentProfile.profession}
                </p>
                <p style={{color: '#6b7280', fontSize: '1.1rem', margin: 0}}>
                  {currentProfile.college} • Class of {currentProfile.year}
                </p>
              </div>
            </div>

            {/* Profile Details */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem'}}>
              {/* Skills */}
              <div>
                <strong style={{color: '#374151', display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem'}}>🛠️ Skills</strong>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                  {currentProfile.skills.split(',').map((skill, idx) => (
                    <span key={idx} style={{
                      background: '#e0f2fe', padding: '0.5rem 1.2rem', borderRadius: '25px', 
                      fontSize: '0.95rem', color: '#0369a1', fontWeight: '500'
                    }}>
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Contact */}
              <div>
                <strong style={{color: '#374151', display: 'block', marginBottom: '0.75rem', fontSize: '1.1rem'}}>📧 Contact</strong>
                <div style={{fontSize: '1rem'}}>
                  📧 <a href={`mailto:${currentProfile.email}`} style={{color: '#0ea5e9'}}>{currentProfile.email}</a>
                  {currentProfile.linkedin && (
                    <div style={{marginTop: '0.75rem'}}>
                      💼 <a href={currentProfile.linkedin} target="_blank" style={{color: '#0ea5e9'}}>LinkedIn Profile</a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* ACHIEVEMENTS */}
              {currentProfile.achievements && (
                <div style={{gridColumn: '1 / -1', background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', padding: '1.5rem', borderRadius: '16px', borderLeft: '5px solid #10b981'}}>
                  <strong style={{color: '#166534', display: 'block', marginBottom: '1rem', fontSize: '1.2rem'}}>
                    🏆 Key Achievements & Projects
                  </strong>
                  <div style={{color: '#065f46', lineHeight: '1.7', fontSize: '1.05rem'}}>
                    {currentProfile.achievements}
                  </div>
                </div>
              )}
              
              {/* Portfolio */}
              {currentProfile.optionalLinks && (
                <div style={{gridColumn: '1 / -1', textAlign: 'center'}}>
                  <strong style={{color: '#374151', display: 'block', marginBottom: '1rem', fontSize: '1.1rem'}}>🌐 Portfolio</strong>
                  <a href={currentProfile.optionalLinks} target="_blank" style={{
                    display: 'inline-block', padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
                    color: 'white', textDecoration: 'none', borderRadius: '25px', fontWeight: '600', fontSize: '1.1rem'
                  }}>
                    View Projects/Proof
                  </a>
                </div>
              )}
            </div>

            {/* Badge */}
            <div style={{
              marginTop: '3rem', padding: '2.5rem', background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              border: '4px solid #f59e0b', borderRadius: '24px', textAlign: 'center',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px',
                background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <span style={{fontSize: '2rem', color: 'white'}}>⭐</span>
              </div>
              <h3 style={{fontSize: '2rem', color: '#92400e', margin: '0 0 0.5rem 0'}}>
                Complete Profile Badge
              </h3>
              <p style={{fontSize: '1.3rem', color: '#92400e', margin: 0}}>
                Earned: <strong>{currentProfile.badgeEarnedDate}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Dashboard Link */}
        {profileAdded && (
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <Link to="/dashboard" style={{
              padding: '1.25rem 3rem', background: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
              color: 'white', textDecoration: 'none', borderRadius: '50px', fontSize: '1.2rem', fontWeight: 'bold',
              boxShadow: '0 10px 30px rgba(139,92,246,0.4)'
            }}>
              📊 View Dashboard
            </Link>
          </div>
        )}
      </div>

      {/* Modal - UNCHANGED */}
      {showAddModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 1000
        }}>
          <div style={{
            background: 'white', maxWidth: '700px', width: '100%', maxHeight: '90vh', 
            overflowY: 'auto', borderRadius: '28px', padding: '3rem', boxShadow: '0 40px 80px rgba(0,0,0,0.4)'
          }}>
            <h2 style={{fontSize: '2.2rem', color: '#0f766e', textAlign: 'center', marginBottom: '2rem'}}>
              ➕ Add Alumni Profile
            </h2>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
              <div>
                <label style={{display: 'block', fontWeight: '600', marginBottom: '0.75rem', color: '#374151'}}>👤 Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{width: '100%', padding: '1rem', border: '2px dashed #d1d5db', borderRadius: '16px', cursor: 'pointer', background: '#f9fafb'}} />
                {formData.picturePreview && <img src={formData.picturePreview} alt="Preview" style={{width: '100px', height: '100px', borderRadius: '50%', marginTop: '1rem', objectFit: 'cover', border: '3px solid #e0f2fe'}} />}
              </div>

              <input placeholder="Full Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{padding: '1.25rem', borderRadius: '16px', border: '1px solid #d1d5db', fontSize: '1.1rem'}} required />
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <input placeholder="Profession *" value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} style={{padding: '1.25rem', borderRadius: '16px', border: '1px solid #d1d5db', fontSize: '1.1rem'}} required />
                <input placeholder="Skills (React, Python)" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} style={{padding: '1.25rem', borderRadius: '16px', border: '1px solid #d1d5db', fontSize: '1.1rem'}} required />
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem'}}>
                <input placeholder="College *" value={formData.college} onChange={e => setFormData({...formData, college: e.target.value})} style={{padding: '1.25rem', borderRadius: '16px', border: '1px solid #d1d5db', fontSize: '1.1rem'}} required />
                <input placeholder="Year (2023)" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} style={{padding: '1.25rem', borderRadius: '16px', border: '1px solid #d1d5db', fontSize: '1.1rem'}} required />
              </div>

              <input type="email" placeholder="Email *" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{padding: '1.25rem', borderRadius: '16px', border: '1px solid #d1d5db', fontSize: '1.1rem'}} required />
              <input type="url" placeholder="LinkedIn (optional)" value={formData.linkedin} onChange={e => setFormData({...formData, linkedin: e.target.value})} style={{padding: '1.25rem', borderRadius: '16px', border: '1px solid #d1d5db', fontSize: '1.1rem'}} />
              
              <textarea placeholder="🏆 Achievements & Projects" value={formData.achievements} onChange={e => setFormData({...formData, achievements: e.target.value})} rows="4" style={{padding: '1.25rem', borderRadius: '16px', border: '1px solid #d1d5db', fontSize: '1.1rem', resize: 'vertical'}} />
              <input type="url" placeholder="Portfolio Link (optional)" value={formData.optionalLinks} onChange={e => setFormData({...formData, optionalLinks: e.target.value})} style={{padding: '1.25rem', borderRadius: '16px', border: '1px solid #d1d5db', fontSize: '1.1rem'}} />

              <div style={{display: 'flex', gap: '1.5rem'}}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{flex: 1, padding: '1.5rem', background: '#6b7280', color: 'white', border: 'none', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer'}}>Cancel</button>
                <button type="submit" style={{flex: 1, padding: '1.5rem', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 10px 25px rgba(16,185,129,0.4)'}}> Submit & Earn Badge</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
