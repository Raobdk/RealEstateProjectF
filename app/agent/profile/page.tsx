"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/ui/animated-section";
import { User, Mail, Phone, MapPin, Upload, Save, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

export default function AgentProfilePage() {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    agency: "",
    address: "",
    territory: "",
    licenseNumber: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Load user profile data
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        cnic: user.profile?.cnic || "",
        agency: user.agentProfile?.agencyName || "",
        address: user.profile?.address || "",
        territory: user.agentProfile?.territory || "",
        licenseNumber: user.agentProfile?.licenseNumber || "",
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await api.put("/api/users/me", {
        name: profile.name,
        phone: profile.phone,
        profile: {
          cnic: profile.cnic,
          address: profile.address,
        },
        agentProfile: {
          agencyName: profile.agency,
          territory: profile.territory,
          licenseNumber: profile.licenseNumber,
        },
      });

      await refreshUser();
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setUpdatingPassword(true);
    try {
      await api.put("/api/users/change-password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      toast({
        title: "Success",
        description: "Password updated successfully",
      });

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedSection variant="slideUp">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111111]">Profile Management</h1>
        <p className="text-[#3A3C40] mt-1">Manage your profile and account settings</p>
      </AnimatedSection>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <AnimatedSection variant="slideUp" className="lg:col-span-2">
          <Card className="bg-white border-[#E7EAEF]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111111]">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Profile Photo */}
              <div className="flex items-center gap-4 pb-4 border-b border-[#E7EAEF]">
                <div className="w-24 h-24 rounded-full bg-[#6139DB]/10 flex items-center justify-center">
                  <User className="h-12 w-12 text-[#6139DB]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#111111]">{profile.name}</p>
                  <p className="text-sm text-[#3A3C40]">{profile.territory} Territory</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnic">CNIC</Label>
                  <Input
                    id="cnic"
                    value={profile.cnic}
                    onChange={(e) => setProfile({ ...profile, cnic: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agency">Agency Name</Label>
                  <Input
                    id="agency"
                    value={profile.agency}
                    onChange={(e) => setProfile({ ...profile, agency: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">License Number</Label>
                  <Input
                    id="license"
                    value={profile.licenseNumber}
                    onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </div>
              </div>

              <Button
                onClick={handleSaveProfile}
                disabled={saving}
                className="bg-[#6139DB] hover:bg-[#6139DB]/90"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Sidebar */}
        <AnimatedSection variant="slideUp" className="space-y-6">
          {/* Change Password */}
          <Card className="bg-white border-[#E7EAEF]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111111] flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={handleChangePassword}
                disabled={updatingPassword}
                variant="outline"
                className="w-full"
              >
                {updatingPassword ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* KYC Documents */}
          <Card className="bg-white border-[#E7EAEF]">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#111111]">KYC Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>CNIC (Front & Back)</Label>
                <div className="p-4 border-2 border-dashed border-[#E7EAEF] rounded-xl text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-[#3A3C40]" />
                  <p className="text-sm text-[#3A3C40]">Upload CNIC</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>License Certificate</Label>
                <div className="p-4 border-2 border-dashed border-[#E7EAEF] rounded-xl text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-[#3A3C40]" />
                  <p className="text-sm text-[#3A3C40]">Upload License</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}

