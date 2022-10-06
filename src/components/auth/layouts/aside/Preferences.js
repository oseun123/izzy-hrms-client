import React from "react";
import { Link } from "react-router-dom";

import { useShallowEqualSelector } from "../../../../hooks";
import {
  preferencespermissions,
  preferencesRolespermissions,
  preferencesDepartmentpermissions,
} from "../../../../store/selectors/userSelectors";

function Preferences() {
  const root_permissions = useShallowEqualSelector(preferencespermissions);
  const roles_permissions = useShallowEqualSelector(
    preferencesRolespermissions
  );
  const department_permissions = useShallowEqualSelector(
    preferencesDepartmentpermissions
  );

  if (
    root_permissions?.length ||
    roles_permissions?.length ||
    department_permissions
  ) {
    return (
      <li className="nav-item has-treeview">
        <Link to={() => false} className="nav-link">
          <i className="nav-icon fas fa-user-cog" />
          <p>
            Preferences
            <i className="right fas fa-angle-left" />
          </p>
        </Link>
        <ul className="nav nav-treeview">
          {/* root  */}
          {root_permissions?.map((item) => {
            return (
              <li className="nav-item" key={item.id}>
                <Link to={item.url} className="nav-link dont-close ">
                  <i className="far fa-circle nav-icon dont-close  fa-rd" />
                  <p className="dont-close">{item.name}</p>
                </Link>
              </li>
            );
          })}

          {/* roles */}

          {roles_permissions.length ? (
            <>
              <li className="nav-item has-treeview">
                <Link to={() => false} className="nav-link ">
                  <i className="far fa-circle nav-icon fa-rd " />
                  <p>
                    {roles_permissions[0].module}
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {roles_permissions.map((role_perm) => {
                    return (
                      <li className="nav-item" key={role_perm.id}>
                        <Link
                          to={role_perm.url}
                          className="nav-link dont-close"
                        >
                          <i className="far fa-dot-circle nav-icon fa-rd dont-close" />
                          <p className="dont-close">{role_perm.name}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </>
          ) : null}

          {/* department */}

          {department_permissions.length ? (
            <>
              <li className="nav-item has-treeview">
                <Link to={() => false} className="nav-link ">
                  <i className="far fa-circle nav-icon fa-rd " />
                  <p>
                    {department_permissions[0].module}
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {department_permissions.map((dept_perm) => {
                    return (
                      <li className="nav-item" key={dept_perm.id}>
                        <Link
                          to={dept_perm.url}
                          className="nav-link dont-close"
                        >
                          <i className="far fa-dot-circle nav-icon fa-rd dont-close" />
                          <p className="dont-close">{dept_perm.name}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </>
          ) : null}
        </ul>
      </li>
    );
  } else {
    return null;
  }
}

export default React.memo(Preferences);
