'use client';

import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import Link from 'next/link';

const stats = [
  { label: 'Total Revenue', value: '₦2,450,000', change: '+12.5%', icon: '💰' },
  { label: 'Total Orders', value: '156', change: '+8.2%', icon: '📦' },
  { label: 'Active Products', value: '14', change: '0%', icon: '👕' },
  { label: 'Low Stock Items', value: '3', change: '-2', icon: '⚠️' },
];

const recentOrders = [
  { id: 'TOM-M1X2K3', customer: 'Adebayo Ogundimu', amount: '₦70,000', status: 'Paid', date: '2 hours ago' },
  { id: 'TOM-M1X2K4', customer: 'Chioma Nwosu', amount: '₦35,000', status: 'Shipped', date: '5 hours ago' },
  { id: 'TOM-M1X2K5', customer: 'Emeka Okonkwo', amount: '₦105,000', status: 'Delivered', date: '1 day ago' },
  { id: 'TOM-M1X2K6', customer: 'Fatima Abubakar', amount: '₦35,000', status: 'Processing', date: '1 day ago' },
  { id: 'TOM-M1X2K7', customer: 'Gbenga Adeyemi', amount: '₦70,000', status: 'Paid', date: '2 days ago' },
];

const statusColors: Record<string, string> = {
  'Paid': '#059669',
  'Shipped': '#1647B8',
  'Delivered': '#059669',
  'Processing': '#D97706',
  'Pending': '#6B7280',
};

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>Dashboard</h1>
        <Text type="supporting" color="secondary">Welcome back. Here&apos;s what&apos;s happening with Tomis.</Text>
      </div>

      {/* Stats Grid */}
      <Grid columns={4} gap={6} style={{ marginBottom: '2rem' }}>
        {stats.map(stat => (
          <Card key={stat.label} style={{ padding: '1.5rem' }}>
            <Stack gap={2}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text type="supporting" color="secondary">{stat.label}</Text>
                <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              </div>
              <Text type="body" weight="medium" style={{ fontSize: '1.5rem' }}>{stat.value}</Text>
              <Text type="supporting" style={{ color: stat.change.startsWith('+') ? '#059669' : stat.change.startsWith('-') ? '#DC2626' : 'var(--color-text-secondary, #78716C)' }}>
                {stat.change} from last month
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>

      {/* Recent Orders */}
      <Card style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Text type="body" weight="medium">Recent Orders</Text>
          <Link href="/admin/orders" style={{ fontSize: '0.75rem', color: 'var(--color-text-accent, #1647B8)', textDecoration: 'none' }}>View All →</Link>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border, #E7E5E4)' }}>
              {['Order', 'Customer', 'Amount', 'Status', 'Date'].map(header => (
                <th key={header} style={{ padding: '0.75rem 0', textAlign: 'left', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-secondary, #78716C)' }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border, #E7E5E4)' }}>
                <td style={{ padding: '0.75rem 0', fontSize: '0.875rem', fontFamily: 'monospace' }}>{order.id}</td>
                <td style={{ padding: '0.75rem 0', fontSize: '0.875rem' }}>{order.customer}</td>
                <td style={{ padding: '0.75rem 0', fontSize: '0.875rem', fontWeight: 500 }}>{order.amount}</td>
                <td style={{ padding: '0.75rem 0' }}>
                  <span style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', fontWeight: 600, color: statusColors[order.status] || '#6B7280', backgroundColor: `${statusColors[order.status] || '#6B7280'}15`, borderRadius: '4px' }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 0', fontSize: '0.75rem', color: 'var(--color-text-secondary, #78716C)' }}>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
