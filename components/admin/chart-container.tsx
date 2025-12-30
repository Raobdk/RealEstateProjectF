"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ChartContainerProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function ChartContainer({
  title,
  description,
  children,
  className,
}: ChartContainerProps) {
  return (
    <Card className={`bg-white border-[#E7EAEF] ${className || ""}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#111111]">{title}</CardTitle>
        {description && (
          <p className="text-sm text-[#3A3C40] mt-1">{description}</p>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

