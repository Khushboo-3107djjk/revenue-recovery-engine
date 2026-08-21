# Revenue Recovery Engine

The ref image is my landing page where the coins moving using animation🗂️ Frontend Structure

📄 Pages (Routes)

URLFileWhat it shows/page.tsxLanding Page — "Revenue is leaking." hero + 3D coins + stats sections/dashboard(app)/dashboard/page.tsxDashboard — main analytics/metrics view/recovery(app)/recovery/page.tsxRecovery — payment recovery engine view/transactions(app)/transactions/page.tsxTransactions — transaction list/table/audit(app)/audit/page.tsxAudit — audit log view/simulation(app)/simulation/page.tsxSimulation — demo/scenario simulation

🧩 Components

ComponentFilePurposeSidebarlayout/Sidebar.tsxLeft nav sidebar (used in all app pages)Topbarlayout/Topbar.tsxTop navigation barCommandCenterlayout/CommandCenter.tsxCommand center modal/panelCoin3Dui/Coin3D.tsx3D coin + platform scene on landing pageDataTableui/DataTable.tsxReusable data tableModalui/Modal.tsxReusable modal dialogProgressui/Progress.tsxProgress bar component

🔌 Supporting Files

TypeFilesAPI Routes/api/agent/, /api/recovery/, /api/transactions/HooksuseAgent, useRecovery, useSimulation, useTransactionsDatatransactions.json, customers.json, failure-codes.json, recovery-policies.json, demo-scenarios.jsonTypesagent.ts, audit.ts, customer.ts, recovery.ts, transaction.ts

Note: The agent, audit, recovery, simulation, transactions component folders are currently empty — all logic lives directly in the page files. Would you like me to build out any of these pages or add missing features?

11:06 AM

Also what are the backend files 

11:09 AM

Here's the complete backend picture:

🔧 Backend Files

🌐 API Routes — src/app/api/

All 3 folders are empty — the route handlers haven't been implemented yet.

RouteStatus/api/agent/⚠️ Empty/api/recovery/⚠️ Empty/api/transactions/⚠️ Empty

🧠 Core Logic — src/lib/

This is where all the real backend logic lives, organized by domain:

lib/ai/ — AI Agent Engine

FilePurposeagent.tsMain AI agent orchestrationdecision-engine.tsDecides which recovery action to takediagnosis.tsDiagnoses why a payment failedprompts.tsLLM prompt templatesrecovery-strategy.tsSelects recovery strategy

lib/recovery/ — Recovery Engine

FilePurposeengine.tsCore recovery execution enginepolicies.tsRecovery policy rulesrisk-gates.tsRisk gate checks before retryingverification.tsVerifies recovery success

lib/razorpay/ — Razorpay Integration

FilePurposeclient.tsRazorpay SDK client setuppayments.tsPayment operations (retry, refund etc.)webhooks.tsWebhook event handlers

lib/analytics/ — Metrics & Reporting

FilePurposemetrics.tsGeneral metrics computationrecovery-rate.tsCalculates recovery success raterevenue-calculator.tsRevenue recovered calculations

lib/db/ — Database

FilePurposeclient.tsPrisma DB clientqueries.tsReusable DB query functions

lib/audit/ — Audit Logging

FilePurposelogger.tsLogs all agent decisions/actions

lib/utils/ — Utilities

FilePurposeconstants.tsApp-wide constantsformatCurrency.tsCurrency formatter (₹)formatDate.tsDate formatter

🗄️ Database — prisma/

FileStatusschema.prisma⚠️ Empty — schema not defined yet

📊 Summary

Backend is structured but mostly EMPTY:

  ✅ lib/ folder — all files exist (logic to be filled)

  ⚠️  api/ routes — all 3 are empty (no route handlers)

  ⚠️  prisma/schema.prisma — empty (no DB models)

  ✅ Data JSONs — transactions, scenarios, policies (mock data)

Would you like me to implement the API routes, fill in the lib logic, or define the Prisma schema? This is my folder strcutur esee I wnat an amzing frontend refer many aniated fintech vebsite

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d6f5d30c-ced3-4790-a2fd-4cebfc734d82).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
