'use client';

import { useState } from 'react';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { products } from '@/data/products';

export default function AdminInventory() {
  const [filter, setFilter] = useState<'all' | 'low' | 'out'>('all');

  const inventory = products.map(p => {
    const variant = p.variants[0];
    return {
      id: p.id,
      name: p.name,
      color: variant.color,
      colorCode: variant.colorCode,
      sku: variant.sku,
      stock: variant.stockLevel,
      inStock: variant.inStock,
      image: variant.images[0]?.src,
    };
  });

  const filtered = filter === 'all' ? inventory
    : filter === 'low' ? inventory.filter(i => i.stock < 10 && i.stock > 0)
    : inventory.filter(i => !i.inStock);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>Inventory</h1>
          <Text type="supporting" color="secondary">{inventory.length} variants tracked</Text>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['all', 'low', 'out'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.5rem 1rem', border: '1px solid',
                borderColor: filter === f ? 'var(--color-text-primary, #101114)' : 'var(--color-border, #E7E5E4)',
                backgroundColor: filter === f ? 'var(--color-text-primary, #101114)' : 'transparent',
                color: filter === f ? 'var(--color-background, #FAFAF9)' : 'var(--color-text-primary, #101114)',
                fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {f === 'all' ? 'All' : f === 'low' ? 'Low Stock' : 'Out of Stock'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <Grid columns={3} gap={6} style={{ marginBottom: '2rem' }}>
        <Card style={{ padding: '1.5rem', textAlign: 'center' }}>
          <Text type="label" color="secondary">Total Stock</Text>
          <Text type="body" weight="medium" style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
            {inventory.reduce((sum, i) => sum + i.stock, 0)}
          </Text>
        </Card>
        <Card style={{ padding: '1.5rem', textAlign: 'center' }}>
          <Text type="label" color="secondary">Low Stock Items</Text>
          <Text type="body" weight="medium" style={{ fontSize: '1.5rem', marginTop: '0.5rem', color: '#D97706' }}>
            {inventory.filter(i => i.stock < 10 && i.stock > 0).length}
          </Text>
        </Card>
        <Card style={{ padding: '1.5rem', textAlign: 'center' }}>
          <Text type="label" color="secondary">Out of Stock</Text>
          <Text type="body" weight="medium" style={{ fontSize: '1.5rem', marginTop: '0.5rem', color: '#DC2626' }}>
            {inventory.filter(i => !i.inStock).length}
          </Text>
        </Card>
      </Grid>

      {/* Inventory Table */}
      <Card style={{ padding: '1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border, #E7E5E4)' }}>
              {['Product', 'SKU', 'Stock', 'Status', 'Actions'].map(header => (
                <th key={header} style={{ padding: '0.75rem 0', textAlign: 'left', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-secondary, #78716C)' }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border, #E7E5E4)' }}>
                <td style={{ padding: '0.75rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'var(--color-background-muted, #F5F5F4)', overflow: 'hidden' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <Text type="body" weight="medium">{item.name}</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: item.colorCode }} />
                        <Text type="supporting" color="secondary">{item.color}</Text>
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 0', fontSize: '0.75rem', fontFamily: 'monospace' }}>{item.sku}</td>
                <td style={{ padding: '0.75rem 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '6rem', height: '6px', backgroundColor: 'var(--color-background-muted, #F5F5F4)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(100, (item.stock / 50) * 100)}%`, height: '100%', backgroundColor: item.stock < 10 ? '#DC2626' : item.stock < 20 ? '#D97706' : '#059669', borderRadius: '3px' }} />
                    </div>
                    <Text type="body" weight="medium">{item.stock}</Text>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 0' }}>
                  <span style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', fontWeight: 600, color: !item.inStock ? '#DC2626' : item.stock < 10 ? '#D97706' : '#059669', backgroundColor: !item.inStock ? '#DC262615' : item.stock < 10 ? '#D9770615' : '#05966915', borderRadius: '4px' }}>
                    {!item.inStock ? 'Out of Stock' : item.stock < 10 ? 'Low Stock' : 'In Stock'}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 0' }}>
                  <Button label="Adjust" variant="secondary" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
