import { createContext } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  token?: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; name?: string }) => Promise<void>;
  logout: () => void;
}

export const STORAGE_KEY = 'intervueai:user';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
