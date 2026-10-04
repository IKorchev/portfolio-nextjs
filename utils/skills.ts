import type { IconType } from 'react-icons';
import { HiSparkles } from 'react-icons/hi2';
import {
  SiCss,
  SiExpo,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

type Skill = { name: string; icon: IconType; color?: string };

const skills: Skill[] = [
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss, color: '#663399' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'React Native', icon: TbBrandReactNative, color: '#61DAFB' },
  { name: 'Expo', icon: SiExpo },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Express', icon: SiExpress },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'AI / LLM apps', icon: HiSparkles, color: '#F59E0B' },
];

export default skills;
