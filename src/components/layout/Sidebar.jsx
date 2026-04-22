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
  Database,
  ShoppingCart,
  Bell,
  PlusCircle,
  Globe
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

  const navItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    width: '100%',
    textAlign: 'left',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    position: 'relative',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
    color: isActive ? accentColor : '#94a3b8',
    overflow: 'hidden'
  });

  const ActiveIndicator = () => (
    <div style={{ 
        position: 'absolute', left: 0, top: '25%', bottom: '25%', 
        width: '3px', backgroundColor: accentColor, borderRadius: '0 4px 4px 0' 
    }} />
  );

  return (
    <aside className="sidebar" style={{ backgroundColor: sidebarBg, color: '#94a3b8', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
      
      <div className="sidebar-header" style={{ padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
            width: '40px', height: '40px', borderRadius: '10px', 
            backgroundColor: 'rgba(255,255,255,0.03)', display: 'flex', 
            alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <Target size={22} color={accentColor} strokeWidth={2.5} />
        </div>
        <div>
           <h2 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'white', margin: 0 }}>GlobalChain</h2>
           <div style={{ fontSize: '9px', fontWeight: 900, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '2px' }}>{role} CONTROL</div>
        </div>
      </div>
      
      <nav className="sidebar-nav" style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {role === 'consumer' && (
          <>
            <button style={navItemStyle(activeTab === 'overview')} onClick={() => onTabChange('overview')}>
              {activeTab === 'overview' && <ActiveIndicator />}
              <Zap size={18} /> Overview
            </button>
            <button style={navItemStyle(activeTab === 'request')} onClick={() => onTabChange('request')}>
              {activeTab === 'request' && <ActiveIndicator />}
              <PlusCircle size={18} /> Requisition
            </button>
            <button style={navItemStyle(activeTab === 'inventory')} onClick={() => onTabChange('inventory')}>
              {activeTab === 'inventory' && <ActiveIndicator />}
              <Package size={18} /> Inventory List
            </button>
            <button style={navItemStyle(activeTab === 'procurement')} onClick={() => onTabChange('procurement')}>
              {activeTab === 'procurement' && <ActiveIndicator />}
              <Truck size={18} /> Procurement Track
            </button>
            <button style={navItemStyle(activeTab === 'suppliers')} onClick={() => onTabChange('suppliers')}>
              {activeTab === 'suppliers' && <ActiveIndicator />}
              <Users size={18} /> Supplier Hub
            </button>
            <button style={navItemStyle(activeTab === 'global_sim')} onClick={() => onTabChange('global_sim')}>
              {activeTab === 'global_sim' && <ActiveIndicator />}
              <Globe size={18} /> Disruption Simulator
            </button>
            <button style={navItemStyle(activeTab === 'analytics')} onClick={() => onTabChange('analytics')}>
              {activeTab === 'analytics' && <ActiveIndicator />}
              <BarChart3 size={18} /> Analytics
            </button>
          </>
        )}
        
        {role === 'supplier' && (
          <>
            <button style={navItemStyle(activeTab === 'sku_management')} onClick={() => onTabChange('sku_management')}>
              {activeTab === 'sku_management' && <ActiveIndicator />}
              <Package size={18} /> SKU Management
            </button>
            <button style={navItemStyle(activeTab === 'capacity')} onClick={() => onTabChange('capacity')}>
              {activeTab === 'capacity' && <ActiveIndicator />}
              <Zap size={18} /> Daily Capacity
            </button>
            <button style={navItemStyle(activeTab === 'cycles')} onClick={() => onTabChange('cycles')}>
              {activeTab === 'cycles' && <ActiveIndicator />}
              <Activity size={18} /> Production Cycles
            </button>
            <button style={navItemStyle(activeTab === 'consumers')} onClick={() => onTabChange('consumers')}>
              {activeTab === 'consumers' && <ActiveIndicator />}
              <Users size={18} /> Consumer List
            </button>
          </>
        )}

        {role === 'admin' && (
          <>
            <button style={navItemStyle(activeTab === 'overview')} onClick={() => onTabChange('overview')}>
              {activeTab === 'overview' && <ActiveIndicator />}
              <Database size={18} /> System Overview
            </button>
            <button style={navItemStyle(activeTab === 'consumers')} onClick={() => onTabChange('consumers')}>
              {activeTab === 'consumers' && <ActiveIndicator />}
              <Users size={18} /> Consumer Management
            </button>
            <button style={navItemStyle(activeTab === 'suppliers')} onClick={() => onTabChange('suppliers')}>
              {activeTab === 'suppliers' && <ActiveIndicator />}
              <Truck size={18} /> Supplier Management
            </button>
            <button style={navItemStyle(activeTab === 'audit')} onClick={() => onTabChange('audit')}>
              {activeTab === 'audit' && <ActiveIndicator />}
              <FileText size={18} /> Audit Logs
            </button>
            <button style={navItemStyle(activeTab === 'settings')} onClick={() => onTabChange('settings')}>
              {activeTab === 'settings' && <ActiveIndicator />}
              <Settings size={18} /> System Settings
            </button>
          </>
        )}
      </nav>

      <div style={{ padding: '1.5rem', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <NavLink to="/login" style={navItemStyle(false)} className="logout-btn">
          <LogOut size={18} /> Terminate Session
        </NavLink>
      </div>
    </aside>
  );
};
