import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import ProfileDashboard from "@/components/profile/profile-dashboard"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's workouts for statistics
  const { data: workouts, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching workouts:", error)
  }

  return <ProfileDashboard user={user} workouts={workouts || []} />
}
