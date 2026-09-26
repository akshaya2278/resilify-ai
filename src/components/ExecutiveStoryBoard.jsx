import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, RefreshCw, Activity, ArrowRight, Zap, Play, ChevronDown, ChevronUp, Cpu, Server, FileText } from 'lucide-react';

export default function ExecutiveStoryBoard({
  scenario,
  incidentState,
  onSimulateProbe,
  onApprove,
  onReject,
  onToggleTechnical,
  showTechnical
}) {
  const isTriggered = incidentState === 'TRIGGERED';
  const isProbing = incidentState === 'PROBING';
  const isProbed = incidentState === 'PROBED' || incidentState === 'SANDBOX_VERIFIED';
  const isApproved = incidentState === 'APPROVED';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* 🚨 Card 1: Executive Incident Status & Metrics */}
      <div className="glass-panel" style={{ padding: '24px', borderLeft: isApproved ? '6px solid #00e676' : '6px solid #ff0055' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className={`badge ${isApproved ? 'badge-success pulse-success' : 'badge-danger pulse-danger'}`}>
                {isApproved ? 'REMEDIATED & VERIFIED' : `🚨 ${scenario.severity} INCIDENT ACTIVE`}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Started 12 minutes ago</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              {scenario.affectedService.toUpperCase()} SERVICE INCIDENT
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', marginTop: '4px' }}>
              {isApproved 
                ? '✅ Payment checkout pipeline fully restored. 0.0% error rate verified in production.' 
                : 'Customers are experiencing payment checkout failures across web & mobile apps.'}
            </p>
          </div>

          {/* Quick Real-Time Metrics */}
          <div style={{ display: 'flex', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '12px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Error Rate</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isApproved ? '#00e676' : '#ff0055' }}>
                {isApproved ? '0.0%' : '🔴 98.4%'}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Response Time</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isApproved ? '#00e676' : '#ff0055' }}>
                {isApproved ? '18 ms' : '🔴 850 ms'}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Service Health</span>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isApproved ? '#00e676' : '#ff0055' }}>
                {isApproved ? '🟢 Restored' : '🔴 Critical'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: What Is Happening + Active Investigation */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* 🔍 Card 2: What Is Happening? (Diagnosis & Confidence) */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#00f2fe', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔍 WHAT IS HAPPENING?
            </h3>
            
            <p style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '14px' }}>
              Payment Gateway API requests are timing out due to <strong>database connection pool saturation</strong>.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Most Likely Root Cause
              </span>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffb703', marginTop: '4px' }}>
                🟠 Recent Payment Gateway deployment (v2.4.1 release f9a2b8e)
              </div>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
                Contains an unindexed SQL query on <code>transactions</code> table causing connection pool lock.
              </p>
            </div>
          </div>

          {/* Calibrated Confidence & Probe Button */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>AI Diagnosis Confidence Score:</span>
              <span style={{ fontWeight: 800, color: isTriggered ? '#ffb703' : '#00e676', fontSize: '0.95rem' }}>
                {isTriggered ? '62% (⚠️ Evidence Needed)' : '94% (Verified)'}
              </span>
            </div>
            
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{
                height: '100%',
                width: isTriggered ? '62%' : '94%',
                background: isTriggered ? 'linear-gradient(90deg, #ff0055 0%, #ffb703 100%)' : 'linear-gradient(90deg, #00f2fe 0%, #00e676 100%)',
                transition: 'width 0.8s ease'
              }} />
            </div>

            {isTriggered && (
              <button 
                className="btn-primary" 
                onClick={onSimulateProbe}
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}
              >
                <RefreshCw size={18} /> 🔎 Investigate Further (Run Active Diagnostic Probe)
              </button>
            )}

            {isProbing && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px', background: 'rgba(255, 183, 3, 0.1)', color: '#ffb703', borderRadius: '8px', fontWeight: 600 }}>
                <RefreshCw size={18} className="animate-spin" /> Querying KQL Database Sockets & Traces...
              </div>
            )}
          </div>
        </div>

        {/* 🧠 Card 3: Autonomous Investigation Progress */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#7f00ff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🧠 AUTONOMOUS INVESTIGATION
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00e676' }}>
                <CheckCircle2 size={18} />
                <span>Checked application logs & error rate spikes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00e676' }}>
                <CheckCircle2 size={18} />
                <span>Checked microservice health & dependency graph</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00e676' }}>
                <CheckCircle2 size={18} />
                <span>Checked recent release commit <code>f9a2b8e</code> (12m ago)</span>
              </div>
              
              {isTriggered && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffb703' }}>
                  <Activity size={18} className="animate-spin" />
                  <span>⏳ Waiting for database socket connection probe...</span>
                </div>
              )}

              {isProbed && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00e676' }}>
                    <CheckCircle2 size={18} />
                    <span>Ran targeted KQL probe: Database pool saturated at 100/100</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00e676' }}>
                    <CheckCircle2 size={18} />
                    <span>Tested remediation in isolated Docker sandbox (Errors dropped 98.4% → 0.0%)</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            💡 <strong>Autonomous Capability:</strong> Detected missing telemetry depth, autonomously queried socket states, and validated solution in sandbox.
          </div>
        </div>

      </div>

      {/* 💡 Card 4: Recommended Action & Human Approval Gate */}
      {(isProbed || isApproved) && (
        <div className="glass-panel" style={{ padding: '24px', background: isApproved ? 'rgba(0, 230, 118, 0.08)' : 'rgba(0, 242, 254, 0.06)', border: isApproved ? '1px solid rgba(0, 230, 118, 0.4)' : '1px solid rgba(0, 242, 254, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                💡 RECOMMENDED REMEDIATION PLAN
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                Scale DB Connection Pool to 250 + Hot-Patch SQL Index (or Rollback v2.4.1 → v2.4.0)
              </h3>
            </div>

            <div style={{ background: 'rgba(0,230,118,0.15)', border: '1px solid rgba(0,230,118,0.3)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#00f580' }}>
              🧪 Isolated Sandbox Test: PASSED (0.0% Error Rate Verified)
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '16px' }}>
            <strong style={{ color: '#00f2fe' }}>Why this action?</strong>
            <span style={{ color: '#cbd5e1', marginLeft: '8px' }}>
              Error rate spiked to 98.4% immediately following deployment <code>f9a2b8e</code>. Connection pool is 100% saturated. Sandbox dry-run confirmed scaling pool and indexing timestamp column eliminates queue delay.
            </span>
          </div>

          {!isApproved ? (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
              <button className="btn-secondary" onClick={onReject}>
                ❌ Reject / SRE Manual Takeover
              </button>
              <button 
                className="btn-primary" 
                onClick={onApprove}
                style={{ background: 'linear-gradient(135deg, #00e676 0%, #00f2fe 100%)', padding: '12px 24px', fontSize: '0.95rem' }}
              >
                <CheckCircle2 size={18} /> Approve Fix (Execute in Production)
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', background: 'rgba(0, 230, 118, 0.15)', padding: '12px 16px', borderRadius: '8px', color: '#00f580', fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} /> Production Remediation Approved & Executed by Elena Vance
              </span>
              <span style={{ fontSize: '0.75rem', opacity: 0.85, fontFamily: 'var(--font-mono)' }}>SOC2 Audit ID: SHA256-a8f9c991e</span>
            </div>
          )}
        </div>
      )}

      {/* 🔬 Toggle Button for Deep Technical Evidence */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button 
          onClick={onToggleTechnical}
          className="btn-secondary"
          style={{ padding: '12px 24px', fontSize: '0.9rem', borderColor: 'rgba(0, 242, 254, 0.4)', color: '#00f2fe' }}
        >
          {showTechnical ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          {showTechnical ? 'Hide Technical Architecture & Evidence' : '🔬 Inspect Technical Evidence, KQL Traces & Agent Swarm'}
        </button>
      </div>

    </div>
  );
}
