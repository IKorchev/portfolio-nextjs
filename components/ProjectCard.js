import React from "react"

import Image from "next/image"
const AnimatedCards = ({ project }) => {
  console.log(project)
  const { projectImage, title, projectDescription, githubLink, demoLink } = project
  const imageURL = `https:${projectImage.fields.file.url}`
  return (
    //prettier-ignore
    <div className="flex mt-12 bg-gray-900">
      <div className="relative w-1/2">
        <Image layout="responsive" width="700" height="500" objectFit="cover" src={imageURL} />
      </div>
      <div className="container px-12">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p>{projectDescription}</p>
      </div>
    </div>
  )
}
export default AnimatedCards
