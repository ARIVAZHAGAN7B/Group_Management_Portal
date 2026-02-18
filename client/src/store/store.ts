
import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type User, UserRole, type AuthState } from '../types';

interface StoreContextType {
  auth: AuthState;
  login: (user: User) => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const savedUser = localStorage.getItem('gmp_user');
    if (savedUser) {
      try {
        return {
          user: JSON.parse(savedUser),
          isAuthenticated: true,
        };
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
    return {
      user: null,
      isAuthenticated: false,
    };
  });

  const login = (user: User) => {
    localStorage.setItem('gmp_user', JSON.stringify(user));
    setAuth({
      user,
      isAuthenticated: true,
    });
  };


  const logout = () => {
    localStorage.removeItem('gmp_user');
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
