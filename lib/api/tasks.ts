import axiosInstance, { handleApiError } from '@/lib/api/axios';
import {
  Task,
  TaskListResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskStatus,
  TaskPriority,
  TaskAssignment,
} from '@/types/task';
import { Member } from '@/types/member';

interface TaskFilters {
  page?: number;
  perPage?: number;
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  sort?: string;
}

/**
 * Get all tasks with filters
 */
export const getTasks = async (filters: TaskFilters = {}): Promise<TaskListResponse> => {
  try {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.perPage) params.append('per_page', filters.perPage.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.sort) params.append('sort', filters.sort);
    
    const response = await axiosInstance.get<TaskListResponse>(
      `/tasks?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Get a single task by ID
 */
export const getTaskById = async (id: number): Promise<Task> => {
  try {
    const response = await axiosInstance.get<Task>(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Create a new task
 */
export const createTask = async (data: CreateTaskRequest): Promise<Task> => {
  try {
    const response = await axiosInstance.post<Task>('/tasks', data);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Update an existing task
 */
export const updateTask = async (
  id: number,
  data: UpdateTaskRequest
): Promise<Task> => {
  try {
    const response = await axiosInstance.patch<Task>(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Assign members to a task
 */
export const assignTask = async (
  taskId: number,
  data: { member_id: number }
): Promise<void> => {
  try {
    await axiosInstance.post(`/tasks/${taskId}/assign`, data);
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Unassign a member from a task
 */
export const unassignTask = async (
  taskId: number,
  memberId: number
): Promise<void> => {
  try {
    await axiosInstance.delete(`/tasks/${taskId}/unassign/${memberId}`);
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Get task assignments
 */
export const getTaskAssignments = async (taskId: number): Promise<Member[]> => {
  try {
    const response = await axiosInstance.get<Member[]>(
      `/tasks/${taskId}/assignments`
    );
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};
