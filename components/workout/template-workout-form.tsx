"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Star } from "lucide-react"
import Link from "next/link"
import { createWorkoutFromTemplate } from "@/lib/actions"

interface Template {
  id: string
  name: string
  type: string
  duration: number
  difficulty: string
  equipment: string[]
  muscle_groups: string[]
  description: string | null
  instructions: string | null
  is_featured: boolean
}

interface TemplateWorkoutFormProps {
  template: Template
}

export default function TemplateWorkoutForm({ template }: TemplateWorkoutFormProps) {
  const [customName, setCustomName] = useState(template.name)
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateFromTemplate = async () => {
    setIsCreating(true)
    try {
      await createWorkoutFromTemplate(template.id, customName)
      // Redirect to dashboard
      window.location.href = "/"
    } catch (error) {
      console.error("Error creating workout from template:", error)
      alert("Error al crear el entrenamiento")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/templates">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            {template.is_featured && <Star className="h-5 w-5 text-primary" />}
            <CardTitle className="text-2xl font-serif">{template.name}</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Template Preview */}
          <div className="p-4 bg-background/50 rounded-lg space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {template.type}
              </Badge>
              <Badge variant="outline">{template.difficulty}</Badge>
              <Badge variant="outline">{template.duration} min</Badge>
            </div>

            {template.description && <p className="text-muted-foreground">{template.description}</p>}

            {template.equipment.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Equipamiento:</h4>
                <div className="flex flex-wrap gap-1">
                  {template.equipment.map((item) => (
                    <Badge key={item} variant="secondary" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {template.muscle_groups.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Grupos Musculares:</h4>
                <div className="flex flex-wrap gap-1">
                  {template.muscle_groups.map((group) => (
                    <Badge key={group} variant="secondary" className="text-xs">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {template.instructions && (
              <div>
                <h4 className="font-medium mb-2">Instrucciones:</h4>
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans bg-background p-3 rounded">
                  {template.instructions}
                </pre>
              </div>
            )}
          </div>

          {/* Customization */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">Personalizar</h3>
            <div className="space-y-2">
              <label htmlFor="custom-name" className="text-sm font-medium text-foreground">
                Nombre del Entrenamiento
              </label>
              <Input
                id="custom-name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Nombre personalizado..."
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleCreateFromTemplate} disabled={isCreating} className="bg-primary hover:bg-primary/90">
              {isCreating ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Creando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Agregar a Mis Entrenamientos
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/templates">Cancelar</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
