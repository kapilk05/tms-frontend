import { User } from './auth';
import { PaginationMeta } from './member';

// Task status enum
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

// Task priority enum
export type TaskPriority = 'low' | 'medium' | 'high';

// Task interface
export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string;
  created_by: number;
  assigned_to?: User[];
  created_at: string;
  updated_at: string;
}

// Task list response
export interface TaskListResponse {
  tasks: Task[];
  pagination: PaginationMeta;
}

// Create task request
export interface CreateTaskRequest {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string;
}

// Update task request (all fields optional)
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  due_date?: string;
}

// Assign task request
export interface AssignTaskRequest {
  member_ids: number[];
}

// Task assignment
export interface TaskAssignment {
  task_id: number;
  member_id: number;
  assigned_at: string;
}
