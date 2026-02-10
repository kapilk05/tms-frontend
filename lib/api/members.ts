import axiosInstance, { handleApiError } from '@/lib/api/axios';
import {
  Member,
  MemberListResponse,
  CreateMemberRequest,
  UpdateMemberRequest,
} from '@/types/member';

/**
 * Get all members with pagination
 */
export const getMembers = async (params?: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<MemberListResponse> => {
  const { page = 1, perPage = 10, search } = params || {};
  try {
    let url = `/members?page=${page}&per_page=${perPage}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    const response = await axiosInstance.get<MemberListResponse>(url);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Get a single member by ID
 */
export const getMemberById = async (id: number): Promise<Member> => {
  try {
    const response = await axiosInstance.get<Member>(`/members/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Create a new member
 */
export const createMember = async (
  data: CreateMemberRequest
): Promise<Member> => {
  try {
    const response = await axiosInstance.post<Member>('/members', data);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Update an existing member
 */
export const updateMember = async (
  id: number,
  data: UpdateMemberRequest
): Promise<Member> => {
  try {
    const response = await axiosInstance.patch<Member>(`/members/${id}`, data);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Delete a member
 */
export const deleteMember = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/members/${id}`);
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};
