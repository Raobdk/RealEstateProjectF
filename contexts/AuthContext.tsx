"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authUtils, User } from "@/lib/auth";
import { authAPI } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isAgent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = authUtils.getCurrentUser();
    if (storedUser && authUtils.isAuthenticated()) {
      setUser(storedUser);
      // Refresh user data from server
      refreshUser();
    } else {
      setLoading(false);
    }
  }, []);

  const refreshUser = async () => {
    try {
      const response = await authAPI.getMe();
      const userData = response.data.data.user;
      setUser(userData);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // Clear invalid auth data
      authUtils.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authUtils.login(email, password);
    setUser(response.data.user);
  };

  const register = async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
  }) => {
    const response = await authUtils.register(userData);
    setUser(response.data.user);
  };

  const logout = async () => {
    await authUtils.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    refreshUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
    isAgent: user?.role === "agent",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

