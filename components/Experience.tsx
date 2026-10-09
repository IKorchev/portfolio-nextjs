import { Building2 } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDuration, formatMonthYear, monthsBetween } from '@/lib/date';
import { company, roles } from '@/utils/experience';

const Experience = () => {
  const totalMonths = monthsBetween(roles[roles.length - 1].start);
  return (
    <section id='experience' className='mx-auto max-w-6xl px-4 py-24 sm:px-6'>
      <div className='grid gap-10 lg:grid-cols-[1fr_2fr]'>
        <SectionHeading eyebrow='Career' title='Experience'>
          {formatDuration(totalMonths)} building for the web and mobile.
        </SectionHeading>
        <Card>
          <CardContent className='sm:px-8'>
            {company && (
              <p className='mb-6 flex items-center gap-2 font-semibold'>
                <Building2 className='size-4 text-brand' />
                {company}
              </p>
            )}
            <ol className='relative space-y-10 before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-border'>
              {roles.map((role) => {
                const current = !role.end;
                return (
                  <li key={role.start} className='relative pl-8'>
                    <span
                      className={`absolute top-1.5 left-0 size-[11px] rounded-full border-2 ${
                        current ? 'border-primary bg-primary' : 'border-muted-foreground/50 bg-card'
                      }`}>
                      {current && <span className='absolute inset-0 rounded-full motion-safe:animate-ping bg-primary/60' />}
                    </span>
                    <div className='flex flex-wrap items-center justify-between gap-x-4 gap-y-1'>
                      <h3 className='flex items-center gap-2 font-semibold'>
                        {role.title}
                        <Badge variant='outline'>{role.focus}</Badge>
                      </h3>
                      <p className='font-mono text-xs text-muted-foreground'>
                        {formatMonthYear(role.start)} – {role.end ? formatMonthYear(role.end) : 'Present'}
                        <span className='mx-1.5 opacity-50'>·</span>
                        {formatDuration(monthsBetween(role.start, role.end))}
                      </p>
                    </div>
                    <p className='mt-3 leading-relaxed text-muted-foreground'>{role.description}</p>
                    {!!role.highlights?.length && (
                      <ul className='mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground'>
                        {role.highlights.map((highlight) => (
                          <li key={highlight} className='flex gap-2.5'>
                            <span className='mt-2 size-1 shrink-0 rounded-full bg-brand' />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                    <ul className='mt-4 flex flex-wrap gap-2'>
                      {role.stack.map((tech) => (
                        <li key={tech}>
                          <Badge variant='secondary'>{tech}</Badge>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Experience;
