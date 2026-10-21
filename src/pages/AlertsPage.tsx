// Alerts page

import { useState, useEffect, useMemo } from 'react';
import { CheckCircle } from 'lucide-react';
import * as api from '../api';
import type { Alert } from '../types';
import {
  DemoBanner, LoadingSpinner, EmptyState, SeverityBadge,
  AlertStatusBadge, SectionCard, Toast, formatTime,
} from '../components/shared';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    api.getAlerts().then((a) => { setAlerts(a); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return alerts.filter((a) => {
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
      return matchStatus && matchSeverity;
    });
  }, [alerts, statusFilter, severityFilter]);

  const acknowledge = async (id: string) => {
    await api.acknowledgeAlert(id);
    setAlerts((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: 'acknowledged' } : a)
    );
    setToast('Alert acknowledged (demo only — no real action taken).');
  };

  if (loading) return <LoadingSpinner text="Loading alerts…" />;

  const openCount = alerts.filter((a) => a.status === 'open').length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Alerts</h1>
          {openCount > 0 && (
            <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>
              {openCount} open alert{openCount > 1 ? 's' : ''} require attention.
            </p>
          )}
        </div>
        <DemoBanner />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <select id="alert-status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ width: 'auto' }}>
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="resolved">Resolved</option>
        </select>
        <select id="alert-severity-filter" value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} style={{ width: 'auto' }}>
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      <SectionCard title={`Alerts (${filtered.length})`}>
        {filtered.length === 0 ? (
          <EmptyState message="No alerts match the current filters." />
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Type</th>
                  <th>Device</th>
                  <th>Description</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id}>
                    <td><SeverityBadge severity={a.severity} /></td>
                    <td style={{ fontWeight: 500, fontSize: 13 }}>{a.type}</td>
                    <td style={{ fontSize: 12, color: '#374151' }}>{a.device}</td>
                    <td style={{ fontSize: 12, color: '#64748b', maxWidth: 260 }}>{a.description}</td>
                    <td style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>{formatTime(a.time)}</td>
                    <td><AlertStatusBadge status={a.status} /></td>
                    <td>
                      {a.status === 'open' ? (
                        <button
                          id={`ack-alert-${a.id}`}
                          className="btn btn-outline"
                          style={{ padding: '4px 10px', fontSize: 12 }}
                          onClick={() => acknowledge(a.id)}
                        >
                          <CheckCircle size={12} /> Acknowledge
                        </button>
                      ) : (
                        <span style={{ fontSize: 12, color: '#94a3b8' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      {toast && <Toast message={toast} type="info" onClose={() => setToast(null)} />}
    </div>
  );
}
