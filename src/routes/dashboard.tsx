import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Gauge, TrendingDown, Zap } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui/stat-card";
import {
  failureBreakdown,
  formatCurrency,
  revenueSeries,
  statusStyles,
  transactions,
} from "@/lib/revora-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Recovery Dashboard — Revora" },
      {
        name: "description",
        content:
          "Live view of leaked revenue, recovered payments and agent throughput across your payment stack.",
      },
      { property: "og:title", content: "Recovery Dashboard — Revora" },
      {
        property: "og:description",
        content: "Live leaked vs recovered revenue, failure codes and agent throughput.",
      },
    ],
  }),
  component: DashboardPage,
});

const chartTooltip = {
  contentStyle: {
    background: "var(--color-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    fontSize: "12px",
  },
  labelStyle: { color: "var(--color-muted-foreground)" },
};

function DashboardPage() {
  return (
    <AppShell title="Command Center" subtitle="Autonomous recovery, last 24 hours">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          index={0}
          label="Revenue leaked"
          value={formatCurrency(1906000)}
          delta="-8.4% vs yesterday"
          icon={TrendingDown}
        />
        <StatCard
          index={1}
          label="Revenue recovered"
          value={formatCurrency(1433000)}
          delta="+21.7% vs yesterday"
          icon={Banknote}
        />
        <StatCard index={2} label="Recovery rate" value="75.2%" delta="+4.1 pts" icon={Gauge} />
        <StatCard
          index={3}
          label="Agent actions"
          value="7,482"
          delta="312 decisions / hr"
          icon={Zap}
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <section className="surface-panel animate-rise rounded-2xl p-5 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Leak vs recovery</h2>
              <p className="text-xs text-muted-foreground">Rupees per 3-hour window</p>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <i className="size-2 rounded-full bg-destructive" /> Leaked
              </span>
              <span className="flex items-center gap-1.5">
                <i className="size-2 rounded-full bg-primary" /> Recovered
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="leaked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="recovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="hour" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis
                  stroke="var(--color-muted-foreground)"
                  fontSize={11}
                  tickFormatter={(v: number) => `${v / 1000}k`}
                />
                <Tooltip {...chartTooltip} />
                <Area
                  type="monotone"
                  dataKey="leaked"
                  stroke="var(--color-destructive)"
                  fill="url(#leaked)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="recovered"
                  stroke="var(--color-primary)"
                  fill="url(#recovered)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface-panel animate-rise rounded-2xl p-5">
          <h2 className="text-sm font-semibold">Top failure codes</h2>
          <p className="mb-5 text-xs text-muted-foreground">Volume in last 24h</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failureBreakdown} layout="vertical" margin={{ left: 40 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="code"
                  stroke="var(--color-muted-foreground)"
                  fontSize={10}
                  width={130}
                />
                <Tooltip {...chartTooltip} cursor={{ fill: "var(--color-muted)" }} />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="surface-panel animate-rise mt-6 overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold">Live recovery stream</h2>
          <span className="text-xs text-muted-foreground">Updated continuously</span>
        </div>
        <ul className="divide-y divide-border">
          {transactions.slice(0, 5).map((t) => (
            <li
              key={t.id}
              className="flex flex-wrap items-center gap-3 px-5 py-3.5 transition-colors hover:bg-secondary/40"
            >
              <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
              <span className="text-sm">{t.customer}</span>
              <span className="rounded-md bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                {t.failureCode}
              </span>
              <span className="ml-auto font-mono text-sm">{formatCurrency(t.amount)}</span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] tracking-wide uppercase ${statusStyles[t.status]}`}
              >
                {t.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </AppShell>
  );
}
