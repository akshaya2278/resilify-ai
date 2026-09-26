import React from 'react';
import { Shield, CheckCircle2, User, Cpu, Lock } from 'lucide-react';

export default function AuditTrailPage({ auditTrail = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="resilify-card" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '1px solid #bbf7d0' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#166534', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield size={24} color="#15803d" /> 🛡️ Immutable SOC2 Audit Trail
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#14532d', marginTop: '4px' }}>
          Cryptographically signed, append-only timeline recording all autonomous investigations, active probes, sandbox executions, and human SRE approvals.
        </p>
      </div>

      {/* Audit Timeline List */}
      <div className="resilify-card">
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px' }}>
          Audit Event History ({auditTrail.length} Recorded Events)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
          
          {/* Vertical Connecting Line */}
          <div style={{ position: 'absolute', top: '20px', bottom: '20px', left: '20px', width: '2px', background: '#e2e8f0', zIndex: 0 }} />

          {auditTrail.map((item, idx) => {
            const actor = item?.actor || 'AI System';
            const isHuman = actor.includes('Human') || actor.includes('Elena');

            return (
              <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', zIndex: 1 }}>
                
                {/* Node Icon Circle */}
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: isHuman ? '#ecfdf5' : '#eff6ff',
                  border: `2px solid ${isHuman ? '#10b981' : '#2563eb'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isHuman ? '#10b981' : '#2563eb',
                  flexShrink: 0
                }}>
                  {isHuman ? <User size={18} /> : <Cpu size={18} />}
                </div>

                {/* Event Details Card */}
                <div style={{ flex: 1, background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 18px', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-dark)' }}>
                      {item.action || item.event}
                    </span>
                    <span className={`badge-pill ${isHuman ? 'badge-green' : 'badge-blue'}`}>
                      {item.result || 'Complete'}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '4px' }}>
                    {item.result}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '6px' }}>
                    <span>Actor: <strong>{actor}</strong></span>
                    <span style={{ fontFamily: 'var(--font-mono)' }}>Timestamp: {item.timestamp || '03:14:22Z'}</span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}
