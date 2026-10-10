// Small browser-only helpers shared by the easter eggs. They talk through window events
// so the hero shader, the command menu and the Konami listener don't need shared state.

export type HeroFinish = 'default' | 'gold' | 'chrome' | 'holo' | 'matrix';

const FINISH_EVENT = 'easter:finish';
const TOAST_EVENT = 'easter:toast';

let currentFinish: HeroFinish = 'default';
let resetTimer: ReturnType<typeof setTimeout> | undefined;

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Repaints the hero metal. With a duration it switches back to the default afterwards. */
export function setHeroFinish(finish: HeroFinish, durationMs?: number) {
  clearTimeout(resetTimer);
  currentFinish = finish;
  window.dispatchEvent(new CustomEvent<HeroFinish>(FINISH_EVENT, { detail: finish }));
  if (durationMs) resetTimer = setTimeout(() => setHeroFinish('default'), durationMs);
}

export const getHeroFinish = () => currentFinish;

export function onHeroFinish(listener: (finish: HeroFinish) => void) {
  const handler = (e: Event) => listener((e as CustomEvent<HeroFinish>).detail);
  window.addEventListener(FINISH_EVENT, handler);
  return () => window.removeEventListener(FINISH_EVENT, handler);
}

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
}

export function onToast(listener: (message: string) => void) {
  const handler = (e: Event) => listener((e as CustomEvent<string>).detail);
  window.addEventListener(TOAST_EVENT, handler);
  return () => window.removeEventListener(TOAST_EVENT, handler);
}

/** Drops a shower of emoji down the screen. Skipped for reduced motion. */
export function emojiRain(emoji: string, count = 36) {
  if (prefersReducedMotion()) return;
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.setAttribute('data-print-hidden', '');
  layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:100';
  document.body.appendChild(layer);

  let longest = 0;
  for (let i = 0; i < count; i++) {
    const drop = document.createElement('span');
    drop.textContent = emoji;
    drop.style.cssText = `position:absolute;top:-48px;left:${Math.random() * 100}%;font-size:${20 + Math.random() * 20}px`;
    layer.appendChild(drop);
    const duration = 1800 + Math.random() * 1800;
    const delay = Math.random() * 1200;
    longest = Math.max(longest, duration + delay);
    drop.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 96}px) rotate(${Math.random() * 360 - 180}deg)`, opacity: 0.9 },
      ],
      { duration, delay, easing: 'cubic-bezier(0.4, 0, 0.8, 1)', fill: 'both' },
    );
  }
  setTimeout(() => layer.remove(), longest + 100);
}
