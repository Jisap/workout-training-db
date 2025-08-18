import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      workouts: {
        Row: {
          id: string
          user_id: string
          name: string
          type: string
          duration: number
          difficulty: string
          equipment: string[]
          muscle_groups: string[]
          description: string | null
          instructions: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          type: string
          duration: number
          difficulty: string
          equipment: string[]
          muscle_groups: string[]
          description?: string | null
          instructions?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          type?: string
          duration?: number
          difficulty?: string
          equipment?: string[]
          muscle_groups?: string[]
          description?: string | null
          instructions?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
