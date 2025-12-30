import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#6139DB] text-white shadow-md shadow-[#6139DB]/30 hover:bg-[#6139DB]/90 hover:scale-105 active:scale-95",
        gradient:
          "bg-gradient-to-r from-[#6139DB] to-[#6139DB]/80 text-white shadow-md shadow-[#6139DB]/30 hover:from-[#6139DB]/90 hover:to-[#6139DB]/70 hover:scale-105 active:scale-95",
        destructive:
          "bg-red-500 text-white shadow-sm hover:bg-red-600 hover:scale-105 active:scale-95",
        outline:
          "border border-[#E7EAEF] bg-white text-[#111111] hover:bg-[#FAFAFA] hover:border-[#6139DB] hover:text-[#6139DB]",
        secondary:
          "bg-[#3A3C40] text-white hover:bg-[#3A3C40]/90 hover:scale-105 active:scale-95",
        ghost:
          "text-[#3A3C40] hover:bg-[#E7EAEF] hover:text-[#111111]",
        link: "text-[#6139DB] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

