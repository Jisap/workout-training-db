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

  const { data: workout, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("id", params.id)
    // A workout can be viewed if it belongs to the user or is a public template
    .or(`user_id.eq.${user.id},user_id.is.null`)
    .single()

  if (error) {
    console.error("Error fetching workout:", error)
    notFound()
  }

  if (!workout) {
    notFound()
  }

  return <WorkoutDetail workout={workout} />
}
