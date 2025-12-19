import { z } from 'zod';

// Authentication Schemas
export const authSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
});

// User Profile Schema
export const userProfileSchema = z.object({
  // Personal Identity
  first_name: z.string().trim().max(100, { message: "First name must be less than 100 characters" }).optional(),
  last_name: z.string().trim().max(100, { message: "Last name must be less than 100 characters" }).optional(),
  display_name: z.string().trim().max(100, { message: "Display name must be less than 100 characters" }).optional(),
  
  // Anthropometric Data
  weight_lbs: z.number()
    .min(50, { message: "Weight must be at least 50 lbs" })
    .max(1000, { message: "Weight must be less than 1000 lbs" })
    .optional(),
  height_feet: z.number()
    .min(3, { message: "Height must be at least 3 feet" })
    .max(8, { message: "Height must be less than 8 feet" })
    .optional(),
  height_inches: z.number()
    .min(0, { message: "Inches must be at least 0" })
    .max(11, { message: "Inches must be less than 12" })
    .optional(),
  age: z.number()
    .min(13, { message: "Age must be at least 13" })
    .max(120, { message: "Age must be less than 120" })
    .optional(),
  biological_sex: z.enum(['male', 'female', 'other']).optional(),
  
  // Activity & Lifestyle
  activity_level: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']).optional(),
  exercise_frequency: z.number()
    .min(0, { message: "Exercise frequency cannot be negative" })
    .max(7, { message: "Exercise frequency cannot exceed 7 days per week" })
    .optional(),
  
  // Sleep
  sleep_goal_hours: z.number()
    .min(4, { message: "Sleep goal must be at least 4 hours" })
    .max(12, { message: "Sleep goal must be less than 12 hours" })
    .optional(),
  
  // Nutrition & Hydration
  protein_goal_grams: z.number()
    .min(0, { message: "Protein goal cannot be negative" })
    .max(500, { message: "Protein goal must be less than 500g" })
    .optional(),
  hydration_goal_oz: z.number()
    .min(0, { message: "Hydration goal cannot be negative" })
    .max(300, { message: "Hydration goal must be less than 300 oz" })
    .optional(),
  
  // Cardiovascular Performance Metrics
  resting_heart_rate: z.number()
    .min(30, { message: "Resting heart rate must be at least 30 bpm" })
    .max(200, { message: "Resting heart rate must be less than 200 bpm" })
    .optional(),
  baseline_hrv_ms: z.number()
    .min(0, { message: "HRV cannot be negative" })
    .max(300, { message: "HRV must be less than 300 ms" })
    .optional(),
  blood_pressure_systolic: z.number()
    .min(70, { message: "Systolic BP must be at least 70 mmHg" })
    .max(250, { message: "Systolic BP must be less than 250 mmHg" })
    .optional(),
  blood_pressure_diastolic: z.number()
    .min(40, { message: "Diastolic BP must be at least 40 mmHg" })
    .max(150, { message: "Diastolic BP must be less than 150 mmHg" })
    .optional(),
  vo2_max: z.number()
    .min(10, { message: "VO2 max must be at least 10" })
    .max(100, { message: "VO2 max must be less than 100" })
    .optional(),
  
  // Body Composition & Metabolic
  body_fat_percentage: z.number()
    .min(3, { message: "Body fat percentage must be at least 3%" })
    .max(60, { message: "Body fat percentage must be less than 60%" })
    .optional(),
  fasting_glucose: z.number()
    .min(40, { message: "Fasting glucose must be at least 40 mg/dL" })
    .max(500, { message: "Fasting glucose must be less than 500 mg/dL" })
    .optional(),
  hba1c: z.number()
    .min(3, { message: "HbA1c must be at least 3%" })
    .max(15, { message: "HbA1c must be less than 15%" })
    .optional(),
  
  // System Preferences
  preferred_units: z.enum(['imperial', 'metric']).optional(),
  timezone: z.string().max(100).optional(),
  
  // Persona type
  persona_type: z.enum(['athlete', 'senior', 'desk_worker', 'parent']).optional(),
  stress_level: z.enum(['low', 'moderate', 'high']).optional(),
  caffeine_habit: z.enum(['none', 'morning', 'afternoon', 'evening', 'throughout']).optional(),
  chronotype: z.enum(['extreme_early', 'moderate_early', 'intermediate', 'moderate_late', 'extreme_late']).optional(),
}).partial();

// Health Data Reading Schema
export const healthReadingSchema = z.object({
  metric_id: z.string().uuid({ message: "Invalid metric ID" }),
  value: z.number()
    .finite({ message: "Value must be a valid number" })
    .refine((val) => !isNaN(val), { message: "Value must be a number" }),
  source: z.enum(['manual', 'device', 'lab', 'estimated'], { 
    errorMap: () => ({ message: "Invalid data source" })
  }).default('manual'),
  notes: z.string()
    .max(500, { message: "Notes must be less than 500 characters" })
    .optional(),
});

// Metric-specific validation
export const metricValueSchema = (metricName: string, value: number) => {
  const validations: Record<string, { min: number; max: number; unit: string }> = {
    heart_rate: { min: 30, max: 220, unit: 'bpm' },
    blood_glucose: { min: 40, max: 500, unit: 'mg/dL' },
    steps: { min: 0, max: 100000, unit: 'steps' },
    sleep_hours: { min: 0, max: 24, unit: 'hours' },
    hydration: { min: 0, max: 500, unit: 'oz' },
    weight: { min: 50, max: 1000, unit: 'lbs' },
    body_temperature: { min: 95, max: 106, unit: '°F' },
    blood_pressure_systolic: { min: 70, max: 250, unit: 'mmHg' },
    blood_pressure_diastolic: { min: 40, max: 150, unit: 'mmHg' },
    oxygen_saturation: { min: 70, max: 100, unit: '%' },
  };

  const validation = validations[metricName];
  if (!validation) {
    // Generic validation for unknown metrics
    return z.number().finite().safeParse(value);
  }

  return z.number()
    .min(validation.min, { 
      message: `Value must be at least ${validation.min} ${validation.unit}` 
    })
    .max(validation.max, { 
      message: `Value must be less than ${validation.max} ${validation.unit}` 
    })
    .safeParse(value);
};

// Notification Settings Schema
export const notificationSettingsSchema = z.object({
  push_enabled: z.boolean().optional(),
  email_enabled: z.boolean().optional(),
  watch_enabled: z.boolean().optional(),
  quiet_hours_start: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
      message: "Invalid time format (use HH:MM)" 
    })
    .optional(),
  quiet_hours_end: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { 
      message: "Invalid time format (use HH:MM)" 
    })
    .optional(),
  hydration_reminders: z.boolean().optional(),
  sedentary_breaks: z.boolean().optional(),
  post_meal_walks: z.boolean().optional(),
  hrv_recovery: z.boolean().optional(),
  protein_targets: z.boolean().optional(),
  sleep_wind_down: z.boolean().optional(),
  caffeine_cutoff: z.boolean().optional(),
  step_gap_alerts: z.boolean().optional(),
}).partial();
