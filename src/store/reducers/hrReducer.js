const initState = {
  message: null,
  status: null,
  spinner: false,
};

const hrReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "CLEAR_HR_ERRORS":
      return {
        ...state,
        message: null,
        status: null,
        spinner: false,
      };

    case "START_SPINNER_HR":
      return {
        ...state,
        spinner: true,
      };
    case "STOP_SPINNER_HR":
      return {
        ...state,
        spinner: false,
      };

    default:
      return state;
  }
};
export default hrReducer;
