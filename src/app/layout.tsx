import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseProvider } from '@/firebase/provider';
import { URL } from 'url';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import MainLayout from './(main)/layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  metadataBase: new URL('https://ugoai-studio.vercel.app'),
  title: {
    default: 'UGOAI Studio | Your Personal AI-Powered Creation Suite',
    template: '%s | UGOAI Studio',
  },
  description: 'Unlock your creative potential with a suite of intelligent tools. From writing assistants to image generators, UGO AI Studio has everything you need to create, innovate, and inspire.',
  manifest: '/manifest.json',
  verification: {
    google: 'W3MpZ-n3f__nszkbbn7M_8K2F8fttcYJTqwkJrwfX8o',
    other: {
       msvalidate: '63A610B3C9552E33F88103CB9AD8CF70',
    }
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'UGOAI Studio | Your Personal AI-Powered Creation Suite',
    description: 'Unlock your creative potential with a suite of intelligent tools. From writing assistants to image generators, UGO AI Studio has everything you need to create, innovate, and inspire.',
    url: 'https://ugoai-studio.vercel.app',
    siteName: 'UGOAI Studio',
    images: [
      {
        url: 'https://image2url.com/images/1763225334695-2ec6f3a1-974a-4506-9923-7bb2d19f5cf6.png', // Must be an absolute URL
        width: 1200,
        height: 630,
        alt: 'UGOAI Studio Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UGOAI Studio | Your Personal AI-Powered Creation Suite',
    description: 'Unlock your creative potential with a suite of intelligent tools. From writing assistants to image generators, UGO AI Studio has everything you need to create, innovate, and inspire.',
    creator: '@ugoyoungking',
    images: ['https://image2url.com/images/1763225334695-2ec6f3a1-974a-4506-9923-7bb2d19f5cf6.png'], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "UGOAI Studio",
      "alternateName": "UGO AI",
      "url": "https://ugoai-studio.vercel.app",
      "logo": "https://image2url.com/images/1763225334695-2ec6f3a1-974a-4506-9923-7bb2d19f5cf6.png",
      "founder": {
        "@type": "Person",
        "name": "Ugochukwu Jonathan",
        "url": "https://ugoai-studio.vercel.app/profile"
      },
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Innovation Drive",
        "addressLocality": "Lagos",
        "postalCode": "100001",
        "addressCountry": "NG"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@ugoai-studio.vercel.app"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "UGOAI Studio",
      "url": "https://ugoai-studio.vercel.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ugoai-studio.vercel.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://ugoai-studio.vercel.app"
        }
      ]
    }
  ];
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
        <FirebaseProvider>
           <MainLayout>
              {children}
           </MainLayout>
        </FirebaseProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
