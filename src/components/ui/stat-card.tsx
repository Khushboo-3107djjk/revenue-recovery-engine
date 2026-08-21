import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  delta,
  positive = true,
  icon: Icon,
  index = 0,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
  icon: LucideIcon;
  index?: number;
}) {
  return (
    <div
      className="surface-panel group animate-rise relative overflow-hidden rounded-2xl p-5"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-16 -right-10 size-40 rounded-full bg-primary/20 blur-3xl" />
      </div>
      <div className="relative flex items-start justify-between">
        <p className="text-xs tracking-widest text-muted-foreground uppercase">{label}</p>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="relative mt-4 font-mono text-2xl font-semibold tracking-tight">{value}</p>
      <p
        className={`relative mt-1 text-xs ${positive ? "text-success" : "text-destructive"}`}
      >
        {delta}
      </p>
    </div>
  );
}
