export type Role = {
  title: string;
  focus: string;
  /** "YYYY-MM" */
  start: string;
  /** "YYYY-MM", omit for the current role */
  end?: string;
  description: string;
  /** Short, concrete achievements shown as bullets */
  highlights?: string[];
  stack: string[];
};

/** Shown above the roles when set */
export const company: string | undefined = undefined;

// Newest first
export const roles: Role[] = [
  {
    title: 'Software Engineer',
    focus: 'Mobile',
    start: '2025-05',
    description: 'Building cross-platform mobile apps with TypeScript, React Native and Expo.',
    stack: ['TypeScript', 'React Native', 'Expo'],
  },
  {
    title: 'Software Engineer',
    focus: 'Web',
    start: '2022-05',
    end: '2025-05',
    description:
      'Built e-commerce storefront features end to end: the frontend with HTML, JavaScript, TypeScript and React, and the backend on Salesforce Commerce Cloud (SFCC).',
    stack: ['React', 'TypeScript', 'JavaScript', 'HTML', 'SFCC'],
  },
];
