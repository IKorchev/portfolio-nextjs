import Badge from '../Badge';

const GithubLinks = async ({ repos }) => {
  const _repos = await repos;
  return (
    <pre>{JSON.stringify(_repos)}</pre>
    // <div className='p-5'>
    //   <details className='container max-w-7xl bg-darkgray border border-customgray mx-auto rounded-lg'>
    //     <summary className='text-xl py-5 px-5 cursor-pointer rounded-lg  text-white font-bold'>
    //       Github Repositories
    //       <span className='self-end'>{repos?.length ? ' - ' + repos.length : ' - ' + 0}</span>
    //     </summary>
    //     <ul className='flex gap-3 p-5 border-t border-customgray flex-wrap  mx-auto '>
    //       {repos?.map(({ name, html_url, id }) => (
    //         <li key={id}>
    //           <Badge text={name} link={html_url} />
    //         </li>
    //       ))}
    //     </ul>
    //   </details>
    // </div>
  );
};

export default GithubLinks;
