export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_type: string
          description: string
          earned_at: string
          icon: string | null
          id: string
          metadata: Json | null
          title: string
          user_id: string
        }
        Insert: {
          achievement_type: string
          description: string
          earned_at?: string
          icon?: string | null
          id?: string
          metadata?: Json | null
          title: string
          user_id: string
        }
        Update: {
          achievement_type?: string
          description?: string
          earned_at?: string
          icon?: string | null
          id?: string
          metadata?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      action_items: {
        Row: {
          action_text: string
          category: string
          completed_at: string | null
          created_at: string
          estimated_time_minutes: number | null
          expires_at: string | null
          id: string
          is_completed: boolean | null
          reason: string
          scheduled_for: string | null
          urgency: string
          user_id: string
        }
        Insert: {
          action_text: string
          category: string
          completed_at?: string | null
          created_at?: string
          estimated_time_minutes?: number | null
          expires_at?: string | null
          id?: string
          is_completed?: boolean | null
          reason: string
          scheduled_for?: string | null
          urgency?: string
          user_id: string
        }
        Update: {
          action_text?: string
          category?: string
          completed_at?: string | null
          created_at?: string
          estimated_time_minutes?: number | null
          expires_at?: string | null
          id?: string
          is_completed?: boolean | null
          reason?: string
          scheduled_for?: string | null
          urgency?: string
          user_id?: string
        }
        Relationships: []
      }
      adherence_events: {
        Row: {
          created_at: string
          duration_min: number | null
          id: string
          notes: string | null
          plan_id: string | null
          rpe: number | null
          status: string
          task_id: string
          ts: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_min?: number | null
          id?: string
          notes?: string | null
          plan_id?: string | null
          rpe?: number | null
          status: string
          task_id: string
          ts?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration_min?: number | null
          id?: string
          notes?: string | null
          plan_id?: string | null
          rpe?: number | null
          status?: string
          task_id?: string
          ts?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "adherence_events_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      adherence_events_new: {
        Row: {
          created_at: string
          duration_min: number | null
          id: string
          notes: string | null
          plan_id: string | null
          rpe: number | null
          status: string
          task_id: string
          ts: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration_min?: number | null
          id?: string
          notes?: string | null
          plan_id?: string | null
          rpe?: number | null
          status: string
          task_id: string
          ts?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration_min?: number | null
          id?: string
          notes?: string | null
          plan_id?: string | null
          rpe?: number | null
          status?: string
          task_id?: string
          ts?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "adherence_events_new_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      alerts: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          raised_at: string
          reason_json: Json
          resolved_at: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          id?: string
          raised_at?: string
          reason_json: Json
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          raised_at?: string
          reason_json?: Json
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          user_id?: string
        }
        Relationships: []
      }
      alerts_new: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          raised_at: string
          reason_json: Json
          resolved_at: string | null
          severity: Database["public"]["Enums"]["alert_severity"]
          user_id: string
        }
        Insert: {
          alert_type: string
          created_at?: string
          id?: string
          raised_at?: string
          reason_json: Json
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          user_id: string
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          raised_at?: string
          reason_json?: Json
          resolved_at?: string | null
          severity?: Database["public"]["Enums"]["alert_severity"]
          user_id?: string
        }
        Relationships: []
      }
      assessments: {
        Row: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          created_at: string
          id: string
          payload_json: Json
          performed_at: string
          user_id: string
        }
        Insert: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          created_at?: string
          id?: string
          payload_json: Json
          performed_at: string
          user_id: string
        }
        Update: {
          assessment_type?: Database["public"]["Enums"]["assessment_type"]
          created_at?: string
          id?: string
          payload_json?: Json
          performed_at?: string
          user_id?: string
        }
        Relationships: []
      }
      assessments_new: {
        Row: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          created_at: string
          id: string
          payload_json: Json
          performed_at: string
          user_id: string
        }
        Insert: {
          assessment_type: Database["public"]["Enums"]["assessment_type"]
          created_at?: string
          id?: string
          payload_json: Json
          performed_at: string
          user_id: string
        }
        Update: {
          assessment_type?: Database["public"]["Enums"]["assessment_type"]
          created_at?: string
          id?: string
          payload_json?: Json
          performed_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          diff_json: Json | null
          entity_id: string | null
          entity_type: string
          id: string
          ip: unknown
          ts: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          diff_json?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip?: unknown
          ts?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          diff_json?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip?: unknown
          ts?: string
        }
        Relationships: []
      }
      bioguide_scores: {
        Row: {
          biomarker_score: number | null
          calculation_metadata: Json | null
          created_at: string
          date: string
          exercise_score: number | null
          glucose_score: number | null
          id: string
          nutrition_score: number | null
          sleep_score: number | null
          total_score: number
          user_id: string
          weekly_change: number | null
        }
        Insert: {
          biomarker_score?: number | null
          calculation_metadata?: Json | null
          created_at?: string
          date: string
          exercise_score?: number | null
          glucose_score?: number | null
          id?: string
          nutrition_score?: number | null
          sleep_score?: number | null
          total_score: number
          user_id: string
          weekly_change?: number | null
        }
        Update: {
          biomarker_score?: number | null
          calculation_metadata?: Json | null
          created_at?: string
          date?: string
          exercise_score?: number | null
          glucose_score?: number | null
          id?: string
          nutrition_score?: number | null
          sleep_score?: number | null
          total_score?: number
          user_id?: string
          weekly_change?: number | null
        }
        Relationships: []
      }
      bridge_scores: {
        Row: {
          adherence: number | null
          calculation_metadata: Json | null
          cardiovascular_adaptation: number | null
          created_at: string
          date: string
          id: string
          metabolic_control: number | null
          recovery_capacity: number | null
          total_score: number
          user_id: string
          weekly_progress: number | null
        }
        Insert: {
          adherence?: number | null
          calculation_metadata?: Json | null
          cardiovascular_adaptation?: number | null
          created_at?: string
          date: string
          id?: string
          metabolic_control?: number | null
          recovery_capacity?: number | null
          total_score: number
          user_id: string
          weekly_progress?: number | null
        }
        Update: {
          adherence?: number | null
          calculation_metadata?: Json | null
          cardiovascular_adaptation?: number | null
          created_at?: string
          date?: string
          id?: string
          metabolic_control?: number | null
          recovery_capacity?: number | null
          total_score?: number
          user_id?: string
          weekly_progress?: number | null
        }
        Relationships: []
      }
      coach_notes: {
        Row: {
          coach_id: string
          created_at: string
          id: string
          note: string
          ts: string
          user_id: string
        }
        Insert: {
          coach_id: string
          created_at?: string
          id?: string
          note: string
          ts?: string
          user_id: string
        }
        Update: {
          coach_id?: string
          created_at?: string
          id?: string
          note?: string
          ts?: string
          user_id?: string
        }
        Relationships: []
      }
      connected_devices: {
        Row: {
          created_at: string
          device_name: string
          device_type: string
          id: string
          last_sync: string | null
          settings: Json | null
          sync_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          device_name: string
          device_type: string
          id?: string
          last_sync?: string | null
          settings?: Json | null
          sync_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          device_name?: string
          device_type?: string
          id?: string
          last_sync?: string | null
          settings?: Json | null
          sync_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_readiness: {
        Row: {
          created_at: string
          date: string
          factors_json: Json | null
          id: string
          readiness_score: number
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          factors_json?: Json | null
          id?: string
          readiness_score: number
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          factors_json?: Json | null
          id?: string
          readiness_score?: number
          user_id?: string
        }
        Relationships: []
      }
      devices: {
        Row: {
          access_token_hash: string | null
          connected_at: string
          id: string
          last_sync: string | null
          refresh_token_hash: string | null
          scopes: string[] | null
          settings: Json | null
          source: string
          user_id: string
        }
        Insert: {
          access_token_hash?: string | null
          connected_at?: string
          id?: string
          last_sync?: string | null
          refresh_token_hash?: string | null
          scopes?: string[] | null
          settings?: Json | null
          source: string
          user_id: string
        }
        Update: {
          access_token_hash?: string | null
          connected_at?: string
          id?: string
          last_sync?: string | null
          refresh_token_hash?: string | null
          scopes?: string[] | null
          settings?: Json | null
          source?: string
          user_id?: string
        }
        Relationships: []
      }
      enterprise_members: {
        Row: {
          enterprise_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          enterprise_id: string
          id?: string
          joined_at?: string
          role: string
          user_id: string
        }
        Update: {
          enterprise_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enterprise_members_enterprise_id_fkey"
            columns: ["enterprise_id"]
            isOneToOne: false
            referencedRelation: "enterprises"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprises: {
        Row: {
          contact_email: string
          contract_terms_json: Json | null
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          contact_email: string
          contract_terms_json?: Json | null
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          contact_email?: string
          contract_terms_json?: Json | null
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      goals: {
        Row: {
          completed_at: string | null
          created_at: string
          current_value: number | null
          description: string | null
          goal_type: string
          id: string
          start_date: string
          status: string
          target_date: string | null
          target_value: number
          title: string
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_value?: number | null
          description?: string | null
          goal_type: string
          id?: string
          start_date?: string
          status?: string
          target_date?: string | null
          target_value: number
          title: string
          unit: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_value?: number | null
          description?: string | null
          goal_type?: string
          id?: string
          start_date?: string
          status?: string
          target_date?: string | null
          target_value?: number
          title?: string
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      insights: {
        Row: {
          category: string
          created_at: string
          data_source: Json | null
          description: string
          expires_at: string | null
          id: string
          insight_type: string
          is_dismissed: boolean | null
          is_read: boolean | null
          priority: string
          title: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          data_source?: Json | null
          description: string
          expires_at?: string | null
          id?: string
          insight_type: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          priority?: string
          title: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          data_source?: Json | null
          description?: string
          expires_at?: string | null
          id?: string
          insight_type?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          priority?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      labs_orders: {
        Row: {
          created_at: string
          id: string
          ordered_at: string
          panel_code: string
          status: string
          user_id: string
          vendor: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ordered_at?: string
          panel_code: string
          status?: string
          user_id: string
          vendor?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ordered_at?: string
          panel_code?: string
          status?: string
          user_id?: string
          vendor?: string | null
        }
        Relationships: []
      }
      labs_results: {
        Row: {
          analyte: string
          collected_at: string
          created_at: string
          id: string
          loinc: string | null
          order_id: string
          ref_high: number | null
          ref_low: number | null
          unit: string | null
          value: number | null
        }
        Insert: {
          analyte: string
          collected_at: string
          created_at?: string
          id?: string
          loinc?: string | null
          order_id: string
          ref_high?: number | null
          ref_low?: number | null
          unit?: string | null
          value?: number | null
        }
        Update: {
          analyte?: string
          collected_at?: string
          created_at?: string
          id?: string
          loinc?: string | null
          order_id?: string
          ref_high?: number | null
          ref_low?: number | null
          unit?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "labs_results_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "labs_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics: {
        Row: {
          category: string
          created_at: string
          display_name: string
          id: string
          name: string
          normal_range_max: number | null
          normal_range_min: number | null
          unit: string
        }
        Insert: {
          category: string
          created_at?: string
          display_name: string
          id?: string
          name: string
          normal_range_max?: number | null
          normal_range_min?: number | null
          unit: string
        }
        Update: {
          category?: string
          created_at?: string
          display_name?: string
          id?: string
          name?: string
          normal_range_max?: number | null
          normal_range_min?: number | null
          unit?: string
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          caffeine_cutoff: boolean | null
          created_at: string
          email_enabled: boolean | null
          hrv_recovery: boolean | null
          hydration_reminders: boolean | null
          id: string
          post_meal_walks: boolean | null
          protein_targets: boolean | null
          push_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          sedentary_breaks: boolean | null
          sleep_wind_down: boolean | null
          step_gap_alerts: boolean | null
          updated_at: string
          user_id: string
          watch_enabled: boolean | null
        }
        Insert: {
          caffeine_cutoff?: boolean | null
          created_at?: string
          email_enabled?: boolean | null
          hrv_recovery?: boolean | null
          hydration_reminders?: boolean | null
          id?: string
          post_meal_walks?: boolean | null
          protein_targets?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          sedentary_breaks?: boolean | null
          sleep_wind_down?: boolean | null
          step_gap_alerts?: boolean | null
          updated_at?: string
          user_id: string
          watch_enabled?: boolean | null
        }
        Update: {
          caffeine_cutoff?: boolean | null
          created_at?: string
          email_enabled?: boolean | null
          hrv_recovery?: boolean | null
          hydration_reminders?: boolean | null
          id?: string
          post_meal_walks?: boolean | null
          protein_targets?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          sedentary_breaks?: boolean | null
          sleep_wind_down?: boolean | null
          step_gap_alerts?: boolean | null
          updated_at?: string
          user_id?: string
          watch_enabled?: boolean | null
        }
        Relationships: []
      }
      nudges: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_dismissed: boolean | null
          is_read: boolean | null
          message: string
          nudge_type: string
          priority: string
          trigger_data: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message: string
          nudge_type: string
          priority?: string
          trigger_data?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_dismissed?: boolean | null
          is_read?: boolean | null
          message?: string
          nudge_type?: string
          priority?: string
          trigger_data?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          id: string
          interval: string | null
          provider: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          id?: string
          interval?: string | null
          provider?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          id?: string
          interval?: string | null
          provider?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      payments_new: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          id: string
          interval: string | null
          provider: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          id?: string
          interval?: string | null
          provider?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          id?: string
          interval?: string | null
          provider?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string
          generated_by_model: string | null
          id: string
          plan_json: Json
          updated_at: string
          user_id: string
          version: number | null
          week_start: string
        }
        Insert: {
          created_at?: string
          generated_by_model?: string | null
          id?: string
          plan_json: Json
          updated_at?: string
          user_id: string
          version?: number | null
          week_start: string
        }
        Update: {
          created_at?: string
          generated_by_model?: string | null
          id?: string
          plan_json?: Json
          updated_at?: string
          user_id?: string
          version?: number | null
          week_start?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          dob: string | null
          email: string | null
          height_cm: number | null
          id: string
          name: string | null
          persona_type: string | null
          prefs_json: Json | null
          sex_at_birth: string | null
          timezone: string | null
          updated_at: string
          user_id: string
          weight_kg: number | null
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          dob?: string | null
          email?: string | null
          height_cm?: number | null
          id?: string
          name?: string | null
          persona_type?: string | null
          prefs_json?: Json | null
          sex_at_birth?: string | null
          timezone?: string | null
          updated_at?: string
          user_id: string
          weight_kg?: number | null
        }
        Update: {
          created_at?: string
          display_name?: string | null
          dob?: string | null
          email?: string | null
          height_cm?: number | null
          id?: string
          name?: string | null
          persona_type?: string | null
          prefs_json?: Json | null
          sex_at_birth?: string | null
          timezone?: string | null
          updated_at?: string
          user_id?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      readings: {
        Row: {
          created_at: string
          id: string
          metric_id: string
          recorded_at: string
          source: string | null
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          metric_id: string
          recorded_at?: string
          source?: string | null
          user_id: string
          value: number
        }
        Update: {
          created_at?: string
          id?: string
          metric_id?: string
          recorded_at?: string
          source?: string | null
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "readings_metric_id_fkey"
            columns: ["metric_id"]
            isOneToOne: false
            referencedRelation: "metrics"
            referencedColumns: ["id"]
          },
        ]
      }
      timeseries: {
        Row: {
          context_json: Json | null
          created_at: string
          id: string
          ingestion_id: string | null
          metric: string
          source: string
          ts: string
          unit: string | null
          user_id: string
          value_num: number | null
          value_txt: string | null
        }
        Insert: {
          context_json?: Json | null
          created_at?: string
          id?: string
          ingestion_id?: string | null
          metric: string
          source: string
          ts: string
          unit?: string | null
          user_id: string
          value_num?: number | null
          value_txt?: string | null
        }
        Update: {
          context_json?: Json | null
          created_at?: string
          id?: string
          ingestion_id?: string | null
          metric?: string
          source?: string
          ts?: string
          unit?: string | null
          user_id?: string
          value_num?: number | null
          value_txt?: string | null
        }
        Relationships: []
      }
      trajectory_snapshots: {
        Row: {
          created_at: string
          glucose_trend: string | null
          hrv_trend: string | null
          id: string
          sleep_trend: string | null
          snapshot_date: string
          trend_data: Json
          user_id: string
          vo2max_trend: string | null
        }
        Insert: {
          created_at?: string
          glucose_trend?: string | null
          hrv_trend?: string | null
          id?: string
          sleep_trend?: string | null
          snapshot_date: string
          trend_data?: Json
          user_id: string
          vo2max_trend?: string | null
        }
        Update: {
          created_at?: string
          glucose_trend?: string | null
          hrv_trend?: string | null
          id?: string
          sleep_trend?: string | null
          snapshot_date?: string
          trend_data?: Json
          user_id?: string
          vo2max_trend?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          activity_level: string | null
          age: number | null
          anaerobic_threshold_bpm: number | null
          autonomic_balance_score: number | null
          baseline_hrv_ms: number | null
          bed_time: string | null
          biological_sex: string | null
          blood_pressure_diastolic: number | null
          blood_pressure_systolic: number | null
          body_fat_percentage: number | null
          caffeine_habit: string | null
          chronotype: string | null
          core_body_temp_pattern: Json | null
          created_at: string
          display_name: string | null
          exercise_frequency: number | null
          exercise_types: string[] | null
          fasting_glucose: number | null
          first_name: string | null
          fitness_goals: string[] | null
          hba1c: number | null
          health_conditions: string[] | null
          heart_rate_zones: Json | null
          height_feet: number | null
          height_inches: number | null
          hydration_efficiency_ml_per_kg: number | null
          hydration_goal_oz: number | null
          id: string
          inflammation_markers: Json | null
          insulin_sensitivity_score: number | null
          lactate_threshold_bpm: number | null
          last_name: string | null
          medications: string[] | null
          metabolic_efficiency_score: number | null
          micronutrient_profile: Json | null
          preferred_units: string | null
          protein_goal_grams: number | null
          recovery_heart_rate_1min: number | null
          resting_heart_rate: number | null
          sleep_goal_hours: number | null
          stress_level: string | null
          sweat_rate_ml_per_hour: number | null
          thermoregulation_efficiency: number | null
          timezone: string | null
          track_autonomic_balance: boolean | null
          track_circadian_rhythm: boolean | null
          track_cognitive_performance: boolean | null
          track_hrv: boolean | null
          track_hrv_variability: boolean | null
          track_hydration: boolean | null
          track_inflammation_markers: boolean | null
          track_metabolic_flexibility: boolean | null
          track_nutrition: boolean | null
          track_sleep: boolean | null
          track_steps: boolean | null
          track_workouts: boolean | null
          updated_at: string
          user_id: string
          vo2_max: number | null
          wake_time: string | null
          weight_lbs: number | null
        }
        Insert: {
          activity_level?: string | null
          age?: number | null
          anaerobic_threshold_bpm?: number | null
          autonomic_balance_score?: number | null
          baseline_hrv_ms?: number | null
          bed_time?: string | null
          biological_sex?: string | null
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          body_fat_percentage?: number | null
          caffeine_habit?: string | null
          chronotype?: string | null
          core_body_temp_pattern?: Json | null
          created_at?: string
          display_name?: string | null
          exercise_frequency?: number | null
          exercise_types?: string[] | null
          fasting_glucose?: number | null
          first_name?: string | null
          fitness_goals?: string[] | null
          hba1c?: number | null
          health_conditions?: string[] | null
          heart_rate_zones?: Json | null
          height_feet?: number | null
          height_inches?: number | null
          hydration_efficiency_ml_per_kg?: number | null
          hydration_goal_oz?: number | null
          id?: string
          inflammation_markers?: Json | null
          insulin_sensitivity_score?: number | null
          lactate_threshold_bpm?: number | null
          last_name?: string | null
          medications?: string[] | null
          metabolic_efficiency_score?: number | null
          micronutrient_profile?: Json | null
          preferred_units?: string | null
          protein_goal_grams?: number | null
          recovery_heart_rate_1min?: number | null
          resting_heart_rate?: number | null
          sleep_goal_hours?: number | null
          stress_level?: string | null
          sweat_rate_ml_per_hour?: number | null
          thermoregulation_efficiency?: number | null
          timezone?: string | null
          track_autonomic_balance?: boolean | null
          track_circadian_rhythm?: boolean | null
          track_cognitive_performance?: boolean | null
          track_hrv?: boolean | null
          track_hrv_variability?: boolean | null
          track_hydration?: boolean | null
          track_inflammation_markers?: boolean | null
          track_metabolic_flexibility?: boolean | null
          track_nutrition?: boolean | null
          track_sleep?: boolean | null
          track_steps?: boolean | null
          track_workouts?: boolean | null
          updated_at?: string
          user_id: string
          vo2_max?: number | null
          wake_time?: string | null
          weight_lbs?: number | null
        }
        Update: {
          activity_level?: string | null
          age?: number | null
          anaerobic_threshold_bpm?: number | null
          autonomic_balance_score?: number | null
          baseline_hrv_ms?: number | null
          bed_time?: string | null
          biological_sex?: string | null
          blood_pressure_diastolic?: number | null
          blood_pressure_systolic?: number | null
          body_fat_percentage?: number | null
          caffeine_habit?: string | null
          chronotype?: string | null
          core_body_temp_pattern?: Json | null
          created_at?: string
          display_name?: string | null
          exercise_frequency?: number | null
          exercise_types?: string[] | null
          fasting_glucose?: number | null
          first_name?: string | null
          fitness_goals?: string[] | null
          hba1c?: number | null
          health_conditions?: string[] | null
          heart_rate_zones?: Json | null
          height_feet?: number | null
          height_inches?: number | null
          hydration_efficiency_ml_per_kg?: number | null
          hydration_goal_oz?: number | null
          id?: string
          inflammation_markers?: Json | null
          insulin_sensitivity_score?: number | null
          lactate_threshold_bpm?: number | null
          last_name?: string | null
          medications?: string[] | null
          metabolic_efficiency_score?: number | null
          micronutrient_profile?: Json | null
          preferred_units?: string | null
          protein_goal_grams?: number | null
          recovery_heart_rate_1min?: number | null
          resting_heart_rate?: number | null
          sleep_goal_hours?: number | null
          stress_level?: string | null
          sweat_rate_ml_per_hour?: number | null
          thermoregulation_efficiency?: number | null
          timezone?: string | null
          track_autonomic_balance?: boolean | null
          track_circadian_rhythm?: boolean | null
          track_cognitive_performance?: boolean | null
          track_hrv?: boolean | null
          track_hrv_variability?: boolean | null
          track_hydration?: boolean | null
          track_inflammation_markers?: boolean | null
          track_metabolic_flexibility?: boolean | null
          track_nutrition?: boolean | null
          track_sleep?: boolean | null
          track_steps?: boolean | null
          track_workouts?: boolean | null
          updated_at?: string
          user_id?: string
          vo2_max?: number | null
          wake_time?: string | null
          weight_lbs?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string | null
        }
        Relationships: []
      }
      weekly_plans: {
        Row: {
          created_at: string
          id: string
          priorities: Json
          status: string
          summary: string | null
          updated_at: string
          user_id: string
          week_end: string
          week_start: string
        }
        Insert: {
          created_at?: string
          id?: string
          priorities?: Json
          status?: string
          summary?: string | null
          updated_at?: string
          user_id: string
          week_end: string
          week_start: string
        }
        Update: {
          created_at?: string
          id?: string
          priorities?: Json
          status?: string
          summary?: string | null
          updated_at?: string
          user_id?: string
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_enterprise_admin: {
        Args: { _enterprise_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      alert_severity: "low" | "medium" | "high" | "critical"
      app_role: "member" | "coach" | "clinical" | "admin" | "enterprise_admin"
      assessment_type:
        | "vo2max"
        | "endopat"
        | "dexa"
        | "movement_screen"
        | "rmssd"
      user_status: "active" | "inactive" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["low", "medium", "high", "critical"],
      app_role: ["member", "coach", "clinical", "admin", "enterprise_admin"],
      assessment_type: [
        "vo2max",
        "endopat",
        "dexa",
        "movement_screen",
        "rmssd",
      ],
      user_status: ["active", "inactive", "suspended"],
    },
  },
} as const
