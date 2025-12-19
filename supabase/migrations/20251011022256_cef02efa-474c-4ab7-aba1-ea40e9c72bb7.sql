-- Create enum types only if they don't exist
DO $$ BEGIN
  CREATE TYPE public.user_status AS ENUM ('active', 'inactive', 'suspended');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.assessment_type AS ENUM ('vo2max', 'endopat', 'dexa', 'movement_screen', 'rmssd');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.alert_severity AS ENUM ('low', 'medium', 'high', 'critical');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- User roles table (separate from profiles for security)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (if not exists)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Update profiles table to match spec
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS dob DATE,
  ADD COLUMN IF NOT EXISTS sex_at_birth TEXT,
  ADD COLUMN IF NOT EXISTS height_cm NUMERIC,
  ADD COLUMN IF NOT EXISTS weight_kg NUMERIC,
  ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'America/New_York',
  ADD COLUMN IF NOT EXISTS prefs_json JSONB DEFAULT '{}'::jsonb;

-- Devices table
CREATE TABLE IF NOT EXISTS public.devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  source TEXT NOT NULL,
  access_token_hash TEXT,
  refresh_token_hash TEXT,
  scopes TEXT[],
  connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_sync TIMESTAMPTZ,
  settings JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;

-- Timeseries data table
CREATE TABLE IF NOT EXISTS public.timeseries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  source TEXT NOT NULL,
  metric TEXT NOT NULL,
  ts TIMESTAMPTZ NOT NULL,
  value_num NUMERIC,
  value_txt TEXT,
  unit TEXT,
  context_json JSONB,
  ingestion_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.timeseries ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_timeseries_user_metric_ts ON public.timeseries(user_id, metric, ts DESC);
CREATE INDEX IF NOT EXISTS idx_timeseries_ingestion ON public.timeseries(ingestion_id);

-- Labs orders table
CREATE TABLE IF NOT EXISTS public.labs_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  panel_code TEXT NOT NULL,
  ordered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',
  vendor TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.labs_orders ENABLE ROW LEVEL SECURITY;

-- Labs results table
CREATE TABLE IF NOT EXISTS public.labs_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.labs_orders(id) ON DELETE CASCADE NOT NULL,
  loinc TEXT,
  analyte TEXT NOT NULL,
  value NUMERIC,
  unit TEXT,
  ref_low NUMERIC,
  ref_high NUMERIC,
  collected_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.labs_results ENABLE ROW LEVEL SECURITY;

-- Assessments table
CREATE TABLE IF NOT EXISTS public.assessments_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assessment_type assessment_type NOT NULL,
  payload_json JSONB NOT NULL,
  performed_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.assessments_new ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_assessments_new_user_type ON public.assessments_new(user_id, assessment_type, performed_at DESC);

-- Plans table
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  week_start DATE NOT NULL,
  plan_json JSONB NOT NULL,
  generated_by_model TEXT,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_plans_user_week ON public.plans(user_id, week_start DESC);

