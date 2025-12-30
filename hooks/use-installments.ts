"use client";

import { useState, useEffect } from "react";
import { installmentAPI } from "@/lib/api";

export interface InstallmentPlan {
  _id: string;
  buyerId: {
    _id: string;
    name: string;
    email: string;
  };
  plotId: {
    _id: string;
    plotNo: string;
  };
  projectId: {
    _id: string;
    name: string;
  };
  totalAmount: number;
  downPayment: number;
  downPaymentPaid: boolean;
  installments: Array<{
    installmentNo: number;
    dueDate: string;
    amount: number;
    paid: boolean;
    paidDate?: string;
    status: string;
  }>;
  status: "active" | "completed" | "cancelled" | "defaulted";
  totalPaid: number;
  remainingAmount: number;
  nextDueDate?: string;
}

export function useInstallments(params?: {
  buyerId?: string;
  plotId?: string;
  status?: string;
  overdue?: boolean;
  page?: number;
  limit?: number;
}) {
  const [plans, setPlans] = useState<InstallmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    const fetchInstallments = async () => {
      try {
        setLoading(true);
        const response = await installmentAPI.getAll(params);
        setPlans(response.data.data.plans);
        setPagination(response.data.data.pagination);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch installments");
      } finally {
        setLoading(false);
      }
    };

    fetchInstallments();
  }, [
    params?.buyerId,
    params?.plotId,
    params?.status,
    params?.overdue,
    params?.page,
  ]);

  return { plans, loading, error, pagination };
}

export function useInstallment(id: string) {
  const [plan, setPlan] = useState<InstallmentPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchInstallment = async () => {
      try {
        setLoading(true);
        const response = await installmentAPI.getById(id);
        setPlan(response.data.data.plan);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch installment");
      } finally {
        setLoading(false);
      }
    };

    fetchInstallment();
  }, [id]);

  return { plan, loading, error };
}

