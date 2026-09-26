export const SCENARIOS_DATA = [
  {
    id: "payment-failure",
    name: "Payment Gateway Failure",
    title: "Payment Service Incident",
    severity: "SEV-1",
    customerImpact: "My payment isn't working.",
    customerExplanation: "Payment requests are currently failing.",
    affectedService: "Payment Gateway",
    startedAgo: "12 minutes ago",

    metrics: {
      failedRequests: "98.4%",
      responseTime: "850 ms",
      serviceHealth: "Critical",
      customerImpactLevel: "High"
    },
    recoveredMetrics: {
      failedRequests: "0.0%",
      responseTime: "18 ms",
      serviceHealth: "Healthy",
      customerImpactLevel: "None"
    },

    dependencies: [
      { id: "customer", name: "Customer", role: "User", status: "normal", label: "Places Order", icon: "User" },
      { id: "api-gw", name: "API Gateway", role: "Gateway", status: "degraded", errorRate: "24.2%", latency: "450ms", icon: "Layers" },
      { id: "payment-gw", name: "Payment Gateway", role: "Primary Service", status: "critical", errorRate: "98.4%", latency: "850ms", icon: "CreditCard", isFaultOrigin: true },
      { id: "database", name: "Database", role: "Database", status: "degraded", errorRate: "89.0%", latency: "320ms", icon: "Database" },
      { id: "auth-svc", name: "Auth Service", role: "Auth", status: "healthy", errorRate: "0.1%", latency: "35ms", icon: "ShieldCheck" },
      { id: "redis-cache", name: "Redis Cache", role: "Cache", status: "healthy", errorRate: "0.0%", latency: "4ms", icon: "Zap" },
      { id: "notif-svc", name: "Notification Service", role: "Worker", status: "degraded", errorRate: "14.5%", latency: "220ms", icon: "Bell" }
    ],

    initialConfidence: 62,
    probedConfidence: 94,
    evidenceNeededMessage: "Current evidence is not strong enough to confidently identify the root cause. Additional diagnostic data is being collected.",
    probedEvidenceMessage: "Diagnostic probe complete via KQL. Database connection pool saturation confirmed on v2.4.1 deployment.",

    investigationProgress: [
      { text: "Reading application logs", done: true },
      { text: "Analyzing service traces", done: true },
      { text: "Checking recent deployments", done: true },
      { text: "Checking database connections", done: true }
    ],

    hypotheses: [
      { name: "Payment Gateway deployment", confidence: 94, isTop: true, color: "#f43f5e" },
      { name: "Database issue", confidence: 25, color: "#f59e0b" },
      { name: "Network issue", confidence: 10, color: "#7c3aed" },
      { name: "Other", confidence: 3, color: "#94a3b8" }
    ],

    evidenceList: [
      "New deployment detected 12 minutes ago (commit f9a2b8e)",
      "Error rate increased from 0.01% to 98.4% after deployment",
      "Payment traces show connection timeout at /api/payment endpoint",
      "Database telemetry shows connection pool saturation (100/100 active connections)"
    ],

    deployment: {
      service: "Payment Gateway v2.4.1",
      deployedAgo: "12 minutes ago",
      commitHash: "f9a2b8e",
      author: "dev-team@enterprise.com",
      message: "feat: add user transaction history lookup v2.4.1"
    },

    logs: [
      { time: "03:14:12", type: "ERROR", message: "Connection pool exhausted for database (100/100 connections)" },
      { time: "03:14:08", type: "ERROR", message: "HTTP 500 at /api/payment (Timeout waiting for pool connection)" },
      { time: "03:14:05", type: "INFO", message: "Payment Gateway v2.4.1 deployed successfully" },
      { time: "03:14:02", type: "WARN", message: "DB connection latency exceeded 5000ms threshold" }
    ],

    remediation: {
      actionTitle: "Rollback Payment Gateway",
      actionVersion: "v2.4.1 → v2.4.0",
      why: "The incident began shortly after the new deployment and the error rate increased significantly.",
      risk: "Low",
      reversible: "Yes",
      expectedImpact: "Restores checkout API throughput and drops P99 latency from 8.4s to 18ms."
    },

    sandbox: {
      containerId: "sbx-pay-9921",
      status: "PASSED",
      resultMessage: "5,000 synthetic load test requests executed in sandbox. Error rate dropped 98.4% → 0.0%. Response time dropped 850ms → 18ms."
    }
  },

  {
    id: "db-failure",
    name: "Database Failure",
    title: "Database Latency & Lock Incident",
    severity: "SEV-1",
    customerImpact: "Page loads are timing out.",
    customerExplanation: "Database write locks are blocking user checkouts.",
    affectedService: "Database",
    startedAgo: "15 minutes ago",

    metrics: {
      failedRequests: "91.2%",
      responseTime: "4200 ms",
      serviceHealth: "Critical",
      customerImpactLevel: "Critical"
    },
    recoveredMetrics: {
      failedRequests: "0.0%",
      responseTime: "14 ms",
      serviceHealth: "Healthy",
      customerImpactLevel: "None"
    },

    dependencies: [
      { id: "customer", name: "Customer", role: "User", status: "normal", label: "Browses Store", icon: "User" },
      { id: "api-gw", name: "API Gateway", role: "Gateway", status: "degraded", errorRate: "45.0%", latency: "1200ms", icon: "Layers" },
      { id: "database", name: "Database", role: "Primary DB", status: "critical", errorRate: "91.2%", latency: "4200ms", icon: "Database", isFaultOrigin: true },
      { id: "payment-gw", name: "Payment Gateway", role: "Primary Service", status: "degraded", errorRate: "52.0%", latency: "2100ms", icon: "CreditCard" },
      { id: "auth-svc", name: "Auth Service", role: "Auth", status: "healthy", errorRate: "0.2%", latency: "38ms", icon: "ShieldCheck" },
      { id: "redis-cache", name: "Redis Cache", role: "Cache", status: "healthy", errorRate: "0.0%", latency: "5ms", icon: "Zap" }
    ],

    initialConfidence: 68,
    probedConfidence: 96,
    evidenceNeededMessage: "Disk IOPS metrics missing. Additional database diagnostic probe required.",
    probedEvidenceMessage: "KQL probe confirmed disk IOPS throttling and unindexed query lock on transactions table.",

    investigationProgress: [
      { text: "Reading application logs", done: true },
      { text: "Analyzing service traces", done: true },
      { text: "Checking database IOPS metrics", done: true },
      { text: "Checking active lock queries", done: true }
    ],

    hypotheses: [
      { name: "Database IOPS throttling & locks", confidence: 96, isTop: true, color: "#f43f5e" },
      { name: "API Gateway bottleneck", confidence: 18, color: "#f59e0b" },
      { name: "Other", confidence: 4, color: "#94a3b8" }
    ],

    evidenceList: [
      "PostgreSQL disk IOPS hit 100% cloud volume quota 15 minutes ago",
      "Active lock queries queue length exceeded 8,000 pending statements",
      "Hotfix query index patch reduces table scan latency from 4.2s to 14ms"
    ],

    deployment: {
      service: "Database Migration Script v3.1",
      deployedAgo: "15 minutes ago",
      commitHash: "db-mig-881",
      author: "dba-team@enterprise.com",
      message: "mig: add transactions index migration script"
    },

    logs: [
      { time: "03:10:00", type: "ERROR", message: "PostgreSQL: Disk IOPS quota exceeded (100% Cloud Volume Limit)" },
      { time: "03:09:55", type: "ERROR", message: "Exclusive lock wait timeout on table 'orders'" },
      { time: "03:09:40", type: "WARN", message: "Slow query log: SELECT * FROM orders WHERE status = 'PENDING'" }
    ],

    remediation: {
      actionTitle: "Hot-Patch SQL Index & Expand IOPS",
      actionVersion: "Index Hotfix v3.1.1",
      why: "Adding the missing composite index concurrently releases lock congestion and restores database IOPS quota.",
      risk: "Low",
      reversible: "Yes",
      expectedImpact: "Clears 8,000 lock queues and drops query latency from 4,200ms to 14ms."
    },

    sandbox: {
      containerId: "sbx-db-5510",
      status: "PASSED",
      resultMessage: "Sandbox index hot-patch verified. 8,000 lock queue statements cleared in 1.2s. 0 errors."
    }
  },

  {
    id: "api-latency",
    name: "API Latency",
    title: "API Gateway High Latency Cascade",
    severity: "SEV-2",
    customerImpact: "Checkout is responding very slowly.",
    customerExplanation: "API Gateway timeout threshold exceeded on upstream calls.",
    affectedService: "API Gateway",
    startedAgo: "20 minutes ago",

    metrics: {
      failedRequests: "42.0%",
      responseTime: "2800 ms",
      serviceHealth: "Degraded",
      customerImpactLevel: "Medium"
    },
    recoveredMetrics: {
      failedRequests: "0.0%",
      responseTime: "25 ms",
      serviceHealth: "Healthy",
      customerImpactLevel: "None"
    },

    dependencies: [
      { id: "customer", name: "Customer", role: "User", status: "normal", label: "Places Order", icon: "User" },
      { id: "api-gw", name: "API Gateway", role: "Gateway", status: "critical", errorRate: "42.0%", latency: "2800ms", icon: "Layers", isFaultOrigin: true },
      { id: "payment-gw", name: "Payment Gateway", role: "Service", status: "degraded", errorRate: "12.0%", latency: "450ms", icon: "CreditCard" },
      { id: "database", name: "Database", role: "Database", status: "healthy", errorRate: "0.1%", latency: "16ms", icon: "Database" }
    ],

    initialConfidence: 55,
    probedConfidence: 92,
    evidenceNeededMessage: "Circuit breaker status unconfirmed. Diagnostic probe required.",
    probedEvidenceMessage: "Probe verified circuit breaker timeout setting set too low (200ms) in v4.0 Gateway config.",

    investigationProgress: [
      { text: "Reading application logs", done: true },
      { text: "Analyzing service traces", done: true },
      { text: "Checking circuit breaker settings", done: true }
    ],

    hypotheses: [
      { name: "API Gateway circuit breaker misconfiguration", confidence: 92, isTop: true, color: "#f43f5e" },
      { name: "Upstream ISP packet drop", confidence: 15, color: "#f59e0b" }
    ],

    evidenceList: [
      "Gateway timeout configuration dropped from 5000ms to 200ms in commit gateway-42",
      "Upstream requests timing out prematurely before microservices reply"
    ],

    deployment: {
      service: "API Gateway Config v4.0",
      deployedAgo: "20 minutes ago",
      commitHash: "gw-cfg-42",
      author: "infra-team@enterprise.com",
      message: "config: update gateway timeout thresholds"
    },

    logs: [
      { time: "03:00:12", type: "ERROR", message: "Circuit breaker OPEN: /api/checkout timeout exceeded 200ms" },
      { time: "03:00:02", type: "WARN", message: "Gateway connection thread pool utilization 88%" }
    ],

    remediation: {
      actionTitle: "Rollback Gateway Timeout Config",
      actionVersion: "v4.0 → v3.9",
      why: "Restoring the 5000ms timeout threshold prevents valid requests from timing out prematurely.",
      risk: "Low",
      reversible: "Yes",
      expectedImpact: "Drops API latency from 2,800ms to 25ms and restores HTTP 200 responses."
    },

    sandbox: {
      containerId: "sbx-gw-1209",
      status: "PASSED",
      resultMessage: "Gateway sandbox config rollback verified. Circuit breaker closed. 0 errors."
    }
  },

  {
    id: "auth-failure",
    name: "Authentication Failure",
    title: "Auth Service Heap Memory Leak",
    severity: "SEV-1",
    customerImpact: "I can't log in to my account.",
    customerExplanation: "User authentication requests are failing continuously.",
    affectedService: "Auth Service",
    startedAgo: "8 minutes ago",

    metrics: {
      failedRequests: "94.2%",
      responseTime: "3400 ms",
      serviceHealth: "Critical",
      customerImpactLevel: "High"
    },
    recoveredMetrics: {
      failedRequests: "0.0%",
      responseTime: "12 ms",
      serviceHealth: "Healthy",
      customerImpactLevel: "None"
    },

    dependencies: [
      { id: "customer", name: "Customer", role: "User", status: "normal", label: "Logs In", icon: "User" },
      { id: "api-gw", name: "API Gateway", role: "Gateway", status: "critical", errorRate: "76.4%", latency: "620ms", icon: "Layers" },
      { id: "auth-svc", name: "Auth Service", role: "Primary Service", status: "critical", errorRate: "94.2%", latency: "3400ms", icon: "ShieldCheck", isFaultOrigin: true },
      { id: "redis-cache", name: "Redis Cache", role: "Cache", status: "critical", errorRate: "82.5%", latency: "1200ms", icon: "Zap" },
      { id: "database", name: "Database", role: "Database", status: "healthy", errorRate: "0.2%", latency: "14ms", icon: "Database" }
    ],

    initialConfidence: 71,
    probedConfidence: 91,
    evidenceNeededMessage: "Container cgroup memory heap profile unconfirmed. Probe required.",
    probedEvidenceMessage: "JVM Heap profiling dump confirmed 1.4GB of uncollected JWT token objects retained by static listener.",

    investigationProgress: [
      { text: "Reading application logs", done: true },
      { text: "Analyzing service traces", done: true },
      { text: "Checking memory heap profile", done: true }
    ],

    hypotheses: [
      { name: "Auth Service v1.9.3 static map memory leak", confidence: 91, isTop: true, color: "#f43f5e" },
      { name: "Redis Cluster eviction failure", confidence: 15, color: "#f59e0b" }
    ],

    evidenceList: [
      "Static event listener memory leak introduced in Auth v1.9.3 patch",
      "JVM heap dump confirms 1.4GB memory saturation",
      "Session validation requests timing out at 3,400ms"
    ],

    deployment: {
      service: "Auth Service v1.9.3",
      deployedAgo: "8 minutes ago",
      commitHash: "e10c44a",
      author: "security-team@enterprise.com",
      message: "fix: update token revocation listener v1.9.3"
    },

    logs: [
      { time: "04:20:00", type: "ERROR", message: "java.lang.OutOfMemoryError: Java heap space" },
      { time: "04:19:40", type: "ERROR", message: "Token validation failed for session token #auth-9921" }
    ],

    remediation: {
      actionTitle: "Rollback Auth Service",
      actionVersion: "v1.9.3 → v1.9.2",
      why: "Rolling back Auth Service release clears leaked heap memory and restores token verification throughput.",
      risk: "Low",
      reversible: "Yes",
      expectedImpact: "Frees 1.4GB leaked RAM and drops authentication latency from 3.4s to 12ms."
    },

    sandbox: {
      containerId: "sbx-auth-4012",
      status: "PASSED",
      resultMessage: "Auth sandbox rollback verified. 3,000 synthetic auth validation requests executed. 0 errors."
    }
  },

  {
    id: "network-failure",
    name: "Network Dependency Failure",
    title: "External Payment API Socket Partition",
    severity: "SEV-1",
    customerImpact: "Payments are stuck processing.",
    customerExplanation: "Outbound socket connections to external payment processor are timing out.",
    affectedService: "External Network",
    startedAgo: "5 minutes ago",

    metrics: {
      failedRequests: "88.0%",
      responseTime: "5000 ms",
      serviceHealth: "Critical",
      customerImpactLevel: "High"
    },
    recoveredMetrics: {
      failedRequests: "0.0%",
      responseTime: "45 ms",
      serviceHealth: "Healthy",
      customerImpactLevel: "None"
    },

    dependencies: [
      { id: "customer", name: "Customer", role: "User", status: "normal", label: "Places Order", icon: "User" },
      { id: "payment-gw", name: "Payment Gateway", role: "Primary Service", status: "critical", errorRate: "88.0%", latency: "5000ms", icon: "CreditCard", isFaultOrigin: true },
      { id: "ext-network", name: "External Payment API", role: "External API", status: "critical", errorRate: "100.0%", latency: "5000ms", icon: "Zap" }
    ],

    initialConfidence: 60,
    probedConfidence: 95,
    evidenceNeededMessage: "Outbound network socket state unconfirmed. TCP dump probe required.",
    probedEvidenceMessage: "TCP dump probe confirmed outbound DNS resolution failure to primary payment gateway endpoint.",

    investigationProgress: [
      { text: "Reading application logs", done: true },
      { text: "Analyzing network socket states", done: true }
    ],

    hypotheses: [
      { name: "Primary DNS resolver socket partition", confidence: 95, isTop: true, color: "#f43f5e" },
      { name: "Payment Provider Outage", confidence: 12, color: "#f59e0b" }
    ],

    evidenceList: [
      "Outbound TCP SYN packets to primary payment IP timing out",
      "Fallback secondary DNS resolver ping succeeds in 12ms"
    ],

    deployment: {
      service: "DNS Resolver Config v2.0",
      deployedAgo: "5 minutes ago",
      commitHash: "dns-991",
      author: "net-team@enterprise.com",
      message: "net: update egress DNS resolution path"
    },

    logs: [
      { time: "05:10:00", type: "ERROR", message: "java.net.UnknownHostException: api.stripe.com" },
      { time: "05:09:50", type: "ERROR", message: "Outbound HTTP socket timeout after 5000ms" }
    ],

    remediation: {
      actionTitle: "Switch to Backup DNS Resolver",
      actionVersion: "Primary → Secondary Resolver",
      why: "Switching egress routes to the secondary DNS resolver bypasses the partitioned socket path.",
      risk: "Low",
      reversible: "Yes",
      expectedImpact: "Restores outbound payment API connectivity and drops latency from 5.0s to 45ms."
    },

    sandbox: {
      containerId: "sbx-net-8812",
      status: "PASSED",
      resultMessage: "Egress DNS route switch verified in sandbox. Outbound payment API connectivity restored. 0 errors."
    }
  }
];

export const BENCHMARK_METRICS = {
  mttrBefore: 45.0,
  mttrAfter: 3.2,
  accuracyRules: 33.3,
  accuracyResilify: 91.7,
  scenariosTested: 12,
  savingsPerIncident: "$501,600"
};
