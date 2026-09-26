import React from 'react';
import StepProgressTracker from './StepProgressTracker';
import { Wrench, ShieldCheck, CheckCircle2, XCircle, RefreshCw, Activity, ArrowRight } from 'lucide-react';

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
          Containerized sandbox testing, Human Approval Required Gate, and production recovery verification.
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
          Why? "{remediation.why || remediation.reason || 'High confidence root cause identified by AI engine.'}"
        </p>

        {/* Action Trigger for Sandbox Test if in initial/probed state */}
        {(isTriggered || isProbed) && (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '14px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                Step 1: Test Remediation in Isolated Sandbox
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Clones the container image into an isolated environment to verify that error rate drops to 0.0%.
              </div>
            </div>

            <button className="btn-resilify-primary" onClick={onRunSandboxTest}>
              <ShieldCheck size={18} /> [ Test Fix Safely ]
            </button>
          </div>
        )}

        {/* Sandbox Progress Indicator */}
        {isTestingSandbox && (
          <div style={{ background: '#fffbe6', border: '1px solid #fef3c7', padding: '14px', borderRadius: '12px', color: '#b45309', fontWeight: 700, marginBottom: '20px' }}>
            <RefreshCw size={18} className="animate-spin inline mr-2" /> 🧪 Testing safely in sandbox (Applying proposed change, running health checks, checking error rate & response time)...
          </div>
        )}

        {/* Sandbox PASSED Result Box */}
        {(isPendingApproval || isExecutingFix || isResolved) && (
          <div style={{ background: '#ffffff', border: '1.5px solid #a7f3d0', padding: '16px', borderRadius: '14px', marginBottom: '20px' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857', marginBottom: '4px' }}>
              🟢 Sandbox verification passed ({incident?.sandbox?.containerId || 'sbx-pay-9921'})
            </div>
            <div style={{ fontSize: '0.8rem', color: '#15803d', fontFamily: 'var(--font-mono)' }}>
              {incident?.sandbox?.resultMessage || '5,000 synthetic load test requests executed in sandbox. Error rate dropped 98.4% → 0.0%.'}
            </div>
          </div>
        )}

        {/* Human Approval Required Gate */}
        {isPendingApproval && (
          <div style={{ background: '#ffffff', border: '2px solid #2563eb', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 16px rgba(37, 99, 235, 0.15)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1e40af' }}>
                  👤 Human Approval Required
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#475569' }}>
                  "Resilify has tested the proposed remediation in a safe environment. Approval is required before execution."
                </p>
              </div>
              <span className="badge-pill badge-blue">ACTION REQUIRED</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '14px' }}>
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
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px', borderRadius: '12px', color: '#1e40af', fontWeight: 700, marginBottom: '20px' }}>
            <RefreshCw size={18} className="animate-spin inline mr-2" /> 🔄 Applying approved remediation (Approval recorded, remediation started, checking service health)...
          </div>
        )}

        {/* Incident Resolved & Recovery Verification */}
        {isResolved && (
          <div style={{ background: '#ecfdf5', border: '1.5px solid #a7f3d0', padding: '18px', borderRadius: '16px' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#047857', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <CheckCircle2 size={22} /> 🟢 Incident Resolved — Service Fully Recovered
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', fontSize: '0.85rem', color: '#065f46' }}>
              <div>Failed Requests: <strong style={{ color: '#f43f5e' }}>{incident.metrics.failedRequests}</strong> → <strong style={{ color: '#059669' }}>{incident.recoveredMetrics.failedRequests}</strong></div>
              <div>Response Time: <strong style={{ color: '#f43f5e' }}>{incident.metrics.responseTime}</strong> → <strong style={{ color: '#059669' }}>{incident.recoveredMetrics.responseTime}</strong></div>
              <div>Service Health: <strong style={{ color: '#f43f5e' }}>{incident.metrics.serviceHealth}</strong> → <strong style={{ color: '#059669' }}>{incident.recoveredMetrics.serviceHealth}</strong></div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Progress Timeline */}
      <StepProgressTracker currentStep={currentStep} onStepClick={onStepClick} />

    </div>
  );
}
