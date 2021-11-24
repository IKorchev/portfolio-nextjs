import { useEffect, useState } from "react"

const GithubLinks = () => {
  const [repos, setRepos] = useState(null)
  useEffect(() => {
    const getGithubRepos = async () => {
      const data = await fetch("https://api.github.com/users/ikorchev/repos")
      const jsonData = await data.json()
      setRepos(jsonData)
    }
    getGithubRepos()
  }, [])
  return (
    <div className='container px-36 mx-auto mt-5 max-w-48 xl:mt-12'>
      <h3 className='mb-8 text-3xl mt-10 text-center text-white font-bold'>
        Github Repositories
      </h3>
      <ul className=' mx-auto grid grid-cols-1 place-items-center lg:place-items-center md:grid-cols-2 lg:grid-cols-3'>
        {repos?.map(({ name, html_url }) => (
          <li
            key={name}
            className='text-trueGray-200 text-lg md:text-base whitespace-nowrap underline hover:text-trueGray-100'>
            <a href={html_url} target='_blank' rel='noreferrer'>
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GithubLinks
