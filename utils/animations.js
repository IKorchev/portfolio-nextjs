import gsap from "gsap"
import ScrollToPlugin from "gsap/dist/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

export const handleScrollDown = (ref, duration) => {
  gsap.to(window, { duration: duration || 1, ease: "power1.inOut", scrollTo: ref })
}

export const landingPageAnimation = (ref1, ref2, ref3) => {
  const tl = gsap.timeline()
  tl.from(ref1, {
    opacity: 0,
    x: -250,
    duration: 1,
    stagger: 0.15,
    ease: "back.out",
  })
    .from(ref2, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.2,
    })
    .to(ref3, {
      opacity: 1,
    })
}
