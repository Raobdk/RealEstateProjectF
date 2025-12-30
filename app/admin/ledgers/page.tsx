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
import { FileText, Download, Filter } from "lucide-react";
import { ledgerAPI } from "@/lib/api";

type LedgerType = "buyer" | "seller" | "partner" | "agent" | "all";

interface LedgerEntry {
  _id: string;
  date: string;
  type: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  partyType: string;
  partyId: {
    _id: string;
    name?: string;
    sellerName?: string;
  };
  plotId?: {
    _id: string;
    plotNo: string;
  };
  projectId?: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export default function LedgersPage() {
  const [selectedLedger, setSelectedLedger] = useState<LedgerType>("all");
  const [ledgers, setLedgers] = useState<LedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [agingData, setAgingData] = useState({
    "0-30": 0,
    "31-60": 0,
    "61-90": 0,
    "90+": 0,
  });

  useEffect(() => {
    fetchLedgers();
  }, [selectedLedger]);

  const fetchLedgers = async () => {
    try {
      setLoading(true);
      const params: any = {};
      
      if (selectedLedger !== "all") {
        params.partyType = selectedLedger;
      }

      const response = await ledgerAPI.getAll(params);
      const entries = response.data.data?.entries || response.data.data || response.data || [];
      setLedgers(Array.isArray(entries) ? entries : []);

      // Calculate aging data for buyer ledgers
      if (selectedLedger === "buyer" || selectedLedger === "all") {
        const aging = {
          "0-30": 0,
          "31-60": 0,
          "61-90": 0,
          "90+": 0,
        };

        const entriesArray = Array.isArray(entries) ? entries : [];
        entriesArray.forEach((entry: LedgerEntry) => {
          if (entry.partyType === "buyer" && entry.balance > 0) {
            const daysDiff = Math.floor(
              (new Date().getTime() - new Date(entry.date).getTime()) /
                (1000 * 60 * 60 * 24)
            );

            if (daysDiff <= 30) aging["0-30"] += entry.balance;
            else if (daysDiff <= 60) aging["31-60"] += entry.balance;
            else if (daysDiff <= 90) aging["61-90"] += entry.balance;
            else aging["90+"] += entry.balance;
          }
        });

        setAgingData(aging);
      }
    } catch (error) {
      console.error("Failed to fetch ledgers:", error);
      setLedgers([]);
    } finally {
      setLoading(false);
    }
  };

  const getAgingBucket = (date: string) => {
    const daysDiff = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff <= 30) return "0-30";
    else if (daysDiff <= 60) return "31-60";
    else if (daysDiff <= 90) return "61-90";
    else return "90+";
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Ledgers & Receivables</h1>
            <p className="text-[#3A3C40] mt-1">View and manage all financial ledgers</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-[#6139DB] hover:bg-[#6139DB]/90">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Ledger Type Filter */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardContent className="p-4">
            <div className="flex gap-2 flex-wrap">
              {(["all", "buyer", "seller", "partner", "agent"] as LedgerType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedLedger(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedLedger === type
                      ? "bg-[#6139DB] text-white"
                      : "bg-[#FAFAFA] text-[#3A3C40] hover:bg-[#E7EAEF]"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)} Ledger
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Aging Report */}
      {(selectedLedger === "buyer" || selectedLedger === "all") && (
        <AnimatedSection variant="slideUp">
          <Card className="bg-white border-[#E7EAEF]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111111]">Aging Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-xs text-[#3A3C40] mb-1">0-30 Days</p>
                  <p className="text-2xl font-bold text-[#111111]">
                    PKR {(agingData["0-30"] / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl">
                  <p className="text-xs text-[#3A3C40] mb-1">31-60 Days</p>
                  <p className="text-2xl font-bold text-[#111111]">
                    PKR {(agingData["31-60"] / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <p className="text-xs text-[#3A3C40] mb-1">61-90 Days</p>
                  <p className="text-2xl font-bold text-[#111111]">
                    PKR {(agingData["61-90"] / 1000000).toFixed(2)}M
                  </p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl">
                  <p className="text-xs text-[#3A3C40] mb-1">90+ Days</p>
                  <p className="text-2xl font-bold text-[#111111]">
                    PKR {(agingData["90+"] / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      )}

      {/* Ledger Table */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-[#111111]">
              {selectedLedger.charAt(0).toUpperCase() + selectedLedger.slice(1)} Ledger
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entry ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Debit</TableHead>
                  <TableHead className="text-right">Credit</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  {(selectedLedger === "buyer" || selectedLedger === "all") && <TableHead>Aging</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      Loading ledger entries...
                    </TableCell>
                  </TableRow>
                ) : ledgers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No ledger entries found
                    </TableCell>
                  </TableRow>
                ) : (
                  ledgers.map((entry) => (
                    <TableRow key={entry._id}>
                      <TableCell className="font-medium">#{entry._id.slice(-6)}</TableCell>
                      <TableCell>
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {entry.partyId?.name || entry.partyId?.sellerName || 'N/A'}
                          </p>
                          <p className="text-xs text-gray-500">{entry.partyType}</p>
                        </div>
                      </TableCell>
                      <TableCell>{entry.type}</TableCell>
                      <TableCell className="max-w-xs truncate">{entry.description}</TableCell>
                      <TableCell className="text-right text-red-600">
                        {entry.debit > 0 ? `PKR ${entry.debit.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell className="text-right text-green-600">
                        {entry.credit > 0 ? `PKR ${entry.credit.toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        PKR {entry.balance.toLocaleString()}
                      </TableCell>
                      {(selectedLedger === "buyer" || selectedLedger === "all") &&
                        entry.partyType === "buyer" && (
                          <TableCell>
                            <span className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
                              {getAgingBucket(entry.date)} days
                            </span>
                          </TableCell>
                        )}
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

