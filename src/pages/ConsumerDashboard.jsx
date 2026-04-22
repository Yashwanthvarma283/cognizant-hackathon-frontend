import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { KPICard } from '../components/ui/KPICard';
import { Button } from '../components/ui/Button';
import { 
  Package, ShieldCheck, Activity, Share2, Database, Network, 
  Target, AlertTriangle, Clock, BarChart3, UploadCloud, Bell, CheckCircle2, TrendingUp, DollarSign
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sparkData = [{ value: 30 }, { value: 50 }, { value: 40 }, { value: 60 }, { value: 55 }, { value: 75 }];
const costData = [{ name: 'Steel', cost: 4000 }, { name: 'Plastic', cost: 3000 }, { name: 'Copper', cost: 2000 }, { name: 'Silicon', cost: 2780 }];
const trendData = [{ name: 'Week 1', score: 80 }, { name: 'Week 2', score: 85 }, { name: 'Week 3', score: 82 }, { name: 'Week 4', score: 90 }];

export const ConsumerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="layout-app">
      <Sidebar role="consumer" activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="layout-main">
        <Header title="Consumer Intelligence" userName="Procurement Lead" />
        <main className="layout-content">
          
          <div className="grid-main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
            {activeTab === 'overview' && (
              <>
                 {/* 12. Decision Summary (Top priority call to action) */}
                 <div className="card-flat" style={{ border: '2px solid var(--color-emerald)', backgroundColor: '#f0fdf4' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                        <Target size={24} color="var(--color-emerald)" />
                        <h2 className="h-section" style={{ color: 'var(--color-emerald)', marginBottom: 0 }}>Recommended Plan</h2>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', fontWeight: 600 }}>
                            <li>• Supplier A for Steel → Lowest cost</li>
                            <li>• Supplier B for Plastic → Fastest delivery</li>
                        </ul>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Total Savings</div>
                            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-emerald)' }}>₹2,000</div>
                        </div>
                    </div>
                 </div>

                 {/* 1. KPI Summary */}
                 <div className="grid-main grid-cols-4">
                    <KPICard title="Total Procurement Cost" value="₹1.4M" trend="-2%" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Total Items Requested" value="12,400" trend="+5%" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Active Suppliers" value="42" trend="Stable" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="High-Risk Suppliers (Current)" value="3" trend="Critical" isUp={false} color="alert" data={sparkData.slice().reverse()} />
                    
                    <KPICard title="Predicted Risk (Future)" value="Medium" trend="Rising" isUp={false} color="alert" data={sparkData} />
                    <KPICard title="Average Delivery Time" value="14 Days" trend="-1 Day" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="On-Time Delivery Rate" value="94.2%" trend="+1.2%" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Cost Optimization Potential" value="8%" trend="AI Insight" isUp={true} color="emerald" data={sparkData} />
                 </div>

                 {/* 2. Procurement Overview */}
                 <div className="card-flat">
                    <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Procurement Overview</h3>
                    <table className="table-dense">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Selected Supplier</th>
                                <th>Cost</th>
                                <th>Delivery Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 600 }}>Industrial Steel</td>
                                <td>400 Tons</td>
                                <td>Titanium Corp</td>
                                <td>₹4,000,000</td>
                                <td>12 Days</td>
                                <td><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '11px', fontWeight: 700 }}>In Transit</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>Circuit Boards</td>
                                <td>12,000 Units</td>
                                <td>TechFlow</td>
                                <td>₹1,200,000</td>
                                <td>24 Days</td>
                                <td><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#fef2f2', color: '#dc2626', fontSize: '11px', fontWeight: 700 }}>Delayed</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>Polymer Casing</td>
                                <td>8,500 Units</td>
                                <td>PolyMat Inc</td>
                                <td>₹850,000</td>
                                <td>5 Days</td>
                                <td><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: 700 }}>Delivered</span></td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
              </>
            )}

            {activeTab === 'ai' && (
              <>
                 <div className="grid-main grid-cols-2" style={{ gridTemplateColumns: '1.6fr 1.4fr' }}>
                     {/* 3. AI Recommendations */}
                     <div className="card-flat">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <Activity size={18} color="var(--color-emerald)" />
                            <h3 className="h-section" style={{ marginBottom: 0 }}>AI Recommendations</h3>
                        </div>
                        <table className="table-dense">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Recommended Supplier</th>
                                    <th>Cost</th>
                                    <th>Time</th>
                                    <th>Risk Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Steel</td>
                                    <td>Apex Metals</td>
                                    <td>₹3.8M</td>
                                    <td>14d</td>
                                    <td><span style={{ padding: '4px 8px', backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: 700, borderRadius: '4px' }}>✅ Best Choice</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Circuits</td>
                                    <td>GlobalTech</td>
                                    <td>₹1.1M</td>
                                    <td>30d</td>
                                    <td><span style={{ padding: '4px 8px', backgroundColor: '#fffbeb', color: '#d97706', fontSize: '11px', fontWeight: 700, borderRadius: '4px' }}>⚠️ Risky</span></td>
                                </tr>
                            </tbody>
                        </table>
                     </div>

                     {/* 4. Risk Analysis Panel */}
                     <div className="card-flat">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <AlertTriangle size={18} color="var(--color-alert)" />
                            <h3 className="h-section" style={{ marginBottom: 0 }}>Risk Analysis Panel</h3>
                        </div>
                        
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Current Risks</div>
                            <ul style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
                                <li>Delayed shipments <span style={{ color: 'var(--color-alert)', fontWeight: 700, fontSize: '11px', marginLeft: '4px' }}>(High)</span></li>
                                <li>High-cost suppliers <span style={{ color: '#d97706', fontWeight: 700, fontSize: '11px', marginLeft: '4px' }}>(Medium)</span></li>
                                <li>Low reliability vendors <span style={{ color: 'var(--color-alert)', fontWeight: 700, fontSize: '11px', marginLeft: '4px' }}>(High)</span></li>
                            </ul>
                        </div>

                        <div>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Future Risks (Prediction)</div>
                            <ul style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
                                <li>Possible delays <span style={{ color: '#d97706', fontWeight: 700, fontSize: '11px', marginLeft: '4px' }}>(Medium)</span></li>
                                <li>Supplier instability <span style={{ color: 'var(--color-emerald)', fontWeight: 700, fontSize: '11px', marginLeft: '4px' }}>(Low)</span></li>
                                <li>Cost fluctuations <span style={{ color: '#d97706', fontWeight: 700, fontSize: '11px', marginLeft: '4px' }}>(Medium)</span></li>
                            </ul>
                        </div>
                     </div>
                 </div>

                 {/* 5. Simulation Area */}
                 <div className="card-flat" style={{ borderLeft: '4px solid var(--color-signal)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Share2 size={20} color="var(--color-signal)" />
                            <h3 className="h-section" style={{ marginBottom: 0 }}>Simulation Engine</h3>
                        </div>
                        <Button variant="primary" style={{ backgroundColor: 'var(--color-signal)', padding: '0.5rem 1.5rem' }}>Run Simulation</Button>
                    </div>
                    <table className="table-dense">
                        <thead>
                            <tr>
                                <th>Scenario</th>
                                <th>Supplier Configuration</th>
                                <th>Total Cost</th>
                                <th>Delivery Time</th>
                                <th>Trade-off Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ backgroundColor: '#f8fafc' }}>
                                <td style={{ fontWeight: 700, color: 'var(--color-signal)' }}>★ Best Scenario</td>
                                <td>Apex + PolyMat</td>
                                <td style={{ fontWeight: 700 }}>₹4.6M</td>
                                <td style={{ fontWeight: 700 }}>14 Days</td>
                                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Balanced risk & cost</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>Fastest Delivery</td>
                                <td>Titanium + PolyMat</td>
                                <td>₹4.85M</td>
                                <td>12 Days</td>
                                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Higher cost for speed</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>Lowest Cost</td>
                                <td>Apex + ValuePlast</td>
                                <td>₹4.4M</td>
                                <td>20 Days</td>
                                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Sacrifices timeline</td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
              </>
            )}

            {activeTab === 'analytics' && (
              <>
                 <div className="grid-main grid-cols-2">
                     {/* 6. Analytics / Charts */}
                     <div className="card-flat">
                        <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Cost Distribution</h3>
                        <div style={{ height: '200px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={costData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} />
                                    <Bar dataKey="cost" fill="var(--color-signal)" radius={[4, 4, 0, 0]} barSize={32} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <h3 className="h-section" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>Supplier Performance Trend</h3>
                        <div style={{ height: '160px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }} />
                                    <Line type="monotone" dataKey="score" stroke="var(--color-emerald)" strokeWidth={3} dot={{ r: 4, fill: 'var(--color-emerald)', strokeWidth: 0 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                     </div>

                     {/* 7. Supplier Insights */}
                     <div className="card-flat">
                        <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Supplier Insights</h3>
                        <table className="table-dense">
                            <thead>
                                <tr>
                                    <th>Supplier</th>
                                    <th>Reliability</th>
                                    <th>Avg Cost</th>
                                    <th>Avg Time</th>
                                    <th>Risk</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Apex Metals</td>
                                    <td>98%</td>
                                    <td>₹Low</td>
                                    <td>14d</td>
                                    <td><span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>Low</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Titanium Corp</td>
                                    <td>99%</td>
                                    <td>₹High</td>
                                    <td>12d</td>
                                    <td><span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>Low</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>TechFlow</td>
                                    <td>75%</td>
                                    <td>₹Med</td>
                                    <td>24d</td>
                                    <td><span style={{ color: 'var(--color-alert)', fontWeight: 700 }}>High</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>PolyMat Inc</td>
                                    <td>92%</td>
                                    <td>₹Low</td>
                                    <td>5d</td>
                                    <td><span style={{ color: '#d97706', fontWeight: 700 }}>Med</span></td>
                                </tr>
                            </tbody>
                        </table>
                     </div>
                 </div>

                 {/* 11. Cost Breakdown */}
                 <div className="card-flat">
                    <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Cost Breakdown</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Total Cost (Steel)</span>
                            <span style={{ fontWeight: 700 }}>₹4,000,000</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Total Cost (Circuits)</span>
                            <span style={{ fontWeight: 700 }}>₹1,200,000</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Titanium Corp (Supplier)</span>
                            <span style={{ fontWeight: 700 }}>₹4,000,000</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                            <span style={{ fontWeight: 700 }}>Aggregate System Cost</span>
                            <span style={{ fontWeight: 800, color: 'var(--color-signal)' }}>₹6,050,000</span>
                        </div>
                    </div>
                 </div>
              </>
            )}

            {activeTab === 'data' && (
              <>
                 <div className="grid-main grid-cols-2" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
                     {/* 8. CSV Upload Section */}
                     <div className="card-flat" style={{ padding: '2.5rem' }}>
                         <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Upload Manifest</h3>
                         <div 
                             style={{ 
                                 padding: '3rem 2rem', border: '2px dashed var(--border-light)', borderRadius: '12px', 
                                 textAlign: 'center', backgroundColor: 'var(--bg-secondary)', cursor: 'pointer'
                             }}
                         >
                             <UploadCloud size={40} color="var(--color-signal)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
                             <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '0.5rem' }}>Drag & Drop your CSV here</div>
                             <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Parsed items preview will appear automatically</p>
                             <Button variant="primary">Process Data</Button>
                         </div>
                     </div>

                     {/* 9. Alerts & Notifications */}
                     <div className="card-flat">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <Bell size={18} color="var(--color-alert)" />
                            <h3 className="h-section" style={{ marginBottom: 0 }}>System Alerts</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ padding: '12px', backgroundColor: '#fff1f2', borderLeft: '4px solid var(--color-alert)', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>
                                ⚠️ Steel shipment delayed by 2 days
                            </div>
                            <div style={{ padding: '12px', backgroundColor: '#fffbeb', borderLeft: '4px solid #f59e0b', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>
                                ⚠️ Supplier XYZ risk increased
                            </div>
                            <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderLeft: '4px solid var(--color-emerald)', borderRadius: '4px', fontSize: '13px', fontWeight: 600 }}>
                                ✅ Better supplier available (-15% cost)
                            </div>
                        </div>
                     </div>
                 </div>

                 {/* 10. Activity Timeline */}
                 <div className="card-flat" style={{ maxWidth: '600px' }}>
                    <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Activity Timeline</h3>
                    <div style={{ position: 'relative', paddingLeft: '24px' }}>
                        <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border-light)' }}></div>
                        
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <div style={{ position: 'absolute', left: '-22px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-signal)', border: '2px solid white' }}></div>
                            <div style={{ fontSize: '13px', fontWeight: 600 }}>Uploaded CSV manifest</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>2 hours ago</div>
                        </div>
                        
                        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                            <div style={{ position: 'absolute', left: '-22px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-emerald)', border: '2px solid white' }}></div>
                            <div style={{ fontSize: '13px', fontWeight: 600 }}>Ran multi-tier simulation</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>1 hour ago</div>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '-22px', top: '2px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--text-primary)', border: '2px solid white' }}></div>
                            <div style={{ fontSize: '13px', fontWeight: 600 }}>Selected supplier Apex Metals</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>10 mins ago</div>
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
