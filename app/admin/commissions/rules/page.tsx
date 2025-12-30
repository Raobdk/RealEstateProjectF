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
    max: number;
  };
  type: "percent" | "fixed";
  value: number;
  active: boolean;
  priority: number;
  description?: string;
  effectiveFrom?: string;
  effectiveTo?: string;
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

  // Form state
  const [formData, setFormData] = useState({
    projectId: "",
    minSize: "",
    maxSize: "",
    type: "percent",
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
      const response = await commissionAPI.getRules();
      setRules(response.data || []);
    } catch (error) {
      console.error("Failed to fetch commission rules:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const ruleData = {
        projectId: formData.projectId || undefined,
        plotSizeRange: {
          min: parseFloat(formData.minSize) || 0,
          max: parseFloat(formData.maxSize) || Infinity,
        },
        type: formData.type,
        value: parseFloat(formData.value),
        priority: parseInt(formData.priority),
        description: formData.description,
        active: formData.active,
      };

      await commissionAPI.createRule(ruleData);
      
      // Reset form
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
      
      setShowForm(false);
      fetchRules();
    } catch (error) {
      console.error("Failed to create commission rule:", error);
      alert("Failed to create commission rule");
    }
  };

  const handleDelete = async (ruleId: string) => {
    if (!confirm("Are you sure you want to delete this rule?")) return;
    
    try {
      // Note: You might need to add a delete endpoint in the backend
      // For now, we'll just update the rule to be inactive
      await commissionAPI.updateRule(ruleId, { active: false });
      fetchRules();
    } catch (error) {
      console.error("Failed to delete rule:", error);
      alert("Failed to delete rule");
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <AnimatedSection variant="slideDown">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/commissions">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-[#111111]">Commission Rules</h1>
              <p className="text-gray-600 mt-1">
                Configure commission calculation rules for your projects
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#6139DB] hover:bg-[#4F2DB5] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {showForm ? "Cancel" : "Add Rule"}
          </Button>
        </div>
      </AnimatedSection>

      {/* Add Rule Form */}
      {showForm && (
        <AnimatedSection variant="slideUp">
          <Card className="bg-white border-[#E7EAEF]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111111]">
                Create Commission Rule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Project Selection */}
                  <div className="space-y-2">
                    <Label>Project (Optional)</Label>
                    <Select
                      value={formData.projectId}
                      onValueChange={(value) =>
                        setFormData({ ...formData, projectId: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Projects (Global Rule)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Projects (Global)</SelectItem>
                        {projects.map((project) => (
                          <SelectItem key={project._id} value={project._id}>
                            {project.name} ({project.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Commission Type */}
                  <div className="space-y-2">
                    <Label>Commission Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percent">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Amount (PKR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Min Plot Size */}
                  <div className="space-y-2">
                    <Label>Min Plot Size (Marla)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0"
                      value={formData.minSize}
                      onChange={(e) =>
                        setFormData({ ...formData, minSize: e.target.value })
                      }
                    />
                  </div>

                  {/* Max Plot Size */}
                  <div className="space-y-2">
                    <Label>Max Plot Size (Marla)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Unlimited"
                      value={formData.maxSize}
                      onChange={(e) =>
                        setFormData({ ...formData, maxSize: e.target.value })
                      }
                    />
                  </div>

                  {/* Commission Value */}
                  <div className="space-y-2">
                    <Label>
                      Commission Value {formData.type === "percent" ? "(%)" : "(PKR)"}
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder={formData.type === "percent" ? "e.g., 2.5" : "e.g., 50000"}
                      value={formData.value}
                      onChange={(e) =>
                        setFormData({ ...formData, value: e.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                    />
                    <p className="text-xs text-gray-500">
                      Higher priority rules are applied first
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Input
                    placeholder="e.g., Standard commission for 5-10 marla plots"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/* Active Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, active: checked as boolean })
                    }
                  />
                  <Label htmlFor="active" className="cursor-pointer">
                    Active (rule will be applied to new sales)
                  </Label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#6139DB] hover:bg-[#4F2DB5] text-white"
                  >
                    Create Rule
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Rules Table */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">
              Active Commission Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Plot Size Range</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading rules...
                    </TableCell>
                  </TableRow>
                ) : rules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No commission rules found. Create your first rule to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  rules.map((rule) => (
                    <TableRow key={rule._id}>
                      <TableCell className="font-medium">
                        {rule.projectId?.name || (
                          <span className="text-gray-500 italic">All Projects</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {rule.plotSizeRange.min} - {" "}
                        {rule.plotSizeRange.max === Infinity
                          ? "∞"
                          : rule.plotSizeRange.max}{" "}
                        marla
                      </TableCell>
                      <TableCell className="font-semibold text-[#6139DB]">
                        {rule.type === "percent"
                          ? `${rule.value}%`
                          : `PKR ${rule.value.toLocaleString()}`}
                      </TableCell>
                      <TableCell>{rule.priority}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {rule.description || "-"}
                      </TableCell>
                      <TableCell>
                        {rule.active ? (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-800">
                            Inactive
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(rule._id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Info Card */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">How Commission Rules Work</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• <strong>Priority:</strong> Higher priority rules are checked first</li>
              <li>• <strong>Project-specific rules:</strong> Take precedence over global rules</li>
              <li>• <strong>Plot size ranges:</strong> Define which plots the rule applies to</li>
              <li>• <strong>Percentage rules:</strong> Calculate commission as % of sale price</li>
              <li>• <strong>Fixed rules:</strong> Apply a flat commission amount</li>
            </ul>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
