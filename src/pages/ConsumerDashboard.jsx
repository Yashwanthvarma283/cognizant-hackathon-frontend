import React, { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { KPICard } from '../components/ui/KPICard';
import { Button } from '../components/ui/Button';
import { 
  Package, ShieldCheck, Activity, Share2, Database, Network, 
  Target, AlertTriangle, Clock, BarChart3, UploadCloud, Bell, CheckCircle2, TrendingUp, DollarSign,
  PlusCircle, Trash2, Edit3, XCircle, Users, Truck, Info, Globe, AlertCircle
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlobalSimulation } from '../components/simulation/GlobalSimulation';

const sparkData = [{ value: 30 }, { value: 50 }, { value: 40 }, { value: 60 }, { value: 55 }, { value: 75 }];
const costData = [{ name: 'Steel', cost: 400 }, { name: 'Plastic', cost: 300 }, { name: 'Copper', cost: 200 }, { name: 'Silicon', cost: 278 }];
const trendData = [{ name: 'Week 1', score: 80 }, { name: 'Week 2', score: 85 }, { name: 'Week 3', score: 82 }, { name: 'Week 4', score: 90 }];

export const ConsumerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRiskSupplier, setSelectedRiskSupplier] = useState(null);

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
    setActiveTab('inventory'); 
  };

  const handleDeleteProduct = (id) => {
    setRequestedProducts(requestedProducts.filter(p => p.id !== id));
  };

  const totalShippingCost = requestedProducts.reduce((acc, curr) => acc + curr.shippingCost, 0);

  const riskDetails = {
    'TechFlow': {
        duration: '14 Days',
        impact: 'Critical bottleneck in electronic assembly. High probability of assembly line stoppage within 72 hours.',
        skus: 'Circuit Board B12, Processor P9, Connectivity Mesh Unit',
        reason: 'Regional logistical strike and component shortages.'
    },
    'Global Logistics': {
        duration: '5 Days',
        impact: 'Moderate delays in international shipping lanes. Expected 15% increase in lead time for oceanic freight.',
        skus: 'Heavy Raw Materials, Structural Steel',
        reason: 'Geopolitical instability in canal routes.'
    }
  };

  return (
    <div className="layout-app">
      <Sidebar role="consumer" activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="layout-main">
        <Header title="Consumer Intelligence" userName="Procurement Lead" />
        <main className="layout-content">
          
          <div className="grid-main" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {activeTab === 'overview' && (
              <>
                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }}>
                    <div className="card-flat" style={{ border: '2px solid var(--color-emerald)', backgroundColor: '#f0fdf4', display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                            <Target size={24} color="var(--color-emerald)" />
                            <h2 className="h-section" style={{ color: 'var(--color-emerald)', marginBottom: 0 }}>Recommended Plan</h2>
                        </div>
                        <div style={{ flex: 1 }}>
                            <ul style={{ listStyleType: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px', fontWeight: 600 }}>
                                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={18} /> Supplier A for Steel → Lowest shipping cost</li>
                                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={18} /> Supplier B for Plastic → Fastest delivery</li>
                            </ul>
                            <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d1fae5' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, color: '#059669', marginBottom: '4px' }}>AI OPTIMIZATION NOTE</div>
                                <p style={{ fontSize: '13px', color: '#10b981', margin: 0, fontWeight: 500 }}>"Switching to Regional Hub X could reduce carbon footprint by 12% and shipping cost by ₹1.2k."</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid #d1fae5', paddingTop: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Est. Monthly Savings</div>
                                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-emerald)' }}>₹45,000</div>
                            </div>
                            <Button variant="primary" style={{ backgroundColor: '#10b981' }}>Apply AI Plan</Button>
                        </div>
                    </div>

                    <div className="card-flat">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                            <Activity size={20} color="var(--color-emerald)" />
                            <h3 className="h-section" style={{ marginBottom: 0 }}>AI Procurement Recommendations</h3>
                        </div>
                        <table className="table-dense">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Optimal Supplier</th>
                                    <th>Ship Cost</th>
                                    <th>Risk Factor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Industrial Steel</td>
                                    <td>Apex Metals</td>
                                    <td>₹4,000</td>
                                    <td><span style={{ color: '#16a34a', fontWeight: 700 }}>LOW</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Circuit Boards</td>
                                    <td>GlobalTech</td>
                                    <td>₹1,100</td>
                                    <td><span style={{ color: '#d97706', fontWeight: 700 }}>MEDIUM</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Polymer</td>
                                    <td>PolyMat Inc</td>
                                    <td>₹850</td>
                                    <td><span style={{ color: '#16a34a', fontWeight: 700 }}>LOW</span></td>
                                </tr>
                            </tbody>
                        </table>
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
              <div className="grid-main grid-cols-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                 <div className="card-flat" style={{ height: 'fit-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                        <PlusCircle size={20} color="var(--color-signal)" />
                        <h3 className="h-section" style={{ marginBottom: 0 }}>Manual Entry</h3>
                    </div>
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
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Quantity</label>
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
                            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>Timeline</label>
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
                        <Button variant="primary" style={{ marginTop: '0.5rem', width: '100%' }} type="submit">Add to Requisition</Button>
                    </form>
                 </div>

                 <div className="card-flat" style={{ height: 'fit-content' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                        <UploadCloud size={20} color="var(--color-emerald)" />
                        <h3 className="h-section" style={{ marginBottom: 0 }}>Bulk Import</h3>
                    </div>
                    <div 
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const bulkItems = [
                                { id: Date.now(), name: 'Copper Wiring', quantity: 5000, timeline: 'Fast (7 Days)', supplier: 'Awaiting Selection', status: 'Pending', shippingCost: 0 },
                                { id: Date.now() + 1, name: 'Glass Panes', quantity: 200, timeline: 'Standard (14 Days)', supplier: 'Awaiting Selection', status: 'Pending', shippingCost: 0 }
                            ];
                            setRequestedProducts([...bulkItems, ...requestedProducts]);
                        }}
                        style={{ 
                            padding: '3rem 2rem', border: '2px dashed var(--border-light)', borderRadius: '12px', 
                            textAlign: 'center', backgroundColor: 'var(--bg-secondary)', cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Database size={24} color="var(--color-emerald)" />
                            </div>
                            <div>
                                <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Drag & Drop CSV</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Fast enter products and suppliers list</div>
                            </div>
                            <Button variant="ghost" style={{ fontSize: '11px', border: '1px solid var(--border-light)' }}>Browse Files</Button>
                        </div>
                    </div>
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

            {activeTab === 'suppliers' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <div style={{ display: 'grid', gridTemplateColumns: selectedRiskSupplier ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
                    <div className="card-flat">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                            <AlertTriangle size={20} color="var(--color-alert)" />
                            <h3 className="h-section">Risk-Wise Supplier Matrix</h3>
                        </div>
                        <div className="grid-main grid-cols-3">
                            <div 
                                onClick={() => setSelectedRiskSupplier('TechFlow')}
                                style={{ padding: '1.5rem', border: '1px solid #fecaca', backgroundColor: '#fef2f2', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease', borderLeft: '4px solid #ef4444' }}
                            >
                                <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '11px', marginBottom: '8px', letterSpacing: '0.05em' }}>HIGH RISK</div>
                                <div style={{ fontWeight: 700, fontSize: '15px' }}>TechFlow</div>
                                <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>Click for deep impact analysis</div>
                            </div>
                            <div 
                                onClick={() => setSelectedRiskSupplier('Global Logistics')}
                                style={{ padding: '1.5rem', border: '1px solid #fecaca', backgroundColor: '#fef2f2', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease', borderLeft: '4px solid #ef4444' }}
                            >
                                <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '11px', marginBottom: '8px', letterSpacing: '0.05em' }}>HIGH RISK</div>
                                <div style={{ fontWeight: 700, fontSize: '15px' }}>Global Logistics</div>
                                <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px' }}>Click for deep impact analysis</div>
                            </div>
                            <div style={{ padding: '1.5rem', border: '1px solid #fef3c7', backgroundColor: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                                <div style={{ fontWeight: 800, color: '#d97706', fontSize: '11px', marginBottom: '8px' }}>MEDIUM RISK</div>
                                <div style={{ fontWeight: 700, fontSize: '15px' }}>PolyMat Inc</div>
                            </div>
                        </div>
                    </div>

                    {selectedRiskSupplier && (
                        <div className="card-flat" style={{ border: '1px solid var(--color-alert)', backgroundColor: '#fffcfc' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <AlertCircle size={20} color="var(--color-alert)" />
                                    <h3 className="h-section" style={{ color: 'var(--color-alert)' }}>Risk Detail: {selectedRiskSupplier}</h3>
                                </div>
                                <button onClick={() => setSelectedRiskSupplier(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><XCircle size={20} /></button>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>DANGER DURATION</div>
                                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-alert)' }}>Active for {riskDetails[selectedRiskSupplier].duration}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>BUSINESS IMPACT</div>
                                    <p style={{ fontSize: '13px', lineHeight: '1.6', margin: 0, color: 'var(--text-primary)' }}>{riskDetails[selectedRiskSupplier].impact}</p>
                                </div>
                                <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: '#ef4444', marginBottom: '8px' }}>AFFECTED SKUS (HIGH DEMAND)</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {riskDetails[selectedRiskSupplier].skus.split(', ').map((sku, i) => (
                                            <span key={i} style={{ padding: '4px 10px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', fontSize: '11px', fontWeight: 700, color: '#ef4444' }}>{sku}</span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '4px' }}>ROOT CAUSE</div>
                                    <div style={{ fontSize: '13px', fontWeight: 500 }}>{riskDetails[selectedRiskSupplier].reason}</div>
                                </div>
                            </div>
                        </div>
                    )}
                 </div>

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
                                <td><span style={{ color: '#ef4444', fontWeight: 700 }}>RISK ALERT</span></td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
              </div>
            )}

            {activeTab === 'global_sim' && (
              <div className="card-flat" style={{ padding: 0, overflow: 'hidden' }}>
                <GlobalSimulation />
              </div>
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
