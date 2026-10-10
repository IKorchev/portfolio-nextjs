// Colour themes ("accents") that sit on top of light/dark. The CSS tokens for each one live in
// styles/Global.css under [data-accent]; this file holds what JavaScript needs: the picker
// labels and swatches, and the colours the hero shader can't read from CSS.

export type Accent = 'teal' | 'ocean' | 'violet' | 'rose' | 'emerald';
type Rgb = [number, number, number];

export const ACCENTS: {
  id: Accent;
  label: string;
  swatch: string;
  /** Hero metal colours in light mode, blended across the surface */
  metal: [Rgb, Rgb, Rgb];
  /** How much of the accent tints the silver metal in dark mode */
  silverTint: number;
}[] = [
  { id: 'teal', label: 'Teal', swatch: '#14b8a6', metal: [[0.1, 0.72, 0.66], [0.2, 0.58, 0.92], [0.52, 0.42, 0.95]], silverTint: 0 },
  { id: 'ocean', label: 'Ocean', swatch: '#3b82f6', metal: [[0.2, 0.48, 0.95], [0.3, 0.75, 0.95], [0.45, 0.35, 0.92]], silverTint: 0.14 },
  { id: 'violet', label: 'Violet', swatch: '#8b5cf6', metal: [[0.55, 0.38, 0.95], [0.88, 0.45, 0.85], [0.32, 0.5, 0.95]], silverTint: 0.16 },
  { id: 'rose', label: 'Rose', swatch: '#f43f5e', metal: [[0.95, 0.38, 0.52], [0.98, 0.62, 0.72], [0.66, 0.4, 0.92]], silverTint: 0.14 },
  { id: 'emerald', label: 'Emerald', swatch: '#10b981', metal: [[0.12, 0.72, 0.45], [0.18, 0.68, 0.72], [0.55, 0.8, 0.32]], silverTint: 0.12 },
];

export const DEFAULT_ACCENT: Accent = 'teal';
const STORAGE_KEY = 'accent';
const EVENT = 'accentchange';

const isAccent = (value: unknown): value is Accent => ACCENTS.some((a) => a.id === value);

export const accentInfo = (accent: Accent) => ACCENTS.find((a) => a.id === accent) ?? ACCENTS[0];

/** Runs in <head> before the page paints, so a saved accent never flashes the default first */
export const ACCENT_INIT_SCRIPT = `try{var a=localStorage.getItem('${STORAGE_KEY}');if(a&&a!=='${DEFAULT_ACCENT}'&&${JSON.stringify(
  ACCENTS.map((a) => a.id),
)}.indexOf(a)>-1)document.documentElement.dataset.accent=a}catch(e){}`;

export function getAccent(): Accent {
  const value = document.documentElement.dataset.accent;
  return isAccent(value) ? value : DEFAULT_ACCENT;
}

/** Applies and remembers an accent. Pair with revealChange for the animated switch. */
export function applyAccent(accent: Accent) {
  const root = document.documentElement;
  if (accent === DEFAULT_ACCENT) delete root.dataset.accent;
  else root.dataset.accent = accent;
  try {
    localStorage.setItem(STORAGE_KEY, accent);
  } catch {}
  window.dispatchEvent(new CustomEvent<Accent>(EVENT, { detail: accent }));
}

export function onAccentChange(listener: (accent: Accent) => void) {
  const handler = (e: Event) => listener((e as CustomEvent<Accent>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
