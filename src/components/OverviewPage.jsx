import React from 'react';
import ServiceFlow from './ServiceFlow';
import AiInvestigationCard from './AiInvestigationCard';
import StepProgressTracker from './StepProgressTracker';
import { AlertTriangle, Clock, Server, Activity, TrendingUp, GitCommit, CheckCircle2, ShieldCheck, Sparkles, XCircle, RefreshCw, FileText, ArrowRight } from 'lucide-react';

export default function OverviewPage({
  incident,
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

  const hypotheses = incident.hypotheses;
  const deployment = incident.deployment;
  const remediation = incident.remediation;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 🚨 Top Incident Header Banner Card */}
      <div className="resilify-card" style={{
        background: isResolved ? '#ecfdf5' : '#fff1f2',
        border: `1.5px solid ${isResolved ? '#a7f3d0' : '#fecdd3'}`,
        padding: '20px 24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '16px',
              background: isResolved ? '#10b981' : '#f43f5e',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: isResolved ? '0 4px 14px rgba(16, 185, 129, 0.3)' : '0 4px 14px rgba(244, 63, 94, 0.3)'
            }}>
              {isResolved ? '🟢' : '🚨'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  {incident.title}
                </h2>
                <span className={`badge-pill ${isResolved ? 'badge-green' : 'badge-red'}`}>
                  {isResolved ? 'RESOLVED' : incident.severity}
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: isResolved ? '#047857' : '#be123c', fontWeight: 600, marginTop: '2px' }}>
                {isResolved ? 'Payment Gateway has recovered. Service health 100% verified.' : incident.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#64748b" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Started</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>{incident.startedAgo}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid #cbd5e1', paddingLeft: '16px' }}>
              <Server size={16} color="#64748b" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Affected Service</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>{incident.affectedService}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid #cbd5e1', paddingLeft: '16px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isResolved ? '#10b981' : '#f43f5e'
              }} className={!isResolved ? 'pulse-critical' : ''} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Status</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: isResolved ? '#059669' : '#e11d48' }}>
                  {isResolved ? 'Recovered' : (isPendingApproval ? 'Approval Required' : 'Investigating')}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff', padding: '8px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <TrendingUp size={16} color={isResolved ? '#10b981' : '#f43f5e'} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Failed Requests</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: isResolved ? '#10b981' : '#f43f5e' }}>
                  {isResolved ? '0.0%' : incident.failedRequests}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Column: Live Service Flow + 3 Metric Cards + Logs/Events */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Live Service Flow Diagram */}
          <ServiceFlow services={incident.services} isResolved={isResolved} />

          {/* 3 Useful Metric Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            
            <div className="resilify-card" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ background: isResolved ? '#ecfdf5' : '#fff1f2', padding: '10px', borderRadius: '12px' }}>
                <TrendingUp size={24} color={isResolved ? '#10b981' : '#f43f5e'} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Failed Requests</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isResolved ? '#10b981' : '#f43f5e' }}>
                  {isResolved ? '0.0%' : incident.failedRequests}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                  {isResolved ? 'All payment requests succeeding' : 'Almost all payment requests are failing.'}
                </div>
              </div>
            </div>

            <div className="resilify-card" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ background: isResolved ? '#ecfdf5' : '#eff6ff', padding: '10px', borderRadius: '12px' }}>
                <Clock size={24} color={isResolved ? '#10b981' : '#2563eb'} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Response Time</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isResolved ? '#10b981' : '#2563eb' }}>
                  {isResolved ? '18 ms' : incident.responseTime}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                  {isResolved ? 'Optimal response latency' : 'Service is responding slowly.'}
                </div>
              </div>
            </div>

            <div className="resilify-card" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ background: isResolved ? '#ecfdf5' : '#fff1f2', padding: '10px', borderRadius: '12px' }}>
                <Activity size={24} color={isResolved ? '#10b981' : '#f43f5e'} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>Service Health</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: isResolved ? '#10b981' : '#f43f5e' }}>
                  {isResolved ? 'Healthy' : incident.serviceHealth}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                  {isResolved ? 'Service operates normally' : 'Payment service is unhealthy.'}
                </div>
              </div>
            </div>

          </div>

          {/* Logs & Events + Recent Deployment Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Live Logs Snippet Card */}
            <div className="resilify-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Logs & Events (Live)
                </h4>
                <button 
                  onClick={() => onSelectTab('logs')}
                  style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  View All Logs →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                {incident.liveLogs.slice(0, 4).map((log, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: '#f8fafc', padding: '6px 8px', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{log.time}</span>
                    <span style={{
                      fontWeight: 800,
                      color: log.type === 'ERROR' ? '#f43f5e' : (log.type === 'WARN' ? '#d97706' : '#2563eb'),
                      minWidth: '42px'
                    }}>{log.type}</span>
                    <span style={{ color: '#334155', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{log.message}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Deployment Card */}
            <div className="resilify-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GitCommit size={16} color="#0f172a" /> Recent Deployment
                </h4>
                <span className="badge-pill badge-red" style={{ fontSize: '0.65rem' }}>SUSPECT</span>
              </div>

              <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '12px', borderRadius: '12px' }}>
                <div style={{ fontWeight: 800, color: '#9f1239', fontSize: '0.95rem' }}>
                  {deployment.service} {deployment.version}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#be123c', marginTop: '2px' }}>
                  Deployed {deployment.deployedAgo} by {deployment.author}
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#64748b', marginTop: '6px', background: '#ffffff', padding: '4px 8px', borderRadius: '6px', display: 'inline-block' }}>
                  commit: {deployment.commitHash}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: AI Investigation Card + Hypothesis Confidence Chart */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* AI Investigation Card */}
          <AiInvestigationCard
            incident={incident}
            incidentState={incidentState}
            onRunProbe={onRunProbe}
          />

          {/* Hypothesis Confidence Horizontal Bar Chart */}
          <div className="resilify-card">
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
              Hypothesis Confidence Ranking
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {hypotheses.map((hyp, i) => {
                const conf = isTriggered ? hyp.initialConfidence : hyp.probedConfidence;
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                      <span style={{ color: 'var(--text-dark)' }}>{hyp.name}</span>
                      <span style={{ color: hyp.color }}>{conf}%</span>
                    </div>

                    <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${conf}%`,
                        background: hyp.color,
                        borderRadius: '4px',
                        transition: 'width 0.6s ease'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* 🎯 Section 8 & 9: Root Cause Identification & Explainable AI Card */}
      {(isProbed || isTestingSandbox || isPendingApproval || isExecutingFix || isResolved) && (
        <div className="resilify-card" style={{ border: '1.5px solid #bfdbfe', background: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#dbeafe', padding: '8px', borderRadius: '10px', color: '#1e40af' }}>
                🎯
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  Most Likely Root Cause
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  AI Causality Analysis • Ranked #1 Hypothesis
                </p>
              </div>
            </div>

            <span className="badge-pill badge-green" style={{ fontSize: '0.8rem' }}>
              94% Confidence (Probed)
            </span>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '14px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e40af', marginBottom: '6px' }}>
              Payment Gateway v2.4.1 deployment (Commit {deployment.commitHash})
            </h4>
            
            <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: '1.5', marginBottom: '12px' }}>
              <strong>Why does Resilify believe this?</strong><br />
              The Payment Gateway deployment is strongly correlated with the incident because the deployment occurred shortly before the error spike. Additional telemetry also shows database connection exhaustion caused by an unindexed SQL query introduced in the release.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> Deployment occurred 12 minutes ago before incident spike
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> KQL socket probe confirms 100/100 pool saturation
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> HTTP 500 error traces localized to payment checkout API
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 600 }}>
                <CheckCircle2 size={16} /> Sandbox test confirmed pool resize restores throughput
              </div>
            </div>
          </div>

          {/* Action Trigger for Sandbox Test if not tested yet */}
          {isProbed && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-resilify" onClick={onRunSandboxTest}>
                🧪 Test Fix in Sandbox
              </button>
            </div>
          )}
        </div>
      )}

      {/* 🧪 Section 10 & 11: Sandbox Safety Check & Recommended Remediation Card */}
      {(isTestingSandbox || isPendingApproval || isExecutingFix || isResolved) && (
        <div className="resilify-card" style={{ border: '1.5px solid #a7f3d0', background: '#f0fdf4' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-pill badge-green">🧪 SAFETY CHECK</span>
                <span style={{ fontSize: '0.8rem', color: '#059669', fontWeight: 700 }}>Sandbox Verification PASSED</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '4px' }}>
                Recommended Fix: {remediation.title} ({remediation.action})
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ background: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #cbd5e1' }}>
                Risk: {remediation.risk}
              </span>
              <span style={{ background: '#ffffff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #cbd5e1' }}>
                Reversible: {remediation.reversible}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.875rem', color: '#166534', marginBottom: '14px' }}>
            "{remediation?.why || remediation?.reason || 'High confidence remediation identified.'}"
          </p>

          {/* Sandbox Before / After Health Verification Metrics */}
          <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', padding: '14px 18px', borderRadius: '14px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#047857', marginBottom: '10px' }}>
              Isolated Sandbox Verification Results ({remediation?.sandboxContainerId || incident?.sandbox?.containerId || 'sbx-pay-9921'})
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Failed Requests</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#047857' }}>
                  {remediation?.beforeMetrics?.errorRate || incident?.metrics?.failedRequests || '98.4%'} → <strong>{remediation?.afterMetrics?.errorRate || incident?.recoveredMetrics?.failedRequests || '0.0%'}</strong>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Response Time</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#047857' }}>
                  {remediation?.beforeMetrics?.latency || incident?.metrics?.responseTime || '850 ms'} → <strong>{remediation?.afterMetrics?.latency || incident?.recoveredMetrics?.responseTime || '18 ms'}</strong>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Service Health</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#047857' }}>
                  Critical → <strong>Healthy</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 👤 Section 12: Human Approval Required Gate */}
          {isPendingApproval && (
            <div style={{ background: '#ffffff', border: '2px solid #3b82f6', padding: '16px', borderRadius: '14px', boxShadow: '0 4px 14px rgba(59, 130, 246, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e40af' }}>
                    👤 Human Approval Required
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Resilify has verified the proposed remediation in the sandbox. Your approval is required before executing the change in production.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn-secondary-light" onClick={onRejectFix}>
                  <XCircle size={16} color="#f43f5e" /> Reject Fix
                </button>
                <button className="btn-resilify" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} onClick={onApproveFix}>
                  <CheckCircle2 size={16} /> Approve Fix (Execute in Prod)
                </button>
              </div>
            </div>
          )}

          {/* 🔄 Section 13: Execution State */}
          {isExecutingFix && (
            <div style={{ background: '#eff6ff', padding: '14px', borderRadius: '12px', color: '#1e40af', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RefreshCw size={20} className="animate-spin" />
              <span>🔄 Remediation in Progress: Rollback started... Restoring Payment Gateway & Monitoring service health...</span>
            </div>
          )}

          {/* 🟢 Section 14: Recovery State */}
          {isResolved && (
            <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', padding: '14px 18px', borderRadius: '14px', color: '#047857', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={20} /> 🟢 Incident Resolved — Payment Gateway Recovered
                </h4>
                <p style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '2px' }}>
                  Measured Recovery Time: 3.2 minutes • All SLA metrics normalized.
                </p>
              </div>
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: '#ffffff', padding: '6px 12px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
                Audit Signature: SHA256-a8f9c991e
              </span>
            </div>
          )}

        </div>
      )}

      {/* 📋 Section 21 & Bottom Step Progress Tracker Timeline */}
      <StepProgressTracker currentStep={currentStep} />

    </div>
  );
}
