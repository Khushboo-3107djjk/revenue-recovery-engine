import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { formatCurrency, recoveryJobs } from "@/lib/revora-data";

export const Route = createFileRoute("/recovery")({
  head: () => ({
    meta: [
      { title: "Recovery Engine — Revora" },
      {
        name: "description",
        content:
          "Monitor retry ladders, dunning touchpoints and risk gates as the Revora engine recovers failed payments.",
      },
      { property: "og:title", content: "Recovery Engine — Revora" },
      {
        property: "og:description",
        content: "Retry ladders, dunning touchpoints and risk gates in one engine view.",
      },
    ],
  }),
  component: RecoveryPage,
});

const gateIcon = {
  passed: ShieldCheck,
  review: ShieldQuestion,
  held: ShieldAlert,
} as const;

const gateTone = {
  passed: "text-success",
  review: "text-warning",
  held: "text-destructive",
} as const;

const pipeline = [
  { step: "Ingest failure", detail: "Razorpay webhook received", done: true },
  { step: "Diagnose", detail: "LLM classifies failure cause", done: true },
  { step: "Select strategy", detail: "Policy engine picks ladder", done: true },
  { step: "Risk gate", detail: "Velocity, fraud & consent checks", done: true },
  { step: "Execute", detail: "Retry / re-auth / dunning touch", done: false },
  { step: "Verify", detail: "Settlement confirmation", done: false },
];

function RecoveryPage() {
  return (
    <AppShell title="Recovery Engine" subtitle="Strategies currently executing">
      <div className="grid gap-4 lg:grid-cols-2">
        {recoveryJobs.map((job, i) => {
          const Icon = gateIcon[job.riskGate];
          return (
            <article
              key={job.id}
              className="surface-panel animate-rise rounded-2xl p-5"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold">{job.strategy}</h2>
                  <p className="font-mono text-xs text-muted-foreground">{job.window}</p>
                </div>
                <span className={`flex items-center gap-1.5 text-xs ${gateTone[job.riskGate]}`}>
                  <Icon className="size-4" />
                  {job.riskGate}
                </span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                  <span>Completion</span>
                  <span className="font-mono text-foreground">{job.progress}%</span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-[image:var(--gradient-ember)]"
                    style={{ width: `${job.progress}%` }}
                  />
                  <div className="animate-sweep absolute inset-y-0 w-1/4 bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--primary-glow)_45%,transparent),transparent)]" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                    In flight
                  </p>
                  <p className="mt-1 font-mono">{job.inFlight}</p>
                </div>
                <div className="rounded-xl bg-secondary/60 p-3">
                  <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                    Recovered
                  </p>
                  <p className="mt-1 font-mono text-primary-glow">
                    {formatCurrency(job.recovered)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="surface-panel animate-rise mt-6 rounded-2xl p-5">
        <h2 className="text-sm font-semibold">Agent pipeline</h2>
        <p className="mb-6 text-xs text-muted-foreground">Per-transaction decision path</p>
        <ol className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {pipeline.map((p, i) => (
            <li key={p.step} className="relative">
              <span
                className={`grid size-8 place-items-center rounded-xl border text-xs ${
                  p.done
                    ? "border-primary/40 bg-primary/15 text-primary-glow"
                    : "border-border bg-secondary text-muted-foreground"
                }`}
              >
                {p.done ? <CheckCircle2 className="size-4" /> : i + 1}
              </span>
              <p className="mt-3 text-sm font-medium">{p.step}</p>
              <p className="text-xs text-muted-foreground">{p.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </AppShell>
  );
}
