
export enum UserRole {
  STUDENT = 'STUDENT',
  FACULTY = 'FACULTY',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  rollNumber?: string;
  avatar?: string;

  major?: string;
  department?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
