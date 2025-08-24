import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LenisProvider } from "@/components/lenis-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "FitTracker - Entrenamientos Personales",
  description: "Organiza y gestiona tus entrenamientos de CrossFit, HIIT y más",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider 
          defaultTheme="system" 
          storageKey="fitness-ui-theme"
        >
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
