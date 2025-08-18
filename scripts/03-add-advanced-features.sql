-- Fixed empty arrays and made policies idempotent
-- Add favorites table for users to favorite workouts
CREATE TABLE IF NOT EXISTS workout_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, workout_id)
);

-- Add workout templates table for pre-made workouts
CREATE TABLE IF NOT EXISTS workout_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  duration INTEGER NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  equipment TEXT[],
  muscle_groups TEXT[],
  description TEXT,
  instructions TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add workout sessions table for tracking completed workouts
CREATE TABLE IF NOT EXISTS workout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration_actual INTEGER, -- actual time taken
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_workout_favorites_user_id ON workout_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_sessions_workout_id ON workout_sessions(workout_id);

-- Enable RLS on new tables
ALTER TABLE workout_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for workout_favorites (drop existing first)
DROP POLICY IF EXISTS "Users can view own favorites" ON workout_favorites;
DROP POLICY IF EXISTS "Users can insert own favorites" ON workout_favorites;
DROP POLICY IF EXISTS "Users can delete own favorites" ON workout_favorites;

CREATE POLICY "Users can view own favorites" ON workout_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON workout_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON workout_favorites
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for workout_sessions (drop existing first)
DROP POLICY IF EXISTS "Users can view own sessions" ON workout_sessions;
DROP POLICY IF EXISTS "Users can insert own sessions" ON workout_sessions;
DROP POLICY IF EXISTS "Users can update own sessions" ON workout_sessions;

CREATE POLICY "Users can view own sessions" ON workout_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON workout_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON workout_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert some featured workout templates
INSERT INTO workout_templates (name, type, duration, difficulty, equipment, muscle_groups, description, instructions, is_featured) VALUES
('7-Minute Scientific Workout', 'HIIT', 7, 'Principiante', ARRAY[]::TEXT[], ARRAY['Cuerpo completo'], 'Entrenamiento científicamente probado de alta intensidad', '12 ejercicios, 30 segundos cada uno, 10 segundos de descanso:\n1. Jumping Jacks\n2. Wall Sit\n3. Push-ups\n4. Abdominal Crunch\n5. Step-up\n6. Squat\n7. Triceps Dip\n8. Plank\n9. High Knees Running\n10. Lunge\n11. Push-up Rotation\n12. Side Plank (cada lado)', true),

('Murph Hero WOD', 'CrossFit', 45, 'Avanzado', ARRAY['Pull-up bar', 'Chaleco con peso'], ARRAY['Cuerpo completo'], 'WOD Hero dedicado al teniente Michael Murphy', 'For Time:\n1 Mile Run\n100 Pull-ups\n200 Push-ups\n300 Air Squats\n1 Mile Run\n\n*Usar chaleco de 20/14 lbs si es posible\n*Partir los pull-ups, push-ups y squats como desees', true),

('Beginner Strength Circuit', 'Fuerza', 30, 'Principiante', ARRAY['Mancuernas'], ARRAY['Cuerpo completo'], 'Circuito de fuerza para principiantes', '3 rondas, 45 seg trabajo / 15 seg descanso:\n1. Goblet Squats\n2. Push-ups (modificados si es necesario)\n3. Bent Over Rows\n4. Plank Hold\n5. Glute Bridges\n6. Overhead Press\n\nDescanso 2 minutos entre rondas', true),

('Cardio Blast HIIT', 'HIIT', 20, 'Intermedio', ARRAY[]::TEXT[], ARRAY['Cardio', 'Piernas'], 'Entrenamiento HIIT enfocado en cardio', '4 rondas, 4 minutos cada una:\n45 seg trabajo / 15 seg descanso\n\nRonda 1: Burpees, Mountain Climbers, Jump Squats\nRonda 2: High Knees, Butt Kicks, Jumping Lunges\nRonda 3: Star Jumps, Plank Jacks, Squat Jumps\nRonda 4: Sprint in Place, Jump Rope (imaginario), Tuck Jumps\n\n1 minuto descanso entre rondas', true)

ON CONFLICT DO NOTHING;
