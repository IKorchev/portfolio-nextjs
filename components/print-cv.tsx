import { formatDuration, formatMonthYear, monthsBetween } from '@/lib/date';
import type { Profile, Project, Role, Skill } from '@/utils/contentfulClient';

const bareUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

/**
 * A plain one-page CV that only exists on paper: hidden on screen, shown instead of the
 * site when someone prints (or picks "Print as CV" in the search menu).
 */
export function PrintCV({
  profile,
  roles,
  skills,
  projects,
}: {
  profile: Profile;
  roles: Role[];
  skills: Skill[];
  projects: Project[];
}) {
  const contacts = [profile.email, profile.linkedinUrl, profile.githubUrl, 'https://ikorchev.com']
    .filter((c): c is string => !!c)
    .map(bareUrl);
  const featured = projects.filter((p) => !p.archived).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

  return (
    <div className='hidden bg-white text-[10.5pt] leading-snug text-black print:block'>
      <header className='border-b border-black/20 pb-3'>
        <h1 className='text-[22pt] font-semibold tracking-tight'>{profile.name}</h1>
        <p className='mt-0.5 text-[11pt]'>
          {profile.headline}
          {profile.location && ` · ${profile.location}`}
        </p>
        <p className='mt-1 text-black/70'>{contacts.join('  ·  ')}</p>
        {profile.tagline && <p className='mt-2'>{profile.tagline}</p>}
      </header>

      {roles.length > 0 && (
        <section className='mt-4'>
          <h2 className='text-[9pt] font-semibold tracking-[0.15em] text-black/60 uppercase'>Experience</h2>
          {roles.map((role) => (
            <div key={role.startDate} className='mt-2 break-inside-avoid'>
              <div className='flex justify-between gap-4'>
                <p className='font-semibold'>
                  {role.title}
                  {role.focus && ` · ${role.focus}`}
                  {profile.company && `, ${profile.company}`}
                </p>
                <p className='shrink-0 text-black/70'>
                  {formatMonthYear(role.startDate)} – {role.endDate ? formatMonthYear(role.endDate) : 'Present'} (
                  {formatDuration(monthsBetween(role.startDate, role.endDate))})
                </p>
              </div>
              {role.description && <p className='mt-0.5'>{role.description}</p>}
              {!!role.highlights?.length && (
                <ul className='mt-0.5 list-disc pl-5'>
                  {role.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {!!role.stack?.length && <p className='mt-0.5 text-black/70'>{role.stack.join(', ')}</p>}
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className='mt-4'>
          <h2 className='text-[9pt] font-semibold tracking-[0.15em] text-black/60 uppercase'>Skills</h2>
          <p className='mt-1'>{skills.map((s) => s.name).join(', ')}</p>
        </section>
      )}

      {featured.length > 0 && (
        <section className='mt-4'>
          <h2 className='text-[9pt] font-semibold tracking-[0.15em] text-black/60 uppercase'>Selected projects</h2>
          {featured.map((project) => {
            // GitHub links read better on paper than demo URLs, which can be long storage links
            const link = project.githubLink ?? project.demoLink;
            return (
              <div key={project.title} className='mt-2 break-inside-avoid'>
                <div className='flex justify-between gap-4'>
                  <p className='font-semibold'>{project.title}</p>
                  {project.date && <p className='shrink-0 text-black/70'>{project.date.slice(0, 4)}</p>}
                </div>
                {project.projectDescription && <p className='mt-0.5'>{project.projectDescription}</p>}
                <p className='mt-0.5 text-black/70'>
                  {project.techStack?.map((t) => t.trim()).join(', ')}
                  {link && `${project.techStack?.length ? '  ·  ' : ''}${bareUrl(link)}`}
                </p>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
