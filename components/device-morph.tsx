'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';

// For the hidden Whiff screen: the picker reel spins through these before landing
const FRAGRANCES = ['Aventus', 'Sauvage', 'Bleu de Chanel', 'Santal 33', 'Oud Wood', 'Light Blue', 'Tobacco Vanille'];

/** A tiny version of Whiff, my fragrance app, shown when the phone is tapped */
function WhiffScreen() {
  const reduce = useReducedMotion();
  const [pick, setPick] = useState(0);
  const [settled, setSettled] = useState(!!reduce);

  useEffect(() => {
    const final = Math.floor(Math.random() * FRAGRANCES.length);
    if (reduce) {
      setPick(final);
      return;
    }
    // Each step waits a little longer, so the reel slows down before it lands
    let ticks = 0;
    let timer: ReturnType<typeof setTimeout>;
    const spin = () => {
      ticks++;
      if (ticks >= 14) {
        setPick(final);
        setSettled(true);
        return;
      }
      setPick((p) => (p + 1) % FRAGRANCES.length);
      timer = setTimeout(spin, 50 + ticks * ticks * 2);
    };
    timer = setTimeout(spin, 50);
    return () => clearTimeout(timer);
  }, [reduce]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='absolute inset-0 flex flex-col bg-card px-3 pt-2.5 pb-2'>
      <div className='flex items-center justify-between px-1 font-mono text-[8px] font-semibold'>
        <span>9:41</span>
        <span className='flex gap-0.5'>
          <span className='h-1.5 w-2.5 rounded-sm bg-foreground/60' />
          <span className='h-1.5 w-3.5 rounded-sm bg-foreground/60' />
        </span>
      </div>
      <p className='mt-4 text-[13px] font-semibold tracking-tight'>
        Whiff<span className='text-brand'>.</span>
      </p>
      <p className='text-[8px] text-muted-foreground'>Today&apos;s pick</p>
      <div className='mt-2 rounded-xl border border-primary/40 bg-primary/10 p-2'>
        <div className='h-4 overflow-hidden'>
          <motion.p
            key={pick}
            initial={reduce ? false : { y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.06 }}
            className={cn('text-[11px] font-semibold', settled && 'text-brand')}>
            {FRAGRANCES[pick]}
          </motion.p>
        </div>
        <p className='mt-0.5 text-[7px] text-muted-foreground'>{settled ? 'Worn 12× · last worn 4 days ago' : 'Spinning…'}</p>
      </div>
      <span className='mt-2 self-start rounded-full bg-primary px-2 py-0.5 text-[8px] font-semibold text-primary-foreground'>
        Wear today
      </span>
      <p className='mt-3 text-[8px] font-semibold text-muted-foreground'>Most worn this week</p>
      <div className='mt-1 flex flex-col gap-1'>
        {[90, 64, 41].map((width, i) => (
          <div key={width} className='flex items-center gap-1.5'>
            <span className='w-2 font-mono text-[7px] text-muted-foreground'>{i + 1}</span>
            <span className='h-1.5 rounded-full bg-primary/70' style={{ width: `${width}%` }} />
          </div>
        ))}
      </div>
      <div className='mt-auto flex justify-around border-t border-border pt-2'>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn('size-3 rounded-full', i === 1 ? 'bg-primary' : 'bg-foreground/15')} />
        ))}
      </div>
      <span className='mx-auto mt-2 h-1 w-1/3 rounded-full bg-foreground/40' />
    </motion.div>
  );
}

/**
 * A browser window that reshapes into a phone as `morph` goes from 0 to 1,
 * telling the web-to-mobile move in the Experience timeline. Once it's a phone,
 * tapping it opens a tiny Whiff screen.
 */
