"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { FaRegCheckCircle } from "react-icons/fa"

const featuresData = [
  {
    imgSrc: "features/1755972144.png",
    title: "Gestión Completa de Entrenamientos",
    description: "Crea, edita y organiza tus rutinas de forma intuitiva. Nunca pierdas de vista tus entrenamientos.",
    highlights: [
      "Define ejercicios, series, repeticiones y descansos.",
      "Clasifica tus entrenamientos por tipo y dificultad.",
      "Utiliza plantillas predefinidas o crea las tuyas.",
    ],
  },
  {
    imgSrc: "features/a25f9498-e09d.png",
    title: "Análisis y Seguimiento de Progreso",
    description: "Visualiza tu evolución con estadísticas claras y gráficos interactivos. Alcanza tus metas más rápido.",
    highlights: [
      "Monitoriza el tiempo total y la frecuencia de tus entrenamientos.",
      "Analiza los grupos musculares trabajados.",
      "Observa tu rendimiento a lo largo del tiempo.",
    ],
  },
  {
    imgSrc: "features/seedream-image.jpeg",
    title: "Personalización y Flexibilidad",
    description: "Adapta la aplicación a tus necesidades con un espacio de trabajo flexible y personalizable.",
    highlights: [
      "Guarda entrenamientos como favoritos para un acceso rápido.",
      "Alterna entre modo claro y oscuro para tu comodidad visual.",
      "Interfaz totalmente responsiva para entrenar desde cualquier dispositivo.",
    ],
  },
  {
    imgSrc: "features/seedream-image (2).jpeg",
    title: "Seguridad y Acceso Simplificado",
    description: "Tus datos están seguros con nosotros. Accede a tu cuenta de forma rápida y segura.",
    highlights: [
      "Autenticación robusta gestionada por Supabase.",
      "Inicio de sesión y registro sencillos.",
      "Control total sobre tu perfil y configuración de seguridad.",
    ],
  },
]


const Features = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="text-white pt-32 relative">
      <div className="container mx-auto">
        <div className="flex gap-16">
          {/* img */}
          <div
            // El elemento stiky se "pegará" relativo a su contenedor padre que permite el scroll,
            // cuando su parte superior esté a una distancia del 50% del alto del
            // viewport menos 240px (que es la mitad de la altura de la imagen, 480px). 
            // El resultado es que la imagen se queda perfectamente centrada verticalmente en la pantalla.
            className="hidden xl:flex justify-center flex-1 w-full h-[480px] sticky top-[calc(50%-240px)]"
          >
            {/*  detectará cuándo el key del motion.div interior cambia y gestionará la animación de salida. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }} // Define como saldrá la animación
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={featuresData[activeIndex].imgSrc}
                  alt={featuresData[activeIndex].title}
                  fill
                  className="h-full object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* text */}
          <div className="flex-1 flex flex-col gap-24">
            {featuresData.map((item, itemIndex) => {
              return (
                <motion.div
                  // Ejecuta una función en el momento en que el componente entra en la pantalla
                  onViewportEnter={() => setActiveIndex(itemIndex)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ amount: "all" }}
                  key={itemIndex}
                  className="w-full h-auto xl:h-[480px] flex items-center"
                >
                  <div className="w-[80vw] xl:w-auto mx-auto xl:mx-0">
                    <h2 className="h2 mb-4">{item.title}</h2>
                    <p className="lead mb-8">{item.description}</p>
                    {/* highlights */}
                    <div className="flex flex-col gap-5">
                      {item.highlights.map((highlight, index) => {
                        return (
                          <div key={index} className="flex items-center gap-4">
                            <FaRegCheckCircle className="text-accent_secondary text-2xl" />
                            <p>{highlight}</p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features