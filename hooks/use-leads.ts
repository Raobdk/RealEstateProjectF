import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  propertyType?: string;
  budget?: number;
  location?: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  source: string;
  notes?: string;
  assignedTo?: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export function useLeads(params?: { agentId?: string; status?: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (params?.agentId) queryParams.append("assignedTo", params.agentId);
      if (params?.status) queryParams.append("status", params.status);

      const response = await api.get(`/api/agents/leads?${queryParams.toString()}`);
      setLeads(response.data.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch leads");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const updateLead = async (id: string, data: Partial<Lead>) => {
    try {
      await api.put(`/api/agents/leads/${id}`, data);
      await fetchLeads();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to update lead");
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await api.delete(`/api/agents/leads/${id}`);
      await fetchLeads();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete lead");
    }
  };

  useEffect(() => {
    fetchLeads();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.agentId, params?.status]);

  return {
    leads,
    loading,
    error,
    refetch: fetchLeads,
    updateLead,
    deleteLead,
  };
}
