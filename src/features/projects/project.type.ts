export type ProjectStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Customer {
  id: string;
  name: string;
  email?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | null;
  status: ProjectStatus;
  start_date: string | null;
  estimated_end_date: string | null;
  created_at: string;
  updated_at: string;
  customer_id: string;
  customer: Customer;
  tasks: Task[];
}

export interface CreateTaskInput {
  title: string;
  description?: string;
}

export interface UpdateTaskInput {
  is_completed?: boolean;
  title?: string;
  description?: string;
}
