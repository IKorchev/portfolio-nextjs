'use client';

import { useEffect } from 'react';

/**
 * One document-level listener that feeds the cursor position to whichever
 * [data-spotlight] element is under the pointer. The glow itself is pure CSS.
 */
export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-spotlight]');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
  return null;
}
