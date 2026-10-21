// Top navigation bar

import { Circle, ChevronDown } from 'lucide-react';
import type { IntegrationStatus, AdminUser } from '../types';

interface TopbarProps {
  title: string;
  admin: AdminUser;
  integrationStatus: IntegrationStatus;
}

export default function Topbar({ title, admin, integrationStatus }: TopbarProps) {
  const anyConnected = Object.values(integrationStatus).some(Boolean);

  return (
    <header className="topbar">
      <span className="topbar-title">{title}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Integration status indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
          <Circle
            size={8}
            fill={anyConnected ? '#16a34a' : '#f59e0b'}
            color={anyConnected ? '#16a34a' : '#f59e0b'}
          />
          <span>{anyConnected ? 'Connected' : 'Demo Mode'}</span>
        </div>

        {/* Admin user */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 10px', borderRadius: 6,
          border: '1px solid #e2e8f0', cursor: 'pointer',
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: '50%',
            background: '#dbeafe', color: '#1d4ed8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700,
          }}>
            {admin.name.charAt(0)}
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#1e293b' }}>{admin.name}</span>
          <ChevronDown size={13} color="#94a3b8" />
        </div>
      </div>
    </header>
  );
}
