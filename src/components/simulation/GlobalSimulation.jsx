import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import { 
  AlertTriangle, Zap, CloudRain, 
  DollarSign, ShieldAlert, Play, RotateCcw, Info,
  Search, Filter, Activity, Server, Box, Layers,
  Anchor, Ship, MapPin, ChevronRight, TrendingUp, TrendingDown,
  RefreshCw, MessageSquare, AlertCircle
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
  const [selectedRegion, setSelectedRegion] = useState('asia');
  const [disruptionType, setDisruptionType] = useState('weather');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  // Simulation Logic Data
  const [results, setResults] = useState(null);

  const runSimulation = () => {
    setIsSimulating(true);
    setShowOutput(false);
    
    // Animate Simulation Delay
    setTimeout(() => {
        let res = {
            before: { cost: 10000, time: 5, risk: 'Low' },
            after: { cost: 12000, time: 8, risk: 'High' },
            summary: "",
            suggestion: ""
        };

        if (disruptionType === 'weather') {
            res.after = { cost: 11000, time: 9, risk: 'Critical' };
            res.summary = `Disruption in ${selectedRegion.toUpperCase()} caused by severe cyclone, delaying ports by 4 days and increasing risk score.`;
            res.suggestion = `Switch to Hub (Europe) to bypass the ${selectedRegion} weather cluster.`;
        } else if (disruptionType === 'port') {
            res.after = { cost: 13500, time: 10, risk: 'High' };
            res.summary = `Port congestion in ${selectedRegion} has increased operational overhead by 35% and added 5 days to lead time.`;
            res.suggestion = `Reroute shipments to Secondary Port Hub (Sydney) to reduce bottleneck effects.`;
        } else {
            res.after = { cost: 15000, time: 12, risk: 'Severe' };
            res.summary = `Regional conflict in ${selectedRegion} has forced route closures, increasing costs by 50%.`;
            res.suggestion = `Activate Emergency Supply Chain protocol; transition to Supplier B (Americas).`;
        }

        setResults(res);
        setIsSimulating(false);
        setShowOutput(true);
        
        // Focus Globe on region
        const regionHub = hubData.find(h => h.id === selectedRegion);
        if (globeRef.current && regionHub) {
            globeRef.current.pointOfView({ lat: regionHub.lat, lng: regionHub.lng, altitude: 2 }, 1000);
        }
    }, 1500);
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return '#10b981';
    if (risk === 'High') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'row', 
      height: standalone ? '800px' : 'calc(100vh - 180px)',
      backgroundColor: '#020617', 
      color: '#fff',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '16px',
      overflow: 'hidden'
    }}>
      
      {/* LEFT: STEP 1 - USER INPUT */}
      <div style={{ 
        width: '380px', 
        padding: '2rem',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        zIndex: 10,
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(20px)'
      }}>
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-emerald)', marginBottom: '8px' }}>
                <Activity size={18} />
                <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.2em' }}>SIMULATION ENGINE</span>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Digital Twin Simulation</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Region Selection */}
            <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Step 1: Select Region</label>
                <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff', outline: 'none' }}
                >
                    <option value="asia">Asia Pacific (Singapore)</option>
                    <option value="europe">Europe (Rotterdam)</option>
                    <option value="namerica">North America (New York)</option>
                    <option value="oceania">Oceania (Sydney)</option>
                    <option value="mideast">Middle East (Dubai)</option>
                </select>
            </div>

            {/* Disruption Selection */}
            <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', display: 'block', marginBottom: '10px', textTransform: 'uppercase' }}>Step 2: Select Disruption Type</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button 
                        onClick={() => setDisruptionType('weather')}
                        style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', border: disruptionType === 'weather' ? '2px solid var(--color-emerald)' : '1px solid #334155', 
                            backgroundColor: disruptionType === 'weather' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', color: '#fff', cursor: 'pointer', textAlign: 'left'
                        }}
                    >
                        <CloudRain size={18} color={disruptionType === 'weather' ? 'var(--color-emerald)' : '#94a3b8'} />
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 700 }}>Weather Disruption</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Cyclone, Floods, Heavy Rain</div>
                        </div>
                    </button>
                    <button 
                        onClick={() => setDisruptionType('port')}
                        style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', border: disruptionType === 'port' ? '2px solid var(--color-signal)' : '1px solid #334155', 
                            backgroundColor: disruptionType === 'port' ? 'rgba(14, 165, 233, 0.1)' : 'transparent', color: '#fff', cursor: 'pointer', textAlign: 'left'
                        }}
                    >
                        <Ship size={18} color={disruptionType === 'port' ? 'var(--color-signal)' : '#94a3b8'} />
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 700 }}>Port / Logistics Delay</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Congestion, Labor Strike</div>
                        </div>
                    </button>
                    <button 
                        onClick={() => setDisruptionType('conflict')}
                        style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', border: disruptionType === 'conflict' ? '2px solid #ef4444' : '1px solid #334155', 
                            backgroundColor: disruptionType === 'conflict' ? 'rgba(239, 68, 68, 0.1)' : 'transparent', color: '#fff', cursor: 'pointer', textAlign: 'left'
                        }}
                    >
                        <ShieldAlert size={18} color={disruptionType === 'conflict' ? '#ef4444' : '#94a3b8'} />
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: 700 }}>Regional Conflict</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Trade War, Geopolitics</div>
                        </div>
                    </button>
                </div>
            </div>

            <Button 
                variant="primary" 
                onClick={runSimulation}
                disabled={isSimulating}
                style={{ height: '50px', fontSize: '15px', fontWeight: 800, marginTop: '1rem', backgroundColor: 'var(--color-emerald)' }}
            >
                {isSimulating ? <RefreshCw className="animate-spin" size={20} /> : <Play size={20} />} 
                {isSimulating ? 'Processing Models...' : 'Run Simulation'}
            </Button>
        </div>
      </div>

      {/* CENTER: GLOBE VISUALIZATION */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={hubData}
            pointColor={(d) => (isSimulating || showOutput) && d.id === selectedRegion ? '#ef4444' : d.color}
            pointAltitude={0.1}
            pointRadius={1}
            pointLabel="name"
            arcsData={initialArcs}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={2}
            arcDashAnimateTime={2000}
            atmosphereColor="#10b981"
            atmosphereDaylight={false}
        />
        
        {/* Animated Ripple Effect on Highlighted Node */}
        {(isSimulating || showOutput) && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #ef4444', animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
            </div>
        )}
      </div>

      {/* RIGHT: OUTPUT SECTION (Step 2, 3, 4) */}
      <div style={{ 
        width: showOutput ? '420px' : '0px', 
        opacity: showOutput ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: showOutput ? '2rem' : '0',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(30px)',
        borderLeft: '1px solid rgba(255,255,255,0.05)',
        zIndex: 10,
        overflowY: 'auto'
      }}>
        {showOutput && results && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Step 2: Before vs After Table */}
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                        <BarChart3 size={20} color="var(--color-signal)" />
                        <h3 style={{ fontSize: '16px', fontWeight: 800 }}>Output: Before vs After</h3>
                    </div>
                    <div style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead>
                                <tr style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Metric</th>
                                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Before</th>
                                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>After</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' }}>Procurement Cost</td>
                                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>₹{results.before.cost.toLocaleString()}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#ef4444', fontWeight: 700 }}>₹{results.after.cost.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' }}>Delivery Time</td>
                                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{results.before.time} Days</td>
                                    <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#ef4444', fontWeight: 700 }}>{results.after.time} Days</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', color: '#94a3b8' }}>Risk Index</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#10b981', fontWeight: 700 }}>{results.before.risk}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#ef4444', fontWeight: 700 }}>{results.after.risk}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Step 3: Impact Summary */}
                <section style={{ padding: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                        <AlertCircle size={18} color="#ef4444" />
                        <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#ef4444', letterSpacing: '0.1em' }}>STEP 3: IMPACT SUMMARY</h4>
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0, fontWeight: 500 }}>"{results.summary}"</p>
                </section>

                {/* Step 4: Smart Suggestion */}
                <section style={{ padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                        <RefreshCw size={18} color="#10b981" />
                        <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#10b981', letterSpacing: '0.1em' }}>STEP 4: SMART SUGGESTION</h4>
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0, fontWeight: 600 }}>👉 {results.suggestion}</p>
                </section>

                <Button variant="ghost" onClick={() => setShowOutput(false)} style={{ color: '#94a3b8', fontSize: '12px' }}>
                    <RotateCcw size={14} /> Reset Simulation View
                </Button>
            </div>
        )}
      </div>

      <style>{`
        @keyframes ping {
            0% { transform: scale(1); opacity: 1; }
            70%, 100% { transform: scale(3); opacity: 0; }
        }
        .animate-spin {
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
