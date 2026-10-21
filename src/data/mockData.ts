/**
 * NETLAB Mock Data
 * ─────────────────────────────────────────────────────────────────────────────
 * All data in this file is SAMPLE / DEMO data for UI development only.
 * It is clearly labelled "Demo Data" in the interface.
 * Replace these with real API calls once the backend is connected.
 */

import type {
  Device,
  NetworkEvent,
  Alert,
  Session,
  TrafficDataPoint,
  IntegrationStatus,
  AdminUser,
} from '../types';

// ─── Devices ─────────────────────────────────────────────────────────────────
export const MOCK_DEVICES: Device[] = [
  {
    id: 'd-001',
    name: 'Lab PC 01',
    hostname: 'netlab-pc01',
    ipAddress: '192.168.1.101',
    macAddress: 'AA:BB:CC:DD:EE:01',
    status: 'online',
    lastSeen: '2026-10-21T10:02:00Z',
    cpu: 34,
    ram: 55,
    disk: 62,
    uptime: '2d 14h 33m',
    agentStatus: 'connected',
    recentEvents: [
      { id: 'e-01a', time: '2026-10-21T10:01:00Z', type: 'Login', description: 'User session started' },
      { id: 'e-01b', time: '2026-10-20T08:00:00Z', type: 'Reboot', description: 'System rebooted' },
    ],
  },
  {
    id: 'd-002',
    name: 'Lab PC 02',
    hostname: 'netlab-pc02',
    ipAddress: '192.168.1.102',
    macAddress: 'AA:BB:CC:DD:EE:02',
    status: 'online',
    lastSeen: '2026-10-21T10:03:00Z',
    cpu: 71,
    ram: 80,
    disk: 45,
    uptime: '5d 2h 10m',
    agentStatus: 'connected',
    recentEvents: [
      { id: 'e-02a', time: '2026-10-21T09:55:00Z', type: 'High CPU', description: 'CPU exceeded 70%' },
    ],
  },
  {
    id: 'd-003',
    name: 'Lab PC 03',
    hostname: 'netlab-pc03',
    ipAddress: '192.168.1.103',
    macAddress: 'AA:BB:CC:DD:EE:03',
    status: 'offline',
    lastSeen: '2026-10-21T07:15:00Z',
    cpu: 0,
    ram: 0,
    disk: 38,
    uptime: '—',
    agentStatus: 'disconnected',
    recentEvents: [
      { id: 'e-03a', time: '2026-10-21T07:14:00Z', type: 'Offline', description: 'Device went offline' },
    ],
  },
  {
    id: 'd-004',
    name: 'Lab PC 04',
    hostname: 'netlab-pc04',
    ipAddress: '192.168.1.104',
    macAddress: 'AA:BB:CC:DD:EE:04',
    status: 'idle',
    lastSeen: '2026-10-21T09:50:00Z',
    cpu: 5,
    ram: 30,
    disk: 55,
    uptime: '1d 0h 5m',
    agentStatus: 'connected',
    recentEvents: [],
  },
  {
    id: 'd-005',
    name: 'Lab PC 05',
    hostname: 'netlab-pc05',
    ipAddress: '192.168.1.105',
    macAddress: 'AA:BB:CC:DD:EE:05',
    status: 'online',
    lastSeen: '2026-10-21T10:04:00Z',
    cpu: 22,
    ram: 44,
    disk: 71,
    uptime: '3d 7h 22m',
    agentStatus: 'connected',
    recentEvents: [
      { id: 'e-05a', time: '2026-10-21T09:00:00Z', type: 'Login', description: 'User session started' },
    ],
  },
  {
    id: 'd-006',
    name: 'Instructor PC',
    hostname: 'netlab-instr',
    ipAddress: '192.168.1.10',
    macAddress: 'AA:BB:CC:DD:EE:10',
    status: 'online',
    lastSeen: '2026-10-21T10:05:00Z',
    cpu: 18,
    ram: 62,
    disk: 40,
    uptime: '10d 1h 55m',
    agentStatus: 'connected',
    recentEvents: [],
  },
  {
    id: 'd-007',
    name: 'Unknown Device',
    hostname: 'unknown-7a3f',
    ipAddress: '192.168.1.200',
    macAddress: 'FF:EE:DD:CC:BB:07',
    status: 'online',
    lastSeen: '2026-10-21T09:30:00Z',
    cpu: 0,
    ram: 0,
    disk: 0,
    uptime: '—',
    agentStatus: 'unknown',
    recentEvents: [
      { id: 'e-07a', time: '2026-10-21T09:30:00Z', type: 'Discovery', description: 'New device detected on network' },
    ],
  },
];

