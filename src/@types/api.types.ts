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
    users: User[]

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
}

export interface Payload {
    current_cleint?: CurrentClient; // Correct property name
    genders?: Gender[]; // Correct property name
  
}

export interface ApiResponse {
    status: string; 
    message: string; 
    payload: Payload;
}