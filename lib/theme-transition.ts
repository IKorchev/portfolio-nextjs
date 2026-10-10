import { applyAccent, type Accent } from '@/lib/accents';
import { applyHighContrast } from '@/lib/contrast';

type Origin = { x: number; y: number };

// How long the circular reveal takes to cover the screen
const REVEAL_DURATION = 1200;

/**
 * Applies a visual change with a circular reveal spreading from `origin` (View Transitions API).
 * Falls back to an instant change when the API is missing or reduced motion is on.
 */
export function revealChange(apply: () => void, origin?: Origin) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduce) {
    apply();
    return;
  }

  const { x, y } = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(apply);
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      // Ease in and out so the slower reveal starts gently and settles softly
      { duration: REVEAL_DURATION, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
    );
  });
}

/** Switches the colour theme with the circular reveal */
export function switchAccent(accent: Accent, origin?: Origin) {
  revealChange(() => applyAccent(accent), origin);
}

/** Turns high contrast on or off with the circular reveal */
export function switchHighContrast(on: boolean, origin?: Origin) {
  revealChange(() => applyHighContrast(on), origin);
}

/** Switches light/dark/system with the circular reveal */
export function switchTheme(theme: string, setTheme: (theme: string) => void, origin?: Origin) {
  revealChange(() => {
    // next-themes updates the <html> class in an effect, which is too late for the
    // "after" snapshot, so apply the resolved class ourselves first
    const dark =
      theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
    setTheme(theme);
  }, origin);
}
