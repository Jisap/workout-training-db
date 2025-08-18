"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { useState } from "react"
import type { Database } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, X, ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { createWorkout, updateWorkout } from "@/lib/actions"

type Workout = Database["public"]["Tables"]["workouts"]["Row"]

interface WorkoutFormProps {
  workout?: Workout
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} className="bg-primary hover:bg-primary/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isEditing ? "Actualizando..." : "Creando..."}
        </>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" />
          {isEditing ? "Actualizar Entrenamiento" : "Crear Entrenamiento"}
        </>
      )}
    </Button>
  )
}

const workoutTypes = ["CrossFit", "HIIT", "Funcional", "Fuerza", "Cardio"]
const difficulties = ["Principiante", "Intermedio", "Avanzado"]
const commonEquipment = [
  "Barra",
  "Mancuernas",
  "Kettlebell",
  "Pull-up bar",
  "Discos",
  "Banco",
  "Colchoneta",
  "Pelota medicinal",
  "Cinta",
  "Bicicleta",
  "Cuerda",
  "Bandas elásticas",
]
const commonMuscleGroups = [
  "Pecho",
  "Espalda",
  "Hombros",
  "Brazos",
  "Core",
  "Piernas",
  "Glúteos",
  "Cardio",
  "Cuerpo completo",
]

export default function WorkoutForm({ workout }: WorkoutFormProps) {
  const isEditing = !!workout
  const [state, formAction] = useActionState(isEditing ? updateWorkout : createWorkout, null)

  const [equipment, setEquipment] = useState<string[]>(workout?.equipment || [])
  const [muscleGroups, setMuscleGroups] = useState<string[]>(workout?.muscle_groups || [])
  const [newEquipment, setNewEquipment] = useState("")
  const [newMuscleGroup, setNewMuscleGroup] = useState("")

  const addEquipment = (item: string) => {
    if (item && !equipment.includes(item)) {
      setEquipment([...equipment, item])
    }
    setNewEquipment("")
  }

  const removeEquipment = (item: string) => {
    setEquipment(equipment.filter((e) => e !== item))
  }

  const addMuscleGroup = (group: string) => {
    if (group && !muscleGroups.includes(group)) {
      setMuscleGroups([...muscleGroups, group])
    }
    setNewMuscleGroup("")
  }

  const removeMuscleGroup = (group: string) => {
    setMuscleGroups(muscleGroups.filter((g) => g !== group))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-serif">
            {isEditing ? "Editar Entrenamiento" : "Nuevo Entrenamiento"}
          </CardTitle>
        </CardHeader>

        <form action={formAction}>
          {isEditing && <input type="hidden" name="id" value={workout.id} />}
          <input type="hidden" name="equipment" value={equipment.join(",")} />
          <input type="hidden" name="muscle_groups" value={muscleGroups.join(",")} />

          <CardContent className="space-y-6">
            {state?.error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                {state.error}
              </div>
            )}

            {state?.success && (
              <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-lg text-sm">
                {state.success}
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nombre del Entrenamiento *
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ej: Morning HIIT"
                  required
                  defaultValue={workout?.name}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium text-foreground">
                  Tipo de Entrenamiento *
                </label>
                <Select name="type" defaultValue={workout?.type} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium text-foreground">
                  Duración (minutos) *
                </label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  max="180"
                  placeholder="30"
                  required
                  defaultValue={workout?.duration}
                  className="bg-background border-border"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="difficulty" className="text-sm font-medium text-foreground">
                  Dificultad *
                </label>
                <Select name="difficulty" defaultValue={workout?.difficulty} required>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Selecciona la dificultad" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Descripción
              </label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe brevemente el entrenamiento..."
                rows={3}
                defaultValue={workout?.description || ""}
                className="bg-background border-border resize-none"
              />
            </div>

            {/* Equipment */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground">Equipamiento</label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {commonEquipment.map((item) => (
                  <Button
                    key={item}
                    type="button"
                    variant={equipment.includes(item) ? "default" : "outline"}
                    size="sm"
                    onClick={() => (equipment.includes(item) ? removeEquipment(item) : addEquipment(item))}
                    className="justify-start text-xs"
                  >
                    {item}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Agregar equipamiento personalizado"
                  value={newEquipment}
                  onChange={(e) => setNewEquipment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addEquipment(newEquipment))}
                  className="bg-background border-border"
                />
                <Button type="button" variant="outline" onClick={() => addEquipment(newEquipment)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {equipment.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {equipment.map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {item}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeEquipment(item)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Muscle Groups */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground">Grupos Musculares</label>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {commonMuscleGroups.map((group) => (
                  <Button
                    key={group}
                    type="button"
                    variant={muscleGroups.includes(group) ? "default" : "outline"}
                    size="sm"
                    onClick={() => (muscleGroups.includes(group) ? removeMuscleGroup(group) : addMuscleGroup(group))}
                    className="justify-start text-xs"
                  >
                    {group}
                  </Button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Agregar grupo muscular personalizado"
                  value={newMuscleGroup}
                  onChange={(e) => setNewMuscleGroup(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMuscleGroup(newMuscleGroup))}
                  className="bg-background border-border"
                />
                <Button type="button" variant="outline" onClick={() => addMuscleGroup(newMuscleGroup)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {muscleGroups.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {muscleGroups.map((group) => (
                    <Badge key={group} variant="secondary" className="text-xs">
                      {group}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeMuscleGroup(group)} />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <label htmlFor="instructions" className="text-sm font-medium text-foreground">
                Instrucciones del Entrenamiento
              </label>
              <Textarea
                id="instructions"
                name="instructions"
                placeholder="Describe paso a paso cómo realizar el entrenamiento..."
                rows={6}
                defaultValue={workout?.instructions || ""}
                className="bg-background border-border resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <SubmitButton isEditing={isEditing} />
              <Button variant="outline" asChild>
                <Link href="/">Cancelar</Link>
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
