-- Fixed empty arrays by specifying TEXT[] type explicitly
-- Insert sample workouts for testing
INSERT INTO workouts (user_id, name, type, duration, difficulty, equipment, muscle_groups, description, instructions) VALUES
-- CrossFit workouts
(auth.uid(), 'Cindy', 'CrossFit', 20, 'Intermedio', ARRAY['Pull-up bar'], ARRAY['Brazos', 'Core', 'Piernas'], 'AMRAP clásico de CrossFit', '20 minutos AMRAP: 5 Pull-ups, 10 Push-ups, 15 Air Squats'),
(auth.uid(), 'Fran', 'CrossFit', 15, 'Avanzado', ARRAY['Barra', 'Discos'], ARRAY['Piernas', 'Hombros'], 'Workout intenso de thrusters y pull-ups', '21-15-9: Thrusters (43kg), Pull-ups'),
(auth.uid(), 'Helen', 'CrossFit', 25, 'Intermedio', ARRAY['Kettlebell'], ARRAY['Cardio', 'Piernas', 'Core'], 'Combinación de carrera y kettlebell swings', '3 rondas: 400m carrera, 21 Kettlebell swings (24kg), 12 Pull-ups'),

-- HIIT workouts
(auth.uid(), 'Tabata Burpees', 'HIIT', 4, 'Principiante', ARRAY[]::TEXT[], ARRAY['Cuerpo completo'], 'Protocolo Tabata con burpees', '8 rondas: 20 seg trabajo, 10 seg descanso - Burpees'),
(auth.uid(), 'HIIT Cardio Blast', 'HIIT', 15, 'Intermedio', ARRAY[]::TEXT[], ARRAY['Cardio', 'Piernas'], 'Circuito de alta intensidad', '3 rondas: 45 seg Mountain Climbers, 15 seg descanso, 45 seg Jump Squats, 15 seg descanso, 45 seg High Knees, 15 seg descanso'),

-- Functional workouts
(auth.uid(), 'Functional Flow', 'Funcional', 30, 'Intermedio', ARRAY['Mancuernas', 'Pelota medicinal'], ARRAY['Cuerpo completo'], 'Movimientos funcionales para la vida diaria', '4 rondas: 12 Goblet Squats, 10 Push-ups, 8 Medicine Ball Slams, 6 Single Arm Rows cada brazo'),
(auth.uid(), 'Core Power', 'Funcional', 20, 'Principiante', ARRAY['Colchoneta'], ARRAY['Core'], 'Fortalecimiento del core', '3 rondas: 30 seg Plank, 20 Russian Twists, 15 Dead Bugs cada lado, 10 Glute Bridges'),

-- Strength workouts
(auth.uid(), 'Upper Body Strength', 'Fuerza', 45, 'Intermedio', ARRAY['Barra', 'Mancuernas', 'Banco'], ARRAY['Pecho', 'Espalda', 'Brazos'], 'Entrenamiento de fuerza para tren superior', '4 series: Bench Press 8 reps, Bent Over Rows 8 reps, Overhead Press 6 reps, Pull-ups máximo'),
(auth.uid(), 'Leg Day', 'Fuerza', 50, 'Avanzado', ARRAY['Barra', 'Discos'], ARRAY['Piernas', 'Glúteos'], 'Entrenamiento intenso de piernas', '5 series: Back Squats 5 reps, Romanian Deadlifts 8 reps, Bulgarian Split Squats 10 cada pierna'),

-- Cardio workouts
(auth.uid(), 'Morning Cardio', 'Cardio', 25, 'Principiante', ARRAY[]::TEXT[], ARRAY['Cardio'], 'Cardio suave para empezar el día', '25 minutos: 5 min calentamiento caminando, 15 min trote suave, 5 min enfriamiento caminando'),
(auth.uid(), 'LISS Cardio', 'Cardio', 40, 'Principiante', ARRAY['Cinta', 'Bicicleta'], ARRAY['Cardio'], 'Cardio de baja intensidad sostenida', '40 minutos de actividad cardiovascular a ritmo constante y moderado')

ON CONFLICT DO NOTHING;
