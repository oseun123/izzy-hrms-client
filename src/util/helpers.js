// import Cookies from "js-cookie";
import { storage_type } from "../config";
import { notification } from "antd";

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
  "#2ecc71", // green
  "#3498db", // blue
  "#8e44ad", // purple
  "#e67e22", // orange
  "#e74c3c", // red
  "#1abc9c", // teal
  "#2c3e50", // dark blue-gray
  "#f39c12", // yellow-orange
  "#d35400", // darker orange
  "#c0392b", // dark red
  "#16a085", // dark teal
  "#27ae60", // dark green
  "#2980b9", // darker blue
  "#34495e", // blue-gray
  "#7f8c8d", // gray
  "#9b59b6", // medium purple
  "#d1a318", // gold
  "#af7ac5", // light purple
  "#5d6d7e", // muted blue-gray
  "#c6e9e9", // light cyan
  "#bdc3c7", // silver gray
  "#e84393", // pink
  "#6c5ce7", // dark violet
  "#00b894", // bright green
  "#fdcb6e", // soft orange-yellow
  "#e17055", // soft red-orange
  "#0984e3", // bright blue
  "#ff7675", // light red
  "#d63031", // crimson red
  "#00cec9", // light teal
  "#6c757d", // steel gray
  "#a29bfe", // soft lavender
  "#b2bec3", // light gray
  "#636e72", // charcoal gray
  "#f368e0", // light pink
  "#ff9ff3", // pastel pink
  "#5f27cd", // deep purple
  "#1e3799", // navy blue
  "#38ada9", // cool teal
  "#079992", // tropical teal
];

function notificationError(description, duration = 5) {
  notification.error({
    message: "Oops! something went wrong",
    description: description,
    duration,
    placement: "top",
  });
}

function notificationSuccess(description, duration = 560) {
  notification.success({
    message: "Success",
    description: description,
    duration,
    placement: "top",
  });
}

function formatNumbers(number) {
  if (number.toString().length > 0) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return "";
  }
}

export {
  capitalizeFirstLetter,
  filtered_permissions,
  isForbiddden,
  getAppSubdomain,
  arrayWithColors,
  notificationError,
  formatNumbers,
  notificationSuccess,
};
