'use client';

import { useEffect, useState } from 'react';

// A guess at what I'm up to, by hour of the day
function status(hour: number, weekend: boolean) {
  if (hour < 7) return 'probably asleep 😴';
  if (hour < 9) return 'on the first coffee ☕';
  if (hour < 18) return weekend ? 'probably outside for once 🌳' : 'probably shipping something 🚀';
  if (hour < 23) return 'tinkering with side projects 🛠️';
  return 'winding down 🌙';
}

/** "It's 9:42 pm in London, UK · probably shipping something". Client-only, so the time is the visitor's now. */
export function LocalTime({ timeZone = 'Europe/London', location }: { timeZone?: string; location?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Keep the line's height so nothing shifts when the time appears
  if (!now) return <p className='mt-6 h-5' aria-hidden />;

  let time: string, hour: number, weekday: string;
  try {
    time = now.toLocaleTimeString('en-GB', { timeZone, hour: 'numeric', minute: '2-digit', hour12: true });
    hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone, hour: 'numeric', hourCycle: 'h23' }).format(now));
    weekday = new Intl.DateTimeFormat('en-GB', { timeZone, weekday: 'short' }).format(now);
  } catch {
    return <p className='mt-6 h-5' aria-hidden />; // invalid time zone in Contentful
  }

  return (
    <p className='mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground'>
      <span className='relative flex size-2'>
        <span className='absolute inline-flex size-full rounded-full bg-primary/60 motion-safe:animate-ping' />
        <span className='relative inline-flex size-2 rounded-full bg-primary' />
      </span>
      <span>
        It&apos;s <span className='font-mono text-foreground'>{time}</span>
        {location && ` in ${location}`} · {status(hour, weekday === 'Sat' || weekday === 'Sun')}
      </span>
    </p>
  );
}
