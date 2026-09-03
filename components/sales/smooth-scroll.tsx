'use client';

import { useEffect } from 'react';

/** Enables smooth in-page anchor scrolling only while this page is mounted, then restores default. */
export default function SmoothScroll() {
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  return null;
}
