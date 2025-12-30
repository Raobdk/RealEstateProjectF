import axios from "axios";

// Create axios instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Needed so HttpOnly cookies (e.g. env-admin session) can be sent to the backend on cross-origin (different port).
  withCredentials: true,
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Try to refresh token
      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          try {
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/refresh`,
              { refreshToken }
            );

            const { token, refreshToken: newRefreshToken } = response.data.data;
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", newRefreshToken);

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          } catch (refreshError) {
            // Refresh failed, logout user
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            if (typeof window !== "undefined") {
              window.location.href = "/auth/login";
            }
            return Promise.reject(refreshError);
          }
        } else {
          // No refresh token, logout
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }
        }
      }
    }

    // Handle other errors
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";

    console.error("API error:", errorMessage);
    return Promise.reject(error);
  }
);

// API Service Functions

// Auth API
export const authAPI = {
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
  }) => api.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  getMe: () => api.get("/auth/me"),

  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh", { refreshToken }),

  logout: () => api.post("/auth/logout"),
};

// User API
export const userAPI = {
  getAll: (params?: { role?: string; status?: string; page?: number; limit?: number }) =>
    api.get("/users", { params }),

  getById: (id: string) => api.get(`/users/${id}`),

  create: (data: any) => api.post("/users", data),

  update: (id: string, data: any) => api.put(`/users/${id}`, data),

  delete: (id: string) => api.delete(`/users/${id}`),

  getMe: () => api.get("/users/me"),

  updateMe: (data: any) => api.put("/users/me", data),
};

// Project API
export const projectAPI = {
  getAll: (params?: {
    status?: string;
    city?: string;
    page?: number;
    limit?: number;
  }) => api.get("/projects", { params }),

  // Admin endpoint to get all projects including inactive
  getAllForAdmin: (params?: {
    status?: string;
    city?: string;
    page?: number;
    limit?: number;
  }) => api.get("/projects/admin/all", { params }),

  getById: (id: string) => api.get(`/projects/${id}`),

  create: (data: any) => api.post("/projects", data),

  update: (id: string, data: any) => api.put(`/projects/${id}`, data),

  delete: (id: string) => api.delete(`/projects/${id}`),
};

// Plot API
export const plotAPI = {
  getAll: (params?: {
    projectId?: string;
    status?: string;
    block?: string;
    phase?: string;
    minPrice?: number;
    maxPrice?: number;
    minSize?: number;
    maxSize?: number;
    page?: number;
    limit?: number;
  }) => api.get("/plots", { params }),

  getById: (id: string) => api.get(`/plots/${id}`),

  create: (data: any) => api.post("/plots", data),

  update: (id: string, data: any) => api.put(`/plots/${id}`, data),

  delete: (id: string) => api.delete(`/plots/${id}`),

  assignBuyer: (id: string, buyerId: string) =>
    api.post(`/plots/${id}/assign-buyer`, { buyerId }),

  transfer: (id: string, data: any) =>
    api.post(`/plots/${id}/transfer`, data),
};

// Listing API
export const listingAPI = {
  getAll: (params?: {
    agentId?: string;
    projectId?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    page?: number;
    limit?: number;
  }) => api.get("/listings", { params }),

  getById: (id: string) => api.get(`/listings/${id}`),

  create: (data: any) => api.post("/listings", data),

  update: (id: string, data: any) => api.put(`/listings/${id}`, data),

  delete: (id: string) => api.delete(`/listings/${id}`),

  approve: (id: string) => api.put(`/listings/${id}/approve`),

  reject: (id: string, rejectionReason: string) =>
    api.put(`/listings/${id}/reject`, { rejectionReason }),

  addInquiry: (id: string, data: { message: string; contact: string }) =>
    api.post(`/listings/${id}/inquiry`, data),
};

// Commission API
export const commissionAPI = {
  getAll: (params?: {
    agentId?: string;
    status?: string;
    plotId?: string;
    page?: number;
    limit?: number;
  }) => api.get("/commissions", { params }),

  getById: (id: string) => api.get(`/commissions/${id}`),

  calculate: (data: { plotId: string; agentId: string; salePrice: number }) =>
    api.post("/commissions/calculate", data),

  create: (data: any) => api.post("/commissions", data),

  approve: (id: string) => api.put(`/commissions/${id}/approve`),

  pay: (id: string, data: { paymentDate?: string; paymentReference?: string }) =>
    api.put(`/commissions/${id}/pay`, data),

  getRules: (params?: { projectId?: string; active?: boolean }) =>
    api.get("/commissions/rules", { params }),

  createRule: (data: any) => api.post("/commissions/rules", data),

  updateRule: (id: string, data: any) => api.put(`/commissions/rules/${id}`, data),
};

// Installment API
export const installmentAPI = {
  getAll: (params?: {
    buyerId?: string;
    plotId?: string;
    status?: string;
    overdue?: boolean;
    page?: number;
    limit?: number;
  }) => api.get("/installments", { params }),

  getById: (id: string) => api.get(`/installments/${id}`),

  create: (data: any) => api.post("/installments", data),

  pay: (id: string, data: {
    installmentNo: number;
    amount: number;
    paymentReference?: string;
    paidDate?: string;
  }) => api.post(`/installments/${id}/pay`, data),

  payDownPayment: (id: string, data: {
    amount?: number;
    paymentReference?: string;
  }) => api.post(`/installments/${id}/down-payment`, data),

  getOverdue: () => api.get("/installments/overdue"),

  sendReminder: (id: string) => api.post(`/installments/${id}/remind`),
};

// Report API
export const reportAPI = {
  getProfitLoss: (params?: {
    projectId?: string;
    startDate?: string;
    endDate?: string;
  }) => api.get("/reports/profit-loss", { params }),

  getCashFlow: (params?: {
    startDate?: string;
    endDate?: string;
    groupBy?: "day" | "week" | "month";
  }) => api.get("/reports/cash-flow", { params }),

  getReceivablesAging: () => api.get("/reports/receivables-aging"),

  getMonthlyProgress: (params?: { month?: number; year?: number }) =>
    api.get("/reports/monthly-progress", { params }),

  getProjectReport: (projectId: string) =>
    api.get(`/reports/project/${projectId}`),
};

// Seller Payment API (placeholder)
export const sellerPaymentAPI = {
  getAll: () => api.get("/seller-payments"),
  getById: (id: string) => api.get(`/seller-payments/${id}`),
  create: (data: any) => api.post("/seller-payments", data),
  update: (id: string, data: any) => api.put(`/seller-payments/${id}`, data),
};

// Ledger API (placeholder)
export const ledgerAPI = {
  getAll: (params?: any) => api.get("/ledgers", { params }),
  export: (params?: any) => api.get("/ledgers/export", { params }),
};

// Bank Account API (placeholder)
export const bankAccountAPI = {
  getAll: () => api.get("/bank-accounts"),
  getById: (id: string) => api.get(`/bank-accounts/${id}`),
  create: (data: any) => api.post("/bank-accounts", data),
  update: (id: string, data: any) => api.put(`/bank-accounts/${id}`, data),
};

// Import API (placeholder)
export const importAPI = {
  uploadBankStatement: (formData: FormData) =>
    api.post("/imports/bank-statement", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// File Upload API (placeholder)
export const fileAPI = {
  upload: (formData: FormData) =>
    api.post("/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// Calculator API
export const calculatorAPI = {
  calculateConstructionCost: (data: {
    area: number;
    areaUnit: "sqft" | "marla";
    constructionType: "basic" | "standard" | "premium" | "luxury";
    city?: string;
    floors?: number;
    basement?: boolean;
    roofType?: "flat" | "sloped" | "terrace";
  }) => api.post("/calculators/construction-cost", data),

  calculateHomeLoan: (data: {
    propertyValue: number;
    downPayment: number;
    downPaymentType: "amount" | "percentage";
    interestRate: number;
    loanTenure: number;
    loanType?: "fixed" | "floating";
  }) => api.post("/calculators/home-loan", data),

  convertAreaUnit: (data: {
    value: number;
    fromUnit: string;
    toUnit: string;
  }) => api.post("/calculators/area-converter", data),

  getConstructionRates: () => api.get("/calculators/construction-rates"),
};

// Agent Approval API
export const agentApprovalAPI = {
  getPendingAgents: () => api.get("/admin/agents/pending"),
  getAllAgents: (params?: { status?: string }) => api.get("/admin/agents", { params }),
  approveAgent: (id: string) => api.put(`/admin/agents/${id}/approve`),
  rejectAgent: (id: string, reason?: string) => api.put(`/admin/agents/${id}/reject`, { reason }),
  suspendAgent: (id: string, reason?: string) => api.put(`/admin/agents/${id}/suspend`, { reason }),
  reactivateAgent: (id: string) => api.put(`/admin/agents/${id}/reactivate`),
  getApprovedAgents: () => api.get("/agents/approved"),
};

// Notification API
export const notificationAPI = {
  getMyNotifications: () => api.get("/api/agents/notifications"),
  markAsRead: (id: string) => api.put(`/api/agents/notifications/${id}/read`),
  markAllAsRead: () => api.put("/api/agents/notifications/read-all"),
  deleteNotification: (id: string) => api.delete(`/api/agents/notifications/${id}`),
};

// Partner API
export const partnerAPI = {
  getAll: (params?: { active?: boolean }) => api.get("/partners", { params }),
  getById: (id: string) => api.get(`/partners/${id}`),
  create: (data: any) => api.post("/partners", data),
  update: (id: string, data: any) => api.put(`/partners/${id}`, data),
  addCapitalTransaction: (id: string, data: any) => api.post(`/partners/${id}/capital`, data),
  getCapitalHistory: (id: string) => api.get(`/partners/${id}/capital`),
  getProfitDistribution: (id: string, params?: any) => api.get(`/partners/${id}/profit`, { params }),
};
