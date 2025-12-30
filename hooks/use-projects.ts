"use client";

import { useState, useEffect } from "react";
import { projectAPI } from "@/lib/api";

export interface Project {
  _id: string;
  name: string;
  code: string;
  location: {
    city: string;
    area?: string;
    address?: string;
  };
  totalAreaMarla: number;
  status: "planning" | "ongoing" | "completed" | "on-hold";
  details?: {
    description?: string;
    features?: string[];
    amenities?: string[];
  };
  pricing?: {
    minPrice?: number;
    maxPrice?: number;
    pricePerMarla?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export function useProjects(params?: {
  status?: string;
  city?: string;
  page?: number;
  limit?: number;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Use admin endpoint that includes all projects (including inactive)
        const response = await projectAPI.getAllForAdmin(params);
        setProjects(response.data.data.projects);
        setPagination(response.data.data.pagination);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [params?.status, params?.city, params?.page]);

  return { projects, loading, error, pagination };
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await projectAPI.getById(id);
        setProject(response.data.data.project);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  return { project, loading, error };
}

