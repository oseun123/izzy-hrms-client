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
import { ApiResponse } from "../../@types/api.types";
import axios from 'axios'; 



const useGetSystemGender = (enabled: boolean, setEnabled: React.Dispatch<React.SetStateAction<boolean>>,all:string) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery <ApiResponse>(
    ["system_genders", all],
    async (): Promise<ApiResponse>  => {
      const result = await request.get<ApiResponse>(
        // `/preferences/genders?size=${size}&page=${page}&all=${all}`
        `/preferences/genders?all=${all}`
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 }
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
      queryClient.removeQueries(["system_genders", all]);
      isForbiddden(dispatch, error, token, location, history);

       let resMessage = 'An error occurred'; // Default error message

        // Check if the error is an AxiosError
      if (error && axios.isAxiosError(error)) {
        // Safely access response data
        // @ts-ignore
        resMessage = error.response?.data?.message || resMessage; // Adjust according to your API's response structure
      } else {
        console.error("An unexpected error occurred:", error);
      }

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
    location,
    history,
    queryClient,
    all
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemGenderPaginated = (enabled: boolean, setEnabled: React.Dispatch<React.SetStateAction<boolean>>, page:number = 1, size:number = 10) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery <ApiResponse>(
    ["system_genders_pag", page, size],
    async () :  Promise<ApiResponse>  => {
      const result = await request.get<ApiResponse>(
        `/preferences/genders?size=${size}&page=${page}`
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 }
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
      queryClient.removeQueries(["system_genders_pag", page, size]);
      isForbiddden(dispatch, error, token, location, history);
        let resMessage = 'An error occurred'; // Default error message

        // Check if the error is an AxiosError
      if (error && axios.isAxiosError(error)) {
        // Safely access response data
        // @ts-ignore
        resMessage = error.response?.data?.message || resMessage; // Adjust according to your API's response structure
      } else {
        console.error("An unexpected error occurred:", error);
      }
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

  return { data, refetch, isLoading };
};




export {
      useGetSystemGender,
      useGetSystemGenderPaginated
}