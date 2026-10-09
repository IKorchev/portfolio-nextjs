'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { Building2 } from 'lucide-react';
import { DeviceMorph } from '@/components/device-morph';
import { Reveal } from '@/components/reveal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type TimelineItem = {
  key: string;
  title: string;
  focus: string;
  period: string;
  duration: string;
  description: string;
  highlights?: string[];
  stack: string[];
  current: boolean;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Lights up once the drawn line reaches it */
function TimelineDot({ progress, stop, current }: { progress: MotionValue<number>; stop: number; current: boolean }) {
  const [lit, setLit] = useState(false);
  useEffect(() => setLit(progress.get() >= stop - 0.01), [progress, stop]);
  useMotionValueEvent(progress, 'change', (v) => setLit(v >= stop - 0.01));
  return (
    <span
      className={cn(
        'absolute top-1.5 left-0 size-[11px] rounded-full border-2 transition-colors duration-300',
        lit ? 'border-primary bg-primary' : 'border-muted-foreground/50 bg-card',
      )}
    >
      {current && lit && <span className='absolute inset-0 rounded-full bg-primary/60 motion-safe:animate-ping' />}
    </span>
  );
}

export function ExperienceStory({
  heading,
  company,
  items,
}: {
  heading: React.ReactNode;
  company?: string;
  items: TimelineItem[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const mobileDeviceRef = useRef<HTMLDivElement>(null);
  // The server can't know the visitor's preference, so apply it after hydration
  const prefersReducedMotion = useReducedMotion();
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(!!prefersReducedMotion), [prefersReducedMotion]);

  // Where each dot sits along the line (0–1), measured so the line and dots line up exactly
  const [stops, setStops] = useState(() => items.map((_, i) => i / items.length));
  const lastStop = useRef(stops[stops.length - 1]);
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const next = Array.from(list.children)
        .filter((el): el is HTMLLIElement => el.tagName === 'LI')
        .map((li) => clamp01((li.offsetTop + 8) / list.offsetHeight));
      lastStop.current = next[next.length - 1];
      setStops(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  // Desktop: the line and the device both follow the section scrolling through the viewport
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 75%', 'end 60%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const full = useMotionValue(1);
  const progress = reduce ? full : smooth;
  // The device turns into a phone as the line approaches the mobile role
  const morph = useTransform(progress, (v) => clamp01((v - (lastStop.current - 0.25)) / 0.25));

  // Mobile: the device sits above the timeline, so it morphs while it crosses the screen
  const { scrollYProgress: deviceProgress } = useScroll({
    target: mobileDeviceRef,
    offset: ['start 85%', 'end 35%'],
  });
  const mobileMorph = useTransform(useSpring(deviceProgress, { stiffness: 120, damping: 30 }), [0.25, 0.75], [0, 1]);

  return (
    <div ref={sectionRef} className='grid gap-10 lg:grid-cols-[1fr_2fr]'>
      <div>
        <Reveal>{heading}</Reveal>
        <DeviceMorph morph={reduce ? full : morph} className='mt-4 hidden lg:flex' />
        <div ref={mobileDeviceRef} className='lg:hidden'>
          <DeviceMorph morph={reduce ? full : mobileMorph} size='sm' />
        </div>
      </div>
      <Reveal>
        <Card data-spotlight>
          <CardContent className='sm:px-8'>
            {company && (
              <p className='mb-6 flex items-center gap-2 font-semibold'>
                <Building2 className='size-4 text-brand' />
                {company}
              </p>
            )}
            <ol ref={listRef} className='relative space-y-10'>
              <span className='absolute top-2 bottom-2 left-[5px] w-px bg-border' />
              <motion.span
                style={{ scaleY: progress }}
                className='absolute top-2 bottom-2 left-[5px] w-px origin-top bg-primary'
              />
              {items.map((item, i) => (
                <li key={item.key} className='relative pl-8'>
                  <TimelineDot progress={progress} stop={stops[i]} current={item.current} />
                  <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-1'>
                    <h3 className='flex items-center gap-2 font-semibold'>
                      {item.title}
                      <Badge variant='outline'>{item.focus}</Badge>
                    </h3>
                    <p className='font-mono text-xs text-muted-foreground'>
                      {item.period}
                      <span className='mx-1.5 opacity-50'>·</span>
                      {item.duration}
                    </p>
                  </div>
                  <p className='mt-3 leading-relaxed text-muted-foreground'>{item.description}</p>
                  {!!item.highlights?.length && (
                    <ul className='mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground'>
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className='flex gap-2.5'>
                          <span className='mt-2 size-1 shrink-0 rounded-full bg-brand' />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                  <ul className='mt-4 flex flex-wrap gap-2'>
                    {item.stack.map((tech) => (
                      <li key={tech}>
                        <Badge variant='secondary'>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
