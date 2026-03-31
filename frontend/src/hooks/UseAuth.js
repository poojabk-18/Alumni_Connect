import { useState, useEffect } from "react";

export const useAuth = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlumni, setIsAlumni] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);
    setIsAlumni(userRole === "alumni");
    setIsStudent(userRole === "student");
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    setIsAlumni(false);
    setIsStudent(false);
  };

  return { role, isAlumni, isStudent, isLoading, logout };
};
