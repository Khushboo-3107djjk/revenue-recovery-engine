import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import {
  formatCurrency,
  statusStyles,
  transactions,
  type TxStatus,
} from "@/lib/revora-data";

export const Route = createFileRoute("/transactions")({
  head: () => ({
    meta: [
      { title: "Failed Transactions — Revora" },
      {
        name: "description",
        content:
          "Every failed payment with its failure code, retry attempts and current recovery status.",
      },
      { property: "og:title", content: "Failed Transactions — Revora" },
      {
        property: "og:description",
        content: "Failure codes, retry attempts and recovery status for every failed payment.",
      },
    ],
  }),
  component: TransactionsPage,
});

const filters = ["all", "recovered", "retrying", "failed", "escalated"] as const;

function TransactionsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [query, setQuery] = useState("");

  const rows = useMemo(
    () =>
      transactions.filter((t) => {
        const matchStatus = filter === "all" || t.status === (filter as TxStatus);
        const q = query.trim().toLowerCase();
        const matchQuery =
          !q ||
          [t.id, t.customer, t.email, t.failureCode].some((v) => v.toLowerCase().includes(q));
        return matchStatus && matchQuery;
      }),
    [filter, query],
  );

  return (
    <AppShell title="Transactions" subtitle={`${rows.length} failed payments in scope`}>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card/70 px-3 py-2">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search id, customer, code"
            className="w-56 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg border px-3 py-1.5 text-xs capitalize transition-colors ${
                filter === f
                  ? "border-primary/40 bg-primary/15 text-primary-glow"
                  : "border-border bg-card/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="surface-panel animate-rise overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[10px] tracking-widest text-muted-foreground uppercase">
                <th className="px-5 py-3 font-medium">Transaction</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Method</th>
                <th className="px-5 py-3 font-medium">Failure</th>
                <th className="px-5 py-3 font-medium">Attempts</th>
                <th className="px-5 py-3 text-right font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-secondary/40">
                  <td className="px-5 py-3.5">
                    <p className="font-mono text-xs">{t.id}</p>
                    <p className="text-[11px] text-muted-foreground">{t.updatedAt}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <p>{t.customer}</p>
                    <p className="text-[11px] text-muted-foreground">{t.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{t.method}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-mono text-[11px] text-primary-glow">{t.failureCode}</p>
                    <p className="text-[11px] text-muted-foreground">{t.reason}</p>
                  </td>
                  <td className="px-5 py-3.5 font-mono">{t.attempts}</td>
                  <td className="px-5 py-3.5 text-right font-mono">{formatCurrency(t.amount)}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] tracking-wide uppercase ${statusStyles[t.status]}`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                    No transactions match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
