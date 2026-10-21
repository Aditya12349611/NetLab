// Shared reusable UI components for NETLAB

import { AlertTriangle, Info } from 'lucide-react';

// ─── Demo Banner ─────────────────────────────────────────────────────────────
export function DemoBanner() {
  return (
    <div className="demo-banner" role="status">
      <AlertTriangle size={14} />
      <span>
        <strong>Demo Data</strong> — All information on this page is sample data for UI
        development. Connect the backend to see real data.
      </span>
    </div>
  );
}

// ─── Loading Spinner ──────────────────────────────────────────────────────────
export function LoadingSpinner({ text = 'Loading…' }: { text?: string }) {
  return (
    <div className="empty-state">
      <div className="spinner" />
      <span>{text}</span>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="empty-state">
      <Info size={28} style={{ color: '#94a3b8' }} />
      <span>{message}</span>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
type StatusBadgeProps = {
  status: 'online' | 'offline' | 'idle' | 'active' | 'expired' | 'revoked' | 'connected' | 'disconnected' | 'unknown';
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<string, string> = {
    online: 'badge badge-green',
    active: 'badge badge-green',
    connected: 'badge badge-green',
    offline: 'badge badge-red',
    expired: 'badge badge-red',
    disconnected: 'badge badge-red',
    idle: 'badge badge-amber',
    revoked: 'badge badge-gray',
    unknown: 'badge badge-gray',
  };
  return <span className={map[status] ?? 'badge badge-gray'}>{status}</span>;
}

// ─── Severity Badge ───────────────────────────────────────────────────────────
type SeverityBadgeProps = { severity: 'critical' | 'warning' | 'info' };
export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const map = {
    critical: 'badge badge-red',
    warning: 'badge badge-amber',
    info: 'badge badge-blue',
  };
  return <span className={map[severity]}>{severity}</span>;
}

// ─── Alert Status Badge ───────────────────────────────────────────────────────
type AlertStatusBadgeProps = { status: 'open' | 'acknowledged' | 'resolved' };
export function AlertStatusBadge({ status }: AlertStatusBadgeProps) {
  const map = {
    open: 'badge badge-red',
    acknowledged: 'badge badge-amber',
    resolved: 'badge badge-green',
  };
  return <span className={map[status]}>{status}</span>;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value }: { value: number }) {
  const color = value > 80 ? '#dc2626' : value > 60 ? '#d97706' : '#2563eb';
  return (
    <div className="progress-bar" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div className="progress-bar" style={{ flex: 1 }}>
        <div
          className="progress-bar-fill"
          style={{ width: `${Math.min(value, 100)}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
type ToastProps = {
  message: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
};

export function Toast({ message, type = 'info', onClose }: ToastProps) {
  return (
    <div className={`toast ${type}`} role="alert">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 16, lineHeight: 1, flexShrink: 0 }}
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────
export function SectionCard({ title, children, action }: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h2 className="section-title" style={{ margin: 0 }}>{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

// ─── Format helpers ───────────────────────────────────────────────────────────
export function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
  } catch {
    return iso;
  }
}
