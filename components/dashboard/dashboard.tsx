"use client"

import { useState, useMemo } from "react"
import type { Database } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Filter, Clock, Target, Dumbbell, LogOut, Star } from "lucide-react"
import Link from "next/link"
import { signOut } from "@/lib/actions"
import WorkoutCard from "./workout-card"
import FilterPanel from "./filter-panel"

type Workout = Database["public"]["Tables"]["workouts"]["Row"]

interface DashboardProps {
  user: any
  initialWorkouts: Workout[]
}

export default function Dashboard({ user, initialWorkouts }: DashboardProps) {
  const [workouts] = useState<Workout[]>(initialWorkouts || [])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
  const [selectedDuration, setSelectedDuration] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Filter workouts based on search and filters
  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      const matchesSearch =
        workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.muscle_groups.some((group) => group.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType = selectedType === "all" || workout.type === selectedType
      const matchesDifficulty = selectedDifficulty === "all" || workout.difficulty === selectedDifficulty

      let matchesDuration = true
      if (selectedDuration !== "all") {
        const duration = workout.duration
        switch (selectedDuration) {
          case "short":
            matchesDuration = duration <= 20
            break
          case "medium":
            matchesDuration = duration > 20 && duration <= 40
            break
          case "long":
            matchesDuration = duration > 40
            break
        }
      }

      return matchesSearch && matchesType && matchesDifficulty && matchesDuration
    })
  }, [workouts, searchQuery, selectedType, selectedDifficulty, selectedDuration])

  // Group workouts by type for tabs
  const workoutsByType = useMemo(() => {
    const grouped = filteredWorkouts.reduce(
      (acc, workout) => {
        if (!acc[workout.type]) {
          acc[workout.type] = []
        }
        acc[workout.type].push(workout)
        return acc
      },
      {} as Record<string, Workout[]>,
    )
    return grouped
  }, [filteredWorkouts])

  const workoutTypes = Object.keys(workoutsByType)
  const totalWorkouts = filteredWorkouts.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-serif font-bold text-foreground">FitTracker</h1>
                <p className="text-sm text-muted-foreground">Hola, {user.email?.split("@")[0]}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/templates">
                  <Star className="h-4 w-4 mr-2" />
                  Plantillas
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
                <Link href="/workout/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/profile">
                  <Dumbbell className="h-4 w-4" />
                </Link>
              </Button>
              <form action={signOut}>
                <Button variant="outline" size="sm" type="submit">
                  <LogOut className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Dumbbell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalWorkouts}</p>
                  <p className="text-sm text-muted-foreground">Entrenamientos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{workoutTypes.length}</p>
                  <p className="text-sm text-muted-foreground">Tipos diferentes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(filteredWorkouts.reduce((acc, w) => acc + w.duration, 0) / 60)}h
                  </p>
                  <p className="text-sm text-muted-foreground">Tiempo total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar entrenamientos, grupos musculares..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-background border-border"
                />
              </div>

              <div className="flex gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40 h-12 bg-background">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="CrossFit">CrossFit</SelectItem>
                    <SelectItem value="HIIT">HIIT</SelectItem>
                    <SelectItem value="Funcional">Funcional</SelectItem>
                    <SelectItem value="Fuerza">Fuerza</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-40 h-12 bg-background">
                    <SelectValue placeholder="Dificultad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Principiante">Principiante</SelectItem>
                    <SelectItem value="Intermedio">Intermedio</SelectItem>
                    <SelectItem value="Avanzado">Avanzado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-40 h-12 bg-background">
                    <SelectValue placeholder="Duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Cualquiera</SelectItem>
                    <SelectItem value="short">&lt;= 20 min</SelectItem>
                    <SelectItem value="medium">21-40 min</SelectItem>
                    <SelectItem value="long">&gt; 40 min</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 bg-transparent"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {showFilters && (
              <FilterPanel
                workouts={workouts}
                onFiltersChange={(filters) => {
                  // Handle advanced filters here
                  console.log("Advanced filters:", filters)
                }}
              />
            )}
          </CardContent>
        </Card>

        {/* Workouts Display */}
        {filteredWorkouts.length === 0 ? (
          <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">No se encontraron entrenamientos</h3>
              <p className="text-muted-foreground mb-6">
                {workouts.length === 0
                  ? "Aún no tienes entrenamientos. ¡Crea tu primer entrenamiento!"
                  : "Intenta ajustar los filtros o términos de búsqueda."}
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/workout/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Entrenamiento
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-card/60 backdrop-blur-sm">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Todos ({totalWorkouts})
              </TabsTrigger>
              {workoutTypes.slice(0, 5).map((type) => (
                <TabsTrigger
                  key={type}
                  value={type}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {type} ({workoutsByType[type].length})
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            </TabsContent>

            {workoutTypes.map((type) => (
              <TabsContent key={type} value={type} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workoutsByType[type].map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  )
}
