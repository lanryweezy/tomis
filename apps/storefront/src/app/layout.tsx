import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'TOMIS — The Half-Collar Shirt',
    template: '%s | TOMIS',
  },
  description: 'The signature Tomis half-collar shirt. Designed for the life you actually live. Modern African smart casual.',
  keywords: ['tomis', 'half-collar', 'shirt', 'nigerian fashion', 'smart casual', 'lagos fashion', 'african fashion'],
  authors: [{ name: 'Tomis' }],
  creator: 'Tomis',
  publisher: 'Tomis',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tomis.ng'),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: '/',
    siteName: 'TOMIS',
    title: 'TOMIS — The Half-Collar Shirt',
    description: 'The signature Tomis half-collar shirt. Designed for the life you actually live.',
    images: [
      {
        url: '/images/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TOMIS Half-Collar Shirt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOMIS — The Half-Collar Shirt',
    description: 'The signature Tomis half-collar shirt. Designed for the life you actually live.',
    images: ['/images/brand/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
