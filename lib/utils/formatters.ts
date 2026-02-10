import { format, parseISO } from 'date-fns';
import { TaskStatus, TaskPriority } from '@/types/task';

/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy');
  } catch (error) {
    return dateString;
  }
};

/**
 * Format datetime string to readable format
 */
export const formatDateTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM dd, yyyy HH:mm');
  } catch (error) {
    return dateString;
  }
};

/**
 * Get Tailwind color class for task status
 */
export const getStatusColor = (status: TaskStatus): string => {
  const colors: Record<TaskStatus, string> = {
    pending: 'bg-gray-100 text-gray-800 border-gray-300',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
  };
  return colors[status] || colors.pending;
};

/**
 * Get Tailwind color class for task priority
 */
export const getPriorityColor = (priority: TaskPriority): string => {
  const colors: Record<TaskPriority, string> = {
    low: 'bg-gray-100 text-gray-700 border-gray-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300',
  };
  return colors[priority] || colors.medium;
};

/**
 * Format task status for display
 */
export const formatStatus = (status: TaskStatus): string => {
  const labels: Record<TaskStatus, string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };
  return labels[status] || status;
};

/**
 * Format task priority for display
 */
export const formatPriority = (priority: TaskPriority): string => {
  const labels: Record<TaskPriority, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };
  return labels[priority] || priority;
};
