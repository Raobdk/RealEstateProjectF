"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Download, FileText, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { ChartContainer } from "@/components/admin/chart-container";

type ReportType = "profit-loss" | "cash-flow" | "balance-sheet" | "mpr";

function LineChart({ data }: { data: { month: string; value: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.value));
  
  return (
    <div className="h-64 flex items-end justify-between gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-[#E7EAEF] rounded-t-lg relative" style={{ height: "200px" }}>
            <div
              className="absolute bottom-0 w-full bg-[#6139DB] rounded-t-lg transition-all"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
          <span className="text-xs text-[#3A3C40] font-medium">{item.month}</span>
          <span className="text-xs text-[#6139DB] font-semibold">{item.value}M</span>
        </div>
      ))}
    </div>
  );
}

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>("profit-loss");

  const profitLossData = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 61 },
    { month: "May", value: 55 },
    { month: "Jun", value: 67 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Financial Reports</h1>
            <p className="text-[#3A3C40] mt-1">Generate and view financial reports</p>
          </div>
          <Button className="bg-[#6139DB] hover:bg-[#6139DB]/90">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </AnimatedSection>

      {/* Report Type Selection */}
      <AnimatedSection variant="slideUp">
        <Card className="bg-white border-[#E7EAEF]">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <button
                onClick={() => setSelectedReport("profit-loss")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedReport === "profit-loss"
                    ? "border-[#6139DB] bg-[#6139DB]/5"
                    : "border-[#E7EAEF] hover:border-[#6139DB]/50"
                }`}
              >
                <DollarSign className="h-6 w-6 text-[#6139DB] mb-2" />
                <p className="font-semibold text-[#111111]">Profit & Loss</p>
                <p className="text-xs text-[#3A3C40] mt-1">Revenue vs Expenses</p>
              </button>
              <button
                onClick={() => setSelectedReport("cash-flow")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedReport === "cash-flow"
                    ? "border-[#6139DB] bg-[#6139DB]/5"
                    : "border-[#E7EAEF] hover:border-[#6139DB]/50"
                }`}
              >
                <TrendingUp className="h-6 w-6 text-[#6139DB] mb-2" />
                <p className="font-semibold text-[#111111]">Cash Flow</p>
                <p className="text-xs text-[#3A3C40] mt-1">Inflow vs Outflow</p>
              </button>
              <button
                onClick={() => setSelectedReport("balance-sheet")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedReport === "balance-sheet"
                    ? "border-[#6139DB] bg-[#6139DB]/5"
                    : "border-[#E7EAEF] hover:border-[#6139DB]/50"
                }`}
              >
                <BarChart3 className="h-6 w-6 text-[#6139DB] mb-2" />
                <p className="font-semibold text-[#111111]">Balance Sheet</p>
                <p className="text-xs text-[#3A3C40] mt-1">Assets & Liabilities</p>
              </button>
              <button
                onClick={() => setSelectedReport("mpr")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedReport === "mpr"
                    ? "border-[#6139DB] bg-[#6139DB]/5"
                    : "border-[#E7EAEF] hover:border-[#6139DB]/50"
                }`}
              >
                <FileText className="h-6 w-6 text-[#6139DB] mb-2" />
                <p className="font-semibold text-[#111111]">MPR</p>
                <p className="text-xs text-[#3A3C40] mt-1">Monthly Progress</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Report Content */}
      <AnimatedSection variant="slideUp">
        {selectedReport === "profit-loss" && (
          <ChartContainer
            title="Profit & Loss Statement"
            description="Revenue and expenses breakdown for the last 6 months"
          >
            <LineChart data={profitLossData} />
            <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:grid-cols-2">
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-[#3A3C40] mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-green-600">PKR 328M</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-sm text-[#3A3C40] mb-2">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">PKR 245M</p>
              </div>
              <div className="p-4 bg-[#6139DB]/10 rounded-xl md:col-span-2">
                <p className="text-sm text-[#3A3C40] mb-2">Net Profit</p>
                <p className="text-3xl font-bold text-[#6139DB]">PKR 83M</p>
              </div>
            </div>
          </ChartContainer>
        )}

        {selectedReport === "cash-flow" && (
          <ChartContainer
            title="Cash Flow Statement"
            description="Cash inflow and outflow analysis"
          >
            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-[#3A3C40] mb-2">Cash Inflow</p>
                <p className="text-3xl font-bold text-green-600">PKR 350M</p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl">
                <p className="text-sm text-[#3A3C40] mb-2">Cash Outflow</p>
                <p className="text-3xl font-bold text-red-600">PKR 280M</p>
              </div>
              <div className="p-4 bg-[#6139DB]/10 rounded-xl">
                <p className="text-sm text-[#3A3C40] mb-2">Net Cash Flow</p>
                <p className="text-3xl font-bold text-[#6139DB]">PKR 70M</p>
              </div>
            </div>
          </ChartContainer>
        )}

        {selectedReport === "balance-sheet" && (
          <ChartContainer
            title="Balance Sheet"
            description="Assets, liabilities, and equity summary"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-[#111111]">Assets</h3>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-[#3A3C40] mb-2">Current Assets</p>
                  <p className="text-2xl font-bold text-[#111111]">PKR 120M</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-[#3A3C40] mb-2">Fixed Assets</p>
                  <p className="text-2xl font-bold text-[#111111]">PKR 450M</p>
                </div>
                <div className="p-4 bg-[#6139DB]/10 rounded-xl">
                  <p className="text-sm text-[#3A3C40] mb-2">Total Assets</p>
                  <p className="text-2xl font-bold text-[#6139DB]">PKR 570M</p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-[#111111]">Liabilities & Equity</h3>
                <div className="p-4 bg-red-50 rounded-xl">
                  <p className="text-sm text-[#3A3C40] mb-2">Current Liabilities</p>
                  <p className="text-2xl font-bold text-[#111111]">PKR 80M</p>
                </div>
                <div className="p-4 bg-red-50 rounded-xl">
                  <p className="text-sm text-[#3A3C40] mb-2">Long-term Liabilities</p>
                  <p className="text-2xl font-bold text-[#111111]">PKR 200M</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-[#3A3C40] mb-2">Equity</p>
                  <p className="text-2xl font-bold text-[#111111]">PKR 290M</p>
                </div>
              </div>
            </div>
          </ChartContainer>
        )}

        {selectedReport === "mpr" && (
          <ChartContainer
            title="Monthly Progress Report"
            description="Key performance indicators for the current month"
          >
            <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
              <div className="p-6 bg-[#6139DB]/10 rounded-xl">
                <p className="text-sm text-[#3A3C40] mb-2">Sales</p>
                <p className="text-3xl font-bold text-[#6139DB]">PKR 67M</p>
                <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
              </div>
              <div className="p-6 bg-[#6139DB]/10 rounded-xl">
                <p className="text-sm text-[#3A3C40] mb-2">New Leads</p>
                <p className="text-3xl font-bold text-[#6139DB]">145</p>
                <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
              </div>
              <div className="p-6 bg-[#6139DB]/10 rounded-xl">
                <p className="text-sm text-[#3A3C40] mb-2">Plots Sold</p>
                <p className="text-3xl font-bold text-[#6139DB]">42</p>
                <p className="text-xs text-green-600 mt-2">↑ 15% from last month</p>
              </div>
            </div>
          </ChartContainer>
        )}
      </AnimatedSection>
    </div>
  );
}

