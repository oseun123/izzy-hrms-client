// import Cookies from "js-cookie";
import { storage_type } from "../config";

function capitalizeFirstLetter(string) {
  return string?.charAt(0)?.toUpperCase() + string.slice(1);
}
function filtered_permissions(permissions) {
  return permissions?.reduce(function (r, a) {
    r[a.for] = r[a.for] || [];
    r[a.for].push(a);
    return r;
  }, Object.create(null));
}

function isForbiddden(dispatch, error, token, location = null, history = null) {
  if (error.response.status === 403) {
    storage_type.removeItem(token);
    if (location && history) {
      history.push("/login", { state: { from: location }, replace: true });
    }
    dispatch({ type: "STOP_SPINNER" });
    dispatch({
      type: "LOGOUT_USER",
      payload: {
        message: "Invalid Session. Kindly login again.",
        status: "error",
      },
    });
  }
}

function getApp() {
  const subdomain = getSubdomain(window.location.hostname);
  return subdomain;
}

function getSubdomain(location) {
  const locationspart = location.split(".");
  // let sliceTill = -2;
  console.log(locationspart);
  console.log(locationspart[0]);
  // console.log(locationspart[locationspart.length - 1]);
  // // for localhost
  // const islocalhost = locationspart[locationspart.length - 1] === "localhost";
  // if (islocalhost) sliceTill = -1;

  return locationspart[0];
}

export { capitalizeFirstLetter, filtered_permissions, isForbiddden, getApp };
