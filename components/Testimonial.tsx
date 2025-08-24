"use client"

import { fadeInOnScroll } from "@/app/motion/motionVariants"
import { motion } from "framer-motion"
import Image from "next/image";
import { BiSolidQuoteLeft } from 'react-icons/bi'


const testimonialData = [
  {
    name: "Ana García",
    role: "Entusiasta del Fitness",
    message: "¡Esta aplicación ha transformado mi forma de entrenar! La gestión de rutinas es súper intuitiva y el seguimiento de progreso me mantiene motivada cada día. ¡Totalmente recomendada!",
    // Usando ui-avatars.com para generar avatares a partir de los nombres
    avatar: "/Avatars/30.jpg",
  },
  {
    name: "Carlos Rodríguez",
    role: "Atleta Amateur",
    message: "Como atleta, necesito tener un control preciso de mis entrenamientos. Las estadísticas y los gráficos me dan la información que necesito para ajustar mis rutinas y mejorar mi rendimiento.",
    avatar: "/Avatars/6.jpg",
  },
  {
    name: "Laura Martínez",
    role: "Principiante en el Gym",
    message: "Empezar en el gimnasio era abrumador, pero con las plantillas predefinidas y la interfaz amigable, me sentí segura desde el primer día. ¡Ahora no puedo imaginar mis entrenamientos sin ella!",
    avatar: "/Avatars/50.jpg",
  },
  {
    name: "Eduardo Hernández",
    role: "Entrenador de Fitness",
    message: "Esta aplicación me ha hecho sentir parte de mi equipo de entrenamiento. La gestión de rutinas es sencilla y fácil de usar, y la visualización de los datos me permite hacer un seguimiento preciso de mi progreso. ¡Gracias por esta hermosa aplicación!",
    avatar: "/Avatars/61.jpg",
  },
  {
    name: "Maria Rodríguez",
    role: "Entrenadora de Fitness",
    message: "Facil de usar y fácil de entender. La gestión de rutinas es muy intuitiva y la visualización de los datos me permite hacer un seguimiento preciso de mi progreso. ¡Gracias por esta hermosa aplicación!",
    avatar: "/Avatars/73.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="w-full mb-24 xl:mb-32 flex justify-center items-center">
      <div className="overflow-hidden">
        {/* text */}
        <motion.div
          variants={fadeInOnScroll(0.2, 0.4)}
          initial="hidden"
          whileInView="visible"
        >
          <h2 className="h2 mb-4 text-center">Que dice la gente sobre la aplicación</h2>
          <p className="lead text-center mb-24">Escucha directamente de aquellos que han mejorado su eficiencia y organización.</p>
        </motion.div>

        {/* card list */}
        <motion.div
          variants={fadeInOnScroll(0.2, 0.6)}
          initial="hidden"
          whileInView="visible"
          className="flex"
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex"
          >
            {testimonialData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative w-[460px] h-[300px] bg-[#0e11354e] mr-12 rounded-2xl flex flex-col justify-center px-14"
                >
                  <BiSolidQuoteLeft className="text-accent mb-3 text-3xl" />
                  <p className="mb-4 text-lg text-white/80">
                    {item.message}
                  </p>
                  <div className="flex items-center justify-end gap-x-2">
                    <p className="text-xl">
                      {item.name}
                    </p>
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-full mb-4 border-2 border-accent"
                    />
                  </div>
                </div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex"
          >
            {testimonialData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative w-[460px] h-[300px] bg-[#0e11354e] mr-12 rounded-2xl flex flex-col justify-center px-14"
                >
                  <BiSolidQuoteLeft className="text-accent mb-3 text-3xl" />
                  <p className="mb-4 text-lg text-white/80">
                    {item.message}
                  </p>
                  <div className="flex items-center justify-end gap-x-2">
                    <p className="text-xl">
                      {item.name}
                    </p>
                    <Image 
                      src={item.avatar} 
                      alt={item.name} 
                      width={50} 
                      height={50} 
                      className="rounded-full mb-4 border-2 border-accent" 
                    />
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonial