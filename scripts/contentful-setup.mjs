// Creates the content types the site reads (site profile, experience roles, skills) and
// seeds them with the content that used to be hard-coded. Safe to re-run: existing content
// types only get missing fields added, and existing entries are never overwritten.
//
//   node --env-file=.env.local scripts/contentful-setup.mjs
//
// Needs CONTENTFUL_SPACE and a Content Management token in CONTENTFUL_CMA_TOKEN.

const { CONTENTFUL_SPACE: space, CONTENTFUL_CMA_TOKEN: token, CONTENTFUL_ENVIRONMENT: env = 'master' } = process.env;
if (!space || !token) throw new Error('Set CONTENTFUL_SPACE and CONTENTFUL_CMA_TOKEN');

const base = `https://api.contentful.com/spaces/${space}/environments/${env}`;
const LOCALE = 'en-US';

async function cma(method, path, { body, headers = {} } = {}) {
  const res = await fetch(base + path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/vnd.contentful.management.v1+json',
      ...headers,
    },
    body: body && JSON.stringify(body),
  });
  if (res.status === 404 && method === 'GET') return null;
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}\n${await res.text()}`);
  return res.json();
}

const symbol = (id, name, extra = {}) => ({ id, name, type: 'Symbol', ...extra });
const text = (id, name, extra = {}) => ({ id, name, type: 'Text', ...extra });
const list = (id, name, extra = {}) => ({ id, name, type: 'Array', items: { type: 'Symbol' }, ...extra });
const help = (helpText) => ({ helpText });

const contentTypes = [
  {
    id: 'siteProfile',
    name: 'Site profile',
    description: 'Single entry with the personal details and copy used across the site.',
    displayField: 'name',
    fields: [
      symbol('name', 'Name', { required: true }),
      symbol('headline', 'Headline', { required: true }),
      text('tagline', 'Tagline'),
      symbol('location', 'Location'),
      list('focusAreas', 'Focus areas'),
      symbol('company', 'Company'),
      symbol('email', 'Email', { required: true, validations: [{ regexp: { pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' } }] }),
      symbol('githubUrl', 'GitHub URL'),
      symbol('linkedinUrl', 'LinkedIn URL'),
      symbol('contactHeading', 'Contact heading'),
      text('contactText', 'Contact text'),
      symbol('seoTitle', 'SEO title'),
      text('seoDescription', 'SEO description'),
      text('socialDescription', 'Social share description'),
      symbol('socialImageUrl', 'Social share image URL'),
      list('seoKeywords', 'SEO keywords'),
    ],
    help: {
      headline: 'Shown in the badge above your name in the hero',
      tagline: 'The sentence under your name in the hero',
      focusAreas: 'Listed in the hero code card, e.g. Mobile, Web, AI',
      company: 'Optional. Shown above the roles in Experience',
      socialDescription: 'Used when the link is shared on social media. Falls back to the SEO description',
    },
  },
  {
    id: 'experienceRole',
    name: 'Experience role',
    description: 'One role in the Experience timeline. Leave the end date empty for your current role.',
    displayField: 'title',
    fields: [
      symbol('title', 'Title', { required: true }),
      symbol('focus', 'Focus'),
      { id: 'startDate', name: 'Start date', type: 'Date', required: true },
      { id: 'endDate', name: 'End date', type: 'Date' },
      text('description', 'Description'),
      list('highlights', 'Highlights'),
      list('stack', 'Stack'),
    ],
    help: {
      focus: 'Short label shown next to the title, e.g. Web or Mobile',
      endDate: 'Leave empty for your current role',
      highlights: 'Optional. Short achievements shown as bullet points',
    },
  },
  {
    id: 'skill',
    name: 'Skill',
    description: 'A badge in the hero skills list.',
    displayField: 'name',
    fields: [
      symbol('name', 'Name', { required: true }),
      symbol('iconKey', 'Icon key'),
      symbol('color', 'Icon colour', { validations: [{ regexp: { pattern: '^#[0-9A-Fa-f]{6}$' } }] }),
      { id: 'order', name: 'Order', type: 'Integer' },
    ],
    help: {
      iconKey:
        'One of: html5, css, javascript, typescript, tailwind, react, react-native, expo, nextjs, nodejs, express, firebase, supabase, postgresql, docker, vercel, figma, git, github, ai. Unknown keys show a generic icon',
      color: 'Optional hex colour, e.g. #61DAFB. Leave empty to use the text colour',
      order: 'Lower numbers come first',
    },
  },
];

const entries = [
  {
    id: 'siteProfile',
    type: 'siteProfile',
    fields: {
      name: 'Ivaylo Korchev',
      headline: 'Software Engineer',
      tagline: 'Building web and mobile apps with React, React Native and a growing focus on AI.',
      location: 'London, UK',
      focusAreas: ['Mobile', 'Web', 'AI'],
      email: 'korchev94@gmail.com',
      githubUrl: 'https://github.com/ikorchev/',
      linkedinUrl: 'https://linkedin.com/in/ivaylo-korchev/',
      contactHeading: "Let's build something together.",
      contactText: 'Have a project in mind or just want to say hi? My inbox is always open.',
      seoTitle: 'Ivaylo Korchev | Portfolio',
      seoDescription: 'Portfolio showcasing my work.',
      socialDescription: 'Portfolio showcasing my skills and projects that I have done throughout my coding journey.',
      socialImageUrl: 'https://i.ibb.co/SBmGbrd/ikorchev-com.png',
      seoKeywords: ['Ivaylo', 'Korchev', 'Software Engineer', 'Web', 'Mobile', 'React', 'React Native', 'Expo', 'Next.js', 'AI'],
    },
  },
  {
    id: 'role-2025-05-mobile',
    type: 'experienceRole',
    fields: {
      title: 'Software Engineer',
      focus: 'Mobile',
      startDate: '2025-05-01',
      description: 'Building cross-platform mobile apps with TypeScript, React Native and Expo.',
      stack: ['TypeScript', 'React Native', 'Expo'],
    },
  },
  {
    id: 'role-2022-05-web',
    type: 'experienceRole',
    fields: {
      title: 'Software Engineer',
      focus: 'Web',
      startDate: '2022-05-01',
      endDate: '2025-05-01',
      description:
        'Built e-commerce storefront features end to end: the frontend with HTML, JavaScript, TypeScript and React, and the backend on Salesforce Commerce Cloud (SFCC).',
      stack: ['React', 'TypeScript', 'JavaScript', 'HTML', 'SFCC'],
    },
  },
  ...[
    ['HTML5', 'html5', '#E34F26'],
    ['CSS', 'css', '#663399'],
    ['JavaScript', 'javascript', '#F7DF1E'],
    ['Tailwind CSS', 'tailwind', '#06B6D4'],
    ['React', 'react', '#61DAFB'],
    ['React Native', 'react-native', '#61DAFB'],
    ['Expo', 'expo'],
    ['Next.js', 'nextjs'],
    ['Express', 'express'],
    ['Git', 'git', '#F05032'],
    ['AI / LLM apps', 'ai', '#F59E0B'],
  ].map(([name, iconKey, color], i) => ({
    id: `skill-${iconKey}`,
    type: 'skill',
    fields: { name, iconKey, ...(color && { color }), order: (i + 1) * 10 },
  })),
];

async function publish(kind, id, version) {
  return cma('PUT', `/${kind}/${id}/published`, { headers: { 'X-Contentful-Version': String(version) } });
}

async function upsertContentType({ id, name, description, displayField, fields, help: helpTexts = {} }) {
  const existing = await cma('GET', `/content_types/${id}`);
  if (existing) {
    const missing = fields.filter((f) => !existing.fields.some((e) => e.id === f.id));
    if (!missing.length) {
      console.log(`content type ${id}: exists, nothing to add`);
      return;
    }
    const updated = await cma('PUT', `/content_types/${id}`, {
      body: { name: existing.name, description: existing.description, displayField: existing.displayField, fields: [...existing.fields, ...missing] },
      headers: { 'X-Contentful-Version': String(existing.sys.version) },
    });
    await publish('content_types', id, updated.sys.version);
    await applyHelpTexts(id, missing.map((f) => f.id), helpTexts);
    console.log(`content type ${id}: added ${missing.map((f) => f.id).join(', ')}`);
    return;
  }
  const created = await cma('PUT', `/content_types/${id}`, { body: { name, description, displayField, fields } });
  await publish('content_types', id, created.sys.version);
  await applyHelpTexts(id, fields.map((f) => f.id), helpTexts);
  console.log(`content type ${id}: created`);
}

// Help texts live on the editor interface, which Contentful creates alongside the type.
// Only the given fields are touched, so editor tweaks made in the web app are kept.
async function applyHelpTexts(id, fieldIds, helpTexts) {
  const targets = fieldIds.filter((fieldId) => helpTexts[fieldId]);
  if (!targets.length) return;
  const ui = await cma('GET', `/content_types/${id}/editor_interface`);
  if (!ui) {
    console.warn(`content type ${id}: editor interface wasn't ready, so help texts were skipped`);
    return;
  }
  const controls = [...(ui.controls ?? [])];
  for (const fieldId of targets) {
    const index = controls.findIndex((c) => c.fieldId === fieldId);
    const control = index >= 0 ? controls[index] : { fieldId };
    const next = { ...control, settings: { ...control.settings, ...help(helpTexts[fieldId]) } };
    if (index >= 0) controls[index] = next;
    else controls.push(next);
  }
  await cma('PUT', `/content_types/${id}/editor_interface`, {
    body: { controls },
    headers: { 'X-Contentful-Version': String(ui.sys.version) },
  });
}

async function upsertEntry({ id, type, fields }) {
  if (await cma('GET', `/entries/${id}`)) {
    console.log(`entry ${id}: exists, left as is`);
    return;
  }
  const localized = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, { [LOCALE]: v }]));
  const created = await cma('PUT', `/entries/${id}`, {
    body: { fields: localized },
    headers: { 'X-Contentful-Content-Type': type },
  });
  await publish('entries', id, created.sys.version);
  console.log(`entry ${id}: created and published`);
}

for (const type of contentTypes) await upsertContentType(type);
for (const entry of entries) await upsertEntry(entry);
console.log('\nDone.');
