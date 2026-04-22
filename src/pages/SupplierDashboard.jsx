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

const sparkData = [{ value: 40 }, { value: 60 }, { value: 45 }, { value: 70 }, { value: 65 }, { value: 80 }];
const yieldData = [
  { name: 'Mon', yield: 94 },
  { name: 'Tue', yield: 96 },
  { name: 'Wed', yield: 92 },
  { name: 'Thu', yield: 95 },
  { name: 'Fri', yield: 97 },
  { name: 'Sat', yield: 98 },
  { name: 'Sun', yield: 96 },
];
const inventoryData = [
  { name: 'Raw Material', current: 200, optimal: 300 },
  { name: 'WIP', current: 250, optimal: 320 },
  { name: 'Finished', current: 180, optimal: 280 },
];
const demandData = [
  { name: 'Week 1', forecast: 400, actual: 380 },
  { name: 'Week 2', forecast: 450, actual: 460 },
  { name: 'Week 3', forecast: 420, actual: 410 },
  { name: 'Week 4', forecast: 500, actual: null },
];

export const SupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="layout-app">
      <Sidebar role="supplier" activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="layout-main">
        <Header title="Resilience Control Mesh" userName="Sr. Operations Lead" />
        <main className="layout-content">
          
          <div className="grid-main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {activeTab === 'overview' && (
              <>
                {/* 1. Decision Hub - Operational Recommendation */}
                <div className="card-flat" style={{ border: '2px solid var(--color-signal)', backgroundColor: '#f0f9ff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                        <Target size={24} color="var(--color-signal)" />
                        <h2 className="h-section" style={{ color: 'var(--color-signal)', marginBottom: 0 }}>Operational Intelligence</h2>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '15px', fontWeight: 600 }}>
                            <span style={{ color: 'var(--color-signal)' }}>Action Recommended:</span> Shift 15% of production load from Node 1 to Node 2 to optimize power costs and avoid predicted peak-hour surcharges.
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>EST. SAVINGS</div>
                            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-signal)' }}>$4,200/wk</div>
                        </div>
                    </div>
                </div>

                {/* 2. Operational KPIs (8-card grid) */}
                <div className="grid-main grid-cols-4">
                    <KPICard title="Revenue Generated" value="$24.8M" trend="+14%" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Total Orders" value="3,842" trend="+8%" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Fulfillment Rate" value="98.2%" trend="+0.5%" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Cycle Time (Avg)" value="4.2 Days" trend="-12%" isUp={true} color="emerald" data={sparkData.slice().reverse()} />
                    
                    <KPICard title="Current Stock Level" value="84%" trend="Optimal" isUp={true} color="signal" data={sparkData} />
                    <KPICard title="Quality Yield" value="96.4%" trend="+1.2%" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Machine Uptime" value="99.1%" trend="Stable" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Pending Fulfillment" value="124" trend="-5%" isUp={false} color="alert" data={sparkData.slice().reverse()} />
                </div>

                {/* 3. Active Order Queue */}
                <div className="card-flat">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <Cpu size={20} color="var(--color-signal)" />
                        <h3 className="h-section">Priority Order Queue</h3>
                    </div>
                    <table className="table-dense">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Client Node</th>
                                <th>Volume</th>
                                <th>Status</th>
                                <th>ETA</th>
                                <th>Priority</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 700 }}>#ORD-9921</td>
                                <td>Berlin Hub</td>
                                <td>4,000 Units</td>
                                <td><span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>SHIPPED</span></td>
                                <td>Today</td>
                                <td><span style={{ color: 'var(--color-alert)', fontWeight: 800 }}>URGENT</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 700 }}>#ORD-9925</td>
                                <td>Tokyo Port</td>
                                <td>1,200 Units</td>
                                <td><span style={{ color: 'var(--color-signal)', fontWeight: 700 }}>PROCESSING</span></td>
                                <td>2 Days</td>
                                <td>Normal</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 700 }}>#ORD-9930</td>
                                <td>London DC</td>
                                <td>8,500 Units</td>
                                <td><span style={{ color: 'var(--color-alert)', fontWeight: 700 }}>DELAYED</span></td>
                                <td>5 Days</td>
                                <td><span style={{ color: 'var(--color-alert)', fontWeight: 800 }}>CRITICAL</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </>
            )}

            {activeTab === 'inventory' && (
              <>
                <div className="grid-main grid-cols-2" style={{ gridTemplateColumns: '1.4fr 1.6fr' }}>
                    {/* 4. Inventory Distribution */}
                    <div className="card-flat">
                        <h3 className="h-section">Stock Distribution</h3>
                        <div style={{ width: '100%', height: '240px', marginTop: '1.5rem' }}>
                            <ResponsiveContainer>
                                <BarChart data={inventoryData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-premium)' }} />
                                    <Bar dataKey="current" fill="var(--color-signal)" radius={[4, 4, 0, 0]} barSize={40} />
                                    <Bar dataKey="optimal" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 5. Supplier/Vendor Management */}
                    <div className="card-flat">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                            <Globe size={20} color="var(--color-emerald)" />
                            <h3 className="h-section">Inbound Material Performance</h3>
                        </div>
                        <table className="table-dense">
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Compliance</th>
                                    <th>Lead Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 700 }}>TechFlow Ltd</td>
                                    <td>98.2%</td>
                                    <td>4 Days</td>
                                    <td><CheckCircle2 size={16} color="var(--color-emerald)" /></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 700 }}>MacroLogix</td>
                                    <td>84.5%</td>
                                    <td>12 Days</td>
                                    <td><AlertTriangle size={16} color="var(--color-alert)" /></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 700 }}>Nova Systems</td>
                                    <td>92.1%</td>
                                    <td>7 Days</td>
                                    <td><Clock size={16} color="var(--color-signal)" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 6. Resource Allocation */}
                <div className="card-flat">
                    <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Production Line Allocation</h3>
                    <div className="grid-main grid-cols-3">
                        {[1, 2, 3].map(id => (
                            <div key={id} style={{ padding: '1.25rem', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div style={{ fontWeight: 700, fontSize: '13px' }}>LINE-{id}00</div>
                                    <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--color-emerald)' }}>ACTIVE</div>
                                </div>
                                <div style={{ height: '4px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '2px', marginBottom: '8px' }}>
                                    <div style={{ height: '100%', width: `${Math.random() * 40 + 60}%`, backgroundColor: 'var(--color-signal)', borderRadius: '2px' }}></div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                                    <span>Load: {Math.floor(Math.random() * 20 + 70)}%</span>
                                    <span>MTBF: 1,420h</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </>
            )}

            {activeTab === 'analytics' && (
              <>
                <div className="grid-main grid-cols-2" style={{ gridTemplateColumns: '1.6fr 1.4fr' }}>
                    {/* 7. Throughput Analysis */}
                    <div className="card-flat">
                        <h3 className="h-section">Supply Chain Throughput</h3>
                        <div style={{ width: '100%', height: '280px', marginTop: '2rem' }}>
                            <ResponsiveContainer>
                                <AreaChart data={sparkData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" hide />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-premium)' }} />
                                    <Area type="monotone" dataKey="value" stroke="var(--color-signal)" fill="rgba(14, 165, 233, 0.05)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 8. Production Yield Trend */}
                    <div className="card-flat">
                        <h3 className="h-section">Production Yield Quality</h3>
                        <div style={{ width: '100%', height: '280px', marginTop: '2rem' }}>
                            <ResponsiveContainer>
                                <LineChart data={yieldData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                    <Line type="monotone" dataKey="yield" stroke="var(--color-emerald)" strokeWidth={4} dot={{ r: 4, fill: 'var(--color-emerald)' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* 9. Cost Analysis Breakdown */}
                <div className="card-flat">
                    <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Operational Cost Analysis</h3>
                    <div className="grid-main grid-cols-3">
                        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>ENERGY CONSUMPTION</div>
                            <div style={{ fontSize: '24px', fontWeight: 800 }}>$124,200</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-alert)', fontWeight: 700, marginTop: '4px' }}>+12% vs Month</div>
                        </div>
                        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>LABOR COSTS</div>
                            <div style={{ fontSize: '24px', fontWeight: 800 }}>$482,000</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-emerald)', fontWeight: 700, marginTop: '4px' }}>-2% Optimization</div>
                        </div>
                        <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '8px' }}>LOGISTICS & FUEL</div>
                            <div style={{ fontSize: '24px', fontWeight: 800 }}>$92,400</div>
                            <div style={{ fontSize: '12px', color: 'var(--color-signal)', fontWeight: 700, marginTop: '4px' }}>Stable</div>
                        </div>
                    </div>
                </div>
              </>
            )}

            {activeTab === 'intelligence' && (
              <>
                <div className="grid-main grid-cols-2" style={{ gridTemplateColumns: '1.6fr 1.4fr' }}>
                    {/* 10. AI Demand Forecast */}
                    <div className="card-flat">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 className="h-section">AI Demand Forecast</h3>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-emerald)', border: '1px solid var(--color-emerald)', padding: '2px 8px', borderRadius: '4px' }}>94% CONFIDENCE</div>
                        </div>
                        <div style={{ width: '100%', height: '240px' }}>
                            <ResponsiveContainer>
                                <LineChart data={demandData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
                                    <Line type="stepAfter" dataKey="forecast" stroke="var(--color-signal)" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="actual" stroke="var(--text-primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--text-primary)' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 11. System Alerts Feed */}
                    <div className="card-flat">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <Bell size={20} color="var(--color-alert)" />
                            <h3 className="h-section">Operational Alerts</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '1rem', borderLeft: '4px solid var(--color-alert)', backgroundColor: '#fff1f2', borderRadius: '4px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: '#991b1b', marginBottom: '4px' }}>CRITICAL: NODE-4 OVERLOAD</div>
                                <div style={{ fontSize: '12px', color: '#b91c1c' }}>Thermal levels exceeding safety threshold at Singapore Data Center.</div>
                            </div>
                            <div style={{ padding: '1rem', borderLeft: '4px solid #f59e0b', backgroundColor: '#fffbeb', borderRadius: '4px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: '#92400e', marginBottom: '4px' }}>WARNING: LOGISTICS BOTTLE-NECK</div>
                                <div style={{ fontSize: '12px', color: '#b45309' }}>Suez Canal congestion may delay Inbound-3 manifest by 72 hours.</div>
                            </div>
                            <div style={{ padding: '1rem', borderLeft: '4px solid var(--color-emerald)', backgroundColor: '#f0fdf4', borderRadius: '4px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 800, color: '#166534', marginBottom: '4px' }}>INSIGHT: INVENTORY OPTIMIZATION</div>
                                <div style={{ fontSize: '12px', color: '#15803d' }}>Reducing Raw Material stock by 5% could save $1,200/mo in holding costs.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 12. Activity Stream Timeline */}
                <div className="card-flat">
                    <h3 className="h-section" style={{ marginBottom: '2rem' }}>Operational Audit Log</h3>
                    <div style={{ position: 'relative', paddingLeft: '32px' }}>
                        <div style={{ position: 'absolute', left: '7px', top: '0', bottom: '0', width: '2px', backgroundColor: 'var(--border-light)' }}></div>
                        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-30px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-emerald)', border: '2px solid white' }}></div>
                            <div style={{ fontSize: '13px', fontWeight: 700 }}>Production Schedule Finalized</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>10:42 AM - AUTO-RESOLVED</div>
                        </div>
                        <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-30px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-signal)', border: '2px solid white' }}></div>
                            <div style={{ fontSize: '13px', fontWeight: 700 }}>Manifest #9921 Dispatched</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>09:15 AM - LOGISTICS LEAD</div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-30px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e2e8f0', border: '2px solid white' }}></div>
                            <div style={{ fontSize: '13px', fontWeight: 700 }}>System Health Check - PASSED</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>06:00 AM - SYSTEM CORE</div>
                        </div>
                    </div>
                </div>
              </>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};
