import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[#E7EAEF] bg-white px-4 text-sm text-[#111111] placeholder:text-[#3A3C40]/50 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6139DB] focus-visible:border-[#6139DB] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

