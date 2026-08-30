import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[var(--color-neutral-ink)] text-white">
      <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Image src="/images/brand/logo-light.svg" alt="TOMIS" width={120} height={24} className="h-6 w-auto mb-4" />
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
              The signature half-collar shirt. Designed for the life you actually live.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="mailto:hello@tomis.ng" className="text-xs tracking-wider text-neutral-400 hover:text-white transition-colors">EMAIL</a>
              <a href="https://wa.me/2349033967809" target="_blank" rel="noreferrer" className="text-xs tracking-wider text-neutral-400 hover:text-white transition-colors">WHATSAPP</a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Half-Collar Shirts', href: '/shop' },
                { label: 'New Arrivals', href: '/new-in' },
                { label: 'Best Sellers', href: '/shop' },
                { label: 'All Products', href: '/shop' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-neutral-400 hover:text-white focus-visible:outline-2 focus-visible:outline-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Story', href: '/about' },
                { label: 'Journal', href: '/journal' },
                { label: 'Careers', href: '/careers' },
                { label: 'Sustainability', href: '/sustainability' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-neutral-400 hover:text-white focus-visible:outline-2 focus-visible:outline-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Contact Us', href: '/support#contact' },
                { label: 'FAQ', href: '/support#faq' },
                { label: 'Shipping & Delivery', href: '/shipping' },
                { label: 'Returns & Exchanges', href: '/returns' },
                { label: 'Size Guide', href: '/size-guide' },
                { label: 'Care Guide', href: '/support#care' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-neutral-400 hover:text-white focus-visible:outline-2 focus-visible:outline-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="text-sm font-medium tracking-wide mb-1">Stay in the loop</h4>
              <p className="text-xs text-neutral-400">New drops, stories, and the Tomis way of dressing.</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex w-full md:w-auto">
              <input
                type="email"
                required
                id="footer-newsletter-email"
                aria-label="Email address for Tomis newsletter"
                placeholder="Your email"
                className="flex-1 md:w-64 px-4 py-3 bg-neutral-800 border border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-white focus-visible:ring-2 focus-visible:ring-white transition-colors"
              />
              <button type="submit" className="px-6 py-3 bg-[var(--color-brand-blue)] text-white text-xs font-medium tracking-widest uppercase hover:bg-[var(--color-brand-navy)] focus-visible:outline-2 focus-visible:outline-white transition-colors">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Tomis. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Cookie Policy', href: '/cookies' },
            ].map(item => (
              <Link key={item.label} href={item.href} className="text-xs text-neutral-500 hover:text-neutral-300 focus-visible:outline-2 focus-visible:outline-white transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
