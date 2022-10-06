import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { BASE_URL, token } from "./config";
import { setPrivateRequest } from "./requestMethods";
import Cookies from "js-cookie";

import { hashData } from "./util/hash";

function useForm(callback, initState = {}, validate) {
  const [values, setValues] = useState(initState);
  const [errors, setErrors] = useState({});

  const handleChange = (e, sep = false, creds) => {
    if (sep) {
      setValues((prevValues) => {
        return { ...prevValues, [creds.name]: creds.value };
      });
    } else {
      setValues((prevValues) => {
        return { ...prevValues, [e?.target.name]: e?.target.value };
      });
    }
  };
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    const get_error = validate(values);
    if (Object.keys(get_error).length === 0) {
      callback();
      setErrors(get_error);
    } else {
      setErrors(get_error);
    }
  };
  function clearForm() {
    setValues((prev) => {
      let rep_obj = { ...prev };
      for (var key of Object.keys(rep_obj)) {
        rep_obj[key] = initState[key];
      }
      return rep_obj;
    });
  }

  return { handleChange, handleSubmit, errors, values, clearForm };
}
function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual);
}

function useRerender() {
  const [rerender, setRerender] = useState(false);
  setRerender(!rerender);
  return setRerender;
}

function useAxiosPrivate() {
  const refresh = useRefreshToken();

  useEffect(() => {
    const responseIntercept = setPrivateRequest().interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = { ...error?.config };

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          const newprevRequest = { ...prevRequest, sent: true };
          const newAccessToken = await refresh();
          newprevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return setPrivateRequest()(newprevRequest);
        } else if (error?.response?.status === 403) {
          // setPrivateRequest().interceptors.response.eject(responseIntercept);
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      setPrivateRequest().interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return setPrivateRequest();
}

function useRefreshToken() {
  const refresh = async () => {
    const res = await setPrivateRequest().get("/api/auth/refresh", {
      baseURL: BASE_URL,
      withCredentials: true,
    });

    const hash = hashData(res.data.payload.new_token);
    Cookies.set(token, hash);

    return res.data.payload.new_token;
  };

  return refresh;
}

export {
  useForm,
  useShallowEqualSelector,
  useRerender,
  useAxiosPrivate,
  useRefreshToken,
};
