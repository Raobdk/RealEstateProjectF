"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/ui/animated-section";
import { PageLoader } from "@/components/ui/loader";
import { Search, Edit, Trash2, UserPlus, Shield, UserCheck, AlertCircle } from "lucide-react";
import { useUsers, User } from "@/hooks/use-users";
import { userAPI } from "@/lib/api";
import { format } from "date-fns";
import { validateUserForm, getFieldError, ValidationError } from "@/lib/validations";

type UserType = "admin" | "agent" | "user";
type UserStatus = "active" | "inactive" | "pending" | "suspended";

const userTypeColors: Record<UserType, string> = {
  admin: "bg-purple-100 text-purple-800",
  agent: "bg-blue-100 text-blue-800",
  user: "bg-green-100 text-green-800",
};

const statusColors: Record<UserStatus, string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  suspended: "bg-red-100 text-red-800",
};

export default function UsersPage() {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [newUser, setNewUser] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
    role: UserType;
    status: UserStatus;
  }>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    status: "active",
  });
  
  const { users, loading, error } = useUsers({
    role: selectedRole === "all" ? undefined : selectedRole,
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;

    setIsSubmitting(true);
    try {
      await userAPI.update(editingUser._id, {
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
        role: editingUser.role,
        status: editingUser.status,
      });
      
      setEditingUser(null);
      window.location.reload(); // Refresh to show updated data
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteUser) return;

    setIsSubmitting(true);
    try {
      await userAPI.delete(deleteUser._id);
      setDeleteUser(null);
      window.location.reload(); // Refresh to show updated data
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await userAPI.create(newUser);
      setIsCreating(false);
      setNewUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
        status: "active",
      });
      window.location.reload(); // Refresh to show updated data
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.role !== "agent" || u.status === "active").length,
    pending: users.filter((u) => u.role === "agent" && u.status === "pending").length,
    agents: users.filter((u) => u.role === "agent").length,
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">
              Manage users, agents, and admins
            </p>
          </div>
          <Button onClick={() => setIsCreating(true)} className="bg-[#6139DB] hover:bg-[#6139DB]/90">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </AnimatedSection>

      {/* Stats Cards */}
      <AnimatedSection>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
              <Shield className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.agents}</div>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      {/* Filters and Search */}
      <AnimatedSection>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                {["all", "admin", "agent", "user"].map((role) => (
                  <Button
                    key={role}
                    variant={selectedRole === role ? "default" : "outline"}
                    onClick={() => setSelectedRole(role)}
                    className="capitalize"
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Users Table */}
      <AnimatedSection>
        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <PageLoader text="Loading users..." />
            ) : error ? (
              <div className="text-center py-8 text-red-600">
                Error: {error}
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone || "N/A"}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              userTypeColors[user.role]
                            }`}
                          >
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          {user.role === "agent" ? (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                statusColors[user.status]
                              }`}
                            >
                              {user.status}
                            </span>
                          ) : (
                            <span className="text-sm text-green-600 font-medium">● Active</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {format(new Date(user.createdAt), "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingUser(user)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteUser(user)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => {
        if (!open) {
          setEditingUser(null);
          setValidationErrors([]);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and status
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <form onSubmit={handleEditUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingUser.name}
                    onChange={(e) => {
                      setEditingUser({ ...editingUser, name: e.target.value });
                      setValidationErrors((prev) => prev.filter((err) => err.field !== "name"));
                    }}
                    className={getFieldError(validationErrors, "name") ? "border-red-500" : ""}
                    required
                  />
                  {getFieldError(validationErrors, "name") && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError(validationErrors, "name")}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => {
                      setEditingUser({ ...editingUser, email: e.target.value });
                      setValidationErrors((prev) => prev.filter((err) => err.field !== "email"));
                    }}
                    className={getFieldError(validationErrors, "email") ? "border-red-500" : ""}
                    required
                  />
                  {getFieldError(validationErrors, "email") && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError(validationErrors, "email")}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={editingUser.phone || ""}
                    onChange={(e) => {
                      setEditingUser({ ...editingUser, phone: e.target.value });
                      setValidationErrors((prev) => prev.filter((err) => err.field !== "phone"));
                    }}
                    className={getFieldError(validationErrors, "phone") ? "border-red-500" : ""}
                  />
                  {getFieldError(validationErrors, "phone") && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {getFieldError(validationErrors, "phone")}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={editingUser.role}
                    onValueChange={(value: any) =>
                      setEditingUser({ ...editingUser, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editingUser.role === "agent" && (
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={editingUser.status}
                      onValueChange={(value: any) =>
                        setEditingUser({ ...editingUser, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingUser(null)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Create User Dialog */}
      <Dialog open={isCreating} onOpenChange={(open) => {
        setIsCreating(open);
        if (!open) setValidationErrors([]);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user, agent, or admin to the system
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateUser}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="new-name">Name</Label>
                <Input
                  id="new-name"
                  value={newUser.name}
                  onChange={(e) => {
                    setNewUser({ ...newUser, name: e.target.value });
                    setValidationErrors((prev) => prev.filter((err) => err.field !== "name"));
                  }}
                  className={getFieldError(validationErrors, "name") ? "border-red-500" : ""}
                  required
                />
                {getFieldError(validationErrors, "name") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError(validationErrors, "name")}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-email">Email</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => {
                    setNewUser({ ...newUser, email: e.target.value });
                    setValidationErrors((prev) => prev.filter((err) => err.field !== "email"));
                  }}
                  className={getFieldError(validationErrors, "email") ? "border-red-500" : ""}
                  required
                />
                {getFieldError(validationErrors, "email") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError(validationErrors, "email")}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-phone">Phone</Label>
                <Input
                  id="new-phone"
                  value={newUser.phone}
                  onChange={(e) => {
                    setNewUser({ ...newUser, phone: e.target.value });
                    setValidationErrors((prev) => prev.filter((err) => err.field !== "phone"));
                  }}
                  className={getFieldError(validationErrors, "phone") ? "border-red-500" : ""}
                  required
                />
                {getFieldError(validationErrors, "phone") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError(validationErrors, "phone")}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => {
                    setNewUser({ ...newUser, password: e.target.value });
                    setValidationErrors((prev) => prev.filter((err) => err.field !== "password"));
                  }}
                  className={getFieldError(validationErrors, "password") ? "border-red-500" : ""}
                  required
                  minLength={6}
                />
                {getFieldError(validationErrors, "password") && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {getFieldError(validationErrors, "password")}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value: any) =>
                    setNewUser({ ...newUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newUser.role === "agent" && (
                <div className="grid gap-2">
                  <Label htmlFor="new-status">Status</Label>
                  <Select
                    value={newUser.status}
                    onValueChange={(value: any) =>
                      setNewUser({ ...newUser, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Agent accounts typically start as "Pending" until approved.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setNewUser({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    role: "user",
                    status: "active",
                  });
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          {deleteUser && (
            <div className="py-4">
              <p className="text-sm">
                <strong>Name:</strong> {deleteUser.name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {deleteUser.email}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteUser(null)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
