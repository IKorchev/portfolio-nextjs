'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Play, RotateCcw, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type OutputLine = { text: string; tone?: 'muted' | 'success' | 'hint' };

const toneClass: Record<NonNullable<OutputLine['tone']>, string> = {
  muted: 'text-muted-foreground',
  success: 'text-brand',
  hint: 'text-code-keyword',
};

const LINE_DELAY = 380;

/** Editor chrome with a Run button that "executes" the snippet into a small terminal */
export function CodeWindow({
  filename,
  output,
  children,
}: {
  filename: string;
  output: OutputLine[];
  children: React.ReactNode;
}) {
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clear, []);

  const run = () => {
    clear();
    setOpen(true);
    setShown(0);
    output.forEach((_, i) => timers.current.push(setTimeout(() => setShown(i + 1), (i + 1) * LINE_DELAY)));
  };
  const close = () => {
    clear();
    setOpen(false);
  };
  const running = open && shown < output.length;

  return (
    <>
      <div className='flex items-center gap-1.5 border-b px-4 py-3'>
        <span className='size-3 rounded-full bg-[#ff5f57]' />
        <span className='size-3 rounded-full bg-[#febc2e]' />
        <span className='size-3 rounded-full bg-[#28c840]' />
        <span className='ml-3 font-mono text-xs text-muted-foreground'>{filename}</span>
        <button
          type='button'
          onClick={run}
          disabled={running}
          className='ml-auto inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-brand disabled:opacity-50'>
          {open && !running ? <RotateCcw className='size-3' /> : <Play className='size-3' />}
          {open && !running ? 'Re-run' : 'Run'}
        </button>
      </div>
      {children}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='overflow-hidden border-t bg-muted/40'>
            <div className='relative px-4 py-3 font-mono text-xs leading-6' role='log' aria-live='polite'>
              <button
                type='button'
                onClick={close}
                aria-label='Close output'
                className='absolute top-2.5 right-2.5 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground'>
                <X className='size-3.5' />
              </button>
              <p className='text-muted-foreground'>Terminal</p>
              {output.slice(0, shown).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn('pr-6 whitespace-pre-wrap', line.tone && toneClass[line.tone])}>
                  {line.text}
                </motion.p>
              ))}
              {running && <span className='inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-primary' />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
