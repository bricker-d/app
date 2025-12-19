import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Heart, Moon, Droplets, TrendingUp, AlertCircle, CheckCircle2, Clock, Target, Zap } from "lucide-react";
import { HealthInsights } from "@/components/HealthInsights";

type Persona = "athlete" | "senior" | "worker" | "parent";

interface PersonaData {
  name: string;
  age: number;
  role: string;
  emoji: string;
  metrics: {
    hrv: { value: number; status: "optimal" | "warning" | "attention"; trend: string };
    sleep: { value: number; status: "optimal" | "warning" | "attention"; goal: number };
    steps: { value: number; status: "optimal" | "warning" | "attention"; goal: number };
    hydration: { value: number; status: "optimal" | "warning" | "attention"; goal: number };
    glucose: { value: number; status: "optimal" | "warning" | "attention"; };
    recovery: { value: number; status: "optimal" | "warning" | "attention"; };
  };
  insights: Array<{
    id: string;
    type: "recommendation" | "warning" | "achievement" | "prediction";
    title: string;
    description: string;
    confidence: number;
    impact: "high" | "medium" | "low";
    category: string;
    action?: string;
    timeframe?: string;
  }>;
  todayActions: Array<{
    title: string;
    time: string;
    priority: "high" | "medium" | "low";
    completed: boolean;
  }>;
}

