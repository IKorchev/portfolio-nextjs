import { ExperienceStory } from '@/components/experience-story';
import { SectionHeading } from '@/components/SectionHeading';
import { formatDuration, formatMonthYear, monthsBetween } from '@/lib/date';
import type { Role } from '@/utils/contentfulClient';

/** `roles` arrive newest first */
const Experience = ({ roles, company }: { roles: Role[]; company?: string }) => {
  if (!roles.length) return null;
  const totalMonths = monthsBetween(roles[roles.length - 1].startDate);
  // Oldest first, so scrolling down tells the web-to-mobile story
  const items = [...roles].reverse().map((role) => ({
    key: role.startDate,
    title: role.title,
    focus: role.focus,
    period: `${formatMonthYear(role.startDate)} – ${role.endDate ? formatMonthYear(role.endDate) : 'Present'}`,
    duration: formatDuration(monthsBetween(role.startDate, role.endDate)),
    description: role.description,
    highlights: role.highlights,
    stack: role.stack ?? [],
    current: !role.endDate,
  }));

  return (
    <section id='experience' className='mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16'>
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
