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
import { Plus, Users, TrendingUp, DollarSign } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { partnerAPI } from "@/lib/api";

interface Partner {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  sharePercentage: number;
  capitalContributed: number;
  profitDistributed: number;
  currentBalance: number;
  active: boolean;
  capitalTransactions: any[];
  createdAt: string;
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await partnerAPI.getAll();
      const partnersData = response.data.data?.partners || response.data.data || response.data || [];
      setPartners(Array.isArray(partnersData) ? partnersData : []);
    } catch (error) {
      console.error("Failed to fetch partners:", error);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from real data
  const stats = Array.isArray(partners) ? partners.reduce(
    (acc, partner) => ({
      totalInvestment: acc.totalInvestment + partner.capitalContributed,
      totalProfitDistributed: acc.totalProfitDistributed + partner.profitDistributed,
      totalPendingProfit: acc.totalPendingProfit + Math.max(0, partner.currentBalance),
    }),
    { totalInvestment: 0, totalProfitDistributed: 0, totalPendingProfit: 0 }
  ) : { totalInvestment: 0, totalProfitDistributed: 0, totalPendingProfit: 0 };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Partner Management</h1>
            <p className="text-sm sm:text-base text-[#3A3C40] mt-1">Manage partners and profit distribution</p>
          </div>
          <Button className="bg-[#6139DB] hover:bg-[#6139DB]/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Partner
          </Button>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection variant="slideUp" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Partners"
          value={partners.length.toString()}
          icon={Users}
        />
        <StatCard
          title="Total Investment"
          value={`PKR ${(stats.totalInvestment / 1000000).toFixed(1)}M`}
          icon={DollarSign}
        />
        <StatCard
          title="Profit Distributed"
          value={`PKR ${(stats.totalProfitDistributed / 1000000).toFixed(1)}M`}
          icon={TrendingUp}
          iconBg="bg-green-100"
        />
        <StatCard
          title="Pending Profit"
          value={`PKR ${(stats.totalPendingProfit / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          iconBg="bg-orange-100"
        />
      </AnimatedSection>

      {/* Partners Table */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">All Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Share %</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Profit Distributed</TableHead>
                  <TableHead>Current Balance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      Loading partners...
                    </TableCell>
                  </TableRow>
                ) : partners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No partners found
                    </TableCell>
                  </TableRow>
                ) : (
                  partners.map((partner) => (
                    <TableRow key={partner._id}>
                      <TableCell className="font-medium">#{partner._id.slice(-6)}</TableCell>
                      <TableCell>{partner.name}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{partner.email}</p>
                          {partner.phone && <p className="text-gray-500">{partner.phone}</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-[#6139DB]">{partner.sharePercentage}%</span>
                      </TableCell>
                      <TableCell>PKR {partner.capitalContributed.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        PKR {partner.profitDistributed.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-orange-600 font-medium">
                        PKR {partner.currentBalance.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            partner.active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {partner.active ? "Active" : "Inactive"}
                        </span>
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

