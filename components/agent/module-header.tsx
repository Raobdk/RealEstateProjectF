import { ReactNode } from "react";

interface ModuleHeaderProps {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

export function ModuleHeader({ title, subtitle, actions }: ModuleHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">
          Agent Module
        </p>
        <h2 className="text-xl sm:text-2xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-white/60">{subtitle}</p>
      </div>
      {actions && <div className="flex items-center gap-2 sm:gap-3 flex-wrap">{actions}</div>}
    </div>
  );
}
