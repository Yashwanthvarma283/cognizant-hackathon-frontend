import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Activity } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'consumer';

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'consumer') navigate('/dashboard/consumer');
    if (role === 'supplier') navigate('/dashboard/supplier');
    if (role === 'admin') navigate('/dashboard/admin');
  };

  const getRoleTitle = () => {
    if (role === 'supplier') return 'Supplier Portal';
    if (role === 'admin') return 'Admin Portal';
    return 'Consumer Portal';
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-secondary)' }}>
      
      {/* Simple Header */}
      <header className="container-centered" style={{ height: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', maxWidth: '100%', borderBottom: '1px solid var(--border-light)' }}>
        <div 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
            <Activity color="var(--color-emerald)" size={20} />
            GLOBALCHAIN
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h2 className="h-section" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{getRoleTitle()} Login</h2>
                <p className="text-sub" style={{ fontSize: '14px' }}>Please enter your credentials to access the secure node monitor.</p>
            </div>

            <div 
              className="card-flat" 
              style={{ 
                padding: '3rem', 
                backgroundColor: 'white', 
                borderRadius: '16px',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)',
                border: '1px solid var(--border-light)'
              }}
            >
                <form onSubmit={handleLogin}>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            placeholder="yourname@company.com" 
                            required 
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '15px', outline: 'none' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            Password
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            required 
                            style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '15px', outline: 'none' }}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        variant="primary" 
                        style={{ width: '100%', height: '3.5rem', fontSize: '15px', fontWeight: 700, backgroundColor: 'var(--text-primary)', color: 'white', marginTop: '1rem', borderRadius: '8px' }}
                    >
                        Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                    </Button>
                </form>
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Need help? Contact system support.
                </p>
            </div>
        </div>
      </main>

      <footer style={{ padding: '1.5rem', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
         © 2026 GlobalChain Platform
      </footer>
    </div>
  );
};
