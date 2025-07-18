import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useAxiosPrivate } from '../../hooks';
import { ApiResponse } from '../../@types/api.types';
import axios from 'axios';
import { isForbiddden } from '../../util/helpers';
import { token } from './../../config';
import { useLocation, useHistory } from 'react-router-dom';

const useGetCurrentClient = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const request = useAxiosPrivate();

  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['current_client'],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(`/auth/current_client`);
      return result.data; // Ensure this matches ApiResponse structure
    },
    { enabled, retry: 1 }, // Removed manual option
  );

  useEffect(() => {
    if (isLoading) {
      dispatch({ type: 'START_SPINNER' });
    }

    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'CURRENT_CLIENT_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['current_client']);
      let resMessage = {
        status: 'error',
        message: 'An Error Occured',
        payload: {},
      }; // Default error message

      // Check if the error is an AxiosError
      if (error && axios.isAxiosError(error)) {
        // Safely access response data
        // @ts-ignore
        resMessage = error.response?.data || resMessage; // Adjust according to your API's response structure
      } else {
        console.error('An unexpected error occurred:', error);
      }

      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'CURRENT_CLIENT_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [dispatch, isLoading, data, error, setEnabled, queryClient]);

  return { data, error, refetch, isLoading };
};

const useGetAllEmployee = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // const history = useHistory();
  const queryClient = useQueryClient();
  const request = useAxiosPrivate();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['all_employee'],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(`/utils/system_users`);
      return result.data;
    },
    { enabled: enabled, retry: 1 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['all_employee']);

      let resMessage = {
        status: 'error',
        message: 'An Error Occured',
        payload: {},
      }; // Default error message
      // Check if the error is an AxiosError
      if (error && axios.isAxiosError(error)) {
        // Safely access response data
        // @ts-ignore
        resMessage = error.response?.data || resMessage; // Adjust according to your API's response structure
      } else {
        console.error('An unexpected error occurred:', error);
      }

      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
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

  return { data: data?.payload, error, refetch, isLoading };
};

export { useGetCurrentClient, useGetAllEmployee };
