import React from 'react';
import { User, Layers, CreditCard, Database, ShieldCheck, Zap, Bell, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';

export default function ServiceFlow({ dependencies, isResolved }) {
  const getIcon = (type) => {
    switch (type) {
      case 'User': return <User size={22} />;
      case 'Gateway': return <Layers size={18} />;
      case 'Database': return <Database size={18} />;
      case 'Auth': return <ShieldCheck size={18} />;
      case 'Cache': return <Zap size={18} />;
      case 'Worker': return <Bell size={18} />;
      default: return <CreditCard size={18} />;
    }
  };

  const getStatusColor = (status, isFaultOrigin) => {
    if (isResolved) {
      return { bg: '#ecfdf5', border: '#a7f3d0', text: '#059669', badge: 'Healthy' };
    }
    switch (status) {
      case 'critical':
        return { bg: '#fff1f2', border: '#fecdd3', text: '#e11d48', badge: 'Critical' };
      case 'degraded':
        return { bg: '#fffbe6', border: '#fef3c7', text: '#d97706', badge: 'Degraded' };
      default:
        return { bg: '#ecfdf5', border: '#a7f3d0', text: '#059669', badge: 'Healthy' };
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #edf4ff 0%, #f6f9ff 100%)',
      borderRadius: '24px',
      border: '1px solid #dbeafe',
      padding: '24px',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)' }}>
          Live Service Flow
        </h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Scenario Dependency Topology
        </span>
      </div>

      {/* Dependency Flow Layout Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(dependencies.length, 4)}, 1fr)`,
        gap: '16px',
        alignItems: 'center'
      }}>
        {dependencies.map((node) => {
          const style = getStatusColor(node.status, node.isFaultOrigin);
          const isOrigin = node.isFaultOrigin && !isResolved;

          return (
            <div
              key={node.id}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: `2px solid ${style.border}`,
                boxShadow: isOrigin ? '0 6px 20px rgba(244, 63, 94, 0.25)' : '0 4px 12px rgba(0,0,0,0.03)',
                padding: '14px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
              className={isOrigin ? 'pulse-critical' : (isResolved ? 'pulse-healthy' : '')}
            >
              {isOrigin && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#f43f5e',
                  color: '#fff',
                  padding: '2px 10px',
                  borderRadius: '9999px',
                  fontSize: '0.65rem',
                  fontWeight: 800
                }}>
                  🚨 CRITICAL FAULT
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {getIcon(node.role)}
                  <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-dark)' }}>{node.name}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.72rem', color: style.text, fontWeight: 700, textTransform: 'uppercase' }}>
                {isResolved ? 'Healthy' : (node.status === 'critical' ? '🔴 Critical' : (node.status === 'degraded' ? '🟡 Degraded' : '🟢 Healthy'))}
              </div>

              {node.errorRate && (
                <div style={{ fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Error Rate:</span>
                  <strong style={{ color: isResolved ? '#059669' : style.text }}>{isResolved ? '0.0%' : node.errorRate}</strong>
                </div>
              )}

              {node.latency && (
                <div style={{ fontSize: '0.72rem', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Latency:</span>
                  <strong style={{ color: isResolved ? '#059669' : style.text }}>{isResolved ? '18ms' : node.latency}</strong>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
