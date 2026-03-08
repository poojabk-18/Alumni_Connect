import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import Alumni from "./Alumni.jsx";
import About from "./About.jsx";  // New import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />  {/* New route */}
        <Route path="/login" element={<div className="p-8 text-center">Login Page Coming Soon</div>} />
        <Route path="/alumni" element={<Alumni />} />
      </Routes>
    </Router>
  );
}

export default App;
