import type { Metadata } from 'next';
import { inter, cormorant, dmSerif } from '@/lib/fonts';
import './globals.css';
import TomisNav from '@/components/TomisNav';
import TomisFooter from '@/components/TomisFooter';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import { ToastProvider } from '@/components/ui/Toast';
import WhatsAppChat from '@/components/WhatsAppChat';
import NewsletterPopup from '@/components/NewsletterPopup';
import { MotionProvider } from '@/components/MotionProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { CartProvider } from '@/hooks/useCart';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: { default: 'TOMIS — The Half-Collar Shirt', template: '%s | TOMIS' },
  description: 'The signature Tomis half-collar shirt. Designed for the life you actually live. Modern African smart casual.',
  keywords: ['tomis', 'half-collar', 'shirt', 'nigerian fashion', 'smart casual', 'lagos fashion', 'african fashion'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tomis.fit'),
  openGraph: { type: 'website', locale: 'en_NG', siteName: 'TOMIS', title: 'TOMIS — The Half-Collar Shirt', description: 'The signature Tomis half-collar shirt. Designed for the life you actually live.' },
  twitter: { card: 'summary_large_image', title: 'TOMIS — The Half-Collar Shirt', description: 'The signature Tomis half-collar shirt. Designed for the life you actually live.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TOMIS',
    url: 'https://tomis.fit',
    logo: 'https://tomis.fit/images/brand/logo-light.svg',
    sameAs: ['https://www.instagram.com/tomis_inc/'],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'hello@tomis.ng',
      contactType: 'customer support',
      areaServed: 'NG',
      availableLanguage: 'en',
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${dmSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <MotionProvider>
          <CartProvider>
            <ToastProvider>
            <TomisNav />
            <PageTransition>
              <ErrorBoundary>
                <main id="main-content" tabIndex={-1} style={{ outline: 'none' }}>{children}</main>
              </ErrorBoundary>
            </PageTransition>
            <TomisFooter />
            <BackToTop />
            <WhatsAppChat />
            <NewsletterPopup />
          </ToastProvider>
          </CartProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
