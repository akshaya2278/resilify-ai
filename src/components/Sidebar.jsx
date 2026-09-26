import React from 'react';
import { Home, Search, Wrench, Share2, ClipboardList, Shield, Cpu, Settings, Sparkles } from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'investigation', label: 'Investigation', icon: Search },
    { id: 'remediation', label: 'Remediation', icon: Wrench },
    { id: 'servicemap', label: 'Service Map', icon: Share2 },
    { id: 'logs', label: 'Logs & Traces', icon: ClipboardList },
    { id: 'audittrail', label: 'Audit Trail', icon: Shield },
    { id: 'technical', label: 'Technical Details', icon: Cpu },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-sidebar)',
      borderRight: '1px solid var(--border-light)',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      padding: '24px 16px',
      height: '100vh',
      position: 'sticky',
      top: 0
    }}>
      
      {/* Brand Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px 24px 8px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.5px' }}>
              Resilify<span style={{ color: '#2563eb' }}>.AI</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              AI Incident Response
            </p>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '20px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 600,
                  cursor: 'pointer',
                  background: isActive ? 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' : 'transparent',
                  color: isActive ? '#1e40af' : '#475569',
                  transition: 'all 0.2s ease',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} color={isActive ? '#2563eb' : '#64748b'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Elena Vance Profile Card */}
      <div style={{
        background: '#f8fafc',
        borderRadius: '16px',
        padding: '14px',
        border: '1px solid var(--border-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '1rem',
          flexShrink: 0
        }}>
          EV
        </div>
        
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--text-dark)', whiteSpace: 'nowrap' }}>
            Elena Vance
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Lead SRE
          </div>
          <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
            Financial Services
          </div>
        </div>
      </div>

    </aside>
  );
}
