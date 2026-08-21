import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { formatCurrency } from "@/lib/revora-data";

export const Route = createFileRoute("/simulation")({
  head: () => ({
    meta: [
      { title: "Recovery Simulation — Revora" },
      {
        name: "description",
        content:
          "Model retry aggressiveness, dunning touches and risk tolerance to forecast recovered revenue before going live.",
      },
      { property: "og:title", content: "Recovery Simulation — Revora" },
      {
        property: "og:description",
        content: "Forecast recovered revenue by tuning retries, dunning and risk tolerance.",
      },
    ],
  }),
  component: SimulationPage,
});

const scenarios = [
  { id: "black-friday", name: "Black Friday surge", volume: 42000, failRate: 9.4 },
  { id: "subscription", name: "Monthly subscription cycle", volume: 18500, failRate: 6.1 },
  { id: "issuer-outage", name: "Issuer outage window", volume: 7200, failRate: 27.8 },
];

function SimulationPage() {
  const [scenarioId, setScenarioId] = useState(scenarios[0]!.id);
  const [retries, setRetries] = useState(3);
  const [dunning, setDunning] = useState(2);
  const [risk, setRisk] = useState(55);
  const [running, setRunning] = useState(false);

  const scenario = scenarios.find((s) => s.id === scenarioId)!;
  const failed = Math.round((scenario.volume * scenario.failRate) / 100);
  const avgTicket = 2400;
  const leaked = failed * avgTicket;
  const rate = Math.min(92, 28 + retries * 9 + dunning * 6 + risk * 0.12);
  const recovered = Math.round((leaked * rate) / 100);

  return (
    <AppShell title="Simulation" subtitle="Forecast recovery before shipping a policy">
      <div className="grid gap-4 lg:grid-cols-[380px_1fr]">
        <section className="surface-panel animate-rise rounded-2xl p-5">
          <h2 className="text-sm font-semibold">Scenario</h2>
          <div className="mt-3 space-y-2">
            {scenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                  s.id === scenarioId
                    ? "border-primary/40 bg-primary/10"
                    : "border-border bg-card/50 hover:bg-secondary/50"
                }`}
              >
                <p className="text-sm">{s.name}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {s.volume.toLocaleString("en-IN")} txns · {s.failRate}% fail
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            <Slider label="Retry attempts" value={retries} min={1} max={6} onChange={setRetries} />
            <Slider label="Dunning touches" value={dunning} min={0} max={5} onChange={setDunning} />
            <Slider
              label="Risk tolerance"
              value={risk}
              min={0}
              max={100}
              suffix="%"
              onChange={setRisk}
            />
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() => {
                setRunning(true);
                setTimeout(() => setRunning(false), 1400);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-ember)] px-4 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              <Play className="size-4" />
              {running ? "Simulating…" : "Run simulation"}
            </button>
            <button
              onClick={() => {
                setRetries(3);
                setDunning(2);
                setRisk(55);
              }}
              className="grid size-11 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        </section>

        <section className="grid content-start gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric label="Failed payments" value={failed.toLocaleString("en-IN")} />
            <Metric label="Revenue at risk" value={formatCurrency(leaked)} />
            <Metric label="Forecast rate" value={`${rate.toFixed(1)}%`} accent />
          </div>

          <div className="surface-panel relative overflow-hidden rounded-2xl p-6">
            <div className="animate-pulse-glow pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-primary/25 blur-3xl" />
            <p className="text-xs tracking-widest text-muted-foreground uppercase">
              Projected recovery
            </p>
            <p className="mt-3 font-mono text-4xl font-semibold text-ember">
              {formatCurrency(recovered)}
            </p>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-[image:var(--gradient-ember)] transition-[width] duration-700 ease-out"
                style={{ width: `${rate}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {retries} retries · {dunning} dunning touches · {risk}% risk tolerance on{" "}
              {scenario.name.toLowerCase()}
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Metric({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="surface-panel rounded-2xl p-4">
      <p className="text-[10px] tracking-widest text-muted-foreground uppercase">{label}</p>
      <p className={`mt-2 font-mono text-xl ${accent ? "text-primary-glow" : ""}`}>{value}</p>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex justify-between text-xs text-muted-foreground">
        {label}
        <span className="font-mono text-foreground">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[oklch(0.66_0.19_42)]"
      />
    </label>
  );
}
