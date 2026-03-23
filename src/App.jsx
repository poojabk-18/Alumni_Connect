// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Home from "./Home.jsx";
// import About from "./About.jsx";
// import Alumni from "./Alumni.jsx";
// import AlumniDetail from "./AlumniDetail.jsx";
// import Profile from "./Profile.jsx";
// import Dashboard from "./Dashboard.jsx";
// import Posts from "./Posts.jsx";
// import PostPage from "./PostPage.jsx";

// import Login from "./assets/components/Login";
// import Signup from "./assets/components/Signup";
// import ProtectedRoute from "./ProtectedRoute.jsx";

// function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <Router>
//       <Routes>

//         {/* Redirect */}
//         <Route 
//           path="/" 
//           element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} 
//         />

//         {/* Auth */}
//         <Route 
//           path="/login" 
//           element={token ? <Navigate to="/home" /> : <Login />} 
//         />
//         <Route 
//           path="/signup" 
//           element={token ? <Navigate to="/home" /> : <Signup />} 
//         />

//         {/* Protected Pages */}
//         <Route path="/home" element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         } />

//         <Route path="/profile" element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         } />

//         <Route path="/posts" element={
//           <ProtectedRoute>
//             <Posts />
//           </ProtectedRoute>
//         } />

//         {/* 🔥 Only alumni can create posts */}
//         <Route path="/postpage" element={
//           <ProtectedRoute allowedRoles={["alumni"]}>
//             <PostPage />
//           </ProtectedRoute>
//         } />

//         {/* Optional */}
//         <Route path="/about" element={<About />} />
//         <Route path="/alumni" element={<Alumni />} />
//         <Route path="/alumni/:id" element={<AlumniDetail />} />
//         <Route path="/dashboard" element={<Dashboard />} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Alumni from "./Alumni.jsx";
import AlumniDetail from "./AlumniDetail.jsx";
import Profile from "./Profile.jsx";
import Dashboard from "./Dashboard.jsx";
import Posts from "./Posts.jsx";
import PostPage from "./PostPage.jsx";
import Login from "./assets/components/Login";
import Signup from "./assets/components/Signup";
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
        <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
        <Route path="/about" element={<About />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/alumni/:id" element={<AlumniDetail />} />

        {/* Alumni ONLY */}
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["alumni"]}><Profile /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["alumni"]}><Dashboard /></ProtectedRoute>} />
        <Route path="/postpage" element={<ProtectedRoute allowedRoles={["alumni"]}><PostPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
