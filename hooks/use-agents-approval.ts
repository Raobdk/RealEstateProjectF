import { useEffect, useState } from "react";
import { agentApprovalAPI } from "@/lib/api";

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  approvedByAdmin?: boolean;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
  agentProfile?: {
    licenseNumber?: string;
    agency?: string;
    experience?: number;
    specialization?: string[];
    commissionRate?: number;
  };
  profile?: {
    cnic?: string;
    address?: string;
    city?: string;
    avatar?: string;
    bio?: string;
  };
  rating?: number;
}

interface UseAgentsReturn {
  agents: Agent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  approveAgent: (id: string) => Promise<void>;
  rejectAgent: (id: string, reason?: string) => Promise<void>;
  suspendAgent: (id: string, reason?: string) => Promise<void>;
  reactivateAgent: (id: string) => Promise<void>;
}

export function useAgents(params?: { status?: string }): UseAgentsReturn {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (params?.status === "pending") {
        response = await agentApprovalAPI.getPendingAgents();
      } else {
        response = await agentApprovalAPI.getAllAgents(params);
      }
      
      setAgents(response.data.data.agents);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to fetch agents");
      console.error("Error fetching agents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.status]);

  const approveAgent = async (id: string) => {
    try {
      await agentApprovalAPI.approveAgent(id);
      await fetchAgents();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      throw new Error(error.response?.data?.message || "Failed to approve agent");
    }
  };

  const rejectAgent = async (id: string, reason?: string) => {
    try {
      await agentApprovalAPI.rejectAgent(id, reason);
      await fetchAgents();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      throw new Error(error.response?.data?.message || "Failed to reject agent");
    }
  };

  const suspendAgent = async (id: string, reason?: string) => {
    try {
      await agentApprovalAPI.suspendAgent(id, reason);
      await fetchAgents();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      throw new Error(error.response?.data?.message || "Failed to suspend agent");
    }
  };

  const reactivateAgent = async (id: string) => {
    try {
      await agentApprovalAPI.reactivateAgent(id);
      await fetchAgents();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      throw new Error(error.response?.data?.message || "Failed to reactivate agent");
    }
  };

  return {
    agents,
    loading,
    error,
    refetch: fetchAgents,
    approveAgent,
    rejectAgent,
    suspendAgent,
    reactivateAgent,
  };
}

export function useApprovedAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApprovedAgents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await agentApprovalAPI.getApprovedAgents();
        setAgents(response.data.data.agents);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(error.response?.data?.message || "Failed to fetch approved agents");
        console.error("Error fetching approved agents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedAgents();
  }, []);

  return { agents, loading, error };
}
