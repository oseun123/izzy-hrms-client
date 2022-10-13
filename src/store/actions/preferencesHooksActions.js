import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useAxiosPrivate } from "../../hooks";
import { isForbiddden } from "../../util/helpers";
import { token, storage_type } from "./../../config";
import { useLocation, useHistory } from "react-router-dom";
// import Cookies from "js-cookie";
import { hashData } from "../../util/hash";
import { user_perm } from "../../config";
// import { setPrivateRequest } from "../../requestMethods";

const useGetSystemPermissions = (enabled, setEnabled) => {
  const location = useLocation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const { data, error, refetch, isLoading } = useQuery(
    ["system_permissions"],
    async () => {
      const result = await request.get(`/api/preferences/permissions`);

      return result.data;
    },
    { enabled: enabled, manual: true, retry: 2 }
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
      queryClient.removeQueries(["system_permissions"]);
      isForbiddden(dispatch, error, token, location, history);
      const resMessage = error.response.data;
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_PERMISSION_ERROR", payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch };
};
const useGetUserPermissions = (enabled, setEnabled, user_id) => {
  const location = useLocation();
  const history = useHistory();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const { data, error, refetch, isLoading } = useQuery(
    ["user_permissions", user_id],
    async () => {
      const result = await request.get(
        `/api/preferences/user-permissions/${user_id}`
      );
      return result.data;
    },
    { enabled: enabled, manual: true, retry: 2 }
  );

  useEffect(() => {
    if (isLoading === true) {
    }
    if (data) {
      // alert("hhhhh");

      const hash_perm = hashData(data.payload.userpermissions);
      storage_type.setItem(user_perm, hash_perm);

      dispatch({ type: "GET_USER_PERMION_SUCCESS", payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(["user_permissions", user_id]);
      isForbiddden(dispatch, error, token, location, history);
      const resMessage = error.response.data;
      console.log(resMessage);
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    location,
    history,
    queryClient,
    user_id,
  ]);

  return { data, refetch };
};
const useGetSystemUsers = (enabled, setEnabled) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { data, error, refetch, isLoading } = useQuery(
    ["system_users"],
    async () => {
      const result = await request.get(`/api/preferences/users`);

      return result.data;
    },
    { enabled: enabled, manual: true, retry: 2 }
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: "START_SPINNER" });
      dispatch({ type: "START_SPINNER_PREFERENCES" });
    }
    if (data) {
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_USERS_SUCCESS", payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(["system_users"]);
      isForbiddden(dispatch, error, token, location, history);
      const resMessage = error.response.data;

      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_USERS_ERROR", payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch };
};
const useGetSystemRoles = (enabled, setEnabled, page = 1, size = 10, all) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery(
    ["system_roles", page, size],
    async () => {
      const result = await request.get(
        `/api/preferences/roles?size=${size}&page=${page}&all=${all}`
      );

      return result.data;
    },
    { enabled: enabled, manual: true, retry: 2 }
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
      queryClient.removeQueries(["system_roles", page, size]);
      isForbiddden(dispatch, error, token, location, history);
      const resMessage = error.response.data;
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_ROLES_ERROR", payload: resMessage });
      // console.log(error.message);
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    page,
    size,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch };
};
const useGetSystemDepartment = (
  enabled,
  setEnabled,
  page = 1,
  size = 10,
  all
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery(
    ["system_departments", page, size],
    async () => {
      const result = await request.get(
        `/api/preferences/departments?size=${size}&page=${page}&all=${all}`
      );

      return result.data;
    },
    { enabled: enabled, manual: true, retry: 2 }
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: "START_SPINNER" });
      dispatch({ type: "START_SPINNER_PREFERENCES" });
    }
    if (data) {
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_DEPARTMENTS_SUCCESS", payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(["system_departments", page, size]);
      isForbiddden(dispatch, error, token, location, history);
      const resMessage = error.response.data;
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_DEPARTMENTS_ERROR", payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    page,
    size,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch };
};
const useGetSystemGender = (enabled, setEnabled, page = 1, size = 10, all) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery(
    ["system_genders", page, size],
    async () => {
      const result = await request.get(
        `/api/preferences/genders?size=${size}&page=${page}&all=${all}`
      );

      return result.data;
    },
    { enabled: enabled, manual: true, retry: 2 }
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: "START_SPINNER" });
      dispatch({ type: "START_SPINNER_PREFERENCES" });
    }
    if (data) {
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_GENDERS_SUCCESS", payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(["system_genders", page, size]);
      isForbiddden(dispatch, error, token, location, history);
      const resMessage = error.response.data;
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "STOP_SPINNER_PREFERENCES" });
      dispatch({ type: "SYSTEM_GENDERS_ERROR", payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    page,
    size,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch };
};

export {
  useGetSystemPermissions,
  useGetSystemRoles,
  useGetSystemUsers,
  useGetUserPermissions,
  useGetSystemDepartment,
  useGetSystemGender,
};
