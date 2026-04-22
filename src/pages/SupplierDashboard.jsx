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
  Clock, Database, TrendingUp, AlertTriangle, CheckCircle2 
} from 'lucide-react';

const skuData = [
  { id: 'SKU-001', name: 'High-Performance Processor', category: 'Semiconductors', leadTime: '5 Days', status: 'In Production' },
  { id: 'SKU-002', name: 'Quantum Memory Module', category: 'Storage', leadTime: '3 Days', status: 'Ready' },
  { id: 'SKU-003', name: 'Optical Sensor Array', category: 'Sensors', leadTime: '7 Days', status: 'Awaiting Materials' },
  { id: 'SKU-004', name: 'Neural Link Interface', category: 'Bio-Tech', leadTime: '12 Days', status: 'Design Phase' },
];

const capacityData = [
  { sku: 'SKU-001', maxCapacity: 5000, currentLoad: 4200, utilization: 84 },
  { sku: 'SKU-002', maxCapacity: 12000, currentLoad: 3000, utilization: 25 },
  { sku: 'SKU-003', maxCapacity: 2500, currentLoad: 2450, utilization: 98 },
  { sku: 'SKU-004', maxCapacity: 1000, currentLoad: 150, utilization: 15 },
];

const cycleData = [
  { sku: 'SKU-001', initialCycle: '14 Days', repeatCycle: '10 Days', batchSize: 500 },
  { sku: 'SKU-002', initialCycle: '7 Days', repeatCycle: '4 Days', batchSize: 2000 },
  { sku: 'SKU-003', initialCycle: '21 Days', repeatCycle: '15 Days', batchSize: 250 },
  { sku: 'SKU-004', initialCycle: '45 Days', repeatCycle: '30 Days', batchSize: 100 },
];

const consumerData = [
  { name: 'Tesla Motors', location: 'Austin, TX', activeSkus: ['SKU-001', 'SKU-003'], lastOrder: '2026-04-20', status: 'Active' },
  { name: 'Apple Inc.', location: 'Cupertino, CA', activeSkus: ['SKU-002'], lastOrder: '2026-04-22', status: 'Active' },
  { name: 'SpaceX', location: 'Boca Chica, TX', activeSkus: ['SKU-001', 'SKU-004'], lastOrder: '2026-04-15', status: 'Urgent' },
  { name: 'Samsung Electronics', location: 'Seoul, KR', activeSkus: ['SKU-003'], lastOrder: '2026-04-18', status: 'Idle' },
];

export const SupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState('sku_management');

  return (
    <div className="layout-app">
      <Sidebar role="supplier" activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="layout-main">
        <Header title="Resilience Control Mesh" userName="Sr. Operations Lead" />
        <main className="layout-content">
          
          <div className="grid-main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {activeTab === 'sku_management' && (
              <div className="card-flat">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <Package size={20} color="var(--color-signal)" />
                  <h3 className="h-section">SKU Portfolio & Lead Times</h3>
                </div>
                <table className="table-dense">
                  <thead>
                    <tr>
                      <th>SKU ID</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Lead Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skuData.map((sku) => (
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
                    {capacityData.map((cap) => (
                      <div key={cap.sku} style={{ padding: '1.5rem', border: '1px solid var(--border-light)', borderRadius: '12px' }}>
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
                    </tr>
                  </thead>
                  <tbody>
                    {cycleData.map((cycle) => (
                      <tr key={cycle.sku}>
                        <td style={{ fontWeight: 700 }}>{cycle.sku}</td>
                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock size={14} /> {cycle.initialCycle}</div></td>
                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-emerald)', fontWeight: 600 }}><TrendingUp size={14} /> {cycle.repeatCycle}</div></td>
                        <td>{cycle.batchSize.toLocaleString()} Units</td>
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
                    </tr>
                  </thead>
                  <tbody>
                    {consumerData.map((consumer) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};
