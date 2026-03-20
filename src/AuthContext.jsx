import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userProfile, setUserProfile] = useState(null);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    // Load saved profile and badges
    const savedProfile = localStorage.getItem('userProfile');
    const savedBadges = localStorage.getItem('userBadges') || '[]';
    
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setUserProfile(profile);
      
      // Auto-award complete profile badge
      if (profile.college && profile.job) {
        const completeBadge = { 
          id: 'profile-complete', 
          name: 'Complete Profile', 
          icon: '⭐',
          date: new Date().toLocaleDateString()
        };
        setBadges([completeBadge]);
        localStorage.setItem('userBadges', JSON.stringify([completeBadge]));
      }
    }
    
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    }
  }, []);

  const saveProfile = (profileData) => {
    setUserProfile(profileData);
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // Award complete profile badge
    const completeBadge = { 
      id: 'profile-complete', 
      name: 'Complete Profile', 
      icon: '⭐',
      date: new Date().toLocaleDateString()
    };
    
    if (!badges.find(b => b.id === 'profile-complete')) {
      const newBadges = [...badges, completeBadge];
      setBadges(newBadges);
      localStorage.setItem('userBadges', JSON.stringify(newBadges));
    }
  };

  const addAlumniBadge = () => {
    const alumniBadge = { 
      id: 'alumni-added', 
      name: 'First Alumni Profile', 
      icon: '🎓',
      date: new Date().toLocaleDateString()
    };
    
    if (!badges.find(b => b.id === 'alumni-added')) {
      const newBadges = [...badges, alumniBadge];
      setBadges(newBadges);
      localStorage.setItem('userBadges', JSON.stringify(newBadges));
    }
  };

  const value = {
    userProfile,
    badges,
    saveProfile,
    addAlumniBadge
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
