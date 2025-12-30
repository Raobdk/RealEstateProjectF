"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { commissionAPI, projectAPI } from "@/lib/api";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animated-section";

interface CommissionRule {
  _id: string;
  projectId?: {
    _id: string;
    name: string;
  };
  plotSizeRange: {
    min: number;
    max: number | null;
  };
  type: "percent" | "fixed";
  value: number;
  active: boolean;
  priority: number;
  description?: string;
}

interface Project {
  _id: string;
  name: string;
  code: string;
}

export default function CommissionRulesPage() {
  const [rules, setRules] = useState<CommissionRule[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    projectId: "",
    minSize: "",
    maxSize: "",
    type: "percent" as "percent" | "fixed",
    value: "",
    priority: "0",
    description: "",
    active: true,
  });

  useEffect(() => {
    fetchRules();
    fetchProjects();
  }, []);

  const fetchRules = async () => {
    try {
      setLoading(true);
      const res = await commissionAPI.getRules();
      setRules(res.data || []);
    } catch (err) {
      console.error("Failed to fetch rules", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await projectAPI.getAll();
      setProjects(res.data || []);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await commissionAPI.createRule({
        projectId: formData.projectId || undefined,
        plotSizeRange: {
          min: Number(formData.minSize) || 0,
          max: formData.maxSize ? Number(formData.maxSize) : null,
        },
        type: formData.type,
        value: Number(formData.value),
        priority: Number(formData.priority),
        description: formData.description,
        active: formData.active,
      });

      setShowForm(false);
      setFormData({
        projectId: "",
        minSize: "",
        maxSize: "",
        type: "percent",
        value: "",
        priority: "0",
        description: "",
        active: true,
      });

      fetchRules();
    } catch (err) {
      console.error("Create rule failed", err);
      alert("Failed to create rule");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this rule?")) return;
    try {
      await commissionAPI.updateRule(id, { active: false });
      fetchRules();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/admin/commissions">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Commission Rules</h1>
              <p className="text-gray-600">
                Configure commission calculation rules
              </p>
            </div>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "Add Rule"}
          </Button>
        </div>
      </AnimatedSection>

      {/* Form */}
      {showForm
