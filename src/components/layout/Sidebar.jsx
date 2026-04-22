import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Zap, 
  Truck, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Target,
  Activity,
  BarChart3,
  Database
} from 'lucide-react';
import './layout.css';

export const Sidebar = ({ role, activeTab, onTabChange }) => {
  const getRoleAccent = () => {
    switch (role) {
      case 'consumer': return 'var(--color-emerald)';
      case 'supplier': return 'var(--color-signal)';
      case 'admin': return 'var(--color-alert)';
      default: return 'var(--text-muted)';
    }
  };

  const accentColor = getRoleAccent();
  const sidebarBg = '#0f172a'; // Deep Slate 900 (Premium Charcoal)

  return (
    <aside className="sidebar" style={{ backgroundColor: sidebarBg, color: '#94a3b8', borderRight: 'none' }}>
      <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ color: accentColor }}>
          <Target size={24} strokeWidth={2.5} />
        </div>
        <div>
           <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'white' }}>Control Room</h2>
           <div style={{ fontSize: '10px', fontWeight: 800, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{role} PORTAL</div>
        </div>
      </div>
      
      <nav className="sidebar-nav" style={{ padding: '1.5rem 1rem' }}>
        {role === 'consumer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button 
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} 
              onClick={() => onTabChange('overview')}
              style={activeTab === 'overview' ? { color: accentColor, backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600 } : { color: '#94a3b8', width: '100%', textAlign: 'left', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 500 }}
            >
              <Zap size={18} /> Overview
            </button>
            <button 
              className={`nav-link ${activeTab === 'ai' ? 'active' : ''}`} 
              onClick={() => onTabChange('ai')}
              style={activeTab === 'ai' ? { color: accentColor, backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600 } : { color: '#94a3b8', width: '100%', textAlign: 'left', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 500 }}
            >
              <Activity size={18} /> AI & Simulation
            </button>
            <button 
              className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`} 
              onClick={() => onTabChange('analytics')}
              style={activeTab === 'analytics' ? { color: accentColor, backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600 } : { color: '#94a3b8', width: '100%', textAlign: 'left', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 500 }}
            >
              <BarChart3 size={18} /> Analytics
            </button>
            <button 
              className={`nav-link ${activeTab === 'data' ? 'active' : ''}`} 
              onClick={() => onTabChange('data')}
              style={activeTab === 'data' ? { color: accentColor, backgroundColor: 'rgba(255, 255, 255, 0.05)', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600 } : { color: '#94a3b8', width: '100%', textAlign: 'left', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: '14px', fontWeight: 500 }}
            >
              <Database size={18} /> Data Management
            </button>
          </div>
        )}
        
        {role === 'supplier' && (
          <NavLink 
            to="/supplier" 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
            style={({isActive}) => isActive ? { color: accentColor, backgroundColor: 'rgba(255, 255, 255, 0.05)' } : { color: '#94a3b8' }}
          >
            <Zap size={18} /> Operation Control
          </NavLink>
        )}

        {role === 'admin' && (
          <NavLink 
            to="/admin" 
            className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
            style={({isActive}) => isActive ? { color: accentColor, backgroundColor: 'rgba(255, 255, 255, 0.05)' } : { color: '#94a3b8' }}
          >
            <Settings size={18} /> System Core
          </NavLink>
        )}

        <NavLink to="#" className="nav-link" style={{ color: '#94a3b8' }}>
          <Truck size={18} /> Logistics Flow
        </NavLink>
        
        <NavLink to="#" className="nav-link" style={{ color: '#94a3b8' }}>
          <Package size={18} /> Node Inventory
        </NavLink>

        <NavLink to="#" className="nav-link" style={{ color: '#94a3b8' }}>
          <Users size={18} /> Supplier Mesh
        </NavLink>

        <NavLink to="#" className="nav-link" style={{ color: '#94a3b8' }}>
          <FileText size={18} /> Risk Reports
        </NavLink>
      </nav>

      <div style={{ padding: '1.5rem', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <NavLink to="/login" className="nav-link" style={{ padding: '0.75rem 1rem', marginBottom: 0, color: '#94a3b8' }}>
          <LogOut size={18} /> Terminate Session
        </NavLink>
      </div>
    </aside>
  );
};
