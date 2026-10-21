# NETLAB — Smart Lab Monitoring System

A clean, beginner-friendly administrator dashboard for authorized computer laboratories.
Built with **React + Vite + TypeScript + Tailwind CSS**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Log in (Demo Credentials)

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `demo1234` |

> ⚠️ These are **demo credentials for local development only**. Change them before any real deployment.

### 4. Captive Portal (Student Login)

Open [http://localhost:5173/portal](http://localhost:5173/portal)

Test Student IDs: `STU-2024-001` or `STU-2024-045` · password: `test1234`

---

## 📁 Project Structure

```
src/
├── api/            # API abstraction layer (mock → real)
│   └── index.ts   # All data fetching functions with TODO comments
├── components/
│   ├── Sidebar.tsx # Navigation sidebar
│   ├── Topbar.tsx  # Top bar
│   └── shared.tsx  # Reusable UI components
├── data/
│   └── mockData.ts # Sample/demo data (clearly labelled)
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── ComputersPage.tsx
│   ├── NetworkPage.tsx
│   ├── AlertsPage.tsx
│   ├── SessionsPage.tsx
│   ├── ReportsPage.tsx
│   ├── SettingsPage.tsx
│   └── CaptivePortalPage.tsx
├── types/
│   └── index.ts   # TypeScript data models
├── App.tsx        # Root app with routing
├── main.tsx       # React entry point
└── index.css      # Global styles / design tokens
```

---

## 🔌 Integrations — What's Real vs. Placeholder

| Integration | Status | Notes |
|---|---|---|
| Frontend UI | ✅ Real | All pages are functional with demo data |
| CSV Export | ✅ Real | Works with currently displayed demo data |
| Alert Acknowledge | ✅ Real | Updates UI state (demo only) |
| Admin Login | 🔶 Demo | Replace `api/login()` with real JWT endpoint |
| Backend API | ❌ Placeholder | Replace `src/api/index.ts` functions with `fetch()` calls |
| MongoDB | ❌ Placeholder | Not yet implemented |
| Monitoring Agent | ❌ Placeholder | Agent for lab PCs not yet built |
| Router Source | ❌ Placeholder | Router stats/DHCP/ARP integration pending |
| Captive Gateway | ❌ Placeholder | Session revoke requires real gateway config |
| ERP Authentication | ❌ Placeholder | Use your institution's auth provider |

---

## 🛠 How to Connect the Real Backend

All API calls are centralized in [`src/api/index.ts`](src/api/index.ts).
Each function has a `// TODO:` comment showing exactly how to replace it with a `fetch()` call.

**Example:**
```ts
// Before (mock):
export async function getDevices(): Promise<Device[]> {
  await delay();
  return [...MOCK_DEVICES];
}

// After (real backend):
export async function getDevices(): Promise<Device[]> {
  const response = await fetch('/api/devices', {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) throw new Error('Failed to fetch devices');
  return response.json();
}
```

---

## 🔒 Security Notes

- **Never commit real passwords or secrets** to version control.
- Use environment variables for all configuration (`.env` file, **not** committed).
- The admin login uses demo credentials only. Replace with real JWT authentication.
- The captive portal does **not** grant real network access — gateway enforcement must be implemented separately.
- Monitoring agents should only collect approved metrics on lab-owned/managed PCs.
- HTTPS packet content (passwords, messages, searches) is **not** accessible via traffic monitoring.

---

## ⚙️ Environment Variables (Phase 3+)

Create a `.env` file (see `.env.example`):

```env
# Backend API URL
VITE_API_URL=http://localhost:3001

# Do NOT commit real secrets
```

And a `.env.example` (safe to commit):

```env
VITE_API_URL=http://localhost:3001
```

---

## 📋 Development Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Complete UI with demo data | ✅ Done |
| 2 | Search, filters, CSV export, alert acknowledgement | ✅ Done |
| 3 | Backend (Node.js + Express + MongoDB) | ⏳ Pending |
| 4 | Real monitoring agent + network data sources | ⏳ Pending |
| 5 | Captive portal gateway integration | ⏳ Pending |
| 6 | Auth hardening, logging, penetration testing | ⏳ Pending |

---

## 🧪 Testing the UI

1. **Login**: Try wrong credentials → see error. Use `admin`/`demo1234` → enter dashboard.
2. **Dashboard**: See summary cards, traffic chart, alert list, device table. Note "Demo Data" badge.
3. **Computers**: Search by name/IP/MAC. Click "View" for device detail. Edit device name.
4. **Network Activity**: Filter by device or date. Read the visibility disclaimer.
5. **Alerts**: Filter by severity/status. Acknowledge an alert → see toast notification.
6. **Sessions**: Filter by status. Click "Revoke" → see gateway placeholder message.
7. **Reports**: Change date range. Click "Export CSV" for devices/alerts/sessions.
8. **Settings**: See all integrations marked as "Not connected" (demo mode).
9. **Portal**: Visit `/portal`, try `STU-2024-001`/`test1234`.

---

## 📦 Production Build

```bash
npm run build
# Output is in dist/
```

---

## ⚠️ Limitations (Phase 1)

- All data is sample/demo data — no real devices are monitored.
- The admin login does not use real tokens or session expiry.
- No real network traffic is captured or displayed.
- Session revocation has no effect on actual network access.
- The captive portal grants no real network access.
- ERP authentication is not integrated.

---

*NETLAB — Authorized use only. This system is for the exclusive use of authorized laboratory administrators.*
