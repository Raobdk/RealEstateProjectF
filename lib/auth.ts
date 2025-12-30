"use client";

import { authAPI } from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "agent" | "user";
  status: string;
  approvedByAdmin?: boolean;
  approvedAt?: string;
  profile?: {
    cnic?: string;
    address?: string;
    city?: string;
    avatar?: string;
  };
  agentProfile?: {
    licenseNumber?: string;
    agency?: string;
    experience?: number;
    specialization?: string[];
    commissionRate?: number;
  };
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken: string;
  };
  message?: string;
}

// Auth utility functions
export const authUtils = {
  // Login
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await authAPI.login({ email, password });
    const data = response.data;

    if (data.success && typeof window !== "undefined") {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  },

  // Register
  register: async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
  }): Promise<AuthResponse> => {
    const response = await authAPI.register(userData);
    const data = response.data;

    if (data.success && typeof window !== "undefined") {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.data.user));
    }

    return data;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    }
  },

  // Get current user
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get token
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token");
  },

  // Check user role
  hasRole: (role: "admin" | "agent" | "user"): boolean => {
    const user = authUtils.getCurrentUser();
    return user?.role === role;
  },

  // Check if admin
  isAdmin: (): boolean => {
    return authUtils.hasRole("admin");
  },

  // Check if agent
  isAgent: (): boolean => {
    return authUtils.hasRole("agent");
  },
};

