import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import TemplateWorkoutForm from "@/components/workout/template-workout-form"

interface TemplateWorkoutPageProps {
  params: {
    id: string
  }
}

export default async function TemplateWorkoutPage({ params }: TemplateWorkoutPageProps) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: template, error } = await supabase.from("workout_templates").select("*").eq("id", params.id).single()

  if (error || !template) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Usar Plantilla</h1>
            <p className="text-muted-foreground">Personaliza esta plantilla y agrégala a tus entrenamientos</p>
          </div>
          <TemplateWorkoutForm template={template} />
        </div>
      </div>
    </div>
  )
}
