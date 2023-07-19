import React from "react";
import "./common.css";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
const navigate= useNavigate()
  const removeClass = () => {
    document.getElementById("togglesidebar").classList.remove("active_sidebar");
  };

  return (
    <>
    
      <div id="sidebar">
        <div className="sidebar_logo">
          
          <img src={require("../assets/images/logo.svg").default} alt="logo" />
          <i className="fa fa-close" onClick={removeClass}></i>
          
        </div>
        <div className="sidebar_menu">
          <ul className="m-0 p-0">
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={removeClass}
              >
                <img
                  src={require("../assets/images/home.svg").default}
                  alt="home"
                />
                Home
              </Link>
            </li>
            {/* <li>
              <Link
                to="/dashboard"
                className={location.pathname === "/dashboard" ? "active" : ""}
                onClick={removeClass}
              >
                <img
                  src={require("../assets/images/dashboard.svg").default}
                  alt="dashboard"
                />
                Dashboard
              </Link>
            </li> */}
            <li>
              <Link
                to="/users"
                className={location.pathname === "/users" ? "active" : ""}
                onClick={removeClass}
              >
                <img
                  src={require("../assets/images/users.svg").default}
                  alt="users"
                />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                className={location.pathname === "/category" ? "active" : ""}
                onClick={removeClass}
              >
                <img
                  src={require("../assets/images/calendar.svg").default}
                  alt="category"
                />
                Category
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={location.pathname === "/products" ? "active" : ""}
                onClick={removeClass}
              >
                <img
                  src={require("../assets/images/projects.svg").default}
                  alt="projects"
                />
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/vendors"
                className={location.pathname === "/vendors" ? "active" : ""}
                onClick={removeClass}
              >
                <img
                  src={require("../assets/images/vendor.png")}
                  alt="help"
                />
                Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/banners"
                className={location.pathname === "/banners" ? "active" : ""}
                onClick={removeClass}
              >
                <img
                  src={require("../assets/images/banner1.png")}
                  alt="help"
                />
                Banners
              </Link>
            </li>
            <li>
              <Link
                to="/restaurants"
                className={location.pathname === "/restaurants" ? "active" : ""}
                onClick={removeClass}
              >
                <img
                  src={require("../assets/images/banner1.png")}
                  alt="help"
                />
                Restaurants
              </Link>
            </li>
            <li>
              <Link
                to="/vendors"
                className={location.pathname === "" ? "active" : ""}
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate('/login')
                }}
              >
                <img
                  src={require("../assets/images/logout.png")}
                  alt="help"
                />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar_overlay" onClick={removeClass}></div>
    </>
  );
};
export default Sidebar;
