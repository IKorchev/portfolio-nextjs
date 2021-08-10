import React from "react"

const BackgroundObjects = (props) => {
  return (
    <div {...props}>
      <div className='rounded-full absolute bg-darkgray w-48 h-48 top-2/6 right-12'></div>
      <div className='rounded-full absolute bg-darkgray w-12 h-12 top-2/6 right-96'></div>
      <div className='rounded-full absolute bg-darkgray w-24 h-24 top-2/6 left-12 '></div>
    </div>
  )
}

export default BackgroundObjects
