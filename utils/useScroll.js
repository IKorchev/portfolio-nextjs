import { useEffect, useRef } from "react"

const useScroll = () => {
  const scroll = useRef(0)
  useEffect(() => {
    const handleScroll = (e) => {
      const top = e.target.documentElement.scrollTop
      const max = e.target.documentElement.scrollHeight
      scroll.current = (top / max) * 100
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return scroll
}

export default useScroll
