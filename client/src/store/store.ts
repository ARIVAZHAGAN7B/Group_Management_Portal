
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type User, UserRole, type AuthState } from '../types';

interface StoreContextType {
  auth: AuthState;
  login: (user: User) => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = (user: User) => {
    setAuth({
      user,
      isAuthenticated: true,
    });
  };


  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
  };

  // Fix: Use React.createElement instead of JSX because this file has a .ts extension 
  // and JSX syntax is causing parsing errors in this environment.
  return React.createElement(
    StoreContext.Provider,
    { value: { auth, login, logout } },
    children
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
