import React from 'react';
import ServiceFlow from './ServiceFlow';
import StepProgressTracker from './StepProgressTracker';
import { AlertTriangle, Clock, Server, Activity, TrendingUp, CheckCircle2, ShieldCheck, Sparkles, XCircle, RefreshCw, GitCommit, FileText } from 'lucide-react';

export default function OverviewDashboard({
  scenario,
  incidentState,
  currentStep,
  onRunProbe,
  onRunSandboxTest,
  onApproveFix,
  onRejectFix,
  onSelectTab
}) {
  const isTriggered = incidentState === 'TRIGGERED';
  const isProbing = incidentState === 'PROBING';
  const isProbed = incidentState === 'PROBED';
  const isTestingSandbox = incidentState === 'TESTING_SANDBOX';
  const isPendingApproval = incidentState === 'PENDING_APPROVAL';
  const isExecutingFix = incidentState === 'EXECUTING_FIX';
  const isResolved = incidentState === 'RESOLVED';

  const metrics = isResolved ? scenario.recoveredMetrics : scenario.metrics;
  const currentConfidence = isTriggered ? scenario.initialConfidence : scenario.probedConfidence;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 🚨 Top Incident Summary Card */}
      <div className="resilify-card" style={{
        background: isResolved ? '#ecfdf5' : '#fff1f2',
        border: `1.5px solid ${isResolved ? '#a7f3d0' : '#fecdd3'}`,
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className={`badge-pill ${isResolved ? 'badge-green' : 'badge-red'}`}>
                {isResolved ? '🟢 INCIDENT RESOLVED' : `🚨 ${scenario.severity} INCIDENT ACTIVE`}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Started {scenario.startedAgo}</span>
            </div>

            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-dark)' }}>
              {scenario.title}
            </h2>

            {/* Customer Impact Callout */}
            <div style={{
              marginTop: '10px',
              padding: '10px 14px',
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              display: 'inline-flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                CUSTOMER IMPACT
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: isResolved ? '#059669' : '#be123c' }}>
                "{scenario.customerImpact}"
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                {scenario.customerExplanation}
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', background: '#ffffff', padding: '12px 18px', borderRadius: '16px', border: '1px solid #cbd5e1' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Affected Service</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-dark)' }}>{scenario.affectedService}</div>
            </div>

            <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Status</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: isResolved ? '#059669' : '#e11d48' }}>
                {isResolved ? 'Recovered' : (isPendingApproval ? 'Approval Required' : 'Investigating')}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Failed Requests</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isResolved ? '#059669' : '#f43f5e' }}>
                {metrics.failedRequests}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid #cbd5e1', paddingLeft: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Response Time</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isResolved ? '#059669' : '#f43f5e' }}>
                {metrics.responseTime}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Live Service Flow Diagram */}
      <ServiceFlow dependencies={scenario.dependencies} isResolved={isResolved} />

      {/* Main Dashboard 2-Column Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Column: 4 Metric Cards + Logs/Events + Deployment */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 4 Metric Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            
            <div className="resilify-card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Failed Requests</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isResolved ? '#059669' : '#f43f5e', marginTop: '2px' }}>
                {metrics.failedRequests}
              </div>
            </div>

            <div className="resilify-card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Response Time</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isResolved ? '#059669' : '#2563eb', marginTop: '2px' }}>
                {metrics.responseTime}
              </div>
            </div>

            <div className="resilify-card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Service Health</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isResolved ? '#059669' : '#f43f5e', marginTop: '2px' }}>
                {metrics.serviceHealth}
              </div>
            </div>

            <div className="resilify-card" style={{ padding: '14px' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>Customer Impact</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isResolved ? '#059669' : '#d97706', marginTop: '2px' }}>
                {metrics.customerImpactLevel}
              </div>
            </div>

          </div>

          {/* Logs & Events + Deployment Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Logs Snippet */}
            <div className="resilify-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Logs & Events
                </h4>
                <button 
                  onClick={() => onSelectTab('logs')}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  View All Logs →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                {scenario.logs.slice(0, 3).map((log, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', padding: '6px 8px', borderRadius: '6px', display: 'flex', gap: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{log.time}</span>
                    <span style={{ fontWeight: 800, color: log.type === 'ERROR' ? '#f43f5e' : '#d97706' }}>{log.type}</span>
                    <span style={{ color: '#334155', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deployment Card */}
            <div className="resilify-card">
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <GitCommit size={16} color="#0f172a" /> Recent Deployment
              </h4>

              <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '10px 12px', borderRadius: '10px' }}>
                <div style={{ fontWeight: 800, color: '#9f1239', fontSize: '0.9rem' }}>
                  {scenario.deployment.service}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#be123c', marginTop: '2px' }}>
                  Deployed {scenario.deployment.deployedAgo}
                </div>
                <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#64748b', marginTop: '4px', background: '#ffffff', padding: '2px 6px', borderRadius: '4px', display: 'inline-block' }}>
                  commit: {scenario.deployment.commitHash}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: AI Investigation Card + Root Cause Hypotheses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* AI Investigation Card */}
          <div className="resilify-card" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #dbeafe' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#2563eb" /> 🔍 AI Investigation
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Autonomous telemetry & log investigation
                </p>
              </div>

              <div style={{ fontSize: '1.3rem' }} title="Resilify AI Assistant">
                🤖
              </div>
            </div>

            {/* Investigation Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              {scenario.investigationProgress.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{step.text}</span>
                </div>
              ))}
            </div>

            {/* Confidence Gauge */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Initial Confidence:</span>
                <span style={{ color: isTriggered ? '#d97706' : '#10b981' }}>{currentConfidence}%</span>
              </div>
              <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${currentConfidence}%`, background: isTriggered ? 'linear-gradient(90deg, #f59e0b 0%, #3b82f6 100%)' : 'linear-gradient(90deg, #3b82f6 0%, #10b981 100%)', transition: 'width 0.8s ease' }} />
              </div>
            </div>

            {/* Warning Callout Box */}
            <div style={{ background: isTriggered ? '#fffbe6' : '#ecfdf5', border: `1px solid ${isTriggered ? '#fef3c7' : '#a7f3d0'}`, padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem', color: isTriggered ? '#b45309' : '#059669', marginBottom: '14px' }}>
              {isTriggered ? `⚠️ More evidence needed. ${scenario.evidenceNeededMessage}` : `✓ ${scenario.probedEvidenceMessage}`}
            </div>

            {/* Action Buttons */}
            {isTriggered && (
              <button className="btn-resilify-primary" onClick={onRunProbe} style={{ width: '100%', justifyContent: 'center' }}>
                <Sparkles size={16} /> [ Investigate Further ]
              </button>
            )}

            {isProbing && (
              <div style={{ padding: '10px', background: '#fffbe6', border: '1px solid #fef3c7', color: '#b45309', borderRadius: '10px', textAlign: 'center', fontWeight: 700, fontSize: '0.82rem' }}>
                <RefreshCw size={16} className="animate-spin inline mr-2" /> 🔎 Collecting additional evidence...
              </div>
            )}
          </div>

          {/* Root Cause Analysis Card */}
          <div className="resilify-card">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🎯 Root Cause Analysis (Most Supported Hypothesis)
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
              {scenario.hypotheses.map((hyp, i) => {
                const conf = isTriggered ? (hyp.isTop ? scenario.initialConfidence : hyp.confidence) : (hyp.isTop ? scenario.probedConfidence : hyp.confidence);
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-dark)' }}>{hyp.name}</span>
                      <span style={{ color: hyp.color }}>{conf}%</span>
                    </div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${conf}%`, background: hyp.color, transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {(isProbed || isTestingSandbox || isPendingApproval || isExecutingFix || isResolved) && (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px 12px', borderRadius: '10px', fontSize: '0.78rem' }}>
                <strong style={{ color: 'var(--text-dark)' }}>Concise Evidence:</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                  {(scenario?.rootCauseEvidence || scenario?.evidenceList || []).map((ev, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669' }}>
                      <CheckCircle2 size={14} /> <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Recommended Fix & Sandbox Safety Check */}
      {(isProbed || isTestingSandbox || isPendingApproval || isExecutingFix || isResolved) && (
        <div className="resilify-card" style={{ border: '1.5px solid #a7f3d0', background: '#f0fdf4' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div>
              <span className="badge-pill badge-green">🛠 RECOMMENDED FIX</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '4px' }}>
                {scenario.remediation.actionTitle} ({scenario.remediation.actionVersion})
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ background: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid #cbd5e1' }}>
                Risk: {scenario.remediation.risk}
              </span>
              <span style={{ background: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid #cbd5e1' }}>
                Reversible: {scenario.remediation.reversible}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#166534', marginBottom: '14px' }}>
            Why? "{scenario.remediation.why}"
          </p>

          {/* Test Fix Safely Button */}
          {(isTriggered || isProbed) && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-resilify-primary" onClick={onRunSandboxTest}>
                <ShieldCheck size={16} /> [ Test Fix Safely ]
              </button>
            </div>
          )}

          {/* Sandbox Testing Progress or PASSED Result */}
          {isTestingSandbox && (
            <div style={{ background: '#fffbe6', padding: '12px', borderRadius: '10px', color: '#b45309', fontWeight: 700, fontSize: '0.85rem' }}>
              <RefreshCw size={16} className="animate-spin inline mr-2" /> 🧪 Testing safely in sandbox (Applying change, running health checks, checking error rate & response time)...
            </div>
          )}

          {(isPendingApproval || isExecutingFix || isResolved) && (
            <div style={{ background: '#ffffff', border: '2px solid #a7f3d0', padding: '18px', borderRadius: '14px', marginBottom: '16px', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={18} color="#059669" /> 🟢 Container Sandbox Safety Verification PASSED
                </div>
                <span className="badge-pill badge-green" style={{ fontSize: '0.68rem' }}>
                  SIMULATED SANDBOX TELEMETRY ({scenario?.sandbox?.containerId || 'sbx-pay-9921'})
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.75rem', marginBottom: '12px' }}>
                <div style={{ background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <div style={{ color: '#166534', fontWeight: 700, fontSize: '0.68rem' }}>Error Rate</div>
                  <strong style={{ color: '#059669', fontSize: '0.95rem' }}>{scenario?.metrics?.failedRequests} → 0.0%</strong>
                </div>
                <div style={{ background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <div style={{ color: '#166534', fontWeight: 700, fontSize: '0.68rem' }}>Response Time</div>
                  <strong style={{ color: '#059669', fontSize: '0.95rem' }}>{scenario?.metrics?.responseTime} → 18ms</strong>
                </div>
                <div style={{ background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <div style={{ color: '#166534', fontWeight: 700, fontSize: '0.68rem' }}>Health Status</div>
                  <strong style={{ color: '#059669', fontSize: '0.85rem' }}>HTTP 200 OK (5/5)</strong>
                </div>
                <div style={{ background: '#f0fdf4', padding: '8px 10px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <div style={{ color: '#166534', fontWeight: 700, fontSize: '0.68rem' }}>AST Safety Gate</div>
                  <strong style={{ color: '#059669', fontSize: '0.85rem' }}>PASSED</strong>
                </div>
              </div>

              {/* Terminal Log Snippet */}
              <div style={{ background: '#0f172a', color: '#38bdf8', padding: '10px 14px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: '1.5' }}>
                <div>[CONTAINER START] Docker runtime booted image {scenario?.affectedService || 'Payment Gateway'} with proposed change.</div>
                <div>[SYNTHETIC LOAD TEST] Executed 5,000 parallel test requests. Error rate: 0.00%. Latency P99: 18ms.</div>
                <div style={{ color: '#4ade80' }}>✓ [VERIFICATION SUCCESS] {scenario?.sandbox?.resultMessage || 'All health checks passing. Safe to deploy to production.'}</div>
              </div>
            </div>
          )}

          {/* Human Approval Required Gate */}
          {isPendingApproval && (
            <div style={{ background: '#ffffff', border: '2px solid #2563eb', padding: '16px', borderRadius: '14px', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.15)' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af', marginBottom: '4px' }}>
                👤 Human Approval Required
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '12px' }}>
                "Resilify has tested the proposed remediation in a safe environment. Approval is required before execution."
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn-secondary-light" onClick={onRejectFix}>
                  <XCircle size={16} color="#f43f5e" /> [ Reject Fix ]
                </button>
                <button className="btn-resilify-primary" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} onClick={onApproveFix}>
                  <CheckCircle2 size={16} /> [ Approve Fix ]
                </button>
              </div>
            </div>
          )}

          {/* Execution Progress */}
          {isExecutingFix && (
            <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '10px', color: '#1e40af', fontWeight: 700, fontSize: '0.85rem' }}>
              <RefreshCw size={16} className="animate-spin inline mr-2" /> 🔄 Applying approved remediation (Approval recorded, remediation started, checking service health)...
            </div>
          )}

          {/* Recovery State */}
          {isResolved && (
            <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', padding: '14px 18px', borderRadius: '12px' }}>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#047857', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <CheckCircle2 size={20} /> 🟢 Incident Recovery — Incident Resolved
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '0.82rem', color: '#065f46' }}>
                <div>Error Rate: <strong style={{ color: '#f43f5e' }}>{scenario.metrics.failedRequests}</strong> → <strong style={{ color: '#059669' }}>{scenario.recoveredMetrics.failedRequests}</strong></div>
                <div>Response Time: <strong style={{ color: '#f43f5e' }}>{scenario.metrics.responseTime}</strong> → <strong style={{ color: '#059669' }}>{scenario.recoveredMetrics.responseTime}</strong></div>
                <div>Service Health: <strong style={{ color: '#f43f5e' }}>{scenario.metrics.serviceHealth}</strong> → <strong style={{ color: '#059669' }}>{scenario.recoveredMetrics.serviceHealth}</strong></div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Bottom 7-Step Lifecycle Progress Tracker Timeline */}
      <StepProgressTracker currentStep={currentStep} />

    </div>
  );
}
