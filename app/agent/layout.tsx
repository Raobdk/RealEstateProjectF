import { AgentLayout } from "@/components/agent/agent-layout";
import { AgentGuard } from "@/components/agent/agent-guard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Portal | Landora",
  description: "Landora Agent Dashboard",
};

export default function AgentLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AgentGuard>
      <AgentLayout>{children}</AgentLayout>
    </AgentGuard>
  );
}

