import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell, LineChart, Lock, Smartphone, Palette, CheckSquare } from "lucide-react"
import { Navigation } from "@/components/navigation"
import Header from "@/components/Header"

export default function LandingPage() {
  const features = [
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Autenticación Segura",
      description: "Registro e inicio de sesión seguros gestionados por Supabase Auth para proteger tus datos.",
    },
    {
      icon: <Dumbbell className="h-8 w-8 text-primary" />,
      title: "Gestión de Entrenamientos",
      description: "Crea, lee, actualiza y elimina fácilmente tus sesiones de entrenamiento y ejercicios personalizados.",
    },
    {
      icon: <LineChart className="h-8 w-8 text-primary" />,
      title: "Seguimiento del Progreso",
      description: "Visualiza tu progreso con gráficos interactivos y monitoriza tu rendimiento a lo largo del tiempo.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Diseño Responsivo",
      description: "Interfaz completamente adaptable a dispositivos de escritorio y móviles para entrenar donde quieras.",
    },
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "Modo Claro y Oscuro",
      description: "Cambia entre temas para una experiencia visual cómoda en cualquier condición de luz.",
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-primary" />,
      title: "Formularios Robustos",
      description: "Validación de formularios segura y eficiente con React Hook Form y Zod.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="h-[80vh] w-full flex flex-col justify-center bg-gradient-to-b from-background to-slate-50 dark:from-background dark:to-slate-900/80">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h1 className="text-4xl font-bold tracking-normal sm:text-5xl md:text-6xl font-serif">
                Transforma tu Entrenamiento. Registra tu Progreso.
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Workout Training DB es la herramienta definitiva para registrar, seguir y analizar tus rutinas. Lleva tu
                fitness al siguiente nivel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-semibold">
                  <Link href="/auth/signup">Empezar Gratis</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                  <Link href="/auth/login">Iniciar Sesión</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/80 dark:to-primary/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Características Principales</div>
              <h2 className="text-3xl font-bold tracking-normal sm:text-5xl font-serif">
                Todo lo que necesitas para tu Fitness
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Desde la gestión de tus rutinas hasta el análisis detallado de tu progreso, tenemos todo cubierto.
              </p>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg bg-card/80 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    {feature.icon}
                    <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-28 md:py-24 lg:py-2 bg-gradient-to-b from-slate-100 to-slate-200/60 dark:from-primary/10 dark:to-slate-900/50">
          <div className="container mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-normal md:text-4xl/tight font-serif">
                Empieza en Tres Sencillos Pasos
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Comienza a transformar tu forma de entrenar hoy mismo. Es rápido, fácil e intuitivo.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl pt-12">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Regístrate</h3>
                  <p className="text-muted-foreground">Crea tu cuenta gratuita en segundos.</p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Crea tus Rutinas</h3>
                  <p className="text-muted-foreground">Añade tus entrenamientos y ejercicios personalizados.</p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Analiza tu Progreso</h3>
                  <p className="text-muted-foreground">Observa cómo mejoras con nuestros gráficos.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-slate-200/60 to-background dark:from-slate-900/50 dark:to-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold tracking-normal sm:text-4xl md:text-5xl font-serif">
                ¿Listo para Empezar?
              </h2>
              <p className="text-lg text-muted-foreground md:text-xl">
                Únete a la comunidad y lleva un control preciso de tu entrenamiento.
              </p>
              <Button asChild size="lg" className="font-semibold">
                <Link href="/auth/register">Crear mi Cuenta Ahora</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Workout Training DB. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}