import { User } from './auth';

// Member interface (extends User)
export interface Member extends User {
  // Add any additional member-specific fields here
}

// Pagination metadata
export interface PaginationMeta {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
}

// Member list response
export interface MemberListResponse {
  members: Member[];
  pagination: PaginationMeta;
}

// Create member request
export interface CreateMemberRequest {
  name: string;
  email: string;
  password: string;
  role_name: 'admin' | 'user';
}

// Update member request (all fields optional)
export interface UpdateMemberRequest {
  name?: string;
  email?: string;
  password?: string;
  role_name?: string;
}
