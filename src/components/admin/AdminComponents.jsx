import React from 'react';
import { CheckCircle, XCircle, Edit2, Trash2 } from 'lucide-react';

export const UserTable = ({ users, onApprove, onRemove, onEdit, title, accentColor }) => {
  return (
    <div className="card-flat">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="h-section">{title}</h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: accentColor }}></div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: accentColor, textTransform: 'uppercase' }}>Management Console</span>
        </div>
      </div>
      
      <table className="table-dense">
        <thead>
          <tr>
            <th>User Details</th>
            <th>Status</th>
            <th>Last Active</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{user.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.email}</span>
                </div>
              </td>
              <td>
                <span style={{ 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  backgroundColor: user.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                  color: user.status === 'approved' ? 'var(--color-emerald)' : 'var(--color-alert)',
                  fontSize: '11px', 
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  {user.status}
                </span>
              </td>
              <td>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{user.last_login}</span>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  {user.status === 'pending' && (
                    <button 
                      onClick={() => onApprove(user.id)}
                      className="btn-icon"
                      title="Approve User"
                      style={{ color: 'var(--color-emerald)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => onEdit(user)}
                    className="btn-icon"
                    title="Edit User"
                    style={{ color: 'var(--color-signal)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => onRemove(user.id)}
                    className="btn-icon"
                    title="Remove User"
                    style={{ color: 'var(--color-alert)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                No users found in this category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export const AdminStatCard = ({ title, value, icon: Icon, color }) => (
    <div className="card-flat" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ 
            width: '48px', height: '48px', borderRadius: '12px', 
            backgroundColor: `rgba(${color}, 0.1)`, 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
            <Icon size={24} style={{ color: `rgb(${color})` }} />
        </div>
        <div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>{value}</div>
        </div>
    </div>
);
