import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { setPrivateRequestGet } from "../../requestMethods";

const useGetSystemPermissions = (enabled, setEnabled) => {
  const dispatch = useDispatch();
  const { data, error, refetch, isLoading } = useQuery(
    ["system_permissions"],
    async () => {
      const result = await setPrivateRequestGet().get(
        `/api/preferences/permissions`
      );

      return result.data;
    },
    { enabled: enabled, manual: true }
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: "START_SPINNER" });
      dispatch({ type: "START_SPINNER_PREFERENCES" });
    }
    if (data) {
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_PERMISSION_SUCCESS", payload: data });
      setEnabled(false);
    }

    if (error) {
      const resMessage = error.response.data;

      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_PERMISSION_ERROR", payload: resMessage });
    }
  }, [dispatch, isLoading, data, error, setEnabled]);

  return { data, refetch };
};
const useGetSystemRoles = (enabled, setEnabled, page = 1, size = 10) => {
  const dispatch = useDispatch();
  const { data, error, refetch, isLoading } = useQuery(
    ["system_roles", page, size],
    async () => {
      const result = await setPrivateRequestGet().get(
        `/api/preferences/roles?size=${size}&page=${page}`
      );

      return result.data;
    },
    { enabled: enabled, manual: true }
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: "START_SPINNER" });
      dispatch({ type: "START_SPINNER_PREFERENCES" });
    }
    if (data) {
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_ROLES_SUCCESS", payload: data });
      setEnabled(false);
    }

    if (error) {
      const resMessage = error.response.data;
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_ROLES_ERROR", payload: resMessage });
      // console.log(error.message);
    }
  }, [dispatch, isLoading, data, error, setEnabled, page, size]);

  return { data, refetch };
};

export { useGetSystemPermissions, useGetSystemRoles };
