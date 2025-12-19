-- Create metrics table to define available health metrics
CREATE TABLE public.metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  unit TEXT NOT NULL,
  category TEXT NOT NULL,
  normal_range_min DECIMAL,
  normal_range_max DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create readings table for time-series health data
CREATE TABLE public.readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  metric_id UUID NOT NULL REFERENCES public.metrics(id) ON DELETE CASCADE,
  value DECIMAL NOT NULL,
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on both tables
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;

-- Policies for metrics (publicly readable)
CREATE POLICY "Metrics are viewable by everyone" 
ON public.metrics 
FOR SELECT 
USING (true);

-- Policies for readings (user-specific data)
CREATE POLICY "Users can view their own readings" 
ON public.readings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own readings" 
ON public.readings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own readings" 
ON public.readings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own readings" 
ON public.readings 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_readings_user_id ON public.readings(user_id);
CREATE INDEX idx_readings_metric_id ON public.readings(metric_id);
CREATE INDEX idx_readings_recorded_at ON public.readings(recorded_at);
CREATE INDEX idx_readings_user_metric_time ON public.readings(user_id, metric_id, recorded_at);

-- Insert initial metrics
INSERT INTO public.metrics (name, display_name, unit, category, normal_range_min, normal_range_max) VALUES
('heart_rate', 'Heart Rate', 'bpm', 'cardiovascular', 60, 100),
('glucose', 'Blood Glucose', 'mg/dL', 'metabolic', 70, 99),
('sleep_hours', 'Sleep Duration', 'hours', 'recovery', 7, 9),
('steps', 'Daily Steps', 'steps', 'activity', 8000, 12000),
('hydration', 'Hydration', 'fl oz', 'nutrition', 64, 80),
('stress', 'Stress Level', 'scale', 'mental', 1, 3),
('energy', 'Energy Level', 'scale', 'mental', 7, 10),
('body_temp', 'Body Temperature', '°F', 'vitals', 97.8, 99.1),
('oxygen_sat', 'Oxygen Saturation', '%', 'respiratory', 95, 100),
('blood_pressure_sys', 'Systolic BP', 'mmHg', 'cardiovascular', 90, 120),
('blood_pressure_dia', 'Diastolic BP', 'mmHg', 'cardiovascular', 60, 80);