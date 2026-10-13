import type React from 'react';
import Script from 'next/script';

/**
 * Wraps /chatbot and /chatbot/thank-you. Renders inside the root layout, so it adds the
 * chatbot's own GTM container on top of the site-wide tags instead of a second <html>.
 */
export default function ChatbotLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google Tag Manager - Chatbot */}
      <Script
        id="gtm-chatbot"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M62TQ29J');
          `,
        }}
      />

      {/* Google Tag Manager (noscript) - Chatbot */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M62TQ29J"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      {children}
    </>
  );
}
