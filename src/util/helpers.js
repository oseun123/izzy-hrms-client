// import Cookies from "js-cookie";
import { storage_type } from "../config";

function capitalizeFirstLetter(string) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}
function filtered_permissions(permissions, item_key = "for") {
  return permissions?.reduce(function (r, a) {
    r[a[item_key]] = r[a[item_key]] || [];
    r[a[item_key]].push(a);
    return r;
  }, Object.create(null));
}
// function filtered_permissions2(permissions) {
//   return permissions?.reduce(function (r, a) {
//     r[a.module] = r[a.module] || [];
//     r[a.module].push(a);
//     return r;
//   }, Object.create(null));
// }

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

const arrayWithColors = [
  "#2ecc71",
  "#3498db",
  "#8e44ad",
  "#e67e22",
  "#e74c3c",
  "#1abc9c",
  "#2c3e50",
];

export {
  capitalizeFirstLetter,
  filtered_permissions,
  isForbiddden,
  getAppSubdomain,
  // filtered_permissions2,
  arrayWithColors,
};
