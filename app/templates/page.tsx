import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import TemplatesPage from "@/components/templates/templates-page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function WorkoutTemplatesPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  try {
    const { data: templates, error } = await supabase
      .from("workout_templates")
      .select("*")
      .order("is_featured", { ascending: false })

    if (error) {
      // Check if it's a table not found error
      if (
        error.message.includes("Could not find the table") ||
        error.message.includes("relation") ||
        error.message.includes("does not exist")
      ) {
        return (
          <div className="min-h-screen bg-background p-4">
            <div className="max-w-2xl mx-auto pt-20">
              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                    <Database className="w-6 h-6 text-destructive" />
                  </div>
                  <CardTitle className="text-destructive">Base de Datos No Configurada</CardTitle>
                  <CardDescription>Las tablas de la base de datos no han sido creadas aún.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>Para usar las plantillas de entrenamientos, necesitas ejecutar los scripts SQL:</p>
                        <ol className="list-decimal list-inside space-y-1 ml-4">
                          <li>
                            <code className="bg-muted px-2 py-1 rounded text-xs">
                              scripts/01-create-workouts-table.sql
                            </code>
                          </li>
                          <li>
                            <code className="bg-muted px-2 py-1 rounded text-xs">
                              scripts/03-add-advanced-features.sql
                            </code>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button asChild variant="outline">
                      <Link href="/">Volver al Inicio</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      }

      console.error("Error fetching templates:", error)
      throw error
    }

    return <TemplatesPage templates={templates || []} />
  } catch (error) {
    console.error("Database connection error:", error)
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto pt-20">
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
              <CardTitle className="text-destructive">Error de Conexión</CardTitle>
              <CardDescription>No se pudo conectar a la base de datos.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 justify-center">
                <Button asChild variant="outline">
                  <Link href="/">Volver al Inicio</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }
}
