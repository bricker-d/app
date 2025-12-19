-- Create expanded user profiles table with comprehensive biometric data
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  weight_lbs NUMERIC(5,1),
  height_feet INTEGER,
  height_inches INTEGER,
  age INTEGER,
  biological_sex TEXT CHECK (biological_sex IN ('male', 'female', 'other')),
  
  -- Activity & Lifestyle
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  exercise_frequency INTEGER, -- days per week
  exercise_types TEXT[], -- array of exercise types
  
  -- Sleep
  wake_time TIME,
  bed_time TIME,
  sleep_goal_hours NUMERIC(3,1) DEFAULT 8.0,
  
  -- Nutrition & Hydration
  protein_goal_grams INTEGER,
  caffeine_habit TEXT CHECK (caffeine_habit IN ('none', 'morning', 'afternoon', 'evening', 'throughout')),
  hydration_goal_oz INTEGER DEFAULT 64,
  
  -- Health Conditions & Goals
  health_conditions TEXT[],
  medications TEXT[],
  fitness_goals TEXT[],
  stress_level TEXT CHECK (stress_level IN ('low', 'moderate', 'high')),
  
  -- Advanced Metrics
  resting_heart_rate INTEGER,
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  vo2_max NUMERIC(4,1),
  body_fat_percentage NUMERIC(4,1),
  
  -- Metabolic
  fasting_glucose INTEGER,
  hba1c NUMERIC(3,1),
  
  -- Preferences
  preferred_units TEXT CHECK (preferred_units IN ('imperial', 'metric')) DEFAULT 'imperial',
  timezone TEXT DEFAULT 'America/New_York',
  
  -- Tracking preferences
  track_hrv BOOLEAN DEFAULT true,
  track_sleep BOOLEAN DEFAULT true,
  track_nutrition BOOLEAN DEFAULT true,
  track_hydration BOOLEAN DEFAULT true,
  track_steps BOOLEAN DEFAULT true,
  track_workouts BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user profile access
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile" 
ON public.user_profiles 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_user_profiles_updated_at();

-- Create notification settings table
CREATE TABLE IF NOT EXISTS public.notification_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Notification channels
  push_enabled BOOLEAN DEFAULT true,
  email_enabled BOOLEAN DEFAULT false,
  watch_enabled BOOLEAN DEFAULT true,
  
  -- Quiet hours
  quiet_hours_start TIME DEFAULT '22:00',
  quiet_hours_end TIME DEFAULT '07:00',
  
  -- Rule preferences
  hydration_reminders BOOLEAN DEFAULT true,
  sedentary_breaks BOOLEAN DEFAULT true,
  post_meal_walks BOOLEAN DEFAULT true,
  hrv_recovery BOOLEAN DEFAULT true,
  protein_targets BOOLEAN DEFAULT true,
  sleep_wind_down BOOLEAN DEFAULT true,
  caffeine_cutoff BOOLEAN DEFAULT true,
  step_gap_alerts BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security for notification settings
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for notification settings
CREATE POLICY "Users can view their own notification settings" 
ON public.notification_settings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notification settings" 
ON public.notification_settings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notification settings" 
ON public.notification_settings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notification settings" 
ON public.notification_settings 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_notification_settings_updated_at
BEFORE UPDATE ON public.notification_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_user_profiles_updated_at();