import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Activity, Heart, Target, Users, Zap, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingData {
  persona: {
    type: 'athlete' | 'senior' | 'desk_worker' | 'parent' | '';
  };
  personal: {
    firstName: string;
    lastName: string;
    displayName: string;
    age: number;
    biologicalSex: string;
    timezone: string;
  };
  physical: {
    weightLbs: number;
    heightFeet: number;
    heightInches: number;
    activityLevel: string;
    exerciseFrequency: number;
    fitnessGoals: string[];
  };
  health: {
    healthConditions: string[];
    medications: string[];
    stressLevel: string;
    sleepGoalHours: number;
    wakeTime: string;
    bedTime: string;
  };
  tracking: {
    trackHrv: boolean;
    trackSleep: boolean;
    trackNutrition: boolean;
    trackHydration: boolean;
    trackSteps: boolean;
    trackWorkouts: boolean;
  };
  preferences: {
    preferredUnits: string;
    proteinGoalGrams: number;
    hydrationGoalOz: number;
    primaryGoal: string;
  };
}

const initialData: OnboardingData = {
  persona: {
    type: ''
  },
  personal: {
    firstName: '',
    lastName: '',
    displayName: '',
    age: 0,
    biologicalSex: '',
    timezone: 'America/New_York'
  },
  physical: {
    weightLbs: 0,
    heightFeet: 0,
    heightInches: 0,
    activityLevel: '',
    exerciseFrequency: 0,
    fitnessGoals: []
  },
  health: {
    healthConditions: [],
    medications: [],
    stressLevel: '',
    sleepGoalHours: 8,
    wakeTime: '07:00',
    bedTime: '23:00'
  },
  tracking: {
    trackHrv: true,
    trackSleep: true,
    trackNutrition: true,
    trackHydration: true,
    trackSteps: true,
    trackWorkouts: true
  },
  preferences: {
    preferredUnits: 'imperial',
    proteinGoalGrams: 0,
    hydrationGoalOz: 64,
    primaryGoal: ''
  }
};

const fitnessGoalOptions = [
  'Weight Loss', 'Muscle Gain', 'Endurance', 'Strength', 'General Health', 
  'Athletic Performance', 'Recovery', 'Longevity', 'Stress Management'
];

