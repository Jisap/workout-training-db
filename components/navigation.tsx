"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Plus, User, Dumbbell } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import Logo from "./Logo"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      label: "Inicio",
      icon: Home,
    },
    {
      href: "/workout/new",
      label: "Nuevo",
      icon: Plus,
    },
    {
      href: "/templates",
      label: "Plantillas",
      icon: Dumbbell,
    },
    {
      href: "/profile",
      label: "Perfil",
      icon: User,
    },
  ]

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* <Link href="/" className="flex items-center space-x-2">
              <Dumbbell className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">FitTracker</span>
            </Link> */}

            <div className="flex items-center space-x-2">
              <Logo />
              <p className="font-bold text-xl">FitTracker</p>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center space-y-1 text-xs font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
