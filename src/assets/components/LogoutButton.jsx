import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold text-lg transition-all flex items-center gap-1"
    >
      🚪 Logout
    </button>
  );
}

export default LogoutButton;
