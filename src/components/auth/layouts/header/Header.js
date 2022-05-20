import React, { useState, useEffect } from "react";
import Spinner from "../../../helpers/Spinner";
import { logOut } from "../../../../store/actions/userActions";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { token } from "../../../../config";
import { Link } from "react-router-dom";
import { decrypt } from "../../../../util/hash";
const { REACT_APP_SALT } = process.env;
function Header() {
  const [logoutState, setLogOutState] = useState(false);
  const [profile, setProfile] = useState({ first_name: "", last_name: "" });
  const dispatch = useDispatch();
  function logOutUser(e) {
    e.preventDefault();
    setLogOutState(true);
    logOut(dispatch);
  }
  useEffect(() => {
    const tok = decrypt(REACT_APP_SALT, Cookies.get(token));
    const { first_name, last_name } = jwt_decode(tok);
    setProfile((current) => ({ ...current, first_name, last_name }));
  }, []);
  return (
    <>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        {/* <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#!"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="../../index3.html" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href={() => false} className="nav-link">
              Contact
            </a>
          </li>
        </ul> */}
        {/* SEARCH FORM */}
        {/* <form className="form-inline ml-3">
          <div className="input-group input-group-sm">
            <input
              className="form-control form-control-navbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </form> */}
        {/* Right navbar links */}

        <ul className="navbar-nav ml-auto">
          {/* Notifications Dropdown Menu */}
          {logoutState ? <Spinner color="success" /> : null}
          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to={() => false}>
              {profile.last_name.toUpperCase()}{" "}
              {profile.first_name.toUpperCase()} <i className="far fa-user" />
              <span className="badge badge-warning navbar-badge"></span>
            </Link>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">My Account</span>
              <div className="dropdown-divider" />
              <Link to={() => false} className="dropdown-item">
                <i className="fas fa-unlock-alt mr-2" /> Change password
              </Link>
              <div className="dropdown-divider" />
              <Link
                to={() => false}
                className="dropdown-item"
                onClick={logOutUser}
              >
                <i className="fas fa-sign-out-alt mr-2" /> Logout
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
    </>
  );
}
export default Header;
