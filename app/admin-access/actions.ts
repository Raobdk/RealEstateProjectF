"use server";

import bcrypt from "bcryptjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { signAdminSession } from "@/lib/admin-session";

type ActionState = { error?: string };

const attempts = new Map<string, { count: number; resetAt: number }>();
let cachedEnvPasswordHash: string | null = null;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getClientIp() {
  // Next.js 16+ requires awaiting dynamic APIs before using `.get()`.
  // This avoids: "Route used headers().get. headers() returns a Promise..."
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return h.get("x-real-ip") || "unknown";
}

function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const maxAttempts = 12;
  const rec = attempts.get(ip);
  if (!rec || rec.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  rec.count += 1;
  attempts.set(ip, rec);
  return { allowed: rec.count <= maxAttempts };
}

/**
 * Secret admin verification (ENV-based)
 *
 * ENV required (server-only, NOT exposed to client):
 * - ADMIN_EMAIL: admin email
 * - ADMIN_PASSWORD: bcrypt hash (recommended) OR plain (not recommended)
 * - ADMIN_AUTH_SECRET: HMAC secret used to sign the HttpOnly cookie
 */
export async function adminLoginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const envEmail = (process.env.ADMIN_EMAIL || "").trim();
  // Supports either:
  // - bcrypt hash in ADMIN_PASSWORD / ADMIN_PASSWORD_HASH
  // - plain text in ADMIN_PASSWORD (we hash it in-memory server-side and then compare via bcrypt)
  const envPasswordRaw = (process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_HASH || "").trim();
  const authSecret = (process.env.ADMIN_AUTH_SECRET || "").trim();

  // Brute force mitigation (best-effort) + consistent timing
  const ip = await getClientIp();
  const rl = rateLimit(ip);
  await sleep(650);

  // Fail closed if misconfigured
  if (!envEmail || !envPasswordRaw || !authSecret) {
    console.warn("[admin-access] Missing env vars (ADMIN_EMAIL/ADMIN_PASSWORD/ADMIN_AUTH_SECRET).");
    return { error: "Access denied" };
  }

  if (!rl.allowed) {
    console.warn("[admin-access] Rate limited.");
    return { error: "Access denied" };
  }

  const emailOk = email.toLowerCase() === envEmail.toLowerCase();

  // Secure compare:
  // - If env value is already bcrypt, compare directly.
  // - If env value is plain text, hash it in-memory once and compare using bcrypt.
  let envHash = envPasswordRaw;
  if (!envHash.startsWith("$2")) {
    if (!cachedEnvPasswordHash) {
      // Hash the env password once per server process (still never exposed to client).
      cachedEnvPasswordHash = await bcrypt.hash(envHash, 12);
    }
    envHash = cachedEnvPasswordHash;
  }

  const passwordOk = await bcrypt.compare(password, envHash);

  // Silent deny (no hints)
  if (!emailOk || !passwordOk) {
    // Internal log only (no hints to user).
    console.warn("[admin-access] Access denied.");
    return { error: "Access denied" };
  }

  const token = await signAdminSession(authSecret, 60 * 60 * 8); // 8 hours

  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  // Once verified, admin can use the existing admin layout/pages.
  console.info("[admin-access] Access granted.");
  redirect("/admin/dashboard");
}

export async function adminLogoutAction() {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  redirect("/");
}


