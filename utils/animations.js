import gsap from "gsap"
import ScrollToPlugin from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

export const handleScrollDown = (ref, duration) => {
  gsap.to(window, {
    duration: duration || 1,
    ease: "power1.inOut",
    scrollTo: ref,
    offsetY: 50,
  })
}
