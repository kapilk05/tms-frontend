import { TaskStatus, TaskPriority } from '@/types/task';

// Task statuses
export const TASK_STATUSES: { value: TaskStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

// Task priorities
export const TASK_PRIORITIES: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

// Role names
export const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
];

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  page: 1,
  perPage: 10,
};

// Sort options for tasks
export const SORT_OPTIONS = [
  { value: 'created_at', label: 'Created Date' },
  { value: 'due_date', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
];
