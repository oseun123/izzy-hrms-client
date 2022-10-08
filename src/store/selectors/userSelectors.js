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
};
