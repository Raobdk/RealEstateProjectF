"use client";

import { useState, useEffect } from "react";
import { userAPI } from "@/lib/api";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "agent" | "user";
  status: "active" | "inactive" | "pending" | "suspended";
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
  createdAt: string;
  updatedAt: string;
}

export function useUsers(params?: {
  role?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getAll(params);
        setUsers(response.data.data.users);
        setPagination(response.data.data.pagination);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [params?.role, params?.status, params?.page]);

  return { users, loading, error, pagination };
}

export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getById(id);
        setUser(response.data.data.user);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading, error };
}

