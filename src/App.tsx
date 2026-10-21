// Main App — routing, auth state, and layout

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, Navigate, useLocation,
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ComputersPage from './pages/ComputersPage';
import NetworkPage from './pages/NetworkPage';
import AlertsPage from './pages/AlertsPage';
import SessionsPage from './pages/SessionsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import CaptivePortalPage from './pages/CaptivePortalPage';
import { MOCK_ADMIN, MOCK_INTEGRATION_STATUS } from './data/mockData';
import type { IntegrationStatus } from './types';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/computers': 'Computers',
  '/network': 'Network Activity',
  '/alerts': 'Alerts',
  '/sessions': 'Sessions',
  '/reports': 'Reports',
  '/settings': 'Settings',
};

// ─── Auth Guard ───────────────────────────────────────────────────────────────
function RequireAuth({ isLoggedIn, children }: { isLoggedIn: boolean; children: React.ReactElement }) {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

// ─── Authenticated Layout ─────────────────────────────────────────────────────
function AppLayout({ onLogout, integrations }: { onLogout: () => void; integrations: IntegrationStatus }) {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? 'NETLAB';

  return (
    <div className="app-layout">
      <Sidebar onLogout={onLogout} />
      <div className="main-area">
        <Topbar title={title} admin={MOCK_ADMIN} integrationStatus={integrations} />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/computers" element={<ComputersPage />} />
            <Route path="/network" element={<NetworkPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  // Simple session persistence via sessionStorage (no real JWT)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('netlab_auth') === 'true';
  });

  const handleLogin = () => {
    sessionStorage.setItem('netlab_auth', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('netlab_auth');
    setIsLoggedIn(false);
  };

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
        } />
        <Route path="/portal" element={<CaptivePortalPage />} />

        {/* Protected app */}
        <Route path="/*" element={
          <RequireAuth isLoggedIn={isLoggedIn}>
            <AppLayout onLogout={handleLogout} integrations={MOCK_INTEGRATION_STATUS} />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  );
}