-- Adherence events table
CREATE TABLE IF NOT EXISTS public.adherence_events_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES public.plans(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL,
  ts TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL,
  duration_min INTEGER,
  rpe INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.adherence_events_new ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_adherence_new_user_plan ON public.adherence_events_new(user_id, plan_id, ts DESC);

-- Alerts table
CREATE TABLE IF NOT EXISTS public.alerts_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  alert_type TEXT NOT NULL,
  severity alert_severity NOT NULL DEFAULT 'medium',
  reason_json JSONB NOT NULL,
  raised_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.alerts_new ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_alerts_new_user_unresolved ON public.alerts_new(user_id, raised_at DESC) WHERE resolved_at IS NULL;

-- Coach notes table
CREATE TABLE IF NOT EXISTS public.coach_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ts TIMESTAMPTZ NOT NULL DEFAULT now(),
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.coach_notes ENABLE ROW LEVEL SECURITY;

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments_new (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  interval TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  provider TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments_new ENABLE ROW LEVEL SECURITY;

-- Enterprises table
CREATE TABLE IF NOT EXISTS public.enterprises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contract_terms_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.enterprises ENABLE ROW LEVEL SECURITY;

-- Enterprise members table
CREATE TABLE IF NOT EXISTS public.enterprise_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enterprise_id UUID REFERENCES public.enterprises(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(enterprise_id, user_id)
);

ALTER TABLE public.enterprise_members ENABLE ROW LEVEL SECURITY;

-- Audit log table
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  ts TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip INET,
  diff_json JSONB
);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_audit_log_ts ON public.audit_log(ts DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_actor ON public.audit_log(actor_id, ts DESC);

-- Bridge Score table for daily tracking
CREATE TABLE IF NOT EXISTS public.bridge_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  total_score NUMERIC(5,2) NOT NULL,
  metabolic_control NUMERIC(5,2),
  recovery_capacity NUMERIC(5,2),
  cardiovascular_adaptation NUMERIC(5,2),
  adherence NUMERIC(5,2),
  weekly_progress NUMERIC(5,2),
  calculation_metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE public.bridge_scores ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_bridge_scores_user_date ON public.bridge_scores(user_id, date DESC);

-- Daily readiness table
CREATE TABLE IF NOT EXISTS public.daily_readiness (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  readiness_score NUMERIC(3,1) NOT NULL,
  factors_json JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE public.daily_readiness ENABLE ROW LEVEL SECURITY;

-- Drop and recreate RLS policies for user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for devices
DROP POLICY IF EXISTS "Users can manage their own devices" ON public.devices;
CREATE POLICY "Users can manage their own devices"
  ON public.devices FOR ALL
  USING (auth.uid() = user_id);

-- RLS Policies for timeseries
DROP POLICY IF EXISTS "Users can view their own timeseries" ON public.timeseries;
DROP POLICY IF EXISTS "Users can insert their own timeseries" ON public.timeseries;
DROP POLICY IF EXISTS "Coaches can view member timeseries" ON public.timeseries;

CREATE POLICY "Users can view their own timeseries"
  ON public.timeseries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own timeseries"
  ON public.timeseries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Coaches can view member timeseries"
  ON public.timeseries FOR SELECT
  USING (public.has_role(auth.uid(), 'coach'));

-- RLS Policies for labs_orders
DROP POLICY IF EXISTS "Users can view their own labs orders" ON public.labs_orders;
DROP POLICY IF EXISTS "Clinical can view all labs orders" ON public.labs_orders;

CREATE POLICY "Users can view their own labs orders"
  ON public.labs_orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Clinical can view all labs orders"
  ON public.labs_orders FOR SELECT
  USING (public.has_role(auth.uid(), 'clinical'));

-- RLS Policies for labs_results
DROP POLICY IF EXISTS "Users can view their own labs results" ON public.labs_results;
DROP POLICY IF EXISTS "Clinical can view all labs results" ON public.labs_results;

CREATE POLICY "Users can view their own labs results"
  ON public.labs_results FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.labs_orders 
    WHERE labs_orders.id = labs_results.order_id 
    AND labs_orders.user_id = auth.uid()
  ));

CREATE POLICY "Clinical can view all labs results"
  ON public.labs_results FOR SELECT
  USING (public.has_role(auth.uid(), 'clinical'));

-- RLS Policies for assessments_new
CREATE POLICY "Users can view their own assessments"
  ON public.assessments_new FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments"
  ON public.assessments_new FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Coaches can view member assessments"
  ON public.assessments_new FOR SELECT
  USING (public.has_role(auth.uid(), 'coach') OR public.has_role(auth.uid(), 'clinical'));

-- RLS Policies for plans
DROP POLICY IF EXISTS "Users can view their own plans" ON public.plans;
DROP POLICY IF EXISTS "Coaches can view and manage member plans" ON public.plans;

CREATE POLICY "Users can view their own plans"
  ON public.plans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Coaches can view and manage member plans"
  ON public.plans FOR ALL
  USING (public.has_role(auth.uid(), 'coach'));

-- RLS Policies for adherence_events_new
CREATE POLICY "Users can manage their own adherence"
  ON public.adherence_events_new FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Coaches can view member adherence"
  ON public.adherence_events_new FOR SELECT
  USING (public.has_role(auth.uid(), 'coach'));

-- RLS Policies for alerts_new
CREATE POLICY "Users can view their own alerts"
  ON public.alerts_new FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Coaches can view member alerts"
  ON public.alerts_new FOR SELECT
  USING (public.has_role(auth.uid(), 'coach'));

-- RLS Policies for coach_notes
DROP POLICY IF EXISTS "Coaches can manage their own notes" ON public.coach_notes;
DROP POLICY IF EXISTS "Users can view notes about them" ON public.coach_notes;

CREATE POLICY "Coaches can manage their own notes"
  ON public.coach_notes FOR ALL
  USING (auth.uid() = coach_id);

CREATE POLICY "Users can view notes about them"
  ON public.coach_notes FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policies for payments_new
CREATE POLICY "Users can view their own payments"
  ON public.payments_new FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments"
  ON public.payments_new FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for enterprises
DROP POLICY IF EXISTS "Enterprise admins can view their enterprise" ON public.enterprises;
DROP POLICY IF EXISTS "Admins can manage enterprises" ON public.enterprises;

CREATE POLICY "Enterprise admins can view their enterprise"
  ON public.enterprises FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.enterprise_members
      WHERE enterprise_members.enterprise_id = enterprises.id
      AND enterprise_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage enterprises"
  ON public.enterprises FOR ALL
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'enterprise_admin'));

