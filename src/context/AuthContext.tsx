import { useMemo, useState, type ReactNode } from 'react';
import { AuthContext, STORAGE_KEY, type AuthContextValue, type AuthUser } from './authState';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as AuthUser;
      }
    } catch (error) {
      console.warn('Failed to parse stored auth user', error);
    }
    return null;
  });

  const login = async ({ email, name }: { email: string; name?: string }) => {
    const fakeUser: AuthUser = {
      id: 'demo-user',
      email,
      name: name ?? 'Demo User',
      token: 'demo-token',
    };
    setUser(fakeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token: user?.token ?? null,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
