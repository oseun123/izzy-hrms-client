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
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  users: User[];
}
export interface User {
  branch_id: number | null;
  country_id: number | null;
  created_at: string;
  department_id: number;
  designation_id: number | null;
  email: string;
  employeecategory_id: number | null;
  employeestatus_id: number;
  first_name: string;
  gender_id: number;
  grade_id: number | null;
  id: number;
  last_name: string;
  state_id: number | null;
  step_id: number | null;
  updated_at: string;
  fullname?: string;
}

export interface Company {
  id: number;
  name: string;
  branches: any[]; // Assuming it is an array of similar objects.
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

export interface Payload {
  current_cleint?: CurrentClient; // Correct property name
  genders?: Gender[]; // Correct property name
  total_pages?: number;
  total_count?: number;
  system_users?: User[];
  departments?: Department[];
  countrys?: Country[];
  companys?: Company[];
  branchs?: Branch[];
}

export interface ApiResponse {
  status: string;
  message: string;
  payload: Payload;
}
