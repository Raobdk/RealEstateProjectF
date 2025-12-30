"use client";

import { useState, useEffect } from "react";
import { commissionAPI } from "@/lib/api";

export interface Commission {
  _id: string;
  agentId: {
    _id: string;
    name: string;
    email: string;
  };
  plotId: {
    _id: string;
    plotNo: string;
    sizeMarla: number;
  };
  projectId: {
    _id: string;
    name: string;
  };
  amount: number;
  calculatedAmount?: number;
  status: "pending" | "approved" | "paid" | "cancelled";
  paymentDate?: string;
  paymentReference?: string;
  createdAt: string;
}

export function useCommissions(params?: {
  agentId?: string;
  status?: string;
  plotId?: string;
  page?: number;
  limit?: number;
}) {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        setLoading(true);
        const response = await commissionAPI.getAll(params);
        setCommissions(response.data.data.commissions);
        setPagination(response.data.data.pagination);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch commissions");
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, [params?.agentId, params?.status, params?.plotId, params?.page]);

  return { commissions, loading, error, pagination };
}

export function useCommission(id: string) {
  const [commission, setCommission] = useState<Commission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCommission = async () => {
      try {
        setLoading(true);
        const response = await commissionAPI.getById(id);
        setCommission(response.data.data.commission);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch commission");
      } finally {
        setLoading(false);
      }
    };

    fetchCommission();
  }, [id]);

  return { commission, loading, error };
}

