import { create } from "zustand";

export type LeadStatus = "new" | "in-progress" | "won" | "lost";

export interface Lead {
  id: string;
  name: string;
  budget: string;
  plot: string;
  status: LeadStatus;
  updatedAt: string;
  channel: string;
  notes: string[];
  timeline: { date: string; label: string }[];
}

export interface Plot {
  id: string;
  title: string;
  size: string;
  price: string;
  status: "available" | "hold" | "allocated";
  sector: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedPlot?: string;
  documents: number;
}

export interface Installment {
  id: string;
  plot: string;
  buyer: string;
  dueDate: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
}

export interface CommissionStatement {
  id: string;
  project: string;
  amount: string;
  status: "pending" | "paid";
  expectedDate: string;
}

export interface ReportMetric {
  label: string;
  value: string;
  trend: string;
}

interface AgentState {
  role: "agent";
  leads: Lead[];
  plots: Plot[];
  customers: Customer[];
  installments: Installment[];
  commissions: CommissionStatement[];
  metrics: ReportMetric[];
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  addLeadNote: (id: string, note: string) => void;
}

const initialLeads: Lead[] = [
  {
    id: "LD-9821",
    name: "Ayesha Khan",
    budget: "PKR 28M",
    plot: "Sector B, Plot 12",
    status: "in-progress",
    updatedAt: "2 hours ago",
    channel: "Website",
    notes: ["Requested updated master plan", "Prefers west open corner plot"],
    timeline: [
      { date: "Jan 02", label: "Lead Captured" },
      { date: "Jan 04", label: "Site Visit" },
      { date: "Jan 09", label: "Document Review" },
    ],
  },
  {
    id: "LD-9822",
    name: "Hassan Raza",
    budget: "PKR 18M",
    plot: "Sector C, Plot 44",
    status: "new",
    updatedAt: "15 mins ago",
    channel: "Referral",
    notes: ["Needs financing partner", "Looking for 1-kanal"],
    timeline: [{ date: "Jan 08", label: "Lead Captured" }],
  },
  {
    id: "LD-9823",
    name: "Sara Malik",
    budget: "PKR 35M",
    plot: "Commercial Hub, Shop 08",
    status: "won",
    updatedAt: "1 day ago",
    channel: "Instagram",
    notes: ["Awaiting agreement signature"],
    timeline: [
      { date: "Dec 18", label: "Lead Captured" },
      { date: "Dec 22", label: "Offer Presented" },
      { date: "Jan 05", label: "Closed" },
    ],
  },
];

export const useAgentStore = create<AgentState>((set) => ({
  role: "agent",
  leads: initialLeads,
  plots: [
    {
      id: "PL-101",
      title: "Emerald Enclave",
      size: "1 Kanal",
      price: "PKR 32M",
      status: "available",
      sector: "A",
    },
    {
      id: "PL-205",
      title: "Canal Heights",
      size: "10 Marla",
      price: "PKR 18M",
      status: "hold",
      sector: "B",
    },
    {
      id: "PL-311",
      title: "Skyline Residency",
      size: "5 Marla",
      price: "PKR 9.5M",
      status: "allocated",
      sector: "C",
    },
  ],
  customers: [
    {
      id: "CU-90",
      name: "Bilal Ahmed",
      email: "bilal@example.com",
      phone: "+92 333 1234567",
      assignedPlot: "PL-101",
      documents: 4,
    },
    {
      id: "CU-91",
      name: "Nimra Shah",
      email: "nimra@example.com",
      phone: "+92 300 9876543",
      documents: 2,
    },
  ],
  installments: [
    {
      id: "IN-01",
      plot: "Emerald Enclave",
      buyer: "Bilal Ahmed",
      dueDate: "Jan 20, 2025",
      amount: "PKR 3.2M",
      status: "pending",
    },
    {
      id: "IN-02",
      plot: "Canal Heights",
      buyer: "Nimra Shah",
      dueDate: "Jan 15, 2025",
      amount: "PKR 1.8M",
      status: "paid",
    },
    {
      id: "IN-03",
      plot: "Skyline Residency",
      buyer: "Sara Malik",
      dueDate: "Dec 30, 2024",
      amount: "PKR 950K",
      status: "overdue",
    },
  ],
  commissions: [
    {
      id: "CM-01",
      project: "Emerald Enclave",
      amount: "PKR 1.6M",
      status: "pending",
      expectedDate: "Jan 25",
    },
    {
      id: "CM-02",
      project: "Skyline Residency",
      amount: "PKR 820K",
      status: "paid",
      expectedDate: "Jan 02",
    },
  ],
  metrics: [
    { label: "Closing Rate", value: "42%", trend: "+6%" },
    { label: "Avg. Response", value: "1.3h", trend: "-12%" },
    { label: "Active Leads", value: "38", trend: "+9" },
  ],
  updateLeadStatus: (id, status) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, status } : lead,
      ),
    })),
  addLeadNote: (id, note) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id ? { ...lead, notes: [note, ...lead.notes] } : lead,
      ),
    })),
}));
