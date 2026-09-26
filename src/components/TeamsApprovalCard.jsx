import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, AlertTriangle, Cpu, Activity, GitCommit, Database, Terminal, FileText } from 'lucide-react';

export default function TeamsApprovalCard({ scenario, isOpen, onClose, onApprove, onReject }) {
  if (!isOpen) return null;

  const sandbox = scenario.sandboxVerification;
  const commit = scenario.gitCommitDiff;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '720px',
        background: '#161b26',
        border: '1px solid rgba(0, 242, 254, 0.4)',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 242, 254, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh'
      }}>

        {/* Teams Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #464eb8 0%, #6264a7 100%)',
          padding: '16px 24px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          color: '#fff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#fff', padding: '6px', borderRadius: '8px' }}>
              <Cpu size={20} color="#464eb8" />
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Microsoft Teams — Resilify Bot Approval Gate</h3>
              <p style={{ fontSize: '0.75rem', opacity: 0.85 }}>Human-in-the-Loop Safeguard • Channel: #sre-incident-response</p>
            </div>
          </div>
          <span className="badge badge-warning" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}>
            ACTION REQUIRED
          </span>
        </div>

        {/* Adaptive Card Content */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Incident Alert Summary */}
          <div style={{ background: 'rgba(255,0,85,0.1)', border: '1px solid rgba(255,0,85,0.3)', padding: '14px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontWeight: 800, color: '#ff3377', fontSize: '0.9rem' }}>
                [{scenario.severity}] {scenario.title}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Target: {scenario.affectedService}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#e0e6ed' }}>{scenario.impact}</p>
          </div>

          {/* Root-Cause Hypothesis & Git Evidence */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00f2fe', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} /> Diagnostic Evidence & Causal Root Cause (94% Confidence)
            </h4>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem' }}>
              <p style={{ fontWeight: 600, color: '#fff', marginBottom: '6px' }}>
                1. {scenario.hypotheses[0].title}
              </p>
              <ul style={{ paddingLeft: '20px', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {scenario.hypotheses[0].evidence.map((ev, i) => (
                  <li key={i}>{ev}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Git Commit Snippet */}
          {commit && (
            <div style={{ background: '#0a0d16', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f2fe' }}>
                  <GitCommit size={14} /> Commit {commit.commitHash} by {commit.author}
                </span>
                <span>{commit.message}</span>
              </div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#ff3377', margin: 0, overflowX: 'auto' }}>
                {commit.diffSnippet}
              </pre>
            </div>
          )}

          {/* Container Sandbox Health Verification Card */}
          <div style={{ background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.3)', padding: '14px', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#00f580', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} /> Isolated Sandbox Container Verification ({sandbox.status})
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
              <div style={{ background: 'rgba(255,0,85,0.1)', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>BEFORE REMEDIATION</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ff3377' }}>
                  {sandbox.beforeHealth.errorRate}% Errors | {sandbox.beforeHealth.avgLatency}ms
                </div>
              </div>

              <div style={{ background: 'rgba(0,230,118,0.15)', padding: '10px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>AFTER SANDBOX FIX</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#00f580' }}>
                  {sandbox.afterHealth.errorRate}% Errors | {sandbox.afterHealth.avgLatency}ms
                </div>
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#a0aec0' }}>
              {sandbox.logSnippet}
            </p>
          </div>

          {/* Proposed Remediation Playbook */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              Proposed Production Remediation Steps:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {scenario.remediationPlan.map((step) => (
                <div key={step.step} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem' }}>
                  <strong>Step {step.step}: {step.action}</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                    {step.command}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Action Buttons & SOC2 Audit */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(10, 13, 22, 0.95)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
            Cryptographic SHA-256 Audit Digest: <code>a8f9c...991e</code>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary" onClick={onReject}>
              <XCircle size={16} color="#ff3377" /> Reject / SRE Takeover
            </button>
            <button className="btn-primary" style={{ background: 'linear-gradient(135deg, #00e676 0%, #00f2fe 100%)' }} onClick={onApprove}>
              <CheckCircle2 size={16} /> Approve Production Remediation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
