// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children, allowedRoles }) {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // ❌ not logged in
//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   // ❌ role not allowed
//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/home" />;
//   }

//   return children;
// }

// export default ProtectedRoute;
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = null }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ONLY redirect to login if NO TOKEN
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return children; // ✅ SHOW PAGE - token exists!
};

export default ProtectedRoute;
