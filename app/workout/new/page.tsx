import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import WorkoutForm from "@/components/workout/workout-form"

export default async function NewWorkoutPage() {
  const supabase = createClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/auth/login")
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Crear Nuevo Entrenamiento</h1>
              <p className="text-muted-foreground">Diseña tu entrenamiento personalizado</p>
            </div>
            <WorkoutForm />
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Authentication error:", error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-card rounded-lg border">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Error de autenticación</h2>
          <p className="text-muted-foreground mb-6">
            No se pudo verificar tu sesión. Por favor, inicia sesión nuevamente.
          </p>
          <a
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>
    )
  }
}
