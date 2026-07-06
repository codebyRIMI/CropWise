
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "../scss/sidebar.scss";

import {
  Home,
  Lightbulb,
  CloudSun,
  FlaskConical,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart2,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // User State
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
  });

  // Close sidebar when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Fetch latest user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const access = localStorage.getItem("access");

        if (!access) return;

    const response = await axios.get(
        "http://127.0.0.1:8000/api/profiles/profile",
        {
       headers: {
       Authorization: `Bearer ${access}`,
    },
      }
     );
        setUser(response.data);

        localStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );
      } catch (error) {
        console.log("Unable to fetch profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Logout
  const handleLogout = async () => {
    setMenuOpen(false);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/auth/logout/",
        {
          refresh: localStorage.getItem("refresh"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      navigate("/", {
        replace: true,
      });
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}

      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        {/* Logo */}

        <div className="top-section">
          <h2 className="logo">🌱 CropWise</h2>

          <p className="subtitle">Smart Agriculture</p>
        </div>

        {/* User Card */}

        <div className="user">
          <div className="avatar">
            {user?.profile_image ? (
              <img
                src={`http://127.0.0.1:8000${user.profile_image}`}
                alt="Profile"
              />
            ) : (
              (user?.first_name?.charAt(0) ||
                user?.username?.charAt(0) ||
                "U").toUpperCase()
            )}
          </div>

          <div className="userinfo">
            <p className="name">
              {user?.first_name || user?.last_name
                ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
                : user?.username || "Guest"}
            </p>

            <p className="email">
              {user?.email || "No Email"}
            </p>
          </div>
        </div>

        {/* Navigation */}

        <nav className="nav-links">
          <NavLink to="/dashboard">
            <Home size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/recommendations">
            <Lightbulb size={20} />
            <span>Recommendations</span>
          </NavLink>

          <NavLink to="/farm-records">
            <BarChart2 size={20} />
            <span>Farm Records</span>
          </NavLink>

          <NavLink to="/weather">
            <CloudSun size={20} />
            <span>Weather</span>
          </NavLink>

          <NavLink to="/soil-analysis">
            <FlaskConical size={20} />
            <span>Soil Analysis</span>
          </NavLink>
        </nav>

            {/* <NavLink to="/markets">
             <BarChart2 size={20} />
             Markets
           </NavLink> */}
         

        {/* Bottom Links */}

        <nav className="bottom-links">
          {user?.is_staff && (
            <NavLink to="/admin-dashboard">
              <User size={20} />
              <span>Admin Panel</span>
            </NavLink>
          )}

          <NavLink to="/profile">
            <User size={20} />
            <span>Profile</span>
          </NavLink>

          <NavLink to="/settings">
            <Settings size={20} />
            <span>Settings</span>
          </NavLink>

          <div
            className="logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </nav>
      </aside>
    </>
  );
}