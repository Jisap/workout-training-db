"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ProfileStatsProps {
  stats: {
    totalWorkouts: number
    totalHours: number
    totalMinutes: number
    avgDuration: number
    favoriteType: string
    recentWorkouts: number
    typeDistribution: Record<string, number>
    difficultyDistribution: Record<string, number>
    equipmentUsage: Record<string, number>
    muscleGroupUsage: Record<string, number>
  }
}

const typeColors = {
  CrossFit: "bg-orange-100 text-orange-800 border-orange-200",
  HIIT: "bg-red-100 text-red-800 border-red-200",
  Funcional: "bg-blue-100 text-blue-800 border-blue-200",
  Fuerza: "bg-purple-100 text-purple-800 border-purple-200",
  Cardio: "bg-pink-100 text-pink-800 border-pink-200",
}

const difficultyColors = {
  Principiante: "bg-green-100 text-green-800 border-green-200",
  Intermedio: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Avanzado: "bg-red-100 text-red-800 border-red-200",
}

export default function ProfileStats({ stats }: ProfileStatsProps) {
  const topEquipment = Object.entries(stats.equipmentUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const topMuscleGroups = Object.entries(stats.muscleGroupUsage)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const maxTypeCount = Math.max(...Object.values(stats.typeDistribution))
  const maxDifficultyCount = Math.max(...Object.values(stats.difficultyDistribution))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Workout Types Distribution */}
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Distribución por Tipo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(stats.typeDistribution).map(([type, count]) => (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={typeColors[type as keyof typeof typeColors] || "bg-gray-100 text-gray-800"}
                >
                  {type}
                </Badge>
                <span className="text-sm font-medium">{count} entrenamientos</span>
              </div>
              <Progress value={(count / maxTypeCount) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Difficulty Distribution */}
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Distribución por Dificultad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(stats.difficultyDistribution).map(([difficulty, count]) => (
            <div key={difficulty} className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={
                    difficultyColors[difficulty as keyof typeof difficultyColors] || "bg-gray-100 text-gray-800"
                  }
                >
                  {difficulty}
                </Badge>
                <span className="text-sm font-medium">{count} entrenamientos</span>
              </div>
              <Progress value={(count / maxDifficultyCount) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Equipment */}
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Equipamiento Más Usado</CardTitle>
        </CardHeader>
        <CardContent>
          {topEquipment.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No hay equipamiento registrado</p>
          ) : (
            <div className="space-y-3">
              {topEquipment.map(([equipment, count], index) => (
                <div key={equipment} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <span className="font-medium">{equipment}</span>
                  </div>
                  <Badge variant="secondary">{count} veces</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Muscle Groups */}
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif">Grupos Musculares Más Trabajados</CardTitle>
        </CardHeader>
        <CardContent>
          {topMuscleGroups.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No hay grupos musculares registrados</p>
          ) : (
            <div className="space-y-3">
              {topMuscleGroups.map(([group, count], index) => (
                <div key={group} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <span className="font-medium">{group}</span>
                  </div>
                  <Badge variant="secondary">{count} veces</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
