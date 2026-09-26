export const INITIAL_INCIDENT = {
  id: "INC-2026-9921",
  title: "Payment Service Incident",
  severity: "SEV-1",
  subtitle: "Customers may be unable to complete payments.",
  startedAgo: "12 minutes ago",
  startedTimestamp: "2026-09-26T03:14:22Z",
  affectedService: "Payment Gateway",
  status: "Investigating", // Investigating | Probing | Probed | Testing Sandbox | Pending Approval | Executing Fix | Resolved
  failedRequests: "98.4%",
  responseTime: "850 ms",
  serviceHealth: "Critical",
  currentStep: 1, // 1 to 7

  services: [
    { id: "api-gw", name: "API Gateway", role: "Gateway", status: "degraded", errorRate: "24.2%", latency: "450ms", icon: "Layers" },
    { id: "payment-gw", name: "Payment Gateway", role: "Primary Service", status: "critical", errorRate: "98.4%", latency: "850ms", icon: "CreditCard", groundZero: true },
    { id: "database", name: "Database", role: "Primary DB", status: "degraded", errorRate: "89.0%", latency: "320ms", icon: "Database" },
    { id: "auth-svc", name: "Auth Service", role: "Authentication", status: "healthy", errorRate: "0.1%", latency: "35ms", icon: "ShieldCheck" },
    { id: "redis-cache", name: "Redis Cache", role: "In-Memory Cache", status: "healthy", errorRate: "0.0%", latency: "4ms", icon: "Zap" },
    { id: "notif-svc", name: "Notification Service", role: "Background Worker", status: "degraded", errorRate: "14.5%", latency: "220ms", icon: "Bell" }
  ],

  investigationSteps: [
    { id: 1, text: "Reading application logs...", status: "done" },
    { id: 2, text: "Analyzing service traces...", status: "done" },
    { id: 3, text: "Checking recent deployments...", status: "done" },
    { id: 4, text: "Investigating database connections...", status: "done" },
    { id: 5, text: "Running diagnostic probe...", status: "in-progress" }
  ],

  initialConfidence: 62,
  probedConfidence: 94,

  calloutReason: "Current confidence is 62%. Collecting additional database and trace information to confirm the root cause.",
  probedCalloutReason: "Diagnostic probe complete. Evidence confirms database connection pool exhaustion triggered by v2.4.1 deployment.",

  hypotheses: [
    { name: "Payment deployment", initialConfidence: 62, probedConfidence: 94, color: "#f43f5e" },
    { name: "Database issue", initialConfidence: 25, probedConfidence: 18, color: "#f59e0b" },
    { name: "Network issue", initialConfidence: 10, probedConfidence: 7, color: "#8b5cf6" },
    { name: "Other", initialConfidence: 3, probedConfidence: 3, color: "#94a3b8" }
  ],

  deployment: {
    service: "Payment Gateway",
    version: "v2.4.1",
    deployedAgo: "12 minutes ago",
    commitHash: "f9a2b8e",
    author: "dev-team@enterprise.com",
    commitMessage: "feat: add transaction history search endpoint",
    diffSnippet: `- CREATE INDEX idx_user_tx ON transactions (user_id);\n+ -- Missing index on timestamp column in v2.4.1 release 12 mins ago causing O(N) DB lock`
  },

  liveLogs: [
    { time: "03:14:12", type: "ERROR", message: "Connection pool exhausted for database (Active: 100/100, Queue: 4210)" },
    { time: "03:14:08", type: "ERROR", message: "HTTP 500 at /api/v2/payment/charge (Timeout waiting for pool connection)" },
    { time: "03:14:05", type: "INFO", message: "Payment Gateway v2.4.1 release deployment completed" },
    { time: "03:14:02", type: "WARN", message: "DB connection latency exceeded 5000ms threshold on transactions query" },
    { time: "03:13:58", type: "ERROR", message: "Failed to process payment request for checkout order #99812" }
  ],

  remediation: {
    title: "Rollback Payment Gateway",
    action: "v2.4.1 → v2.4.0",
    alternativeAction: "Scale DB Connection Pool to 250 + Hot-Patch Index",
    reason: "Rolling back the recent deployment is recommended because the incident began shortly after the release and the sandbox test can safely verify whether the rollback restores service health.",
    risk: "Medium",
    reversible: "Yes",
    sandboxStatus: "PASSED",
    sandboxContainerId: "sbx-pay-9921",
    beforeMetrics: { errorRate: "98.4%", latency: "850 ms", health: "Critical" },
    afterMetrics: { errorRate: "0.0%", latency: "18 ms", health: "Healthy" },
    sandboxLog: "[SANDBOX VERIFICATION PASSED] 5,000 synthetic requests executed. P99 latency dropped from 8.4s to 18ms. 0 errors."
  },

  auditTrail: [
    { id: 1, timestamp: "03:14:22Z", event: "Incident detected", action: "Sev-1 Alert Fired", actor: "Azure Monitor", status: "Triggered" },
    { id: 2, timestamp: "03:14:25Z", event: "Evidence collected", action: "Ingested logs & trace context", actor: "AI Investigator", status: "Complete" },
    { id: 3, timestamp: "03:14:30Z", event: "Diagnostic probe requested", action: "Executed KQL DB socket query", actor: "AI Prober", status: "Complete" },
    { id: 4, timestamp: "03:14:35Z", event: "Root cause identified", action: "Ranked v2.4.1 deployment (94% confidence)", actor: "AI Hypothesis Engine", status: "Complete" },
    { id: 5, timestamp: "03:14:40Z", event: "Remediation recommended", action: "Generated rollback playbook v2.4.1 → v2.4.0", actor: "AI Planner", status: "Complete" },
    { id: 6, timestamp: "03:14:45Z", event: "Sandbox verification completed", action: "Ran load test in isolated Docker runtime", actor: "AI Sandbox Verifier", status: "PASSED" }
  ]
};

export const BENCHMARK_DATA = {
  totalScenarios: 12,
  accuracyResilify: "91.7%",
  accuracyBaseline: "33.3%",
  ttdResilify: "0.8 mins",
  ttdBaseline: "14.2 mins",
  mttrResilify: "3.2 mins",
  mttrBaseline: "45.0 mins",
  savings: "$501,600"
};
