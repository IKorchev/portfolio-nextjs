import links from "../utils/footerProjectLinks"
import Link from "next/link"

const GithubLinks = () => {
  return (
    <div className='mt:5 max-w-48 xl:mt-12'>
      <h3 className='mb-8 text-3xl text-center mt-10 text-white font-normal'>
        Github repositories
      </h3>
      <ul className='container mx-auto px-36 grid grid-cols-1 place-items-center lg:grid-cols-2'>
        {links.map(({ title, url }) => (
          <li className='text-trueGray-400 text-lg md:text-base whitespace-nowrap underline hover:text-trueGray-100'>
            <Link href={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GithubLinks
