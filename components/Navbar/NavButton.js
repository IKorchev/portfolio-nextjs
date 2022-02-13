import { handleScrollDown } from "../../utils/animations"

const NavButton = ({ children, title, to, duration }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        handleScrollDown(to, duration)
      }}
      className='pointer-events-auto nav-link whitespace-nowrap z-50 text-white'>
      {title}
      {children}
    </button>
  )
}

export default NavButton
