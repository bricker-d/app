import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Bell, Smartphone, Shield, Target, Users, Link as LinkIcon, Heart, Scale, Utensils, Moon, Zap } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfile, UserProfile } from "@/hooks/useUserProfile";

const Settings = () => {
  const { user, loading: authLoading } = useAuth();
  const { 
    profile, 
    notificationSettings, 
    loading, 
    saving, 
    saveProfile, 
    saveNotificationSettings,
    setProfile,
    setNotificationSettings 
  } = useUserProfile();

  // Redirect if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-8 w-8 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  const handleProfileSave = async () => {
    await saveProfile(profile);
  };

  const handleNotificationSave = async () => {
    await saveNotificationSettings(notificationSettings);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile({ ...profile, ...updates });
  };

  const addToArray = (field: keyof UserProfile, value: string) => {
    const currentArray = (profile[field] as string[]) || [];
    if (!currentArray.includes(value) && value.trim()) {
      updateProfile({ [field]: [...currentArray, value.trim()] });
    }
  };

  const removeFromArray = (field: keyof UserProfile, value: string) => {
    const currentArray = (profile[field] as string[]) || [];
    updateProfile({ [field]: currentArray.filter(item => item !== value) });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Activity className="h-5 w-5 text-primary pulse-data" />
              <span className="text-lg font-medium tracking-tight text-primary">BioPrecision</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">Dashboard</Button>
              </Link>
              <Link to="/actions">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">Actions</Button>
              </Link>
              <Link to="/history">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">History</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="font-normal text-primary">Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">Health Settings</h1>
          <p className="text-muted-foreground">
            Customize your health profile and tracking preferences for personalized recommendations
          </p>
        </div>

        <Tabs defaultValue="identity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="identity">Personal</TabsTrigger>
            <TabsTrigger value="anthropometric">Body Metrics</TabsTrigger>
            <TabsTrigger value="cardiovascular">Heart & Fitness</TabsTrigger>
            <TabsTrigger value="metabolic">Health Markers</TabsTrigger>
            <TabsTrigger value="algorithms">Preferences</TabsTrigger>
            <TabsTrigger value="protocols">Notifications</TabsTrigger>
          </TabsList>

          {/* Identity & Basic Setup */}
          <TabsContent value="identity" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="display_name">Preferred Name</Label>
                  <Input
                    id="display_name"
                    value={profile.display_name || ''}
                    onChange={(e) => updateProfile({ display_name: e.target.value })}
                    placeholder="Dan"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={profile.first_name || ''}
                    onChange={(e) => updateProfile({ first_name: e.target.value })}
                    placeholder="Daniel"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={profile.last_name || ''}
                    onChange={(e) => updateProfile({ last_name: e.target.value })}
                    placeholder="Smith"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="biological_sex">Biological Sex (Physiological Classification)</Label>
                  <Select 
                    value={profile.biological_sex || ''} 
                    onValueChange={(value) => updateProfile({ biological_sex: value as 'male' | 'female' | 'other' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select classification..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male (XY Chromosome Pattern)</SelectItem>
                      <SelectItem value="female">Female (XX Chromosome Pattern)</SelectItem>
                      <SelectItem value="other">Other/Intersex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chronotype">Circadian Chronotype Classification</Label>
                  <Select 
                    value={profile.chronotype || ''} 
                    onValueChange={(value) => updateProfile({ chronotype: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select chronotype..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extreme_early">Extreme Larks (04:00-05:30 wake)</SelectItem>
                      <SelectItem value="moderate_early">Moderate Larks (05:30-06:30 wake)</SelectItem>
                      <SelectItem value="intermediate">Intermediate Type (06:30-08:00 wake)</SelectItem>
                      <SelectItem value="moderate_late">Moderate Owls (08:00-09:30 wake)</SelectItem>
                      <SelectItem value="extreme_late">Extreme Owls (09:30+ wake)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Temporal Zone Configuration</Label>
                  <Input
                    id="timezone"
                    value={profile.timezone || ''}
                    onChange={(e) => updateProfile({ timezone: e.target.value })}
                    placeholder="America/New_York"
                  />
                </div>
              </div>

              <Button onClick={handleProfileSave} disabled={saving} className="w-full">
                {saving ? "Uploading Identity Matrix..." : "Save Identity Configuration"}
              </Button>
            </Card>
          </TabsContent>

          {/* Anthropometric Data */}
          <TabsContent value="anthropometric" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Anthropometric Baseline Measurements
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Body Mass (lbs) - Precision ±0.1</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={profile.weight_lbs || ''}
                    onChange={(e) => updateProfile({ weight_lbs: parseFloat(e.target.value) || undefined })}
                    placeholder="165.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Chronological Age (years)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => updateProfile({ age: parseInt(e.target.value) || undefined })}
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height_feet">Stature - Feet Component</Label>
                  <Input
                    id="height_feet"
                    type="number"
                    value={profile.height_feet || ''}
                    onChange={(e) => updateProfile({ height_feet: parseInt(e.target.value) || undefined })}
                    placeholder="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height_inches">Stature - Inches Component</Label>
                  <Input
                    id="height_inches"
                    type="number"
                    value={profile.height_inches || ''}
                    onChange={(e) => updateProfile({ height_inches: parseInt(e.target.value) || undefined })}
                    placeholder="8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body_fat">Body Fat Percentage (% via DEXA/BodPod)</Label>
                  <Input
                    id="body_fat"
                    type="number"
                    step="0.1"
                    value={profile.body_fat_percentage || ''}
                    onChange={(e) => updateProfile({ body_fat_percentage: parseFloat(e.target.value) || undefined })}
                    placeholder="12.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity">Physical Activity Coefficient</Label>
                  <Select 
                    value={profile.activity_level || ''} 
                    onValueChange={(value) => updateProfile({ activity_level: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select PAL coefficient..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (PAL 1.2-1.39)</SelectItem>
                      <SelectItem value="light">Light Activity (PAL 1.4-1.59)</SelectItem>
                      <SelectItem value="moderate">Moderate Activity (PAL 1.6-1.89)</SelectItem>
                      <SelectItem value="active">Active Lifestyle (PAL 1.9-2.09)</SelectItem>
                      <SelectItem value="very_active">Extremely Active (PAL 2.1-2.4)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exercise_frequency">Training Frequency (sessions/week)</Label>
                  <Input
                    id="exercise_frequency"
                    type="number"
                    min="0"
                    max="14"
                    value={profile.exercise_frequency || ''}
                    onChange={(e) => updateProfile({ exercise_frequency: parseInt(e.target.value) || undefined })}
                    placeholder="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stress_level">Psychophysiological Stress Index</Label>
                  <Select 
                    value={profile.stress_level || ''} 
                    onValueChange={(value) => updateProfile({ stress_level: value as 'low' | 'moderate' | 'high' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select stress classification..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Stress (Cortisol &lt;15 μg/dL)</SelectItem>
                      <SelectItem value="moderate">Moderate Stress (Cortisol 15-25 μg/dL)</SelectItem>
                      <SelectItem value="high">High Stress (Cortisol &gt;25 μg/dL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-6" />

              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Moon className="h-4 w-4 text-primary" />
                Circadian Sleep Architecture
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="wake">Wake Time (Circadian Phase)</Label>
                  <Input
                    id="wake"
                    type="time"
                    value={profile.wake_time || ''}
                    onChange={(e) => updateProfile({ wake_time: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bed">Sleep Onset Target Time</Label>
                  <Input
                    id="bed"
                    type="time"
                    value={profile.bed_time || ''}
                    onChange={(e) => updateProfile({ bed_time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep_goal">Sleep Duration Target (hours)</Label>
                  <Input
                    id="sleep_goal"
                    type="number"
                    step="0.25"
                    min="4"
                    max="12"
                    value={profile.sleep_goal_hours || ''}
                    onChange={(e) => updateProfile({ sleep_goal_hours: parseFloat(e.target.value) || undefined })}
                    placeholder="8.25"
                  />
                </div>
              </div>

              <Button onClick={handleProfileSave} disabled={saving} className="w-full">
                {saving ? "Processing Anthropometric Data..." : "Save Anthropometric Configuration"}
              </Button>
            </Card>
          </TabsContent>

          {/* Cardiovascular Performance Metrics */}
          <TabsContent value="cardiovascular" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Cardiovascular Performance Profiling
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="resting_hr">Resting Heart Rate (bpm) - Supine Position</Label>
                  <Input
                    id="resting_hr"
                    type="number"
                    value={profile.resting_heart_rate || ''}
                    onChange={(e) => updateProfile({ resting_heart_rate: parseInt(e.target.value) || undefined })}
                    placeholder="52"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="baseline_hrv">Baseline HRV (ms) - RMSSD 7-day average</Label>
                  <Input
                    id="baseline_hrv"
                    type="number"
                    value={profile.baseline_hrv_ms || ''}
                    onChange={(e) => updateProfile({ baseline_hrv_ms: parseInt(e.target.value) || undefined })}
                    placeholder="45"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lactate_threshold">Lactate Threshold (bpm) - 2-4 mmol/L</Label>
                  <Input
                    id="lactate_threshold"
                    type="number"
                    value={profile.lactate_threshold_bpm || ''}
                    onChange={(e) => updateProfile({ lactate_threshold_bpm: parseInt(e.target.value) || undefined })}
                    placeholder="165"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anaerobic_threshold">Anaerobic Threshold (bpm) - VT2</Label>
                  <Input
                    id="anaerobic_threshold"
                    type="number"
                    value={profile.anaerobic_threshold_bpm || ''}
                    onChange={(e) => updateProfile({ anaerobic_threshold_bpm: parseInt(e.target.value) || undefined })}
                    placeholder="182"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recovery_hr">Heart Rate Recovery (1-min post-exercise)</Label>
                  <Input
                    id="recovery_hr"
                    type="number"
                    value={profile.recovery_heart_rate_1min || ''}
                    onChange={(e) => updateProfile({ recovery_heart_rate_1min: parseInt(e.target.value) || undefined })}
                    placeholder="28"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vo2_max">VO₂ Max (ml/kg/min) - Direct Measurement</Label>
                  <Input
                    id="vo2_max"
                    type="number"
                    step="0.1"
                    value={profile.vo2_max || ''}
                    onChange={(e) => updateProfile({ vo2_max: parseFloat(e.target.value) || undefined })}
                    placeholder="58.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bp_systolic">Systolic Blood Pressure (mmHg)</Label>
                  <Input
                    id="bp_systolic"
                    type="number"
                    value={profile.blood_pressure_systolic || ''}
                    onChange={(e) => updateProfile({ blood_pressure_systolic: parseInt(e.target.value) || undefined })}
                    placeholder="115"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bp_diastolic">Diastolic Blood Pressure (mmHg)</Label>
                  <Input
                    id="bp_diastolic"
                    type="number"
                    value={profile.blood_pressure_diastolic || ''}
                    onChange={(e) => updateProfile({ blood_pressure_diastolic: parseInt(e.target.value) || undefined })}
                    placeholder="75"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="autonomic_balance">Autonomic Balance Score (0-100)</Label>
                  <Input
                    id="autonomic_balance"
                    type="number"
                    step="0.01"
                    value={profile.autonomic_balance_score || ''}
                    onChange={(e) => updateProfile({ autonomic_balance_score: parseFloat(e.target.value) || undefined })}
                    placeholder="72.50"
                  />
                </div>
              </div>

              <Button onClick={handleProfileSave} disabled={saving} className="w-full">
                {saving ? "Processing Cardiovascular Matrix..." : "Save Cardiovascular Profile"}
              </Button>
            </Card>
          </TabsContent>

          {/* Metabolic & Biochemical */}
          <TabsContent value="metabolic" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={profile.weight_lbs || ''}
                    onChange={(e) => updateProfile({ weight_lbs: parseFloat(e.target.value) || undefined })}
                    placeholder="165"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={profile.age || ''}
                    onChange={(e) => updateProfile({ age: parseInt(e.target.value) || undefined })}
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height_feet">Height (feet)</Label>
                  <Input
                    id="height_feet"
                    type="number"
                    value={profile.height_feet || ''}
                    onChange={(e) => updateProfile({ height_feet: parseInt(e.target.value) || undefined })}
                    placeholder="5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height_inches">Height (inches)</Label>
                  <Input
                    id="height_inches"
                    type="number"
                    value={profile.height_inches || ''}
                    onChange={(e) => updateProfile({ height_inches: parseInt(e.target.value) || undefined })}
                    placeholder="8"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="biological_sex">Biological Sex</Label>
                  <Select 
                    value={profile.biological_sex || ''} 
                    onValueChange={(value) => updateProfile({ biological_sex: value as 'male' | 'female' | 'other' })}
                  >
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
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select 
                    value={profile.activity_level || ''} 
                    onValueChange={(value) => updateProfile({ activity_level: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (office work)</SelectItem>
                      <SelectItem value="light">Light (1-2 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (3-4 days/week)</SelectItem>
                      <SelectItem value="active">Active (5-6 days/week)</SelectItem>
                      <SelectItem value="very_active">Very Active (daily)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exercise_frequency">Exercise Days/Week</Label>
                  <Input
                    id="exercise_frequency"
                    type="number"
                    min="0"
                    max="7"
                    value={profile.exercise_frequency || ''}
                    onChange={(e) => updateProfile({ exercise_frequency: parseInt(e.target.value) || undefined })}
                    placeholder="4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stress_level">Stress Level</Label>
                  <Select 
                    value={profile.stress_level || ''} 
                    onValueChange={(value) => updateProfile({ stress_level: value as 'low' | 'moderate' | 'high' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-6" />

              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Moon className="h-4 w-4 text-primary" />
                Sleep Schedule
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="wake">Wake Time</Label>
                  <Input
                    id="wake"
                    type="time"
                    value={profile.wake_time || ''}
                    onChange={(e) => updateProfile({ wake_time: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bed">Bedtime</Label>
                  <Input
                    id="bed"
                    type="time"
                    value={profile.bed_time || ''}
                    onChange={(e) => updateProfile({ bed_time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep_goal">Sleep Goal (hours)</Label>
                  <Input
                    id="sleep_goal"
                    type="number"
                    step="0.5"
                    min="4"
                    max="12"
                    value={profile.sleep_goal_hours || ''}
                    onChange={(e) => updateProfile({ sleep_goal_hours: parseFloat(e.target.value) || undefined })}
                    placeholder="8.0"
                  />
                </div>
              </div>

              <Button onClick={handleProfileSave} disabled={saving} className="w-full">
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </Card>
          </TabsContent>

          {/* Health Metrics Tab */}
          <TabsContent value="health" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Cardiovascular & Fitness
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="resting_hr">Resting Heart Rate (bpm)</Label>
                  <Input
                    id="resting_hr"
                    type="number"
                    value={profile.resting_heart_rate || ''}
                    onChange={(e) => updateProfile({ resting_heart_rate: parseInt(e.target.value) || undefined })}
                    placeholder="60"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vo2_max">VO2 Max (ml/kg/min)</Label>
                  <Input
                    id="vo2_max"
                    type="number"
                    step="0.1"
                    value={profile.vo2_max || ''}
                    onChange={(e) => updateProfile({ vo2_max: parseFloat(e.target.value) || undefined })}
                    placeholder="45.5"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bp_systolic">Blood Pressure - Systolic</Label>
                  <Input
                    id="bp_systolic"
                    type="number"
                    value={profile.blood_pressure_systolic || ''}
                    onChange={(e) => updateProfile({ blood_pressure_systolic: parseInt(e.target.value) || undefined })}
                    placeholder="120"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bp_diastolic">Blood Pressure - Diastolic</Label>
                  <Input
                    id="bp_diastolic"
                    type="number"
                    value={profile.blood_pressure_diastolic || ''}
                    onChange={(e) => updateProfile({ blood_pressure_diastolic: parseInt(e.target.value) || undefined })}
                    placeholder="80"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body_fat">Body Fat Percentage (%)</Label>
                  <Input
                    id="body_fat"
                    type="number"
                    step="0.1"
                    value={profile.body_fat_percentage || ''}
                    onChange={(e) => updateProfile({ body_fat_percentage: parseFloat(e.target.value) || undefined })}
                    placeholder="15.0"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Metabolic Health
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="fasting_glucose">Fasting Glucose (mg/dL)</Label>
                  <Input
                    id="fasting_glucose"
                    type="number"
                    value={profile.fasting_glucose || ''}
                    onChange={(e) => updateProfile({ fasting_glucose: parseInt(e.target.value) || undefined })}
                    placeholder="85"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hba1c">HbA1c (%)</Label>
                  <Input
                    id="hba1c"
                    type="number"
                    step="0.1"
                    value={profile.hba1c || ''}
                    onChange={(e) => updateProfile({ hba1c: parseFloat(e.target.value) || undefined })}
                    placeholder="5.2"
                  />
                </div>
              </div>

              <Separator className="my-6" />

              <h4 className="font-medium mb-4 flex items-center gap-2">
                <Utensils className="h-4 w-4 text-primary" />
                Nutrition Goals
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="protein_goal">Daily Protein Goal (g)</Label>
                  <Input
                    id="protein_goal"
                    type="number"
                    value={profile.protein_goal_grams || ''}
                    onChange={(e) => updateProfile({ protein_goal_grams: parseInt(e.target.value) || undefined })}
                    placeholder="150"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hydration_goal">Daily Hydration Goal (oz)</Label>
                  <Input
                    id="hydration_goal"
                    type="number"
                    value={profile.hydration_goal_oz || ''}
                    onChange={(e) => updateProfile({ hydration_goal_oz: parseInt(e.target.value) || undefined })}
                    placeholder="64"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caffeine_habit">Caffeine Habit</Label>
                  <Select 
                    value={profile.caffeine_habit || ''} 
                    onValueChange={(value) => updateProfile({ caffeine_habit: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="morning">Morning only</SelectItem>
                      <SelectItem value="afternoon">Morning & afternoon</SelectItem>
                      <SelectItem value="evening">Throughout day</SelectItem>
                      <SelectItem value="throughout">24/7 (not recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleProfileSave} disabled={saving} className="w-full">
                {saving ? "Saving..." : "Save Health Metrics"}
              </Button>
            </Card>
          </TabsContent>

          {/* Rules Engine */}
          <TabsContent value="rules" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Intervention Rules
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Configure when and how you receive personalized health prompts based on your comprehensive profile
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={notificationSettings.hydration_reminders}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, hydration_reminders: checked})}
                    />
                    <div>
                      <Label className="font-medium">Smart Hydration Reminders</Label>
                      <p className="text-xs text-muted-foreground">Based on weight, activity level, and climate</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={notificationSettings.sedentary_breaks}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, sedentary_breaks: checked})}
                    />
                    <div>
                      <Label className="font-medium">Movement Breaks</Label>
                      <p className="text-xs text-muted-foreground">Personalized based on fitness level and goals</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={notificationSettings.hrv_recovery}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, hrv_recovery: checked})}
                    />
                    <div>
                      <Label className="font-medium">HRV-Based Recovery</Label>
                      <p className="text-xs text-muted-foreground">Adaptive recommendations based on cardiovascular readiness</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={notificationSettings.protein_targets}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, protein_targets: checked})}
                    />
                    <div>
                      <Label className="font-medium">Precision Protein Timing</Label>
                      <p className="text-xs text-muted-foreground">Optimized for body weight and exercise schedule</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={notificationSettings.sleep_wind_down}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, sleep_wind_down: checked})}
                    />
                    <div>
                      <Label className="font-medium">Circadian Sleep Optimization</Label>
                      <p className="text-xs text-muted-foreground">Tailored to your chronotype and sleep goals</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleNotificationSave} disabled={saving} className="w-full mt-6">
                {saving ? "Saving..." : "Save Rule Preferences"}
              </Button>
            </Card>
          </TabsContent>

          {/* Device Connections */}
          <TabsContent value="connections" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                Connected Devices & Data Sources
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Connect your health devices for automatic, precise biometric tracking
              </p>
              
              <div className="space-y-4 mb-6">
                {[
                  { id: 'apple_health', name: 'Apple Health', connected: true, status: 'Syncing continuously' },
                  { id: 'oura', name: 'Oura Ring', connected: true, status: 'HRV & sleep data active' },
                  { id: 'whoop', name: 'WHOOP 4.0', connected: false, status: 'Not connected' },
                  { id: 'fitbit', name: 'Fitbit', connected: false, status: 'Not connected' },
                  { id: 'garmin', name: 'Garmin Connect', connected: false, status: 'Not connected' },
                  { id: 'strava', name: 'Strava', connected: false, status: 'Not connected' },
                  { id: 'myfitnesspal', name: 'MyFitnessPal', connected: false, status: 'Not connected' }
                ].map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <Label className="font-medium">{connection.name}</Label>
                        <p className="text-xs text-muted-foreground">{connection.status}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant={connection.connected ? "outline" : "default"}
                      size="sm"
                    >
                      {connection.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-3">
                <h4 className="font-medium">Active Data Permissions</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Heart Rate & HRV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Steps & Movement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Sleep Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Body Composition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span>Blood Glucose (pending)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span>Blood Pressure (manual)</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Smart Notification Preferences
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Channels</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push">Push Notifications (Recommended)</Label>
                      <Switch
                        id="push"
                        checked={notificationSettings.push_enabled}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, push_enabled: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email">Email Notifications</Label>
                      <Switch
                        id="email"
                        checked={notificationSettings.email_enabled}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email_enabled: checked})}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="watch">Smartwatch Integration</Label>
                      <Switch
                        id="watch"
                        checked={notificationSettings.watch_enabled}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, watch_enabled: checked})}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Intelligent Quiet Hours</h4>
                  <p className="text-sm text-muted-foreground">Notifications will be suppressed during these hours unless critical</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quiet_start">Start Time</Label>
                      <Input
                        id="quiet_start"
                        type="time"
                        value={notificationSettings.quiet_hours_start || ''}
                        onChange={(e) => setNotificationSettings({...notificationSettings, quiet_hours_start: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quiet_end">End Time</Label>
                      <Input
                        id="quiet_end"
                        type="time"
                        value={notificationSettings.quiet_hours_end || ''}
                        onChange={(e) => setNotificationSettings({...notificationSettings, quiet_hours_end: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleNotificationSave} disabled={saving} className="w-full mt-6">
                {saving ? "Saving..." : "Save Notification Preferences"}
              </Button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy & Data Security
              </h3>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Export My Health Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Data Sharing Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Policy & Terms
                </Button>
                <Separator />
                <Button variant="destructive" className="w-full justify-start">
                  Delete My Account & All Data
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;