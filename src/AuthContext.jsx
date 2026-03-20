import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState([]);

  // Load auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    const savedBadges = localStorage.getItem('userBadges') || '[]';
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
    setBadges(JSON.parse(savedBadges));
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Register
  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setIsLoggedIn(true);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userBadges');
    setUser(null);
    setIsLoggedIn(false);
    setBadges([]);
  };

  // Save profile (existing)
  const saveProfile = (profileData) => {
    const updatedUser = { ...user, profile: profileData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    // Profile complete badge
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

  // Alumni badge
  const addAlumniBadge = () => {
    const alumniBadge = { 
      id: 'alumni-added', 
      name: 'First Alumni Profile', 
      icon: '🎓',
      date: new Date().toLocaleDateString()
    };
    
    if (!badges.find(b => b.id === 'alumni-added') && user) {
      const newBadges = [...badges, alumniBadge];
      setBadges(newBadges);
      localStorage.setItem('userBadges', JSON.stringify(newBadges));
    }
  };

  // Post badge
  const addPostBadge = () => {
    const postBadge = { 
      id: 'first-post', 
      name: 'First Post Published', 
      icon: '📝',
      date: new Date().toLocaleDateString()
    };
    
    if (!badges.find(b => b.id === 'first-post') && user) {
      const newBadges = [...badges, postBadge];
      setBadges(newBadges);
      localStorage.setItem('userBadges', JSON.stringify(newBadges));
    }
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    badges,
    login,
    register,
    logout,
    saveProfile,
    addAlumniBadge,
    addPostBadge
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
