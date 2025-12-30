"use client";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ModuleHeader } from "@/components/agent/module-header";
import { useAgentStore } from "@/hooks/use-agent-store";
import { AgentDataTable } from "@/components/agent/data-table";
import { Calendar, Download, Clock } from "lucide-react";

export default function AgentInstallmentsPage() {
  const { installments } = useAgentStore();

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
      <ModuleHeader
        title="Installment Tracking"
        subtitle="Monitor payment schedules, trigger reminders, and export statements."
        actions={
          <>
            <Button variant="outline" className="rounded-full">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button variant="gradient" className="rounded-full">
              Send Reminders
            </Button>
          </>
        }
      />

      <AnimatedSection
        variant="slideUp"
        className="glass rounded-3xl border border-white/10 p-6 space-y-4"
      >
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#6139DB]" />
          Upcoming Schedule
        </h3>
        <AgentDataTable
          columns={[
            { key: "plot", label: "Plot" },
            { key: "buyer", label: "Buyer" },
            { key: "dueDate", label: "Due Date" },
            { key: "amount", label: "Amount" },
            {
              key: "status",
              label: "Status",
              render: (row) => (
                <span
                  className={`capitalize ${row.status === "overdue" ? "text-red-400" : row.status === "paid" ? "text-green-400" : "text-amber-400"}`}
                >
                  {row.status}
                </span>
              ),
            },
          ]}
          data={installments}
        />
      </AnimatedSection>

      <AnimatedSection variant="slideUp" className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl border border-white/10 p-6 space-y-4">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#6139DB]" />
            Automated Reminders
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>• SMS & WhatsApp reminder sent 7 days before due date.</li>
            <li>• Escalation email triggered if payment crosses due date.</li>
            <li>• Finance team notified when two installments are overdue.</li>
          </ul>
          <Button variant="outline" className="rounded-full">
            Update Reminder Logic
          </Button>
        </div>
        <div className="glass rounded-3xl border border-white/10 p-6">
          <h4 className="text-lg font-semibold mb-2">Export Center</h4>
          <p className="text-sm text-white/70 mb-4">
            Generate branded payment statements for buyers or internal
            reconciliation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" className="rounded-full">
              PDF Statement
            </Button>
            <Button variant="outline" className="rounded-full">
              Excel Sheet
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
