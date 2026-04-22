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

// Global Hubs / Suppliers Data
const suppliersData = [
  { id: 'sup1', name: 'TechFlow Systems', region: 'asia', lat: 1.3521, lng: 103.8198, color: '#10b981' },
  { id: 'sup2', name: 'Global Logistics', region: 'europe', lat: 51.9225, lng: 4.4792, color: '#10b981' },
  { id: 'sup3', name: 'Nordic Steel', region: 'europe', lat: 59.3293, lng: 18.0686, color: '#10b981' },
  { id: 'sup4', name: 'Pacific Circuits', region: 'asia', lat: 35.6762, lng: 139.6503, color: '#10b981' },
  { id: 'sup5', name: 'Atlas Freight', region: 'namerica', lat: 40.7128, lng: -74.0060, color: '#3b82f6' },
  { id: 'sup6', name: 'Solaris Energy', region: 'oceania', lat: -33.8688, lng: 151.2093, color: '#3b82f6' },
  { id: 'sup7', name: 'Quantum Chips', region: 'asia', lat: 22.3193, lng: 114.1694, color: '#10b981' },
  { id: 'sup8', name: 'EuroResin', region: 'europe', lat: 48.8566, lng: 2.3522, color: '#10b981' },
  { id: 'sup9', name: 'Summit Metals', region: 'namerica', lat: 34.0522, lng: -118.2437, color: '#3b82f6' },
  { id: 'sup10', name: 'Desert Oasis Hub', region: 'mideast', lat: 25.2048, lng: 55.2708, color: '#3b82f6' },
];

const regionsCoords = {
    asia: { lat: 1.3521, lng: 103.8198 },
    europe: { lat: 51.9225, lng: 4.4792 },
    namerica: { lat: 40.7128, lng: -74.0060 },
    oceania: { lat: -33.8688, lng: 151.2093 },
    mideast: { lat: 25.2048, lng: 55.2708 }
};

