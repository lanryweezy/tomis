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
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${dmSerif.variable}`}>
      <body>
        <MotionProvider>
          <ToastProvider>
            <TomisNav />
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <TomisFooter />
            <BackToTop />
            <WhatsAppChat />
            <NewsletterPopup />
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
