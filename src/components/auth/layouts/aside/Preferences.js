import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { preferencespermissions } from "../../../../store/selectors/userSelectors";

function Preferences() {
  const permissions = useSelector(preferencespermissions);
  // console.log(permissions);

  if (permissions?.length) {
    return (
      <li className="nav-item has-treeview">
        <a href={() => false} className="nav-link">
          <i className="nav-icon fas fa-tachometer-alt" />
          <p>
            Preferences
            <i className="right fas fa-angle-left" />
          </p>
        </a>
        <ul className="nav nav-treeview">
          {permissions?.map((item) => {
            return (
              <li className="nav-item" key={item.id}>
                <Link to="/ok" className="nav-link dont-close ">
                  <i className="far fa-circle nav-icon dont-close" />
                  <p className="dont-close">{item.name}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    );
  } else {
    return null;
  }
}

export default Preferences;
