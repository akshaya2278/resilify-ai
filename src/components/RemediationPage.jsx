import React from 'react';
import StepProgressTracker from './StepProgressTracker';
import { Wrench, ShieldCheck, CheckCircle2, XCircle, RefreshCw, Activity, Terminal, Check } from 'lucide-react';

export default function RemediationPage({
  incident,
  incidentState,
  currentStep,
  onRunSandboxTest,
  onApproveFix,
  onRejectFix,
  onStepClick
}) {
  const isTriggered = incidentState === 'TRIGGERED';
  const isProbed = incidentState === 'PROBED';
  const isTestingSandbox = incidentState === 'TESTING_SANDBOX';
  const isPendingApproval = incidentState === 'PENDING_APPROVAL';
  const isExecutingFix = incidentState === 'EXECUTING_FIX';
  const isResolved = incidentState === 'RESOLVED';
  const remediation = incident?.remediation || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="resilify-card" style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '1px solid #a7f3d0' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#065f46', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Wrench size={24} color="#059669" /> 🛠 Remediation Playbook & Sandbox Safety Check
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#047857', marginTop: '4px' }}>
          Containerized sandbox safety testing, Human Approval Required Gate, and production recovery verification.
        </p>
      </div>

      {/* Main Remediation Card */}
      <div className="resilify-card">
        
        {/* Recommended Action Title & Risk */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <span className="badge-pill badge-green">RECOMMENDED REMEDIATION</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', marginTop: '4px' }}>
              {remediation.actionTitle || 'Rollback Service'} ({remediation.actionVersion || 'latest'})
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid #cbd5e1' }}>
              Risk: {remediation.risk || 'Low'}
            </span>
            <span style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid #cbd5e1' }}>
              Reversible: {remediation.reversible || 'Yes'}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.5', marginBottom: '20px' }}>
          <strong>Why?</strong> "{remediation.why || remediation.reason || 'High confidence root cause identified by AI engine.'}"
        </p>

        {/* Step 2: Sandbox Progress Indicator (Yellow testing box) */}
        {isTestingSandbox && (
          <div style={{ background: '#fffbe6', border: '1.5px solid #fef3c7', padding: '16px', borderRadius: '14px', color: '#b45309', fontWeight: 700, marginBottom: '20px' }}>
            <RefreshCw size={20} className="animate-spin inline mr-2" /> 🧪 Testing safely in sandbox... (Instantiating Docker container runtime, running 5,000 synthetic load tests, verifying error rate & latency drop)
          </div>
        )}

        {/* Step 3: Comprehensive Sandbox PASSED Result Box (Simulated Telemetry) */}
        {(isPendingApproval || isExecutingFix || isResolved) && (
          <div style={{ background: '#ffffff', border: '2px solid #a7f3d0', padding: '20px', borderRadius: '16px', marginBottom: '20px', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.08)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} color="#059669" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#047857' }}>
                  Container Sandbox Safety Verification PASSED
                </h4>
              </div>
              <span className="badge-pill badge-green" style={{ fontSize: '0.72rem' }}>
                SIMULATED SANDBOX TELEMETRY ({incident?.sandbox?.containerId || 'sbx-pay-9921'})
              </span>
            </div>

            {/* Sandbox Metrics Comparison Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>Sandbox Error Rate</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  {incident?.metrics?.failedRequests || '98.4%'} → <span style={{ color: '#059669' }}>0.0%</span>
                </div>
              </div>

              <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>Sandbox Response Time</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  {incident?.metrics?.responseTime || '850 ms'} → <span style={{ color: '#059669' }}>18 ms</span>
                </div>
              </div>

              <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>Health Check Status</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  HTTP 200 OK (5/5 endpoints)
                </div>
              </div>

              <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 700 }}>AST Safety Gate</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#059669', marginTop: '2px' }}>
                  PASSED (No Destructive Cmds)
                </div>
              </div>
            </div>

            {/* Sandbox Execution Log Snippet */}
            <div style={{ background: '#0f172a', color: '#38bdf8', padding: '12px 16px', borderRadius: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', lineHeight: '1.6' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Terminal size={12} /> Sandbox Log Output ({incident?.sandbox?.containerId || 'sbx-pay-9921'})
              </div>
              <div>[CONTAINER START] Docker runtime booted image {incident?.affectedService || 'Payment Gateway'} with proposed change.</div>
              <div>[SYNTHETIC LOAD TEST] Executed 5,000 parallel test requests. Error rate: 0.00%. Latency P99: 18ms.</div>
              <div style={{ color: '#4ade80' }}>✓ [VERIFICATION SUCCESS] {incident?.sandbox?.resultMessage || 'All health checks passing. Safe to deploy to production.'}</div>
            </div>

          </div>
        )}

        {/* ALWAYS-VISIBLE Dedicated Human Approval Required Gate Box */}
        <div style={{ 
          background: '#ffffff', 
          border: isPendingApproval ? '2.5px solid #2563eb' : (isResolved ? '1.5px solid #a7f3d0' : '1.5px solid #cbd5e1'), 
          padding: '22px', 
          borderRadius: '16px', 
          boxShadow: isPendingApproval ? '0 6px 22px rgba(37, 99, 235, 0.18)' : '0 2px 8px rgba(0,0,0,0.04)', 
          marginBottom: '20px' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '8px' }}>
                👤 Human Approval Gate (SRE Control Panel)
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#334155', marginTop: '4px', lineHeight: '1.4' }}>
                Explicit human authorization is required to apply <strong>{remediation.actionTitle || 'Rollback'} ({remediation.actionVersion || 'v2.4.0'})</strong> to production.
              </p>
            </div>
            
            <span className={`badge-pill ${isResolved ? 'badge-green' : (isPendingApproval ? 'badge-blue' : 'badge-amber')}`} style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
              {isResolved ? 'APPROVED & EXECUTED' : (isPendingApproval ? 'SANDBOX PASSED — ACTION REQUIRED' : 'AWAITING ACTION')}
            </span>
          </div>

          {/* Action Buttons Group */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
            
            {/* Run Sandbox Safety Test Button */}
            {!isPendingApproval && !isExecutingFix && !isResolved && (
              <button 
                className="btn-secondary-light" 
                onClick={onRunSandboxTest} 
                style={{ padding: '12px 20px', fontWeight: 700, borderColor: '#3b82f6', color: '#2563eb', background: '#eff6ff' }}
                title="Run container sandbox verification test"
              >
                <ShieldCheck size={18} color="#2563eb" /> [ 🧪 Test Fix Safely in Sandbox ]
              </button>
            )}

            {/* Do Not Approve / Reject Button */}
            {!isResolved && (
              <button 
                className="btn-secondary-light" 
                onClick={onRejectFix} 
                style={{ padding: '12px 20px', fontWeight: 700, borderColor: '#fecdd3', color: '#be123c', background: '#fff1f2' }}
                title="Reject proposed remediation and initiate manual takeover"
              >
                <XCircle size={18} color="#f43f5e" /> [ ❌ Do Not Approve / Reject Fix ]
              </button>
            )}

            {/* Approve Fix Button */}
            {!isResolved && (
              <button 
                className="btn-resilify-primary" 
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '12px 24px', fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }} 
                onClick={onApproveFix}
                title="Approve remediation and rollout to production"
              >
                <CheckCircle2 size={18} /> [ ✅ Approve Fix & Deploy to Production ]
              </button>
            )}

            {isResolved && (
              <div style={{ color: '#059669', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={20} /> Approved & Rolled Out to Production
              </div>
            )}

          </div>
        </div>

        {/* Step 5: Production Execution Progress Banner */}
        {isExecutingFix && (
          <div style={{ background: '#eff6ff', border: '1.5px solid #93c5fd', padding: '16px', borderRadius: '14px', color: '#1e40af', fontWeight: 700, marginBottom: '20px' }}>
            <RefreshCw size={20} className="animate-spin inline mr-2" /> 🔄 Applying Approved Remediation in Production... (Approval recorded by Elena Vance, applying {remediation.actionTitle || 'Rollback'}, verifying production health checks)
          </div>
        )}

        {/* Step 6 & 7: Incident Resolved & Live Production Recovery Verification */}
        {isResolved && (
          <div style={{ background: '#ecfdf5', border: '2px solid #34d399', padding: '22px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={24} color="#059669" /> 🟢 Incident Resolved — Live Telemetry Verified
              </div>
              <span className="badge-pill badge-green">
                LIVE PRODUCTION RECOVERY VERIFIED
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '0.88rem', color: '#065f46' }}>
              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Failed Requests</div>
                <div style={{ marginTop: '4px', fontWeight: 800 }}>
                  <span style={{ color: '#f43f5e' }}>{incident?.metrics?.failedRequests || '98.4%'}</span> → <span style={{ color: '#059669' }}>{incident?.recoveredMetrics?.failedRequests || '0.0%'}</span>
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Response Time</div>
                <div style={{ marginTop: '4px', fontWeight: 800 }}>
                  <span style={{ color: '#f43f5e' }}>{incident?.metrics?.responseTime || '850 ms'}</span> → <span style={{ color: '#059669' }}>{incident?.recoveredMetrics?.responseTime || '18 ms'}</span>
                </div>
              </div>

              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Service Health</div>
                <div style={{ marginTop: '4px', fontWeight: 800 }}>
                  <span style={{ color: '#f43f5e' }}>{incident?.metrics?.serviceHealth || 'Critical'}</span> → <span style={{ color: '#059669' }}>{incident?.recoveredMetrics?.serviceHealth || 'Healthy'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Dynamic 7-Step Progress Timeline */}
      <StepProgressTracker currentStep={currentStep} onStepClick={onStepClick} />

    </div>
  );
}
