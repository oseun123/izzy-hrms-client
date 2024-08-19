import { createSelector } from "reselect";

// const user = (state) => state.user;

const currentUser = createSelector(
  (state) => state.user,
  (user) => user.currentUser
);

const message = createSelector(
  (state) => state.user,
  (user) => user.message
);

const status = createSelector(
  (state) => state.user,
  (user) => user.status
);

const spinner = createSelector(
  (state) => state.user,
  (user) => user.spinner
);

const userpermissions = createSelector(
  (state) => state.user,
  (user) => user.userpermissions
);
const current_cleint = createSelector(
  (state) => state.user,
  (user) => user.current_cleint
);

const dashboardpermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Dashboard" &&
        permission.module === "root" &&
        permission.menu === 1
    )
);
const preferencespermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Preferences" &&
        permission.module === "root" &&
        permission.menu === 1
    )
);
const humanresourcepermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Human Resource" &&
        permission.module === "root" &&
        permission.menu === 1
    )
);
const humanresourceOnboardingpermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Human Resource" &&
        permission.module === "Onboarding" &&
        permission.menu === 1
    )
);
const preferencesRolespermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Preferences" &&
        permission.module === "Roles" &&
        permission.menu === 1
    )
);
const preferencesDepartmentpermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Preferences" &&
        permission.module === "Department" &&
        permission.menu === 1
    )
);
const preferencesGenderpermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Preferences" &&
        permission.module === "Gender" &&
        permission.menu === 1
    )
);

const preferencesStatepermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Preferences" &&
        permission.module === "State" &&
        permission.menu === 1
    )
);
const preferencesCountrypermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Preferences" &&
        permission.module === "Country" &&
        permission.menu === 1
    )
);
const preferencesCompanypermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Preferences" &&
        permission.module === "Company" &&
        permission.menu === 1
    )
);
const preferencesBranchpermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Preferences" &&
        permission.module === "Branch" &&
        permission.menu === 1
    )
);
const preferencesSettingspermissions = createSelector(
  (state) => state.user,
  (user) =>
    user.userpermissions?.filter(
      (permission) =>
        permission.for === "Preferences" &&
        permission.module === "Settings" &&
        permission.menu === 1
    )
);

const userhaspermission = () =>
  createSelector(
    (state) => state.user,
    (_, permission) => {
      return permission;
    },
    (user, permission) => {
      return user.userpermissions?.filter((perm) => perm.action === permission)
        .length;
    }
  );

export {
  currentUser,
  message,
  status,
  spinner,
  userpermissions,
  dashboardpermissions,
  preferencespermissions,
  preferencesRolespermissions,
  preferencesDepartmentpermissions,
  userhaspermission,
  preferencesGenderpermissions,
  preferencesStatepermissions,
  preferencesCountrypermissions,
  preferencesCompanypermissions,
  preferencesBranchpermissions,
  humanresourcepermissions,
  humanresourceOnboardingpermissions,
  preferencesSettingspermissions,
  current_cleint,
};
