import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { KPICard } from '../components/ui/KPICard';
import { Button } from '../components/ui/Button';
import { 
  Package, ShieldCheck, Activity, Share2, Database, Network, 
  Target, AlertTriangle, Clock, BarChart3, UploadCloud, Bell, CheckCircle2, TrendingUp, DollarSign,
  PlusCircle, Trash2, Edit3, XCircle, Users, Truck
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sparkData = [{ value: 30 }, { value: 50 }, { value: 40 }, { value: 60 }, { value: 55 }, { value: 75 }];
const costData = [{ name: 'Steel', cost: 400 }, { name: 'Plastic', cost: 300 }, { name: 'Copper', cost: 200 }, { name: 'Silicon', cost: 278 }];
const trendData = [{ name: 'Week 1', score: 80 }, { name: 'Week 2', score: 85 }, { name: 'Week 3', score: 82 }, { name: 'Week 4', score: 90 }];

export const ConsumerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Product Request / Inventory State
  const [requestedProducts, setRequestedProducts] = useState([
    { id: 1, name: 'Industrial Steel', quantity: 400, timeline: '12 Days', supplier: 'Titanium Corp', status: 'In Transit', shippingCost: 4000 },
    { id: 2, name: 'Circuit Boards', quantity: 12000, timeline: '24 Days', supplier: 'TechFlow', status: 'Delayed', shippingCost: 1200 },
    { id: 3, name: 'Polymer Casing', quantity: 8500, timeline: '5 Days', supplier: 'PolyMat Inc', status: 'Delivered', shippingCost: 850 },
  ]);

  const [reqName, setReqName] = useState('');
  const [reqQty, setReqQty] = useState('');
  const [reqTime, setReqTime] = useState('Standard (14 Days)');

  const handleAddRequest = (e) => {
    e.preventDefault();
    if (!reqName || !reqQty) return;
    const newProduct = {
        id: Date.now(),
        name: reqName,
        quantity: parseInt(reqQty),
        timeline: reqTime,
        supplier: 'Awaiting Selection',
        status: 'Pending',
        shippingCost: 0
    };
    setRequestedProducts([newProduct, ...requestedProducts]);
    setReqName('');
    setReqQty('');
    setReqTime('Standard (14 Days)');
    setActiveTab('inventory'); // Switch to inventory to see the added item
  };

  const handleDeleteProduct = (id) => {
    setRequestedProducts(requestedProducts.filter(p => p.id !== id));
  };

  const totalShippingCost = requestedProducts.reduce((acc, curr) => acc + curr.shippingCost, 0);

  return (
    <div className="layout-app">
      <Sidebar role="consumer" activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="layout-main">
        <Header title="Consumer Intelligence" userName="Procurement Lead" />
        <main className="layout-content">
          
          <div className="grid-main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {activeTab === 'overview' && (
              <>
                 <div className="card-flat" style={{ border: '2px solid var(--color-emerald)', backgroundColor: '#f0fdf4' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                        <Target size={24} color="var(--color-emerald)" />
                        <h2 className="h-section" style={{ color: 'var(--color-emerald)', marginBottom: 0 }}>Recommended Plan</h2>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', fontWeight: 600 }}>
                            <li>• Supplier A for Steel → Lowest shipping cost</li>
                            <li>• Supplier B for Plastic → Fastest delivery</li>
                        </ul>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Est. Shipping Savings</div>
                            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-emerald)' }}>₹450</div>
                        </div>
                    </div>
                 </div>

                 <div className="grid-main grid-cols-4">
                    <KPICard title="Total Shipping Cost" value={`₹${(totalShippingCost/1000).toFixed(1)}k`} trend="-2%" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Total Items in Inventory" value={requestedProducts.length} trend="Live" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="Active Suppliers" value="42" trend="Stable" isUp={true} color="emerald" data={sparkData} />
                    <KPICard title="High-Risk Suppliers" value="3" trend="Critical" isUp={false} color="alert" data={sparkData.slice().reverse()} />
                 </div>
              </>
            )}

            {activeTab === 'request' && (
              <div className="grid-main" style={{ maxWidth: '600px', margin: '0 auto', width: '100%' }}>
                 <div className="card-flat" style={{ height: 'fit-content' }}>
                    <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>New Product Requisition</h3>
                    <form onSubmit={handleAddRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Product Name</label>
                            <input 
                                type="text" 
                                value={reqName}
                                onChange={(e) => setReqName(e.target.value)}
                                placeholder="e.g. Industrial Steel" 
                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)', fontSize: '14px', outline: 'none' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Quantity Needed</label>
                            <input 
                                type="number" 
                                value={reqQty}
                                onChange={(e) => setReqQty(e.target.value)}
                                placeholder="e.g. 500" 
                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)', fontSize: '14px', outline: 'none' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Delivery Timeline</label>
                            <select 
                                value={reqTime}
                                onChange={(e) => setReqTime(e.target.value)}
                                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)', backgroundColor: 'var(--bg-secondary)', fontSize: '14px', outline: 'none', cursor: 'pointer' }}
                            >
                                <option value="Standard (14 Days)">Standard (14 Days)</option>
                                <option value="Fast (7 Days)">Fast (7 Days)</option>
                                <option value="Urgent (3 Days)">Urgent (3 Days)</option>
                            </select>
                        </div>
                        <Button variant="primary" style={{ marginTop: '0.5rem', width: '100%' }} type="submit">Add to Inventory & Analyze</Button>
                    </form>
                 </div>
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="card-flat">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="h-section">Inventory Management</h3>
                    <Button variant="ghost" onClick={() => setActiveTab('request')} style={{ fontSize: '12px', gap: '6px' }}><PlusCircle size={14} /> Add Product</Button>
                </div>
                <table className="table-dense">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Delivery Time</th>
                            <th>Supplier</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestedProducts.map(prod => (
                            <tr key={prod.id}>
                                <td style={{ fontWeight: 700 }}>{prod.name}</td>
                                <td>{prod.quantity.toLocaleString()}</td>
                                <td>{prod.timeline}</td>
                                <td>{prod.supplier}</td>
                                <td>
                                    <span style={{ 
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700,
                                        backgroundColor: prod.status === 'Delivered' ? '#f0fdf4' : prod.status === 'Delayed' ? '#fef2f2' : '#eff6ff',
                                        color: prod.status === 'Delivered' ? '#16a34a' : prod.status === 'Delayed' ? '#dc2626' : '#2563eb'
                                    }}>
                                        {prod.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        <button title="Edit" style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Edit3 size={16} /></button>
                                        <button title="Cancel/Delete" onClick={() => handleDeleteProduct(prod.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-alert)' }}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            )}

            {activeTab === 'procurement' && (
              <div className="card-flat">
                <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Procurement Track</h3>
                <table className="table-dense">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Selected Supplier</th>
                            <th>Shipping Cost</th>
                            <th>Delivery Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestedProducts.map(prod => (
                            <tr key={prod.id}>
                                <td style={{ fontWeight: 600 }}>{prod.name}</td>
                                <td>{prod.quantity.toLocaleString()}</td>
                                <td>{prod.supplier}</td>
                                <td>₹{prod.shippingCost.toLocaleString()}</td>
                                <td>{prod.timeline}</td>
                                <td>
                                    <span style={{ 
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700,
                                        backgroundColor: prod.status === 'Delivered' ? '#f0fdf4' : prod.status === 'Delayed' ? '#fef2f2' : '#eff6ff',
                                        color: prod.status === 'Delivered' ? '#16a34a' : prod.status === 'Delayed' ? '#dc2626' : '#2563eb'
                                    }}>
                                        {prod.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            )}

            {activeTab === 'suppliers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <div className="card-flat">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <Users size={20} color="var(--color-emerald)" />
                        <h3 className="h-section">Active Suppliers List</h3>
                    </div>
                    <table className="table-dense">
                        <thead>
                            <tr>
                                <th>Supplier</th>
                                <th>Category</th>
                                <th>Reliability</th>
                                <th>Avg. Lead Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 700 }}>Apex Metals</td>
                                <td>Raw Materials</td>
                                <td>98%</td>
                                <td>12 Days</td>
                                <td><span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>VERIFIED</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 700 }}>Titanium Corp</td>
                                <td>Heavy Metals</td>
                                <td>99%</td>
                                <td>14 Days</td>
                                <td><span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>VERIFIED</span></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 700 }}>TechFlow</td>
                                <td>Electronics</td>
                                <td>75%</td>
                                <td>24 Days</td>
                                <td><span style={{ color: '#d97706', fontWeight: 700 }}>WATCHLIST</span></td>
                            </tr>
                        </tbody>
                    </table>
                 </div>

                 <div className="card-flat">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <AlertTriangle size={20} color="var(--color-alert)" />
                        <h3 className="h-section">Risk-Wise Supplier Matrix</h3>
                    </div>
                    <div className="grid-main grid-cols-3">
                        <div style={{ padding: '1rem', border: '1px solid #fecaca', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
                            <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '12px', marginBottom: '8px' }}>HIGH RISK</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
                                <li style={{ marginBottom: '4px' }}>• TechFlow (75% Reliability)</li>
                                <li>• Global Logistics (Geopolitical)</li>
                            </ul>
                        </div>
                        <div style={{ padding: '1rem', border: '1px solid #fef3c7', backgroundColor: '#fffbeb', borderRadius: '8px' }}>
                            <div style={{ fontWeight: 800, color: '#d97706', fontSize: '12px', marginBottom: '8px' }}>MEDIUM RISK</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
                                <li style={{ marginBottom: '4px' }}>• PolyMat Inc (Capacity)</li>
                                <li>• ValuePlast (Financials)</li>
                            </ul>
                        </div>
                        <div style={{ padding: '1rem', border: '1px solid #d1fae5', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
                            <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '12px', marginBottom: '8px' }}>LOW RISK</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
                                <li style={{ marginBottom: '4px' }}>• Apex Metals</li>
                                <li>• Titanium Corp</li>
                            </ul>
                        </div>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <>
                 <div className="grid-main grid-cols-2" style={{ gridTemplateColumns: '1.6fr 1.4fr' }}>
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
                                    <th>Ship Cost</th>
                                    <th>Risk Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Steel</td>
                                    <td>Apex Metals</td>
                                    <td>₹400</td>
                                    <td><span style={{ padding: '4px 8px', backgroundColor: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: 700, borderRadius: '4px' }}>✅ Best Choice</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Circuits</td>
                                    <td>GlobalTech</td>
                                    <td>₹1,100</td>
                                    <td><span style={{ padding: '4px 8px', backgroundColor: '#fffbeb', color: '#d97706', fontSize: '11px', fontWeight: 700, borderRadius: '4px' }}>⚠️ Risky</span></td>
                                </tr>
                            </tbody>
                        </table>
                     </div>

                     <div className="card-flat">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <AlertTriangle size={18} color="var(--color-alert)" />
                            <h3 className="h-section" style={{ marginBottom: 0 }}>Risk Analysis Panel</h3>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Current Operational Risks</div>
                            <ul style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, paddingLeft: '20px' }}>
                                <li>Delayed shipments <span style={{ color: 'var(--color-alert)', fontWeight: 700, fontSize: '11px', marginLeft: '4px' }}>(High)</span></li>
                                <li>Shipping cost fluctuations <span style={{ color: '#d97706', fontWeight: 700, fontSize: '11px', marginLeft: '4px' }}>(Medium)</span></li>
                            </ul>
                        </div>
                     </div>
                 </div>

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
                                <th>Supplier Config</th>
                                <th>Shipping Cost</th>
                                <th>Delivery Time</th>
                                <th>Trade-off Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ backgroundColor: '#f8fafc' }}>
                                <td style={{ fontWeight: 700, color: 'var(--color-signal)' }}>★ Opti-Ship</td>
                                <td>Apex + PolyMat</td>
                                <td style={{ fontWeight: 700 }}>₹4.6k</td>
                                <td style={{ fontWeight: 700 }}>14 Days</td>
                                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Lowest shipping cost</td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>Fast-Track</td>
                                <td>Titanium + PolyMat</td>
                                <td>₹5.8k</td>
                                <td>12 Days</td>
                                <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Speed priority</td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
              </>
            )}

            {activeTab === 'analytics' && (
              <>
                 <div className="grid-main grid-cols-2">
                     <div className="card-flat">
                        <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Shipping Cost Distribution</h3>
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
                     </div>

                     <div className="card-flat">
                        <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Supplier Performance Trend</h3>
                        <div style={{ height: '200px' }}>
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
                 </div>

                 <div className="card-flat">
                    <h3 className="h-section" style={{ marginBottom: '1.5rem' }}>Shipping Cost Breakdown</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Steel Logistics</span>
                            <span style={{ fontWeight: 700 }}>₹4,000</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-light)' }}>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Electronics Freight</span>
                            <span style={{ fontWeight: 700 }}>₹1,200</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                            <span style={{ fontWeight: 700 }}>Total Monthly Shipping</span>
                            <span style={{ fontWeight: 800, color: 'var(--color-signal)' }}>₹{totalShippingCost.toLocaleString()}</span>
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
