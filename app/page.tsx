import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Dashboard from "@/components/dashboard/dashboard"
import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Database, AlertTriangle } from "lucide-react"

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
      .eq("user_id", user.id)
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl mb-6">
                <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-2xl font-serif font-bold mb-4">Base de datos no configurada</h2>
              <p className="text-muted-foreground mb-6">
                Para usar la aplicación, necesitas ejecutar los scripts SQL para crear las tablas de la base de datos.
              </p>
              <div className="space-y-3 text-sm text-left bg-muted/50 rounded-lg p-4 mb-6">
                <p className="font-medium">Pasos a seguir:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>
                    Ejecuta el script:{" "}
                    <code className="bg-background px-1 rounded">scripts/01-create-workouts-table.sql</code>
                  </li>
                  <li>
                    Ejecuta el script:{" "}
                    <code className="bg-background px-1 rounded">scripts/02-seed-sample-workouts.sql</code>
                  </li>
                  <li>Recarga esta página</li>
                </ol>
              </div>
              <a
                href="/"
                className="inline-flex items-center justify-center w-full h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium transition-colors"
              >
                <Database className="h-4 w-4 mr-2" />
                Recargar página
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Dashboard user={user} initialWorkouts={workouts} />
    </div>
  )
}
