"use client"

import { useState } from "react"
import type { Database } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Target, Dumbbell, MoreVertical, Edit, Trash2, Play, Heart, Star } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { deleteWorkout, toggleWorkoutFavorite } from "@/lib/actions"

type Workout = Database["public"]["Tables"]["workouts"]["Row"]

interface WorkoutCardProps {
  workout: Workout
  isFavorite?: boolean
  isTemplate?: boolean
}

const difficultyColors = {
  Principiante: "bg-green-100 text-green-800 border-green-200",
  Intermedio: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Avanzado: "bg-red-100 text-red-800 border-red-200",
}

const typeColors = {
  CrossFit: "bg-orange-100 text-orange-800 border-orange-200",
  HIIT: "bg-red-100 text-red-800 border-red-200",
  Funcional: "bg-blue-100 text-blue-800 border-blue-200",
  Fuerza: "bg-purple-100 text-purple-800 border-purple-200",
  Cardio: "bg-pink-100 text-pink-800 border-pink-200",
}

export default function WorkoutCard({ workout, isFavorite = false, isTemplate = false }: WorkoutCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isFavorited, setIsFavorited] = useState(isFavorite)
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este entrenamiento?")) {
      setIsDeleting(true)
      try {
        await deleteWorkout(workout.id)
      } catch (error) {
        console.error("Error deleting workout:", error)
        alert("Error al eliminar el entrenamiento")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleToggleFavorite = async () => {
    setIsTogglingFavorite(true)
    try {
      await toggleWorkoutFavorite(workout.id)
      setIsFavorited(!isFavorited)
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsTogglingFavorite(false)
    }
  }

  return (
    <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm hover:shadow-md transition-all duration-200 group relative">
      {isFavorited && (
        <div className="absolute top-3 right-3 z-10">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </div>
      )}
      {isTemplate && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
            <Star className="h-3 w-3 mr-1" />
            Plantilla
          </Badge>
        </div>
      )}

      <CardHeader className={`pb-3 ${isTemplate ? "pt-9" : ""}`}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg font-serif line-clamp-1">{workout.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={typeColors[workout.type as keyof typeof typeColors] || "bg-gray-100 text-gray-800"}
              >
                {workout.type}
              </Badge>
              <Badge
                variant="outline"
                className={
                  difficultyColors[workout.difficulty as keyof typeof difficultyColors] || "bg-gray-100 text-gray-800"
                }
              >
                {workout.difficulty}
              </Badge>
            </div>
          </div>

          {!isTemplate && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleToggleFavorite} disabled={isTogglingFavorite}>
                  <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                  {isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/workout/${workout.id}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {isDeleting ? "Eliminando..." : "Eliminar"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {workout.description && <p className="text-sm text-muted-foreground line-clamp-2">{workout.description}</p>}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{workout.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>{workout.muscle_groups.length} grupos</span>
          </div>
          {workout.equipment.length > 0 && (
            <div className="flex items-center gap-1">
              <Dumbbell className="h-4 w-4" />
              <span>{workout.equipment.length} equipos</span>
            </div>
          )}
        </div>

        {workout.muscle_groups.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {workout.muscle_groups.slice(0, 3).map((group) => (
              <Badge key={group} variant="secondary" className="text-xs">
                {group}
              </Badge>
            ))}
            {workout.muscle_groups.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{workout.muscle_groups.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90">
            <Link href={`/workout/${workout.id}`}>
              <Play className="h-4 w-4 mr-2" />
              Ver Detalles
            </Link>
          </Button>
          {isTemplate && (
            <Button asChild size="sm" variant="outline">
              <Link href={`/workout/template/${workout.id}`}>Usar Plantilla</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
