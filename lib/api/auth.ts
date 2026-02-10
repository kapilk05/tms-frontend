import axiosInstance, { handleApiError } from '@/lib/api/axios';
import { setToken, setCurrentUser, removeToken } from '../utils/auth';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse 
} from '@/types/auth';

/**
 * Register a new user
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', data);
    
    // Store token and user data in localStorage
    if (response.data.token) {
      setToken(response.data.token);
      setCurrentUser(response.data.user);
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Login user with email and password
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', data);
    
    // Store token and user data in localStorage
    if (response.data.token) {
      setToken(response.data.token);
      setCurrentUser(response.data.user);
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage);
  }
};

/**
 * Logout user - clear localStorage and redirect to login
 */
export const logout = (): void => {
  removeToken();
  
  // Redirect to login page
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};
