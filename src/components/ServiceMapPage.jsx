import React, { useState } from 'react';
import ServiceFlow from './ServiceFlow';
import StepProgressTracker from './StepProgressTracker';
import { Share2, Server, Database, Layers, ShieldCheck, Zap, Bell, CreditCard, Activity } from 'lucide-react';

export default function ServiceMapPage({ incident, isResolved, currentStep, onStepClick }) {
  const [selectedService, setSelectedService] = useState(incident.dependencies[2] || incident.dependencies[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner */}
      <div className="resilify-card" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Share2 size={24} color="#0284c7" /> 🔗 Microservice Topology & Trace Context Map
        </h2>
        <p style={{ fontSize: '0.85rem', color: '#075985', marginTop: '4px' }}>
          Full interactive topological dependency graph with OpenTelemetry APM trace propagation and Ground-Zero fault isolation.
        </p>
      </div>

      {/* Main Dependency Graph */}
      <ServiceFlow dependencies={incident.dependencies} isResolved={isResolved} />

      {/* Microservice Inventory Grid */}
      <div className="resilify-card">
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#2563eb" /> Microservice Telemetry Inventory
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {incident.dependencies.map((svc) => (
            <div 
              key={svc.id}
              onClick={() => setSelectedService(svc)}
              style={{
                background: selectedService?.id === svc.id ? '#eff6ff' : '#ffffff',
                border: `2px solid ${selectedService?.id === svc.id ? '#2563eb' : '#e2e8f0'}`,
                padding: '14px',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedService?.id === svc.id ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{svc.name}</span>
                <span className={`badge-pill ${isResolved ? 'badge-green' : (svc.status === 'critical' ? 'badge-red' : (svc.status === 'degraded' ? 'badge-amber' : 'badge-green'))}`}>
                  {isResolved ? 'Healthy' : svc.status}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role: {svc.role}</div>
              <div style={{ fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                <span>Error Rate: <strong>{isResolved ? '0.0%' : svc.errorRate}</strong></span>
                <span>Latency: <strong>{isResolved ? '18ms' : svc.latency}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Progress Timeline */}
      <StepProgressTracker currentStep={currentStep} onStepClick={onStepClick} />

    </div>
  );
}
