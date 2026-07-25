'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Products', href: '/admin/products', icon: '📦' },
  { label: 'Orders', href: '/admin/orders', icon: '🛒' },
  { label: 'Inventory', href: '/admin/inventory', icon: '📋' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--color-neutral-ink, #101114)', color: 'white', padding: '1.5rem', flexShrink: 0 }}>
        <Link href="/admin" style={{ textDecoration: 'none', marginBottom: '2rem', display: 'block' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontStyle: 'italic', color: 'white' }}>Tomis</h1>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin</p>
        </Link>

        <nav style={{ marginTop: '2rem' }}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 1rem', marginBottom: '0.25rem', borderRadius: '8px',
                textDecoration: 'none', fontSize: '0.875rem',
                backgroundColor: pathname === item.href ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: pathname === item.href ? 'white' : 'rgba(255,255,255,0.6)',
                transition: 'all 0.2s',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, backgroundColor: 'var(--color-background-body, #F7F7F4)', padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
