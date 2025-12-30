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
import { Plus, Upload, Banknote, FileUp } from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";
import { bankAccountAPI } from "@/lib/api";

interface BankAccount {
  _id: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  branch?: string;
  balance: number;
  isActive: boolean;
  transactions: Transaction[];
  createdAt: string;
  updatedAt: string;
}

interface Transaction {
  _id: string;
  date: string;
  description: string;
  amount: number;
  type: "credit" | "debit";
  matched: boolean;
  referenceNumber?: string;
}

export default function BankAccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBalance: 0,
    matchedTransactions: 0,
    unmatchedTransactions: 0,
  });

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      setLoading(true);
      const response = await bankAccountAPI.getAll();
      const data = response.data;
      
      setAccounts(data.accounts || []);
      setStats(data.stats || {
        totalBalance: 0,
        matchedTransactions: 0,
        unmatchedTransactions: 0,
      });
    } catch (error) {
      console.error("Failed to fetch bank accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get all transactions from all accounts
  const allTransactions = accounts.flatMap(account => 
    account.transactions.map(txn => ({
      ...txn,
      accountName: account.bankName,
      accountNumber: account.accountNumber,
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get recent transactions (last 10)
  const recentTransactions = allTransactions.slice(0, 10);

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Bank Accounts</h1>
            <p className="text-[#3A3C40] mt-1">Manage bank accounts and transactions</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV
            </Button>
            <Button className="bg-[#6139DB] hover:bg-[#6139DB]/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection variant="slideUp" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Balance"
          value={`PKR ${(stats.totalBalance / 1000000).toFixed(2)}M`}
          icon={Banknote}
          iconBg="bg-green-100"
        />
        <StatCard
          title="Matched Transactions"
          value={stats.matchedTransactions.toString()}
          icon={FileUp}
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Unmatched Transactions"
          value={stats.unmatchedTransactions.toString()}
          icon={FileUp}
          iconBg="bg-orange-100"
        />
      </AnimatedSection>

      {/* Bank Accounts */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">Bank Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading bank accounts...</div>
            ) : accounts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No bank accounts found. Add your first account to get started.
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {accounts.map((account) => (
                  <Card key={account._id} className="bg-gradient-to-br from-[#6139DB] to-[#6139DB]/80 border-none">
                    <CardContent className="p-6 text-white">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm opacity-90 mb-1">{account.bankName}</p>
                          <p className="text-lg font-semibold">{account.accountType}</p>
                        </div>
                        <div>
                          <p className="text-xs opacity-75 mb-1">Account Number</p>
                          <p className="font-mono text-sm">{account.accountNumber}</p>
                        </div>
                        {account.branch && (
                          <div>
                            <p className="text-xs opacity-75 mb-1">Branch</p>
                            <p className="text-sm">{account.branch}</p>
                          </div>
                        )}
                        <div className="pt-4 border-t border-white/20">
                          <p className="text-xs opacity-75 mb-1">Balance</p>
                          <p className="text-2xl font-bold">
                            PKR {(account.balance / 1000000).toFixed(2)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-xs opacity-75">
                            Status: {account.isActive ? "Active" : "Inactive"}
                          </p>
                        </div>
                        <Button variant="secondary" size="sm" className="w-full mt-4">
                          View Ledger ({account.transactions.length} txns)
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Transactions */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Account</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Loading transactions...
                    </TableCell>
                  </TableRow>
                ) : recentTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  recentTransactions.map((transaction: any) => (
                    <TableRow key={transaction._id}>
                      <TableCell className="font-medium">
                        #{transaction._id.slice(-6)}
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{transaction.accountName}</p>
                          <p className="text-gray-500 text-xs">{transaction.accountNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.description || 'N/A'}</TableCell>
                      <TableCell
                        className={`text-right font-semibold ${
                          transaction.type === "credit" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"} PKR{" "}
                        {transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            transaction.type === "credit"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </TableCell>
                      <TableCell>
                        {transaction.matched ? (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800">
                            Matched
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-lg text-xs font-medium bg-orange-100 text-orange-800">
                            Unmatched
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {!transaction.matched && (
                          <Button variant="ghost" size="sm">
                            Match
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

