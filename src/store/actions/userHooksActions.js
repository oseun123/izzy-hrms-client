import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { setPrivateRequestGet } from "../../requestMethods";

export const UseRefreshTest = (enabled, setEnabled) => {
  const dispatch = useDispatch();
  const { data, error, refetch, isLoading } = useQuery(
    ["Test"],
    async () => {
      const result = await setPrivateRequestGet().get(`/api/auth/test`);
      return result.data.payload;
    },
    { enabled: enabled, manual: true }
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
      console.log(error.message);
    }
  }, [dispatch, isLoading, data, error]);

  return { data, refetch };
};
