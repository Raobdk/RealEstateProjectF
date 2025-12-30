import { Lead } from "@/hooks/use-agent-store";

interface LeadTimelineProps {
  lead: Lead;
}

export function LeadTimeline({ lead }: LeadTimelineProps) {
  return (
    <div className="space-y-3">
      {lead.timeline.map((event) => (
        <div
          key={`${lead.id}-${event.date}`}
          className="flex items-start gap-3"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs text-white/70">{event.date}</span>
            <span className="w-px h-6 bg-white/20" />
          </div>
          <div className="flex-1 glass rounded-xl px-3 py-2 text-sm text-white/80">
            {event.label}
          </div>
        </div>
      ))}
    </div>
  );
}
