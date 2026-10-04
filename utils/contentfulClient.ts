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
  projectImage: {
    sys: { id: string };
    fields: { file: { url: string } };
  };
};

export type AboutEntry = {
  fields: { description?: RichTextNode };
};

export default client;
