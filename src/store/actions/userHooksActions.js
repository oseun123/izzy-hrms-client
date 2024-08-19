import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useAxiosPrivate } from "../../hooks";
import { isForbiddden } from "../../util/helpers";

import { token } from "./../../config";
// import { useLocation, useHistory } from "react-router-dom";

const UseRefreshTest = (enabled, setEnabled) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const request = useAxiosPrivate();
  const { data, error, refetch, isLoading } = useQuery(
    ["Test"],
    async () => {
      const result = await request.get(`/api/auth/test`);
      return result.data.payload;
    },
    { enabled: enabled, manual: true, retry: 2 }
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: "START_SPINNER" });
    }
    if (data) {
      dispatch({ type: "STOP_SPINNER" });
      // console.log(data.emp);
      const result = data.emp.reduce(function (r, a) {
        r[a.for] = r[a.for] || [];
        r[a.for].push(a);
        return r;
      }, Object.create(null));
      console.log(result);
      // dispatch({ type: "START_SPINNER" });
    }

    if (error) {
      queryClient.removeQueries(["Test"]);
      isForbiddden(dispatch, error, token);
    }
  }, [dispatch, isLoading, data, error, queryClient]);

  return { data, refetch };
};
const useGetCurrentClient = (enabled, setEnabled) => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // const history = useHistory();
  const queryClient = useQueryClient();
  const request = useAxiosPrivate();
  const { data, error, refetch, isLoading } = useQuery(
    ["current_client"],
    async () => {
      const result = await request.get(`/api/auth/current_client`);
      return result.data;
    },
    { enabled: enabled, manual: true, retry: 1 }
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: "START_SPINNER" });
    }
    if (data) {
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "CURRENT_CLIENT_SUCCESS", payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(["current_client"]);

      const resMessage = error.response.data;

      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "CURRENT_CLIENT_ERROR", payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    // location,
    // history,
    queryClient,
  ]);

  return { data, error, refetch };
};

export { UseRefreshTest, useGetCurrentClient };
