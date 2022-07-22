import React from "react";
import Dashboard from "./Dashboard";
import Preferences from "./Preferences";
function Aside() {
  function handleClick(e) {
    let parent = e.target.closest(".has-treeview");
    let child = e.target.closest(".has-treeview ").children[1];
    if (parent && parent.classList.contains("menu-open")) {
      if (
        (e.target.tagName === "P" &&
          e.target.classList.contains("dont-close")) ||
        (e.target.tagName === "A" &&
          e.target.classList.contains("dont-close")) ||
        (e.target.tagName === "I" && e.target.classList.contains("dont-close"))
      ) {
        return false;
      }
      parent.classList.remove("menu-open");
      child.style.display = "none";
    } else {
      parent.classList.add("menu-open");
      child.style.display = "block";
    }
  }
  return (
    <>
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="../../index3.html" className="brand-link">
          <img
            src="../../dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">
            <b>Izzy</b>HRMS
          </span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src="../../dist/img/user2-160x160.jpg"
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            <div className="info">
              <a href={() => false} className="d-block">
                Alexander Pierce
              </a>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column nav-child-indent"
              // data-widget="treeview"
              role="menu"
              data-accordion="false"
              onClick={handleClick}
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

              <Dashboard />
              <Preferences />
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
      {/* Content Wrapper. Contains page content */}
    </>
  );
}

export default Aside;
