/**
 * Admin session token utilities (EDGE-SAFE)
 *
 * - Uses HMAC-SHA256 over base64url(payload)
 * - Token format: `${payloadB64}.${sigB64}`
 * - Payload includes { typ: 'admin', iat, exp, v }
 *
 * Security notes:
 * - Does NOT expose env values to client; env secret is only read server-side (middleware/actions).
 * - Designed to run in Next Middleware (Edge runtime) and Server Actions.
 */

export type AdminSessionPayload = {
  typ: "admin";
  v: 1;
  iat: number;
  exp: number;
};

const encoder = new TextEncoder();

function base64UrlEncodeBytes(bytes: Uint8Array) {
  // Works in Edge (btoa) and Node (Buffer fallback).
  let b64: string;
  if (typeof btoa === "function") {
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    b64 = btoa(binary);
  } else if (typeof Buffer !== "undefined") {
    b64 = Buffer.from(bytes).toString("base64");
  } else {
    throw new Error("No base64 encoder available in this runtime.");
  }
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecodeToBytes(b64url: string) {
  const b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = (4 - (b64.length % 4)) % 4;
  const padded = b64 + "=".repeat(padLen);
  if (typeof atob === "function") {
    const binary = atob(padded);
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
    return out;
  }
  if (typeof Buffer !== "undefined") {
    return new Uint8Array(Buffer.from(padded, "base64"));
  }
  throw new Error("No base64 decoder available in this runtime.");
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

async function hmacSha256Base64Url(secret: string, message: string) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("WebCrypto subtle is not available in this runtime.");
  }
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return base64UrlEncodeBytes(new Uint8Array(sig));
}

export async function signAdminSession(secret: string, ttlSeconds = 60 * 60 * 8) {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    typ: "admin",
    v: 1,
    iat: now,
    exp: now + ttlSeconds,
  };

  const payloadB64 = base64UrlEncodeBytes(encoder.encode(JSON.stringify(payload)));
  const sigB64 = await hmacSha256Base64Url(secret, payloadB64);
  return `${payloadB64}.${sigB64}`;
}

export async function verifyAdminSession(token: string, secret: string) {
  try {
    const [payloadB64, sigB64] = token.split(".");
    if (!payloadB64 || !sigB64) return { ok: false as const };

    const expectedSigB64 = await hmacSha256Base64Url(secret, payloadB64);
    const sigBytes = base64UrlDecodeToBytes(sigB64);
    const expectedBytes = base64UrlDecodeToBytes(expectedSigB64);
    if (!timingSafeEqual(sigBytes, expectedBytes)) return { ok: false as const };

    const payloadJson = new TextDecoder().decode(base64UrlDecodeToBytes(payloadB64));
    const payload = JSON.parse(payloadJson) as Partial<AdminSessionPayload>;
    if (payload.typ !== "admin" || payload.v !== 1) return { ok: false as const };

    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) return { ok: false as const };

    return { ok: true as const, payload: payload as AdminSessionPayload };
  } catch {
    return { ok: false as const };
  }
}


