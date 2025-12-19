-- Add name fields to user profiles for proper personalization
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT,
ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Add more technical/advanced health metrics
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS baseline_hrv_ms INTEGER,
ADD COLUMN IF NOT EXISTS lactate_threshold_bpm INTEGER,
ADD COLUMN IF NOT EXISTS anaerobic_threshold_bpm INTEGER,
ADD COLUMN IF NOT EXISTS recovery_heart_rate_1min INTEGER,
ADD COLUMN IF NOT EXISTS heart_rate_zones JSONB,
ADD COLUMN IF NOT EXISTS metabolic_efficiency_score NUMERIC(4,2),
ADD COLUMN IF NOT EXISTS autonomic_balance_score NUMERIC(4,2),
ADD COLUMN IF NOT EXISTS chronotype TEXT CHECK (chronotype IN ('extreme_early', 'moderate_early', 'intermediate', 'moderate_late', 'extreme_late')),
ADD COLUMN IF NOT EXISTS core_body_temp_pattern JSONB,
ADD COLUMN IF NOT EXISTS insulin_sensitivity_score NUMERIC(4,2),
ADD COLUMN IF NOT EXISTS inflammation_markers JSONB,
ADD COLUMN IF NOT EXISTS micronutrient_profile JSONB,
ADD COLUMN IF NOT EXISTS hydration_efficiency_ml_per_kg NUMERIC(5,2),
ADD COLUMN IF NOT EXISTS sweat_rate_ml_per_hour INTEGER,
ADD COLUMN IF NOT EXISTS thermoregulation_efficiency NUMERIC(4,2);

-- Add advanced tracking preferences
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS track_hrv_variability BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS track_autonomic_balance BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS track_metabolic_flexibility BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS track_circadian_rhythm BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS track_inflammation_markers BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS track_cognitive_performance BOOLEAN DEFAULT false;