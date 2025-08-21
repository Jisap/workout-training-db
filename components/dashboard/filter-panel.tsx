"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

import type { Database } from "@/lib/supabase/client"

type Workout = Database["public"]["Tables"]["workouts"]["Row"]

interface Filters {
  difficulty: string
  equipment: string[]
  muscleGroups: string[]
  durationRange: [number, number]
}

interface FilterPanelProps {
  workouts: Workout[]
  filters: Filters
  onFiltersChange: (updater: (prev: Filters) => Filters) => void
}

export default function FilterPanel({ workouts, filters, onFiltersChange }: FilterPanelProps) {
  // Extract unique equipment and muscle groups from workouts
  const allEquipment = Array.from(new Set(workouts.flatMap((w) => w.equipment)))
  const allMuscleGroups = Array.from(new Set(workouts.flatMap((w) => w.muscle_groups)))

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    onFiltersChange((prev) => ({
      ...prev,
      equipment: checked ? [...prev.equipment, equipment] : prev.equipment.filter((e) => e !== equipment),
    }))
  }

  const handleMuscleGroupChange = (group: string, checked: boolean) => {
    onFiltersChange((prev) => ({
      ...prev,
      muscleGroups: checked ? [...prev.muscleGroups, group] : prev.muscleGroups.filter((g) => g !== group),
    }))
  }

  const clearAllFilters = () => {
    onFiltersChange(() => ({
      difficulty: "all",
      equipment: [],
      muscleGroups: [],
      durationRange: [0, 120],
    }))
  }

  return (
    <Card className="mt-4 border-0 shadow-sm bg-background/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-serif">Filtros Avanzados</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Duration Range */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Duración (minutos)</h4>
          <div className="px-2">
            <Slider
              value={filters.durationRange}
              onValueChange={(value) =>
                onFiltersChange((prev) => ({ ...prev, durationRange: value as [number, number] }))
              }
              max={120}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{filters.durationRange[0]} min</span>
              <span>{filters.durationRange[1]} min</span>
            </div>
          </div>
        </div>

        {/* Equipment Filter */}
        {allEquipment.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Equipamiento</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {allEquipment.map((equipment) => (
                <div key={equipment} className="flex items-center space-x-2">
                  <Checkbox
                    id={`equipment-${equipment}`}
                    checked={filters.equipment.includes(equipment)}
                    onCheckedChange={(checked) => handleEquipmentChange(equipment, checked as boolean)}
                  />
                  <label
                    htmlFor={`equipment-${equipment}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {equipment}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Muscle Groups Filter */}
        {allMuscleGroups.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Grupos Musculares</h4>
            <div className="flex flex-wrap gap-2">
              {allMuscleGroups.map((group) => (
                <Badge
                  key={group}
                  variant={filters.muscleGroups.includes(group) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleMuscleGroupChange(group, !filters.muscleGroups.includes(group))}
                >
                  {group}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {(filters.equipment.length > 0 || filters.muscleGroups.length > 0) && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-medium text-sm">Filtros Activos</h4>
            <div className="flex flex-wrap gap-2">
              {filters.equipment.map((equipment) => (
                <Badge key={equipment} variant="secondary" className="text-xs">
                  {equipment}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleEquipmentChange(equipment, false)} />
                </Badge>
              ))}
              {filters.muscleGroups.map((group) => (
                <Badge key={group} variant="secondary" className="text-xs">
                  {group}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleMuscleGroupChange(group, false)} />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
