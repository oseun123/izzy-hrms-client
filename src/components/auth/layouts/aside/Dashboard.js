import React from "react";
import { Link } from "react-router-dom";
import { useShallowEqualSelector } from "../../../../hooks";
import { dashboardpermissions } from "../../../../store/selectors/userSelectors";

function Dashboard() {
  const permissions = useShallowEqualSelector(dashboardpermissions);

  if (permissions?.length) {
    return (
      <li className="nav-item has-treeview">
        <Link to={() => false} className="nav-link">
          <i className="nav-icon fas fa-tachometer-alt" />
          <p>
            Dashboard
            <i className="right fas fa-angle-left" />
          </p>
        </Link>
        <ul className="nav nav-treeview">
          {permissions?.map((item) => {
            return (
              <li className="nav-item" key={item.id}>
                <Link to={item.url} className="nav-link dont-close ">
                  <i className="far fa-circle nav-icon dont-close fa-rd" />
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

export default React.memo(Dashboard);
