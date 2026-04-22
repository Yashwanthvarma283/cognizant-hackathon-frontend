import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { 
  AlertTriangle, Globe as GlobeIcon, Zap, CloudRain, 
  DollarSign, ShieldAlert, Play, RotateCcw, Info
} from 'lucide-react';
import { Button } from '../ui/Button';

// Global Hubs Data
const hubData = [
  { id: 1, name: 'Singapore', lat: 1.3521, lng: 103.8198, type: 'Port', color: '#10b981' },
  { id: 2, name: 'Rotterdam', lat: 51.9225, lng: 4.4792, type: 'Port', color: '#10b981' },
  { id: 3, name: 'New York', lat: 40.7128, lng: -74.0060, type: 'Hub', color: '#3b82f6' },
  { id: 4, name: 'London', lat: 51.5074, lng: -0.1278, type: 'Hub', color: '#3b82f6' },
  { id: 5, name: 'Tokyo', lat: 35.6762, lng: 139.6503, type: 'Port', color: '#10b981' },
  { id: 6, name: 'Mumbai', lat: 19.0760, lng: 72.8777, type: 'Port', color: '#10b981' },
  { id: 7, name: 'Berlin', lat: 52.5200, lng: 13.4050, type: 'Hub', color: '#3b82f6' },
  { id: 8, name: 'Sydney', lat: -33.8688, lng: 151.2093, type: 'Port', color: '#10b981' },
];

const arcData = [
  { startLat: 1.3521, startLng: 103.8198, endLat: 51.9225, endLng: 4.4792, color: '#3b82f6' },
  { startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, color: '#3b82f6' },
  { startLat: 51.9225, startLng: 4.4792, endLat: 40.7128, endLng: -74.0060, color: '#3b82f6' },
  { startLat: 19.0760, startLng: 72.8777, endLat: 51.5074, endLng: -0.1278, color: '#3b82f6' },
  { startLat: 40.7128, startLng: -74.0060, endLat: -33.8688, endLng: 151.2093, color: '#3b82f6' },
];

