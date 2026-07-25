'use client';

import { useState } from 'react';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';

const orders = [
  { id: 'TOM-M1X2K3', customer: 'Adebayo Ogundimu', email: 'adebayo@email.com', phone: '+234 801 234 5678', items: [{ name: 'Half-Collar Shirt', color: 'Black', size: 'L', qty: 1, price: 35000 }, { name: 'Half-Collar Shirt', color: 'Navy', size: 'L', qty: 1, price: 35000 }], subtotal: 70000, shipping: 0, total: 70000, status: 'Paid', address: '12 Admiralty Way, Lekki, Lagos', date: '2025-07-22', paymentRef: 'TOM-M1X2K3' },
  { id: 'TOM-M1X2K4', customer: 'Chioma Nwosu', email: 'chioma@email.com', phone: '+234 802 345 6789', items: [{ name: 'Half-Collar Shirt', color: 'Olive', size: 'M', qty: 1, price: 35000 }], subtotal: 35000, shipping: 0, total: 35000, status: 'Shipped', address: '45 Victoria Island, Lagos', date: '2025-07-22', paymentRef: 'TOM-M1X2K4' },
  { id: 'TOM-M1X2K5', customer: 'Emeka Okonkwo', email: 'emeka@email.com', phone: '+234 803 456 7890', items: [{ name: 'Half-Collar Shirt', color: 'Pink', size: 'XL', qty: 1, price: 35000 }, { name: 'Half-Collar Shirt', color: 'Brown', size: 'XL', qty: 1, price: 35000 }, { name: 'Half-Collar Shirt', color: 'Lavender', size: 'XL', qty: 1, price: 35000 }], subtotal: 105000, shipping: 0, total: 105000, status: 'Delivered', address: '78 Ikeja GRA, Lagos', date: '2025-07-21', paymentRef: 'TOM-M1X2K5' },
  { id: 'TOM-M1X2K6', customer: 'Fatima Abubakar', email: 'fatima@email.com', phone: '+234 804 567 8901', items: [{ name: 'Half-Collar Shirt', color: 'Sky Blue', size: 'S', qty: 1, price: 35000 }], subtotal: 35000, shipping: 2500, total: 37500, status: 'Processing', address: '12 Wuse Zone 5, Abuja', date: '2025-07-21', paymentRef: 'TOM-M1X2K6' },
  { id: 'TOM-M1X2K7', customer: 'Gbenga Adeyemi', email: 'gbenga@email.com', phone: '+234 805 678 9012', items: [{ name: 'Half-Collar Shirt', color: 'Terracotta', size: 'L', qty: 2, price: 35000 }], subtotal: 70000, shipping: 0, total: 70000, status: 'Paid', address: '34 Surulere, Lagos', date: '2025-07-20', paymentRef: 'TOM-M1X2K7' },
];

const statusColors: Record<string, string> = {
  'Paid': '#059669',
  'Shipped': '#1647B8',
  'Delivered': '#059669',
  'Processing': '#D97706',
  'Pending': '#6B7280',
  'Cancelled': '#DC2626',
};

const statusOptions = ['Pending', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus);
  const order = orders.find(o => o.id === selectedOrder);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>Orders</h1>
          <Text type="supporting" color="secondary">{orders.length} total orders</Text>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '0.5rem', border: '1px solid var(--color-border, #E7E5E4)', fontSize: '0.75rem', outline: 'none' }}>
            <option value="all">All Status</option>
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <Grid columns={order ? 2 : 1} gap={6}>
        <Card style={{ padding: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border, #E7E5E4)' }}>
                {['Order', 'Customer', 'Total', 'Status', 'Date'].map(header => (
                  <th key={header} style={{ padding: '0.75rem 0', textAlign: 'left', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-secondary, #78716C)' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(o => (
                <tr
                  key={o.id}
                  onClick={() => setSelectedOrder(o.id)}
                  style={{ borderBottom: '1px solid var(--color-border, #E7E5E4)', cursor: 'pointer', backgroundColor: selectedOrder === o.id ? 'var(--color-background-muted, #F5F5F4)' : 'transparent' }}
                >
                  <td style={{ padding: '0.75rem 0', fontSize: '0.875rem', fontFamily: 'monospace' }}>{o.id}</td>
                  <td style={{ padding: '0.75rem 0', fontSize: '0.875rem' }}>{o.customer}</td>
                  <td style={{ padding: '0.75rem 0', fontSize: '0.875rem', fontWeight: 500 }}>₦{o.total.toLocaleString('en-NG')}</td>
                  <td style={{ padding: '0.75rem 0' }}>
                    <span style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', fontWeight: 600, color: statusColors[o.status], backgroundColor: `${statusColors[o.status]}15`, borderRadius: '4px' }}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0', fontSize: '0.75rem', color: 'var(--color-text-secondary, #78716C)' }}>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {order && (
          <Card style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <Text type="body" weight="medium">Order {order.id}</Text>
              <button onClick={() => setSelectedOrder(null)} aria-label="Close order details" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary, #78716C)' }}>✕</button>
            </div>

            <Stack gap={4}>
              {/* Customer Info */}
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-background-muted, #F5F5F4)' }}>
                <Text type="label" color="secondary" style={{ marginBottom: '0.5rem', display: 'block' }}>Customer</Text>
                <Text type="body" weight="medium">{order.customer}</Text>
                <Text type="supporting" color="secondary">{order.email}</Text>
                <Text type="supporting" color="secondary">{order.phone}</Text>
              </div>

              {/* Delivery Address */}
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-background-muted, #F5F5F4)' }}>
                <Text type="label" color="secondary" style={{ marginBottom: '0.5rem', display: 'block' }}>Delivery Address</Text>
                <Text type="body">{order.address}</Text>
              </div>

              {/* Items */}
              <div>
                <Text type="label" color="secondary" style={{ marginBottom: '0.5rem', display: 'block' }}>Items</Text>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border, #E7E5E4)' }}>
                    <div>
                      <Text type="body">{item.name}</Text>
                      <Text type="supporting" color="secondary">{item.color} / {item.size} × {item.qty}</Text>
                    </div>
                    <Text type="body">₦{(item.price * item.qty).toLocaleString('en-NG')}</Text>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div style={{ borderTop: '1px solid var(--color-border, #E7E5E4)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <Text type="body" color="secondary">Subtotal</Text>
                  <Text type="body">₦{order.subtotal.toLocaleString('en-NG')}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <Text type="body" color="secondary">Shipping</Text>
                  <Text type="body">{order.shipping === 0 ? 'FREE' : `₦${order.shipping.toLocaleString('en-NG')}`}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                  <Text type="body" weight="medium">Total</Text>
                  <Text type="body" weight="medium">₦{order.total.toLocaleString('en-NG')}</Text>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <Text type="label" color="secondary" style={{ marginBottom: '0.5rem', display: 'block' }}>Update Status</Text>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {statusOptions.map(s => (
                    <button
                      key={s}
                      style={{
                        padding: '0.375rem 0.75rem', border: '1px solid',
                        borderColor: order.status === s ? statusColors[s] : 'var(--color-border, #E7E5E4)',
                        backgroundColor: order.status === s ? `${statusColors[s]}15` : 'transparent',
                        color: statusColors[s], fontSize: '0.7rem', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button label="Print Invoice" variant="secondary" />
                <Button label="Generate Label" variant="secondary" />
              </div>
            </Stack>
          </Card>
        )}
      </Grid>
    </div>
  );
}
