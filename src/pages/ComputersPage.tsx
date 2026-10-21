// Computers page — searchable device table + detail view

import { useState, useEffect, useMemo } from 'react';
import { Search, X, ArrowLeft, Pencil, Check } from 'lucide-react';
import * as api from '../api';
import type { Device } from '../types';
import {
  DemoBanner, LoadingSpinner, EmptyState, StatusBadge,
  SectionCard, formatTime,
} from '../components/shared';

export default function ComputersPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    api.getDevices().then((d) => { setDevices(d); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    return devices.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.ipAddress.includes(search) ||
        d.macAddress.toLowerCase().includes(search.toLowerCase()) ||
        d.hostname.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || d.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [devices, search, statusFilter]);

  const selectedDevice = devices.find((d) => d.id === selectedId);

  if (loading) return <LoadingSpinner text="Loading devices…" />;

  if (selectedDevice) {
    return (
      <DeviceDetail
        device={selectedDevice}
        onBack={() => setSelectedId(null)}
        onNameChange={(id, name) => {
          setDevices((prev) => prev.map((d) => d.id === id ? { ...d, name } : d));
        }}
      />
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Computers</h1>
        <DemoBanner />
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ flex: 1, minWidth: 200, maxWidth: 360 }}>
          <Search size={14} color="#94a3b8" />
          <input
            id="computer-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, IP, MAC, hostname…"
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
              <X size={14} />
            </button>
          )}
        </div>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: 'auto' }}
        >
          <option value="all">All Statuses</option>
          <option value="online">Online</option>
          <option value="idle">Idle</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          {filtered.length === 0 ? (
            <EmptyState message="No devices match your search." />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>IP Address</th>
                  <th>MAC Address</th>
                  <th>Status</th>
                  <th>CPU</th>
                  <th>RAM</th>
                  <th>Last Seen</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8' }}>{d.hostname}</div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{d.ipAddress}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: 11, color: '#64748b' }}>{d.macAddress}</td>
                    <td><StatusBadge status={d.status} /></td>
                    <td>
                      <MetricCell value={d.cpu} />
                    </td>
                    <td>
                      <MetricCell value={d.ram} />
                    </td>
                    <td style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>
                      {formatTime(d.lastSeen)}
                    </td>
                    <td>
                      <button
                        id={`view-device-${d.id}`}
                        className="btn btn-ghost"
                        style={{ padding: '4px 10px', fontSize: 12 }}
                        onClick={() => setSelectedId(d.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <p style={{ marginTop: 8, fontSize: 12, color: '#94a3b8' }}>
        Showing {filtered.length} of {devices.length} devices
      </p>
    </div>
  );
}

// ─── Device Detail ────────────────────────────────────────────────────────────
function DeviceDetail({
  device,
  onBack,
  onNameChange,
}: {
  device: Device;
  onBack: () => void;
  onNameChange: (id: string, name: string) => void;
}) {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(device.name);

  const saveName = async () => {
    await api.updateDeviceName(device.id, nameInput.trim() || device.name);
    onNameChange(device.id, nameInput.trim() || device.name);
    setEditingName(false);
  };

  return (
    <div>
      {/* Back */}
      <button className="btn btn-ghost" style={{ marginBottom: 16 }} onClick={onBack}>
        <ArrowLeft size={14} /> Back to Computers
      </button>

      <div className="page-header">
        <div>
          {editingName ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input
                id="device-name-input"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                style={{ width: 200, fontSize: 18, fontWeight: 700, padding: '4px 8px' }}
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
                autoFocus
              />
              <button id="save-name" className="btn btn-primary" style={{ padding: '4px 10px' }} onClick={saveName}>
                <Check size={14} /> Save
              </button>
              <button className="btn btn-ghost" style={{ padding: '4px 10px' }} onClick={() => { setEditingName(false); setNameInput(device.name); }}>
                Cancel
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h1 className="page-title">{device.name}</h1>
              <button
                id="edit-name"
                className="btn btn-ghost"
                style={{ padding: '4px 8px' }}
                onClick={() => setEditingName(true)}
                title="Edit friendly name"
              >
                <Pencil size={13} />
              </button>
            </div>
          )}
          <p style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{device.hostname} · {device.ipAddress}</p>
        </div>
        <StatusBadge status={device.status} />
      </div>

      <div className="two-col" style={{ marginBottom: 16 }}>
        {/* Metrics */}
        <SectionCard title="System Metrics">
          <MetricRow label="CPU" value={device.cpu} />
          <MetricRow label="RAM" value={device.ram} />
          <MetricRow label="Disk" value={device.disk} />

          <div style={{ borderTop: '1px solid #f1f5f9', marginTop: 14, paddingTop: 14 }}>
            <InfoRow label="Uptime" value={device.uptime} />
            <InfoRow label="MAC Address" value={device.macAddress} mono />
            <InfoRow label="Agent Status" value={device.agentStatus} />
          </div>
        </SectionCard>

        {/* Recent Events */}
        <SectionCard title="Recent Events">
          {device.recentEvents.length === 0 ? (
            <EmptyState message="No recent events for this device." />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {device.recentEvents.map((ev) => (
                <div key={ev.id} style={{
                  padding: '8px 12px', borderRadius: 6,
                  background: '#f8fafc', border: '1px solid #f1f5f9',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{ev.type}</span>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{formatTime(ev.time)}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#64748b' }}>{ev.description}</p>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

// ─── Local Helpers ────────────────────────────────────────────────────────────
function MetricCell({ value }: { value: number }) {
  const color = value > 80 ? '#dc2626' : value > 60 ? '#d97706' : '#16a34a';
  return (
    <span style={{ fontWeight: 600, fontSize: 12, color }}>
      {value === 0 ? '—' : `${value}%`}
    </span>
  );
}

function MetricRow({ label, value }: { label: string; value: number }) {
  const color = value > 80 ? '#dc2626' : value > 60 ? '#d97706' : '#2563eb';
  return (
    <div className="metric-row">
      <span className="metric-label">{label}</span>
      <div className="progress-bar" style={{ flex: 1 }}>
        <div className="progress-bar-fill" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="metric-value" style={{ color }}>{value}%</span>
    </div>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
      <span style={{ color: '#64748b' }}>{label}</span>
      <span style={{ fontWeight: 500, fontFamily: mono ? 'monospace' : undefined }}>{value}</span>
    </div>
  );
}
