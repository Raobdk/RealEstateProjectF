"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageLoader } from "@/components/ui/loader";
import { Plus, DollarSign, CheckCircle2, Clock, Settings } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { useCommissions } from "@/hooks/use-commissions";
import { commissionAPI } from "@/lib/api";
import Link from "next/link";

export default function CommissionsPage() {
  const { commissions, loading } = useCommissions();
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    paid: 0,
  });

  useEffect(() => {
    if (commissions.length > 0) {
      const pending = commissions
        .filter((c) => c.status === "pending")
        .reduce((sum, c) => sum + (c.amount || 0), 0);
      const approved = commissions
        .filter((c) => c.status === "approved")
        .reduce((sum, c) => sum + (c.amount || 0), 0);
      const paid = commissions
        .filter((c) => c.status === "paid")
        .reduce((sum, c) => sum + (c.amount || 0), 0);

      setStats({ pending, approved, paid });
    }
  }, [commissions]);

  const handleApprove = async (id: string) => {
    try {
      await commissionAPI.approve(id);
      window.location.reload();
    } catch (error) {
      console.error("Failed to approve commission:", error);
      alert("Failed to approve commission");
    }
  };

  const handlePay = async (id: string) => {
    const reference = prompt("Enter payment reference:");
    if (!reference) return;

    try {
      await commissionAPI.pay(id, reference);
      window.location.reload();
    } catch (error) {
      console.error("Failed to pay commission:", error);
      alert("Failed to pay commission");
    }
  };

  if (loading) {
    return <PageLoader text="Loading commissions..." />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Commission Management</h1>
            <p className="text-[#3A3C40] mt-1">Manage agent commissions and disbursements</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/commissions/rules">
                <Settings className="h-4 w-4 mr-2" />
                Commission Rules
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection variant="slideUp" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Pending Commissions"
          value={`PKR ${(stats.pending / 1000).toFixed(0)}K`}
          icon={Clock}
          iconBg="bg-yellow-100"
        />
        <StatCard
          title="Approved Commissions"
          value={`PKR ${(stats.approved / 1000).toFixed(0)}K`}
          icon={CheckCircle2}
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Paid Commissions"
          value={`PKR ${(stats.paid / 1000).toFixed(0)}K`}
          icon={DollarSign}
          iconBg="bg-green-100"
        />
      </AnimatedSection>

      {/* Commissions Table */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">Commission Ledger</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commission ID</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Plot</TableHead>
                  <TableHead>Sale Amount</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">Loading commissions...</TableCell>
                  </TableRow>
                ) : commissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">No commissions found</TableCell>
                  </TableRow>
                ) : (
                  commissions.map((commission) => (
                    <TableRow key={commission._id}>
                      <TableCell className="font-medium">#{commission._id.slice(-6)}</TableCell>
                      <TableCell>{commission.agentId?.name || 'N/A'}</TableCell>
                      <TableCell>{commission.projectId?.name || 'N/A'}</TableCell>
                      <TableCell>{commission.plotId?.plotNo || 'N/A'}</TableCell>
                      <TableCell>PKR {commission.saleAmount?.toLocaleString() || 0}</TableCell>
                      <TableCell>{commission.commissionRate ? `${commission.commissionRate}%` : 'N/A'}</TableCell>
                      <TableCell className="font-semibold text-[#6139DB]">
                        PKR {commission.amount?.toLocaleString() || 0}
                      </TableCell>
                      <TableCell>
                        {commission.dueDate 
                          ? new Date(commission.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                          : 'N/A'
                        }
                      </TableCell>
                      <TableCell>
                        {commission.status === "pending" ? (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        ) : commission.status === "approved" ? (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
                            Approved
                          </span>
                        ) : commission.status === "paid" ? (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-800">
                            {commission.status}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {commission.status === "pending" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(commission._id)}
                          >
                            Approve
                          </Button>
                        )}
                        {commission.status === "approved" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              const reference = prompt("Enter payment reference:");
                              if (reference) handlePay(commission._id, reference);
                            }}
                          >
                            Mark Paid
                          </Button>
                        )}
                        {commission.status === "paid" && (
                          <Button variant="ghost" size="sm" disabled>
                            Completed
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}

