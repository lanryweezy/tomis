'use client';

import { useState } from 'react';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Section } from '@astryxdesign/core/Section';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { products, formatPrice } from '@/data/products';

export default function AdminProducts() {
  const [view, setView] = useState<'grid' | 'list'>('list');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.75rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>Products</h1>
          <Text type="supporting" color="secondary">{products.length} products in your store</Text>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button label="Grid" variant={view === 'grid' ? 'primary' : 'secondary'} onClick={() => setView('grid')} />
          <Button label="List" variant={view === 'list' ? 'primary' : 'secondary'} onClick={() => setView('list')} />
          <Button label="+ Add Product" />
        </div>
      </div>

      {view === 'list' ? (
        <Card style={{ padding: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border, #E7E5E4)' }}>
                {['Product', 'Colour', 'Price', 'Stock', 'Status'].map(header => (
                  <th key={header} style={{ padding: '0.75rem 0', textAlign: 'left', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-secondary, #78716C)' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const variant = product.variants[0];
                return (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border, #E7E5E4)' }}>
                    <td style={{ padding: '0.75rem 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--color-background-muted, #F5F5F4)', overflow: 'hidden' }}>
                          <img src={variant.images[0]?.src} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <Text type="body" weight="medium">{product.name}</Text>
                          <Text type="supporting" color="secondary">{product.category}</Text>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '1rem', height: '1rem', borderRadius: '50%', backgroundColor: variant.colorCode }} />
                        <Text type="body">{variant.color}</Text>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem 0' }}>
                      <Text type="body" weight="medium">{formatPrice(variant.price)}</Text>
                    </td>
                    <td style={{ padding: '0.75rem 0' }}>
                      <Text type="body" style={{ color: variant.stockLevel < 10 ? '#DC2626' : 'var(--color-text-primary, #101114)' }}>
                        {variant.stockLevel}
                      </Text>
                    </td>
                    <td style={{ padding: '0.75rem 0' }}>
                      <span style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', fontWeight: 600, color: variant.inStock ? '#059669' : '#DC2626', backgroundColor: variant.inStock ? '#05966915' : '#DC262615', borderRadius: '4px' }}>
                        {variant.inStock ? 'Active' : 'Out of Stock'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      ) : (
        <Grid columns={4} gap={6}>
          {products.map(product => {
            const variant = product.variants[0];
            return (
              <Card key={product.id} style={{ padding: '1rem' }}>
                <div style={{ aspectRatio: '1', backgroundColor: 'var(--color-background-muted, #F5F5F4)', marginBottom: '0.75rem', overflow: 'hidden' }}>
                  <img src={variant.images[0]?.src} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <Text type="body" weight="medium" style={{ marginBottom: '0.25rem' }}>{product.name}</Text>
                <Text type="supporting" color="secondary" style={{ marginBottom: '0.5rem' }}>{variant.color}</Text>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text type="body" weight="medium">{formatPrice(variant.price)}</Text>
                  <Text type="supporting" style={{ color: variant.stockLevel < 10 ? '#DC2626' : 'var(--color-text-secondary, #78716C)' }}>
                    {variant.stockLevel} in stock
                  </Text>
                </div>
              </Card>
            );
          })}
        </Grid>
      )}
    </div>
  );
}
