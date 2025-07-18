import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useAxiosPrivate } from '../../hooks';
import { isForbiddden } from '../../util/helpers';
import { token, storage_type } from './../../config';
import { useLocation, useHistory } from 'react-router-dom';
// import Cookies from "js-cookie";
import { hashData } from '../../util/hash';
import { user_perm } from '../../config';
import { ApiResponse } from '../../@types/api.types';
import axios from 'axios';

const useGetSystemGender = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_genders', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        // `/preferences/genders?size=${size}&page=${page}&all=${all}`
        `/preferences/genders?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_GENDERS_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_genders', all]);
      isForbiddden(dispatch, error, token, location, history);

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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_GENDERS_ERROR', payload: resMessage });
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
    all,
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemGenderPaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_genders_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/genders?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_GENDERS_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_genders_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_GENDERS_ERROR', payload: resMessage });
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

const useGetSystemDepartmentPaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_departments_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/departments?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_DEPARTMENTS_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_departments_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_DEPARTMENTS_ERROR', payload: resMessage });
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
const useGetSystemDepartment = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_departments', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/departments?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_DEPARTMENTS_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_departments', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_DEPARTMENTS_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemCountry = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_country', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/countries?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_COUNTRY_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_country', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_COUNTRY_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemCountryPaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_country_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/countries?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_COUNTRY_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_country_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_COUNTRY_ERROR', payload: resMessage });
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

const useGetSystemUsers = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_users'],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(`/preferences/users`);

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_USERS_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_users']);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_USERS_ERROR', payload: resMessage });
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

  return { data, refetch, isLoading };
};

const useGetSystemCompanyPagination = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_companys_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/companies?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_COMPANYS_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_companys_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_COMPANYS_ERROR', payload: resMessage });
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

const useGetSystemCompany = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_companys', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/companies?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_COMPANYS_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_companys', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_COMPANYS_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemBranchPaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_branchs_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/branches?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_BRANCHS_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_branchs_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_BRANCHS_ERROR', payload: resMessage });
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
const useGetSystemBranch = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_branchs', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/branches?all=${all}`,
      );
      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_BRANCHS_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_branchs', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_BRANCHS_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemDesignationPaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_designation_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/designations?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_designation_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
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

const useGetSystemDesignation = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_designation', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/designations?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_designation', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};
const useGetSystemEmpCategoryPaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_emp_category_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/employee-categories?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_emp_category_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
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
const useGetSystemEmpCategory = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_emp_category', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/employee-categories?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_emp_category', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemEmpStatusPaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_emp_status_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/employee-statuses?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_emp_status_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
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

const useGetSystemEmpStatus = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_emp_status', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/employee-statuses?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_emp_status', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemStatePaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_states_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/states?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_STATES_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_states_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_STATES_ERROR', payload: resMessage });
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

const useGetSystemState = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_states', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/states?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_STATES_SUCCESS', payload: data });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_states', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'SYSTEM_STATES_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemGradePaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_grade_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/grades?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_grade_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
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

const useGetSystemGrade = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_grade', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/grades?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_grade', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};

const useGetSystemStepPaginated = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  page: number = 1,
  size: number = 10,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_step_pag', page, size],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/steps?size=${size}&page=${page}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_step_pag', page, size]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
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

const useGetSystemStep = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  all: string,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['system_step', all],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/steps?all=${all}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['system_step', all]);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
      setEnabled(false);
    }
  }, [
    dispatch,
    isLoading,
    data,
    error,
    setEnabled,
    all,
    location,
    history,
    queryClient,
  ]);

  return { data, refetch, isLoading };
};

const useGetEmpNumber = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['emp_number'],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `/preferences/settings-general-employee-number`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );

  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['emp_number']);
      isForbiddden(dispatch, error, token, location, history);
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
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
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

  return { data, refetch, isLoading };
};
const useGetCurrentEmployeeProfilePic = (
  enabled: boolean,
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
  user_id: number | null,
) => {
  // alert('here3');
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const request = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { data, error, refetch, isLoading } = useQuery<ApiResponse>(
    ['employee_pic', user_id],
    async (): Promise<ApiResponse> => {
      const result = await request.get<ApiResponse>(
        `hris/get-employee-pic?user_id=${user_id}`,
      );

      return result.data;
    },
    { enabled: enabled, retry: 2 },
  );
  // console.log({ error, isLoading, data });
  useEffect(() => {
    if (isLoading === true) {
      dispatch({ type: 'START_SPINNER' });
      dispatch({ type: 'START_SPINNER_PREFERENCES' });
    }
    if (data) {
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      setEnabled(false);
    }

    if (error) {
      queryClient.removeQueries(['employee_pic', user_id]);
      isForbiddden(dispatch, error, token, location, history);
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

      console.log({ resMessage });
      dispatch({ type: 'STOP_SPINNER' });
      dispatch({ type: 'STOP_SPINNER_PREFERENCES' });
      // dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
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

  return { data, refetch, isLoading };
};

export {
  useGetSystemGender,
  useGetCurrentEmployeeProfilePic,
  useGetSystemGenderPaginated,
  useGetSystemDepartmentPaginated,
  useGetSystemDepartment,
  useGetSystemCountry,
  useGetSystemCountryPaginated,
  useGetSystemUsers,
  useGetSystemCompanyPagination,
  useGetSystemCompany,
  useGetSystemBranch,
  useGetSystemBranchPaginated,
  useGetSystemDesignationPaginated,
  useGetSystemDesignation,
  useGetSystemEmpCategoryPaginated,
  useGetSystemEmpCategory,
  useGetSystemEmpStatusPaginated,
  useGetSystemEmpStatus,
  useGetSystemStatePaginated,
  useGetSystemState,
  useGetSystemGrade,
  useGetSystemGradePaginated,
  useGetSystemStep,
  useGetSystemStepPaginated,
  useGetEmpNumber,
};
