"use client";

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
import { Plus, CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { useInstallments } from "@/hooks/use-installments";

export default function InstallmentsPage() {
  const { plans, loading } = useInstallments();

  // Calculate stats from real data
  const stats = plans.reduce(
    (acc, plan) => {
      const isOverdue = plan.installments.some(
        (inst) => !inst.paid && new Date(inst.dueDate) < new Date()
      );
      
      const overdueAmount = plan.installments
        .filter((inst) => !inst.paid && new Date(inst.dueDate) < new Date())
        .reduce((sum, inst) => sum + inst.amount, 0);

      const thisMonthCollection = plan.installments
        .filter((inst) => {
          if (!inst.paid || !inst.paidDate) return false;
          const paidDate = new Date(inst.paidDate);
          const now = new Date();
          return (
            paidDate.getMonth() === now.getMonth() &&
            paidDate.getFullYear() === now.getFullYear()
          );
        })
        .reduce((sum, inst) => sum + inst.amount, 0);

      return {
        totalReceivables: acc.totalReceivables + plan.remainingAmount,
        overdueAmount: acc.overdueAmount + overdueAmount,
        thisMonthCollection: acc.thisMonthCollection + thisMonthCollection,
      };
    },
    { totalReceivables: 0, overdueAmount: 0, thisMonthCollection: 0 }
  );

  // Helper to get next due date
  const getNextDueDate = (plan: any) => {
    const nextInstallment = plan.installments.find((inst: any) => !inst.paid);
    if (nextInstallment) {
      return new Date(nextInstallment.dueDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
    return "N/A";
  };

  // Helper to check if overdue
  const isOverdue = (plan: any) => {
    return plan.installments.some(
      (inst: any) => !inst.paid && new Date(inst.dueDate) < new Date()
    );
  };

  // Helper to get overdue days
  const getOverdueDays = (plan: any) => {
    const overdueInstallment = plan.installments.find(
      (inst: any) => !inst.paid && new Date(inst.dueDate) < new Date()
    );
    if (overdueInstallment) {
      const dueDate = new Date(overdueInstallment.dueDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - dueDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Installment Management</h1>
            <p className="text-[#3A3C40] mt-1">Track and manage payment plans</p>
          </div>
          <Button className="bg-[#6139DB] hover:bg-[#6139DB]/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Payment Plan
          </Button>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection variant="slideUp" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Receivables"
          value={`PKR ${(stats.totalReceivables / 1000000).toFixed(2)}M`}
          icon={CreditCard}
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Overdue Amount"
          value={`PKR ${(stats.overdueAmount / 1000000).toFixed(2)}M`}
          icon={AlertCircle}
          iconBg="bg-red-100"
        />
        <StatCard
          title="This Month Collection"
          value={`PKR ${(stats.thisMonthCollection / 1000000).toFixed(2)}M`}
          icon={CheckCircle2}
          iconBg="bg-green-100"
        />
      </AnimatedSection>

      {/* Installments Table */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">Active Installments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Installment ID</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Plot</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Next Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">
                      Loading installment plans...
                    </TableCell>
                  </TableRow>
                ) : plans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      No installment plans found
                    </TableCell>
                  </TableRow>
                ) : (
                  plans.map((plan) => (
                    <TableRow key={plan._id}>
                      <TableCell className="font-medium">#{plan._id.slice(-6)}</TableCell>
                      <TableCell>{plan.buyerId?.name || 'N/A'}</TableCell>
                      <TableCell>{plan.plotId?.plotNo || 'N/A'}</TableCell>
                      <TableCell>{plan.projectId?.name || 'N/A'}</TableCell>
                      <TableCell>PKR {plan.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        PKR {plan.totalPaid.toLocaleString()}
                      </TableCell>
                      <TableCell>PKR {plan.remainingAmount.toLocaleString()}</TableCell>
                      <TableCell>{getNextDueDate(plan)}</TableCell>
                      <TableCell>
                        {isOverdue(plan) ? (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-800">
                            Overdue ({getOverdueDays(plan)} days)
                          </span>
                        ) : plan.status === "completed" ? (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
                            {plan.status}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Ledger
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
    </div>
  );
}

