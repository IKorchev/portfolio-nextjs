export const SectionHeading = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className='mb-10 max-w-2xl'>
      <p className='font-mono text-xs tracking-[0.2em] text-brand uppercase'>{eyebrow}</p>
      <h2 className='mt-3 text-3xl font-semibold tracking-tight sm:text-4xl'>{title}</h2>
      {children && <p className='mt-4 text-muted-foreground'>{children}</p>}
    </div>
  );
};
