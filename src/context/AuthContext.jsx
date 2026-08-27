import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/services/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "limelle-auth-token";
const USER_KEY = "limelle-auth-user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshProfile = useCallback(async (authToken = token) => {
    if (!authToken) {
      setUserOrders([]);
      return null;
    }
    try {
      setLoading(true);
      const data = await api.me(authToken);
      if (data?.user) {
        setUser(data.user);
        setUserOrders(data.orders || []);
        try {
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        } catch {
          // LocalStorage fallback
        }
      }
      return data;
    } catch {
      // If token is invalid or expired, clear auth
      setToken(null);
      setUser(null);
      setUserOrders([]);
      try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } catch {
        // LocalStorage fallback
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refreshProfile(token);
    }
  }, [token, refreshProfile]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await api.login(credentials);
      if (response?.token && response?.user) {
        setToken(response.token);
        setUser(response.user);
        try {
          localStorage.setItem(TOKEN_KEY, response.token);
          localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        } catch {
          // LocalStorage fallback
        }
        await refreshProfile(response.token);
        return { success: true, user: response.user };
      }
      throw new Error("Réponse de connexion invalide");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await api.register(userData);
      if (response?.token && response?.user) {
        setToken(response.token);
        setUser(response.user);
        try {
          localStorage.setItem(TOKEN_KEY, response.token);
          localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        } catch {
          // LocalStorage fallback
        }
        await refreshProfile(response.token);
        return { success: true, user: response.user };
      }
      throw new Error("Réponse d'inscription invalide");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserOrders([]);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch {
      // LocalStorage fallback
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userOrders,
        loading,
        isAuthenticated: Boolean(user && token),
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé au sein d'un AuthProvider");
  }
  return context;
}
