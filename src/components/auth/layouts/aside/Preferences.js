import React from "react";
import { Link } from "react-router-dom";

import { useShallowEqualSelector } from "../../../../hooks";
import {
  preferencespermissions,
  preferencesRolespermissions,
  preferencesDepartmentpermissions,
  preferencesGenderpermissions,
  preferencesStatepermissions,
  preferencesCountrypermissions,
  preferencesCompanypermissions,
  preferencesBranchpermissions,
} from "../../../../store/selectors/userSelectors";

function Preferences() {
  const root_permissions = useShallowEqualSelector(preferencespermissions);
  const roles_permissions = useShallowEqualSelector(
    preferencesRolespermissions
  );
  const department_permissions = useShallowEqualSelector(
    preferencesDepartmentpermissions
  );
  const gender_permissions = useShallowEqualSelector(
    preferencesGenderpermissions
  );
  const state_permissions = useShallowEqualSelector(
    preferencesStatepermissions
  );
  const country_permissions = useShallowEqualSelector(
    preferencesCountrypermissions
  );
  const company_permissions = useShallowEqualSelector(
    preferencesCompanypermissions
  );
  const branch_permissions = useShallowEqualSelector(
    preferencesBranchpermissions
  );

  if (
    root_permissions?.length ||
    roles_permissions?.length ||
    department_permissions?.length ||
    gender_permissions?.length ||
    state_permissions?.length ||
    country_permissions?.length ||
    company_permissions?.length ||
    branch_permissions?.length
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
          {/* gender*/}

          {gender_permissions.length ? (
            <>
              <li className="nav-item has-treeview">
                <Link to={() => false} className="nav-link ">
                  <i className="far fa-circle nav-icon fa-rd " />
                  <p>
                    {gender_permissions[0].module}
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {gender_permissions.map((gender_perm) => {
                    return (
                      <li className="nav-item" key={gender_perm.id}>
                        <Link
                          to={gender_perm.url}
                          className="nav-link dont-close"
                        >
                          <i className="far fa-dot-circle nav-icon fa-rd dont-close" />
                          <p className="dont-close">{gender_perm.name}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </>
          ) : null}

          {/* state*/}

          {state_permissions.length ? (
            <>
              <li className="nav-item has-treeview">
                <Link to={() => false} className="nav-link ">
                  <i className="far fa-circle nav-icon fa-rd " />
                  <p>
                    {state_permissions[0].module}
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {state_permissions.map((state_perm) => {
                    return (
                      <li className="nav-item" key={state_perm.id}>
                        <Link
                          to={state_perm.url}
                          className="nav-link dont-close"
                        >
                          <i className="far fa-dot-circle nav-icon fa-rd dont-close" />
                          <p className="dont-close">{state_perm.name}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </>
          ) : null}

          {/* country*/}

          {country_permissions.length ? (
            <>
              <li className="nav-item has-treeview">
                <Link to={() => false} className="nav-link ">
                  <i className="far fa-circle nav-icon fa-rd " />
                  <p>
                    {country_permissions[0].module}
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {country_permissions.map((country_perm) => {
                    return (
                      <li className="nav-item" key={country_perm.id}>
                        <Link
                          to={country_perm.url}
                          className="nav-link dont-close"
                        >
                          <i className="far fa-dot-circle nav-icon fa-rd dont-close" />
                          <p className="dont-close">{country_perm.name}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </>
          ) : null}

          {/* company*/}

          {company_permissions.length ? (
            <>
              <li className="nav-item has-treeview">
                <Link to={() => false} className="nav-link ">
                  <i className="far fa-circle nav-icon fa-rd " />
                  <p>
                    {company_permissions[0].module}
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {company_permissions.map((company_perm) => {
                    return (
                      <li className="nav-item" key={company_perm.id}>
                        <Link
                          to={company_perm.url}
                          className="nav-link dont-close"
                        >
                          <i className="far fa-dot-circle nav-icon fa-rd dont-close" />
                          <p className="dont-close">{company_perm.name}</p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </>
          ) : null}

          {/* branch*/}

          {branch_permissions.length ? (
            <>
              <li className="nav-item has-treeview">
                <Link to={() => false} className="nav-link ">
                  <i className="far fa-circle nav-icon fa-rd " />
                  <p>
                    {branch_permissions[0].module}
                    <i className="right fas fa-angle-left" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  {branch_permissions.map((branch_perm) => {
                    return (
                      <li className="nav-item" key={branch_perm.id}>
                        <Link
                          to={branch_perm.url}
                          className="nav-link dont-close"
                        >
                          <i className="far fa-dot-circle nav-icon fa-rd dont-close" />
                          <p className="dont-close">{branch_perm.name}</p>
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
