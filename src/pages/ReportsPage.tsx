// Reports page — summary and CSV export

import { useState, useEffect } from 'react';
import { Download, AlertTriangle } from 'lucide-react';
import * as api from '../api';
import type { Device, Alert, Session } from '../types';
import { DemoBanner, LoadingSpinner, SectionCard } from '../components/shared';

function toCSV(rows: string[][], headers: string[]): string {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [headers.map(escape).join(','), ...rows.map((r) => r.map(escape).join(','))].join('\n');
}

function downloadCSV(filename: string, csv: string) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('2026-10-21');
  const [toDate, setToDate] = useState('2026-10-21');

  useEffect(() => {
    Promise.all([api.getDevices(), api.getAlerts(), api.getSessions()]).then(
      ([d, a, s]) => { setDevices(d); setAlerts(a); setSessions(s); setLoading(false); }
    );
  }, []);

  if (loading) return <LoadingSpinner text="Loading report data…" />;

  const online = devices.filter((d) => d.status === 'online').length;
  const offline = devices.filter((d) => d.status === 'offline').length;
  const availability = devices.length ? Math.round((online / devices.length) * 100) : 0;
  const openAlerts = alerts.filter((a) => a.status === 'open').length;
  const activeSessions = sessions.filter((s) => s.status === 'active').length;

  const exportDevices = () => {
    const headers = ['Name', 'Hostname', 'IP Address', 'MAC Address', 'Status', 'CPU%', 'RAM%', 'Disk%', 'Uptime', 'Last Seen'];
    const rows = devices.map((d) => [d.name, d.hostname, d.ipAddress, d.macAddress, d.status, String(d.cpu), String(d.ram), String(d.disk), d.uptime, d.lastSeen]);
    downloadCSV('netlab_devices_demo.csv', toCSV(rows, headers));
  };

  const exportAlerts = () => {
    const headers = ['Severity', 'Type', 'Device', 'Time', 'Status', 'Description'];
    const rows = alerts.map((a) => [a.severity, a.type, a.device, a.time, a.status, a.description]);
    downloadCSV('netlab_alerts_demo.csv', toCSV(rows, headers));
  };

  const exportSessions = () => {
    const headers = ['User ID', 'Device', 'IP', 'Login Time', 'Duration', 'Expiry', 'Status'];
    const rows = sessions.map((s) => [s.userIdentifier, s.device, s.ipAddress, s.loginTime, s.duration, s.expiry, s.status]);
    downloadCSV('netlab_sessions_demo.csv', toCSV(rows, headers));
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reports</h1>
        <DemoBanner />
      </div>

      {/* Demo export note */}
      <div style={{
        background: '#fffbeb', border: '1px solid #fcd34d',
        borderRadius: 6, padding: '8px 14px', marginBottom: 16,
        display: 'flex', gap: 8, fontSize: 12, color: '#92400e',
      }}>
        <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          All exports contain <strong>demo/sample data</strong> only. Real reports will be available
          once backend data sources are connected.
        </span>
      </div>

      {/* Date Filter */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h2 className="section-title">Date Range</h2>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <label htmlFor="report-from">From:</label>
            <input id="report-from" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ width: 160 }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <label htmlFor="report-to">To:</label>
            <input id="report-to" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ width: 160 }} />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Total Devices', value: devices.length },
          { label: 'Online', value: online },
          { label: 'Offline', value: offline },
          { label: 'Availability', value: `${availability}%` },
          { label: 'Open Alerts', value: openAlerts },
          { label: 'Active Sessions', value: activeSessions },
        ].map((item) => (
          <div key={item.label} className="card" style={{ textAlign: 'center', padding: '14px 12px' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{item.value}</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Export sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ExportCard
          title="Device Availability"
          description={`${devices.length} devices · ${online} online · ${offline} offline · ${availability}% availability`}
          onExport={exportDevices}
          exportId="export-devices"
        />
        <ExportCard
          title="Alerts Summary"
          description={`${alerts.length} total alerts · ${openAlerts} open · ${alerts.filter(a => a.status === 'acknowledged').length} acknowledged`}
          onExport={exportAlerts}
          exportId="export-alerts"
        />
        <ExportCard
          title="Session Log"
          description={`${sessions.length} total sessions · ${activeSessions} active · ${sessions.filter(s => s.status === 'expired').length} expired`}
          onExport={exportSessions}
          exportId="export-sessions"
        />
      </div>
    </div>
  );
}

function ExportCard({ title, description, onExport, exportId }: {
  title: string; description: string; onExport: () => void; exportId: string;
}) {
  return (
    <SectionCard
      title={title}
      action={
        <button id={exportId} className="btn btn-outline" onClick={onExport}>
          <Download size={13} /> Export CSV
        </button>
      }
    >
      <p style={{ fontSize: 13, color: '#64748b' }}>{description}</p>
    </SectionCard>
  );
}
