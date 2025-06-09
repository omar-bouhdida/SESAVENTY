// User Types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  profile_picture?: string;
  date_joined: string;
  is_active: boolean;
}

// Authentication Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData, role: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

// Club Types
export interface Club {
  id: number;
  name: string;
  description: string;
  coordinator: User;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ClubForm {
  name: string;
  description: string;
}

export interface ClubCreationRequest {
  id: number;
  name: string;
  description: string;
  requester: User;
  status: string;
  created_at: string;
  updated_at: string;
}

// Event Types
export interface Event {
  id: number;
  club: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
  event_type: 'public' | 'private';
  status: 'upcoming' | 'completed' | 'cancelled';
  created_by: number;
}

export interface EventForm {
  club: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  location: string;
  event_type: 'public' | 'private';
}

// Membership Types
export interface Membership {
  id: number;
  user: User;
  club: Club;
  status: string;
  joined_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

// Component Props
export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Table column definitions
export interface TableColumn<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

// Error Types
export interface ApiError {
  message: string;
  status?: number;
  details?: Record<string, string[]>;
}