-- Add persona_type to profiles table
ALTER TABLE public.profiles 
ADD COLUMN persona_type text CHECK (persona_type IN ('athlete', 'senior', 'desk_worker', 'parent'));

-- Add index for faster queries
CREATE INDEX idx_profiles_persona_type ON public.profiles(persona_type);