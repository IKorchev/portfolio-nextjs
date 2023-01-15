export const SectionTitle = ({ name }) => {
  return (
    <div className='flex flex-col'>
      <h1 className='z-10 text-center mx-auto px-3 rounded-sm text-3xl lg:text-5xl py-2 bg-white tracking-giant'>
        <span className='text-center -mr-2 whitespace-nowrap'>{name}</span>
      </h1>
      <div className='bg-white h-1 w-full -mt-8 z-0' />
    </div>
  );
};
