import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import { userProfileSchema, notificationSettingsSchema } from '@/lib/validationSchemas';

export interface UserProfile {
  id?: string;
  user_id?: string;
  
  // Persona type
  persona_type?: 'athlete' | 'senior' | 'desk_worker' | 'parent';
  
  // Personal Identity
  first_name?: string;
  last_name?: string;
  display_name?: string;
  
  // Anthropometric Data
  weight_lbs?: number;
  height_feet?: number;
  height_inches?: number;
  age?: number;
  biological_sex?: 'male' | 'female' | 'other';
  
  // Activity & Lifestyle
  activity_level?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  exercise_frequency?: number;
  exercise_types?: string[];
  
  // Sleep
  wake_time?: string;
  bed_time?: string;
  sleep_goal_hours?: number;
  
  // Nutrition & Hydration
  protein_goal_grams?: number;
  caffeine_habit?: 'none' | 'morning' | 'afternoon' | 'evening' | 'throughout';
  hydration_goal_oz?: number;
  
  // Health Conditions & Goals
  health_conditions?: string[];
  medications?: string[];
  fitness_goals?: string[];
  stress_level?: 'low' | 'moderate' | 'high';
  
  // Cardiovascular Performance Metrics
  resting_heart_rate?: number;
  baseline_hrv_ms?: number;
  lactate_threshold_bpm?: number;
  anaerobic_threshold_bpm?: number;
  recovery_heart_rate_1min?: number;
  heart_rate_zones?: any; // JSONB
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  vo2_max?: number;
  
  // Body Composition & Metabolic
  body_fat_percentage?: number;
  fasting_glucose?: number;
  hba1c?: number;
  metabolic_efficiency_score?: number;
  autonomic_balance_score?: number;
  insulin_sensitivity_score?: number;
  
  // Advanced Physiological Markers
  chronotype?: 'extreme_early' | 'moderate_early' | 'intermediate' | 'moderate_late' | 'extreme_late';
  core_body_temp_pattern?: any; // JSONB
  inflammation_markers?: any; // JSONB
  micronutrient_profile?: any; // JSONB
  hydration_efficiency_ml_per_kg?: number;
  sweat_rate_ml_per_hour?: number;
  thermoregulation_efficiency?: number;
  
  // System Preferences
  preferred_units?: 'imperial' | 'metric';
  timezone?: string;
  
  // Advanced Tracking Protocols
  track_hrv?: boolean;
  track_hrv_variability?: boolean;
  track_sleep?: boolean;
  track_nutrition?: boolean;
  track_hydration?: boolean;
  track_steps?: boolean;
  track_workouts?: boolean;
  track_autonomic_balance?: boolean;
  track_metabolic_flexibility?: boolean;
  track_circadian_rhythm?: boolean;
  track_inflammation_markers?: boolean;
  track_cognitive_performance?: boolean;
}

export interface NotificationSettings {
  id?: string;
  user_id?: string;
  
  // Notification channels
  push_enabled?: boolean;
  email_enabled?: boolean;
  watch_enabled?: boolean;
  
  // Quiet hours
  quiet_hours_start?: string;
  quiet_hours_end?: string;
  
  // Rule preferences
  hydration_reminders?: boolean;
  sedentary_breaks?: boolean;
  post_meal_walks?: boolean;
  hrv_recovery?: boolean;
  protein_targets?: boolean;
  sleep_wind_down?: boolean;
  caffeine_cutoff?: boolean;
  step_gap_alerts?: boolean;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({});
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load user profile and notification settings
  useEffect(() => {
    if (user) {
      loadProfile();
      loadNotificationSettings();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        toast({
          title: "Error loading profile",
          description: "Failed to load your profile data.",
          variant: "destructive"
        });
        return;
      }

      setProfile(data as UserProfile || {});
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadNotificationSettings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('notification_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading notification settings:', error);
        return;
      }

      setNotificationSettings(data || {
        push_enabled: true,
        email_enabled: false,
        watch_enabled: true,
        quiet_hours_start: '22:00',
        quiet_hours_end: '07:00'
      });
    } catch (error) {
      console.error('Error loading notification settings:', error);
    }
  };

  const saveProfile = async (updatedProfile: Partial<UserProfile>) => {
    if (!user) return false;

    // Validate profile data
    const validation = userProfileSchema.safeParse(updatedProfile);
    if (!validation.success) {
      toast({
        title: "Invalid profile data",
        description: validation.error.errors[0].message,
        variant: "destructive"
      });
      return false;
    }

    setSaving(true);
    try {
      const profileData = {
        ...validation.data,
        user_id: user.id
      };

      const { error } = await supabase
        .from('user_profiles')
        .upsert(profileData, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error saving profile:', error);
        toast({
          title: "Error saving profile",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      setProfile(prevProfile => ({ ...prevProfile, ...validation.data }));
      toast({
        title: "Profile saved",
        description: "Your profile has been updated successfully.",
      });
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error saving profile",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveNotificationSettings = async (settings: Partial<NotificationSettings>) => {
    if (!user) return false;

    // Validate notification settings
    const validation = notificationSettingsSchema.safeParse(settings);
    if (!validation.success) {
      toast({
        title: "Invalid settings",
        description: validation.error.errors[0].message,
        variant: "destructive"
      });
      return false;
    }

    setSaving(true);
    try {
      const settingsData = {
        ...validation.data,
        user_id: user.id
      };

      const { error } = await supabase
        .from('notification_settings')
        .upsert(settingsData, { 
          onConflict: 'user_id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error saving notification settings:', error);
        toast({
          title: "Error saving settings",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      setNotificationSettings(prevSettings => ({ ...prevSettings, ...validation.data }));
      toast({
        title: "Settings saved",
        description: "Your notification settings have been updated.",
      });
      return true;
    } catch (error) {
      console.error('Error saving notification settings:', error);
      toast({
        title: "Error saving settings",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    profile,
    notificationSettings,
    loading,
    saving,
    saveProfile,
    saveNotificationSettings,
    setProfile,
    setNotificationSettings
  };
};