import React from 'react';
import { Sparkles, CheckCircle2, RefreshCw, AlertCircle, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';

export default function AiInvestigationCard({
  incident,
  incidentState,
  onRunProbe
}) {
  const isTriggered = incidentState === 'TRIGGERED';
  const isProbing = incidentState === 'PROBING';
  const isProbed = incidentState === 'PROBED' || incidentState === 'TESTING_SANDBOX' || incidentState === 'PENDING_APPROVAL' || incidentState === 'EXECUTING_FIX' || incidentState === 'RESOLVED';

  const currentConfidence = isTriggered ? incident.initialConfidence : incident.probedConfidence;

  return (
    <div className="resilify-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid #dbeafe', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
      
      <div>
        {/* Header with AI Mascot Graphic */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="#2563eb" /> AI Investigation {isProbing ? 'in Progress' : (isProbed ? 'Complete' : '')}
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Autonomous telemetry & dependency analysis
            </p>
          </div>

          {/* Friendly AI Mascot Graphic Badge */}
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 6px 16px rgba(59, 130, 246, 0.3)',
            fontSize: '1.4rem'
          }} title="Resilify AI Assistant">
            🤖
          </div>
        </div>

        {/* Step-by-step Investigation Progress Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>Reading application logs...</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>Analyzing service traces...</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>Checking recent deployments...</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span style={{ color: 'var(--text-dark)', fontWeight: 600 }}>Investigating database connections...</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
            {isProbed ? (
              <CheckCircle2 size={18} color="#10b981" />
            ) : (
              <RefreshCw size={18} color={isProbing ? '#f59e0b' : '#3b82f6'} className={isProbing ? 'animate-spin' : ''} />
            )}
            <span style={{ color: isProbing ? '#b45309' : 'var(--text-dark)', fontWeight: isProbing ? 700 : 600 }}>
              {isProbing ? 'Running diagnostic probe...' : (isProbed ? 'Diagnostic probe completed' : 'Diagnostic probe required')}
            </span>
          </div>

        </div>

        {/* Confidence Progress Bar */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Investigation Confidence</span>
            <span style={{ color: isTriggered ? '#d97706' : '#10b981' }}>
              {isTriggered ? `${incident.initialConfidence}%` : `${incident.probedConfidence}%`}
            </span>
          </div>

          <div style={{ height: '10px', background: '#e2e8f0', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${currentConfidence}%`,
              background: isTriggered 
                ? 'linear-gradient(90deg, #f59e0b 0%, #3b82f6 100%)' 
                : 'linear-gradient(90deg, #3b82f6 0%, #10b981 100%)',
              transition: 'width 0.8s ease-in-out',
              borderRadius: '5px'
            }} />
          </div>
        </div>

        {/* Why Does AI Need More Evidence? Callout Box */}
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          padding: '12px 14px',
          borderRadius: '12px',
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-start'
        }}>
          <Lightbulb size={20} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e40af', marginBottom: '2px' }}>
              Why does the AI need more evidence?
            </div>
            <p style={{ fontSize: '0.75rem', color: '#1e3a8a', lineHeight: '1.4' }}>
              {isTriggered ? incident.calloutReason : incident.probedCalloutReason}
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Investigate Further Action Button */}
      {isTriggered && (
        <button
          className="btn-resilify"
          onClick={onRunProbe}
          style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '12px', fontSize: '0.9rem' }}
        >
          <Sparkles size={18} /> 🔎 Investigate Further
        </button>
      )}

      {isProbing && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          background: '#fffbe6',
          border: '1px solid #fef3c7',
          color: '#b45309',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px'
        }}>
          <RefreshCw size={18} className="animate-spin" /> Collecting additional evidence...
        </div>
      )}

      {isProbed && (
        <div style={{
          marginTop: '16px',
          padding: '10px 14px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          color: '#059669',
          borderRadius: '12px',
          fontSize: '0.82rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span>✓ Evidence Collected</span>
          <span style={{ fontSize: '0.75rem' }}>Confidence: 62% → <strong>94%</strong></span>
        </div>
      )}

    </div>
  );
}
