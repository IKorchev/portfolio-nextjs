import links from "../utils/footerProjectLinks"

const GithubLinks = () => {
  return (
    <div className='container px-36 mx-auto mt-5 max-w-48 xl:mt-12'>
      <h3 className='mb-8 text-3xl mt-10 text-center text-white font-normal'>
        Github Repositories
      </h3>
      <ul className=' mx-auto grid grid-cols-1 place-items-center lg:place-items-center md:grid-cols-2 lg:grid-cols-3'>
        {links.map(({ title, url }) => (
          <li
            key={title}
            className='text-trueGray-400 text-lg md:text-base whitespace-nowrap underline hover:text-trueGray-100'>
            <a href={url} target='_blank' rel='noreferrer'>
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GithubLinks
