import React, { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { 
  AlertTriangle, Zap, CloudRain, 
  DollarSign, ShieldAlert, Play, RotateCcw, Info,
  Search, Filter, Activity, Server, Box, Layers,
  Anchor, Ship, MapPin, ChevronRight, TrendingUp, TrendingDown,
  RefreshCw, MessageSquare, AlertCircle, X, Terminal
} from 'lucide-react';
import { Button } from '../ui/Button';

// Global Hubs Data
const hubData = [
  { id: 'asia', name: 'Asia Hub (Singapore)', lat: 1.3521, lng: 103.8198, type: 'Critical', color: '#10b981', size: 1.2 },
  { id: 'europe', name: 'Europe Hub (Rotterdam)', lat: 51.9225, lng: 4.4792, type: 'Critical', color: '#10b981', size: 1.2 },
  { id: 'namerica', name: 'N. America Hub (NY)', lat: 40.7128, lng: -74.0060, type: 'Major', color: '#3b82f6', size: 0.8 },
  { id: 'oceania', name: 'Oceania Hub (Sydney)', lat: -33.8688, lng: 151.2093, type: 'Major', color: '#3b82f6', size: 0.8 },
  { id: 'mideast', name: 'Middle East Hub (Dubai)', lat: 25.2048, lng: 55.2708, type: 'Major', color: '#3b82f6', size: 0.8 },
];

const initialArcs = [
  { startLat: 1.3521, startLng: 103.8198, endLat: 51.9225, endLng: 4.4792, color: ['#3b82f6', '#10b981'] },
  { startLat: 51.9225, startLng: 4.4792, endLat: 40.7128, endLng: -74.0060, color: ['#3b82f6', '#10b981'] },
  { startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, color: ['#3b82f6', '#10b981'] },
];

export const GlobalSimulation = ({ standalone = false }) => {
  const globeRef = useRef();
  
  // Step 1: User Input States
  const [supplierName, setSupplierName] = useState('TechFlow Systems');
  const [selectedRegion, setSelectedRegion] = useState('asia');
  const [disruptionType, setDisruptionType] = useState('weather');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  // Simulation Logic Data
  const [results, setResults] = useState(null);

  const runSimulation = () => {
    if (!supplierName.trim()) {
        alert("Please enter a supplier name to simulate.");
        return;
    }
    
    setIsSimulating(true);
    setShowOutput(false);
    
    // Animate Simulation Delay
    setTimeout(() => {
        const res = {
            before: { cost: 10000, time: 5, risk: 'Low' },
            after: { cost: 12000, time: 8, risk: 'High' },
            summary: "",
            suggestion: ""
        };

        if (disruptionType === 'weather') {
            res.after = { cost: 11000, time: 9, risk: 'Critical' };
            res.summary = `Disruption in ${selectedRegion.toUpperCase()} caused by severe cyclone, affecting ${supplierName}'s regional distribution node. Lead time increased by 4 days.`;
            res.suggestion = `Switch to Alternative Hub (Europe) to bypass ${supplierName}'s impacted ${selectedRegion} zone.`;
        } else if (disruptionType === 'port') {
            res.after = { cost: 13500, time: 10, risk: 'High' };
            res.summary = `Port congestion in ${selectedRegion} has bottlenecked ${supplierName}'s outbound shipments. Operational overhead increased by 35%.`;
            res.suggestion = `Reroute ${supplierName}'s freight to Secondary Port Hub (Sydney) to reduce bottleneck effects.`;
        } else {
            res.after = { cost: 15000, time: 12, risk: 'Severe' };
            res.summary = `Regional conflict in ${selectedRegion} has forced route closures for ${supplierName}. Strategic cost spike of 50% detected.`;
            res.suggestion = `Activate Emergency Supply Chain protocol; transition from ${supplierName} to backup Supplier B (Americas).`;
        }

        setResults(res);
        setIsSimulating(false);
        setShowOutput(true);
        
        // Focus Globe on region
        const regionHub = hubData.find(h => h.id === selectedRegion);
        if (globeRef.current && regionHub) {
            globeRef.current.pointOfView({ lat: regionHub.lat, lng: regionHub.lng, altitude: 2 }, 1000);
        }
    }, 2000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: standalone ? '800px' : 'calc(100vh - 180px)',
      backgroundColor: '#0f172a', // Deep Navy instead of Black
      color: '#fff',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
      
      {/* Background Grid Overlay */}
      <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px', pointerEvents: 'none'
      }}></div>

      {/* Floating Header */}
      <div style={{ 
          position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', 
          zIndex: 20, textAlign: 'center', pointerEvents: 'none'
      }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-emerald)', justifyContent: 'center', marginBottom: '8px' }}>
              <Terminal size={18} />
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.3em' }}>GLOBALCHAIN SIMULATOR V2.4</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.03em' }}>Supply Chain Stress Test</h2>
      </div>

      {/* LEFT: FLOATING INPUT PANEL */}
      <div style={{ 
        position: 'absolute', top: '2rem', left: '2rem', width: '360px', 
        padding: '2rem', borderRadius: '20px', zIndex: 10,
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        display: 'flex', flexDirection: 'column', gap: '1.5rem'
      }}>
        <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-emerald)', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Target Supplier</label>
            <input 
                type="text" 
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="Enter supplier name..." 
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.5)', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
        </div>

        <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Affected Region</label>
            <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.5)', color: '#fff', outline: 'none', cursor: 'pointer' }}
            >
                <option value="asia">Asia Pacific (Singapore)</option>
                <option value="europe">Europe (Rotterdam)</option>
                <option value="namerica">North America (New York)</option>
                <option value="oceania">Oceania (Sydney)</option>
                <option value="mideast">Middle East (Dubai)</option>
            </select>
        </div>

        <div>
            <label style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '12px', textTransform: 'uppercase' }}>Disruption Event</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['weather', 'port', 'conflict'].map((type) => (
                    <button 
                        key={type}
                        onClick={() => setDisruptionType(type)}
                        style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', 
                            border: disruptionType === type ? `2px solid ${type === 'weather' ? 'var(--color-emerald)' : type === 'port' ? 'var(--color-signal)' : '#ef4444'}` : '1px solid rgba(255,255,255,0.05)', 
                            backgroundColor: disruptionType === type ? 'rgba(255,255,255,0.05)' : 'transparent', color: '#fff', cursor: 'pointer', transition: 'all 0.2s ease'
                        }}
                    >
                        {type === 'weather' && <CloudRain size={18} color="var(--color-emerald)" />}
                        {type === 'port' && <Ship size={18} color="var(--color-signal)" />}
                        {type === 'conflict' && <ShieldAlert size={18} color="#ef4444" />}
                        <span style={{ fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>{type} Disruption</span>
                    </button>
                ))}
            </div>
        </div>

        <Button 
            variant="primary" 
            onClick={runSimulation}
            disabled={isSimulating}
            style={{ height: '54px', fontSize: '15px', fontWeight: 900, marginTop: '0.5rem', backgroundColor: 'var(--color-emerald)', borderRadius: '14px', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}
        >
            {isSimulating ? <RefreshCw className="spin" size={20} /> : <Play size={20} />} 
            {isSimulating ? 'Processing Models...' : 'Run Simulation'}
        </Button>
      </div>

      {/* CENTER: GLOBE VISUALIZATION */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={hubData}
            pointColor={(d) => (isSimulating || showOutput) && d.id === selectedRegion ? '#ef4444' : '#3b82f6'}
            pointAltitude={0.1}
            pointRadius={0.5}
            pointLabel="name"
            arcsData={initialArcs}
            arcColor={() => 'rgba(59, 130, 246, 0.3)'}
            arcDashLength={0.4}
            arcDashGap={2}
            arcDashAnimateTime={2000}
            atmosphereColor="#3b82f6"
            atmosphereDaylight={false}
            width={standalone ? 1200 : undefined}
            height={standalone ? 800 : undefined}
        />
        
        {/* Animated Ripple Effect on Highlighted Node */}
        {(isSimulating || showOutput) && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '3px solid #ef4444', animation: 'ripple 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
            </div>
        )}
      </div>

      {/* RIGHT: FLOATING OUTPUT PANEL */}
      {showOutput && results && (
          <div style={{ 
            position: 'absolute', top: '2rem', right: '2rem', width: '400px', 
            padding: '2rem', borderRadius: '20px', zIndex: 10,
            backgroundColor: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            display: 'flex', flexDirection: 'column', gap: '2rem',
            animation: 'slideIn 0.5s ease-out'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BarChart3 size={20} color="var(--color-signal)" />
                    <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Simulation Output</h3>
                </div>
                <button onClick={() => setShowOutput(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <section>
                <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                <th style={{ padding: '14px', textAlign: 'left' }}>Metric</th>
                                <th style={{ padding: '14px', textAlign: 'center' }}>Before</th>
                                <th style={{ padding: '14px', textAlign: 'center' }}>After</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '14px', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Cost</td>
                                <td style={{ padding: '14px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>₹{results.before.cost.toLocaleString()}</td>
                                <td style={{ padding: '14px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#ef4444', fontWeight: 800 }}>₹{results.after.cost.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '14px', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Delivery</td>
                                <td style={{ padding: '14px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{results.before.time}d</td>
                                <td style={{ padding: '14px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#ef4444', fontWeight: 800 }}>{results.after.time}d</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '14px', color: '#94a3b8' }}>Risk</td>
                                <td style={{ padding: '14px', textAlign: 'center', color: '#10b981', fontWeight: 800 }}>{results.before.risk}</td>
                                <td style={{ padding: '14px', textAlign: 'center', color: '#ef4444', fontWeight: 800 }}>{results.after.risk}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section style={{ padding: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '14px', borderLeft: '4px solid #ef4444' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                    <AlertCircle size={18} color="#ef4444" />
                    <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#ef4444', letterSpacing: '0.1em' }}>IMPACT SUMMARY</h4>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>"{results.summary}"</p>
            </section>

            <section style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '14px', borderLeft: '4px solid #10b981' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                    <RefreshCw size={18} color="#10b981" />
                    <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#10b981', letterSpacing: '0.1em' }}>SMART SUGGESTION</h4>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0, fontWeight: 700 }}>👉 {results.suggestion}</p>
            </section>
          </div>
      )}

      <style>{`
        @keyframes ripple {
            0% { transform: scale(1); opacity: 1; }
            70%, 100% { transform: scale(4); opacity: 0; }
        }
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
