import { token } from "../../config";
import Cookies from "js-cookie";
import { dehashData } from "../../util/hash";
import jwt_decode from "jwt-decode";

const dehashed = dehashData();
let currentUser = {};
let userpermissions = [];
if (dehashed) {
  const { token: tok, user } = dehashData();
  currentUser = Cookies.get(token) ? jwt_decode(tok) : {};
  userpermissions = Cookies.get(token) ? user.permissions : [];
}

const initState = {
  message: null,
  status: null,
  spinner: false,
  is_Loggedin: Cookies.get(token) ? true : false,
  currentUser,
  userpermissions,
};

const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "CLEAR_USERS_ERRORS":
      return {
        ...state,
        message: null,
        status: null,
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
    case "SUCCESS_LOGIN": {
      const dehashed = dehashData();
      let currentUser = {};
      let userpermissions = [];
      if (dehashed) {
        const { token: tok, user } = dehashData();
        currentUser = Cookies.get(token) ? jwt_decode(tok) : {};
        userpermissions = Cookies.get(token) ? user.permissions : [];
      }
      return {
        ...state,
        is_Loggedin: true,
        status: payload.status,
        message: payload.message,
        currentUser,
        userpermissions,
      };
    }
    //   console.log(payload);
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
        status: payload.status,
        message: payload.message,
        spinner: false,
        currentUser: {},
        userpermissions: [],
      };
    default:
      return state;
  }
};
export default userReducer;
