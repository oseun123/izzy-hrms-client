export interface CurrentClient {
  id: number;
  name: string;
  settings: string;
  created_at: string;
  updated_at: string;
}

export interface Gender {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  users: User[];
}

export interface Department {
  created_at: string; // ISO date string
  headOfDepartment: number | null;
  hod: number | null;
  id: number;
  name: string;
  updated_at: string; // ISO date string
  users: User[];
}

export interface Country {
  id: number;
  name: string;
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
  users?: User[];
}
export interface State {
  id: number;
  name: string;
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
  users?: User[];
}
export interface User {
  branch_id: number | null;
  company_id: number | null;
  country_id: number | null;
  created_at: string;
  updated_at: string;
  department_id: number;
  designation_id: number | null;
  email: string;
  employeecategory_id: number | null;
  employeestatus_id: number;
  first_name: string;
  middle_name: string;
  gender_id: number;
  grade_id: number | null;
  step_id: number | null;
  id: number;
  last_name: string;
  employee_number: string;
  employment_date: string;
  primary_supervisor: number | null;
  secondary_supervisor: number | null;
  state_id: number | null;
  fullname?: string;
}

export interface Company {
  id: number;
  name: string;
  branches: Branch[]; // Assuming it is an array of similar objects.
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
export interface Designation {
  id: number;
  name: string;
  users: User[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
export interface EmployeeCategory {
  id: number;
  name: string;
  users: User[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
export interface EmployeeStatus {
  id: number;
  name: string;
  users: User[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
export interface Grade {
  id: number;
  name: string;
  users: User[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
export interface Step {
  id: number;
  name: string;
  users: User[];
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  code: string;
  company_id: number;
  company: Company;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  email: string;
  headquarters: boolean;
  phone_1: string;
  phone_2: string;
  managers: User[];
  users: User[];
}

interface Format {
  id: number;
  sequence: string;
  prefix: string;
  suffix: string | null;
  status: boolean;
  created_at: string; // Use Date if you want it as a Date object
  updated_at: string; // Use Date if you want it as a Date object
}
interface ProfilePic {
  id: number;
  user_id: number;
  status: string;
  image_url: string;
  created_by: number;
  created_at: string; // Use Date if you want it as a Date object
  updated_at: string; // Use Date if you want it as a Date object
}

export interface Contact {
  id?: number;
  user_id: number | null;
  created_by: number;
  house_number: string;
  street_name: string;
  land_mark: string;
  lga: string;
  postal_code: string;
  state_id: number | null;
  country_id: number | null;
  is_authorized: boolean | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  state: State | null;
  country: Country | null;
}

export interface Payload {
  current_cleint?: CurrentClient; // Correct property name
  genders?: Gender[]; // Correct property name
  total_pages?: number;
  total_count?: number;
  system_users?: User[];
  system_user?: User;
  departments?: Department[];
  countrys?: Country[];
  states?: State[];
  companys?: Company[];
  branchs?: Branch[];
  designations?: Designation[];
  employeeCategory?: EmployeeCategory[];
  employeeStatus?: EmployeeStatus[];
  grades?: Grade[];
  steps?: Step[];
  format?: Format;
  format_string?: string;
  profile_pic?: ProfilePic;
  contact?: Contact;
}

export interface ApiResponse {
  status: string;
  message: string;
  payload: Payload;
}
