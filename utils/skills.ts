import type { IconType } from 'react-icons';
import { HiCodeBracket, HiSparkles } from 'react-icons/hi2';
import {
  SiCss,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

// Skills themselves live in Contentful; each one picks its icon by key from this map.
// Keep the key list in the Skill "Icon key" help text (scripts/contentful-setup.mjs) in sync.
const icons: Record<string, IconType> = {
  html5: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  react: SiReact,
  'react-native': TbBrandReactNative,
  expo: SiExpo,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  firebase: SiFirebase,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  docker: SiDocker,
  vercel: SiVercel,
  figma: SiFigma,
  git: SiGit,
  github: SiGithub,
  ai: HiSparkles,
};

export const skillIcon = (key?: string): IconType => (key && icons[key]) || HiCodeBracket;
