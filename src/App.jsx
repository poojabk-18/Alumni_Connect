import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Alumni from "./Alumni.jsx";
import About from "./About.jsx";
import AlumniDetail from "./AlumniDetail.jsx";  // New!

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<div className="p-8 text-center">Login Coming Soon</div>} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/alumni/:id" element={<AlumniDetail />} />  {/* Dynamic route */}
      </Routes>
    </Router>
  );
}

export default App;
