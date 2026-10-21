// Login page — admin sign in

import { useState, type FormEvent } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import * as api from '../api';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await api.login(username.trim(), password);
    setLoading(false);
    if (result.success) {
      onLogin();
    } else {
      setError(result.message ?? 'Login failed. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0f172a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        background: '#fff', borderRadius: 12, padding: '40px 36px',
        width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 52, height: 52, borderRadius: 12,
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            marginBottom: 14,
          }}>
            <Shield size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>NETLAB</h1>
          <p style={{ fontSize: 13, color: '#64748b' }}>Smart Lab Monitoring System</p>
        </div>

        {/* Demo credentials notice */}
        <div style={{
          background: '#eff6ff', border: '1px solid #bfdbfe',
          borderRadius: 6, padding: '8px 12px', marginBottom: 20,
          fontSize: 12, color: '#1d4ed8',
        }}>
          <strong>Demo credentials:</strong> username&nbsp;
          <code style={{ background: '#dbeafe', padding: '0 4px', borderRadius: 3 }}>admin</code>
          &nbsp;/ password&nbsp;
          <code style={{ background: '#dbeafe', padding: '0 4px', borderRadius: 3 }}>demo1234</code>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              autoFocus
              disabled={loading}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
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
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              background: '#fee2e2', border: '1px solid #fca5a5',
              borderRadius: 6, padding: '8px 12px', marginBottom: 16,
              fontSize: 13, color: '#dc2626',
            }} role="alert">
              {error}
            </div>
          )}

          <button
            id="login-submit"
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', padding: '10px 20px', fontSize: 14 }}
          >
            {loading
              ? (<><div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} /> Signing in…</>)
              : 'Sign In'
            }
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: '#94a3b8' }}>
          NETLAB — Authorized administrators only.
        </p>
      </div>
    </div>
  );
}
