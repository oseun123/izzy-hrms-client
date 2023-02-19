import { lazy } from "react";

// onboarding
const CreateEmployee = lazy(() =>
  import("./menus/human_resource/onboarding/CreateEmployee")
);

export { CreateEmployee };
