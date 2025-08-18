import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import WorkoutForm from "@/components/workout/workout-form"

interface EditWorkoutPageProps {
  params: {
    id: string
  }
}

export default async function EditWorkoutPage({ params }: EditWorkoutPageProps) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: workout, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single()

  if (error || !workout) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Editar Entrenamiento</h1>
            <p className="text-muted-foreground">Modifica los detalles de tu entrenamiento</p>
          </div>
          <WorkoutForm workout={workout} />
        </div>
      </div>
    </div>
  )
}
