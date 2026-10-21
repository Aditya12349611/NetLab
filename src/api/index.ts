/**
 * NETLAB API Layer
 * ─────────────────────────────────────────────────────────────────────────────
 * All data fetching goes through this module.
 * Currently returns mock data. Replace each function body with real fetch()
 * calls once the backend is ready.
 *
 * Pattern:
 *   const devices = await api.getDevices();
 */

import {
  MOCK_DEVICES,
  MOCK_NETWORK_EVENTS,
  MOCK_ALERTS,
  MOCK_SESSIONS,
  MOCK_TRAFFIC_DATA,
  MOCK_INTEGRATION_STATUS,
} from '../data/mockData';
import type {
  Device,
  NetworkEvent,
  Alert,
  AlertStatus,
  Session,
  TrafficDataPoint,
  IntegrationStatus,
} from '../types';

// Simulate a short network delay for realistic UX
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

// ─── Auth ─────────────────────────────────────────────────────────────────────

/** Verify admin credentials. Replace with POST /api/auth/login in production. */
export async function login(
  username: string,
  password: string
): Promise<{ success: boolean; message?: string }> {
  await delay(600);
  // DEMO ONLY — do not use real credentials here.
  if (username === 'admin' && password === 'demo1234') {
    return { success: true };
  }
  return { success: false, message: 'Invalid username or password.' };
}

// ─── Devices ─────────────────────────────────────────────────────────────────

export async function getDevices(): Promise<Device[]> {
  await delay();
  // TODO: return fetch('/api/devices').then(r => r.json());
  return [...MOCK_DEVICES];
}

export async function getDevice(id: string): Promise<Device | undefined> {
  await delay();
  // TODO: return fetch(`/api/devices/${id}`).then(r => r.json());
  return MOCK_DEVICES.find((d) => d.id === id);
}

export async function updateDeviceName(
  id: string,
  name: string
): Promise<Device | undefined> {
  await delay();
  // TODO: return fetch(`/api/devices/${id}`, { method:'PATCH', body: JSON.stringify({name}) }).then(r=>r.json());
  const device = MOCK_DEVICES.find((d) => d.id === id);
  if (device) device.name = name;
  return device;
}

// ─── Network Events ───────────────────────────────────────────────────────────

export async function getNetworkEvents(filters?: {
  deviceIp?: string;
  from?: string;
  to?: string;
}): Promise<NetworkEvent[]> {
  await delay();
  // TODO: replace with fetch('/api/network-events', { ... })
  let events = [...MOCK_NETWORK_EVENTS];
  if (filters?.deviceIp) {
    events = events.filter((e) => e.deviceIp === filters.deviceIp);
  }
  return events;
}

// ─── Alerts ───────────────────────────────────────────────────────────────────

export async function getAlerts(): Promise<Alert[]> {
  await delay();
  // TODO: return fetch('/api/alerts').then(r => r.json());
  return [...MOCK_ALERTS];
}

export async function acknowledgeAlert(id: string): Promise<Alert | undefined> {
  await delay(300);
  // TODO: return fetch(`/api/alerts/${id}/acknowledge`, { method:'POST' }).then(r=>r.json());
  const alert = MOCK_ALERTS.find((a) => a.id === id);
  if (alert) alert.status = 'acknowledged' as AlertStatus;
  return alert;
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export async function getSessions(): Promise<Session[]> {
  await delay();
  // TODO: return fetch('/api/sessions').then(r => r.json());
  return [...MOCK_SESSIONS];
}

export async function revokeSession(_id: string): Promise<{ success: boolean; message: string }> {
  await delay(500);
  // DEMO: gateway integration not implemented. This is a UI placeholder only.
  // TODO: return fetch(`/api/sessions/${id}/revoke`, { method:'POST' }).then(r=>r.json());
  return {
    success: false,
    message:
      'Session revocation is a UI placeholder. Gateway enforcement is not yet configured. No real session was revoked.',
  };
}

// ─── Traffic ─────────────────────────────────────────────────────────────────

export async function getTrafficData(): Promise<TrafficDataPoint[]> {
  await delay();
  // TODO: return fetch('/api/traffic').then(r => r.json());
  return [...MOCK_TRAFFIC_DATA];
}

// ─── Integration Status ───────────────────────────────────────────────────────

export async function getIntegrationStatus(): Promise<IntegrationStatus> {
  await delay(200);
  // TODO: return fetch('/api/status').then(r => r.json());
  return { ...MOCK_INTEGRATION_STATUS };
}
