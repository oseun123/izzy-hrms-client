import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <li className="nav-item has-treeview">
      <a href={() => false} className="nav-link">
        <i className="nav-icon fas fa-tachometer-alt" />
        <p>
          Dashboard
          <i className="right fas fa-angle-left" />
        </p>
      </a>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <Link to="/ok" className="nav-link dont-close ">
            <i className="far fa-circle nav-icon dont-close" />
            <p className="dont-close">Dashboard v1</p>
          </Link>
        </li>
      </ul>
    </li>
  );
}

export default Dashboard;
