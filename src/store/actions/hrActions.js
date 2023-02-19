const hrCleanUp = async (dispatch) => {
  dispatch({ type: "CLEAR_HR_ERRORS" });
};

const createEmployee = async (dispatch, request, creds) => {
  console.log(creds);
  //   try {
  //     dispatch({ type: "CLEAR_USERS_ERRORS" });
  //     dispatch({ type: "CLEAR_PREFERENCES_ERRORS" });
  //     dispatch({ type: "START_SPINNER" });
  //     dispatch({ type: "START_SPINNER_PREFERENCES" });
  //     const result = await request.post("/api/preferences/roles", creds);

  //     dispatch({ type: "STOP_SPINNER" });
  //     dispatch({ type: "STOP_SPINNER_PREFERENCES" });
  //     dispatch({ type: "CREATE_ROLE_SUCCESS", payload: result.data });
  //     return result.data;
  //   } catch (error) {
  //     dispatch({ type: "STOP_SPINNER" });
  //     dispatch({ type: "STOP_SPINNER_PREFERENCES" });
  //     const resMessage = error?.response?.data;
  //     dispatch({ type: "CREATE_ROLE_ERROR", payload: resMessage });
  //   }
};

export { hrCleanUp, createEmployee };
