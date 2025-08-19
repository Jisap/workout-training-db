import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import WorkoutDetail from "@/components/workout/workout-detail"

interface WorkoutPageProps {
  params: {
    id: string
  }
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  if (params.id === "new") {
    redirect("/workout/new")
  }

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  try {
    const { data: workout, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()

    if (error) {
      if (error.message.includes("does not exist") || error.message.includes("schema cache")) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex items-center justify-center">
            <div className="max-w-md mx-auto text-center p-8 bg-card rounded-lg border">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Base de datos no configurada</h2>
              <p className="text-muted-foreground mb-6">
                Las tablas de la base de datos no han sido creadas aún. Por favor, ejecuta los scripts SQL para
                configurar la base de datos.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  1. Ejecuta: <code className="bg-muted px-2 py-1 rounded">scripts/01-create-workouts-table.sql</code>
                </p>
                <p>
                  2. Ejecuta: <code className="bg-muted px-2 py-1 rounded">scripts/02-seed-sample-workouts.sql</code>
                </p>
              </div>
            </div>
          </div>
        )
      }
      notFound()
    }

    if (!workout) {
      notFound()
    }

    return <WorkoutDetail workout={workout} />
  } catch (error) {
    console.error("Database error:", error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-card rounded-lg border">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Error de conexión</h2>
          <p className="text-muted-foreground mb-6">
            No se pudo conectar a la base de datos. Verifica que Supabase esté configurado correctamente.
          </p>
        </div>
      </div>
    )
  }
}
