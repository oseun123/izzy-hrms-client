import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useAxiosPrivate } from "../../hooks";
import { ApiResponse } from "../../@types/api.types";
import axios from 'axios'; 


const useGetCurrentClient = (enabled: boolean, setEnabled: React.Dispatch<React.SetStateAction<boolean>>) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const request = useAxiosPrivate();

  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ["current_client"],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(`/auth/current_client`);
      return result.data; // Ensure this matches ApiResponse structure
    },
    { enabled, retry: 1 } // Removed manual option
  );

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: "START_SPINNER" });
    }

    if (data) {
      dispatch({ type: "STOP_SPINNER" });
      dispatch({ type: "CURRENT_CLIENT_SUCCESS", payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(["current_client"]);
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
      dispatch({ type: "CURRENT_CLIENT_ERROR", payload: resMessage });
      setEnabled(false);
    }
  }, [dispatch, isLoading, data, error, setEnabled, queryClient]);

  return { data, error, refetch, isLoading };
};


export {
    useGetCurrentClient
}
