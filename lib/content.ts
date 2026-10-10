import { cache } from 'react';
import contentfulClient, { type AboutEntry, type Profile, type Project, type Role, type Skill } from '@/utils/contentfulClient';

/**
 * Everything the homepage shows, fetched from Contentful in one request. Wrapped in
 * React's cache so the page and its metadata share the same fetch.
 *
 * Errors are deliberately not caught: if Contentful is down during a revalidation,
 * Next.js keeps serving the last good page instead of publishing an empty one.
 */
export const getContent = cache(async () => {
  const { items } = await contentfulClient.getEntries({ limit: 1000 });
  const ofType = <T>(id: string) =>
    items.filter((item) => item.sys.contentType.sys.id === id).map((item) => item.fields as unknown as T);

  const profile = ofType<Profile>('siteProfile')[0];
  if (!profile) throw new Error('No published "Site profile" entry in Contentful');

  return {
    profile,
    // Newest first
    roles: ofType<Role>('experienceRole').sort((a, b) => b.startDate.localeCompare(a.startDate)),
    skills: ofType<Skill>('skill').sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)),
    projects: ofType<Project>('portfolio'),
    about: items.find((item) => item.sys.contentType.sys.id === 'richText') as AboutEntry | undefined,
  };
});

export type Content = Awaited<ReturnType<typeof getContent>>;
