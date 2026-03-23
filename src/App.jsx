
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Alumni from "./Alumni.jsx";
import About from "./About.jsx";
import AlumniDetail from "./AlumniDetail.jsx";
import Profile from "./Profile.jsx";
import Dashboard from "./Dashboard.jsx";
import CreatePost from "./CreatePost.jsx";
import FeedPage from "./FeedPage.jsx";  


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/login" element={<div className="p-8 text-center">Login Coming Soon</div>} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/alumni/:id" element={<AlumniDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />     {/* ✅ KEEP THIS */} 
        <Route path="/feed" element={<FeedPage />} />  // Different route! 
      </Routes>
    </Router>
  );
}

export default App;