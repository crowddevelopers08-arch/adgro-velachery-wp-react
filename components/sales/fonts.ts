import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

export const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600'],
  variable: '--sales-font-display',
  display: 'swap',
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--sales-font-body',
  display: 'swap',
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--sales-font-mono',
  display: 'swap',
});

export const salesFontVariables = `${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`;
