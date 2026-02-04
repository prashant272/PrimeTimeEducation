import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, adminLogin } from "../services/api.js";

const AuthContext = createContext(null);

const STORAGE_KEY = "primetime_auth";

function loadStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, token: null };
    return JSON.parse(raw);
  } catch {
    return { user: null, token: null };
  }
}

function storeAuth(value) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    const { user: storedUser, token: storedToken } = loadStoredAuth();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setInitialised(true);
  }, []);

  const handleAuthSuccess = (payload) => {
    const { user: nextUser, token: nextToken } = payload;
    setUser(nextUser);
    setToken(nextToken);
    storeAuth({ user: nextUser, token: nextToken });
  };

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    handleAuthSuccess(data);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    handleAuthSuccess(data);
    return data;
  };

  const loginAsAdmin = async (email, password) => {
    const data = await adminLogin({ email, password });
    handleAuthSuccess(data);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    user,
    token,
    initialised,
    isAuthenticated: Boolean(user && token),
    login,
    register,
    loginAsAdmin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}







