import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { UserTable, AdminStatCard } from '../components/admin/AdminComponents';
import { 
    Users, 
    ShieldCheck, 
    Activity, 
    Truck, 
    Database, 
    FileText, 
    Settings,
    AlertTriangle,
    CheckCircle2
} from 'lucide-react';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
      total_users: 0,
      pending_approvals: 0,
      active_suppliers: 0,
      active_consumers: 0
  });
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:8000';

  const fetchData = async () => {
    try {
      const [usersRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/admin/users`),
        fetch(`${API_URL}/admin/stats`)
      ]);
      const usersData = await usersRes.json();
      const statsData = await statsRes.json();
      setUsers(usersData);
      setStats(statsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await fetch(`${API_URL}/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });
      fetchData();
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      try {
        await fetch(`${API_URL}/admin/users/${id}`, { method: 'DELETE' });
        fetchData();
      } catch (error) {
        console.error('Error removing user:', error);
      }
    }
  };

  const handleEdit = (user) => {
    const newName = window.prompt('Enter new name for ' + user.name, user.name);
    if (newName) {
        fetch(`${API_URL}/admin/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName })
        }).then(() => fetchData());
    }
  };

  const renderContent = () => {
    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Synchronizing Core Systems...</div>;

    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid-main">
            <div className="grid-main" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <AdminStatCard title="Total Registry" value={stats.total_users} icon={Database} color="14, 165, 233" />
              <AdminStatCard title="Pending Review" value={stats.pending_approvals} icon={AlertTriangle} color="239, 68, 68" />
              <AdminStatCard title="Active Suppliers" value={stats.active_suppliers} icon={Truck} color="16, 185, 129" />
              <AdminStatCard title="Active Consumers" value={stats.active_consumers} icon={Users} color="139, 92, 246" />
            </div>

            <div className="card-flat">
                <h2 className="h-section">System Integrity Status</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginTop: '1.5rem' }}>
                    <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', gap: '1rem' }}>
                        <Activity color="var(--color-emerald)" />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '14px' }}>API Gateway</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Operational • 12ms latency</div>
                        </div>
                    </div>
                    <div style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', display: 'flex', gap: '1rem' }}>
                        <ShieldCheck color="var(--color-emerald)" />
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '14px' }}>Security Layer</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Firewall Active • No threats</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        );
      case 'consumers':
        return (
          <UserTable 
            title="Consumer Registry" 
            users={users.filter(u => u.role === 'consumer')} 
            onApprove={handleApprove}
            onRemove={handleRemove}
            onEdit={handleEdit}
            accentColor="var(--color-emerald)"
          />
        );
      case 'suppliers':
        return (
          <UserTable 
            title="Supplier Registry" 
            users={users.filter(u => u.role === 'supplier')} 
            onApprove={handleApprove}
            onRemove={handleRemove}
            onEdit={handleEdit}
            accentColor="var(--color-signal)"
          />
        );
      case 'audit':
        return (
          <div className="card-flat">
            <h2 className="h-section">Audit Logs</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>System events and administrative actions log.</p>
            <div style={{ marginTop: '2rem' }}>
                {[1,2,3,4,5].map(i => (
                    <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--text-muted)' }}></div>
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>Admin Session Initialized</span>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{i} hour(s) ago</span>
                    </div>
                ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="card-flat">
            <h2 className="h-section">System Settings</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Global platform configurations.</p>
            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <div>
                        <div style={{ fontWeight: 600 }}>Maintenance Mode</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Restrict platform access for system updates</div>
                    </div>
                    <input type="checkbox" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
                    <div>
                        <div style={{ fontWeight: 600 }}>New User Auto-Approval</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Automatically approve new registrations</div>
                    </div>
                    <input type="checkbox" />
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="layout-app">
      <Sidebar role="admin" activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="layout-main">
        <Header title="System Intelligence Command" userName="Root Administrator" />
        <main className="layout-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
