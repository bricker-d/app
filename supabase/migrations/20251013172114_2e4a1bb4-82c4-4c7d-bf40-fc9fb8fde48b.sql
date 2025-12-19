-- Create bioguide_scores table for the Accountability Score feature
CREATE TABLE IF NOT EXISTS public.bioguide_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  date DATE NOT NULL,
  total_score NUMERIC NOT NULL CHECK (total_score >= 0 AND total_score <= 100),
  sleep_score NUMERIC CHECK (sleep_score >= 0 AND sleep_score <= 100),
  nutrition_score NUMERIC CHECK (nutrition_score >= 0 AND nutrition_score <= 100),
  glucose_score NUMERIC CHECK (glucose_score >= 0 AND glucose_score <= 100),
  exercise_score NUMERIC CHECK (exercise_score >= 0 AND exercise_score <= 100),
  biomarker_score NUMERIC CHECK (biomarker_score >= 0 AND biomarker_score <= 100),
  weekly_change NUMERIC,
  calculation_metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable RLS
ALTER TABLE public.bioguide_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for bioguide_scores
CREATE POLICY "Users can view their own scores"
  ON public.bioguide_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scores"
  ON public.bioguide_scores FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create weekly_plans table for BioPlan feature
CREATE TABLE IF NOT EXISTS public.weekly_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  priorities JSONB NOT NULL DEFAULT '[]'::jsonb,
  summary TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_start)
);

-- Enable RLS
ALTER TABLE public.weekly_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for weekly_plans
CREATE POLICY "Users can view their own weekly plans"
  ON public.weekly_plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own weekly plans"
  ON public.weekly_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weekly plans"
  ON public.weekly_plans FOR UPDATE
  USING (auth.uid() = user_id);

-- Create nudges table for Adaptive Nudges feature
CREATE TABLE IF NOT EXISTS public.nudges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  message TEXT NOT NULL,
  nudge_type TEXT NOT NULL,
  trigger_data JSONB,
  priority TEXT NOT NULL DEFAULT 'medium',
  is_read BOOLEAN DEFAULT false,
  is_dismissed BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.nudges ENABLE ROW LEVEL SECURITY;

-- RLS Policies for nudges
CREATE POLICY "Users can view their own nudges"
  ON public.nudges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own nudges"
  ON public.nudges FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trajectory_snapshots table for 12-week trend tracking
CREATE TABLE IF NOT EXISTS public.trajectory_snapshots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  snapshot_date DATE NOT NULL,
  hrv_trend TEXT,
  glucose_trend TEXT,
  sleep_trend TEXT,
  vo2max_trend TEXT,
  trend_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, snapshot_date)
);

-- Enable RLS
ALTER TABLE public.trajectory_snapshots ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trajectory_snapshots
CREATE POLICY "Users can view their own trajectory"
  ON public.trajectory_snapshots FOR SELECT
  USING (auth.uid() = user_id);

-- Add trigger for weekly_plans updated_at
CREATE OR REPLACE FUNCTION update_weekly_plans_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path TO '';

CREATE TRIGGER update_weekly_plans_updated_at
  BEFORE UPDATE ON public.weekly_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_weekly_plans_updated_at();