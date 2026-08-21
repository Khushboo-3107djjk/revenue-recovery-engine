import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain, Flame, Radar, ShieldCheck, Workflow } from "lucide-react";
import { CoinScene } from "@/components/ui/coin-scene";
import { formatCurrency } from "@/lib/revora-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revora — Autonomous Payment Recovery Engine" },
      {
        name: "description",
        content:
          "Every failed payment is a recovery opportunity. Revora diagnoses, retries and recovers failed payments autonomously.",
      },
      { property: "og:title", content: "Revora — Autonomous Payment Recovery Engine" },
      {
        property: "og:description",
        content: "Revora diagnoses, retries and recovers failed payments autonomously.",
      },
    ],
  }),
  component: Landing,
});

const capabilities = [
  {
    icon: Brain,
    title: "Diagnose",
    body: "The agent reads issuer codes, gateway traces and customer history to explain exactly why a payment died.",
  },
  {
    icon: Workflow,
    title: "Decide",
    body: "A policy engine picks the retry ladder, handle switch or dunning sequence with the highest expected value.",
  },
  {
    icon: ShieldCheck,
    title: "Gate",
    body: "Velocity caps, consent checks and fraud signals stop the engine before it ever annoys a good customer.",
  },
  {
    icon: Radar,
    title: "Verify",
    body: "Settlement is confirmed end to end, then written to an immutable audit trail you can hand to finance.",
  },
];

const marquee = [
  "BANK_TIMEOUT",
  "INSUFFICIENT_FUNDS",
  "3DS_DROPOFF",
  "DO_NOT_HONOR",
  "EXPIRED_CARD",
  "VPA_INVALID",
  "AUTH_DECLINED",
  "MANDATE_REVOKED",
];

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="animate-pulse-glow absolute -top-40 -left-32 size-[520px] rounded-full bg-primary/12 blur-[140px]" />
        <div className="animate-pulse-glow absolute right-0 bottom-0 size-[420px] rounded-full bg-primary/10 blur-[130px]" />
      </div>

      <header className="relative z-30 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <span className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary glow-ember">
            <Flame className="size-4.5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Revora</span>
        </span>
        <Link
          to="/dashboard"
          className="rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          Command Center
        </Link>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 pt-8 pb-24 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-[11px] tracking-[0.18em] text-muted-foreground uppercase backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Revora engine online
          </span>

          <h1 className="mt-7 text-5xl leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Revenue is <span className="text-ember">leaking.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Every failed payment is a recovery opportunity. Revora is the autonomous engine that
            brings it back.
          </p>

          <div className="mt-9">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
            >
              Enter Command Center
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ["Recovered / mo", formatCurrency(42800000)],
              ["Recovery rate", "75.2%"],
              ["Decisions / hr", "312"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-[10px] tracking-widest text-muted-foreground uppercase">
                  {label}
                </dt>
                <dd className="mt-1.5 font-mono text-lg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <CoinScene />
        </div>
      </section>

      <div className="relative z-10 flex overflow-hidden border-y border-border py-3.5">
        <div className="animate-marquee flex shrink-0 gap-10 pr-10 font-mono text-xs text-muted-foreground">
          {[...marquee, ...marquee].map((code, i) => (
            <span key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="size-1 rounded-full bg-primary" />
              {code}
            </span>
          ))}
        </div>
      </div>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Four moves, executed in under a second.
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((c, i) => (
            <article
              key={c.title}
              className="surface-panel animate-rise group relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <div className="pointer-events-none absolute -top-20 -right-12 size-40 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <c.icon className="relative size-5 text-primary" />
              <h3 className="relative mt-5 text-base font-semibold">{c.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28">
        <div className="surface-panel relative overflow-hidden rounded-3xl px-8 py-16 text-center">
          <div className="animate-pulse-glow pointer-events-none absolute -bottom-32 left-1/2 size-[420px] -translate-x-1/2 rounded-full bg-primary/25 blur-[110px]" />
          <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">
            Stop writing off failed payments.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
            Plug Revora into your gateway and watch the leak close in real time.
          </p>
          <Link
            to="/simulation"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-ember)] px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Run a simulation
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border px-6 py-8">
        <p className="mx-auto max-w-7xl text-xs text-muted-foreground">
          Revora — autonomous payment recovery.
        </p>
      </footer>
    </div>
  );
}
