"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Mail, Shield, Trash2 } from "lucide-react"
import { signOut } from "@/lib/actions"

interface ProfileSettingsProps {
  user: any
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)

  const handlePasswordChange = async (formData: FormData) => {
    setIsChangingPassword(true)
    // Here you would implement password change logic
    setTimeout(() => {
      setIsChangingPassword(false)
      alert("Funcionalidad de cambio de contraseña no implementada en esta demo")
    }, 1000)
  }

  const handleDeleteAccount = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      setIsDeletingAccount(true)
      // Here you would implement account deletion logic
      setTimeout(() => {
        setIsDeletingAccount(false)
        alert("Funcionalidad de eliminación de cuenta no implementada en esta demo")
      }, 1000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Account Information */}
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Información de la Cuenta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled className="bg-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="created">Miembro desde</Label>
              <Input
                id="created"
                value={new Date(user.created_at).toLocaleDateString()}
                disabled
                className="bg-muted"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Tu email no se puede cambiar. Si necesitas usar un email diferente, contacta al soporte.
          </p>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-serif flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Seguridad
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Cambiar Contraseña</h4>
            <form action={handlePasswordChange} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Contraseña Actual</Label>
                  <Input id="current-password" name="current-password" type="password" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nueva Contraseña</Label>
                  <Input id="new-password" name="new-password" type="password" className="bg-background" />
                </div>
              </div>
              <Button type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? "Cambiando..." : "Cambiar Contraseña"}
              </Button>
            </form>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Sesiones Activas</h4>
            <div className="p-4 bg-background/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sesión Actual</p>
                  <p className="text-sm text-muted-foreground">Iniciada el {new Date().toLocaleDateString()}</p>
                </div>
                <form action={signOut}>
                  <Button variant="outline" size="sm" type="submit">
                    Cerrar Sesión
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm border-destructive/20">
        <CardHeader>
          <CardTitle className="text-xl font-serif flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Zona de Peligro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
            <h4 className="font-medium text-destructive mb-2">Eliminar Cuenta</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.
            </p>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
              className="bg-destructive hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {isDeletingAccount ? "Eliminando..." : "Eliminar Cuenta"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
