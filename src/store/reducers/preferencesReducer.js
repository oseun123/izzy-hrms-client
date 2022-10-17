const initState = {
  message: null,
  status: null,
  spinner: false,
  system_permissions: {},
  system_roles: [],
  system_users: [],
  system_departments: [],
  system_genders: [],
  system_states: [],
  system_countrys: [],
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
        system_users: [...payload.payload.system_users],
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
    case "SYSTEM_DEPARTMENTS_SUCCESS":
      return {
        ...state,
        system_departments: [...payload.payload.departments],
      };
    case "SYSTEM_DEPARTMENTS_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };

    case "SYSTEM_GENDERS_SUCCESS":
      return {
        ...state,
        system_genders: [...payload.payload.genders],
      };
    case "SYSTEM_GENDERS_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "SYSTEM_STATES_SUCCESS":
      return {
        ...state,
        system_states: [...payload.payload.states],
      };
    case "SYSTEM_STATES_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };

    case "SYSTEM_COUNTRY_SUCCESS":
      return {
        ...state,
        system_countrys: [...payload.payload.countrys],
      };
    case "SYSTEM_COUNTRY_ERROR":
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
    case "DELETE_DEPARTMENT_SUCCESS": {
      const deleted_id = parseInt(payload.payload.department);
      const system_departments = [...state.system_departments];
      const filtered_department = system_departments.filter(
        (dept) => dept.id !== deleted_id
      );

      return {
        ...state,
        message: payload.message,
        status: payload.status,
        system_departments: [...filtered_department],
      };
    }
    case "DELETE_DEPARTMENT_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };

    case "DELETE_GENDER_SUCCESS": {
      const deleted_id = parseInt(payload.payload.gender);
      const system_genders = [...state.system_genders];
      const filtered_genders = system_genders.filter(
        (gend) => gend.id !== deleted_id
      );

      return {
        ...state,
        message: payload.message,
        status: payload.status,
        system_genders: [...filtered_genders],
      };
    }
    case "DELETE_GENDER_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };

    case "DELETE_COUNTRY_SUCCESS": {
      const deleted_id = parseInt(payload.payload.country);
      const system_countrys = [...state.system_countrys];
      const filtered_countrys = system_countrys.filter(
        (coun) => coun.id !== deleted_id
      );

      return {
        ...state,
        message: payload.message,
        status: payload.status,
        system_countrys: [...filtered_countrys],
      };
    }
    case "DELETE_COUNTRY_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };

    case "DELETE_STATE_SUCCESS": {
      const deleted_id = parseInt(payload.payload.state);
      const system_states = [...state.system_states];
      const filtered_states = system_states.filter(
        (state) => state.id !== deleted_id
      );

      return {
        ...state,
        message: payload.message,
        status: payload.status,
        system_states: [...filtered_states],
      };
    }
    case "DELETE_STATE_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };

    case "CREATE_DEPARTMENT_SUCCESS":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "CREATE_DEPARTMENT_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "CREATE_ROLE_SUCCESS":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "CREATE_ROLE_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "CREATE_GENDER_SUCCESS":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "CREATE_GENDER_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };

    case "CREATE_STATE_SUCCESS":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "CREATE_STATE_ERROR":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };

    case "CREATE_COUNTRY_SUCCESS":
      return {
        ...state,
        message: payload.message,
        status: payload.status,
      };
    case "CREATE_COUNTRY_ERROR":
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
