import { createSelector } from "reselect";

// const user = (state) => state.user;
const message_preferences = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.message
);

const status_preferences = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.status
);

const spinner_preferences = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.spinner
);

const system_permissions = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.system_permissions
);
const system_roles = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.system_roles
);
const system_departments = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.system_departments
);
const system_companys = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.system_companys
);
const system_genders = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.system_genders
);
const system_states = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.system_states
);
const system_countrys = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.system_countrys
);
const system_users = createSelector(
  (state) => state.preferences,
  (preferences) => preferences.system_users
);
const single_system_role = createSelector(
  (state) => state.preferences,
  (_, role_id) => {
    return parseInt(role_id);
  },
  (preferences, role_id) => {
    return preferences.system_roles.filter((role) => role.id === role_id);
  }
);
const single_system_department = createSelector(
  (state) => state.preferences,
  (_, dept_id) => {
    return parseInt(dept_id);
  },
  (preferences, dept_id) => {
    return preferences.system_departments.filter((dept) => dept.id === dept_id);
  }
);

const single_system_gender = createSelector(
  (state) => state.preferences,
  (_, gend_id) => {
    return parseInt(gend_id);
  },
  (preferences, gend_id) => {
    return preferences.system_genders.filter((gen) => gen.id === gend_id);
  }
);
const single_system_state = createSelector(
  (state) => state.preferences,
  (_, state_id) => {
    return parseInt(state_id);
  },
  (preferences, state_id) => {
    return preferences.system_states.filter((stat) => stat.id === state_id);
  }
);
const single_system_country = createSelector(
  (state) => state.preferences,
  (_, country_id) => {
    return parseInt(country_id);
  },
  (preferences, country_id) => {
    return preferences.system_countrys.filter((coun) => coun.id === country_id);
  }
);
const single_system_company = createSelector(
  (state) => state.preferences,
  (_, company_id) => {
    return parseInt(company_id);
  },
  (preferences, company_id) => {
    return preferences.system_companys.filter((comp) => comp.id === company_id);
  }
);

export {
  message_preferences,
  status_preferences,
  spinner_preferences,
  system_permissions,
  system_roles,
  single_system_role,
  system_users,
  system_departments,
  single_system_department,
  system_genders,
  single_system_gender,
  system_states,
  system_countrys,
  single_system_state,
  single_system_country,
  single_system_company,
  system_companys,
};