const PERSONA_DATA: Record<Persona, PersonaData> = {
  athlete: {
    name: "Marcus",
    age: 28,
    role: "Professional Marathon Runner",
    emoji: "",
    metrics: {
      hrv: { value: 68, status: "optimal", trend: "+5ms from baseline" },
      sleep: { value: 8.5, status: "optimal", goal: 8 },
      steps: { value: 22000, status: "optimal", goal: 15000 },
      hydration: { value: 96, status: "optimal", goal: 80 },
      glucose: { value: 85, status: "optimal" },
      recovery: { value: 92, status: "optimal" }
    },
    insights: [
      {
        id: "athlete-1",
        type: "recommendation",
        title: "Peak Training Window Identified",
        description: "Your HRV and recovery scores indicate optimal readiness. Schedule high-intensity intervals between 10 AM - 12 PM for maximum performance gains.",
        confidence: 94,
        impact: "high",
        category: "Performance",
        action: "Schedule workout",
        timeframe: "Today, 10 AM"
      },
      {
        id: "athlete-2",
        type: "prediction",
        title: "Predicted Race Day Performance",
        description: "Based on current training load and recovery patterns, our AI predicts you'll hit a new PR by 2.3 minutes in your upcoming marathon.",
        confidence: 87,
        impact: "high",
        category: "Analytics"
      },
      {
        id: "athlete-3",
        type: "warning",
        title: "Lactate Threshold Trending Down",
        description: "Your last 3 workouts show decreased lactate clearance. Consider adding a recovery day or reducing intensity by 15%.",
        confidence: 91,
        impact: "medium",
        category: "Recovery",
        action: "Adjust training plan",
        timeframe: "This week"
      }
    ],
    todayActions: [
      { title: "Pre-workout hydration: 16oz electrolyte mix", time: "9:30 AM", priority: "high", completed: true },
      { title: "Interval training session (10 AM optimal window)", time: "10:00 AM", priority: "high", completed: false },
      { title: "Post-workout protein (30g within 45min)", time: "11:45 AM", priority: "high", completed: false },
      { title: "Ice bath recovery (12 minutes)", time: "12:00 PM", priority: "medium", completed: false }
    ]
  },
  senior: {
    name: "Dorothy",
    age: 72,
    role: "Retired Teacher",
    emoji: "",
    metrics: {
      hrv: { value: 42, status: "optimal", trend: "Stable for age group" },
      sleep: { value: 7.2, status: "warning", goal: 8 },
      steps: { value: 4200, status: "optimal", goal: 4000 },
      hydration: { value: 52, status: "attention", goal: 64 },
      glucose: { value: 118, status: "warning" },
      recovery: { value: 78, status: "optimal" }
    },
    insights: [
      {
        id: "senior-1",
        type: "recommendation",
        title: "Medication Timing Optimization",
        description: "Your blood pressure readings are lowest at 2 PM. Consider moving your afternoon medication to 1:30 PM for better efficacy.",
        confidence: 88,
        impact: "high",
        category: "Medication",
        action: "Update schedule",
        timeframe: "Starting tomorrow"
      },
      {
        id: "senior-2",
        type: "warning",
        title: "Hydration Below Target",
        description: "You've averaged only 48oz daily this week. Low hydration affects blood pressure and cognitive function. Set reminders every 2 hours.",
        confidence: 95,
        impact: "medium",
        category: "Hydration",
        action: "Enable reminders"
      },
      {
        id: "senior-3",
        type: "achievement",
        title: "Consistent Movement Streak!",
        description: "You've hit your daily step goal for 14 consecutive days! This consistency improves cardiovascular health and mobility.",
        confidence: 100,
        impact: "high",
        category: "Goals"
      },
      {
        id: "senior-4",
        type: "prediction",
        title: "Fall Risk Assessment",
        description: "Based on gait analysis and balance metrics, your fall risk remains low. Continue current strength exercises.",
        confidence: 82,
        impact: "high",
        category: "🛡️ Safety"
      }
    ],
    todayActions: [
      { title: "Morning medication reminder", time: "8:00 AM", priority: "high", completed: true },
      { title: "Hydration check-in (16oz water)", time: "10:00 AM", priority: "high", completed: true },
      { title: "Gentle stretching routine (15 min)", time: "11:30 AM", priority: "medium", completed: false },
      { title: "Afternoon walk (20 minutes)", time: "2:00 PM", priority: "medium", completed: false },
      { title: "Evening medication reminder", time: "6:00 PM", priority: "high", completed: false }
    ]
  },
  worker: {
    name: "Sarah",
    age: 34,
    role: "Software Developer",
    emoji: "",
    metrics: {
      hrv: { value: 48, status: "attention", trend: "-8ms this week" },
      sleep: { value: 6.2, status: "attention", goal: 7.5 },
      steps: { value: 3200, status: "attention", goal: 8000 },
      hydration: { value: 45, status: "attention", goal: 64 },
      glucose: { value: 102, status: "warning" },
      recovery: { value: 58, status: "attention" }
    },
    insights: [
      {
        id: "worker-1",
        type: "warning",
        title: "Critical: Sedentary Pattern Detected",
        description: "You've been sitting for 3.5 hours straight. Prolonged sitting increases cardiovascular risk by 147%. Take a 5-minute walk now.",
        confidence: 98,
        impact: "high",
        category: "Urgent",
        action: "Move now",
        timeframe: "Immediately"
      },
      {
        id: "worker-2",
        type: "recommendation",
        title: "Optimize Your Coffee Window",
        description: "Your cortisol naturally peaks at 9 AM. Delay coffee until 10:30 AM to prevent afternoon crashes and improve sleep quality.",
        confidence: 89,
        impact: "medium",
        category: "Energy",
        action: "Adjust routine"
      },
      {
        id: "worker-3",
        type: "prediction",
        title: "Burnout Risk Increasing",
        description: "HRV trending down, sleep debt accumulating. Current patterns suggest 78% chance of burnout within 3 weeks without intervention.",
        confidence: 84,
        impact: "high",
        category: "Mental Health",
        action: "Schedule recovery",
        timeframe: "This weekend"
      },
      {
        id: "worker-4",
        type: "recommendation",
        title: "Post-Lunch Energy Strategy",
        description: "Blood glucose spikes after lunch correlate with 3 PM energy crashes. Try a 10-minute walk after eating to stabilize levels.",
        confidence: 91,
        impact: "medium",
        category: "Productivity",
        action: "Set reminder"
      }
    ],
    todayActions: [
      { title: "Stand and stretch break", time: "10:30 AM", priority: "high", completed: true },
      { title: "Movement alert - been sitting 2hrs", time: "2:15 PM", priority: "high", completed: false },
      { title: "Hydration reminder (12oz water)", time: "3:00 PM", priority: "medium", completed: false },
      { title: "Post-work decompression walk", time: "5:30 PM", priority: "high", completed: false },
      { title: "Screen time cutoff reminder", time: "9:00 PM", priority: "medium", completed: false }
    ]
  },
  parent: {
    name: "James",
    age: 39,
    role: "Parent of 3, Sales Manager",
    emoji: "",
    metrics: {
      hrv: { value: 52, status: "warning", trend: "Variable, stress-related" },
      sleep: { value: 5.8, status: "attention", goal: 7.5 },
      steps: { value: 8900, status: "optimal", goal: 8000 },
      hydration: { value: 58, status: "warning", goal: 70 },
      glucose: { value: 112, status: "warning" },
      recovery: { value: 64, status: "warning" }
    },
    insights: [
      {
        id: "parent-1",
        type: "recommendation",
        title: "Sleep Efficiency Hack for Busy Parents",
        description: "You're getting fragmented sleep. Try splitting into a 5-hour core sleep + 30-minute nap. Data shows this can improve recovery by 40%.",
        confidence: 86,
        impact: "high",
        category: "Sleep",
        action: "Try split sleep",
        timeframe: "This week"
      },
      {
        id: "parent-2",
        type: "warning",
        title: "Stress Response Pattern Detected",
        description: "HRV drops sharply between 5-7 PM (evening chaos). Pre-emptive 5-minute breathing exercise at 4:45 PM could reduce stress by 35%.",
        confidence: 92,
        impact: "high",
        category: "Stress",
        action: "Set breathing reminder",
        timeframe: "Daily at 4:45 PM"
      },
      {
        id: "parent-3",
        type: "achievement",
        title: "Consistency Champion!",
        description: "Despite busy schedule, you've maintained 82% adherence to health goals this month. Your kids are learning healthy habits from you!",
        confidence: 100,
        impact: "medium",
        category: "Achievement"
      },
      {
        id: "parent-4",
        type: "recommendation",
        title: "Protein Distribution for Energy",
        description: "Currently eating 60% of daily protein at dinner. Redistributing to include 25g at breakfast could reduce afternoon fatigue.",
        confidence: 88,
        impact: "medium",
        category: "Nutrition",
        action: "Adjust meal plan"
      }
    ],
    todayActions: [
      { title: "Morning hydration (16oz before coffee)", time: "6:30 AM", priority: "high", completed: true },
      { title: "Quick 10-min workout during kids' breakfast", time: "7:15 AM", priority: "medium", completed: true },
      { title: "Stress-reduction breathing (pre-evening chaos)", time: "4:45 PM", priority: "high", completed: false },
      { title: "Family walk after dinner", time: "6:30 PM", priority: "medium", completed: false },
      { title: "Wind-down routine starts", time: "9:00 PM", priority: "high", completed: false }
    ]
  }
};

