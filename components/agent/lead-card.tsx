import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, DollarSign } from "lucide-react";
import { LeadStatus } from "@/hooks/use-agent-store";

interface LeadCardProps {
  id: string;
  name: string;
  budget: string;
  plot: string;
  status: LeadStatus;
  channel: string;
  onClick?: () => void;
}

const statusColors: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  won: "bg-green-100 text-green-800",
  lost: "bg-red-100 text-red-800",
};

export function LeadCard({ id, name, budget, plot, status, channel, onClick }: LeadCardProps) {
  return (
    <Card
      className="bg-white border-[#E7EAEF] hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-[#3A3C40]/60 mb-1">{id}</p>
            <p className="font-semibold text-[#111111]">{name}</p>
          </div>
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[status]}`}>
            {status.replace("-", " ")}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
            <DollarSign className="h-4 w-4" />
            {budget}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
            <MapPin className="h-4 w-4" />
            {plot}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
            <Users className="h-4 w-4" />
            {channel}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

