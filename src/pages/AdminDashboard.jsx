import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { KPICard } from '../components/ui/KPICard';
import { ShieldCheck, Activity, Users, Settings } from 'lucide-react';

const sparkData = [{ value: 90 }, { value: 95 }, { value: 92 }, { value: 98 }, { value: 99 }, { value: 99.9 }];

export const AdminDashboard = () => {
  return (
    <div className="layout-app">
      <Sidebar role="admin" />
      <div className="layout-main">
        <Header title="System Integrity Core" userName="Root Architect" />
        <main className="layout-content">
          
          <div className="grid-main">
            
            <div className="grid-main" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              <KPICard title="Server Health" value="99.98%" trend="Optimal" isUp={true} color="emerald" data={sparkData} />
              <KPICard title="Active Users" value="1,423" trend="+12%" isUp={true} color="emerald" data={sparkData} />
              <KPICard title="Database Load" value="42%" trend="Stable" isUp={true} color="emerald" data={sparkData} />
            </div>

            <div className="card-flat">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="h-section">User Management</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-emerald)' }}></div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-emerald)' }}>ACTIVE ROSTER</span>
                </div>
              </div>
              
              <table className="table-dense">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Role</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span style={{ fontWeight: 700 }}>Sarah Jenkins</span></td>
                    <td><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#f1f5f9', fontSize: '11px', fontWeight: 600 }}>System Admin</span></td>
                    <td>2 mins ago</td>
                    <td><button style={{ background: 'none', border: 'none', color: 'var(--color-emerald)', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Edit Access</button></td>
                  </tr>
                  <tr>
                    <td><span style={{ fontWeight: 700 }}>Michael Chen</span></td>
                    <td><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#f1f5f9', fontSize: '11px', fontWeight: 600 }}>Supplier</span></td>
                    <td>1 hour ago</td>
                    <td><button style={{ background: 'none', border: 'none', color: 'var(--color-emerald)', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Edit Access</button></td>
                  </tr>
                  <tr>
                    <td><span style={{ fontWeight: 700 }}>Elena Rostova</span></td>
                    <td><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: '#f1f5f9', fontSize: '11px', fontWeight: 600 }}>Consumer</span></td>
                    <td>3 hours ago</td>
                    <td><button style={{ background: 'none', border: 'none', color: 'var(--color-emerald)', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}>Edit Access</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