const getStatusColor = (status: "optimal" | "warning" | "attention") => {
  switch (status) {
    case "optimal": return "text-green-500";
    case "warning": return "text-yellow-500";
    case "attention": return "text-red-500";
  }
};

const getStatusBadge = (status: "optimal" | "warning" | "attention") => {
  switch (status) {
    case "optimal": return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Optimal</Badge>;
    case "warning": return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Monitor</Badge>;
    case "attention": return <Badge className="bg-red-500/20 text-red-500 border-red-500/30">Attention</Badge>;
  }
};

export const PersonaDemo = () => {
  const [selectedPersona, setSelectedPersona] = useState<Persona>("athlete");
  const persona = PERSONA_DATA[selectedPersona];

  return (
    <div className="min-h-screen bg-background">
      {/* Persona Selection */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50 py-8">
        <div className="container max-w-6xl">
          <h1 className="text-3xl font-bold mb-2">BioPrecision Demo: See How It Works</h1>
          <p className="text-muted-foreground mb-6">Experience personalized health intelligence for different lifestyles</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.entries(PERSONA_DATA) as [Persona, PersonaData][]).map(([key, data]) => (
              <Card
                key={key}
                className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                  selectedPersona === key ? "border-primary shadow-lg bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedPersona(key)}
              >
                <h3 className="font-semibold text-center text-sm mb-1">{data.role}</h3>
                <p className="text-xs text-muted-foreground text-center">{data.name}, {data.age}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-6xl py-8 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Heart className={`h-5 w-5 ${getStatusColor(persona.metrics.hrv.status)}`} />
              {getStatusBadge(persona.metrics.hrv.status)}
            </div>
            <div className="text-2xl font-bold">{persona.metrics.hrv.value}ms</div>
            <div className="text-xs text-muted-foreground">HRV</div>
            <div className="text-xs text-muted-foreground mt-1">{persona.metrics.hrv.trend}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Moon className={`h-5 w-5 ${getStatusColor(persona.metrics.sleep.status)}`} />
              {getStatusBadge(persona.metrics.sleep.status)}
            </div>
            <div className="text-2xl font-bold">{persona.metrics.sleep.value}h</div>
            <div className="text-xs text-muted-foreground">Sleep</div>
            <div className="text-xs text-muted-foreground mt-1">Goal: {persona.metrics.sleep.goal}h</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Activity className={`h-5 w-5 ${getStatusColor(persona.metrics.steps.status)}`} />
              {getStatusBadge(persona.metrics.steps.status)}
            </div>
            <div className="text-2xl font-bold">{persona.metrics.steps.value.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Steps</div>
            <div className="text-xs text-muted-foreground mt-1">Goal: {persona.metrics.steps.goal.toLocaleString()}</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Droplets className={`h-5 w-5 ${getStatusColor(persona.metrics.hydration.status)}`} />
              {getStatusBadge(persona.metrics.hydration.status)}
            </div>
            <div className="text-2xl font-bold">{persona.metrics.hydration.value}oz</div>
            <div className="text-xs text-muted-foreground">Hydration</div>
            <div className="text-xs text-muted-foreground mt-1">Goal: {persona.metrics.hydration.goal}oz</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className={`h-5 w-5 ${getStatusColor(persona.metrics.glucose.status)}`} />
              {getStatusBadge(persona.metrics.glucose.status)}
            </div>
            <div className="text-2xl font-bold">{persona.metrics.glucose.value}</div>
            <div className="text-xs text-muted-foreground">Glucose</div>
            <div className="text-xs text-muted-foreground mt-1">mg/dL</div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Zap className={`h-5 w-5 ${getStatusColor(persona.metrics.recovery.status)}`} />
              {getStatusBadge(persona.metrics.recovery.status)}
            </div>
            <div className="text-2xl font-bold">{persona.metrics.recovery.value}%</div>
            <div className="text-xs text-muted-foreground">Recovery</div>
            <div className="text-xs text-muted-foreground mt-1">Readiness</div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="actions">Today's Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="insights">
            <HealthInsights insights={persona.insights as any} showActions={true} />
          </TabsContent>

          <TabsContent value="actions">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Today's Priority Actions
              </h3>
              <div className="space-y-3">
                {persona.todayActions.map((action, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-4 p-4 rounded-lg border ${
                      action.completed ? "bg-green-500/5 border-green-500/20" : "bg-card border-border"
                    }`}
                  >
                    <div className="mt-1">
                      {action.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className={`h-5 w-5 ${
                          action.priority === "high" ? "text-red-500" : "text-yellow-500"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={action.completed ? "line-through text-muted-foreground" : "font-medium"}>
                          {action.title}
                        </span>
                        <Badge variant={action.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                          {action.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {action.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold">Ready to Experience Your Own Personalized Health Intelligence?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of {selectedPersona === "athlete" ? "athletes" : selectedPersona === "senior" ? "seniors" : selectedPersona === "worker" ? "professionals" : "parents"} who trust BioPrecision to optimize their health and performance.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Start Free Trial
                <TrendingUp className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
