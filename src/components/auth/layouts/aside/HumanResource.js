import React from "react";
import { Link } from "react-router-dom";

import { useShallowEqualSelector } from "../../../../hooks";
import {
  humanresourcepermissions,
  humanresourceOnboardingpermissions,
} from "../../../../store/selectors/userSelectors";

function HumanResource() {
  const root_permissions = useShallowEqualSelector(humanresourcepermissions);
  const onboarding_permissions = useShallowEqualSelector(
    humanresourceOnboardingpermissions
  );

  if (root_permissions?.length || onboarding_permissions?.length) {
    return (
      <li className="nav-item has-treeview">
        <Link to={() => false} className="nav-link">
          <i className="nav-icon fas fa-users" />
          <p>
            Human Resource
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

          {onboarding_permissions.length ? (
            <>
              <li className="nav-item has-treeview">
                <Link to={() => false} className="nav-link ">
                  <i className="far fa-circle nav-icon fa-rd " />
                  <p>
                    {onboarding_permissions[0].module}
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {onboarding_permissions.map((onboarding_perm) => {
                    return (
                      <li className="nav-item" key={onboarding_perm.id}>
                        <Link
                          to={onboarding_perm.url}
                          className="nav-link dont-close"
                        >
                          <i className="far fa-dot-circle nav-icon fa-rd dont-close" />
                          <p className="dont-close">{onboarding_perm.name}</p>
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

export default React.memo(HumanResource);