// ─── Network Events ───────────────────────────────────────────────────────────
export const MOCK_NETWORK_EVENTS: NetworkEvent[] = [
  {
    id: 'n-001',
    deviceName: 'Lab PC 01',
    deviceIp: '192.168.1.101',
    destination: 'classroom.google.com',
    protocol: 'HTTPS',
    trafficVolume: '1.4 MB',
    timestamp: '2026-10-21T10:00:00Z',
    source: 'Router Stats',
  },
  {
    id: 'n-002',
    deviceName: 'Lab PC 02',
    deviceIp: '192.168.1.102',
    destination: '142.250.80.46',
    protocol: 'HTTPS',
    trafficVolume: '3.8 MB',
    timestamp: '2026-10-21T09:58:00Z',
    source: 'ARP Table',
  },
  {
    id: 'n-003',
    deviceName: 'Lab PC 05',
    deviceIp: '192.168.1.105',
    destination: 'github.com',
    protocol: 'HTTPS',
    trafficVolume: '0.7 MB',
    timestamp: '2026-10-21T09:55:00Z',
    source: 'Router Stats',
  },
  {
    id: 'n-004',
    deviceName: 'Lab PC 02',
    deviceIp: '192.168.1.102',
    destination: 'youtube.com',
    protocol: 'HTTPS',
    trafficVolume: '48.2 MB',
    timestamp: '2026-10-21T09:45:00Z',
    source: 'Router Stats',
  },
  {
    id: 'n-005',
    deviceName: 'Unknown Device',
    deviceIp: '192.168.1.200',
    destination: '8.8.8.8',
    protocol: 'DNS',
    trafficVolume: '0.01 MB',
    timestamp: '2026-10-21T09:30:00Z',
    source: 'ARP Table',
  },
  {
    id: 'n-006',
    deviceName: 'Lab PC 04',
    deviceIp: '192.168.1.104',
    destination: 'stackoverflow.com',
    protocol: 'HTTPS',
    trafficVolume: '2.1 MB',
    timestamp: '2026-10-21T09:20:00Z',
    source: 'Router Stats',
  },
];

// ─── Alerts ───────────────────────────────────────────────────────────────────
export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a-001',
    severity: 'critical',
    type: 'Unknown Device',
    device: 'unknown-7a3f (192.168.1.200)',
    time: '2026-10-21T09:30:00Z',
    status: 'open',
    description: 'An unregistered device was detected on the lab network.',
  },
  {
    id: 'a-002',
    severity: 'warning',
    type: 'Device Offline',
    device: 'Lab PC 03',
    time: '2026-10-21T07:15:00Z',
    status: 'open',
    description: 'Lab PC 03 stopped responding. Last seen 3 hours ago.',
  },
  {
    id: 'a-003',
    severity: 'warning',
    type: 'High Bandwidth',
    device: 'Lab PC 02',
    time: '2026-10-21T09:45:00Z',
    status: 'acknowledged',
    description: 'Lab PC 02 transferred 48.2 MB in a 5-minute window.',
  },
  {
    id: 'a-004',
    severity: 'info',
    type: 'Agent Unavailable',
    device: 'Lab PC 03',
    time: '2026-10-21T07:14:00Z',
    status: 'open',
    description: 'Monitoring agent on Lab PC 03 is not reachable.',
  },
  {
    id: 'a-005',
    severity: 'info',
    type: 'High CPU',
    device: 'Lab PC 02',
    time: '2026-10-21T09:55:00Z',
    status: 'acknowledged',
    description: 'CPU usage on Lab PC 02 exceeded 70% for over 10 minutes.',
  },
];

// ─── Sessions ─────────────────────────────────────────────────────────────────
export const MOCK_SESSIONS: Session[] = [
  {
    id: 's-001',
    userIdentifier: 'STU-2024-001',
    device: 'Lab PC 01',
    ipAddress: '192.168.1.101',
    loginTime: '2026-10-21T08:00:00Z',
    duration: '2h 4m',
    expiry: '2026-10-21T12:00:00Z',
    status: 'active',
  },
  {
    id: 's-002',
    userIdentifier: 'STU-2024-045',
    device: 'Lab PC 02',
    ipAddress: '192.168.1.102',
    loginTime: '2026-10-21T08:30:00Z',
    duration: '1h 34m',
    expiry: '2026-10-21T12:30:00Z',
    status: 'active',
  },
  {
    id: 's-003',
    userIdentifier: 'STU-2024-112',
    device: 'Lab PC 05',
    ipAddress: '192.168.1.105',
    loginTime: '2026-10-21T09:00:00Z',
    duration: '1h 4m',
    expiry: '2026-10-21T13:00:00Z',
    status: 'active',
  },
  {
    id: 's-004',
    userIdentifier: 'STU-2024-078',
    device: 'Lab PC 04',
    ipAddress: '192.168.1.104',
    loginTime: '2026-10-21T07:00:00Z',
    duration: '2h 0m',
    expiry: '2026-10-21T11:00:00Z',
    status: 'expired',
  },
  {
    id: 's-005',
    userIdentifier: 'STU-2024-033',
    device: 'Lab PC 01',
    ipAddress: '192.168.1.101',
    loginTime: '2026-10-20T14:00:00Z',
    duration: '3h 0m',
    expiry: '2026-10-20T17:00:00Z',
    status: 'revoked',
  },
];

// ─── Traffic Chart Data ───────────────────────────────────────────────────────
export const MOCK_TRAFFIC_DATA: TrafficDataPoint[] = [
  { time: '09:00', inbound: 120, outbound: 80 },
  { time: '09:10', inbound: 200, outbound: 140 },
  { time: '09:20', inbound: 180, outbound: 100 },
  { time: '09:30', inbound: 340, outbound: 210 },
  { time: '09:40', inbound: 150, outbound: 90 },
  { time: '09:50', inbound: 420, outbound: 280 },
  { time: '10:00', inbound: 310, outbound: 190 },
  { time: '10:10', inbound: 250, outbound: 150 },
];

// ─── Integration Status ───────────────────────────────────────────────────────
export const MOCK_INTEGRATION_STATUS: IntegrationStatus = {
  backend: false,
  database: false,
  monitoringAgent: false,
  routerSource: false,
  captiveGateway: false,
};

// ─── Admin User ───────────────────────────────────────────────────────────────
export const MOCK_ADMIN: AdminUser = {
  id: 'admin-001',
  name: 'Lab Administrator',
  email: 'admin@netlab.local',
  role: 'admin',
};
