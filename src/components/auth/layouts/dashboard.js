import { lazy } from "react";

const PersonalDashboard = lazy(() =>
  import("./menus/dashboard/PersonalDashboard")
);

export { PersonalDashboard };
