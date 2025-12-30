import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = "md", 
  className,
  text 
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative">
        {/* Outer ring */}
        <div
          className={cn(
            "animate-spin rounded-full border-4 border-gray-200",
            sizeClasses[size]
          )}
          style={{
            borderTopColor: "#6139DB",
            borderRightColor: "#6139DB",
          }}
        />
        {/* Inner dot */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6139DB]"
          style={{
            width: size === "sm" ? "6px" : size === "md" ? "8px" : size === "lg" ? "12px" : "16px",
            height: size === "sm" ? "6px" : size === "md" ? "8px" : size === "lg" ? "12px" : "16px",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
      </div>
      {text && (
        <p className="text-sm text-[#3A3C40] animate-pulse">{text}</p>
      )}
    </div>
  );
};

interface PageLoaderProps {
  text?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <Loader size="lg" text={text} />
    </div>
  );
};

interface FullPageLoaderProps {
  text?: string;
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Loader size="xl" text={text} />
    </div>
  );
};

interface ButtonLoaderProps {
  className?: string;
}

export const ButtonLoader: React.FC<ButtonLoaderProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-white/30 border-t-white h-4 w-4",
        className
      )}
    />
  );
};
