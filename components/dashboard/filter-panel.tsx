"use client"

import { useState } from "react"
import type { Database } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"

type Workout = Database["public"]["Tables"]["workouts"]["Row"]

interface FilterPanelProps {
  workouts: Workout[]
  onFiltersChange: (filters: any) => void
}

export default function FilterPanel({ workouts, onFiltersChange }: FilterPanelProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([])
  const [durationRange, setDurationRange] = useState<number[]>([0, 120])

  // Extract unique equipment and muscle groups from workouts
  const allEquipment = Array.from(new Set(workouts.flatMap((w) => w.equipment)))
  const allMuscleGroups = Array.from(new Set(workouts.flatMap((w) => w.muscle_groups)))

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    const updated = checked ? [...selectedEquipment, equipment] : selectedEquipment.filter((e) => e !== equipment)
    setSelectedEquipment(updated)
    onFiltersChange({ equipment: updated, muscleGroups: selectedMuscleGroups, durationRange })
  }

  const handleMuscleGroupChange = (group: string, checked: boolean) => {
    const updated = checked ? [...selectedMuscleGroups, group] : selectedMuscleGroups.filter((g) => g !== group)
    setSelectedMuscleGroups(updated)
    onFiltersChange({ equipment: selectedEquipment, muscleGroups: updated, durationRange })
  }

  const clearAllFilters = () => {
    setSelectedEquipment([])
    setSelectedMuscleGroups([])
    setDurationRange([0, 120])
    onFiltersChange({ equipment: [], muscleGroups: [], durationRange: [0, 120] })
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
              value={durationRange}
              onValueChange={(value) => {
                setDurationRange(value)
                onFiltersChange({
                  equipment: selectedEquipment,
                  muscleGroups: selectedMuscleGroups,
                  durationRange: value,
                })
              }}
              max={120}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{durationRange[0]} min</span>
              <span>{durationRange[1]} min</span>
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
                    checked={selectedEquipment.includes(equipment)}
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
                  variant={selectedMuscleGroups.includes(group) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleMuscleGroupChange(group, !selectedMuscleGroups.includes(group))}
                >
                  {group}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Active Filters Summary */}
        {(selectedEquipment.length > 0 || selectedMuscleGroups.length > 0) && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-medium text-sm">Filtros Activos</h4>
            <div className="flex flex-wrap gap-2">
              {selectedEquipment.map((equipment) => (
                <Badge key={equipment} variant="secondary" className="text-xs">
                  {equipment}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleEquipmentChange(equipment, false)} />
                </Badge>
              ))}
              {selectedMuscleGroups.map((group) => (
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
