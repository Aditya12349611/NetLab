// Sidebar navigation component

import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Monitor, Activity, Bell, Users,
  FileText, Settings, LogOut, Shield,
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/computers', icon: Monitor, label: 'Computers' },
  { to: '/network', icon: Activity, label: 'Network Activity' },
  { to: '/alerts', icon: Bell, label: 'Alerts' },
  { to: '/sessions', icon: Users, label: 'Sessions' },
  { to: '/reports', icon: FileText, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 6,
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Shield size={16} color="#fff" />
          </div>
          <div>
            <h1>NETLAB</h1>
            <p>Lab Monitoring</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-item${isActive ? ' active' : ''}`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: logout */}
      <div className="sidebar-bottom">
        <button className="sidebar-item" onClick={onLogout} style={{ color: '#f87171' }}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
