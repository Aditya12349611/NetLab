// Settings page

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import * as api from '../api';
import type { IntegrationStatus } from '../types';
import { SectionCard, Toast } from '../components/shared';

export default function SettingsPage() {
  const [integrations, setIntegrations] = useState<IntegrationStatus | null>(null);
  const [pollInterval, setPollInterval] = useState(30);
  const [cpuThreshold, setCpuThreshold] = useState(80);
  const [ramThreshold, setRamThreshold] = useState(85);
  const [bandwidthThreshold, setBandwidthThreshold] = useState(50);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    api.getIntegrationStatus().then(setIntegrations);
  }, []);

  const saveSettings = () => {
    // In production: POST /api/settings with these values
    setToast('Settings saved (demo only — no backend connected).');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Integration Status */}
        <SectionCard title="Integration Status">
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 14 }}>
            Shows whether each backend component is connected. Configure connections before deploying to production.
          </p>
          {integrations ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(Object.entries(integrations) as [keyof IntegrationStatus, boolean][]).map(([key, value]) => (
                <IntegrationRow key={key} label={INTEGRATION_LABELS[key]} connected={value} />
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: '#94a3b8' }}>Loading…</p>
          )}
        </SectionCard>

        {/* Monitoring */}
        <SectionCard title="Monitoring">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
            <SettingRow
              label="Poll Interval (seconds)"
              id="poll-interval"
              type="number"
              value={pollInterval}
              onChange={(v) => setPollInterval(Number(v))}
              min={10} max={300}
              help="How often the dashboard checks for updates."
            />
          </div>
        </SectionCard>

        {/* Alert Thresholds */}
        <SectionCard title="Alert Thresholds">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
            <SettingRow
              label="CPU Alert Threshold (%)"
              id="cpu-threshold"
              type="number"
              value={cpuThreshold}
              onChange={(v) => setCpuThreshold(Number(v))}
              min={10} max={100}
            />
            <SettingRow
              label="RAM Alert Threshold (%)"
              id="ram-threshold"
              type="number"
              value={ramThreshold}
              onChange={(v) => setRamThreshold(Number(v))}
              min={10} max={100}
            />
            <SettingRow
              label="Bandwidth Alert (MB per 5 min)"
              id="bandwidth-threshold"
              type="number"
              value={bandwidthThreshold}
              onChange={(v) => setBandwidthThreshold(Number(v))}
              min={1} max={1000}
            />
          </div>
        </SectionCard>

        {/* Administrator Accounts */}
        <SectionCard title="Administrator Accounts">
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>
            Administrator accounts are managed on the server. Never share credentials or store
            passwords in plain text.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <AdminRow name="Lab Administrator" email="admin@netlab.local" role="admin" />
          </div>
        </SectionCard>

        {/* About */}
        <SectionCard title="About NETLAB">
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>
            NETLAB Smart Lab Monitoring System — Phase 1 (Demo UI)
          </p>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>
            All data is currently demo data. Backend, database, monitoring agents, and gateway
            integrations are listed as placeholders until Phase 3+ implementation.
          </p>
        </SectionCard>

        <div>
          <button id="save-settings" className="btn btn-primary" onClick={saveSettings}>
            Save Settings
          </button>
        </div>
      </div>

      {toast && <Toast message={toast} type="info" onClose={() => setToast(null)} />}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const INTEGRATION_LABELS: Record<keyof IntegrationStatus, string> = {
  backend: 'Backend API Server',
  database: 'MongoDB Database',
  monitoringAgent: 'Monitoring Agent',
  routerSource: 'Router / Network Source',
  captiveGateway: 'Captive Portal Gateway',
};

function IntegrationRow({ label, connected }: { label: string; connected: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
      <span style={{ color: '#374151' }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, color: connected ? '#16a34a' : '#94a3b8' }}>
        {connected
          ? <><CheckCircle size={15} /> Connected</>
          : <><XCircle size={15} color="#cbd5e1" /> Not connected</>
        }
      </span>
    </div>
  );
}

function SettingRow({ label, id, type, value, onChange, min, max, help }: {
  label: string; id: string; type: string; value: number;
  onChange: (v: string) => void; min?: number; max?: number; help?: string;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
        {label}
      </label>
      <input id={id} type={type} value={value} min={min} max={max} onChange={(e) => onChange(e.target.value)} style={{ width: '100%' }} />
      {help && <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{help}</p>}
    </div>
  );
}

function AdminRow({ name, email, role }: { name: string; email: string; role: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px', borderRadius: 6, background: '#f8fafc',
      border: '1px solid #e2e8f0', fontSize: 13,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%',
        background: '#dbeafe', color: '#1d4ed8',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 12, flexShrink: 0,
      }}>
        {name.charAt(0)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600 }}>{name}</div>
        <div style={{ fontSize: 12, color: '#64748b' }}>{email}</div>
      </div>
      <span className="badge badge-blue">{role}</span>
    </div>
  );
}
