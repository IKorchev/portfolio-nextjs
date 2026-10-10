'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_ACCENT, getAccent, onAccentChange, type Accent } from '@/lib/accents';
import { isHighContrast, onContrastChange } from '@/lib/contrast';

/** The active colour theme. Starts as the default on the server and syncs after hydration. */
export function useAccent(): Accent {
  const [accent, setAccent] = useState<Accent>(DEFAULT_ACCENT);
  useEffect(() => {
    setAccent(getAccent());
    return onAccentChange(setAccent);
  }, []);
  return accent;
}

/** Whether high contrast is on. Off on the server, synced after hydration. */
export function useHighContrast(): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(isHighContrast());
    return onContrastChange(setOn);
  }, []);
  return on;
}
