import React, { useEffect, useRef } from 'react';
import { Terminal, Search, Cpu, CheckCircle2, AlertTriangle, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function AgentSwarmTerminal({ scenario, incidentState, logs }) {
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, incidentState]);

  return (
    <div className="glass-panel" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={18} color="#00f2fe" /> Multi-Agent Swarm Reasoning Stream
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
            Azure OpenAI GPT-4o
          </span>
          <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
            Semantic Kernel SDK
          </span>
        </div>
      </div>

      {/* Terminal Viewport */}
      <div style={{
        flex: 1,
        minHeight: '360px',
        maxHeight: '480px',
        background: 'var(--bg-terminal)',
        borderRadius: '10px',
        border: '1px solid rgba(0, 242, 254, 0.2)',
        padding: '16px',
        overflowY: 'auto',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        lineHeight: '1.5',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>

        {/* Initial Incident Alert Log */}
        <div style={{ color: '#ff3377', background: 'rgba(255,0,85,0.08)', padding: '8px 12px', borderRadius: '6px', borderLeft: '3px solid #ff0055' }}>
          <strong>[AZURE MONITOR ALERT]</strong> Sev-1 Triggered on {scenario.affectedService} — {scenario.impact}
        </div>

        {/* Dynamic Log Entries */}
        {logs.map((log, index) => (
          <div key={index} style={{
            background: log.agent === 'PROBER' ? 'rgba(255, 183, 3, 0.08)' : log.agent === 'SANDBOX' ? 'rgba(0, 230, 118, 0.08)' : 'rgba(255, 255, 255, 0.03)',
            padding: '8px 12px',
            borderRadius: '6px',
            borderLeft: `3px solid ${
              log.agent === 'INVESTIGATOR' ? '#00f2fe' : 
              log.agent === 'PROBER' ? '#ffb703' : 
              log.agent === 'PLANNER' ? '#7f00ff' : '#00e676'
            }`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.7rem', marginBottom: '4px' }}>
              <span style={{ fontWeight: 700, color: '#fff' }}>[{log.timestamp}] AGENT: {log.agent}</span>
              <span style={{ color: log.confidence >= 80 ? '#00e676' : '#ffb703' }}>Confidence: {log.confidence}%</span>
            </div>
            <div style={{ color: '#e0e6ed', whiteSpace: 'pre-wrap' }}>
              {log.text}
            </div>
            {log.evidence && (
              <div style={{ marginTop: '6px', padding: '6px 10px', background: 'rgba(0,0,0,0.4)', borderRadius: '4px', fontSize: '0.75rem', color: '#00f2fe' }}>
                🔍 <strong>Evidence Captured:</strong> {log.evidence}
              </div>
            )}
          </div>
        ))}

        <div ref={terminalEndRef} />
      </div>

      {/* Confidence Calibration Bar */}
      <div style={{ marginTop: '14px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>Calibrated Hypothesis Confidence Score:</span>
          <span style={{ fontWeight: 700, color: incidentState === 'TRIGGERED' ? '#ffb703' : '#00e676' }}>
            {incidentState === 'TRIGGERED' ? `${scenario.initialConfidence}% (Low - Active Probe Required)` : `${scenario.probedConfidence}% (High - Verifiable)`}
          </span>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: incidentState === 'TRIGGERED' ? `${scenario.initialConfidence}%` : `${scenario.probedConfidence}%`,
            background: incidentState === 'TRIGGERED' 
              ? 'linear-gradient(90deg, #ff0055 0%, #ffb703 100%)' 
              : 'linear-gradient(90deg, #00f2fe 0%, #00e676 100%)',
            transition: 'width 0.8s ease-in-out'
          }} />
        </div>
      </div>
    </div>
  );
}
