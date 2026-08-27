import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/services/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "limelle-auth-token";
const USER_KEY = "limelle-auth-user";
const LOCAL_USERS_KEY = "limelle-local-users";
const LOCAL_ORDERS_KEY = "limelle-local-user-orders";

function getLocalUsers() {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalUser(user, password) {
  try {
    const users = getLocalUsers();
    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === user.email.toLowerCase());
    if (existingIndex >= 0) {
      users[existingIndex] = { ...user, password };
    } else {
      users.push({ ...user, password });
    }
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch {
    // LocalStorage fallback
  }
}

function findLocalUser(email, password = null) {
  const users = getLocalUsers();
  const normalized = String(email || "").trim().toLowerCase();
  return users.find(
    (u) => u.email.toLowerCase() === normalized && (password === null || u.password === password)
  );
}

function getLocalOrders(userId) {
  if (!userId) return [];
  try {
    const raw = localStorage.getItem(`${LOCAL_ORDERS_KEY}-${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalOrderForUser(userId, order) {
  if (!userId || !order) return;
  try {
    const orders = getLocalOrders(userId);
    const exists = orders.some((o) => o.reference === order.reference);
    if (!exists) {
      orders.unshift(order);
      localStorage.setItem(`${LOCAL_ORDERS_KEY}-${userId}`, JSON.stringify(orders));
    }
  } catch {
    // LocalStorage fallback
  }
}

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

  const refreshProfile = useCallback(
    async (authToken = token, currentUser = user) => {
      if (!authToken) {
        setUserOrders([]);
        return null;
      }
      try {
        setLoading(true);
        if (!authToken.startsWith("local-token-")) {
          try {
            const data = await api.me(authToken);
            if (data?.user) {
              setUser(data.user);
              const combinedOrders = [
                ...(data.orders || []),
                ...getLocalOrders(data.user.id).filter(
                  (lo) => !(data.orders || []).some((ro) => ro.reference === lo.reference)
                ),
              ];
              setUserOrders(combinedOrders);
              try {
                localStorage.setItem(USER_KEY, JSON.stringify(data.user));
              } catch {
                // LocalStorage fallback
              }
              return data;
            }
          } catch {
            // If backend me endpoint is unavailable, fall through to local
          }
        }

        const targetUser = currentUser || user;
        if (targetUser) {
          const orders = getLocalOrders(targetUser.id);
          setUserOrders(orders);
        }
        return { user: targetUser, orders: getLocalOrders(targetUser?.id) };
      } finally {
        setLoading(false);
      }
    },
    [token, user]
  );

  useEffect(() => {
    if (token) {
      refreshProfile(token, user);
    }
  }, [token, refreshProfile]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      let resolvedToken = null;
      let resolvedUser = null;

      try {
        const response = await api.login(credentials);
        if (response?.token && response?.user) {
          resolvedToken = response.token;
          resolvedUser = response.user;
          saveLocalUser(resolvedUser, credentials.password);
        }
      } catch (apiError) {
        const local = findLocalUser(credentials.email, credentials.password);
        if (local) {
          resolvedUser = {
            id: local.id,
            email: local.email,
            fullName: local.fullName,
            phone: local.phone || "",
            city: local.city || "",
            createdAt: local.createdAt,
          };
          resolvedToken = `local-token-${local.id}-${Date.now()}`;
        } else if (
          apiError.message &&
          !apiError.message.includes("fetch") &&
          !apiError.message.includes("JSON") &&
          !apiError.message.includes("503")
        ) {
          throw apiError;
        } else {
          throw new Error("Identifiants incorrects ou compte introuvable.");
        }
      }

      if (resolvedToken && resolvedUser) {
        setToken(resolvedToken);
        setUser(resolvedUser);
        try {
          localStorage.setItem(TOKEN_KEY, resolvedToken);
          localStorage.setItem(USER_KEY, JSON.stringify(resolvedUser));
        } catch {
          // LocalStorage fallback
        }
        await refreshProfile(resolvedToken, resolvedUser);
        return { success: true, user: resolvedUser };
      }
      throw new Error("Impossible de se connecter.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      let resolvedToken = null;
      let resolvedUser = null;

      try {
        const response = await api.register(userData);
        if (response?.token && response?.user) {
          resolvedToken = response.token;
          resolvedUser = response.user;
          saveLocalUser(resolvedUser, userData.password);
        }
      } catch (apiError) {
        if (findLocalUser(userData.email)) {
          throw new Error("Un compte existe déjà avec cette adresse email.");
        }
        const localId = Date.now();
        resolvedUser = {
          id: localId,
          email: userData.email.trim().toLowerCase(),
          fullName: userData.fullName.trim(),
          phone: userData.phone || "",
          city: userData.city || "",
          createdAt: new Date().toISOString(),
        };
        resolvedToken = `local-token-${localId}-${Date.now()}`;
        saveLocalUser(resolvedUser, userData.password);
      }

      if (resolvedToken && resolvedUser) {
        setToken(resolvedToken);
        setUser(resolvedUser);
        try {
          localStorage.setItem(TOKEN_KEY, resolvedToken);
          localStorage.setItem(USER_KEY, JSON.stringify(resolvedUser));
        } catch {
          // LocalStorage fallback
        }
        await refreshProfile(resolvedToken, resolvedUser);
        return { success: true, user: resolvedUser };
      }
      throw new Error("Impossible de créer le compte.");
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
