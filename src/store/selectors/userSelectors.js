import { createSelector } from "reselect";

const user = (state) => state.user;

const currentUser = createSelector([user], (user) => user.currentUser);

const message = createSelector([user], (user) => user.message);

const status = createSelector([user], (user) => user.status);

const spinner = createSelector([user], (user) => user.spinner);

const userpermissions = createSelector([user], (user) => user.userpermissions);

export { currentUser, message, status, spinner, userpermissions };
