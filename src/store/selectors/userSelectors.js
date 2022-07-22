import { createSelector } from "reselect";

const user = (state) => state.user;

const currentUser = createSelector([user], (user) => user.currentUser);

const message = createSelector([user], (user) => user.message);

const status = createSelector([user], (user) => user.status);

const spinner = createSelector([user], (user) => user.spinner);

const userpermissions = createSelector([user], (user) => user.userpermissions);

const dashboardpermissions = createSelector([user], (user) =>
  user.userpermissions?.filter((permission) => permission.for === "Dashboard")
);
const preferencespermissions = createSelector([user], (user) =>
  user.userpermissions?.filter((permission) => permission.for === "Preferences")
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
  userhaspermission,
};
