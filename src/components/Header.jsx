import React from 'react';
import { RefreshCw, BarChart2, Layers, Play } from 'lucide-react';

export default function Header({
  scenarios,
  activeScenario,
  onSelectScenario,
  onOpenBenchmark,
  onReset
}) {
  return (
    <header className="resilify-card" style={{ padding: '16px 24px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Scenario Selector Label & Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge-pill badge-blue" style={{ fontSize: '0.7rem' }}>
              SIMULATED INCIDENT ENVIRONMENT
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              Scenario:
            </span>
          </div>

          <select
            value={activeScenario.id}
            onChange={(e) => onSelectScenario(scenarios.find(s => s.id === e.target.value))}
            style={{
              background: '#f8fafc',
              color: 'var(--text-dark)',
              border: '1.5px solid #cbd5e1',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '0.875rem',
              fontWeight: 700,
              outline: 'none',
              cursor: 'pointer',
              minWidth: '240px'
            }}
          >
            {scenarios.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.severity})
              </option>
            ))}
          </select>
        </div>

        {/* Demo Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-resilify-primary" onClick={() => onSelectScenario(activeScenario)}>
            <Play size={15} /> Load Incident
          </button>

          <button className="btn-secondary-light" onClick={onOpenBenchmark}>
            <BarChart2 size={16} color="#2563eb" /> Benchmark Matrix
          </button>

          <button className="btn-secondary-light" onClick={onReset} title="Reset Demo Flow">
            <RefreshCw size={14} /> Reset Demo
          </button>
        </div>

      </div>
    </header>
  );
}
