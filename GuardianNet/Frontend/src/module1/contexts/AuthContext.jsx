import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext(undefined);

const TOKEN_KEY = 'guardiannet_token';
const USER_KEY = 'guardiannet_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Restore session on first load (e.g. after a page refresh).
  useEffect(() => {
    const storedUser = window.localStorage.getItem(USER_KEY);
    const storedToken = window.localStorage.getItem(TOKEN_KEY);
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.removeItem(TOKEN_KEY);
      }
    }
    setAuthLoading(false);
  }, []);

  function persistSession(token, userData) {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  }

  async function login({ email, password }) {
    const data = await loginUser({ email, password });
    persistSession(data.token, data.user);
    return data.user;
  }

  async function register(payload) {
    const data = await registerUser(payload);
    persistSession(data.token, data.user);
    return data.user;
  }

  function logout() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setUser(null);
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    authLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside an <AuthProvider>');
  }
  return ctx;
}
