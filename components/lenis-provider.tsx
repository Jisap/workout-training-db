'use client'

import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import Lenis from "lenis"

// 1. Crear el contexto para la instancia de Lenis
const LenisContext = createContext<Lenis | null>(null)

// 2. Crear el componente Provider
export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Inicializar Lenis
    const newLenis = new Lenis()
    setLenis(newLenis)

    // Función para el bucle de animación
    function raf(time: number) {
      newLenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    // Función de limpieza para destruir la instancia de Lenis al desmontar el componente
    return () => {
      cancelAnimationFrame(rafId)
      newLenis.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider 
      value={lenis}
    >
      {children}
    </LenisContext.Provider>)
}

// 3. Crear un hook personalizado para acceder fácilmente al contexto
export const useLenis = () => useContext(LenisContext)
