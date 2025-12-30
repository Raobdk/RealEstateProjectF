import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Square, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

interface ListingCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  area: string;
  status: "pending" | "approved" | "rejected";
  image?: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export function ListingCard({ id, title, location, price, area, status }: ListingCardProps) {
  return (
    <Card className="bg-white border-[#E7EAEF] hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-[#111111] mb-2">{title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-[#3A3C40]">
              <MapPin className="h-4 w-4" />
              {location}
            </div>
          </div>
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[status]}`}>
            {status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#3A3C40]">
            <DollarSign className="h-4 w-4" />
            <span className="font-semibold text-[#111111]">{price}</span>
          </div>
          <div className="flex items-center gap-2 text-[#3A3C40]">
            <Square className="h-4 w-4" />
            <span>{area}</span>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/agent/listings/${id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

