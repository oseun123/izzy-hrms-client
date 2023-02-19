import { createSelector } from "reselect";

// const user = (state) => state.user;
const message_hr = createSelector(
  (state) => state.hr,
  (hr) => hr.message
);

const status_hr = createSelector(
  (state) => state.hr,
  (hr) => hr.status
);

const spinner_hr = createSelector(
  (state) => state.hr,
  (hr) => hr.spinner
);

export { message_hr, status_hr, spinner_hr };
