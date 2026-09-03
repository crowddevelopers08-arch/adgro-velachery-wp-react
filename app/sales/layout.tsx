import type { Metadata } from 'next';
import type React from 'react';
import { plusJakartaSans } from '@/components/sales/fonts';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Advanced GroHair Velachery | Chennai's Trusted Hair Restoration Clinic",
  description:
    'Board-certified doctors, FDA-approved technology and 2,000+ successful transformations across 60+ clinics in India. Book a free hair consultation at our Velachery, Chennai center.',
  openGraph: {
    title: "Advanced GroHair Velachery | Chennai's Trusted Hair Restoration Clinic",
    description:
      'Board-certified doctors, FDA-approved technology and 2,000+ documented transformations. Free consultation at our Velachery, Chennai center.',
    type: 'website',
  },
};

export default function SalesLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Updated */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-W3BNH276');
            `,
          }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11239517140"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11239517140');
            `,
          }}
        />

        {/* OpenAI Pixel */}
        <Script
          id="openai-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");
              oaiq("init",{pixelId:"5my3eYc3MpSCrJNzJ2NQs6",debug:true});
            `,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) - Updated */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W3BNH276"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <div className={`${plusJakartaSans.className} text-[#1A1A1A] antialiased`}>
          {children}
        </div>
      </body>
    </html>
  );
}


// hi