"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { ModuleHeader } from "@/components/agent/module-header";
import { useAgentStore } from "@/hooks/use-agent-store";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, LineChart, Share2 } from "lucide-react";

export default function AgentReportsPage() {
  const { metrics } = useAgentStore();

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
      <ModuleHeader
        title="Performance Reports"
        subtitle="Visualize KPIs, download PDF/Excel, and share insights."
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="gradient" className="rounded-full">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </>
        }
      />

      <AnimatedSection
        variant="slideUp"
        className="glass rounded-3xl border border-white/10 p-6 grid gap-6 lg:grid-cols-2"
      >
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <LineChart className="w-5 h-5 text-[#6139DB]" />
            Conversion Velocity
          </h3>
          <p className="text-sm text-white/60 mb-4">
            Benchmark your weekly conversions vs. team average.
          </p>
          <div className="h-60 bg-gradient-to-b from-white/10 to-transparent rounded-3xl border border-white/10 flex items-end gap-4 p-6">
            {[45, 52, 38, 69, 80, 58, 90].map((value, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-full bg-gradient-to-b from-[#6139DB] to-[#3A3C40]"
                  style={{ height: `${value + 10}%` }}
                />
                <span className="text-xs text-white/50">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="glass rounded-2xl border border-white/10 p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-white/60">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
              <span className="text-xs text-[#6139DB]">{metric.trend}</span>
            </div>
          ))}
          <Button
            variant="ghost"
            className="w-full gap-2 text-white/70 hover:text-white"
          >
            <Share2 className="w-4 h-4" />
            Share report with client
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
