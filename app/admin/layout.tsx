import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminGuard } from "@/components/admin/admin-guard";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/admin-session";

export const metadata: Metadata = {
  title: "Admin Panel | Landora",
  description: "Landora Admin Control Panel",
};

export default async function AdminLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * Server-side admin gate (robust even if middleware behavior changes).
   * - Reads HttpOnly cookie `admin_session`
   * - Verifies signature using ADMIN_AUTH_SECRET (server-only env)
   * - Redirects to secret entry route if missing/invalid
   */
  const secret = (process.env.ADMIN_AUTH_SECRET || "").trim();
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!secret || !token) {
    redirect("/admin-access");
  }

  const verification = await verifyAdminSession(token, secret);
  if (!verification.ok) {
    redirect("/admin-access");
  }

  return (
    <AdminGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminGuard>
  );
}

