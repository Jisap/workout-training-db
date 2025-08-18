"use client"

import type { Database } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Target, Dumbbell, ArrowLeft, Edit, Trash2, Play, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { deleteWorkout } from "@/lib/actions"
import { useRouter } from "next/navigation"

type Workout = Database["public"]["Tables"]["workouts"]["Row"]

interface WorkoutDetailProps {
  workout: Workout
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

export default function WorkoutDetail({ workout }: WorkoutDetailProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isStarted, setIsStarted] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este entrenamiento?")) {
      setIsDeleting(true)
      try {
        await deleteWorkout(workout.id)
        router.push("/")
      } catch (error) {
        console.error("Error deleting workout:", error)
        alert("Error al eliminar el entrenamiento")
        setIsDeleting(false)
      }
    }
  }

  const handleStartWorkout = () => {
    setIsStarted(true)
    // Here you could implement workout tracking logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl font-serif font-bold text-foreground">{workout.name}</h1>
              <p className="text-muted-foreground">Creado el {new Date(workout.created_at).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href={`/workout/${workout.id}/edit`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Link>
              </Button>
              <Button variant="outline" onClick={handleDelete} disabled={isDeleting}>
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview Card */}
              <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-serif">Información General</CardTitle>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className={typeColors[workout.type as keyof typeof typeColors] || "bg-gray-100 text-gray-800"}
                      >
                        {workout.type}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          difficultyColors[workout.difficulty as keyof typeof difficultyColors] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {workout.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{workout.duration} minutos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      <span>{workout.muscle_groups.length} grupos musculares</span>
                    </div>
                    {workout.equipment.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4" />
                        <span>{workout.equipment.length} equipos</span>
                      </div>
                    )}
                  </div>

                  {workout.description && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-2">Descripción</h4>
                        <p className="text-muted-foreground">{workout.description}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Instructions Card */}
              {workout.instructions && (
                <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif">Instrucciones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                        {workout.instructions}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Start Workout Card */}
              <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Button
                    onClick={handleStartWorkout}
                    className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90"
                    disabled={isStarted}
                  >
                    {isStarted ? (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Entrenamiento Iniciado
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-5 w-5" />
                        Iniciar Entrenamiento
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Equipment Card */}
              {workout.equipment.length > 0 && (
                <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif">Equipamiento Necesario</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {workout.equipment.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Muscle Groups Card */}
              {workout.muscle_groups.length > 0 && (
                <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif">Grupos Musculares</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {workout.muscle_groups.map((group) => (
                        <Badge key={group} variant="secondary" className="text-xs">
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
