import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  FlaskConical,
  Flame,
  LayoutDashboard,
  ReceiptText,
  ScrollText,
  Search,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Recovery", to: "/recovery", icon: Zap },
  { label: "Transactions", to: "/transactions", icon: ReceiptText },
  { label: "Audit", to: "/audit", icon: ScrollText },
  { label: "Simulation", to: "/simulation", icon: FlaskConical },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 lg:flex">
        <Link to="/" className="mb-8 flex items-center gap-2.5 px-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary glow-ember">
            <Flame className="size-4.5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Revora</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                }`}
              >
                <span
                  className={`absolute left-0 h-6 w-0.5 rounded-full bg-primary transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                />
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="surface-panel rounded-2xl p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="size-1.5 animate-pulse rounded-full bg-success" />
            Agent healthy
          </div>
          <p className="mt-2 font-mono text-sm text-foreground">312 decisions / hr</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex flex-wrap items-center gap-4 border-b border-border bg-background/80 px-5 py-4 backdrop-blur-xl md:px-8">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold tracking-tight">{title}</h1>
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className="hidden items-center gap-2 rounded-xl border border-border bg-card/70 px-3 py-2 text-xs text-muted-foreground md:flex">
            <Search className="size-3.5" />
            Search txn, customer, code
          </div>
          <button className="grid size-9 place-items-center rounded-xl border border-border bg-card/70 text-muted-foreground transition-colors hover:text-foreground">
            <Bell className="size-4" />
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary-glow">
            <Activity className="size-3.5" />
            Live
          </div>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-border px-5 py-2 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs text-muted-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
