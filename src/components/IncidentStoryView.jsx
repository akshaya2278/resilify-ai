import React from 'react';
import ServiceFlow from './ServiceFlow';
import StepProgressTracker from './StepProgressTracker';
import { AlertCircle, Clock, Server, Activity, TrendingUp, CheckCircle2, ShieldCheck, Sparkles, XCircle, RefreshCw, ChevronRight, FileText, ArrowRight } from 'lucide-react';

export default function IncidentStoryView({
  scenario,
  incidentState,
  currentStep,
  onRunProbe,
  onRunSandboxTest,
  onApproveFix,
  onRejectFix
}) {
  const isTriggered = incidentState === 'TRIGGERED';
  const isProbing = incidentState === 'PROBING';
  const isProbed = incidentState === 'PROBED';
  const isTestingSandbox = incidentState === 'TESTING_SANDBOX';
  const isPendingApproval = incidentState === 'PENDING_APPROVAL';
  const isExecutingFix = incidentState === 'EXECUTING_FIX';
  const isResolved = incidentState === 'RESOLVED';

  const initialMetrics = scenario.initialMetrics;
  const recoveredMetrics = scenario.recoveredMetrics;
  const currentConfidence = isTriggered ? scenario.initialConfidence : scenario.probedConfidence;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 1. WHAT HAPPENED? Incident Header Card */}
      <div className="glass-panel" style={{
        padding: '24px',
        borderLeft: isResolved ? '6px solid #00e676' : '6px solid #ff0055'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className={`badge-pill ${isResolved ? 'badge-green pulse-green' : 'badge-red pulse-red'}`}>
                {isResolved ? '🟢 INCIDENT RESOLVED' : `🚨 ${scenario.severity} INCIDENT ACTIVE`}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Started {scenario.startedAgo}</span>
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              {scenario.title}
            </h2>

            {/* Customer Impact Statement */}
            <div style={{
              marginTop: '10px',
              padding: '8px 14px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}>
              <span style={{ fontSize: '1rem' }}>💬</span>
              <span style={{ color: 'var(--color-text-muted)' }}>Customer Impact:</span>
              <strong style={{ color: isResolved ? '#00f580' : '#ff3377' }}>"{scenario.customerImpact}"</strong>
            </div>
          </div>

          {/* Actual Telemetry Metrics */}
          <div style={{ display: 'flex', gap: '20px', background: 'rgba(10, 13, 22, 0.8)', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Affected Service</span>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>{scenario.affectedService}</div>
            </div>

            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Error Rate</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isResolved ? '#00e676' : '#ff0055' }}>
                {isResolved ? recoveredMetrics.errorRate : initialMetrics.errorRate}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Response Time</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isResolved ? '#00e676' : '#ff0055' }}>
                {isResolved ? recoveredMetrics.responseTime : initialMetrics.responseTime}
              </div>
            </div>

            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Service Health</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: isResolved ? '#00e676' : '#ff0055' }}>
                {isResolved ? recoveredMetrics.serviceHealth : initialMetrics.serviceHealth}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. WHO/WHAT IS AFFECTED? Dynamic Service Flow */}
      <ServiceFlow serviceFlow={scenario.serviceFlow} isResolved={isResolved} />

      {/* Grid: 3. WHY IS IT HAPPENING? AI Investigation Card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* AI Investigation Card */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00f2fe', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} /> 🔍 AI Investigation
            </h3>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {scenario.investigationSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={18} color="#00e676" />
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>{step.text}</span>
                </div>
              ))}
            </div>

            {/* Confidence Calibration Bar */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Root-Cause Confidence:</span>
                <span style={{ color: isTriggered ? '#ffb703' : '#00e676' }}>
                  {currentConfidence}%
                </span>
              </div>

              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${currentConfidence}%`,
                  background: isTriggered 
                    ? 'linear-gradient(90deg, #ff0055 0%, #ffb703 100%)' 
                    : 'linear-gradient(90deg, #00f2fe 0%, #00e676 100%)',
                  transition: 'width 0.8s ease'
                }} />
              </div>
            </div>

            {/* 4. DOES AI NEED MORE EVIDENCE? Warning Callout Box */}
            <div style={{
              background: isTriggered ? 'rgba(255, 183, 3, 0.08)' : 'rgba(0, 230, 118, 0.08)',
              border: `1px solid ${isTriggered ? 'rgba(255, 183, 3, 0.3)' : 'rgba(0, 230, 118, 0.3)'}`,
              padding: '12px 14px',
              borderRadius: '10px',
              fontSize: '0.82rem',
              color: isTriggered ? '#ffc83b' : '#00f580'
            }}>
              {isTriggered ? `⚠️ More evidence is needed. ${scenario.evidenceReason}` : `✓ ${scenario.probedEvidenceReason}`}
            </div>
          </div>

          {/* Interactive Investigate Further Button */}
          {isTriggered && (
            <button className="btn-primary-neon" onClick={onRunProbe} style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
              <Sparkles size={18} /> [ Investigate Further ]
            </button>
          )}

          {isProbing && (
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255, 183, 3, 0.1)', color: '#ffb703', borderRadius: '10px', textAlign: 'center', fontWeight: 700 }}>
              <RefreshCw size={18} className="animate-spin inline mr-2" /> 🔎 Collecting additional evidence...
            </div>
          )}
        </div>

        {/* 5. WHAT DOES THE AI RECOMMEND? Likely Root Cause & Playbook */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#7f00ff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🎯 Likely Root Cause
            </h3>

            {(isProbed || isTestingSandbox || isPendingApproval || isExecutingFix || isResolved) ? (
              <div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                    {scenario.deployment.service} ({scenario.deployment.version})
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#00f2fe', marginTop: '2px' }}>
                    Confidence: <strong>{scenario.probedConfidence}%</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '10px', fontWeight: 700 }}>
                  Evidence Captured:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                  {(scenario?.rootCauseEvidence || scenario?.evidenceList || []).map((ev, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e0e6ed' }}>
                      <CheckCircle2 size={16} color="#00e676" />
                      <span>{ev}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', padding: '20px 0' }}>
                Run active diagnostic probe to unlock root-cause identification and evidence verification.
              </div>
            )}
          </div>

          {/* Test Fix Safely Button */}
          {isProbed && (
            <button className="btn-primary-neon" onClick={onRunSandboxTest} style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
              <ShieldCheck size={18} /> [ Test Fix Safely ]
            </button>
          )}
        </div>

      </div>

      {/* 6. WAS THE FIX SAFELY TESTED? Sandbox Verification Section */}
      {(isTestingSandbox || isPendingApproval || isExecutingFix || isResolved) && (
        <div className="glass-panel" style={{ padding: '24px', border: '1px solid rgba(0, 230, 118, 0.4)', background: 'rgba(0, 230, 118, 0.05)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
            <div>
              <span className="badge-pill badge-green">🧪 SANDBOX SAFETY CHECK</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                🛠 Recommended Action: {scenario.remediation.actionTitle} ({scenario.remediation.actionVersion})
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                Risk: {scenario.remediation.risk}
              </span>
              <span style={{ background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                Reversible: {scenario.remediation.reversible}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#e0e6ed', marginBottom: '14px' }}>
            Reason: "{scenario.remediation?.why || scenario.remediation?.reason}"
          </p>

          {/* Sandbox Progress or Verification Result */}
          {isTestingSandbox ? (
            <div style={{ background: 'rgba(255,183,3,0.1)', padding: '14px', borderRadius: '10px', color: '#ffb703', fontWeight: 700 }}>
              <RefreshCw size={18} className="animate-spin inline mr-2" /> 🧪 Testing safely in sandbox (Applying proposed change, checking health checks, testing error rate & response time)...
            </div>
          ) : (
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(0, 230, 118, 0.3)', padding: '14px', borderRadius: '10px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#00f580', marginBottom: '6px' }}>
                🟢 Sandbox verification passed ({scenario?.sandbox?.containerId || scenario?.sandboxResult?.containerId || 'sbx-pay-9921'})
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                {scenario?.sandbox?.resultMessage || scenario?.sandboxResult?.loadTestResult || '5,000 synthetic load test requests executed in sandbox. Error rate dropped 98.4% → 0.0%.'}
              </p>
            </div>
          )}

          {/* 7. SHOULD THE HUMAN APPROVE IT? Human Approval Required Gate */}
          {isPendingApproval && (
            <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1.5px solid rgba(0, 242, 254, 0.4)', padding: '16px', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#00f2fe', marginBottom: '4px' }}>
                👤 Human Approval Required
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#e0e6ed', marginBottom: '14px' }}>
                "Resilify has tested the proposed fix safely. Your approval is required before execution."
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn-secondary-dark" onClick={onRejectFix}>
                  <XCircle size={16} color="#ff3377" /> [ Reject Fix ]
                </button>
                <button className="btn-primary-neon" style={{ background: 'linear-gradient(135deg, #00e676 0%, #00f2fe 100%)' }} onClick={onApproveFix}>
                  <CheckCircle2 size={16} /> [ Approve Fix ]
                </button>
              </div>
            </div>
          )}

          {/* 8. DID THE FIX ACTUALLY WORK? Execution & Recovery State */}
          {isExecutingFix && (
            <div style={{ background: 'rgba(0, 242, 254, 0.1)', padding: '14px', borderRadius: '10px', color: '#00f2fe', fontWeight: 700 }}>
              <RefreshCw size={18} className="animate-spin inline mr-2" /> 🔄 Remediation in progress... Restoring service health...
            </div>
          )}

          {isResolved && (
            <div style={{ background: 'rgba(0, 230, 118, 0.15)', border: '1px solid rgba(0, 230, 118, 0.4)', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#00f580', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle2 size={22} /> 🟢 Incident Resolved — Service Recovered
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '0.82rem' }}>
                <div>Error Rate: <strong style={{ color: '#ff3377' }}>{initialMetrics.errorRate}</strong> → <strong style={{ color: '#00f580' }}>{recoveredMetrics.errorRate}</strong></div>
                <div>Response Time: <strong style={{ color: '#ff3377' }}>{initialMetrics.responseTime}</strong> → <strong style={{ color: '#00f580' }}>{recoveredMetrics.responseTime}</strong></div>
                <div>Health: <strong style={{ color: '#ff3377' }}>{initialMetrics.serviceHealth}</strong> → <strong style={{ color: '#00f580' }}>{recoveredMetrics.serviceHealth}</strong></div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Bottom Step Progress Tracker Timeline */}
      <StepProgressTracker currentStep={currentStep} />

    </div>
  );
}
