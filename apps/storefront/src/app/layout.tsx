import type { Metadata } from 'next';
import './globals.css';
import TomisNav from '@/components/TomisNav';
import TomisFooter from '@/components/TomisFooter';
import BackToTop from '@/components/BackToTop';
import PageTransition from '@/components/PageTransition';
import { ToastProvider } from '@/components/ui/Toast';

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
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ToastProvider>
          <TomisNav />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <TomisFooter />
          <BackToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
