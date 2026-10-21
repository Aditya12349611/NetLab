// Captive Portal — Student Login Page
// This is a separate mobile-friendly page.
// IMPORTANT: This is a UI placeholder only.
// - No real ERP credentials are used or validated here.
// - No real network access is granted by this form alone.
// - Test mode uses a mock credentials check clearly labelled.
// - Real authentication requires server-side verification and gateway enforcement.

import { useState, type FormEvent } from 'react';
import { Shield, Eye, EyeOff, AlertTriangle } from 'lucide-react';

// MOCK TEST MODE — local dev only, clearly labelled
// Replace with real server-side auth endpoint before any deployment
const TEST_CREDENTIALS: Record<string, string> = {
  'STU-2024-001': 'test1234',
  'STU-2024-045': 'test1234',
};

export default function CaptivePortalPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !password.trim()) {
      setError('Please enter your Student/ERP ID and password.');
      return;
    }
    setLoading(true);
    setError('');

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    // MOCK ONLY — this would be a server-side check in production
    if (TEST_CREDENTIALS[studentId.trim()] === password) {
      setSuccess(true);
    } else {
      setError('Invalid Student ID or password. Please check your credentials and try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: '32px 28px',
        width: '100%', maxWidth: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            marginBottom: 12,
          }}>
            <Shield size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>NETLAB</h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>Computer Lab Network Access</p>
        </div>

        {/* Test Mode Warning */}
        <div style={{
          background: '#fef3c7', border: '1px solid #fcd34d',
          borderRadius: 6, padding: '8px 12px', marginBottom: 16,
          display: 'flex', gap: 8, fontSize: 11, color: '#92400e',
        }}>
          <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>
            <strong>Test Mode:</strong> This form uses mock credentials for local development only.
            No real network access is granted. Actual deployment requires server-side authentication
            and gateway enforcement.
          </span>
        </div>

        {success ? (
          /* Success State */
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%', background: '#dcfce7',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14,
            }}>
              <svg width="24" height="24" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              Test Login Successful
            </h2>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
              In production, you would now be directed to the lab network. <strong>No real access
              has been granted</strong> — this is a demo UI only.
            </p>
            <div style={{
              background: '#f0f9ff', border: '1px solid #bae6fd',
              borderRadius: 6, padding: '10px 14px', fontSize: 12, color: '#0369a1',
            }}>
              Gateway enforcement must be implemented before this grants real network access.
            </div>
            <button
              className="btn btn-ghost"
              style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
              onClick={() => { setSuccess(false); setStudentId(''); setPassword(''); }}
            >
              Back to Login
            </button>
          </div>
        ) : (
          /* Login Form */
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                Student / ERP ID
              </label>
              <input
                id="student-id"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. STU-2024-001"
                autoComplete="username"
                disabled={loading}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="portal-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loading}
                  style={{ paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8',
                    padding: 0, display: 'flex',
                  }}
                  tabIndex={-1}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                background: '#fee2e2', border: '1px solid #fca5a5',
                borderRadius: 6, padding: '8px 12px', marginBottom: 14,
                fontSize: 12, color: '#dc2626',
              }} role="alert">
                {error}
              </div>
            )}

            <button
              id="portal-login"
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', padding: '10px 20px', fontSize: 14 }}
            >
              {loading
                ? (<><div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Verifying…</>)
                : 'Access Lab Network'
              }
            </button>

            {/* Test hint */}
            <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 12 }}>
              Test IDs: <code>STU-2024-001</code> or <code>STU-2024-045</code> · password: <code>test1234</code>
            </p>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 10, color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: 14 }}>
          NETLAB · Authorized use only · Contact admin for support
        </p>
      </div>
    </div>
  );
}
