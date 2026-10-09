'use client';

import { motion, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * A browser window that reshapes into a phone as `morph` goes from 0 to 1,
 * telling the web-to-mobile move in the Experience timeline.
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

  return (
    <div className={cn('flex flex-col items-center', className)} aria-hidden>
      <div className='flex items-center justify-center' style={{ height: 360 * scale }}>
        <motion.div
          style={{ width, height, borderRadius }}
          className='relative flex flex-col overflow-hidden border-[3px] border-foreground/15 bg-card shadow-2xl shadow-primary/10'
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
    </div>
  );
}
