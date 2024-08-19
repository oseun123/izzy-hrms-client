import { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { BASE_URL, token, storage_type } from "./config";
import { setPrivateRequest } from "./requestMethods";
// import Cookies from "js-cookie";

import { hashData } from "./util/hash";

import { useDispatch } from "react-redux";

import { preferencesCleanUp } from "./store/actions/preferencesActions";
import { resetUsersState } from "./store/actions/userActions";
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

    storage_type.setItem(token, hash);

    return res.data.payload.new_token;
  };

  return refresh;
}

function usePreferenceCleanUp() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      preferencesCleanUp(dispatch);
    };
  }, [dispatch]);
}
function useUserCleanUp() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      resetUsersState(dispatch);
    };
  }, [dispatch]);
}

function useCleanUp() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      resetUsersState(dispatch);
      preferencesCleanUp(dispatch);
    };
  }, [dispatch]);
}

export {
  useForm,
  useShallowEqualSelector,
  useRerender,
  useAxiosPrivate,
  useRefreshToken,
  usePreferenceCleanUp,
  useUserCleanUp,
  useCleanUp,
};
