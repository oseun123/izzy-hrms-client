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

export {
  message_preferences,
  status_preferences,
  spinner_preferences,
  system_permissions,
  system_roles,
  single_system_role,
  system_users
};