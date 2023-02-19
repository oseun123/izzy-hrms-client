import { lazy } from "react";

// roles
const CreateRoles = lazy(() => import("./menus/preferences/roles/CreateRoles"));
const ViewRoles = lazy(() => import("./menus/preferences/roles/ViewRoles"));
const RoleDetails = lazy(() => import("./menus/preferences/roles/RoleDetails"));
const EditRoles = lazy(() => import("./menus/preferences/roles/EditRoles"));
const AddUserRole = lazy(() => import("./menus/preferences/roles/AddUserRole"));

// department

const CreateDepartments = lazy(() =>
  import("./menus/preferences/departments/CreateDepartments")
);
const ViewDepartments = lazy(() =>
  import("./menus/preferences/departments/ViewDepartments")
);
const EditDepartments = lazy(() =>
  import("./menus/preferences/departments/EditDepartments")
);
const DepartmentDetails = lazy(() =>
  import("./menus/preferences/departments/DepartmentDetails")
);

// gender
const CreateGenders = lazy(() =>
  import("./menus/preferences/genders/CreateGenders")
);
const ViewGenders = lazy(() =>
  import("./menus/preferences/genders/ViewGenders")
);
const GenderDetails = lazy(() =>
  import("./menus/preferences/genders/GenderDetails")
);
const EditGenders = lazy(() =>
  import("./menus/preferences/genders/EditGenders")
);

// state
const CreateStates = lazy(() =>
  import("./menus/preferences/states/CreateStates")
);
const ViewStates = lazy(() => import("./menus/preferences/states/ViewStates"));
const EditStates = lazy(() => import("./menus/preferences/states/EditStates"));
const StateDetails = lazy(() =>
  import("./menus/preferences/states/StateDetails")
);

// country
const CreateCountry = lazy(() =>
  import("./menus/preferences/country/CreateCountry")
);
const ViewCountry = lazy(() =>
  import("./menus/preferences/country/ViewCountry")
);
const EditCountry = lazy(() =>
  import("./menus/preferences/country/EditCountry")
);
const CountryDetails = lazy(() =>
  import("./menus/preferences/country/CountryDetails")
);

// company
const CreateCompany = lazy(() =>
  import("./menus/preferences/companys/CreateCompany")
);
const ViewCompanys = lazy(() =>
  import("./menus/preferences/companys/ViewCompanys")
);
const EditCompany = lazy(() =>
  import("./menus/preferences/companys/EditCompany")
);
const CompanyDetails = lazy(() =>
  import("./menus/preferences/companys/CompanyDetails")
);

// branch

const CreateBranch = lazy(() =>
  import("./menus/preferences/branch/CreateBranch")
);
const ViewBranch = lazy(() => import("./menus/preferences/branch/ViewBranch"));
const BranchDetails = lazy(() =>
  import("./menus/preferences/branch/BranchDetails")
);
const EditBranch = lazy(() => import("./menus/preferences/branch/EditBranch"));

export {
  CreateRoles,
  ViewRoles,
  RoleDetails,
  EditRoles,
  AddUserRole,
  CreateDepartments,
  ViewDepartments,
  EditDepartments,
  DepartmentDetails,
  CreateGenders,
  ViewGenders,
  GenderDetails,
  EditGenders,
  CreateStates,
  ViewStates,
  EditStates,
  StateDetails,
  CreateCountry,
  ViewCountry,
  EditCountry,
  CountryDetails,
  CreateCompany,
  ViewCompanys,
  EditCompany,
  CompanyDetails,
  CreateBranch,
  ViewBranch,
  BranchDetails,
  EditBranch,
};
