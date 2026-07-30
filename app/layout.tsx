import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Advanced GroHair Velachery | Best Hair Transplant Clinic in Chennai",
  description:
    "Looking for a trusted hair clinic in Velachery? Advanced GroHair offers FUE hair transplant, Growth therapy, and expert trichologist consultations in Chennai. Book your free consultation today.",
  generator: 'Nextjs15',
  icons: {
    icon: [
      {
        url: "https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/royafav_ljlep1.jpg",
        sizes: "any",
      },
      {
        url: "https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/royafav_ljlep1.jpg",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/royafav_ljlep1.jpg",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/royafav_ljlep1.jpg",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        url: "https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/royafav_ljlep1.jpg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "https://res.cloudinary.com/cbqvdlot/image/upload/v1785397756/royafav_ljlep1.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <head>
        {/* Google Analytics 4 - G-FR90F9TQWP */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FR90F9TQWP"
        />
        <Script
          id="google-analytics-1"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FR90F9TQWP');
          `}
        </Script>
        
        {/* Google Ads - AW-11124508870 */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-11124508870"
        />
        <Script
          id="google-analytics-2"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11124508870');
          `}
        </Script>
        
        {/* Microsoft Clarity Tracking Code */}
        <Script
          id="microsoft-clarity-init"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vmdhtaaf5n");
          `}
        </Script>
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}