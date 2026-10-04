import Image from 'next/image';
import { Calendar, Code, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Project } from '@/utils/contentfulClient';

// Read year and month straight from the string so a timezone offset can't shift the month
const formatDate = (date: string) => {
  const [year, month] = date.split('-').map(Number);
  if (!year || !month) return null;
  return new Date(Date.UTC(year, month - 1)).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

const ProjectCard = ({ project }: { project: Project }) => {
  const { projectImage, title, projectDescription, githubLink, demoLink, techStack, date } = project;
  const formattedDate = date && formatDate(date);
  const imageURL = `https:${projectImage.fields.file.url}`; //contentful formats the url without the protocol
  return (
    <Card
      id={`project_${projectImage.sys.id}`}
      className='group gap-0 overflow-hidden py-0 transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5'>
      <a href={demoLink} target='_blank' rel='noreferrer' className='relative block aspect-video overflow-hidden border-b'>
        <Image
          src={imageURL}
          alt={title || ''}
          fill
          sizes='(min-width: 768px) 560px, 100vw'
          className='object-cover transition duration-500 group-hover:scale-[1.03]'
        />
      </a>
      <CardHeader className='pt-6'>
        <CardTitle className='text-xl tracking-tight'>{title}</CardTitle>
        {formattedDate && (
          <CardAction>
            <time
              dateTime={date}
              className='flex items-center gap-1.5 font-mono text-xs whitespace-nowrap text-muted-foreground'>
              <Calendar className='size-3.5' />
              {formattedDate}
            </time>
          </CardAction>
        )}
        <CardDescription className='text-base'>{projectDescription}</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pt-5'>
        {!!techStack?.length && (
          <ul className='flex flex-wrap gap-2'>
            {techStack.map((el) => (
              <li key={el}>
                <Badge variant='secondary'>{el}</Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter className='gap-3 py-6'>
        {demoLink && (
          <Button asChild className='rounded-full'>
            <a href={demoLink} target='_blank' rel='noreferrer'>
              <Play /> Live demo
            </a>
          </Button>
        )}
        {githubLink && (
          <Button variant='outline' asChild className='rounded-full'>
            <a href={githubLink} target='_blank' rel='noreferrer'>
              <Code /> Source
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default ProjectCard;
