import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

// Esta instancia del cliente de Supabase lo usa el middleware en la raiz
// Su objetivo es refrescar la sesión (token) del usuario si ha expirado.

export const createClient = (request: NextRequest) => { // Cuando se hace una petición a un endpoint, se ejecuta esta función
  // Create an unmodified response
  let response = NextResponse.next({                    // Crea una objeto response sin modificar (en blanco) 
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(                  // Crea un cliente de Supabase para el lado del servidor
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // getSession() → Llama a tu get() para leer 
      // → Librería @supabase/ssr analiza el token 
      // → Si está caducado, hace una petición de red para refrescarlo 
      // → Si tiene éxito, llama a tu set() para guardar el nuevo token.
      cookies: {                                        
        get(name: string) {                             // Lee la cookie con el nombre especificado -> verifica interna de la libreria y si ha expirado lo renueva -> utiliza método set -> envia la cookie al navegador en la respuesta
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is set, update the request's cookies.
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the request's cookies.
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  return { supabase, response }
}