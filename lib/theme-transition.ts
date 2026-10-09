type Origin = { x: number; y: number };

/**
 * Switches theme with a circular reveal spreading from `origin` (View Transitions API).
 * Falls back to an instant switch when the API is missing or reduced motion is on.
 */
export function switchTheme(theme: string, setTheme: (theme: string) => void, origin?: Origin) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduce) {
    setTheme(theme);
    return;
  }

  const { x, y } = origin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(() => {
    // next-themes updates the <html> class in an effect, which is too late for the
    // "after" snapshot, so apply the resolved class ourselves first
    const dark =
      theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
    setTheme(theme);
  });

  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 550, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
    );
  });
}
