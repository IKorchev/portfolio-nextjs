import React from "react"

const SideComponent = () => {
  return (
    <div className='sidebar'>
      <a
        data-bs-toggle='collapse'
        href='#collapseExample'
        role='button'
        aria-expanded='false'
        aria-controls='collapseExample'>
        <i className='bi bi-three-dots'></i>
      </a>
      <div className='social-links collapse' id='collapseExample'>
        <div className='d-flex flex-column py-2'>
          <a href='https://github.com/ikorchev' target='_blank' rel='noreferrer'>
            <i className='bi bi-github'></i>
          </a>
          <a
            href='https://linkedin.com/in/ivaylo-korchev'
            target='_blank'
            rel='noreferrer'>
            <i className='bi bi-linkedin'></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default SideComponent
