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
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = null }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // No token → Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Specific role required?
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
