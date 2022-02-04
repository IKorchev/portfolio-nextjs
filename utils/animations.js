import gsap from "gsap"
import ScrollToPlugin from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

export const handleScrollDown = (ref, duration) => {
  gsap.to(window, { duration: duration || 1, ease: "power1.inOut", scrollTo: ref })
}

export const landingPageAnimation = (ref1, ref3) => {
  const tl = gsap.timeline()
  tl.to(ref1, {
    x: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.5,
  })
  .to(ref3, {
    opacity: 1,
  })
}
