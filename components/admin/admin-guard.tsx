"use client";

import { ReactNode } from "react";

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  /**
   * IMPORTANT:
   * Admin access is NOT granted via normal app auth (no signup/login for admin).
   * `/admin/*` is protected by Next Middleware using an HttpOnly cookie (`admin_session`).
   * If the cookie is missing/invalid, users are redirected server-side to `/admin-access`.
   */
  return <>{children}</>;
}

