import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { 
  Activity, 
  ShieldCheck, 
  BarChart3, 
  Globe2, 
  Zap, 
  Database,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { GlobalSimulation } from '../components/simulation/GlobalSimulation';

const mockData = [{v: 30}, {v: 50}, {v: 45}, {v: 70}, {v: 60}, {v: 90}, {v: 85}];

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Animated SVG Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.04 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="black" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path d="M -100 200 Q 300 400 700 200 T 1500 300" fill="none" stroke="black" strokeWidth="3" strokeDasharray="10,10">
            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Strict Minimal Inline Header */}
      <header className="container-centered" style={{ height: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border-light)', position: 'relative', zIndex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity color="var(--color-emerald)" size={20} />
            GLOBALCHAIN
        </div>
      </header>

      <main className="container-centered" style={{ padding: 'var(--spacing-lg) 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        
        {/* Core Hero Stack */}
        <section style={{ maxWidth: '48rem', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
            
            <h1 className="h-hero">
                GlobalChain: Supply Chain Resilience
            </h1>
            
            <p className="text-sub" style={{ maxWidth: '38rem' }}>
                Real-time node mapping and risk simulation for the modern enterprise.
            </p>

            <Button 
                onClick={() => navigate('/login')} 
                style={{ marginTop: '1rem', padding: '0.75rem 2rem', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center' }}
            >
                Get Started <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Button>

            {/* Role-Based Login Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '100%', maxWidth: '42rem', marginTop: '3rem' }}>
                <div 
                    onClick={() => navigate('/login?role=consumer')} 
                    className="card-flat" 
                    style={{ cursor: 'pointer', padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>01 ACCESS</div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>Consumer Portal</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Ingest mesh signals</div>
                </div>
                <div 
                    onClick={() => navigate('/login?role=supplier')} 
                    className="card-flat" 
                    style={{ cursor: 'pointer', padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>02 ACCESS</div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>Supplier Portal</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Manage vendor clusters</div>
                </div>
                <div 
                    onClick={() => navigate('/login?role=admin')} 
                    className="card-flat" 
                    style={{ cursor: 'pointer', padding: '1.5rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px' }}
                >
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>03 ACCESS</div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>System Admin</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Architecture control</div>
                </div>
            </div>
        </section>

        {/* Dashboard Preview - Filled with real-looking data */}
        <section>
            <div className="card-flat" style={{ padding: '0', backgroundColor: 'var(--bg-secondary)', maxWidth: '58rem', margin: '0 auto', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.5rem', backgroundColor: '#fdfdfd', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
                    </div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8' }}>PLATFORM PREVIEW: ANALYTICS CORE</div>
                </div>
                <div style={{ padding: '0' }}>
                    <GlobalSimulation standalone={true} />
                </div>
            </div>
        </section>

      </main>

      {/* Footer Minimal */}
      <footer style={{ padding: 'var(--spacing-lg) 0', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
            © 2026 GLOBALCHAIN CORP
        </p>
      </footer>
    </div>
  );
};
