import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Dashboard from "@/components/dashboard/dashboard"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

// Se llega aquí desde el middleware -> session existe -> return response

export default async function HomePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/landing")
  }

  let workouts = []
  let databaseError = false

  try {
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      // Fetch workouts created by the user OR public templates (user_id is null)
      .or(`user_id.eq.${user.id},user_id.is.null`)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching workouts:", error)
      // Check if it's a table not found error
      if (error.message.includes("table") && error.message.includes("workouts")) {
        databaseError = true
      }
    } else {
      workouts = data || []
    }
  } catch (error) {
    console.error("Database connection error:", error)
    databaseError = true
  }

  if (databaseError) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-0 shadow-lg bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-2xl mb-6">
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
              <h2 className="text-2xl font-serif font-bold mb-4">¡Ups! Algo salió mal</h2>
              <p className="text-muted-foreground mb-6">
                No pudimos cargar tus datos en este momento. Por favor, intenta recargar la página.
              </p>
              <Button asChild className="w-full">
                <a href="/">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recargar página
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // 5. Se renderiza el componente del Dashboard con los datos del usuario y sus entrenamientos.
  return (
    <div className="min-h-screen bg-background">
      <Dashboard user={user} initialWorkouts={workouts} />
    </div>
  )
}
