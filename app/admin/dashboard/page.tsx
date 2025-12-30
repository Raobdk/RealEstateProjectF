"use client";

import { useEffect, useState } from "react";
import { StatCard } from "@/components/admin/stat-card";
import { ChartContainer } from "@/components/admin/chart-container";
import {
  Building2,
  MapPin,
  Users,
  UserCheck,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageLoader } from "@/components/ui/loader";
import { useProjects } from "@/hooks/use-projects";
import { usePlots } from "@/hooks/use-plots";
import { useUsers } from "@/hooks/use-users";
import { reportAPI, installmentAPI } from "@/lib/api";

// Mock chart component (replace with actual chart library like recharts)
function LineChart({ data }: { data: { month: string; value: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  
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
          <span className="text-xs text-[#6139DB] font-semibold">{(item.value / 1000000).toFixed(1)}M</span>
        </div>
      ))}
    </div>
  );
}

function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  
  return (
    <div className="h-64 flex items-end justify-between gap-3">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-[#E7EAEF] rounded-lg relative" style={{ height: "200px" }}>
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-[#6139DB] to-[#6139DB]/80 rounded-lg transition-all"
              style={{ height: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
          <span className="text-xs text-[#3A3C40] font-medium text-center">{item.label}</span>
          <span className="text-xs text-[#6139DB] font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { projects, loading: projectsLoading } = useProjects();
  const { plots, loading: plotsLoading } = usePlots();
  const { users, loading: usersLoading } = useUsers();
  
  const [stats, setStats] = useState({
    totalReceivables: 0,
    sellerPayables: 0,
    monthlySales: [] as { month: string; value: number }[],
    pendingInstallments: [] as { label: string; value: number }[],
    projectProgress: [] as { label: string; value: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch receivables aging report
        const receivablesRes = await reportAPI.getReceivablesAging();
        const receivablesData = receivablesRes.data.data.report.summary;
        
        // Fetch monthly progress report
        const mprRes = await reportAPI.getMonthlyProgress();
        const mprData = mprRes.data.data.report;
        
        // Calculate monthly sales (last 6 months)
        const monthlySalesData = [];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        for (let i = 0; i < 6; i++) {
          monthlySalesData.push({
            month: months[i],
            value: mprData.sales?.totalSalesValue || 0,
          });
        }
        
        // Calculate pending installments by aging
        const overdueRes = await installmentAPI.getOverdue();
        const overdueData = overdueRes.data.data.overdueInstallments || [];
        
        const pendingInstallmentsData = [
          { label: "0-30 Days", value: overdueData.filter((i: any) => i.daysOverdue <= 30).length },
          { label: "31-60 Days", value: overdueData.filter((i: any) => i.daysOverdue > 30 && i.daysOverdue <= 60).length },
          { label: "61-90 Days", value: overdueData.filter((i: any) => i.daysOverdue > 60 && i.daysOverdue <= 90).length },
          { label: "90+ Days", value: overdueData.filter((i: any) => i.daysOverdue > 90).length },
        ];
        
        // Calculate project progress
        const projectProgressData = projects.map((project) => {
          const projectPlots = plots.filter((p) => p.projectId._id === project._id);
          const soldPlots = projectPlots.filter((p) => p.status === "sold").length;
          const totalPlots = projectPlots.length;
          const progress = totalPlots > 0 ? Math.round((soldPlots / totalPlots) * 100) : 0;
          
          return {
            label: project.name,
            value: progress,
          };
        });
        
        setStats({
          totalReceivables: receivablesData.totalReceivables || 0,
          sellerPayables: 0, // Would need seller payment API
          monthlySales: monthlySalesData,
          pendingInstallments: pendingInstallmentsData,
          projectProgress: projectProgressData.slice(0, 4),
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!projectsLoading && !plotsLoading && !usersLoading) {
      fetchDashboardData();
    }
  }, [projects, plots, users, projectsLoading, plotsLoading, usersLoading]);

  const totalProjects = projects.length;
  const totalPlots = plots.length;
  const totalAgents = users.filter((u) => u.role === "agent").length;
  const totalPartners = users.filter((u) => u.role === "user").length; // Adjust based on your partner model

  if (loading || projectsLoading || plotsLoading || usersLoading) {
    return <PageLoader text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Dashboard Overview</h1>
            <p className="text-sm sm:text-base text-[#3A3C40] mt-1">Monitor your real estate business at a glance</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-[#E7EAEF] rounded-xl text-sm font-medium text-[#3A3C40] hover:bg-[#FAFAFA] transition-colors">
              Export Report
            </button>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Grid */}
      <AnimatedSection variant="slideUp" className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Projects"
          value={totalProjects.toString()}
          icon={Building2}
        />
        <StatCard
          title="Total Plots"
          value={totalPlots.toLocaleString()}
          icon={MapPin}
        />
        <StatCard
          title="Total Agents"
          value={totalAgents.toString()}
          icon={Users}
        />
        <StatCard
          title="Total Partners"
          value={totalPartners.toString()}
          icon={UserCheck}
        />
        <StatCard
          title="Total Receivables"
          value={`PKR ${(stats.totalReceivables / 1000000).toFixed(1)}M`}
          icon={Wallet}
          trend={{ value: "-12%", isPositive: false }}
          iconBg="bg-orange-100"
        />
        <StatCard
          title="Seller Payables"
          value={`PKR ${(stats.sellerPayables / 1000000).toFixed(1)}M`}
          icon={TrendingUp}
          trend={{ value: "+8%", isPositive: false }}
          iconBg="bg-red-100"
        />
      </AnimatedSection>

      {/* Charts Grid */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <AnimatedSection variant="slideUp">
          <ChartContainer
            title="Monthly Sales"
            description="Revenue generated over the last 6 months"
          >
            <LineChart data={stats.monthlySales} />
          </ChartContainer>
        </AnimatedSection>

        <AnimatedSection variant="slideUp">
          <ChartContainer
            title="Pending Installments"
            description="Installments grouped by aging"
          >
            <BarChart data={stats.pendingInstallments} />
          </ChartContainer>
        </AnimatedSection>
      </div>

      {/* Project Progress */}
      <AnimatedSection variant="slideUp">
        <ChartContainer
          title="Project Progress"
          description="Completion percentage by project"
          className="lg:col-span-2"
        >
          <div className="space-y-4">
            {stats.projectProgress.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#111111]">{project.label}</span>
                  <span className="text-sm font-semibold text-[#6139DB]">{project.value}%</span>
                </div>
                <div className="w-full bg-[#E7EAEF] rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-[#6139DB] to-[#6139DB]/80 h-2.5 rounded-full transition-all"
                    style={{ width: `${project.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </AnimatedSection>

      {/* Quick Actions */}
      <AnimatedSection variant="slideUp">
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <button className="p-4 bg-white border border-[#E7EAEF] rounded-xl hover:border-[#6139DB] hover:shadow-md transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#6139DB]/10 rounded-lg">
                <Building2 className="h-5 w-5 text-[#6139DB]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">Create Project</p>
                <p className="text-xs text-[#3A3C40]">Add new project</p>
              </div>
            </div>
          </button>
          <button className="p-4 bg-white border border-[#E7EAEF] rounded-xl hover:border-[#6139DB] hover:shadow-md transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#6139DB]/10 rounded-lg">
                <Users className="h-5 w-5 text-[#6139DB]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">Add User</p>
                <p className="text-xs text-[#3A3C40]">Create new user</p>
              </div>
            </div>
          </button>
          <button className="p-4 bg-white border border-[#E7EAEF] rounded-xl hover:border-[#6139DB] hover:shadow-md transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#6139DB]/10 rounded-lg">
                <Wallet className="h-5 w-5 text-[#6139DB]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">Process Payment</p>
                <p className="text-xs text-[#3A3C40]">Record transaction</p>
              </div>
            </div>
          </button>
          <button className="p-4 bg-white border border-[#E7EAEF] rounded-xl hover:border-[#6139DB] hover:shadow-md transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#6139DB]/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-[#6139DB]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111111]">Generate Report</p>
                <p className="text-xs text-[#3A3C40]">Export data</p>
              </div>
            </div>
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
}
