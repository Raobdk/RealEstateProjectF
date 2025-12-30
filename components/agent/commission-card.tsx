import { Card, CardContent } from "@/components/ui/card";
import { Building2, DollarSign, Clock, CheckCircle2 } from "lucide-react";

interface CommissionCardProps {
  id: string;
  project: string;
  amount: string;
  status: "pending" | "paid";
  expectedDate: string;
}

export function CommissionCard({
  id,
  project,
  amount,
  status,
  expectedDate,
}: CommissionCardProps) {
  return (
    <Card
      className={`bg-white border-[#E7EAEF] hover:shadow-md transition-shadow ${
        status === "paid" ? "border-green-200" : ""
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#6139DB]/10 rounded-lg">
              <Building2 className="h-5 w-5 text-[#6139DB]" />
            </div>
            <div>
              <p className="text-xs text-[#3A3C40]/60">{id}</p>
              <p className="font-semibold text-[#111111]">{project}</p>
            </div>
          </div>
          {status === "paid" ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <Clock className="h-5 w-5 text-yellow-600" />
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#3A3C40]">Amount</span>
            <span className="text-lg font-bold text-[#6139DB]">{amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#3A3C40]">Status</span>
            <span
              className={`px-2 py-1 rounded-lg text-xs font-medium ${
                status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {status === "paid" ? "Paid" : "Pending"}
            </span>
          </div>
          {status === "pending" && (
            <div className="flex items-center gap-2 text-sm text-[#3A3C40] pt-2 border-t border-[#E7EAEF]">
              <Clock className="h-4 w-4" />
              Expected: {expectedDate}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

