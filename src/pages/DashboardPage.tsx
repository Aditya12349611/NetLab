// Dashboard page

import { useEffect, useState } from 'react';
import { Monitor, Wifi, WifiOff, Users, Clock } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import * as api from '../api';
import type { Device, Alert, TrafficDataPoint } from '../types';
import { DemoBanner, LoadingSpinner, StatusBadge, SeverityBadge, AlertStatusBadge, SectionCard, formatTime } from '../components/shared';

export default function DashboardPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [traffic, setTraffic] = useState<TrafficDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const load = async () => {
    const [d, a, t] = await Promise.all([
      api.getDevices(),
      api.getAlerts(),
      api.getTrafficData(),
    ]);
    setDevices(d);
    setAlerts(a);
    setTraffic(t);
    setLoading(false);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    load();
    // Poll every 30 seconds
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  const online = devices.filter((d) => d.status === 'online').length;
  const offline = devices.filter((d) => d.status === 'offline').length;
  const activeSessions = 3; // comes from sessions in full integration

  if (loading) return <LoadingSpinner text="Loading dashboard…" />;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <DemoBanner />
      </div>

      {lastUpdated && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#94a3b8', marginBottom: 16 }}>
          <Clock size={12} />
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}

      {/* Summary Cards */}
      <div className="summary-cards">
        <SummaryCard
          icon={<Monitor size={20} color="#2563eb" />}
          iconBg="#dbeafe"
          value={devices.length}
          label="Total Devices"
        />
        <SummaryCard
          icon={<Wifi size={20} color="#16a34a" />}
          iconBg="#dcfce7"
          value={online}
          label="Online"
        />
        <SummaryCard
          icon={<WifiOff size={20} color="#dc2626" />}
          iconBg="#fee2e2"
          value={offline}
          label="Offline"
        />
        <SummaryCard
          icon={<Users size={20} color="#d97706" />}
          iconBg="#fef9c3"
          value={activeSessions}
          label="Active Sessions"
        />
      </div>

      {/* Charts + recent alerts */}
      <div className="two-col" style={{ marginBottom: 16 }}>
        {/* Traffic Chart */}
        <SectionCard title="Network Traffic (KB/s)">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={traffic} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Legend iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="inbound" stroke="#2563eb" dot={false} strokeWidth={2} name="Inbound" />
                <Line type="monotone" dataKey="outbound" stroke="#7c3aed" dot={false} strokeWidth={2} name="Outbound" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* Recent Alerts */}
        <SectionCard title="Recent Alerts">
          {alerts.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: 13 }}>No recent alerts.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {alerts.slice(0, 5).map((a) => (
                <div key={a.id} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '8px 10px', borderRadius: 6, background: '#f8fafc',
                  border: '1px solid #f1f5f9',
                }}>
                  <SeverityBadge severity={a.severity} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{a.type}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>{a.device}</div>
                  </div>
                  <AlertStatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>

      {/* Recently Seen Devices */}
      <SectionCard title="Recently Seen Devices">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>IP Address</th>
                <th>Status</th>
                <th>CPU</th>
                <th>RAM</th>
                <th>Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {devices.slice(0, 6).map((d) => (
                <tr key={d.id}>
                  <td style={{ fontWeight: 500 }}>{d.name}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{d.ipAddress}</td>
                  <td><StatusBadge status={d.status} /></td>
                  <td>
                    <span style={{ color: d.cpu > 80 ? '#dc2626' : d.cpu > 60 ? '#d97706' : '#16a34a', fontWeight: 600, fontSize: 12 }}>
                      {d.cpu}%
                    </span>
                  </td>
                  <td>
                    <span style={{ color: d.ram > 80 ? '#dc2626' : d.ram > 60 ? '#d97706' : '#16a34a', fontWeight: 600, fontSize: 12 }}>
                      {d.ram}%
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: '#64748b' }}>{formatTime(d.lastSeen)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Local helper ─────────────────────────────────────────────────────────────
function SummaryCard({
  icon, iconBg, value, label,
}: {
  icon: React.ReactNode;
  iconBg: string;
  value: number;
  label: string;
}) {
  return (
    <div className="summary-card">
      <div className="summary-card-icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div>
        <div className="summary-card-value">{value}</div>
        <div className="summary-card-label">{label}</div>
      </div>
    </div>
  );
}