const healthConditionOptions = [
  'Diabetes', 'Hypertension', 'Heart Disease', 'Anxiety', 'Depression',
  'Sleep Apnea', 'Thyroid Issues', 'Arthritis', 'Asthma', 'ADHD'
];

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip?: () => void;
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { saveProfile } = useUserProfile();

  const totalSteps = 6;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateData = (section: keyof OnboardingData, updates: any) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  const addToArray = (section: keyof OnboardingData, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section][field] as string[]), value]
      }
    }));
  };

  const removeFromArray = (section: keyof OnboardingData, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev[section][field] as string[]).filter(item => item !== value)
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Transform onboarding data to user profile format
      const profileData = {
        ...(data.persona.type && { persona_type: data.persona.type }),
        first_name: data.personal.firstName,
        last_name: data.personal.lastName,
        display_name: data.personal.displayName || data.personal.firstName,
        age: data.personal.age,
        biological_sex: data.personal.biologicalSex as 'male' | 'female' | 'other',
        timezone: data.personal.timezone,
        weight_lbs: data.physical.weightLbs,
        height_feet: data.physical.heightFeet,
        height_inches: data.physical.heightInches,
        activity_level: data.physical.activityLevel as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
        exercise_frequency: data.physical.exerciseFrequency,
        fitness_goals: data.physical.fitnessGoals,
        health_conditions: data.health.healthConditions,
        medications: data.health.medications,
        stress_level: data.health.stressLevel as 'low' | 'moderate' | 'high',
        sleep_goal_hours: data.health.sleepGoalHours,
        wake_time: data.health.wakeTime,
        bed_time: data.health.bedTime,
        track_hrv: data.tracking.trackHrv,
        track_sleep: data.tracking.trackSleep,
        track_nutrition: data.tracking.trackNutrition,
        track_hydration: data.tracking.trackHydration,
        track_steps: data.tracking.trackSteps,
        track_workouts: data.tracking.trackWorkouts,
        preferred_units: data.preferences.preferredUnits as 'imperial' | 'metric',
        protein_goal_grams: data.preferences.proteinGoalGrams,
        hydration_goal_oz: data.preferences.hydrationGoalOz
      };

      await saveProfile(profileData);
      onComplete(data);
      
      toast({
        title: "Welcome to BioPrecision!",
        description: "Your health profile has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error saving profile",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonaSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="p-4 rounded-full bg-primary/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Target className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-semibold mb-2">Choose Your Profile</h2>
        <p className="text-muted-foreground">Select the category that best describes you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          onClick={() => updateData('persona', { type: 'athlete' })}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            data.persona.type === 'athlete'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="text-4xl mb-3">🏃‍♂️</div>
          <h3 className="text-xl font-semibold mb-2">Athlete</h3>
          <p className="text-sm text-muted-foreground">
            Optimized for performance tracking, recovery metrics, and training optimization
          </p>
        </div>

        <div
          onClick={() => updateData('persona', { type: 'senior' })}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            data.persona.type === 'senior'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="text-4xl mb-3">👵</div>
          <h3 className="text-xl font-semibold mb-2">Senior / Elder Care</h3>
          <p className="text-sm text-muted-foreground">
            Focus on medication tracking, vitals monitoring, and wellness maintenance
          </p>
        </div>

        <div
          onClick={() => updateData('persona', { type: 'desk_worker' })}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            data.persona.type === 'desk_worker'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="text-4xl mb-3">💼</div>
          <h3 className="text-xl font-semibold mb-2">Desk Worker</h3>
          <p className="text-sm text-muted-foreground">
            Sedentary alerts, posture tracking, and movement reminders for office workers
          </p>
        </div>

        <div
          onClick={() => updateData('persona', { type: 'parent' })}
          className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
            data.persona.type === 'parent'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
          <h3 className="text-xl font-semibold mb-2">Busy Parent</h3>
          <p className="text-sm text-muted-foreground">
            Stress management, energy optimization, and health maintenance for parents
          </p>
        </div>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="p-4 rounded-full bg-primary/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Users className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-semibold mb-2">Let's get to know you</h2>
        <p className="text-muted-foreground">Tell us a bit about yourself to personalize your experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>First Name</Label>
          <Input
            value={data.personal.firstName}
            onChange={(e) => updateData('personal', { firstName: e.target.value })}
            placeholder="John"
          />
        </div>

        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input
            value={data.personal.lastName}
            onChange={(e) => updateData('personal', { lastName: e.target.value })}
            placeholder="Smith"
          />
        </div>

        <div className="space-y-2">
          <Label>Preferred Name (Optional)</Label>
          <Input
            value={data.personal.displayName}
            onChange={(e) => updateData('personal', { displayName: e.target.value })}
            placeholder="What should we call you?"
          />
        </div>

        <div className="space-y-2">
          <Label>Age</Label>
          <Input
            type="number"
            value={data.personal.age || ''}
            onChange={(e) => updateData('personal', { age: parseInt(e.target.value) || 0 })}
            placeholder="30"
          />
        </div>

        <div className="space-y-2">
          <Label>Biological Sex</Label>
          <Select value={data.personal.biologicalSex} onValueChange={(value) => updateData('personal', { biologicalSex: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Timezone</Label>
          <Select value={data.personal.timezone} onValueChange={(value) => updateData('personal', { timezone: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="America/New_York">Eastern Time</SelectItem>
              <SelectItem value="America/Chicago">Central Time</SelectItem>
              <SelectItem value="America/Denver">Mountain Time</SelectItem>
              <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderPhysicalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="p-4 rounded-full bg-primary/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Activity className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-semibold mb-2">Physical Profile</h2>
        <p className="text-muted-foreground">Help us understand your body metrics and fitness level</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Weight (lbs)</Label>
          <Input
            type="number"
            value={data.physical.weightLbs || ''}
            onChange={(e) => updateData('physical', { weightLbs: parseFloat(e.target.value) || 0 })}
            placeholder="150"
          />
        </div>

        <div className="space-y-2">
          <Label>Activity Level</Label>
          <Select value={data.physical.activityLevel} onValueChange={(value) => updateData('physical', { activityLevel: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (Desk job, minimal exercise)</SelectItem>
              <SelectItem value="light">Lightly Active (Light exercise 1-3 days/week)</SelectItem>
              <SelectItem value="moderate">Moderately Active (Moderate exercise 3-5 days/week)</SelectItem>
              <SelectItem value="active">Very Active (Hard exercise 6-7 days/week)</SelectItem>
              <SelectItem value="very_active">Extremely Active (Physical job + exercise)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Height (feet)</Label>
          <Input
            type="number"
            value={data.physical.heightFeet || ''}
            onChange={(e) => updateData('physical', { heightFeet: parseInt(e.target.value) || 0 })}
            placeholder="5"
          />
        </div>

        <div className="space-y-2">
          <Label>Height (inches)</Label>
          <Input
            type="number"
            value={data.physical.heightInches || ''}
            onChange={(e) => updateData('physical', { heightInches: parseInt(e.target.value) || 0 })}
            placeholder="8"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Exercise Frequency (sessions per week)</Label>
          <Input
            type="number"
            value={data.physical.exerciseFrequency || ''}
            onChange={(e) => updateData('physical', { exerciseFrequency: parseInt(e.target.value) || 0 })}
            placeholder="3"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Fitness Goals (Select all that apply)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {fitnessGoalOptions.map((goal) => (
            <div
              key={goal}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                data.physical.fitnessGoals.includes(goal)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => 
                data.physical.fitnessGoals.includes(goal)
                  ? removeFromArray('physical', 'fitnessGoals', goal)
                  : addToArray('physical', 'fitnessGoals', goal)
              }
            >
              <span className="text-sm font-medium">{goal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHealthInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="p-4 rounded-full bg-primary/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Heart className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-semibold mb-2">Health Information</h2>
        <p className="text-muted-foreground">Help us understand your health status and sleep patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Stress Level</Label>
          <Select value={data.health.stressLevel} onValueChange={(value) => updateData('health', { stressLevel: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low Stress</SelectItem>
              <SelectItem value="moderate">Moderate Stress</SelectItem>
              <SelectItem value="high">High Stress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Sleep Goal (hours)</Label>
          <Input
            type="number"
            step="0.5"
            value={data.health.sleepGoalHours || ''}
            onChange={(e) => updateData('health', { sleepGoalHours: parseFloat(e.target.value) || 8 })}
            placeholder="8"
          />
        </div>

        <div className="space-y-2">
          <Label>Typical Wake Time</Label>
          <Input
            type="time"
            value={data.health.wakeTime}
            onChange={(e) => updateData('health', { wakeTime: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Typical Bedtime</Label>
          <Input
            type="time"
            value={data.health.bedTime}
            onChange={(e) => updateData('health', { bedTime: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Health Conditions (Optional)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {healthConditionOptions.map((condition) => (
            <div
              key={condition}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                data.health.healthConditions.includes(condition)
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => 
                data.health.healthConditions.includes(condition)
                  ? removeFromArray('health', 'healthConditions', condition)
                  : addToArray('health', 'healthConditions', condition)
              }
            >
              <span className="text-sm font-medium">{condition}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrackingPreferences = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="p-4 rounded-full bg-primary/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Target className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-semibold mb-2">What to Track</h2>
        <p className="text-muted-foreground">Choose which health metrics you'd like to monitor</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(data.tracking).map(([key, enabled]) => {
          const labels = {
            trackHrv: 'Heart Rate Variability',
            trackSleep: 'Sleep Quality',
            trackNutrition: 'Nutrition & Diet',
            trackHydration: 'Water Intake',
            trackSteps: 'Daily Steps',
            trackWorkouts: 'Exercise & Workouts'
          };
          
          return (
            <div key={key} className="flex items-center space-x-3 p-4 rounded-lg border">
              <Checkbox
                checked={enabled}
                onCheckedChange={(checked) => updateData('tracking', { [key]: checked })}
              />
              <Label className="flex-1 cursor-pointer">
                {labels[key as keyof typeof labels]}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="p-4 rounded-full bg-primary/10 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-semibold mb-2">Final Settings</h2>
        <p className="text-muted-foreground">Set your goals and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Preferred Units</Label>
          <Select value={data.preferences.preferredUnits} onValueChange={(value) => updateData('preferences', { preferredUnits: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="imperial">Imperial (lbs, ft, °F)</SelectItem>
              <SelectItem value="metric">Metric (kg, cm, °C)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Daily Hydration Goal (oz)</Label>
          <Input
            type="number"
            value={data.preferences.hydrationGoalOz || ''}
            onChange={(e) => updateData('preferences', { hydrationGoalOz: parseInt(e.target.value) || 64 })}
            placeholder="64"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Primary Health Goal</Label>
          <Select value={data.preferences.primaryGoal} onValueChange={(value) => updateData('preferences', { primaryGoal: value })}>
            <SelectTrigger>
              <SelectValue placeholder="What's your main focus?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weight_loss">Weight Loss</SelectItem>
              <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
              <SelectItem value="endurance">Improve Endurance</SelectItem>
              <SelectItem value="strength">Build Strength</SelectItem>
              <SelectItem value="general_health">General Health</SelectItem>
              <SelectItem value="performance">Athletic Performance</SelectItem>
              <SelectItem value="recovery">Recovery & Sleep</SelectItem>
              <SelectItem value="longevity">Longevity & Wellness</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const steps = [
    renderPersonaSelection,
    renderPersonalInfo,
    renderPhysicalInfo,
    renderHealthInfo,
    renderTrackingPreferences,
    renderPreferences
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.persona.type !== '';
      case 1: return data.personal.firstName && data.personal.lastName && data.personal.age && data.personal.biologicalSex;
      case 2: return data.physical.weightLbs && data.physical.activityLevel && data.physical.heightFeet;
      case 3: return data.health.stressLevel && data.health.sleepGoalHours;
      case 4: return Object.values(data.tracking).some(Boolean);
      case 5: return data.preferences.preferredUnits && data.preferences.primaryGoal;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background gradient-hero">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep + 1} of {totalSteps}</span>
            <Button variant="ghost" size="sm" onClick={onSkip}>
              Skip Setup
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Content */}
        <Card className="p-8 gradient-card">
          {steps[currentStep]()}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep === totalSteps - 1 ? (
              <Button
                onClick={handleComplete}
                disabled={!canProceed() || isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? 'Creating Profile...' : 'Complete Setup'}
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-primary hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}