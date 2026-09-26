import React from 'react';
import { Server, Database, Layers, Cpu, AlertTriangle, CheckCircle, Activity, Zap } from 'lucide-react';

export default function TopologyMap({ topology, affectedService, selectedNode, onSelectNode }) {
  const getNodeIcon = (type) => {
    switch (type) {
      case 'database':
        return <Database size={18} />;
      case 'cache':
        return <Zap size={18} />;
      case 'gateway':
        return <Layers size={18} />;
      default:
        return <Server size={18} />;
    }
  };

  const getNodeColor = (status) => {
    switch (status) {
      case 'critical':
        return { border: '#ff0055', bg: 'rgba(255, 0, 85, 0.2)', text: '#ff3377', glow: '0 0 25px rgba(255, 0, 85, 0.6)' };
      case 'degraded':
        return { border: '#ffb703', bg: 'rgba(255, 183, 3, 0.2)', text: '#ffc83b', glow: '0 0 15px rgba(255, 183, 3, 0.4)' };
      default:
        return { border: '#00e676', bg: 'rgba(0, 230, 118, 0.15)', text: '#00f580', glow: '0 0 12px rgba(0, 230, 118, 0.25)' };
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#00f2fe" /> Topological Service Dependency Map
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          Trace Context Correlation: Active
        </span>
      </div>

      {/* Dependency Map Canvas */}
      <div style={{
        flex: 1,
        minHeight: '340px',
        background: 'rgba(5, 8, 15, 0.8)',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '20px',
        padding: '24px',
        alignItems: 'center'
      }}>

        {topology.nodes.map((node) => {
          const style = getNodeColor(node.status);
          const isSelected = selectedNode?.id === node.id;
          const isGroundZero = node.name === affectedService;

          return (
            <div
              key={node.id}
              onClick={() => onSelectNode(node)}
              style={{
                background: style.bg,
                border: `2px solid ${style.border}`,
                boxShadow: isSelected ? '0 0 30px rgba(0, 242, 254, 0.8)' : style.glow,
                borderRadius: '12px',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
              className={node.status === 'critical' ? 'pulse-danger' : ''}
            >
              {/* Ground Zero Badge */}
              {isGroundZero && (
                <span className="badge badge-danger" style={{ position: 'absolute', top: '-10px', right: '10px', fontSize: '0.6rem' }}>
                  GROUND ZERO FAULT
                </span>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: style.text }}>
                  {getNodeIcon(node.type)}
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{node.name}</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: style.text, fontWeight: 700, textTransform: 'uppercase' }}>
                  {node.status}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>P99 Latency:</span>
                <span style={{ fontWeight: 600, color: node.lat > 500 ? '#ff0055' : '#00e676' }}>{node.lat}ms</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>HTTP Error Rate:</span>
                <span style={{ fontWeight: 700, color: parseFloat(node.errorRate) > 5 ? '#ff0055' : '#00e676' }}>
                  {node.errorRate}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Legend / Quick Detail */}
      {selectedNode && (
        <div style={{
          marginTop: '14px',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Selected Node Telemetry:</span>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#00f2fe' }}>
              {selectedNode.name} ({selectedNode.type.toUpperCase()})
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Error: </span>
              <strong style={{ color: '#ff0055' }}>{selectedNode.errorRate}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--color-text-muted)' }}>Latency: </span>
              <strong>{selectedNode.lat}ms</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
