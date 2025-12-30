# Frontend-Backend Connection Setup Guide

## ✅ What's Been Connected

### 1. API Infrastructure ✅
- ✅ API client configured (`frontend/lib/api.ts`)
- ✅ Axios interceptors for auth tokens
- ✅ Automatic token refresh
- ✅ Error handling and redirects
- ✅ All API service functions created

### 2. Authentication ✅
- ✅ Auth context provider (`frontend/contexts/AuthContext.tsx`)
- ✅ Login/Register pages connected to API
- ✅ Protected route component
- ✅ Admin/Agent guards updated
- ✅ Token management in localStorage

### 3. Custom Hooks ✅
- ✅ `useProjects` - Fetch projects from API
- ✅ `useProject` - Fetch single project
- ✅ `usePlots` - Fetch plots from API
- ✅ `usePlot` - Fetch single plot
- ✅ `useUsers` - Fetch users from API
- ✅ `useUser` - Fetch single user
- ✅ `useCommissions` - Fetch commissions from API
- ✅ `useCommission` - Fetch single commission

### 4. Pages Updated ✅
- ✅ Login page - Connected to auth API
- ✅ Register page - Connected to auth API
- ✅ Root layout - Added AuthProvider
- ✅ Admin guard - Uses ProtectedRoute

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd frontend
npm install axios
```

### Step 2: Configure Environment

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 3: Start Backend

```bash
cd backend
npm install
npm run seed  # Optional: Seed database
npm run dev   # Starts on http://localhost:5000
```

### Step 4: Start Frontend

```bash
cd frontend
npm run dev   # Starts on http://localhost:3000
```

### Step 5: Login

- **Admin**: `admin@landora.com` / `admin123`
- **Agent**: `agent@landora.com` / `agent123`

## 📝 Using the API in Components

### Example 1: Using Hooks

```tsx
"use client";

import { useProjects } from "@/hooks/use-projects";

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects({ status: "active" });

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

### Example 2: Direct API Calls

```tsx
"use client";

import { useState } from "react";
import { projectAPI } from "@/lib/api";

export default function CreateProject() {
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await projectAPI.create({
        name: "New Project",
        code: "NP-001",
        location: { city: "Lahore" },
        totalAreaMarla: 1000,
      });
      alert("Project created!");
    } catch (error) {
      alert("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCreate} disabled={loading}>
      {loading ? "Creating..." : "Create Project"}
    </button>
  );
}
```

### Example 3: Using Auth Context

```tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      {isAdmin && <p>You are an admin</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🔄 Next Steps: Update Remaining Pages

### Pages to Update:

1. **Admin Pages**
   - `/admin/dashboard` - Fetch stats from API
   - `/admin/projects` - Use `useProjects` hook
   - `/admin/plots` - Use `usePlots` hook
   - `/admin/users` - Use `useUsers` hook
   - `/admin/commissions` - Use `useCommissions` hook

2. **Agent Pages**
   - `/agent` - Fetch agent-specific data
   - `/agent/listings` - Use listing API
   - `/agent/leads` - Connect to leads API
   - `/agent/commissions` - Use `useCommissions` hook

3. **Public Pages**
   - `/properties` - Fetch listings from API
   - `/properties/[id]` - Fetch single listing

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: Ensure backend `.env` has:
```env
FRONTEND_URL=http://localhost:3000
```

### Issue: 401 Unauthorized
**Solution**: 
- Check if token exists in localStorage
- Verify backend JWT_SECRET is set
- Try logging in again

### Issue: API Not Found (404)
**Solution**:
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend routes are correct

### Issue: Token Refresh Fails
**Solution**:
- Check refresh token in localStorage
- Verify JWT_REFRESH_SECRET in backend
- Clear localStorage and login again

## 📚 API Documentation

See `frontend/BACKEND_CONNECTION.md` for complete API documentation.

## ✅ Testing Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] `.env.local` configured
- [ ] Can login with admin credentials
- [ ] Can login with agent credentials
- [ ] Protected routes redirect to login
- [ ] API calls work in browser console
- [ ] Token stored in localStorage
- [ ] Token automatically added to requests

## 🎯 Example: Complete Page Update

Here's how to update a page to use the API:

**Before (Mock Data):**
```tsx
const mockProjects = [...];
export default function ProjectsPage() {
  return <div>{mockProjects.map(...)}</div>;
}
```

**After (API Connected):**
```tsx
import { useProjects } from "@/hooks/use-projects";
import { projectAPI } from "@/lib/api";
import { useState } from "react";

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const [creating, setCreating] = useState(false);

  const handleCreate = async (data) => {
    setCreating(true);
    try {
      await projectAPI.create(data);
      // Optionally refetch or update state
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{projects.map(...)}</div>;
}
```

## 🎉 You're All Set!

The backend and frontend are now connected. Start updating your pages to use the API hooks and services!

