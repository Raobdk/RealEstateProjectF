import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  iconBg?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  className,
  iconBg = "bg-[#6139DB]/10",
}: StatCardProps) {
  return (
    <Card className={cn("bg-white border-[#E7EAEF]", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-[#3A3C40] mb-1">{title}</p>
            <p className="text-2xl font-bold text-[#111111] mb-2">{value}</p>
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", iconBg)}>
            <Icon className="h-6 w-6 text-[#6139DB]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

