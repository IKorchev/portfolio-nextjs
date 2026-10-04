import type { IconType } from 'react-icons';
import { SiCss, SiExpress, SiGit, SiHtml5, SiJavascript, SiNextdotjs, SiReact, SiTailwindcss } from 'react-icons/si';

type Skill = { name: string; icon: IconType; color?: string };

const skills: Skill[] = [
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS', icon: SiCss, color: '#663399' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Express', icon: SiExpress },
  { name: 'Git', icon: SiGit, color: '#F05032' },
];

export default skills;
