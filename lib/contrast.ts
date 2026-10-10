// High contrast mode, set as data-contrast="high" on <html> and styled in styles/Global.css.
// It works with any light/dark mode and colour theme. Until the visitor picks, it follows the
// system's "increase contrast" setting (prefers-contrast: more).

const STORAGE_KEY = 'contrast';
const EVENT = 'contrastchange';

/** Runs in <head> before the page paints, alongside the accent script */
export const CONTRAST_INIT_SCRIPT = `try{var c=localStorage.getItem('${STORAGE_KEY}');if(c==='high'||(c===null&&matchMedia('(prefers-contrast: more)').matches))document.documentElement.dataset.contrast='high'}catch(e){}`;

export const isHighContrast = () => document.documentElement.dataset.contrast === 'high';

/** Applies and remembers the choice. Pair with revealChange for the animated switch. */
export function applyHighContrast(on: boolean) {
  const root = document.documentElement;
  if (on) root.dataset.contrast = 'high';
  else delete root.dataset.contrast;
  try {
    localStorage.setItem(STORAGE_KEY, on ? 'high' : 'normal');
  } catch {}
  window.dispatchEvent(new CustomEvent<boolean>(EVENT, { detail: on }));
}

export function onContrastChange(listener: (on: boolean) => void) {
  const handler = (e: Event) => listener((e as CustomEvent<boolean>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
