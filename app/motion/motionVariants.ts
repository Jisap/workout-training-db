


import { type Variants } from "framer-motion"

export const fadeInOnScroll = (delay: number, duration: number): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: [0.42, 0, 0.58, 1],
    },
  },
})

export const fadeInSpring = (delay: number, duration: number): Variants => ({
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration,
      ease: [0.6, -0.05, 0.01, 0.99],
      type: "spring",
      stiffness: 100,
    },
  },
})