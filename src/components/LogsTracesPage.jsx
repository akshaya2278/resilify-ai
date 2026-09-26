import React, { useState } from 'react';
import { ClipboardList, Search, Filter } from 'lucide-react';

export default function LogsTracesPage({ incident }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const logsList = incident?.logs || incident?.liveLogs || [];

  const filteredLogs = logsList.filter(log => {
    const messageText = log?.message || log?.text || '';
    const matchesSearch = messageText.toLowerCase().includes(searchTerm.toLowerCase());
    const logSeverity = log?.type || log?.agent || 'INFO';
    const matchesSeverity = severityFilter === 'ALL' || logSeverity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="resilify-card" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', border: '1px solid #cbd5e1' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ClipboardList size={24} color="#2563eb" /> 📋 OpenTelemetry Logs & APM Trace Explorer
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Correlated OpenTelemetry logs, KQL database socket events, and HTTP response traces for <strong>{incident?.affectedService || 'Active Service'}</strong>.
        </p>
      </div>

      {/* Controls & Search Filter */}
      <div className="resilify-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search log messages, trace IDs, or error codes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 38px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={16} color="#64748b" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>Severity:</span>
            <select 
              value={severityFilter} 
              onChange={(e) => setSeverityFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                fontWeight: 600,
                outline: 'none',
                background: '#ffffff'
              }}
            >
              <option value="ALL">All Severities</option>
              <option value="ERROR">ERROR Only</option>
              <option value="WARN">WARN Only</option>
              <option value="INFO">INFO Only</option>
            </select>
          </div>

        </div>
      </div>

      {/* Log Feed Feed Cards */}
      <div className="resilify-card">
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px' }}>
          Live Telemetry Log Feed ({filteredLogs.length} entries)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, i) => {
              const severity = log?.type || 'INFO';
              return (
                <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{log.time || log.timestamp || '03:14:00Z'}</span>
                    <span className={`badge-pill ${severity === 'ERROR' ? 'badge-red' : (severity === 'WARN' ? 'badge-amber' : 'badge-blue')}`}>
                      {severity}
                    </span>
                    <span style={{ color: '#0f172a', fontWeight: 500 }}>{log.message || log.text}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Service: {incident?.affectedService}</span>
                </div>
              );
            })
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
              No logs matched your search filter.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
