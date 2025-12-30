import { create } from "zustand";

export interface AdminAgent {
  id: string;
  name: string;
  territory: string;
  commission: string;
  performance: string;
  leads: number;
  projects: number;
}

export interface AdminLead {
  id: string;
  source: string;
  budget: string;
  assignedTo?: string;
  status: "new" | "contacted" | "in-progress" | "closed";
}

export interface AdminCommissionRule {
  id: string;
  project: string;
  baseRate: string;
  bonus: string;
  approval: "pending" | "approved" | "rejected";
}

export interface Project {
  id: string;
  title: string;
  status: "draft" | "active" | "soldout";
}

export interface Plot {
  id: string;
  project: string;
  size: string;
  price: string;
  status: "available" | "hold" | "allocated";
  assignedTo?: string;
}

export interface FinanceRecord {
  id: string;
  type:
    | "Partner Profit"
    | "Seller Payment"
    | "Buyer Installment"
    | "Receivable";
  amount: string;
  dueOn: string;
  status: "pending" | "paid" | "overdue";
}

interface AdminState {
  agents: AdminAgent[];
  leads: AdminLead[];
  commissions: AdminCommissionRule[];
  projects: Project[];
  plots: Plot[];
  finance: FinanceRecord[];
}

export const useAdminStore = create<AdminState>(() => ({
  agents: [
    {
      id: "AG-12",
      name: "Sara Malik",
      territory: "Lahore",
      commission: "2.5%",
      performance: "A",
      leads: 32,
      projects: 4,
    },
    {
      id: "AG-19",
      name: "Bilal Riaz",
      territory: "Islamabad",
      commission: "3%",
      performance: "B+",
      leads: 21,
      projects: 3,
    },
    {
      id: "AG-05",
      name: "Hassan Raza",
      territory: "Karachi",
      commission: "2%",
      performance: "A-",
      leads: 40,
      projects: 5,
    },
  ],
  leads: [
    {
      id: "LD-901",
      source: "Website",
      budget: "PKR 30M",
      assignedTo: "AG-12",
      status: "in-progress",
    },
    { id: "LD-907", source: "Referral", budget: "PKR 18M", status: "new" },
    {
      id: "LD-912",
      source: "Expo",
      budget: "PKR 50M",
      assignedTo: "AG-05",
      status: "contacted",
    },
  ],
  commissions: [
    {
      id: "CR-01",
      project: "Emerald Enclave",
      baseRate: "2.5%",
      bonus: "0.5%",
      approval: "pending",
    },
    {
      id: "CR-02",
      project: "Canal Heights",
      baseRate: "2%",
      bonus: "0.25%",
      approval: "approved",
    },
    {
      id: "CR-03",
      project: "Skyline Residency",
      baseRate: "3%",
      bonus: "1%",
      approval: "pending",
    },
  ],
  projects: [
    { id: "PR-01", title: "Emerald Enclave", status: "active" },
    { id: "PR-02", title: "Canal Heights", status: "active" },
    { id: "PR-03", title: "Skyline Residency", status: "soldout" },
  ],
  plots: [
    {
      id: "PL-201",
      project: "Emerald Enclave",
      size: "1 Kanal",
      price: "PKR 32M",
      status: "available",
    },
    {
      id: "PL-202",
      project: "Emerald Enclave",
      size: "10 Marla",
      price: "PKR 18M",
      status: "hold",
      assignedTo: "AG-12",
    },
    {
      id: "PL-401",
      project: "Skyline Residency",
      size: "Shop",
      price: "PKR 12M",
      status: "allocated",
      assignedTo: "AG-05",
    },
  ],
  finance: [
    {
      id: "FN-01",
      type: "Partner Profit",
      amount: "PKR 12M",
      dueOn: "Jan 20",
      status: "pending",
    },
    {
      id: "FN-02",
      type: "Seller Payment",
      amount: "PKR 4M",
      dueOn: "Jan 10",
      status: "paid",
    },
    {
      id: "FN-03",
      type: "Buyer Installment",
      amount: "PKR 2.5M",
      dueOn: "Jan 05",
      status: "overdue",
    },
    {
      id: "FN-04",
      type: "Receivable",
      amount: "PKR 6.8M",
      dueOn: "Jan 25",
      status: "pending",
    },
  ],
}));
