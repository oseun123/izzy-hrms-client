import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuth({ component: Component, ...rest }) {
  const { is_Loggedin } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !is_Loggedin ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}

export default RequireAuth;
