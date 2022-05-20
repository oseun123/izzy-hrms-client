import { token } from "../../config";
import Cookies from "js-cookie";
const initState = {
  message: null,
  status: null,
  errors: null,
  spinner: false,
  is_Loggedin: Cookies.get(token) ? true : false,
};

const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "CLEAR_USERS_ERRORS":
      return {
        ...state,
        message: null,
        status: null,
        errors: null,
        spinner: false,
      };
    case "START_SPINNER":
      return {
        ...state,
        spinner: true,
      };
    case "STOP_SPINNER":
      return {
        ...state,
        spinner: false,
      };
    case "SUCCESS_LOGIN":
      //   console.log(payload);
      return {
        ...state,
        is_Loggedin: true,
        status: payload.status,
        message: payload.message,
      };
    case "REQUEST_PASSWORD_LINK_SUCCESS":
      //   console.log(payload);
      return {
        ...state,
        status: payload.status,
        message: payload.message,
      };
    case "RESET_PASSWORD_SUCCESS":
      //   console.log(payload);
      return {
        ...state,
        status: payload.status,
        message: payload.message,
      };
    case "ERROR_RESET_PASSWORD":
      //   console.log(payload);
      return {
        ...state,
        status: payload.status,
        message: payload.message,
      };
    case "ERROR_REQUEST_PASSWORD_LINK":
      return {
        ...state,
        status: payload.status,
        message: payload.message,
      };
    case "ERROR_SIGNUP":
      return {
        ...state,
        status: payload?.status,
        message: payload?.message,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        is_Loggedin: false,
        message: null,
        status: null,
        errors: null,
        spinner: false,
      };
    default:
      return state;
  }
};
export default userReducer;
