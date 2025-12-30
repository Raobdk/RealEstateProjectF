"use client";

import { useState, useEffect } from "react";
import { plotAPI } from "@/lib/api";

export interface Plot {
  _id: string;
  projectId: {
    _id: string;
    name: string;
    location?: {
      city: string;
    };
  };
  plotNo: string;
  sizeMarla: number;
  block?: string;
  phase?: string;
  status: "available" | "sold" | "blocked" | "disputed" | "reserved";
  price: number;
  buyerId?: {
    _id: string;
    name: string;
    email: string;
  };
  sellerId?: {
    _id: string;
    name: string;
    email: string;
  };
  features?: {
    corner?: boolean;
    parkFacing?: boolean;
    mainRoad?: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export function usePlots(params?: {
  projectId?: string;
  status?: string;
  block?: string;
  phase?: string;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  page?: number;
  limit?: number;
}) {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        setLoading(true);
        const response = await plotAPI.getAll(params);
        setPlots(response.data.data.plots);
        setPagination(response.data.data.pagination);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch plots");
      } finally {
        setLoading(false);
      }
    };

    fetchPlots();
  }, [
    params?.projectId,
    params?.status,
    params?.block,
    params?.phase,
    params?.minPrice,
    params?.maxPrice,
    params?.page,
  ]);

  return { plots, loading, error, pagination };
}

export function usePlot(id: string) {
  const [plot, setPlot] = useState<Plot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPlot = async () => {
      try {
        setLoading(true);
        const response = await plotAPI.getById(id);
        setPlot(response.data.data.plot);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch plot");
      } finally {
        setLoading(false);
      }
    };

    fetchPlot();
  }, [id]);

  return { plot, loading, error };
}

