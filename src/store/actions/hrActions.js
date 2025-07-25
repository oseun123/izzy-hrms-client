const hrCleanUp = async (dispatch) => {
  dispatch({ type: 'CLEAR_HR_ERRORS' });
};

const createEmployee = async (dispatch, request, creds) => {
  try {
    dispatch({ type: 'CLEAR_USERS_ERRORS' });
    dispatch({ type: 'CLEAR_PREFERENCES_ERRORS' });
    const result = await request.post('/hris/create-employee', creds);

    dispatch({ type: 'GENERIC_SUCCESS', payload: result.data });
    return result.data;
  } catch (error) {
    const resMessage = error?.response?.data;
    dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
  }
};
const updateEmployee = async (dispatch, request, creds) => {
  try {
    dispatch({ type: 'CLEAR_USERS_ERRORS' });
    dispatch({ type: 'CLEAR_PREFERENCES_ERRORS' });
    const result = await request.post('/hris/update-employee', creds);

    dispatch({ type: 'GENERIC_SUCCESS', payload: result.data });
    return result.data;
  } catch (error) {
    const resMessage = error?.response?.data;
    dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
  }
};
const createContact = async (dispatch, request, creds) => {
  try {
    dispatch({ type: 'CLEAR_USERS_ERRORS' });
    dispatch({ type: 'CLEAR_PREFERENCES_ERRORS' });
    const result = await request.post('/hris/set-contact', creds);

    dispatch({ type: 'GENERIC_SUCCESS', payload: result.data });
    return result.data;
  } catch (error) {
    const resMessage = error?.response?.data;
    dispatch({ type: 'GENERIC_ERROR', payload: resMessage });
  }
};

export { hrCleanUp, createEmployee, updateEmployee, createContact };
