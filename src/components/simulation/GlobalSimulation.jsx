import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { 
  AlertTriangle, Zap, CloudRain, 
  DollarSign, ShieldAlert, Play, RotateCcw, Info,
  Search, Filter, Activity, Server, Box, Layers
} from 'lucide-react';

const hubData = [
  { id: 1, name: 'Singapore Port', lat: 1.3521, lng: 103.8198, type: 'Critical', color: '#10b981', size: 1.2 },
  { id: 2, name: 'Rotterdam Port', lat: 51.9225, lng: 4.4792, type: 'Critical', color: '#10b981', size: 1.2 },
  { id: 3, name: 'New York Hub', lat: 40.7128, lng: -74.0060, type: 'Major', color: '#3b82f6', size: 0.8 },
  { id: 4, name: 'London Center', lat: 51.5074, lng: -0.1278, type: 'Major', color: '#3b82f6', size: 0.8 },
  { id: 5, name: 'Tokyo Terminal', lat: 35.6762, lng: 139.6503, type: 'Major', color: '#3b82f6', size: 0.8 },
  { id: 6, name: 'Mumbai Port', lat: 19.0760, lng: 72.8777, type: 'Critical', color: '#10b981', size: 1.2 },
  { id: 7, name: 'Shanghai Port', lat: 31.2304, lng: 121.4737, type: 'Critical', color: '#10b981', size: 1.5 },
  { id: 8, name: 'Dubai Hub', lat: 25.2048, lng: 55.2708, type: 'Major', color: '#3b82f6', size: 0.8 },
];

const arcData = [
  { startLat: 1.3521, startLng: 103.8198, endLat: 51.9225, endLng: 4.4792, color: ['#3b82f6', '#10b981'] },
  { startLat: 31.2304, startLng: 121.4737, endLat: 1.3521, endLng: 103.8198, color: ['#3b82f6', '#10b981'] },
  { startLat: 51.9225, startLng: 4.4792, endLat: 40.7128, endLng: -74.0060, color: ['#3b82f6', '#10b981'] },
  { startLat: 19.0760, startLng: 72.8777, endLat: 25.2048, endLng: 55.2708, color: ['#3b82f6', '#10b981'] },
  { startLat: 25.2048, startLng: 55.2708, endLat: 51.5074, endLng: -0.1278, color: ['#3b82f6', '#10b981'] },
];

