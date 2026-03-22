import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left px-2 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium flex items-center gap-2 transition-all duration-200"
    >
      🚪 Logout
    </button>
  );
};

export default LogoutButton;
