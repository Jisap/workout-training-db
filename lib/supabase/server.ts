
import { cookies } from "next/headers";                                // Permite obtener las cookies de la petición actual
import type { Database } from "./client"                               // Importa la definición de tipos  de la base de datos
import { createServerClient, type CookieOptions } from "@supabase/ssr" // Importa el cliente de Supabase para SSR


// Esta función esta diseñada para crear una instancia del cliente de Supabase 
// en el lado del servidor. Lo usan Server Components, Server Actions y Route Handlers.
// Para acceder a la base de datos y a la sesión del usuario desde el servidor
// para renderizar páginas o responder a peticiones de API.
export async function createClient() {

  const cookieStore = await cookies()                                          // Se obtiene un objeto que representa las cookies de la petición HTTP actual.

  return createServerClient<Database>(                                         // Crea y retorna el cliente de Supabase para el servidor
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {                                                               // Configuración de las cookies. Le decimos al cliente de supabase como leer, escribir y borrar la cookies de la session 
        get(name: string) {
          return cookieStore.get(name)?.value                                  // Lee la cookie con el nombre especificado
        },
        set(name: string, value: string, options: CookieOptions) {             // Escribe una cookie con el nombre y valor especificados
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {                          // Borra la cookie con el nombre especificado
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        }
      },
    },
  )
}
