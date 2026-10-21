// ─── Data Models ────────────────────────────────────────────────────────────
// All types used across the NETLAB application.

export type DeviceStatus = 'online' | 'offline' | 'idle';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'open' | 'acknowledged' | 'resolved';
export type SessionStatus = 'active' | 'expired' | 'revoked';

export interface Device {
  id: string;
  name: string; // friendly label assigned by admin
  hostname: string;
  ipAddress: string;
  macAddress: string;
  status: DeviceStatus;
  lastSeen: string; // ISO timestamp
  cpu: number; // percent 0-100
  ram: number; // percent 0-100
  disk: number; // percent 0-100
  uptime: string; // e.g. "3d 4h 12m"
  agentStatus: 'connected' | 'disconnected' | 'unknown';
  recentEvents: DeviceEvent[];
}

export interface DeviceEvent {
  id: string;
  time: string;
  type: string;
  description: string;
}

export interface NetworkEvent {
  id: string;
  deviceName: string;
  deviceIp: string;
  destination: string; // domain or IP
  protocol: string;
  trafficVolume: string; // e.g. "1.2 MB"
  timestamp: string;
  source: string; // e.g. "Router DHCP", "ARP Table"
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  type: string;
  device: string;
  time: string;
  status: AlertStatus;
  description: string;
}

export interface Session {
  id: string;
  userIdentifier: string; // student/ERP id
  device: string;
  ipAddress: string;
  loginTime: string;
  duration: string;
  expiry: string;
  status: SessionStatus;
}

export interface TrafficDataPoint {
  time: string;
  inbound: number; // KB/s
  outbound: number; // KB/s
}

export interface ReportSummary {
  totalDevices: number;
  avgAvailability: number; // percent
  totalTrafficMB: number;
  alertCount: number;
  dateRange: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'viewer';
}

export interface IntegrationStatus {
  backend: boolean;
  database: boolean;
  monitoringAgent: boolean;
  routerSource: boolean;
  captiveGateway: boolean;
}