export const GlobalSimulation = ({ standalone = false }) => {
  const globeRef = useRef();
  
  const [disaster, setDisaster] = useState(0);
  const [war, setWar] = useState(0);
  const [weather, setWeather] = useState(0);
  const [financial, setFinancial] = useState(0);
  const [activeScenario, setActiveScenario] = useState('none');
  
  const [impactMetrics, setImpactMetrics] = useState({
    reliability: 98,
    cost: 0,
    delay: 0
  });

  useEffect(() => {
    const stress = (disaster * 1.5) + (war * 2.5) + (weather * 0.8) + (financial * 1.2);
    setImpactMetrics({
        reliability: Math.max(40, 98 - (stress * 0.5)),
        cost: stress * 450,
        delay: Math.round(stress / 10)
    });
  }, [disaster, war, weather, financial]);

  const applyScenario = (type) => {
    setActiveScenario(type);
    if (type === 'disaster') { setDisaster(80); setWar(10); setWeather(40); }
    if (type === 'conflict') { setDisaster(5); setWar(90); setFinancial(60); }
    if (type === 'economic') { setFinancial(85); setWar(20); setWeather(5); }
    if (type === 'none') { setDisaster(0); setWar(0); setWeather(0); setFinancial(0); }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: standalone ? 'column' : 'row', 
      height: standalone ? '600px' : 'calc(100vh - 180px)',
      backgroundColor: '#020617', // Deeper black for cyber feel
      color: '#fff',
      position: 'relative',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      {/* Cyberpunk HUD - Left */}
      <div style={{ 
        width: standalone ? '100%' : '380px', 
        padding: '2rem',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        zIndex: 10,
        backgroundColor: 'rgba(2, 6, 23, 0.8)',
        backdropFilter: 'blur(20px)'
      }}>
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-signal)', marginBottom: '8px' }}>
                <Activity size={18} />
                <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.2em' }}>SIMULATION ENGINE V2.0</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800 }}>Digital Twin Stress Test</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button 
                    onClick={() => applyScenario('disaster')}
                    style={{ 
                        padding: '12px', borderRadius: '8px', border: '1px solid #ef4444', 
                        backgroundColor: activeScenario === 'disaster' ? '#ef4444' : 'transparent',
                        color: '#fff', fontSize: '11px', fontWeight: 700, cursor: 'pointer'
                    }}
                >DISASTER SPIKE</button>
                <button 
                    onClick={() => applyScenario('conflict')}
                    style={{ 
                        padding: '12px', borderRadius: '8px', border: '1px solid #8b5cf6', 
                        backgroundColor: activeScenario === 'conflict' ? '#8b5cf6' : 'transparent',
                        color: '#fff', fontSize: '11px', fontWeight: 700, cursor: 'pointer'
                    }}
                >WAR CONFLICT</button>
            </div>

            <div className="control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Geopolitical Stress</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-signal)' }}>{war}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${war}%`, backgroundColor: '#8b5cf6', boxShadow: '0 0 10px #8b5cf6' }}></div>
                </div>
                <input type="range" min="0" max="100" value={war} onChange={(e) => {setWar(parseInt(e.target.value)); setActiveScenario('custom');}} style={{ width: '100%', marginTop: '10px', opacity: 0.5 }} />
            </div>

            <div className="control-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Weather disruption</span>
                    <span style={{ fontSize: '12px', color: 'var(--color-signal)' }}>{weather}%</span>
                </div>
                <div style={{ height: '6px', backgroundColor: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${weather}%`, backgroundColor: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }}></div>
                </div>
                <input type="range" min="0" max="100" value={weather} onChange={(e) => {setWeather(parseInt(e.target.value)); setActiveScenario('custom');}} style={{ width: '100%', marginTop: '10px', opacity: 0.5 }} />
            </div>
        </div>

        <div style={{ marginTop: 'auto', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', marginBottom: '1rem' }}>SYSTEM IMPACT ANALYSIS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Network Reliability</span>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: impactMetrics.reliability > 70 ? '#10b981' : '#ef4444' }}>{Math.round(impactMetrics.reliability)}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Cost Overhead</span>
                    <span style={{ fontSize: '13px', fontWeight: 800 }}>+₹{impactMetrics.cost.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>Lead Time Delay</span>
                    <span style={{ fontSize: '13px', fontWeight: 800 }}>+{impactMetrics.delay} Days</span>
                </div>
            </div>
        </div>
      </div>

      {/* Futuristic Globe - Right */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={hubData}
            pointColor="color"
            pointAltitude={0.05}
            pointRadius={0.5}
            pointsMerge={true}
            pointLabel="name"
            arcsData={arcData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={2}
            arcDashAnimateTime={2000}
            arcStroke={0.5}
            // Custom Styling for Cyber Feel
            showAtmosphere={true}
            atmosphereColor="#3b82f6"
            atmosphereDaylight={false}
        />

        {/* Floating Scan UI */}
        <div style={{ 
            position: 'absolute', top: '2rem', right: '2rem', 
            padding: '1.5rem', backgroundColor: 'rgba(2, 6, 23, 0.6)', 
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px',
            backdropFilter: 'blur(10px)', pointerEvents: 'none'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <Layers size={16} color="var(--color-signal)" />
                <span style={{ fontSize: '11px', fontWeight: 800 }}>MAPPING NODES: ACTIVE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {hubData.slice(0, 4).map(hub => (
                    <div key={hub.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
                        <span style={{ fontSize: '10px', color: '#94a3b8' }}>{hub.name}</span>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: hub.color }}>ONLINE</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
