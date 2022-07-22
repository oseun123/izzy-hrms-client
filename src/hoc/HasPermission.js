import React, { useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userhaspermission } from "../store/selectors/userSelectors";

function HasPermission({ component: Component, permission, ...rest }) {
  const dispatch = useDispatch();
  const memoUserpermission = useMemo(userhaspermission, []);
  const hasper = useSelector((state) => memoUserpermission(state, permission));
  return (
    <Route
      {...rest}
      render={(props) => {
        if (hasper) {
          return <Component {...props} />;
        } else {
          dispatch({ type: "CLEAR_USERS_ERRORS" });
          window.setTimeout(() => {
            dispatch({ type: "NOT_AUTHORIZED" });
          }, 500);
          return <Redirect to="/" />;
        }
      }}
    />
  );
}

export default HasPermission;
