"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useAgentStore } from "@/hooks/use-agent-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/agent/stat-card";

export default function AgentCommissionsPage() {
  const { commissions } = useAgentStore();

  const totalEarned = commissions
    .filter((c) => c.status === "paid")
    .reduce((sum, c) => {
      const amount = parseFloat(c.amount.replace(/[PKR\s,]/g, ""));
      return sum + (amount || 0);
    }, 0);

  const totalPending = commissions
    .filter((c) => c.status === "pending")
    .reduce((sum, c) => {
      const amount = parseFloat(c.amount.replace(/[PKR\s,]/g, ""));
      return sum + (amount || 0);
    }, 0);

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Commission Management</h1>
            <p className="text-[#3A3C40] mt-1">View your commission earnings and rules</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection variant="slideUp" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Earned"
          value={`PKR ${(totalEarned / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          iconBg="bg-green-100"
        />
        <StatCard
          title="Pending Commissions"
          value={`PKR ${(totalPending / 1000000).toFixed(1)}M`}
          icon={Clock}
          iconBg="bg-yellow-100"
        />
        <StatCard
          title="Total Commissions"
          value={commissions.length.toString()}
          icon={TrendingUp}
          iconBg="bg-purple-100"
        />
      </AnimatedSection>

      {/* Commission Rules */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">Commission Rules by Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-[#FAFAFA] rounded-xl border border-[#E7EAEF]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#111111]">Emerald Enclave</p>
                    <p className="text-sm text-[#3A3C40]">Base Rate: 2.5% • Bonus: 0.5%</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
              <div className="p-4 bg-[#FAFAFA] rounded-xl border border-[#E7EAEF]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[#111111]">Canal Heights</p>
                    <p className="text-sm text-[#3A3C40]">Base Rate: 3% • Bonus: 1%</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Commission History */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">Commission History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Commission ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expected Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell className="font-medium">{commission.id}</TableCell>
                    <TableCell>{commission.project}</TableCell>
                    <TableCell className="font-semibold text-[#6139DB]">
                      {commission.amount}
                    </TableCell>
                    <TableCell>
                      {commission.status === "paid" ? (
                        <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="h-3 w-3" />
                          Paid
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">
                          <Clock className="h-3 w-3" />
                          Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{commission.expectedDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
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

