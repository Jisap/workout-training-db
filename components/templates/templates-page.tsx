"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Star, Clock, Target, Dumbbell } from "lucide-react"
import Link from "next/link"

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

interface TemplatesPageProps {
  templates: Template[]
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

export default function TemplatesPage({ templates }: TemplatesPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.muscle_groups.some((group) => group.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === "all" || template.type === selectedType
    const matchesDifficulty = selectedDifficulty === "all" || template.difficulty === selectedDifficulty

    return matchesSearch && matchesType && matchesDifficulty
  })

  const featuredTemplates = filteredTemplates.filter((t) => t.is_featured)
  const regularTemplates = filteredTemplates.filter((t) => !t.is_featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-serif font-bold text-foreground">Plantillas de Entrenamientos</h1>
              <p className="text-sm text-muted-foreground">Entrenamientos prediseñados listos para usar</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar plantillas..."
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Templates */}
        {featuredTemplates.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-serif font-bold text-foreground">Plantillas Destacadas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Templates */}
        {regularTemplates.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Todas las Plantillas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        )}

        {filteredTemplates.length === 0 && (
          <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2">No se encontraron plantillas</h3>
              <p className="text-muted-foreground">Intenta ajustar los filtros o términos de búsqueda.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="border-0 shadow-sm bg-card/60 backdrop-blur-sm hover:shadow-md transition-all duration-200 group relative">
      {template.is_featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
            <Star className="h-3 w-3 mr-1" />
            Destacada
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardTitle className="text-lg font-serif line-clamp-1">{template.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={typeColors[template.type as keyof typeof typeColors] || "bg-gray-100 text-gray-800"}
            >
              {template.type}
            </Badge>
            <Badge
              variant="outline"
              className={
                difficultyColors[template.difficulty as keyof typeof difficultyColors] || "bg-gray-100 text-gray-800"
              }
            >
              {template.difficulty}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {template.description && <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{template.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            <span>{template.muscle_groups.length} grupos</span>
          </div>
          {template.equipment.length > 0 && (
            <div className="flex items-center gap-1">
              <Dumbbell className="h-4 w-4" />
              <span>{template.equipment.length} equipos</span>
            </div>
          )}
        </div>

        {template.muscle_groups.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {template.muscle_groups.slice(0, 3).map((group) => (
              <Badge key={group} variant="secondary" className="text-xs">
                {group}
              </Badge>
            ))}
            {template.muscle_groups.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{template.muscle_groups.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90">
            <Link href={`/workout/template/${template.id}`}>Usar Plantilla</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
