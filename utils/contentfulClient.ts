import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export type RichTextNode = {
  nodeType: string;
  value?: string;
  data?: { uri?: string };
  content?: RichTextNode[];
};

export type Project = {
  id?: number;
  title: string;
  projectDescription?: string;
  githubLink?: string;
  demoLink?: string;
  techStack?: string[];
  /** Contentful Date field, e.g. "2024-03-01" or "2024-03-01T00:00+01:00" */
  date?: string;
  /** Contentful Boolean field. Archived projects move to the compact "Earlier work" section */
  archived?: boolean;
  projectImage: {
    sys: { id: string };
    fields: { file: { url: string } };
  };
};

export type AboutEntry = {
  fields: { description?: RichTextNode };
};

/** The single "Site profile" entry */
export type Profile = {
  name: string;
  headline: string;
  tagline?: string;
  location?: string;
  focusAreas?: string[];
  company?: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  contactHeading?: string;
  contactText?: string;
  seoTitle?: string;
  seoDescription?: string;
  socialDescription?: string;
  socialImageUrl?: string;
  seoKeywords?: string[];
};

export type Role = {
  title: string;
  focus?: string;
  /** Contentful Date fields, e.g. "2025-05-01" */
  startDate: string;
  /** Empty for the current role */
  endDate?: string;
  description?: string;
  /** Short, concrete achievements shown as bullets */
  highlights?: string[];
  stack?: string[];
};

export type Skill = {
  name: string;
  /** Key into the icon map in utils/skills.ts */
  iconKey?: string;
  color?: string;
  order?: number;
};

export default client;
