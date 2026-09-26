import React from 'react';
import { Settings, Shield, Sliders, Bell, Cpu, Key } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="resilify-card">
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Settings size={24} color="#2563eb" /> System & Azure Configuration
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Configure enterprise threshold parameters, Azure OpenAI models, and Teams Adaptive Card webhooks.
        </p>
      </div>

      {/* Settings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Card 1: AI Confidence Thresholds */}
        <div className="resilify-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={18} color="#2563eb" /> Autonomous Probe Thresholds
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                Active Diagnostic Probe Trigger Threshold
              </label>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Automatically run active probes when initial hypothesis confidence falls below this value.
              </div>
              <input type="text" value="70% Confidence" readOnly style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700 }} />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                Human Approval Gate Mandatory Risk Level
              </label>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Always require SRE human approval for remediations with risk score at or above:
              </div>
              <input type="text" value="Medium Risk (Default for production releases)" readOnly style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 700 }} />
            </div>
          </div>
        </div>

        {/* Card 2: Azure Integration */}
        <div className="resilify-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} color="#2563eb" /> Azure OpenAI & Telemetry Stack
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.85rem' }}>
            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: 'var(--text-muted)' }}>Azure OpenAI Model Deployment:</span>
              <div style={{ fontWeight: 800, color: '#1e40af' }}>GPT-4o (2026-05-01-preview)</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: 'var(--text-muted)' }}>Telemetry Provider:</span>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>Azure Monitor & Kusto (KQL Log Analytics)</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: 'var(--text-muted)' }}>Human Approval Integration:</span>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>Microsoft Teams Adaptive Cards (Bot Framework)</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
