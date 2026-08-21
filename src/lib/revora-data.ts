export type TxStatus = "recovered" | "retrying" | "failed" | "escalated";

export type Transaction = {
  id: string;
  customer: string;
  email: string;
  amount: number;
  method: "UPI" | "Card" | "NetBanking" | "Wallet";
  failureCode: string;
  reason: string;
  attempts: number;
  status: TxStatus;
  updatedAt: string;
};

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const formatCompact = (value: number) =>
  new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);

export const transactions: Transaction[] = [
  {
    id: "txn_9F2A41",
    customer: "Aarav Mehta",
    email: "aarav@northwind.in",
    amount: 24990,
    method: "UPI",
    failureCode: "BANK_TIMEOUT",
    reason: "Issuer did not respond within 30s",
    attempts: 2,
    status: "recovered",
    updatedAt: "2m ago",
  },
  {
    id: "txn_7C8B03",
    customer: "Priya Nair",
    email: "priya@stackbloom.co",
    amount: 118400,
    method: "Card",
    failureCode: "INSUFFICIENT_FUNDS",
    reason: "Balance below authorised amount",
    attempts: 3,
    status: "retrying",
    updatedAt: "6m ago",
  },
  {
    id: "txn_3D5E77",
    customer: "Kabir Shah",
    email: "kabir@vertexlabs.io",
    amount: 8750,
    method: "Wallet",
    failureCode: "AUTH_DECLINED",
    reason: "Risk engine declined authorisation",
    attempts: 1,
    status: "failed",
    updatedAt: "11m ago",
  },
  {
    id: "txn_1B9C22",
    customer: "Ishita Rao",
    email: "ishita@lumenpay.in",
    amount: 45600,
    method: "NetBanking",
    failureCode: "3DS_DROPOFF",
    reason: "Customer abandoned OTP screen",
    attempts: 2,
    status: "retrying",
    updatedAt: "18m ago",
  },
  {
    id: "txn_5A4F10",
    customer: "Rohan Gupta",
    email: "rohan@quantacore.dev",
    amount: 302000,
    method: "Card",
    failureCode: "EXPIRED_CARD",
    reason: "Stored instrument past expiry",
    attempts: 4,
    status: "escalated",
    updatedAt: "24m ago",
  },
  {
    id: "txn_8E7D65",
    customer: "Sanya Kapoor",
    email: "sanya@brightfold.com",
    amount: 15900,
    method: "UPI",
    failureCode: "VPA_INVALID",
    reason: "Handle no longer registered",
    attempts: 1,
    status: "recovered",
    updatedAt: "31m ago",
  },
  {
    id: "txn_2F6A88",
    customer: "Devansh Iyer",
    email: "devansh@arcfin.in",
    amount: 67250,
    method: "Card",
    failureCode: "DO_NOT_HONOR",
    reason: "Issuer generic decline",
    attempts: 3,
    status: "retrying",
    updatedAt: "44m ago",
  },
  {
    id: "txn_4C1B39",
    customer: "Meera Joshi",
    email: "meera@havenclub.in",
    amount: 9990,
    method: "Wallet",
    failureCode: "BANK_TIMEOUT",
    reason: "Gateway upstream latency",
    attempts: 2,
    status: "recovered",
    updatedAt: "52m ago",
  },
];

export const revenueSeries = [
  { hour: "00:00", leaked: 182000, recovered: 96000 },
  { hour: "03:00", leaked: 143000, recovered: 88000 },
  { hour: "06:00", leaked: 96000, recovered: 71000 },
  { hour: "09:00", leaked: 264000, recovered: 191000 },
  { hour: "12:00", leaked: 318000, recovered: 246000 },
  { hour: "15:00", leaked: 287000, recovered: 232000 },
  { hour: "18:00", leaked: 372000, recovered: 301000 },
  { hour: "21:00", leaked: 244000, recovered: 208000 },
];

export const failureBreakdown = [
  { code: "BANK_TIMEOUT", count: 412, recovery: 78 },
  { code: "INSUFFICIENT_FUNDS", count: 286, recovery: 54 },
  { code: "3DS_DROPOFF", count: 231, recovery: 66 },
  { code: "DO_NOT_HONOR", count: 174, recovery: 41 },
  { code: "EXPIRED_CARD", count: 118, recovery: 29 },
];

export type RecoveryJob = {
  id: string;
  strategy: string;
  window: string;
  progress: number;
  inFlight: number;
  recovered: number;
  riskGate: "passed" | "held" | "review";
};

export const recoveryJobs: RecoveryJob[] = [
  {
    id: "rec_smart_retry",
    strategy: "Smart Retry Ladder",
    window: "T+15m · T+2h · T+24h",
    progress: 82,
    inFlight: 146,
    recovered: 1_284_000,
    riskGate: "passed",
  },
  {
    id: "rec_upi_switch",
    strategy: "UPI Handle Switch",
    window: "Instant",
    progress: 61,
    inFlight: 74,
    recovered: 462_500,
    riskGate: "passed",
  },
  {
    id: "rec_dunning",
    strategy: "Adaptive Dunning",
    window: "3-touch, 72h",
    progress: 38,
    inFlight: 211,
    recovered: 318_900,
    riskGate: "review",
  },
  {
    id: "rec_mandate",
    strategy: "Mandate Re-auth",
    window: "T+6h",
    progress: 24,
    inFlight: 39,
    recovered: 129_400,
    riskGate: "held",
  },
];

export type AuditEntry = {
  id: string;
  at: string;
  actor: "Agent" | "Risk Gate" | "Policy" | "Human";
  action: string;
  detail: string;
  verdict: "allow" | "block" | "info";
};

export const auditLog: AuditEntry[] = [
  {
    id: "a_1",
    at: "11:04:22",
    actor: "Agent",
    action: "Diagnosed failure",
    detail: "txn_9F2A41 · BANK_TIMEOUT · confidence 0.94",
    verdict: "info",
  },
  {
    id: "a_2",
    at: "11:04:23",
    actor: "Policy",
    action: "Selected strategy",
    detail: "Smart Retry Ladder — issuer recovers 78% at T+15m",
    verdict: "allow",
  },
  {
    id: "a_3",
    at: "11:04:23",
    actor: "Risk Gate",
    action: "Velocity check",
    detail: "2 attempts in 24h, under cap of 4",
    verdict: "allow",
  },
  {
    id: "a_4",
    at: "11:19:01",
    actor: "Agent",
    action: "Executed retry",
    detail: "Razorpay charge succeeded · ₹24,990 captured",
    verdict: "allow",
  },
  {
    id: "a_5",
    at: "11:22:47",
    actor: "Risk Gate",
    action: "Blocked retry",
    detail: "txn_5A4F10 · 4 attempts reached, escalated to human",
    verdict: "block",
  },
  {
    id: "a_6",
    at: "11:26:10",
    actor: "Human",
    action: "Manual override",
    detail: "Approved mandate re-auth for txn_5A4F10",
    verdict: "allow",
  },
];

export const statusStyles: Record<TxStatus, string> = {
  recovered: "bg-success/15 text-success border-success/30",
  retrying: "bg-primary/15 text-primary-glow border-primary/30",
  failed: "bg-destructive/15 text-destructive border-destructive/30",
  escalated: "bg-warning/15 text-warning border-warning/30",
};
