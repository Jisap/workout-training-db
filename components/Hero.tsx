"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Header from "./Header";
import Link from "next/link";
import ButtonAnimated from "./ButtonAnimated";



const Hero = () => {

  const { scrollY } = useScroll();  // Representa la posición vertical actual del scroll en píxeles desde la parte superior de la página.

  const imgScale = useTransform(scrollY, [0, 200, 1300], [1, 1.4, 1])

  const textOpacity = useTransform(scrollY, [0, 200], [1, 0])

  const textScale = useTransform(scrollY, [0, 200], [1, 0.8])

  const textDisplay = useTransform(scrollY, [0, 800], ["flex", "none"])

  return (
    <section className="h-[1200px] xl:h-[1600px] overflow-x-clip relative">
      <Header />
      <div className="container mx-auto h-full flex flex-col items-center justify-start pt-32 gap-y-12">
        {/* text */}
        <motion.div
          className="flex flex-col justify-center items-center gap-6 text-center z-10"
          style={{
            opacity: textOpacity,
            scale: textScale,
            display: textDisplay
          }}
        >
          <h1 className="text-4xl md:text-[60px] font-bold tracking-[-0.5px] leading-tight max-w-[800px] xl:max-w-max">
            Transforma tu Entrenamiento. Registra tu Progreso.
          </h1>
          <p className="max-w-[680px] text-lg md:text-[20px] text-white/80 font-light px-8 xl:px-0 mb-2">
            Workout Training DB es la herramienta definitiva para registrar, seguir y analizar tus rutinas. Lleva tu
            fitness al siguiente nivel.
          </p>
          <div className="flex gap-x-2 justify-center items-center">
            <Link href="/auth/signup">
              <ButtonAnimated variant="primary" btnText="Empezar Gratis" />
            </Link>
            <Link href="/auth/login">
              <ButtonAnimated variant="secondary" btnText="Iniciar Sesión" />
            </Link>
          </div>
        </motion.div>
        <motion.div
          className="w-full max-w-[960px] mx-auto h-[380px] md:h-[420px] xl:h-[520px] bg-no-repeat sticky left-0 right-0"
          style={{
            backgroundImage: "url('/pexels-victorfreitas-841130.jpg')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            top: "100px", // Cuando llegue a top:100px se quedará pegada
            scale: imgScale,

          }}
        ></motion.div>
      </div>
    </section>
  )
}

export default Hero