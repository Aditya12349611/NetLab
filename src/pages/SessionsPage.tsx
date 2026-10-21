// Sessions page

import { useState, useEffect, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import * as api from '../api';
import type { Session } from '../types';
import {
  DemoBanner, LoadingSpinner, EmptyState, StatusBadge,
  SectionCard, Toast, formatTime,
} from '../components/shared';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'warning' } | null>(null);

  useEffect(() => {
    api.getSessions().then((s) => { setSessions(s); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return sessions.filter((s) =>
      statusFilter === 'all' || s.status === statusFilter
    );
  }, [sessions, statusFilter]);

  const revoke = async (id: string) => {
    const result = await api.revokeSession(id);
    setToast({
      message: result.message,
      type: result.success ? 'info' : 'warning',
    });
  };

  if (loading) return <LoadingSpinner text="Loading sessions…" />;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Sessions</h1>
        <DemoBanner />
      </div>

      {/* Gateway disclaimer */}
      <div style={{
        background: '#fffbeb', border: '1px solid #fcd34d',
        borderRadius: 6, padding: '10px 14px', marginBottom: 16,
        display: 'flex', gap: 10, fontSize: 12, color: '#92400e',
      }}>
        <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          <strong>Gateway enforcement not yet configured.</strong> The "Revoke" button is a UI
          placeholder only. Actual session termination requires integration with the captive portal
          gateway/firewall. No real sessions will be terminated from this page.
        </span>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: 14 }}>
        <select
          id="session-status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: 'auto' }}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="expired">Expired</option>
          <option value="revoked">Revoked</option>
        </select>
      </div>

      <SectionCard title={`Sessions (${filtered.length})`}>
        {filtered.length === 0 ? (
          <EmptyState message="No sessions match the filter." />
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User Identifier</th>
                  <th>Device</th>
                  <th>IP Address</th>
                  <th>Login Time</th>
                  <th>Duration</th>
                  <th>Expiry</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 500, fontFamily: 'monospace', fontSize: 12 }}>{s.userIdentifier}</td>
                    <td>{s.device}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{s.ipAddress}</td>
                    <td style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>{formatTime(s.loginTime)}</td>
                    <td style={{ fontSize: 12 }}>{s.duration}</td>
                    <td style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>{formatTime(s.expiry)}</td>
                    <td><StatusBadge status={s.status} /></td>
                    <td>
                      {s.status === 'active' ? (
                        <button
                          id={`revoke-${s.id}`}
                          className="btn btn-danger"
                          style={{ padding: '4px 10px', fontSize: 12 }}
                          onClick={() => revoke(s.id)}
                        >
                          Revoke
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

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
