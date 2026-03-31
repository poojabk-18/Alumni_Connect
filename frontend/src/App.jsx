import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Alumni from "./Alumni.jsx";
import AlumniDetail from "./AlumniDetail.jsx";
import Profile from "./Profile.jsx";
import Dashboard from "./Dashboard.jsx";
import CreatePost from "./CreatePost.jsx";
import FeedPage from "./FeedPage.jsx";
import Login from "./assets/components/Login.jsx";
import Signup from "./assets/components/Signup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected - All roles */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/alumni/:id" element={<AlumniDetail />} />

        {/* Feed - Both students AND alumni */}
        <Route path="/feed" element={<ProtectedRoute><FeedPage /></ProtectedRoute>} />

        {/* Alumni ONLY */}
        <Route path="/create-post" element={<ProtectedRoute allowedRoles={["alumni"]}><CreatePost /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["alumni"]}><Profile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["alumni"]}><Dashboard /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;