"use client";

import { useState, useEffect } from "react";
import { listingAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export interface Listing {
  _id: string;
  agentId: {
    _id: string;
    name: string;
    email: string;
  };
  projectId: {
    _id: string;
    name: string;
    location?: {
      city: string;
    };
  };
  plotId?: {
    _id: string;
    plotNo: string;
    sizeMarla: number;
  };
  title: string;
  description?: string;
  price: number;
  area?: {
    value: number;
    unit: string;
  };
  location?: {
    city?: string;
    area?: string;
    address?: string;
  };
  status: "pending" | "approved" | "rejected" | "sold" | "expired";
  views: number;
  createdAt: string;
}

export function useListings(params?: {
  agentId?: string;
  projectId?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  page?: number;
  limit?: number;
  myListings?: boolean;
}) {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        // Create a copy of params without myListings
        const apiParams = { ...params };
        delete apiParams.myListings;
        
        // If myListings is true and user exists, add agentId
        if (params?.myListings && user?.id) {
          apiParams.agentId = user.id;
        }
        
        const response = await listingAPI.getAll(apiParams);
        setListings(response.data.data.listings);
        setPagination(response.data.data.pagination);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [
    params?.agentId,
    params?.projectId,
    params?.status,
    params?.minPrice,
    params?.maxPrice,
    params?.city,
    params?.page,
    params?.myListings,
    user?.id,
  ]);

  return { listings, loading, error, pagination };
}

export function useListing(id: string) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await listingAPI.getById(id);
        setListing(response.data.data.listing);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  return { listing, loading, error };
}