export function DeviceMorph({
  morph,
  size = 'lg',
  className,
}: {
  morph: MotionValue<number>;
  size?: 'sm' | 'lg';
  className?: string;
}) {
  const scale = size === 'lg' ? 1 : 0.82;
  const width = useTransform(morph, [0, 1], [320 * scale, 170 * scale]);
  const height = useTransform(morph, [0, 1], [216 * scale, 340 * scale]);
  const borderRadius = useTransform(morph, [0, 1], [12, 38 * scale]);
  const chromeHeight = useTransform(morph, [0, 0.5], [26, 0]);
  const chromeOpacity = useTransform(morph, [0, 0.35], [1, 0]);
  const webOpacity = useTransform(morph, [0.2, 0.55], [1, 0]);
  const phoneOpacity = useTransform(morph, [0.45, 0.85], [0, 1]);
  const islandOpacity = useTransform(morph, [0.6, 1], [0, 1]);
  const webLabelOpacity = useTransform(morph, [0.3, 0.5], [1, 0]);
  const mobileLabelOpacity = useTransform(morph, [0.5, 0.7], [0, 1]);

  // The Whiff screen only works on the finished phone, and closes if it turns back into a browser
  const [isPhone, setIsPhone] = useState(false);
  const [whiff, setWhiff] = useState(false);
  const [opened, setOpened] = useState(false);
  // The parent swaps in a static value for reduced motion, which never fires "change"
  useEffect(() => setIsPhone(morph.get() > 0.9), [morph]);
  useMotionValueEvent(morph, 'change', (v) => {
    setIsPhone(v > 0.9);
    if (v <= 0.9) setWhiff(false);
  });
  const toggleWhiff = () => {
    if (!isPhone) return;
    setOpened(true);
    setWhiff((w) => !w);
  };

  return (
    // Decorative, so it stays out of the accessibility tree; the Whiff screen is a pointer-only extra
    <div className={cn('flex flex-col items-center', className)} aria-hidden>
      <div className='flex items-center justify-center' style={{ height: 360 * scale }}>
        <motion.div
          style={{ width, height, borderRadius }}
          onClick={toggleWhiff}
          whileTap={isPhone ? { scale: 0.97 } : undefined}
          className={cn(
            'relative flex flex-col overflow-hidden border-[3px] border-foreground/15 bg-card shadow-2xl shadow-primary/10',
            isPhone && 'cursor-pointer',
          )}
        >
          <motion.div
            style={{ height: chromeHeight, opacity: chromeOpacity }}
            className='flex shrink-0 items-center gap-1.5 overflow-hidden border-b border-border bg-muted/60 px-2.5'
          >
            <span className='size-2 rounded-full bg-red-400/80' />
            <span className='size-2 rounded-full bg-amber-400/80' />
            <span className='size-2 rounded-full bg-green-400/80' />
            <span className='ml-2 h-3.5 flex-1 rounded-full bg-background/80 px-2 font-mono text-[8px] leading-[14px] text-muted-foreground'>
              ikorchev.com
            </span>
          </motion.div>

          <div className='relative flex-1'>
            <motion.div style={{ opacity: webOpacity }} className='absolute inset-0 flex flex-col gap-2 p-3'>
              <div className='flex items-center justify-between'>
                <span className='h-2 w-10 rounded-full bg-foreground/30' />
                <span className='flex gap-1.5'>
                  <span className='h-1.5 w-6 rounded-full bg-foreground/15' />
                  <span className='h-1.5 w-6 rounded-full bg-foreground/15' />
                  <span className='h-1.5 w-6 rounded-full bg-foreground/15' />
                </span>
              </div>
              <span className='mt-2 h-3 w-3/5 rounded-full bg-foreground/25' />
              <span className='h-2 w-2/5 rounded-full bg-foreground/15' />
              <span className='h-4 w-14 rounded-full bg-primary' />
              <div className='mt-auto grid grid-cols-3 gap-2'>
                {[0, 1, 2].map((i) => (
                  <span key={i} className='h-12 rounded-md border border-border bg-muted/70' />
                ))}
              </div>
            </motion.div>

            <motion.div style={{ opacity: phoneOpacity }} className='absolute inset-0 flex flex-col px-3 pt-2.5 pb-2'>
              <div className='flex items-center justify-between px-1 font-mono text-[8px] font-semibold'>
                <span>9:41</span>
                <span className='flex gap-0.5'>
                  <span className='h-1.5 w-2.5 rounded-sm bg-foreground/60' />
                  <span className='h-1.5 w-3.5 rounded-sm bg-foreground/60' />
                </span>
              </div>
              <span className='mt-5 h-3 w-1/2 rounded-full bg-foreground/30' />
              <div className='mt-3 flex flex-col gap-2'>
                {[0, 1, 2].map((i) => (
                  <div key={i} className='flex items-center gap-2 rounded-xl border border-border bg-muted/60 p-2'>
                    <span className={cn('size-6 shrink-0 rounded-lg', i === 0 ? 'bg-primary' : 'bg-foreground/15')} />
                    <span className='flex flex-1 flex-col gap-1'>
                      <span className='h-1.5 w-4/5 rounded-full bg-foreground/25' />
                      <span className='h-1.5 w-1/2 rounded-full bg-foreground/15' />
                    </span>
                  </div>
                ))}
              </div>
              <div className='mt-auto flex justify-around border-t border-border pt-2'>
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={cn('size-3 rounded-full', i === 0 ? 'bg-primary' : 'bg-foreground/15')} />
                ))}
              </div>
              <span className='mx-auto mt-2 h-1 w-1/3 rounded-full bg-foreground/40' />
            </motion.div>

            <AnimatePresence>{whiff && <WhiffScreen />}</AnimatePresence>

            <motion.span
              style={{ opacity: islandOpacity }}
              className='absolute top-1.5 left-1/2 h-3.5 w-12 -translate-x-1/2 rounded-full bg-foreground'
            />
          </div>
        </motion.div>
      </div>

      <div className='relative mt-3 h-5 w-full font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase'>
        <motion.span style={{ opacity: webLabelOpacity }} className='absolute inset-0 text-center'>
          Web · 2022
        </motion.span>
        <motion.span style={{ opacity: mobileLabelOpacity }} className='absolute inset-0 text-center text-brand'>
          Mobile · 2025
        </motion.span>
      </div>
      <p
        className={cn(
          'mt-1 h-4 text-[11px] text-muted-foreground transition-opacity duration-500',
          isPhone && !opened ? 'opacity-100' : 'opacity-0',
        )}>
        psst… tap the phone
      </p>
    </div>
  );
}
