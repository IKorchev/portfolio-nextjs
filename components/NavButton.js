import { handleScrollDown } from "../utils/animations"

const NavButton = ({ children, title, to, duration }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        handleScrollDown(to, duration)
      }}
      className='nav-link whitespace-nowrap'>
      {title}
      {children}
    </button>
  )
}

export default NavButton
