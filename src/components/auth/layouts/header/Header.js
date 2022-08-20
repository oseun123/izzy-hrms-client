import React, { useState, useEffect } from "react";
import Spinner from "../../../helpers/Spinner";
import { logOut } from "../../../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../../../hooks";
import {
  currentUser,
  message,
  status,
  spinner,
} from "../../../../store/selectors/userSelectors";
import { Link, useHistory } from "react-router-dom";
import Message from "../../../helpers/Message";

function Header() {
  const history = useHistory();
  const { first_name, last_name } = useShallowEqualSelector(currentUser);
  const store_message = useShallowEqualSelector(message);
  const store_status = useShallowEqualSelector(status);
  const store_spinner = useShallowEqualSelector(spinner);

  const [profile, setProfile] = useState({ first_name: "", last_name: "" });
  const dispatch = useDispatch();
  function logOutUser(e) {
    e.preventDefault();
    logOut(dispatch);
  }
  function goBack(e) {
    e.preventDefault();
    history.goBack();
  }
  function goForward(e) {
    e.preventDefault();
    history.goForward();
  }
  useEffect(() => {
    setProfile((current) => ({ ...current, first_name, last_name }));
  }, [first_name, last_name]);
  return (
    <>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {store_message && store_status ? (
          <Message message={store_message} status={store_status} />
        ) : null}
        {/* Left navbar links */}
        <ul className="navbar-nav">
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
          <li className="nav-item  d-sm-inline-block ">
            <Link onClick={goBack} to="#!" className="nav-link" title="Go back">
              <i className="fas fa-arrow-left text-secondary   "></i>
            </Link>
          </li>
          <li className="nav-item  d-sm-inline-block">
            <Link
              onClick={goForward}
              to="#!"
              className="nav-link"
              title="Go forward"
            >
              <i className="fas fa-arrow-right text-secondary"></i>
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to="/" className="nav-link" title="My dashboard">
              <i className="fas fa-tachometer-alt text-secondary  "></i>
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link to={() => false} className="nav-link" title="Change Password">
              <i className="fas fa-unlock-alt text-secondary" />
            </Link>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <Link
              to={() => false}
              onClick={logOutUser}
              className="nav-link"
              title="Logout"
            >
              <i className="fas fa-sign-out-alt text-secondary" />
            </Link>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          {/* Notifications Dropdown Menu */}
          {store_spinner ? <Spinner color="secondary" /> : null}
          <li className="nav-item dropdown">
            <Link className="nav-link" data-toggle="dropdown" to={() => false}>
              {profile.last_name?.toUpperCase()}{" "}
              {profile.first_name?.toUpperCase()} <i className="far fa-user" />
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
export default React.memo(Header);
