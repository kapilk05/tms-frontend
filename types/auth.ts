// User interface
export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// Login request payload
export interface LoginRequest {
  email: string;
  password: string;
}

// Register request payload
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role_name: 'admin' | 'user';
}

// Auth response from API
export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}
