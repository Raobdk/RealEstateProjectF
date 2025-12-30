"use client";

import { useState } from "react";
import { Paperclip, UploadCloud, MessageSquarePlus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ModuleHeader } from "@/components/agent/module-header";
import { useLeads } from "@/hooks/use-leads";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const statusColors = {
  new: "bg-blue-500",
  contacted: "bg-yellow-500",
  qualified: "bg-purple-500",
  converted: "bg-green-500",
  lost: "bg-red-500",
};

const statusLabels = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  converted: "Converted",
  lost: "Lost",
};

export default function AgentLeadsPage() {
  const { user } = useAuth();
  const { leads, loading, updateLead, refetch } = useLeads({ agentId: user?.id });
  const { toast } = useToast();
  const [note, setNote] = useState("");
  const [activeLead, setActiveLead] = useState(leads[0]);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (status: string) => {
    if (!activeLead) return;
    
    setUpdating(true);
    try {
      await updateLead(activeLead._id, { status: status as any });
      toast({
        title: "Success",
        description: "Lead status updated successfully",
      });
      const updatedLeads = await refetch();
      setActiveLead(updatedLeads.find((l: any) => l._id === activeLead._id) || updatedLeads[0]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSubmitNote = async () => {
    if (!note.trim() || !activeLead) return;
    
    setUpdating(true);
    try {
      const currentNotes = activeLead.notes || "";
      const updatedNotes = currentNotes 
        ? `${currentNotes}\n\n[${new Date().toLocaleString()}] ${note}`
        : `[${new Date().toLocaleString()}] ${note}`;
      
      await updateLead(activeLead._id, { notes: updatedNotes });
      toast({
        title: "Success",
        description: "Note added successfully",
      });
      setNote("");
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-[#6139DB]" />
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="space-y-6">
        <ModuleHeader
          title="Lead Management"
          subtitle="Track prospects, update their status, and keep notes."
          actions={
            <Button variant="default" className="bg-[#6139DB]">
              <Plus className="h-4 w-4 mr-2" />
              New Lead
            </Button>
          }
        />
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-[#3A3C40] text-lg">No leads found</p>
            <p className="text-[#3A3C40]/60 text-sm mt-2">Start by adding your first lead</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedLead = activeLead || leads[0];

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Lead Management"
        subtitle="Track prospects, update their status, and keep notes."
        actions={
          <Button className="bg-[#6139DB] hover:bg-[#4E2DB0]">
            <Plus className="h-4 w-4 mr-2" />
            New Lead
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Leads List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">All Leads ({leads.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {leads.map((lead) => (
                <button
                  key={lead._id}
                  onClick={() => setActiveLead(lead)}
                  className={`w-full text-left px-4 py-4 transition-colors ${
                    selectedLead._id === lead._id 
                      ? "bg-[#6139DB]/10 border-l-4 border-[#6139DB]" 
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-[#111111]">{lead.name}</p>
                    <span className={`w-2 h-2 rounded-full ${statusColors[lead.status]}`} />
                  </div>
                  <p className="text-sm text-[#3A3C40] mb-1">{lead.email}</p>
                  <p className="text-xs text-[#3A3C40]/60">{lead.phone}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {lead.source}
                    </Badge>
                    <span className="text-xs text-[#3A3C40]/60">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedLead.name}</CardTitle>
                  <p className="text-[#3A3C40] mt-1">{selectedLead.email}</p>
                  <p className="text-[#3A3C40]">{selectedLead.phone}</p>
                </div>
                <Badge className={statusColors[selectedLead.status] + " text-white"}>
                  {statusLabels[selectedLead.status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status Update Buttons */}
              <div>
                <p className="text-sm font-semibold mb-3">Update Status:</p>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(statusLabels).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedLead.status === status ? "default" : "outline"}
                      onClick={() => handleStatusChange(status)}
                      disabled={updating || selectedLead.status === status}
                      className={selectedLead.status === status ? "bg-[#6139DB]" : ""}
                    >
                      {statusLabels[status as keyof typeof statusLabels]}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Lead Info Grid */}
              <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                {selectedLead.propertyType && (
                  <div>
                    <p className="text-sm text-[#3A3C40]/60">Property Type</p>
                    <p className="font-semibold">{selectedLead.propertyType}</p>
                  </div>
                )}
                {selectedLead.budget && (
                  <div>
                    <p className="text-sm text-[#3A3C40]/60">Budget</p>
                    <p className="font-semibold">PKR {selectedLead.budget.toLocaleString()}</p>
                  </div>
                )}
                {selectedLead.location && (
                  <div>
                    <p className="text-sm text-[#3A3C40]/60">Location</p>
                    <p className="font-semibold">{selectedLead.location}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-[#3A3C40]/60">Source</p>
                  <p className="font-semibold">{selectedLead.source}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notes & Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedLead.notes && (
                <div className="space-y-2">
                  {selectedLead.notes.split('\n\n').map((noteItem, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                      {noteItem}
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="flex-1"
                />
              </div>
              <Button
                onClick={handleSubmitNote}
                disabled={!note.trim() || updating}
                className="w-full bg-[#6139DB] hover:bg-[#4E2DB0]"
              >
                {updating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <MessageSquarePlus className="h-4 w-4 mr-2" />
                    Add Note
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
