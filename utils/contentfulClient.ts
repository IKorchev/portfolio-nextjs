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

export default client;
