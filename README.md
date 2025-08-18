# Workout Training DB

Una aplicación web moderna construida con Next.js 15 y Supabase para ayudarte a registrar, seguir y analizar tus rutinas de entrenamiento. Proporciona una interfaz de usuario intuitiva para gestionar ejercicios, sesiones de entrenamiento y monitorizar tu progreso a lo largo del tiempo.

## Características Principales

- **Autenticación de Usuarios:** Registro e inicio de sesión seguros gestionados por Supabase Auth.
- **Gestión de Entrenamientos (CRUD):** Crea, lee, actualiza y elimina fácilmente sesiones de entrenamiento y ejercicios.
- **Seguimiento del Progreso:** Visualiza tu progreso con gráficos interactivos (implementado con Recharts).
- **Diseño Responsivo:** Interfaz completamente adaptable a dispositivos de escritorio y móviles, construida con Tailwind CSS y shadcn/ui.
- **Modo Claro y Oscuro:** Soporte para cambiar de tema gracias a `next-themes`.
- **Validación de Formularios:** Formularios robustos y seguros utilizando `react-hook-form` y `zod`.

## Stack Tecnológico

- **Framework:** Next.js 15
- **Backend y Base de Datos:** Supabase
- **Estilos:** Tailwind CSS 4
- **Componentes UI:** shadcn/ui
- **Gestión de Formularios:** React Hook Form
- **Validación de Esquemas:** Zod
- **Visualización de Datos:** Recharts
- **Lenguaje:** TypeScript

## Getting Started

Para poner en marcha el proyecto en tu entorno local, sigue estos pasos.

### Prerequisites

Asegúrate de tener instalado Node.js (versión 20.x o superior) y un gestor de paquetes como npm, yarn o pnpm.

### Installation

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2.  **Navega al directorio del proyecto:**
   ```bash
   cd next15-workout-trainingdb
   ```
3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

### Configuración de Variables de Entorno

Este proyecto utiliza Supabase para el backend. Necesitarás configurar tus propias credenciales.

1.  Crea un archivo `.env.local` en la raíz del proyecto.
2.  Añade las siguientes variables con tus claves de API de Supabase, que puedes encontrar en el panel de control de tu proyecto en Supabase (`Project Settings > API`):

    ```env
    NEXT_PUBLIC_SUPABASE_URL="TU_PROJECT_URL_DE_SUPABASE"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="TU_ANON_KEY_DE_SUPABASE"
    ```

### Running the Development Server

Una vez instaladas las dependencias y configuradas las variables de entorno, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Runs the linter.
