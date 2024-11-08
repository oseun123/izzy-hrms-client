import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import Preferences from "./Preferences";
import HumanResource from "./HumanResource";
import { useShallowEqualSelector } from "../../../../hooks";
import {
  currentUser,
  current_cleint,
} from "../../../../store/selectors/userSelectors";
import { capitalizeFirstLetter } from "../../../../util/helpers";
import $ from "jquery";

function Aside() {
  const { first_name, last_name } = useShallowEqualSelector(currentUser);
  const currentCleint = useShallowEqualSelector(current_cleint);

  const sidebar_variant = JSON.parse(currentCleint?.settings)[0]?.display
    ?.sidebar_variant;
  const brand_variant = JSON.parse(currentCleint?.settings)[0]?.display
    ?.brand_variant;

  const [profile, setProfile] = useState({ first_name: "", last_name: "" });
  function handleClick(e) {
    let parent = e.target.closest(".has-treeview");
    let child = e.target.closest(".has-treeview ").children[1];

    let grandparent = $("#grandparent");

    grandparent.find("a.active").removeClass("active");

    if (parent && parent.classList.contains("menu-open")) {
      if (
        (e.target.tagName === "P" &&
          e.target.classList.contains("dont-close")) ||
        (e.target.tagName === "A" &&
          e.target.classList.contains("dont-close")) ||
        (e.target.tagName === "I" && e.target.classList.contains("dont-close"))
      ) {
        if (parent.parentNode.parentNode.closest(".has-treeview")) {
          parent.parentNode.parentNode
            .closest(".has-treeview")
            .children[0].classList.add("active");
        } else {
          parent.children[0].classList.add("active");
        }
        return false;
      }
      parent.classList.remove("menu-open");
      child.style.display = "none";

      if (parent.parentNode.parentNode.closest(".has-treeview")) {
        parent.parentNode.parentNode
          .closest(".has-treeview")
          .children[0].classList.add("active");
      } else {
        parent.children[0].classList.add("active");
      }
    } else {
      parent.classList.add("menu-open");
      child.style.display = "block";

      if (parent.parentNode.parentNode.closest(".has-treeview")) {
        parent.parentNode.parentNode
          .closest(".has-treeview")
          .children[0].classList.add("active");
      } else {
        parent.children[0].classList.add("active");
      }
    }
  }

  useEffect(() => {
    setProfile((prev) => ({ ...prev, first_name, last_name }));
  }, [first_name, last_name]);

  return (
    <>
      {/* Main Sidebar Container */}
      <aside
        className={`main-sidebar   ${
          sidebar_variant || "sidebar-dark-primary"
        }  elevation-4`}
      >
        {/* Brand Logo */}
        <Link to="#" className={`brand-link ${brand_variant}  `}>
          <img
            src="../../dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="brand-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="brand-text font-weight-light">
            <b>Izzy</b>HRMS
          </span>
        </Link>
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
              <Link to="/" className="d-block">
                {capitalizeFirstLetter(profile?.last_name)}{" "}
                {capitalizeFirstLetter(profile?.first_name)}{" "}
              </Link>
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
              id="grandparent"
            >
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}

              <Dashboard />
              <HumanResource />
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

export default React.memo(Aside);
