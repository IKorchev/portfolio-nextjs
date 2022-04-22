import { useEffect, useState } from "react"
import Badge from "../Badge"

const GithubLinks = () => {
  const [repos, setRepos] = useState(null)

  useEffect(() => {
    const getGithubRepos = async () => {
      const data = await fetch("https://api.github.com/users/ikorchev/repos")
      const jsonData = await data.json()
      console.log(jsonData)
      setRepos(jsonData)
    }
    getGithubRepos()
  }, [])
  return (
    <div className='p-5'>
      <details className='container max-w-7xl bg-darkgray border border-customgray mx-auto rounded-lg'>
        <summary className='text-xl py-5 px-5 cursor-pointer rounded-lg  text-white font-bold'>
          Github Repositories - <span className='self-end'>{repos?.length}</span>
        </summary>
        <ul className='flex gap-3 p-5 border-t border-customgray flex-wrap  mx-auto '>
          {repos?.map(({ name, html_url, id }) => (
            <li key={id}>
              <Badge text={name} link={html_url} />
            </li>
          ))}
        </ul>
      </details>
    </div>
  )
}

export default GithubLinks
