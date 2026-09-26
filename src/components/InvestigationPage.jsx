import React from 'react';
import StepProgressTracker from './StepProgressTracker';
import { Search, Sparkles, CheckCircle2, RefreshCw, AlertCircle, FileText, Database, GitCommit, ShieldCheck } from 'lucide-react';

export default function InvestigationPage({
  incident,
  incidentState,
  currentStep,
  onRunProbe,
  onRunSandboxTest,
  onStepClick
}) {
  const isTriggered = incidentState === 'TRIGGERED';
  const isProbing = incidentState === 'PROBING';
  const isProbed = incidentState === 'PROBED' || incidentState === 'TESTING_SANDBOX' || incidentState === 'PENDING_APPROVAL' || incidentState === 'EXECUTING_FIX' || incidentState === 'RESOLVED';
  const currentConfidence = isTriggered ? incident.initialConfidence : incident.probedConfidence;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="resilify-card" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '1px solid #bfdbfe' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={24} color="#2563eb" /> 🔍 AI Investigation & Evidence Explorer
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#1e3a8a', marginTop: '4px' }}>
          Autonomous multi-modal telemetry investigation correlating OpenTelemetry traces, KQL logs, and deployment history.
        </p>
      </div>

      {/* Main Investigation Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Card 1: Investigation Checklist & Diagnostic Probe Control */}
        <div className="resilify-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#2563eb" /> Diagnostic Telemetry Checklist
            </h3>
            <span style={{ fontSize: '1.2rem' }}>🤖</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {incident.investigationProgress.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>{step.text}</span>
              </div>
            ))}
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
              <span>Investigation Confidence Gauge</span>
              <span style={{ color: isTriggered ? '#d97706' : '#10b981' }}>
                {currentConfidence}%
              </span>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${currentConfidence}%`,
                background: isTriggered ? 'linear-gradient(90deg, #f59e0b 0%, #3b82f6 100%)' : 'linear-gradient(90deg, #3b82f6 0%, #10b981 100%)',
                transition: 'width 0.8s ease'
              }} />
            </div>
          </div>

          {/* Diagnostic Evidence Callout Box */}
          <div style={{ background: isTriggered ? '#fffbe6' : '#ecfdf5', border: `1px solid ${isTriggered ? '#fef3c7' : '#a7f3d0'}`, padding: '12px', borderRadius: '10px', fontSize: '0.82rem', color: isTriggered ? '#b45309' : '#059669', marginBottom: '16px' }}>
            {isTriggered ? `⚠️ More evidence needed. ${incident.evidenceNeededMessage}` : `✓ ${incident.probedEvidenceMessage}`}
          </div>

          {/* Action Trigger */}
          {isTriggered && (
            <button className="btn-resilify-primary" onClick={onRunProbe} style={{ width: '100%', justifyContent: 'center' }}>
              <Sparkles size={18} /> [ Investigate Further ]
            </button>
          )}

          {isProbing && (
            <div style={{ padding: '12px', background: '#fffbe6', border: '1px solid #fef3c7', color: '#b45309', borderRadius: '12px', textAlign: 'center', fontWeight: 700, fontSize: '0.88rem' }}>
              <RefreshCw size={18} className="animate-spin inline mr-2" /> 🔎 Collecting additional evidence...
            </div>
          )}

          {isProbed && !isTriggered && !isProbing && (
            <div style={{ padding: '12px', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#059669', borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>✓ Additional Diagnostic Evidence Captured</span>
              <span className="badge-pill badge-green">94% Confidence</span>
            </div>
          )}
        </div>

        {/* Card 2: Ranked Hypotheses & Evidence */}
        <div className="resilify-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
            🎯 Root Cause Hypotheses Ranking
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            {incident.hypotheses.map((hyp, i) => {
              const conf = isTriggered ? (hyp.isTop ? incident.initialConfidence : hyp.confidence) : (hyp.isTop ? incident.probedConfidence : hyp.confidence);
              return (
                <div key={i} style={{ background: '#f8fafc', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.88rem', marginBottom: '4px' }}>
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

          {/* Evidence List */}
          {isProbed && (
            <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '14px', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>
                Supporting Evidence & Observations:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem' }}>
                {(incident?.rootCauseEvidence || incident?.evidenceList || []).map((ev, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669' }}>
                    <CheckCircle2 size={16} />
                    <span>{ev}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn-resilify-primary" onClick={onRunSandboxTest}>
                  <ShieldCheck size={16} /> Proceed to Sandbox Test →
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Progress Timeline */}
      <StepProgressTracker currentStep={currentStep} onStepClick={onStepClick} />

    </div>
  );
}
