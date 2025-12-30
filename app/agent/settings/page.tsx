"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Mail,
  Shield,
  Eye,
  Save,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AgentSettingsPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [leadNotifications, setLeadNotifications] = useState(true);
  const [commissionNotifications, setCommissionNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(true);

  // Appearance
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  const handleSaveSettings = async () => {
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
    
    setSaving(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-[#111111]">Settings</h1>
        <p className="text-[#3A3C40] mt-2">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-xs text-[#3A3C40]">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-xs text-[#3A3C40]">
                  Receive push notifications in browser
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="lead-notifications">New Leads</Label>
                <p className="text-xs text-[#3A3C40]">
                  Get notified about new lead assignments
                </p>
              </div>
              <Switch
                id="lead-notifications"
                checked={leadNotifications}
                onCheckedChange={setLeadNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="commission-notifications">Commissions</Label>
                <p className="text-xs text-[#3A3C40]">
                  Get notified about commission updates
                </p>
              </div>
              <Switch
                id="commission-notifications"
                checked={commissionNotifications}
                onCheckedChange={setCommissionNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Marketing Emails</Label>
                <p className="text-xs text-[#3A3C40]">
                  Receive product updates and newsletters
                </p>
              </div>
              <Switch
                id="marketing-emails"
                checked={marketingEmails}
                onCheckedChange={setMarketingEmails}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy
            </CardTitle>
            <CardDescription>
              Control your profile visibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profile-visibility">Public Profile</Label>
                <p className="text-xs text-[#3A3C40]">
                  Make your profile visible to clients
                </p>
              </div>
              <Switch
                id="profile-visibility"
                checked={profileVisibility}
                onCheckedChange={setProfileVisibility}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-email">Show Email</Label>
                <p className="text-xs text-[#3A3C40]">
                  Display your email on public profile
                </p>
              </div>
              <Switch
                id="show-email"
                checked={showEmail}
                onCheckedChange={setShowEmail}
                disabled={!profileVisibility}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-phone">Show Phone</Label>
                <p className="text-xs text-[#3A3C40]">
                  Display your phone on public profile
                </p>
              </div>
              <Switch
                id="show-phone"
                checked={showPhone}
                onCheckedChange={setShowPhone}
                disabled={!profileVisibility}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize how the dashboard looks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-xs text-[#3A3C40]">
                  Use dark theme (Coming Soon)
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-xl border border-[#E7EAEF] px-4 py-2 text-sm focus:border-[#6139DB] focus:outline-none"
              >
                <option value="en">English</option>
                <option value="ur" disabled>Urdu (Coming Soon)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Email Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Preferences
            </CardTitle>
            <CardDescription>
              Manage your email communications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email Digest</Label>
              <select className="w-full rounded-xl border border-[#E7EAEF] px-4 py-2 text-sm focus:border-[#6139DB] focus:outline-none">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Never</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Report Format</Label>
              <select className="w-full rounded-xl border border-[#E7EAEF] px-4 py-2 text-sm focus:border-[#6139DB] focus:outline-none">
                <option>Summary</option>
                <option>Detailed</option>
                <option>Comprehensive</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reset to Default
        </Button>
        <Button
          onClick={handleSaveSettings}
          disabled={saving}
          className="bg-[#6139DB] hover:bg-[#4E2DB0]"
        >
          {saving ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
