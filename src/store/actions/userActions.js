import Cookies from "js-cookie";
import { token } from "../../config";
import { hashData, dehashData } from "../../util/hash";

import {
  publicRequest,
  privateRequest,
  privateRequestGet,
} from "../../requestMethods";
import { useQuery } from "react-query";

export const resetUsersState = (dispatch) => {
  dispatch({ type: "CLEAR_USERS_ERRORS" });
};

export const login = async (dispatch, user, history) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    const result = await publicRequest.post("/api/auth/sign_in", user);
    console.log(result.data.payload);
    const hash = hashData(result.data.payload);
    Cookies.set(token, hash);
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "SUCCESS_LOGIN", payload: result.data });
    history.push("/");
  } catch (error) {
    dispatch({ type: "STOP_SPINNER" });
    const resMessage = error?.response?.data;
    dispatch({ type: "ERROR_SIGNUP", payload: resMessage });
  }
};

export const logOut = async (dispatch) => {
  const dehash = dehashData();
  console.log(dehash);
  privateRequest.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${dehash.token}`;
  await privateRequest.post("/api/auth/logout");
  Cookies.remove(token);
  dispatch({ type: "LOGOUT_USER" });
};

export const requestPasswordLink = async (dispatch, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    const result = await publicRequest.post("/api/auth/forget_password", creds);
    const resMessage = result.data;
    dispatch({ type: "REQUEST_PASSWORD_LINK_SUCCESS", payload: resMessage });
    dispatch({ type: "STOP_SPINNER" });
    return resMessage;
  } catch (error) {
    const resMessage = error.response.data;
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "ERROR_REQUEST_PASSWORD_LINK", payload: resMessage });
  }
};

export const resetPassword = async (dispatch, creds) => {
  try {
    dispatch({ type: "CLEAR_USERS_ERRORS" });
    dispatch({ type: "START_SPINNER" });
    const result = await publicRequest.post(
      `/api/auth/reset_password/${creds.token}`,
      creds
    );
    const resMessage = result.data;
    dispatch({ type: "RESET_PASSWORD_SUCCESS", payload: resMessage });
    dispatch({ type: "STOP_SPINNER" });
    return resMessage;
  } catch (error) {
    const resMessage = error.response.data;
    dispatch({ type: "STOP_SPINNER" });
    dispatch({ type: "ERROR_RESET_PASSWORD", payload: resMessage });
  }
};
// export const UseRefreshTest = async () => {
//   try {
//     const dehash = decrypt(REACT_APP_SALT, Cookies.get(token));
//     privateRequestGet.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${dehash}`;
//     const result = await privateRequestGet.get(`/api/auth/test`);
//     console.log(result.data.payload);
//     const resMessage = result.data;
//     return resMessage;
//   } catch (error) {
//     // console.log(error.response);
//   }
// };

export const UseRefreshTest = (enabled, setEnabled) => {
  const dehash = dehashData();
  privateRequestGet.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${dehash.token}`;

  const { data, error, refetch } = useQuery(
    ["Test"],
    async () => {
      const result = await privateRequestGet.get(`/api/auth/test`);
      alert("fhfhf");
      console.log(result.data.payload);
      return result.data.payload;
    },
    { enabled: enabled, manual: true }
  );

  if (data) {
    console.log(data.emp);
  }
  if (error) {
    console.log(error.message);
  }

  return { data, refetch };
};
