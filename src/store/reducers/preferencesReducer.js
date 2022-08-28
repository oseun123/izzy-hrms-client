const initState = {
  message: null,
  status: null,
  spinner: false,
  system_permissions: {},
  system_roles: [],
  system_users: [],
};

const preferencesReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "CLEAR_PREFERENCES_ERRORS":
      return {
        ...state,
        message: null,
        status: null,
        spinner: false,
      };

    case "START_SPINNER_PREFERENCES":
      return {
        ...state,
        spinner: true,
      };
    case "STOP_SPINNER_PREFERENCES":
      return {
        ...state,
        spinner: false,
      };
    case "SYSTEM_PERMISSION_SUCCESS":
      return {
        ...state,
        system_permissions: { ...payload.payload.system_permissions },
      };

    case "SYSTEM_USERS_SUCCESS":
      return {
        ...state,
        system_users: [ ...payload.payload.system_users ],
      };
    case "SYSTEM_USERS_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "SYSTEM_PERMISSION_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "SYSTEM_ROLES_SUCCESS":
      return {
        ...state,
        system_roles: [...payload.payload.roles],
      };
    case "SYSTEM_ROLES_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "DELETE_ROLE_SUCCESS": {
      const deleted_id = parseInt(payload.payload.role);
      const sys_roles = [...state.system_roles];
      const filtered_roles = sys_roles.filter((role) => role.id !== deleted_id);

      return {
        ...state,
        message: payload.message,
        status: payload.status,
        system_roles: [...filtered_roles],
      };
    }
    case "DELETE_ROLE_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };

    default:
      return state;
  }
};
export default preferencesReducer;
