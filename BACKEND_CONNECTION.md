# Backend-Frontend Connection Guide

This document explains how the frontend is connected to the backend API.

## 🔌 API Configuration

### Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### API Base Setup

The API is configured in `frontend/lib/api.ts`:
- Base URL: `http://localhost:5000/api` (or from env)
- Automatic token injection via interceptors
- Token refresh handling
- Error handling and redirects

## 🔐 Authentication

### Auth Context

The `AuthContext` (`frontend/contexts/AuthContext.tsx`) provides:
- `user` - Current user object
- `login(email, password)` - Login function
- `register(userData)` - Registration function
- `logout()` - Logout function
- `isAuthenticated` - Boolean flag
- `isAdmin` - Boolean flag
- `isAgent` - Boolean flag

### Usage in Components

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, login, logout, isAdmin } = useAuth();
  
  // Use auth state
}
```

### Protected Routes

Use `ProtectedRoute` component for route protection:

```tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

<ProtectedRoute allowedRoles={["admin"]}>
  <AdminDashboard />
</ProtectedRoute>
```

## 📡 API Services

All API services are available in `frontend/lib/api.ts`:

### Available APIs

- `authAPI` - Authentication endpoints
- `userAPI` - User management
- `projectAPI` - Project CRUD
- `plotAPI` - Plot management
- `listingAPI` - Property listings
- `commissionAPI` - Commission management
- `installmentAPI` - Installment plans
- `reportAPI` - Financial reports
- `partnerAPI` - Partner management
- `sellerPaymentAPI` - Seller payments
- `ledgerAPI` - Ledger entries
- `bankAccountAPI` - Bank accounts
- `importAPI` - CSV/Excel imports
- `fileAPI` - File uploads

### Example Usage

```tsx
import { projectAPI } from "@/lib/api";

// Get all projects
const response = await projectAPI.getAll({ status: "active" });
const projects = response.data.data.projects;

// Create project
await projectAPI.create({
  name: "New Project",
  code: "NP-001",
  location: { city: "Lahore" },
  totalAreaMarla: 1000,
});
```

## 🎣 Custom Hooks

Custom hooks are available for data fetching:

### useProjects

```tsx
import { useProjects } from "@/hooks/use-projects";

function ProjectsList() {
  const { projects, loading, error } = useProjects({ status: "active" });
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render projects */}</div>;
}
```

### Available Hooks

- `useProjects(params?)` - Fetch projects
- `useProject(id)` - Fetch single project
- `usePlots(params?)` - Fetch plots
- `usePlot(id)` - Fetch single plot
- `useUsers(params?)` - Fetch users
- `useUser(id)` - Fetch single user
- `useCommissions(params?)` - Fetch commissions
- `useCommission(id)` - Fetch single commission

## 🔄 Data Flow

1. **Component** calls hook or API directly
2. **Hook/API** makes HTTP request to backend
3. **Backend** processes request and returns data
4. **Frontend** updates state and re-renders

## 📝 Example: Updating Admin Projects Page

```tsx
"use client";

import { useProjects } from "@/hooks/use-projects";
import { projectAPI } from "@/lib/api";
import { useState } from "react";

export default function ProjectsPage() {
  const { projects, loading, error, refetch } = useProjects();
  const [creating, setCreating] = useState(false);

  const handleCreate = async (data) => {
    setCreating(true);
    try {
      await projectAPI.create(data);
      refetch(); // Refresh list
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {projects.map(project => (
        <div key={project._id}>{project.name}</div>
      ))}
    </div>
  );
}
```

## 🚀 Getting Started

1. **Start Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm install
   # Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000/api
   npm run dev
   ```

3. **Seed Database** (optional)
   ```bash
   cd backend
   npm run seed
   ```

4. **Login**
   - Admin: `admin@landora.com` / `admin123`
   - Agent: `agent@landora.com` / `agent123`

## 🔒 Security Features

- JWT tokens stored in localStorage
- Automatic token refresh
- Role-based access control
- Protected routes
- API error handling

## 📊 API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Optional message"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message"
}
```

## 🐛 Troubleshooting

### CORS Issues
- Ensure backend CORS is configured for frontend URL
- Check `FRONTEND_URL` in backend `.env`

### Authentication Issues
- Check token in localStorage
- Verify token hasn't expired
- Check backend JWT_SECRET matches

### API Connection Issues
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Check browser console for errors

## 📚 Next Steps

1. Update remaining pages to use API hooks
2. Add loading states and error handling
3. Implement optimistic updates
4. Add data caching with React Query (optional)
5. Add real-time updates with WebSockets (optional)