export const GlobalSimulation = ({ standalone = false }) => {
  const globeRef = useRef();
  
  // Step 1: User Input States
  const [selectedSupplierId, setSelectedSupplierId] = useState('sup1');
  const [selectedRegion, setSelectedRegion] = useState('asia');
  const [disruptionType, setDisruptionType] = useState('weather');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  // Simulation Logic Data
  const [results, setResults] = useState(null);
  const [activeArcs, setActiveArcs] = useState([]);

  const currentSupplier = useMemo(() => suppliersData.find(s => s.id === selectedSupplierId), [selectedSupplierId]);

  // Point globe to supplier when selected
  useEffect(() => {
    if (globeRef.current && currentSupplier) {
        globeRef.current.pointOfView({ lat: currentSupplier.lat, lng: currentSupplier.lng, altitude: 2 }, 1000);
    }
  }, [selectedSupplierId]);

  const runSimulation = () => {
    setIsSimulating(true);
    setShowOutput(false);
    setActiveArcs([]);
    
    // Animate Simulation Delay
    setTimeout(() => {
        const res = {
            before: { cost: 10000, time: 5, risk: 'Low' },
            after: { cost: 12000, time: 8, risk: 'High' },
            summary: "",
            suggestion: ""
        };

        const isEffected = currentSupplier.region === selectedRegion;
        
        if (isEffected) {
            res.after = { cost: 15000, time: 12, risk: 'Critical' };
            res.summary = `CRITICAL: ${currentSupplier.name} is DIRECTLY impacted by the ${disruptionType} in ${selectedRegion.toUpperCase()}. Supply chain lines are severed.`;
            res.suggestion = `DANGER: Reroute immediately through Backup Hub (Americas) to avoid the ${selectedRegion} zone.`;
            
            // Show Danger Arc (Red) and Alternative Arc (Green)
            const dangerArc = {
                startLat: currentSupplier.lat, startLng: currentSupplier.lng,
                endLat: regionsCoords[selectedRegion].lat, endLng: regionsCoords[selectedRegion].lng,
                color: '#ef4444' // DANGER RED
            };
            const altRegion = selectedRegion === 'asia' ? 'europe' : 'namerica';
            const safeArc = {
                startLat: currentSupplier.lat, startLng: currentSupplier.lng,
                endLat: regionsCoords[altRegion].lat, endLng: regionsCoords[altRegion].lng,
                color: '#10b981' // SAFE GREEN
            };
            setActiveArcs([dangerArc, safeArc]);
        } else {
            res.after = { cost: 10500, time: 6, risk: 'Low' };
            res.summary = `${currentSupplier.name} is geographically isolated from the ${disruptionType} in ${selectedRegion.toUpperCase()}. Minimal ripple effects detected.`;
            res.suggestion = `MAINTAIN: Current supply route is safe. Monitoring regional spillover.`;
            
            // Show Safe Arc (Green)
            const safeArc = {
                startLat: currentSupplier.lat, startLng: currentSupplier.lng,
                endLat: regionsCoords[currentSupplier.region === 'asia' ? 'europe' : 'asia'].lat, endLng: regionsCoords[currentSupplier.region === 'asia' ? 'europe' : 'asia'].lng,
                color: '#10b981'
            };
            setActiveArcs([safeArc]);
        }

        setResults(res);
        setIsSimulating(false);
        setShowOutput(true);
        
        // Focus Globe on region
        if (globeRef.current) {
            globeRef.current.pointOfView({ lat: regionsCoords[selectedRegion].lat, lng: regionsCoords[selectedRegion].lng, altitude: 2 }, 1000);
        }
    }, 2000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: standalone ? '800px' : 'calc(100vh - 180px)',
      backgroundColor: '#1e293b', // Deep Slate instead of Black
      color: '#fff',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)',
      boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
    }}>
      
      {/* Background Pattern */}
      <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
      }}></div>

      {/* Floating Header */}
      <div style={{ 
          position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', 
          zIndex: 20, textAlign: 'center', pointerEvents: 'none'
      }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', justifyContent: 'center', marginBottom: '8px' }}>
              <Terminal size={18} />
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '0.3em' }}>GLOBALCHAIN SIMULATOR V3.0</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.03em', color: '#f8fafc' }}>Strategic Disruption Analyst</h2>
      </div>

      {/* LEFT: FLOATING INPUT PANEL */}
      <div style={{ 
        position: 'absolute', top: '2rem', left: '2rem', width: '360px', 
        padding: '2rem', borderRadius: '24px', zIndex: 10,
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', gap: '1.5rem'
      }}>
        <div>
            <label style={{ fontSize: '11px', fontWeight: 900, color: '#60a5fa', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>1. Select Target Supplier</label>
            <select 
                value={selectedSupplierId}
                onChange={(e) => setSelectedSupplierId(e.target.value)}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(30, 41, 59, 0.5)', color: '#fff', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
            >
                {suppliersData.map(s => <option key={s.id} value={s.id}>{s.name} ({s.region.toUpperCase()})</option>)}
            </select>
        </div>

        <div>
            <label style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>2. Disrupt Region</label>
            <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(30, 41, 59, 0.5)', color: '#fff', outline: 'none', cursor: 'pointer' }}
            >
                <option value="asia">Asia Pacific</option>
                <option value="europe">Europe Hub</option>
                <option value="namerica">North America</option>
                <option value="oceania">Oceania Region</option>
                <option value="mideast">Middle East Hub</option>
            </select>
        </div>

        <div>
            <label style={{ fontSize: '11px', fontWeight: 900, color: '#94a3b8', display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>3. Disruption Event</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {['weather', 'port', 'conflict'].map((type) => (
                    <button 
                        key={type}
                        onClick={() => setDisruptionType(type)}
                        style={{ 
                            display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', 
                            border: disruptionType === type ? `2px solid ${type === 'weather' ? '#60a5fa' : type === 'port' ? '#fbbf24' : '#f87171'}` : '1px solid rgba(255,255,255,0.05)', 
                            backgroundColor: disruptionType === type ? 'rgba(255,255,255,0.08)' : 'transparent', color: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s ease'
                        }}
                    >
                        {type === 'weather' && <CloudRain size={18} color="#60a5fa" />}
                        {type === 'port' && <Ship size={18} color="#fbbf24" />}
                        {type === 'conflict' && <ShieldAlert size={18} color="#f87171" />}
                        <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'capitalize' }}>{type} Disruption</span>
                    </button>
                ))}
            </div>
        </div>

        <Button 
            variant="primary" 
            onClick={runSimulation}
            disabled={isSimulating}
            style={{ height: '58px', fontSize: '16px', fontWeight: 900, marginTop: '0.5rem', backgroundColor: '#3b82f6', borderRadius: '16px', border: 'none', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
        >
            {isSimulating ? <RefreshCw className="spin" size={20} /> : <Play size={20} />} 
            {isSimulating ? 'Processing Vectors...' : 'Execute Stress Test'}
        </Button>
      </div>

      {/* CENTER: GLOBE VISUALIZATION */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Globe
            ref={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            pointsData={suppliersData}
            pointColor={(d) => d.id === selectedSupplierId ? '#facc15' : d.color}
            pointAltitude={0.1}
            pointRadius={(d) => d.id === selectedSupplierId ? 1.5 : 0.6}
            pointLabel="name"
            arcsData={activeArcs}
            arcColor="color"
            arcDashLength={0.5}
            arcDashGap={1}
            arcDashAnimateTime={1500}
            arcStroke={1}
            atmosphereColor="#60a5fa"
            atmosphereDaylight={false}
            width={standalone ? 1200 : undefined}
            height={standalone ? 800 : undefined}
        />
        
        {/* Ripple Effect for selected region */}
        {(isSimulating || showOutput) && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                <div style={{ 
                    width: '100px', height: '100px', borderRadius: '50%', 
                    border: `4px solid ${currentSupplier.region === selectedRegion ? '#f87171' : '#60a5fa'}`, 
                    animation: 'ripple 2s cubic-bezier(0, 0, 0.2, 1) infinite' 
                }}></div>
            </div>
        )}
      </div>

      {/* RIGHT: FLOATING OUTPUT PANEL */}
      {showOutput && results && (
          <div style={{ 
            position: 'absolute', top: '2rem', right: '2rem', width: '420px', 
            padding: '2rem', borderRadius: '24px', zIndex: 10,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
            display: 'flex', flexDirection: 'column', gap: '1.8rem',
            animation: 'slideIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Activity size={20} color="#60a5fa" />
                    <h3 style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.02em' }}>Impact Assessment</h3>
                </div>
                <button onClick={() => setShowOutput(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <section>
                <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Variable</th>
                                <th style={{ padding: '16px', textAlign: 'center' }}>Baseline</th>
                                <th style={{ padding: '16px', textAlign: 'center' }}>Projected</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '16px', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Lead Cost</td>
                                <td style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>₹{results.before.cost.toLocaleString()}</td>
                                <td style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', color: results.after.risk === 'Low' ? '#10b981' : '#f87171', fontWeight: 900 }}>₹{results.after.cost.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '16px', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>Cycle Time</td>
                                <td style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{results.before.time}d</td>
                                <td style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', color: results.after.risk === 'Low' ? '#10b981' : '#f87171', fontWeight: 900 }}>{results.after.time}d</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '16px', color: '#94a3b8' }}>Risk Level</td>
                                <td style={{ padding: '16px', textAlign: 'center', color: '#10b981', fontWeight: 900 }}>STABLE</td>
                                <td style={{ padding: '16px', textAlign: 'center', color: results.after.risk === 'Low' ? '#10b981' : '#f87171', fontWeight: 900 }}>{results.after.risk.toUpperCase()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section style={{ padding: '1.5rem', backgroundColor: results.after.risk === 'Low' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', borderLeft: `6px solid ${results.after.risk === 'Low' ? '#10b981' : '#ef4444'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <AlertCircle size={20} color={results.after.risk === 'Low' ? '#10b981' : '#ef4444'} />
                    <h4 style={{ fontSize: '11px', fontWeight: 900, color: results.after.risk === 'Low' ? '#10b981' : '#ef4444', letterSpacing: '0.15em' }}>SITUATION ANALYSIS</h4>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0, fontWeight: 600 }}>"{results.summary}"</p>
            </section>

            <section style={{ padding: '1.5rem', backgroundColor: 'rgba(96, 165, 250, 0.1)', borderRadius: '16px', borderLeft: '6px solid #60a5fa' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                    <RefreshCw size={20} color="#60a5fa" />
                    <h4 style={{ fontSize: '11px', fontWeight: 900, color: '#60a5fa', letterSpacing: '0.15em' }}>STRATEGIC ADVISORY</h4>
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.7', margin: 0, fontWeight: 800, color: '#e2e8f0' }}>👉 {results.suggestion}</p>
            </section>
          </div>
      )}

      <style>{`
        @keyframes ripple {
            0% { transform: scale(1); opacity: 0.8; }
            80%, 100% { transform: scale(4); opacity: 0; }
        }
        @keyframes slideIn {
            from { transform: translateX(120px); opacity: 0; filter: blur(10px); }
            to { transform: translateX(0); opacity: 1; filter: blur(0); }
        }
        .spin {
            animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
