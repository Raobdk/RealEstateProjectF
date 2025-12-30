import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAdminSession } from "./lib/admin-session";

/**
 * Secret Admin Route Protection
 *
 * - Protects `/admin/*` via server-side verification of an HttpOnly cookie (`admin_session`)
 * - Redirects unauthenticated users to `/admin-access` (secret entry route)
 * - Does NOT impact agent/user routes
 */
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_session")?.value;
  const secret = process.env.ADMIN_AUTH_SECRET || "";

  if (!token || !secret) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin-access";
    url.search = "";
    return NextResponse.redirect(url);
  }

  const verification = await verifyAdminSession(token, secret);
  if (!verification.ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin-access";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};


