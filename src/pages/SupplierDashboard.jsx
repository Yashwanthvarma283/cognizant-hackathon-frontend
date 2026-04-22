import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { KPICard } from '../components/ui/KPICard';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, Legend
} from 'recharts';
import { 
  Globe, Cpu, Zap, Package, Activity, Bell, Target, 
  Clock, Database, TrendingUp, AlertTriangle, CheckCircle2,
  Users, Pencil, Save, X, Trash2
} from 'lucide-react';

export const SupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState('sku_management');
  
  // Data State
  const [skus, setSkus] = useState([
    { id: 'SKU-001', name: 'High-Performance Processor', category: 'Semiconductors', leadTime: '5 Days', status: 'In Production' },
    { id: 'SKU-002', name: 'Quantum Memory Module', category: 'Storage', leadTime: '3 Days', status: 'Ready' },
    { id: 'SKU-003', name: 'Optical Sensor Array', category: 'Sensors', leadTime: '7 Days', status: 'Awaiting Materials' },
    { id: 'SKU-004', name: 'Neural Link Interface', category: 'Bio-Tech', leadTime: '12 Days', status: 'Design Phase' },
  ]);

  const [capacity, setCapacity] = useState([
    { sku: 'SKU-001', maxCapacity: 5000, currentLoad: 4200, utilization: 84 },
    { sku: 'SKU-002', maxCapacity: 12000, currentLoad: 3000, utilization: 25 },
    { sku: 'SKU-003', maxCapacity: 2500, currentLoad: 2450, utilization: 98 },
    { sku: 'SKU-004', maxCapacity: 1000, currentLoad: 150, utilization: 15 },
  ]);

  const [cycles, setCycles] = useState([
    { sku: 'SKU-001', initialCycle: '14 Days', repeatCycle: '10 Days', batchSize: 500 },
    { sku: 'SKU-002', initialCycle: '7 Days', repeatCycle: '4 Days', batchSize: 2000 },
    { sku: 'SKU-003', initialCycle: '21 Days', repeatCycle: '15 Days', batchSize: 250 },
    { sku: 'SKU-004', initialCycle: '45 Days', repeatCycle: '30 Days', batchSize: 100 },
  ]);

  const [consumers, setConsumers] = useState([
    { name: 'Tesla Motors', location: 'Austin, TX', activeSkus: ['SKU-001', 'SKU-003'], lastOrder: '2026-04-20', status: 'Active' },
    { name: 'Apple Inc.', location: 'Cupertino, CA', activeSkus: ['SKU-002'], lastOrder: '2026-04-22', status: 'Active' },
    { name: 'SpaceX', location: 'Boca Chica, TX', activeSkus: ['SKU-001', 'SKU-004'], lastOrder: '2026-04-15', status: 'Urgent' },
    { name: 'Samsung Electronics', location: 'Seoul, KR', activeSkus: ['SKU-003'], lastOrder: '2026-04-18', status: 'Idle' },
  ]);

  // Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [editType, setEditType] = useState(null); // 'sku', 'capacity', 'cycle', 'consumer'

  const openEditModal = (item, type) => {
    setEditingItem({ ...item });
    setEditType(type);
  };

  const handleSave = () => {
    if (editType === 'sku') {
      setSkus(skus.map(s => s.id === editingItem.id ? editingItem : s));
    } else if (editType === 'capacity') {
      const util = Math.round((editingItem.currentLoad / editingItem.maxCapacity) * 100);
      setCapacity(capacity.map(c => c.sku === editingItem.sku ? { ...editingItem, utilization: util } : c));
    } else if (editType === 'cycle') {
      setCycles(cycles.map(c => c.sku === editingItem.sku ? editingItem : c));
    } else if (editType === 'consumer') {
      setConsumers(consumers.map(c => c.name === editingItem.name ? editingItem : c));
    }
    setEditingItem(null);
    setEditType(null);
  };

  return (
    <div className="layout-app">
      <Sidebar role="supplier" activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="layout-main">
        <Header title="Resilience Control Mesh" userName="Sr. Operations Lead" />
        <main className="layout-content">
          
          <div className="grid-main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {activeTab === 'sku_management' && (
              <div className="card-flat">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Package size={20} color="var(--color-signal)" />
                    <h3 className="h-section" style={{ marginBottom: 0 }}>SKU Portfolio & Lead Times</h3>
                  </div>
                </div>
                <table className="table-dense">
                  <thead>
                    <tr>
                      <th>SKU ID</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Lead Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skus.map((sku) => (
                      <tr key={sku.id}>
                        <td style={{ fontWeight: 700 }}>{sku.id}</td>
                        <td>{sku.name}</td>
                        <td>{sku.category}</td>
                        <td><span style={{ color: 'var(--color-signal)', fontWeight: 700 }}>{sku.leadTime}</span></td>
                        <td>
                          <span style={{ 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            fontSize: '11px', 
                            fontWeight: 800,
                            backgroundColor: sku.status === 'Ready' ? 'var(--color-emerald-light)' : 'var(--bg-secondary)',
                            color: sku.status === 'Ready' ? 'var(--color-emerald)' : 'var(--text-muted)'
                          }}>
                            {sku.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <button onClick={() => openEditModal(sku, 'sku')} className="btn-icon" style={{ padding: '6px' }}>
                            <Pencil size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'capacity' && (
              <div className="grid-main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="card-flat">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                    <Zap size={20} color="var(--color-signal)" />
                    <h3 className="h-section">Daily Production Capacity</h3>
                  </div>
                  <div className="grid-main grid-cols-2" style={{ gap: '1.5rem' }}>
                    {capacity.map((cap) => (
                      <div key={cap.sku} style={{ padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: '12px', position: 'relative' }}>
                        <button 
                          onClick={() => openEditModal(cap, 'capacity')} 
                          className="btn-icon" 
                          style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '6px' }}
                        >
                          <Pencil size={14} />
                        </button>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                          <span style={{ fontWeight: 800, fontSize: '14px' }}>{cap.sku}</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: cap.utilization > 90 ? 'var(--color-alert)' : 'var(--color-emerald)' }}>
                            {cap.utilization}% Utilized
                          </span>
                        </div>
                        <div style={{ height: '8px', width: '100%', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', marginBottom: '1rem', overflow: 'hidden' }}>
                          <div style={{ 
                            height: '100%', 
                            width: `${cap.utilization}%`, 
                            backgroundColor: cap.utilization > 90 ? 'var(--color-alert)' : 'var(--color-signal)',
                            transition: 'width 0.5s ease'
                          }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                          <span className="text-muted">Current Load: <strong>{cap.currentLoad.toLocaleString()}</strong></span>
                          <span className="text-muted">Max Capacity: <strong>{cap.maxCapacity.toLocaleString()}</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cycles' && (
              <div className="card-flat">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <Activity size={20} color="var(--color-signal)" />
                  <h3 className="h-section">Production & Reorder Cycles</h3>
                </div>
                <table className="table-dense">
                  <thead>
                    <tr>
                      <th>SKU ID</th>
                      <th>Initial Cycle</th>
                      <th>Repeat Order Cycle</th>
                      <th>Standard Batch Size</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cycles.map((cycle) => (
                      <tr key={cycle.sku}>
                        <td style={{ fontWeight: 700 }}>{cycle.sku}</td>
                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={14} /> {cycle.initialCycle}</div></td>
                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-emerald)', fontWeight: 600 }}><TrendingUp size={14} /> {cycle.repeatCycle}</div></td>
                        <td>{cycle.batchSize.toLocaleString()} Units</td>
                        <td>
                          <button onClick={() => openEditModal(cycle, 'cycle')} className="btn-icon" style={{ padding: '6px' }}>
                            <Pencil size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'consumers' && (
              <div className="card-flat">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <Users size={20} color="var(--color-signal)" />
                  <h3 className="h-section">Downstream Consumer Network</h3>
                </div>
                <table className="table-dense">
                  <thead>
                    <tr>
                      <th>Consumer Name</th>
                      <th>Location</th>
                      <th>Active SKUs</th>
                      <th>Last Order</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consumers.map((consumer) => (
                      <tr key={consumer.name}>
                        <td style={{ fontWeight: 700 }}>{consumer.name}</td>
                        <td>{consumer.location}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            {consumer.activeSkus.map(sku => (
                              <span key={sku} style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px' }}>{sku}</span>
                            ))}
                          </div>
                        </td>
                        <td>{consumer.lastOrder}</td>
                        <td>
                          <span style={{ 
                            color: consumer.status === 'Urgent' ? 'var(--color-alert)' : consumer.status === 'Active' ? 'var(--color-emerald)' : 'var(--text-muted)',
                            fontWeight: 800,
                            fontSize: '11px'
                          }}>
                            {consumer.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <button onClick={() => openEditModal(consumer, 'consumer')} className="btn-icon" style={{ padding: '6px' }}>
                            <Pencil size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          backdropFilter: 'blur(4px)'
        }}>
          <div className="card-flat" style={{ width: '450px', padding: '2rem', boxShadow: 'var(--shadow-premium)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="h-section" style={{ marginBottom: 0 }}>Edit {editType.toUpperCase()}</h3>
              <button onClick={() => setEditingItem(null)} className="btn-icon">
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {editType === 'sku' && (
                <>
                  <div className="form-group">
                    <label>Product Name</label>
                    <input 
                      className="input-search" style={{ width: '100%', marginTop: '0.5rem' }}
                      value={editingItem.name} 
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Lead Time</label>
                    <input 
                      className="input-search" style={{ width: '100%', marginTop: '0.5rem' }}
                      value={editingItem.leadTime} 
                      onChange={(e) => setEditingItem({...editingItem, leadTime: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      className="input-search" style={{ width: '100%', marginTop: '0.5rem', backgroundColor: 'var(--bg-secondary)' }}
                      value={editingItem.status} 
                      onChange={(e) => setEditingItem({...editingItem, status: e.target.value})}
                    >
                      <option value="Ready">Ready</option>
                      <option value="In Production">In Production</option>
                      <option value="Awaiting Materials">Awaiting Materials</option>
                      <option value="Design Phase">Design Phase</option>
                    </select>
                  </div>
                </>
              )}

              {editType === 'capacity' && (
                <>
                  <div className="form-group">
                    <label>Max Capacity</label>
                    <input 
                      type="number" className="input-search" style={{ width: '100%', marginTop: '0.5rem' }}
                      value={editingItem.maxCapacity} 
                      onChange={(e) => setEditingItem({...editingItem, maxCapacity: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Current Load</label>
                    <input 
                      type="number" className="input-search" style={{ width: '100%', marginTop: '0.5rem' }}
                      value={editingItem.currentLoad} 
                      onChange={(e) => setEditingItem({...editingItem, currentLoad: parseInt(e.target.value)})}
                    />
                  </div>
                </>
              )}

              {editType === 'cycle' && (
                <>
                  <div className="form-group">
                    <label>Initial Cycle</label>
                    <input 
                      className="input-search" style={{ width: '100%', marginTop: '0.5rem' }}
                      value={editingItem.initialCycle} 
                      onChange={(e) => setEditingItem({...editingItem, initialCycle: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Repeat Order Cycle</label>
                    <input 
                      className="input-search" style={{ width: '100%', marginTop: '0.5rem' }}
                      value={editingItem.repeatCycle} 
                      onChange={(e) => setEditingItem({...editingItem, repeatCycle: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Standard Batch Size</label>
                    <input 
                      type="number" className="input-search" style={{ width: '100%', marginTop: '0.5rem' }}
                      value={editingItem.batchSize} 
                      onChange={(e) => setEditingItem({...editingItem, batchSize: parseInt(e.target.value)})}
                    />
                  </div>
                </>
              )}

              {editType === 'consumer' && (
                <>
                  <div className="form-group">
                    <label>Location</label>
                    <input 
                      className="input-search" style={{ width: '100%', marginTop: '0.5rem' }}
                      value={editingItem.location} 
                      onChange={(e) => setEditingItem({...editingItem, location: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select 
                      className="input-search" style={{ width: '100%', marginTop: '0.5rem', backgroundColor: 'var(--bg-secondary)' }}
                      value={editingItem.status} 
                      onChange={(e) => setEditingItem({...editingItem, status: e.target.value})}
                    >
                      <option value="Active">Active</option>
                      <option value="Urgent">Urgent</option>
                      <option value="Idle">Idle</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
              <button 
                onClick={handleSave} 
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '8px', 
                  backgroundColor: 'var(--color-signal)', color: 'white', 
                  fontWeight: 700, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                }}
              >
                <Save size={18} /> Save Changes
              </button>
              <button 
                onClick={() => setEditingItem(null)} 
                style={{ 
                  flex: 1, padding: '12px', borderRadius: '8px', 
                  backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', 
                  fontWeight: 700, border: '1px solid var(--border-light)', cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
