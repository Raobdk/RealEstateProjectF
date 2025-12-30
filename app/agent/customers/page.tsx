"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ModuleHeader } from "@/components/agent/module-header";
import { useCustomers } from "@/hooks/use-customers";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Mail, Phone, MapPin, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AgentCustomersPage() {
  const { user } = useAuth();
  const { customers, loading, addCustomer, refetch } = useCustomers({ agentId: user?.id });
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", cnic: "", address: "" });
  const [adding, setAdding] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setAdding(true);
    try {
      await addCustomer({
        name: form.name,
        email: form.email,
        phone: form.phone,
        cnic: form.cnic,
        address: form.address,
      });
      
      toast({
        title: "Success",
        description: "Customer added successfully",
      });
      
      setForm({ name: "", email: "", phone: "", cnic: "", address: "" });
      refetch();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-12 w-12 animate-spin text-[#6139DB]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ModuleHeader
        title="Customer Management"
        subtitle="Add buyers, link plots, and keep their documents safe."
        actions={
          <span className="text-sm text-[#3A3C40]">
            Total Customers: <strong>{customers.length}</strong>
          </span>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add Customer Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Customer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCustomer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter customer name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-3 w-3 inline mr-1" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@email.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="h-3 w-3 inline mr-1" />
                  Phone *
                </Label>
                <Input
                  id="phone"
                  placeholder="+92 3XX XXXXXXX"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC</Label>
                <Input
                  id="cnic"
                  placeholder="12345-1234567-1"
                  value={form.cnic}
                  onChange={(e) => handleChange("cnic", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">
                  <MapPin className="h-3 w-3 inline mr-1" />
                  Address
                </Label>
                <Input
                  id="address"
                  placeholder="City, Pakistan"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </div>
              <Button 
                type="submit" 
                disabled={adding}
                className="w-full bg-[#6139DB] hover:bg-[#4E2DB0]"
              >
                {adding ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Customers List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
            </CardHeader>
            <CardContent>
              {customers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#3A3C40]">No customers found</p>
                  <p className="text-sm text-[#3A3C40]/60 mt-2">Add your first customer using the form</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customers.map((customer) => (
                    <div 
                      key={customer._id}
                      className="p-4 border border-[#E7EAEF] rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-[#111111]">{customer.name}</h3>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-[#3A3C40] flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </p>
                            <p className="text-sm text-[#3A3C40] flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {customer.phone}
                            </p>
                            {customer.address && (
                              <p className="text-sm text-[#3A3C40] flex items-center gap-2">
                                <MapPin className="h-3 w-3" />
                                {customer.address}
                              </p>
                            )}
                            {customer.assignedPlot && (
                              <p className="text-sm text-[#6139DB] font-medium flex items-center gap-2 mt-2">
                                <FileText className="h-3 w-3" />
                                Plot: {customer.assignedPlot.plotNumber} - {customer.assignedPlot.projectId.name}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-[#3A3C40]/60">
                            Added {new Date(customer.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
