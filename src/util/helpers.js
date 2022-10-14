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

function getAppSubdomain() {
  const host = window.location.host;
  const subdomain = host.split(".")[0];
  return host !== subdomain ? subdomain : null;
}
export {
  capitalizeFirstLetter,
  filtered_permissions,
  isForbiddden,
  getAppSubdomain,
};
