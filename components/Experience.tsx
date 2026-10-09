import { ExperienceStory } from '@/components/experience-story';
import { SectionHeading } from '@/components/SectionHeading';
import { formatDuration, formatMonthYear, monthsBetween } from '@/lib/date';
import { company, roles } from '@/utils/experience';

const Experience = () => {
  const totalMonths = monthsBetween(roles[roles.length - 1].start);
  // Oldest first, so scrolling down tells the web-to-mobile story
  const items = [...roles].reverse().map((role) => ({
    key: role.start,
    title: role.title,
    focus: role.focus,
    period: `${formatMonthYear(role.start)} – ${role.end ? formatMonthYear(role.end) : 'Present'}`,
    duration: formatDuration(monthsBetween(role.start, role.end)),
    description: role.description,
    highlights: role.highlights,
    stack: role.stack,
    current: !role.end,
  }));

  return (
    <section id='experience' className='mx-auto max-w-6xl px-4 py-24 sm:px-6'>
      <ExperienceStory
        company={company}
        items={items}
        heading={
          <SectionHeading eyebrow='Career' title='Experience'>
            {formatDuration(totalMonths)} building for the web and mobile.
          </SectionHeading>
        }
      />
    </section>
  );
};

export default Experience;
