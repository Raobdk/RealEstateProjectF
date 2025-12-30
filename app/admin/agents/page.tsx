"use client";

import { useEffect, useState } from "react";
import { agentApprovalAPI, userAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageLoader } from "@/components/ui/loader";
import { CheckCircle, XCircle, Clock, Mail, Phone, User, UserPlus } from "lucide-react";

interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
  agentProfile?: {
    licenseNumber?: string;
    agency?: string;
    experience?: number;
    specialization?: string[];
  };
  profile?: {
    city?: string;
    bio?: string;
  };
}

export default function PendingAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");
  const [isCreating, setIsCreating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const fetchAgents = async () => {
    try {
      setLoading(true);
      let response;
      if (activeTab === "pending") {
        response = await agentApprovalAPI.getPendingAgents();
      } else {
        response = await agentApprovalAPI.getAllAgents();
      }
      setAgents(response.data.data.agents);
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [activeTab]);

  const handleApprove = async (agentId: string) => {
    try {
      setProcessing(agentId);
      await agentApprovalAPI.approveAgent(agentId);
      await fetchAgents();
    } catch (error: any) {
      console.error("Failed to approve agent:", error);
      alert(error.response?.data?.message || "Failed to approve agent");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (agentId: string) => {
    const reason = prompt("Enter reason for rejection (optional):");
    try {
      setProcessing(agentId);
      await agentApprovalAPI.rejectAgent(agentId, reason || undefined);
      await fetchAgents();
    } catch (error: any) {
      console.error("Failed to reject agent:", error);
      alert(error.response?.data?.message || "Failed to reject agent");
    } finally {
      setProcessing(null);
    }
  };

  const handleSuspend = async (agentId: string) => {
    const reason = prompt("Enter reason for suspension (optional):");
    try {
      setProcessing(agentId);
      await agentApprovalAPI.suspendAgent(agentId, reason || undefined);
      await fetchAgents();
    } catch (error: any) {
      console.error("Failed to suspend agent:", error);
      alert(error.response?.data?.message || "Failed to suspend agent");
    } finally {
      setProcessing(null);
    }
  };

  const handleReactivate = async (agentId: string) => {
    try {
      setProcessing(agentId);
      await agentApprovalAPI.reactivateAgent(agentId);
      await fetchAgents();
    } catch (error: any) {
      console.error("Failed to reactivate agent:", error);
      alert(error.response?.data?.message || "Failed to reactivate agent");
    } finally {
      setProcessing(null);
    }
  };

  const handleCreateAgent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await userAPI.create({
        ...newAgent,
        role: "agent",
        status: "pending",
      });
      setIsCreating(false);
      setNewAgent({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      await fetchAgents();
      alert("Agent created successfully and is pending approval");
    } catch (error: any) {
      console.error("Failed to create agent:", error);
      alert(error.response?.data?.message || "Failed to create agent");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "active":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      case "suspended":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
            Suspended
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#111111]">Agent Management</h1>
          <p className="text-[#3A3C40] mt-2">
            Review and manage agent applications
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="bg-[#6139DB] hover:bg-[#6139DB]/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Agent
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === "pending"
              ? "border-b-2 border-[#6139DB] text-[#6139DB]"
              : "text-[#3A3C40] hover:text-[#111111]"
          }`}
        >
          Pending Approval
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-2 px-4 font-medium transition-colors ${
            activeTab === "all"
              ? "border-b-2 border-[#6139DB] text-[#6139DB]"
              : "text-[#3A3C40] hover:text-[#111111]"
          }`}
        >
          All Agents
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {activeTab === "pending" ? "Pending Agents" : "All Agents"}
          </CardTitle>
          <CardDescription>
            {activeTab === "pending"
              ? "Agents awaiting approval to access the platform"
              : "All registered agents in the system"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <PageLoader text="Loading agents..." />
          ) : agents.length === 0 ? (
            <div className="text-center py-8">
              <User className="w-12 h-12 text-[#3A3C40]/40 mx-auto mb-4" />
              <p className="text-[#3A3C40]">
                {activeTab === "pending"
                  ? "No pending agents"
                  : "No agents found"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent._id}>
                      <TableCell>
                        <div className="font-medium">{agent.name}</div>
                        {agent.profile?.city && (
                          <div className="text-sm text-[#3A3C40]">
                            {agent.profile.city}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-[#3A3C40]" />
                            <span className="text-[#3A3C40]">{agent.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-[#3A3C40]" />
                            <span className="text-[#3A3C40]">{agent.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          {agent.agentProfile?.agency && (
                            <div>
                              <span className="text-[#3A3C40]">Agency:</span>{" "}
                              <span className="font-medium">
                                {agent.agentProfile.agency}
                              </span>
                            </div>
                          )}
                          {agent.agentProfile?.experience && (
                            <div>
                              <span className="text-[#3A3C40]">Experience:</span>{" "}
                              <span className="font-medium">
                                {agent.agentProfile.experience} years
                              </span>
                            </div>
                          )}
                          {agent.agentProfile?.licenseNumber && (
                            <div>
                              <span className="text-[#3A3C40]">License:</span>{" "}
                              <span className="font-medium">
                                {agent.agentProfile.licenseNumber}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(agent.status)}</TableCell>
                      <TableCell className="text-sm text-[#3A3C40]">
                        {new Date(agent.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {agent.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(agent._id)}
                                disabled={processing === agent._id}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReject(agent._id)}
                                disabled={processing === agent._id}
                                className="border-red-300 text-red-700 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {agent.status === "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSuspend(agent._id)}
                              disabled={processing === agent._id}
                            >
                              Suspend
                            </Button>
                          )}
                          {agent.status === "suspended" && (
                            <Button
                              size="sm"
                              onClick={() => handleReactivate(agent._id)}
                              disabled={processing === agent._id}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Reactivate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Agent Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Agent</DialogTitle>
            <DialogDescription>
              Add a new agent to the system. The agent will be in pending status until approved.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateAgent}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="agent-name">Name</Label>
                <Input
                  id="agent-name"
                  value={newAgent.name}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agent-email">Email</Label>
                <Input
                  id="agent-email"
                  type="email"
                  value={newAgent.email}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agent-phone">Phone</Label>
                <Input
                  id="agent-phone"
                  value={newAgent.phone}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, phone: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agent-password">Password</Label>
                <Input
                  id="agent-password"
                  type="password"
                  value={newAgent.password}
                  onChange={(e) =>
                    setNewAgent({ ...newAgent, password: e.target.value })
                  }
                  required
                  minLength={6}
                />
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> The agent will be created with "Pending" status and will need to be approved before they can access the system.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewAgent({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                  });
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Agent"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
