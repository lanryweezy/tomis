'use client';

import Link from 'next/link';

export default function TomisFooter() {
  return (
    <footer style={{ backgroundColor: 'var(--inverted)', color: 'var(--inverted-text)', padding: '4rem 1rem 2rem', transition: 'background-color 0.3s, color 0.3s' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--inverted-text)', textDecoration: 'none' }}>Tomis</Link>
            <p style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', lineHeight: 1.6, marginTop: '1rem', maxWidth: '16rem' }}>
              The signature half-collar shirt. Designed for the life you actually live.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              {['Instagram', 'Twitter', 'TikTok'].map(s => (
                <a key={s} href="#" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{s}</a>
              ))}
            </div>
          </div>
          {[
            { title: 'Shop', items: ['Half-Collar Shirts', 'New Arrivals', 'Best Sellers', 'All Products'] },
            { title: 'Company', items: ['Our Story', 'Journal', 'Careers', 'Sustainability'] },
            { title: 'Support', items: ['Contact Us', 'FAQ', 'Shipping & Delivery', 'Returns & Exchanges', 'Size Guide'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>{col.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {col.items.map(item => (
                  <li key={item}><Link href={col.title === 'Shop' ? '/shop' : col.title === 'Company' ? '/about' : '/support'} style={{ fontSize: '0.875rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{item}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>Stay in the loop</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--inverted-text-muted)' }}>New drops, stories, and the Tomis way of dressing.</p>
            </div>
            <div style={{ display: 'flex', width: '100%', maxWidth: '24rem' }}>
              <input type="email" placeholder="Your email" style={{ flex: 1, padding: '0.75rem 1rem', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '0.875rem', outline: 'none' }} />
              <button style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--accent)', color: 'white', border: 'none', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.15em', cursor: 'pointer' }}>SUBSCRIBE</button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--inverted-text-muted)' }}>&copy; {new Date().getFullYear()} Tomis. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <Link key={item} href="/legal" style={{ fontSize: '0.75rem', color: 'var(--inverted-text-muted)', textDecoration: 'none' }}>{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
