import React from 'react';
import TechnicalDeepDive from './TechnicalDeepDive';
import { Cpu } from 'lucide-react';

export default function TechnicalDetailsPage({ incident, incidentState, logs, selectedNode, onSelectNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="resilify-card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', color: '#fff', border: 'none' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Cpu size={24} color="#818cf8" /> Deep Technical Details & Architecture Inspection
        </h2>
        <p style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '4px' }}>
          Dedicated technical page for Microsoft engineers to inspect raw KQL queries, Semantic Kernel multi-agent orchestration, AST command validation, and holdout scenario benchmarks.
        </p>
      </div>

      {/* Deep Technical Tabbed Viewer */}
      <TechnicalDeepDive
        scenario={incident}
        incidentState={incidentState}
        logs={logs}
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
      />

    </div>
  );
}