-- RLS Policies for enterprise_members
DROP POLICY IF EXISTS "Enterprise members can view their membership" ON public.enterprise_members;
DROP POLICY IF EXISTS "Enterprise admins can manage members" ON public.enterprise_members;

CREATE POLICY "Enterprise members can view their membership"
  ON public.enterprise_members FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Enterprise admins can manage members"
  ON public.enterprise_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.enterprise_members em
      WHERE em.enterprise_id = enterprise_members.enterprise_id
      AND em.user_id = auth.uid()
      AND em.role = 'admin'
    )
  );

-- RLS Policies for audit_log
DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_log;

CREATE POLICY "Admins can view audit logs"
  ON public.audit_log FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for bridge_scores
DROP POLICY IF EXISTS "Users can view their own bridge scores" ON public.bridge_scores;
DROP POLICY IF EXISTS "Coaches can view member bridge scores" ON public.bridge_scores;

CREATE POLICY "Users can view their own bridge scores"
  ON public.bridge_scores FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Coaches can view member bridge scores"
  ON public.bridge_scores FOR SELECT
  USING (public.has_role(auth.uid(), 'coach'));

-- RLS Policies for daily_readiness
DROP POLICY IF EXISTS "Users can view their own readiness" ON public.daily_readiness;
DROP POLICY IF EXISTS "Coaches can view member readiness" ON public.daily_readiness;

CREATE POLICY "Users can view their own readiness"
  ON public.daily_readiness FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Coaches can view member readiness"
  ON public.daily_readiness FOR SELECT
  USING (public.has_role(auth.uid(), 'coach'));

-- Update trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger for plans
DROP TRIGGER IF EXISTS update_plans_updated_at ON public.plans;
CREATE TRIGGER update_plans_updated_at
  BEFORE UPDATE ON public.plans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Trigger for enterprises
DROP TRIGGER IF EXISTS update_enterprises_updated_at ON public.enterprises;
CREATE TRIGGER update_enterprises_updated_at
  BEFORE UPDATE ON public.enterprises
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();