import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, MapPin, FileText } from "lucide-react";

interface BuyerCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedPlot?: string;
  documents: number;
}

export function BuyerCard({ id, name, email, phone, assignedPlot, documents }: BuyerCardProps) {
  return (
    <Card className="bg-white border-[#E7EAEF] hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-[#3A3C40]/60 mb-1">{id}</p>
            <p className="font-semibold text-[#111111]">{name}</p>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
            <Mail className="h-4 w-4" />
            {email}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
            <Phone className="h-4 w-4" />
            {phone}
          </div>
          {assignedPlot && (
            <div className="flex items-center gap-2 text-sm text-[#6139DB]">
              <MapPin className="h-4 w-4" />
              {assignedPlot}
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
            <FileText className="h-4 w-4" />
            {documents} documents
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}

