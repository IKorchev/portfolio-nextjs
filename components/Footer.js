import React from "react"
import { Link } from "react-scroll"

const Footer = () => {
  return (
    <div className='footer text-center py-3 mt-1'>
      <Link to='navbar-collapse' className='text-secondary fs-3  fw-bold'>
        <i class='bi bi-arrow-up-circle'></i>
      </Link>
      <p className='text-info'>
        &copy; Ivaylo Korchev <br /> 2021
      </p>
    </div>
  )
}

export default Footer
