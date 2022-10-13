import { token, user_perm, storage_type } from "../../config";
// import storage_type from "js-cookie";
import { dehashData } from "../../util/hash";
import jwt_decode from "jwt-decode";
import { getApp } from "../../util/helpers";

let currentUser = {};
let subdomain = getApp() || null;

let userpermissions = [];
if (storage_type.getItem(token)) {
  const tok = dehashData(token);
  currentUser = jwt_decode(tok);
}

if (storage_type.getItem(user_perm)) {
  userpermissions = dehashData(user_perm);
}

const initState = {
  message: null,
  status: null,
  spinner: false,
  is_Loggedin: storage_type.getItem(token) ? true : false,
  currentUser,
  userpermissions,
  subdomain,
};

const userReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "NOT_AUTHORIZED":
      return {
        ...state,
        message:
          "Your are not authorized to perform this action.Kindly contact the administrator",
        status: "error",
      };
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
      let currentUser = {};
      let userpermissions = [];
      if (storage_type.getItem(token)) {
        const tok = dehashData(token);
        currentUser = jwt_decode(tok);
      }

      if (storage_type.getItem(user_perm)) {
        userpermissions = dehashData(user_perm);
      }
      // console.log(userpermissions);
      return {
        ...state,
        is_Loggedin: true,
        status: payload.status,
        message: payload.message,
        currentUser,
        userpermissions,
      };
    }

    case "GET_USER_PERMION_SUCCESS":
      return {
        ...state,
        userpermissions: [...payload.payload.userpermissions],
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
