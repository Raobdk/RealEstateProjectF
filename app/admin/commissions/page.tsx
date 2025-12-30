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
import { DollarSign, CheckCircle2, Clock, Settings } from "lucide-react";
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
      await commissionAPI.pay(id, {
        paymentReference: reference,
        paymentDate: new Date().toISOString(),
      });
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
    <div className="space-y-6">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Commission Management</h1>
            <p className="text-gray-600">
              Manage agent commissions and disbursements
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/commissions/rules">
              <Settings className="h-4 w-4 mr-2" />
              Commission Rules
            </Link>
          </Button>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection
        variant="slideUp"
        className="grid gap-4 md:grid-cols-3"
      >
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

      {/* Table */}
      <AnimatedSection variant="slideUp">
        <Card>
          <CardHeader>
            <CardTitle>Commission Ledger</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Agent</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => (
                  <TableRow key={commission._id}>
                    <TableCell>#{commission._id.slice(-6)}</TableCell>
                    <TableCell>{commission.agentId?.name || "N/A"}</TableCell>
                    <TableCell>{commission.projectId?.name || "N/A"}</TableCell>
                    <TableCell>
                      PKR {commission.amount?.toLocaleString() || 0}
                    </TableCell>
                    <TableCell>{commission.status}</TableCell>
                    <TableCell className="text-right">
                      {commission.status === "pending" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleApprove(commission._id)}
                        >
                          Approve
                        </Button>
                      )}
                      {commission.status === "approved" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handlePay(commission._id)}
                        >
                          Mark Paid
                        </Button>
                      )}
                      {commission.status === "paid" && (
                        <Button size="sm" variant="ghost" disabled>
                          Completed
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
}
