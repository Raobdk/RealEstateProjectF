"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Clock, XCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AgentGuard({ children }: { children: ReactNode }) {
  const { user, isAgent } = useAuth();

  if (!isAgent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-white/40">
            Restricted
          </p>
          <h1 className="text-3xl font-semibold">Agent access only</h1>
          <p className="text-white/60">
            Contact your administrator to enable agent permissions.
          </p>
        </div>
      </div>
    );
  }

  // Check if agent is not approved
  if (user?.status === "pending" || !user?.approvedByAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#F5F7FA] to-white">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">Account Pending Approval</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-[#3A3C40] text-lg">
              Your agent account is currently under review by our admin team.
            </p>
            <p className="text-[#3A3C40]">
              We'll notify you via email once your account has been approved.
              This typically takes 1-2 business days.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-900">
                <strong>What's next?</strong> Once approved, you'll have full access to:
              </p>
              <ul className="text-sm text-blue-800 mt-2 space-y-1 text-left list-disc list-inside">
                <li>Lead management system</li>
                <li>Property listing creation</li>
                <li>Commission tracking</li>
                <li>Customer relationship tools</li>
                <li>Performance analytics</li>
              </ul>
            </div>
            <div className="pt-4">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                Status: Pending Admin Approval
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if agent is rejected
  if (user?.status === "rejected") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#F5F7FA] to-white">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-700">Account Not Approved</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-[#3A3C40] text-lg">
              Unfortunately, your agent application was not approved at this time.
            </p>
            <p className="text-[#3A3C40]">
              If you believe this is an error or would like more information,
              please contact our support team.
            </p>
            <div className="pt-4">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                Status: Rejected
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if agent is suspended
  if (user?.status === "suspended") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#F5F7FA] to-white">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-gray-600" />
            </div>
            <CardTitle className="text-2xl text-gray-700">Account Suspended</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-[#3A3C40] text-lg">
              Your agent account has been temporarily suspended.
            </p>
            <p className="text-[#3A3C40]">
              Please contact the admin team for more information or to resolve this issue.
            </p>
            <div className="pt-4">
              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                Status: Suspended
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
