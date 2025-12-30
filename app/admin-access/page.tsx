"use client";

import { useActionState, useState } from "react";
import { adminLoginAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminAccessPage() {
  const [state, formAction, pending] = useActionState(adminLoginAction, {});
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0D12] px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-8 shadow-2xl">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">Restricted</p>
          <h1 className="text-2xl font-semibold text-white">Admin access</h1>
          <p className="text-sm text-white/60">
            Enter your credentials to continue.
          </p>
        </div>

        <form action={formAction} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-white/70">Email</label>
            <Input
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="Enter admin email"
              className="bg-white text-[#111111]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-white/70">Password</label>
            <div className="flex gap-2">
              <Input
                name="password"
                type={show ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Enter admin password"
                className="bg-white text-[#111111]"
              />
              <Button
                type="button"
                variant="outline"
                className="shrink-0 bg-transparent text-white border-white/20 hover:bg-white/10"
                onClick={() => setShow((v) => !v)}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </div>
          </div>

          {/* Silent error (no hints) */}
          {state?.error && (
            <p className="text-xs text-white/60">{state.error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-[#6139DB] hover:bg-[#552FD1] text-white font-semibold"
            disabled={pending}
          >
            {pending ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}


