"use client"


import { fadeInOnScroll } from "@/app/motion/motionVariants"
import { motion } from "framer-motion"
import Image from "next/image"


const brandsImage = [
  {
    src: "brands/brand-1.svg",

  },
  {
    src: "brands/brand-2.svg",

  },
  {
    src: "brands/brand-3.svg",

  },
  {
    src: "brands/brand-4.svg",

  },
  {
    src: "brands/brand-5.svg",

  },
  {
    src: "brands/brand-6.svg",

  },
  {
    src: "brands/brand-7.svg",

  },
]

const Brands = () => {
  return (
    <section className="w-full h-[24vh] pt-24 flex justify-center items-center">
      <motion.div
        variants={fadeInOnScroll(0.2, 0.6)}
        initial="hidden"
        whileInView="visible"
        className="container mx-auto overflow-hidden"
      >
        <p className="lead text-center mb-6">
          Join 200+ companies alreade growing
        </p>
        <div className="flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: -100 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex"
          >
            {brandsImage.map((item, index) => {
              return (
                <div className="relative w-52 h-20 mr-12" key={index}>
                  <Image src={item.src} alt="brands" fill className="object-contain" />
                </div>
              )
            })}
          </motion.div>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: -100 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex"
          >
            {brandsImage.map((item, index) => {
              return (
                <div className="relative w-52 h-20 mr-12" key={index}>
                  <Image src={item.src} alt="brands" fill className="object-contain" />
                </div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Brands