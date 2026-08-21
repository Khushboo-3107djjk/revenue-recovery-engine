import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { auditLog } from "@/lib/revora-data";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Trail — Revora" },
      {
        name: "description",
        content:
          "Immutable log of every agent decision, policy selection, risk gate verdict and human override.",
      },
      { property: "og:title", content: "Audit Trail — Revora" },
      {
        property: "og:description",
        content: "Every agent decision, risk verdict and human override, timestamped.",
      },
    ],
  }),
  component: AuditPage,
});

const verdictTone = {
  allow: "border-success/30 bg-success/15 text-success",
  block: "border-destructive/30 bg-destructive/15 text-destructive",
  info: "border-border bg-secondary text-muted-foreground",
} as const;

function AuditPage() {
  return (
    <AppShell title="Audit Trail" subtitle="Immutable record of agent behaviour">
      <div className="surface-panel animate-rise rounded-2xl p-6">
        <ol className="relative space-y-6 border-l border-border pl-6">
          {auditLog.map((entry, i) => (
            <li key={entry.id} className="animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent)]" />
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">{entry.at}</span>
                <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] tracking-wide uppercase">
                  {entry.actor}
                </span>
                <span className="text-sm font-medium">{entry.action}</span>
                <span
                  className={`ml-auto rounded-full border px-2.5 py-0.5 text-[10px] uppercase ${verdictTone[entry.verdict]}`}
                >
                  {entry.verdict}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{entry.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </AppShell>
  );
}
