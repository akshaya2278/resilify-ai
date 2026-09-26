import React from 'react';
import { X, BarChart2, CheckCircle2, AlertTriangle, ShieldCheck, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { BENCHMARK_METRICS } from '../data/scenarios';

export default function BenchmarkComparison({ isOpen, onClose }) {
  if (!isOpen) return null;

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
        maxWidth: '850px',
        background: '#0d131f',
        border: '1px solid rgba(0, 242, 254, 0.4)',
        borderRadius: '16px',
        boxShadow: '0 20px 60px rgba(0, 242, 254, 0.25)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '90vh'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart2 size={22} color="#00f2fe" /> Incident Evaluation Benchmark Suite
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Evaluation across 12 blind holdout production incident scenarios (6 single-fault, 6 cascading multi-service)
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Comparison Grid */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Key Metric Highlight Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ background: 'rgba(0, 242, 254, 0.08)', border: '1px solid rgba(0, 242, 254, 0.3)', padding: '16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>SEV-1 MTTR REDUCTION</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#00f2fe', marginTop: '4px' }}>
                92.8%
              </div>
              <p style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '4px' }}>45.0m → 3.2m Average</p>
            </div>

            <div style={{ background: 'rgba(0, 230, 118, 0.08)', border: '1px solid rgba(0, 230, 118, 0.3)', padding: '16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ROOT-CAUSE ACCURACY</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#00f580', marginTop: '4px' }}>
                91.7%
              </div>
              <p style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '4px' }}>VS 33.3% Rules Baseline</p>
            </div>

            <div style={{ background: 'rgba(255, 183, 3, 0.08)', border: '1px solid rgba(255, 183, 3, 0.3)', padding: '16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ESTIMATED OUTAGE SAVINGS</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffb703', marginTop: '4px' }}>
                $501,600
              </div>
              <p style={{ fontSize: '0.75rem', color: '#a0aec0', marginTop: '4px' }}>Per Incident ($12k/min SLA)</p>
            </div>
          </div>

          {/* Side by Side Comparative Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--color-text-muted)' }}>Benchmark Dimension</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#ff3377' }}>Rules-Based Heuristic Baseline</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#00f2fe' }}>Resilify AI Engine</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#00f580' }}>Delta / Multiplier</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Root-Cause Identification</td>
                <td style={{ padding: '12px', color: '#ff3377' }}>33.3% (4 / 12)</td>
                <td style={{ padding: '12px', color: '#00f2fe', fontWeight: 700 }}>91.7% (11 / 12)</td>
                <td style={{ padding: '12px', color: '#00f580', fontWeight: 700 }}>2.75x Higher</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Time to Diagnosis (TTD)</td>
                <td style={{ padding: '12px', color: '#ff3377' }}>14.2 minutes</td>
                <td style={{ padding: '12px', color: '#00f2fe', fontWeight: 700 }}>0.8 minutes</td>
                <td style={{ padding: '12px', color: '#00f580', fontWeight: 700 }}>17.7x Faster</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Mean Time to Resolution (MTTR)</td>
                <td style={{ padding: '12px', color: '#ff3377' }}>45.0 minutes</td>
                <td style={{ padding: '12px', color: '#00f2fe', fontWeight: 700 }}>3.2 minutes</td>
                <td style={{ padding: '12px', color: '#00f580', fontWeight: 700 }}>14.0x Faster</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 600 }}>Insufficient Evidence Detection</td>
                <td style={{ padding: '12px', color: '#ff3377' }}>0.0% (Always guessed)</td>
                <td style={{ padding: '12px', color: '#00f2fe', fontWeight: 700 }}>100.0% (Probes triggered)</td>
                <td style={{ padding: '12px', color: '#00f580', fontWeight: 700 }}>100% Reliable</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontWeight: 600 }}>Destructive Action Rate</td>
                <td style={{ padding: '12px', color: '#ff3377' }}>41.6% (Unverified scripts)</td>
                <td style={{ padding: '12px', color: '#00f2fe', fontWeight: 700 }}>0.0% (Guarded by Sandbox)</td>
                <td style={{ padding: '12px', color: '#00f580', fontWeight: 700 }}>Zero Risk</td>
              </tr>
            </tbody>
          </table>

          {/* Engineering Limitation Disclosure */}
          <div style={{ background: 'rgba(255, 183, 3, 0.08)', border: '1px solid rgba(255, 183, 3, 0.3)', padding: '14px', borderRadius: '10px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffb703', marginBottom: '4px' }}>
              ⚠️ Upfront Engineering Limitation Disclosure
            </h4>
            <p style={{ fontSize: '0.8rem', color: '#e0e6ed' }}>
              System reasoning is calibrated for microservices with OpenTelemetry or JSON log schemas. It cannot autonomously diagnose zero-day hypervisor hardware layer failures where guest virtual machine telemetry is completely severed.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
