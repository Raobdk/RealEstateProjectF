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
import { Wallet, AlertCircle, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { sellerPaymentAPI } from "@/lib/api";

interface SellerPayment {
  _id: string;
  projectId: {
    _id: string;
    name: string;
  };
  plotId?: {
    _id: string;
    plotNo: string;
  };
  sellerName: string;
  sellerContact?: string;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  paymentMode: "lump-sum" | "installments";
  installments?: Array<{
    amount: number;
    dueDate: string;
    status: string;
    paidDate?: string;
  }>;
  status: "pending" | "partial" | "paid";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function SellerPaymentsPage() {
  const [payments, setPayments] = useState<SellerPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSellerPayments();
  }, []);

  const fetchSellerPayments = async () => {
    try {
      setLoading(true);
      const response = await sellerPaymentAPI.getAll();
      setPayments(response.data || []);
    } catch (error) {
      console.error("Failed to fetch seller payments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats from real data
  const stats = payments.reduce(
    (acc, payment) => ({
      totalPayable: acc.totalPayable + payment.totalAmount,
      totalPaid: acc.totalPaid + payment.paidAmount,
      totalPending: acc.totalPending + payment.pendingAmount,
    }),
    { totalPayable: 0, totalPaid: 0, totalPending: 0 }
  );

  // Find next payment date for each seller
  const getNextPaymentDate = (payment: SellerPayment) => {
    if (payment.paymentMode === "installments" && payment.installments) {
      const pendingInstallment = payment.installments.find(
        (inst) => inst.status === "pending"
      );
      if (pendingInstallment) {
        return new Date(pendingInstallment.dueDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }
    }
    return "-";
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Seller Payment Management</h1>
            <p className="text-[#3A3C40] mt-1">Manage payments to landowners and sellers</p>
          </div>
          <Button className="bg-[#6139DB] hover:bg-[#6139DB]/90">
            Record Payment
          </Button>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection variant="slideUp" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Payable"
          value={`PKR ${(stats.totalPayable / 1000000).toFixed(2)}M`}
          icon={Wallet}
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Total Paid"
          value={`PKR ${(stats.totalPaid / 1000000).toFixed(2)}M`}
          icon={CheckCircle2}
          iconBg="bg-green-100"
        />
        <StatCard
          title="Pending Payments"
          value={`PKR ${(stats.totalPending / 1000000).toFixed(2)}M`}
          icon={AlertCircle}
          iconBg="bg-red-100"
        />
      </AnimatedSection>

      {/* Seller Payments Table */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">Seller Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Total Payable</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Payment Mode</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8">
                      Loading seller payments...
                    </TableCell>
                  </TableRow>
                ) : payments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                      No seller payments found
                    </TableCell>
                  </TableRow>
                ) : (
                  payments.map((payment) => (
                    <TableRow key={payment._id}>
                      <TableCell className="font-medium">#{payment._id.slice(-6)}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.sellerName}</p>
                          {payment.sellerContact && (
                            <p className="text-xs text-gray-500">{payment.sellerContact}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{payment.projectId?.name || 'N/A'}</p>
                          {payment.plotId && (
                            <p className="text-xs text-gray-500">Plot: {payment.plotId.plotNo}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>PKR {payment.totalAmount.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        PKR {payment.paidAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-orange-600 font-medium">
                        PKR {payment.pendingAmount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-lg text-xs font-medium bg-[#E7EAEF] text-[#3A3C40]">
                          {payment.paymentMode}
                        </span>
                      </TableCell>
                      <TableCell>{getNextPaymentDate(payment)}</TableCell>
                      <TableCell>
                        {payment.status === "paid" ? (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        ) : payment.status === "partial" ? (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-800">
                            Partial
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-800">
                            Pending
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

