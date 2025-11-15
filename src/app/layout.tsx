import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseProvider } from '@/firebase/provider';

export const metadata: Metadata = {
  title: 'UGO AI Studio',
  description: 'Your personal AI-powered creation suite.',
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
      "url": "https://ugoai.studio.app",
      "logo": "https://ugoai.studio.app/logo.png",
      "founder": {
        "@type": "Person",
        "name": "Ugochukwu Jonathan",
        "alternateName": "Ugoyoungking"
      },
      "foundingDate": "2025",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Nigeria"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@ugoai.studio.app"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "UGOAI Studio",
      "url": "https://ugoai.studio.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://ugoai.studio.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
     {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ugochukwu Jonathan",
      "alternateName": "Ugoyoungking",
      "jobTitle": "Web Developer, AI Engineer",
      "url": "https://ugoyoungking.github.io/portfolio",
      "sameAs": "https://www.truelancer.com/freelancer/tlusera2eae11",
      "email": "mailto:ugochukwujonathan067@gmail.com",
      "telephone": "+2349127714886",
      "worksFor": {
        "@type": "Organization",
        "name": "UGOAI Studio"
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
          "item": "https://ugoai.studio.app"
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
         <style>{`
          :root {
            --font-code: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
          }
        `}</style>
      </head>
      <body className="font-body antialiased">
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
        <Toaster />
      </body>
    </html>
  );
}
