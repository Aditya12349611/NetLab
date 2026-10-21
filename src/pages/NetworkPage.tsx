// Network Activity page

import { useState, useEffect, useMemo } from 'react';
import { Search, X, Info } from 'lucide-react';
import * as api from '../api';
import type { NetworkEvent } from '../types';
import { DemoBanner, LoadingSpinner, EmptyState, SectionCard, formatTime } from '../components/shared';

export default function NetworkPage() {
  const [events, setEvents] = useState<NetworkEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    api.getNetworkEvents().then((e) => { setEvents(e); setLoading(false); });
  }, []);

  const uniqueDevices = useMemo(() => {
    return Array.from(new Set(events.map((e) => e.deviceName))).sort();
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchSearch =
        !search ||
        e.destination.toLowerCase().includes(search.toLowerCase()) ||
        e.deviceName.toLowerCase().includes(search.toLowerCase()) ||
        e.protocol.toLowerCase().includes(search.toLowerCase());
      const matchDevice = !deviceFilter || e.deviceName === deviceFilter;
      let matchDate = true;
      if (fromDate) matchDate = matchDate && e.timestamp >= fromDate;
      if (toDate) matchDate = matchDate && e.timestamp <= toDate + 'T23:59:59Z';
      return matchSearch && matchDevice && matchDate;
    });
  }, [events, search, deviceFilter, fromDate, toDate]);

  if (loading) return <LoadingSpinner text="Loading network events…" />;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Network Activity</h1>
        <DemoBanner />
      </div>

      {/* Disclaimer */}
      <div style={{
        background: '#f0f9ff', border: '1px solid #bae6fd',
        borderRadius: 6, padding: '10px 14px', marginBottom: 16,
        display: 'flex', gap: 10, fontSize: 12, color: '#0369a1',
      }}>
        <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
        <span>
          <strong>Visibility note:</strong> Destination domains are shown only when available from router
          stats, DNS logs, or ARP records. Ordinary packet capture cannot reveal the contents of HTTPS
          connections — including web pages, passwords, messages, or search queries. Only connection
          metadata (destination IP/domain, protocol, volume) may be observable.
        </span>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ flex: 1, minWidth: 200, maxWidth: 320 }}>
          <Search size={14} color="#94a3b8" />
          <input
            id="network-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination, device, protocol…"
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}>
              <X size={14} />
            </button>
          )}
        </div>
        <select
          id="device-filter"
          value={deviceFilter}
          onChange={(e) => setDeviceFilter(e.target.value)}
          style={{ width: 'auto' }}
        >
          <option value="">All Devices</option>
          {uniqueDevices.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
          <label htmlFor="from-date">From:</label>
          <input id="from-date" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ width: 140 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
          <label htmlFor="to-date">To:</label>
          <input id="to-date" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ width: 140 }} />
        </div>
        {(search || deviceFilter || fromDate || toDate) && (
          <button
            className="btn btn-ghost"
            onClick={() => { setSearch(''); setDeviceFilter(''); setFromDate(''); setToDate(''); }}
            style={{ padding: '6px 12px', fontSize: 12 }}
          >
            <X size={12} /> Clear Filters
          </button>
        )}
      </div>

      {/* Table */}
      <SectionCard title={`Observed Events (${filtered.length})`}>
        <div className="table-container">
          {filtered.length === 0 ? (
            <EmptyState message="No events match the current filters." />
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Destination</th>
                  <th>Protocol</th>
                  <th>Volume</th>
                  <th>Timestamp</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{e.deviceName}</div>
                      <div style={{ fontSize: 11, color: '#94a3b8', fontFamily: 'monospace' }}>{e.deviceIp}</div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{e.destination}</td>
                    <td>
                      <span className="badge badge-blue">{e.protocol}</span>
                    </td>
                    <td style={{ fontSize: 12, fontWeight: 600 }}>{e.trafficVolume}</td>
                    <td style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>
                      {formatTime(e.timestamp)}
                    </td>
                    <td>
                      <span className="badge badge-gray">{e.source}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
