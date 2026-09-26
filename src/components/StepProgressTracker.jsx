import React from 'react';
import { Check } from 'lucide-react';

export default function StepProgressTracker({ currentStep, onStepClick }) {
  const steps = [
    { num: 1, label: 'Detect Incident', tab: 'overview' },
    { num: 2, label: 'Investigate', tab: 'investigation' },
    { num: 3, label: 'Find Root Cause', tab: 'investigation' },
    { num: 4, label: 'Test in Sandbox', tab: 'remediation' },
    { num: 5, label: 'Get Approval', tab: 'remediation' },
    { num: 6, label: 'Execute Fix', tab: 'remediation' },
    { num: 7, label: 'Verify Recovery', tab: 'remediation' },
  ];

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '20px',
      border: '1px solid var(--border-light)',
      padding: '16px 24px',
      marginTop: '20px',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        
        {/* Background Connecting Line */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '40px',
          right: '40px',
          height: '3px',
          background: '#e2e8f0',
          zIndex: 0
        }} />

        {/* Active Filled Connecting Line */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '40px',
          width: `${((currentStep - 1) / 6) * 100}%`,
          height: '3px',
          background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
          zIndex: 0,
          transition: 'width 0.5s ease'
        }} />

        {steps.map((step) => {
          const isDone = currentStep > step.num;
          const isCurrent = currentStep === step.num;

          return (
            <button
              key={step.num}
              onClick={() => onStepClick && onStepClick(step)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: 1,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px'
              }}
              title={`Click to navigate to ${step.label}`}
            >
              
              {/* Step Circle Badge */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: isDone 
                  ? '#10b981' 
                  : (isCurrent ? '#2563eb' : '#ffffff'),
                color: isDone || isCurrent ? '#ffffff' : '#64748b',
                border: isDone 
                  ? '2px solid #10b981' 
                  : (isCurrent ? '3px solid #bfdbfe' : '2px solid #cbd5e1'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem',
                boxShadow: isCurrent ? '0 0 12px rgba(37, 99, 235, 0.4)' : 'none',
                transition: 'all 0.3s ease'
              }}>
                {isDone ? <Check size={16} strokeWidth={3} /> : step.num}
              </div>

              {/* Step Label */}
              <span style={{
                marginTop: '8px',
                fontSize: '0.72rem',
                fontWeight: isCurrent || isDone ? 700 : 500,
                color: isCurrent ? '#1e40af' : (isDone ? '#059669' : '#64748b'),
                whiteSpace: 'nowrap'
              }}>
                {step.label}
              </span>

            </button>
          );
        })}

      </div>
    </div>
  );
}
