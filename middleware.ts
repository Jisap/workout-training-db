import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresca la sesión del usuario si ha expirado.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Define las rutas públicas que no requieren autenticación.
  const publicPaths = ["/landing", "/auth/login", "/auth/register", "/auth/callback", "/auth/confirm"]

  const isPublicPath = publicPaths.some((p) => pathname.startsWith(p))

  // Si el usuario está autenticado...
  if (session) {
    // y trata de acceder a una página pública (como login, register o la landing page)...
    if (isPublicPath) {
      // ...redirígelo al panel principal.
      return NextResponse.redirect(new URL("/", request.url))
    }
  }
  // Si el usuario no está autenticado...
  else {
    // y trata de acceder a una ruta protegida...
    // (la ruta raíz '/' es un caso especial que se gestiona en su propio componente de página)
    if (!isPublicPath && pathname !== "/") {
      // ...redirígelo a la nueva landing page.
      return NextResponse.redirect(new URL("/landing", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .*\\.(?:svg|png|jpg|jpeg|gif|webp)$ (image files)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}