export const GlobalSimulation = ({ standalone = false }) => {
  const globeRef = useRef();
  
  // Simulation States
  const [disaster, setDisaster] = useState(0);
  const [war, setWar] = useState(0);
  const [weather, setWeather] = useState(0);
  const [financial, setFinancial] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Results States
  const [riskScore, setRiskScore] = useState(12);
  const [latency, setLatency] = useState(100);
  const [costDelta, setCostDelta] = useState(0);

  useEffect(() => {
    // Basic calculation for visual impact
    const totalImpact = (disaster * 2) + (war * 3) + weather + financial;
    setRiskScore(12 + totalImpact);
    setLatency(100 + (totalImpact * 2.5));
    setCostDelta(totalImpact * 120);
    
    // Auto-rotate slower if high risk
    if (globeRef.current) {
        globeRef.current.controls().autoRotate = !isSimulating;
        globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, [disaster, war, weather, financial, isSimulating]);

  const resetSim = () => {
    setDisaster(0);
    setWar(0);
    setWeather(0);
    setFinancial(0);
    setIsSimulating(false);
  };

  const getStatusColor = (score) => {
    if (score < 25) return '#10b981';
    if (score < 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: standalone ? 'column' : 'row', 
      height: standalone ? 'auto' : 'calc(100vh - 180px)',
      gap: '1.5rem',
      backgroundColor: '#0f172a',
      borderRadius: '16px',
      overflow: 'hidden',
      color: '#fff',
      padding: '1rem',
      position: 'relative'
    }}>
      
      {/* Sidebar Controls */}
      <div style={{ 
        width: standalone ? '100%' : '320px', 
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        zIndex: 10,
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={20} color="#f59e0b" /> Engine Parameters
            </h3>
            <p style={{ fontSize: '11px', color: '#94a3b8' }}>Adjust variables to simulate global disruptions</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="sim-control">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <AlertTriangle size={14} /> Natural Disasters
                    </label>
                    <span style={{ fontSize: '12px', color: disaster > 0 ? '#ef4444' : '#94a3b8' }}>{disaster}%</span>
                </div>
                <input type="range" min="0" max="100" value={disaster} onChange={(e) => setDisaster(e.target.value)} style={{ width: '100%', accentColor: '#ef4444' }} />
            </div>

            <div className="sim-control">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ShieldAlert size={14} /> Geopolitical War
                    </label>
                    <span style={{ fontSize: '12px', color: war > 0 ? '#ef4444' : '#94a3b8' }}>{war}%</span>
                </div>
                <input type="range" min="0" max="100" value={war} onChange={(e) => setWar(e.target.value)} style={{ width: '100%', accentColor: '#8b5cf6' }} />
            </div>

            <div className="sim-control">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CloudRain size={14} /> Weather Impact
                    </label>
                    <span style={{ fontSize: '12px', color: weather > 0 ? '#3b82f6' : '#94a3b8' }}>{weather}%</span>
                </div>
                <input type="range" min="0" max="100" value={weather} onChange={(e) => setWeather(e.target.value)} style={{ width: '100%', accentColor: '#3b82f6' }} />
            </div>

            <div className="sim-control">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <DollarSign size={14} /> Financial Stress
                    </label>
                    <span style={{ fontSize: '12px', color: financial > 0 ? '#10b981' : '#94a3b8' }}>{financial}%</span>
                </div>
                <input type="range" min="0" max="100" value={financial} onChange={(e) => setFinancial(e.target.value)} style={{ width: '100%', accentColor: '#10b981' }} />
            </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
            <button 
                onClick={() => setIsSimulating(!isSimulating)}
                style={{ 
                    flex: 1, padding: '10px', borderRadius: '8px', border: 'none', 
                    backgroundColor: isSimulating ? '#ef4444' : '#10b981', color: '#fff', 
                    fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' 
                }}
            >
                {isSimulating ? <RotateCcw size={16} /> : <Play size={16} />} {isSimulating ? 'Stop' : 'Run Sim'}
            </button>
            <button onClick={resetSim} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: 'transparent', color: '#fff', cursor: 'pointer' }}>
                <RotateCcw size={16} />
            </button>
        </div>
      </div>

      {/* Main Globe Area */}
      <div style={{ flex: 1, position: 'relative', minHeight: standalone ? '400px' : 'auto' }}>
        <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={hubData}
            pointColor="color"
            pointAltitude={0.1}
            pointRadius={0.8}
            pointsMerge={true}
            pointLabel="name"
            arcsData={arcData}
            arcColor={() => (isSimulating && (war > 50 || disaster > 50)) ? '#ef4444' : '#3b82f6'}
            arcDashLength={0.4}
            arcDashGap={4}
            arcDashAnimateTime={isSimulating ? 1000 : 4000}
            animateIn={true}
            width={standalone ? undefined : undefined} // Uses container size
        />

        {/* Real-time Metrics Overlay */}
        <div style={{ 
            position: 'absolute', top: '20px', right: '20px', 
            backgroundColor: 'rgba(15, 23, 42, 0.8)', padding: '1.25rem', 
            borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)', width: '220px', display: 'flex', flexDirection: 'column', gap: '1rem'
        }}>
            <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, marginBottom: '4px' }}>DYNAMIC RISK SCORE</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: getStatusColor(riskScore) }}>{Math.round(riskScore)}%</div>
            </div>
            <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, marginBottom: '4px' }}>LATENCY IMPACT</div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>+{Math.round(latency - 100)}%</div>
                <div style={{ height: '4px', background: '#334155', borderRadius: '2px', marginTop: '6px' }}>
                    <div style={{ height: '100%', width: `${Math.min(100, latency - 100)}%`, background: '#f59e0b', borderRadius: '2px' }}></div>
                </div>
            </div>
            <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800, marginBottom: '4px' }}>SHIPPING COST DELTA</div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#10b981' }}>+₹{costDelta.toLocaleString()}</div>
            </div>
        </div>
        
        {/* Help Tip */}
        <div style={{ 
            position: 'absolute', bottom: '20px', left: '20px', 
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '11px', color: '#94a3b8', backgroundColor: 'rgba(0,0,0,0.4)',
            padding: '6px 12px', borderRadius: '20px'
        }}>
            <Info size={14} /> Drag to rotate • Scroll to zoom • Toggle parameters to see impacts
        </div>
      </div>
    </div>
  );
};
