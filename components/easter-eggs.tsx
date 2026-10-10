'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { getHeroFinish, onToast, setHeroFinish, toast, type HeroFinish } from '@/lib/easter-eggs';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Each Konami entry moves to the next finish, ending back on the default
const FINISHES: { finish: HeroFinish; message: string }[] = [
  { finish: 'gold', message: '✨ Liquid gold unlocked' },
  { finish: 'chrome', message: '🪞 Polished chrome' },
  { finish: 'holo', message: '🌈 Holographic mode' },
  { finish: 'default', message: 'Back to the original finish' },
];

function greetConsole(githubUrl?: string) {
  const big = 'font: 600 20px/1.4 ui-sans-serif, system-ui; color: #2dd4bf';
  const body = 'font: 13px/1.6 ui-monospace, monospace; color: inherit';
  console.log(
    `%c👋 Hey, fellow developer!\n%cPoking around the source? Nice.\n${githubUrl ? `The code is on GitHub: ${githubUrl}\n` : ''}Try ↑ ↑ ↓ ↓ ← → ← → B A on the page, or "sudo hire" in the search menu (Ctrl/⌘ K).`,
    big,
    body,
  );
}

/** Console greeting, the Konami code and the toast that announces easter eggs */
export function EasterEggs({ githubUrl }: { githubUrl?: string }) {
  const [message, setMessage] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    greetConsole(githubUrl);
  }, [githubUrl]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const off = onToast((text) => {
      clearTimeout(timer);
      setMessage({ id: Date.now(), text });
      timer = setTimeout(() => setMessage(null), 2600);
    });
    return () => {
      off();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // The last few keys pressed, compared against the code as a sliding window
    let recent: string[] = [];
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable="true"]')) return;
      recent = [...recent, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (recent.join() !== KONAMI.join()) return;
      recent = [];
      const index = FINISHES.findIndex(({ finish }) => finish === getHeroFinish());
      const next = FINISHES[(index + 1) % FINISHES.length];
      setHeroFinish(next.finish);
      toast(next.message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div aria-live='polite' className='pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4'>
      <AnimatePresence>
        {message && (
          <motion.p
            key={message.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className='rounded-full border bg-card/90 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md'>
            {message.text}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
