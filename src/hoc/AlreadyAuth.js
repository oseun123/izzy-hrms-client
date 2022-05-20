import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function AlreadyAuth({ component: Component, ...rest }) {
  const { is_Loggedin } = useSelector((state) => state.user);

  //   console.log(is_Loggedin);
  return (
    <Route
      {...rest}
      render={(props) =>
        !is_Loggedin ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default AlreadyAuth;
