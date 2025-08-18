"use client"

import { useState, useMemo } from "react"
import type { Database } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, BarChart3, Settings, Trophy, Calendar, Clock, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { signOut } from "@/lib/actions"
import ProfileStats from "./profile-stats"
import ProfileSettings from "./profile-settings"

type Workout = Database["public"]["Tables"]["workouts"]["Row"]

interface ProfileDashboardProps {
  user: any
  workouts: Workout[]
}

export default function ProfileDashboard({ user, workouts }: ProfileDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate user statistics
  const stats = useMemo(() => {
    const totalWorkouts = workouts.length
    const totalMinutes = workouts.reduce((acc, workout) => acc + workout.duration, 0)
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10

    // Workout types distribution
    const typeDistribution = workouts.reduce(
      (acc, workout) => {
        acc[workout.type] = (acc[workout.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Difficulty distribution
    const difficultyDistribution = workouts.reduce(
      (acc, workout) => {
        acc[workout.difficulty] = (acc[workout.difficulty] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Most used equipment
    const equipmentUsage = workouts.reduce(
      (acc, workout) => {
        workout.equipment.forEach((item) => {
          acc[item] = (acc[item] || 0) + 1
        })
        return acc
      },
      {} as Record<string, number>,
    )

    // Most targeted muscle groups
    const muscleGroupUsage = workouts.reduce(
      (acc, workout) => {
        workout.muscle_groups.forEach((group) => {
          acc[group] = (acc[group] || 0) + 1
        })
        return acc
      },
      {} as Record<string, number>,
    )

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentWorkouts = workouts.filter((workout) => new Date(workout.created_at) >= thirtyDaysAgo)

    // Average workout duration
    const avgDuration = totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0

    // Favorite workout type
    const favoriteType = Object.entries(typeDistribution).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A"

    return {
      totalWorkouts,
      totalHours,
      totalMinutes,
      avgDuration,
      favoriteType,
      recentWorkouts: recentWorkouts.length,
      typeDistribution,
      difficultyDistribution,
      equipmentUsage,
      muscleGroupUsage,
    }
  }, [workouts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-serif font-bold text-foreground">Mi Perfil</h1>
                <p className="text-sm text-muted-foreground">Gestiona tu cuenta y estadísticas</p>
              </div>
            </div>

            <form action={signOut}>
              <Button variant="outline" type="submit">
                Cerrar Sesión
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                  <User className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-1">
                    {user.email?.split("@")[0] || "Usuario"}
                  </h2>
                  <p className="text-muted-foreground mb-3">{user.email}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Miembro desde {new Date(user.created_at).toLocaleDateString()}</span>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {stats.favoriteType} Enthusiast
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{stats.totalWorkouts}</div>
                  <div className="text-sm text-muted-foreground">Entrenamientos</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.totalHours}h</p>
                    <p className="text-sm text-muted-foreground">Tiempo total</p>
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
                    <p className="text-2xl font-bold text-foreground">{stats.avgDuration}</p>
                    <p className="text-sm text-muted-foreground">Min promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stats.recentWorkouts}</p>
                    <p className="text-sm text-muted-foreground">Últimos 30 días</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{Object.keys(stats.typeDistribution).length}</p>
                    <p className="text-sm text-muted-foreground">Tipos diferentes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-card/60 backdrop-blur-sm">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Estadísticas
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Actividad
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Settings className="h-4 w-4 mr-2" />
                Configuración
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ProfileStats stats={stats} />
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Actividad Reciente</CardTitle>
                </CardHeader>
                <CardContent>
                  {workouts.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No hay entrenamientos registrados</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {workouts.slice(0, 10).map((workout) => (
                        <div
                          key={workout.id}
                          className="flex items-center justify-between p-4 bg-background/50 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Target className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{workout.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {workout.type} • {workout.duration} min • {workout.difficulty}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              {new Date(workout.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <ProfileSettings user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
