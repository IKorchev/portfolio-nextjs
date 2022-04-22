import { handleScrollDown } from "../../utils/animations"

const NavButton = ({ children, title, to, duration }) => {
  return (
    <a
      onClick={(e) => {
        e.preventDefault()
        handleScrollDown(to, duration)
      }}
      className=' nav-link whitespace-nowrap z-50 text-white'>
      {title}
      {children}
    </a>
  )
}

export default NavButton
