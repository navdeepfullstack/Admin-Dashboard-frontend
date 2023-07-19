import React from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { useLocation } from "react-router-dom";
const Layout = (props) => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <div className="wrapper">
        <div
          className={`${location.pathname === "/login" ? "main px-0" : "main"}`}
        >
          {location.pathname === "/login" ? null : <Header />}
          {props.children}
        </div>
      </div>
    </>
  );
};
export default Layout;
