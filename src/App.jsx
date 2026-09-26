import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewDashboard from './components/OverviewDashboard';
import InvestigationPage from './components/InvestigationPage';
import RemediationPage from './components/RemediationPage';
import ServiceMapPage from './components/ServiceMapPage';
import LogsTracesPage from './components/LogsTracesPage';
import AuditTrailPage from './components/AuditTrailPage';
import TechnicalDetailsPage from './components/TechnicalDetailsPage';
import SettingsPage from './components/SettingsPage';
import BenchmarkComparison from './components/BenchmarkComparison';

import { SCENARIOS_DATA } from './data/scenarios';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Resilify Dashboard Render Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '60px auto', background: '#ffffff', borderRadius: '16px', border: '1px solid #fecdd3', boxShadow: '0 10px 30px rgba(244,63,94,0.1)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#be123c', marginBottom: '12px' }}>
            ⚠️ Resilify Dashboard Telemetry Notice
          </h2>
          <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '20px' }}>
            An unhandled interface state occurred. Resilify telemetry has isolated the error safely.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px 24px', background: '#2563eb', color: '#ffffff', borderRadius: '10px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            🔄 Reload Resilify Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [scenarios] = useState(SCENARIOS_DATA);
  const [activeScenario, setActiveScenario] = useState(SCENARIOS_DATA[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [incidentState, setIncidentState] = useState('TRIGGERED'); // TRIGGERED | PROBING | PROBED | TESTING_SANDBOX | PENDING_APPROVAL | EXECUTING_FIX | RESOLVED
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedNode, setSelectedNode] = useState(SCENARIOS_DATA[0].dependencies[2]);
  const [isBenchmarkOpen, setIsBenchmarkOpen] = useState(false);

  const [auditTrail, setAuditTrail] = useState(SCENARIOS_DATA[0].initialAuditTrail);

  const [logs, setLogs] = useState([
    {
      timestamp: '03:14:23Z',
      agent: 'INVESTIGATOR',
      confidence: 62,
      text: `[AZURE OPENAI GPT-4o] Ingested log streams and trace context for ${SCENARIOS_DATA[0].affectedService}.
Correlated anomaly spikes following release ${SCENARIOS_DATA[0].deployment.service}.
⚠️ Initial confidence calculation: 62% (${SCENARIOS_DATA[0].evidenceNeededMessage}).`,
      evidence: `Commit ${SCENARIOS_DATA[0].deployment.commitHash} deployed at 03:02:10Z`
    }
  ]);

  // Dynamic Scenario Switcher
  const handleSelectScenario = (scenario) => {
    setActiveScenario(scenario);
    setIncidentState('TRIGGERED');
    setCurrentStep(1);
    setSelectedNode(scenario.dependencies[2]);
    setAuditTrail(scenario.initialAuditTrail);
    setLogs([
      {
        timestamp: new Date().toISOString().substring(11, 19) + 'Z',
        agent: 'INVESTIGATOR',
        confidence: scenario.initialConfidence,
        text: `[AZURE OPENAI GPT-4o] Ingested telemetry for scenario ${scenario.name}.
Correlated fault on ${scenario.affectedService}.
⚠️ Initial Confidence: ${scenario.initialConfidence}% (${scenario.evidenceNeededMessage}).`,
        evidence: `Customer Impact: "${scenario.customerImpact}"`
      }
    ]);
  };

  // Step 4: Run Active Diagnostic Probe
  const handleRunProbe = () => {
    setIncidentState('PROBING');

    setTimeout(() => {
      setIncidentState('PROBED');
      setCurrentStep(3);

      setLogs(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString().substring(11, 19) + 'Z',
          agent: 'PROBER',
          confidence: activeScenario.probedConfidence,
          text: `[ACTIVE DIAGNOSTIC PROBER] Executed targeted diagnostic telemetry probe.
Evidence verified. Root-cause confidence updated: ${activeScenario.initialConfidence}% → ${activeScenario.probedConfidence}%.`,
          evidence: activeScenario.probedEvidenceMessage
        }
      ]);

      setAuditTrail(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString().substring(11, 19) + 'Z',
          actor: 'AI Prober',
          action: 'Diagnostic probe completed',
          result: `Root-cause confidence updated to ${activeScenario.probedConfidence}%`
        },
        {
          timestamp: new Date().toISOString().substring(11, 19) + 'Z',
          actor: 'AI Hypothesis Engine',
          action: 'Root cause identified',
          result: `Ranked ${activeScenario.deployment.service}`
        }
      ]);
    }, 2000);
  };

  // Step 6: Test Fix Safely in Sandbox
  const handleRunSandboxTest = () => {
    setIncidentState('TESTING_SANDBOX');
    setCurrentStep(4);

    setTimeout(() => {
      setIncidentState('PENDING_APPROVAL');
      setCurrentStep(5);

      setLogs(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString().substring(11, 19) + 'Z',
          agent: 'SANDBOX',
          confidence: activeScenario.probedConfidence,
          text: `[CONTAINER SANDBOX VERIFIER] Instantiated isolated Docker runtime (${activeScenario.sandbox.containerId}).
Executing remediation verification load tests...
[SANDBOX SUCCESS] ${activeScenario.sandbox.resultMessage}`,
          evidence: 'Sandbox PASSED • Human Approval Required Gate Raised'
        }
      ]);

      setAuditTrail(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString().substring(11, 19) + 'Z',
          actor: 'AI Sandbox Verifier',
          action: 'Sandbox verification completed',
          result: 'PASSED (0.0% Error Rate Verified)'
        },
        {
          timestamp: new Date().toISOString().substring(11, 19) + 'Z',
          actor: 'AI Planner',
          action: 'Fix recommended',
          result: `${activeScenario.remediation.actionTitle} (${activeScenario.remediation.actionVersion})`
        }
      ]);
    }, 2000);
  };

  // Step 7: Approve Fix
  const handleApproveFix = () => {
    setIncidentState('EXECUTING_FIX');
    setCurrentStep(6);

    setTimeout(() => {
      setIncidentState('RESOLVED');
      setCurrentStep(7);

      setLogs(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString().substring(11, 19) + 'Z',
          agent: 'SANDBOX',
          confidence: 100,
          text: `[HUMAN APPROVAL GATE] Elena Vance authorized production remediation rollout.
Executed ${activeScenario.remediation.actionTitle}.
✅ Live Telemetry Verified: ${activeScenario.affectedService} error rate normalized to ${activeScenario.recoveredMetrics.failedRequests}.
Incident RESOLVED.`,
          evidence: 'Status: Recovered • MTTR: 3.2 minutes'
        }
      ]);

      setAuditTrail(prev => [
        ...prev,
        {
          timestamp: new Date().toISOString().substring(11, 19) + 'Z',
          actor: 'Elena Vance (Human SRE)',
          action: 'Human approval received',
          result: `Approved ${activeScenario.remediation.actionTitle}`
        },
        {
          timestamp: new Date().toISOString().substring(11, 19) + 'Z',
          actor: 'Resilify Engine',
          action: 'Remediation executed & recovery verified',
          result: '🟢 Incident Resolved'
        }
      ]);
    }, 2500);
  };

  // Step 7: Reject Fix
  const handleRejectFix = () => {
    setIncidentState('PROBED');
    setAuditTrail(prev => [
      ...prev,
      {
        timestamp: new Date().toISOString().substring(11, 19) + 'Z',
        actor: 'Elena Vance (Human SRE)',
        action: 'Human rejection recorded',
        result: 'Remediation rejected. Manual takeover initiated.'
      }
    ]);
  };

  // Handle Step Progress Click
  const handleStepClick = (stepObj) => {
    if (stepObj && stepObj.tab) {
      setActiveTab(stepObj.tab);
    }
  };

  // Reset Demo Flow
  const handleResetDemo = () => {
    handleSelectScenario(activeScenario);
  };

  return (
    <ErrorBoundary>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
        
        {/* Sidebar Navigation */}
        <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

        {/* Main Content Viewport */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto', maxWidth: '1600px' }}>
          
          {/* Top Header Ribbon & Scenario Selector */}
          <Header
            scenarios={scenarios}
            activeScenario={activeScenario}
            onSelectScenario={handleSelectScenario}
            onOpenBenchmark={() => setIsBenchmarkOpen(true)}
            onReset={handleResetDemo}
          />

          {/* Tab 1: Overview Dashboard */}
          {activeTab === 'overview' && (
            <OverviewDashboard
              scenario={activeScenario}
              incidentState={incidentState}
              currentStep={currentStep}
              onRunProbe={handleRunProbe}
              onRunSandboxTest={handleRunSandboxTest}
              onApproveFix={handleApproveFix}
              onRejectFix={handleRejectFix}
              onSelectTab={setActiveTab}
              onStepClick={handleStepClick}
            />
          )}

          {/* Tab 2: Investigation Focused Page */}
          {activeTab === 'investigation' && (
            <InvestigationPage
              incident={activeScenario}
              incidentState={incidentState}
              currentStep={currentStep}
              onRunProbe={handleRunProbe}
              onRunSandboxTest={handleRunSandboxTest}
              onStepClick={handleStepClick}
            />
          )}

          {/* Tab 3: Remediation & Sandbox Approval Page */}
          {activeTab === 'remediation' && (
            <RemediationPage
              incident={activeScenario}
              incidentState={incidentState}
              currentStep={currentStep}
              onRunSandboxTest={handleRunSandboxTest}
              onApproveFix={handleApproveFix}
              onRejectFix={handleRejectFix}
              onStepClick={handleStepClick}
            />
          )}

          {/* Tab 4: Full Service Map Topology Page */}
          {activeTab === 'servicemap' && (
            <ServiceMapPage
              incident={activeScenario}
              isResolved={incidentState === 'RESOLVED'}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          )}

          {/* Tab 5: Logs & Traces Explorer */}
          {activeTab === 'logs' && (
            <LogsTracesPage incident={activeScenario} />
          )}

          {/* Tab 6: Audit Trail Timeline */}
          {activeTab === 'audittrail' && (
            <AuditTrailPage auditTrail={auditTrail} />
          )}

          {/* Tab 7: Technical Details for Judges */}
          {activeTab === 'technical' && (
            <TechnicalDetailsPage
              incident={activeScenario}
              incidentState={incidentState}
              logs={logs}
              selectedNode={selectedNode}
              onSelectNode={setSelectedNode}
            />
          )}

          {/* Tab 8: System Settings */}
          {activeTab === 'settings' && (
            <SettingsPage />
          )}

          {/* Benchmark Matrix Modal */}
          <BenchmarkComparison
            isOpen={isBenchmarkOpen}
            onClose={() => setIsBenchmarkOpen(false)}
          />

        </main>

      </div>
    </ErrorBoundary>
  );
}
