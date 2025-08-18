"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email y contraseña son requeridos" }
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/")
}

export async function signUp(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email y contraseña son requeridos" }
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: "Revisa tu email para confirmar tu cuenta" }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}

export async function createWorkout(prevState: any, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Debes estar autenticado para crear entrenamientos" }
  }

  const name = formData.get("name") as string
  const type = formData.get("type") as string
  const duration = Number.parseInt(formData.get("duration") as string)
  const difficulty = formData.get("difficulty") as string
  const equipment = formData.get("equipment") as string
  const muscle_groups = formData.get("muscle_groups") as string
  const description = formData.get("description") as string
  const instructions = formData.get("instructions") as string

  if (!name || !type || !duration || !difficulty) {
    return { error: "Todos los campos obligatorios deben ser completados" }
  }

  try {
    const { error } = await supabase.from("workouts").insert({
      user_id: user.id,
      name,
      type,
      duration,
      difficulty,
      equipment: equipment ? equipment.split(",").map((e) => e.trim()) : [],
      muscle_groups: muscle_groups ? muscle_groups.split(",").map((m) => m.trim()) : [],
      description: description || null,
      instructions: instructions || null,
    })

    if (error) {
      console.log("[v0] Create workout error:", error.message)
      if (error.message.includes("table") && error.message.includes("workouts")) {
        return { error: "La base de datos no está configurada. Ejecuta los scripts SQL primero." }
      }
      return { error: error.message }
    }

    revalidatePath("/")
    return { success: "Entrenamiento creado exitosamente" }
  } catch (error) {
    console.log("[v0] Create workout catch error:", error)
    return { error: "Error al crear el entrenamiento. Verifica la configuración de la base de datos." }
  }
}

export async function deleteWorkout(workoutId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Debes estar autenticado")
  }

  const { error } = await supabase.from("workouts").delete().eq("id", workoutId).eq("user_id", user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/")
}

export async function updateWorkout(prevState: any, formData: FormData) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Debes estar autenticado para actualizar entrenamientos" }
  }

  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const type = formData.get("type") as string
  const duration = Number.parseInt(formData.get("duration") as string)
  const difficulty = formData.get("difficulty") as string
  const equipment = formData.get("equipment") as string
  const muscle_groups = formData.get("muscle_groups") as string
  const description = formData.get("description") as string
  const instructions = formData.get("instructions") as string

  if (!id || !name || !type || !duration || !difficulty) {
    return { error: "Todos los campos obligatorios deben ser completados" }
  }

  const { error } = await supabase
    .from("workouts")
    .update({
      name,
      type,
      duration,
      difficulty,
      equipment: equipment ? equipment.split(",").map((e) => e.trim()) : [],
      muscle_groups: muscle_groups ? muscle_groups.split(",").map((m) => m.trim()) : [],
      description: description || null,
      instructions: instructions || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/")
  revalidatePath(`/workout/${id}`)
  return { success: "Entrenamiento actualizado exitosamente" }
}

export async function toggleWorkoutFavorite(workoutId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Debes estar autenticado")
  }

  // Check if already favorited
  const { data: existing } = await supabase
    .from("workout_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("workout_id", workoutId)
    .single()

  if (existing) {
    // Remove from favorites
    const { error } = await supabase
      .from("workout_favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("workout_id", workoutId)

    if (error) {
      throw new Error(error.message)
    }
  } else {
    // Add to favorites
    const { error } = await supabase.from("workout_favorites").insert({
      user_id: user.id,
      workout_id: workoutId,
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  revalidatePath("/")
}

export async function createWorkoutFromTemplate(templateId: string, customName?: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Debes estar autenticado")
  }

  // Get template data
  const { data: template, error: templateError } = await supabase
    .from("workout_templates")
    .select("*")
    .eq("id", templateId)
    .single()

  if (templateError || !template) {
    throw new Error("Plantilla no encontrada")
  }

  // Create workout from template
  const { error } = await supabase.from("workouts").insert({
    user_id: user.id,
    name: customName || `${template.name} (Copia)`,
    type: template.type,
    duration: template.duration,
    difficulty: template.difficulty,
    equipment: template.equipment,
    muscle_groups: template.muscle_groups,
    description: template.description,
    instructions: template.instructions,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/")
}

export async function completeWorkoutSession(
  workoutId: string,
  actualDuration?: number,
  notes?: string,
  rating?: number,
) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("Debes estar autenticado")
  }

  const { error } = await supabase.from("workout_sessions").insert({
    user_id: user.id,
    workout_id: workoutId,
    duration_actual: actualDuration,
    notes,
    rating,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/")
  revalidatePath("/profile")
}
