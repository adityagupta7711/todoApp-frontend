import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    navigate("/"); // redirect to login
  };

  return (
    <nav className="navbar">
      <h2>Notes App</h2>

      <div className="nav-actions">
        {token ? (
          <>
          <span style={{ marginRight: "10px" }}>
          👋 Hi, <b>{userName}</b>
          </span>
          <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/")}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
