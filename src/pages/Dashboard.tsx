import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useHealthStatus, useReadings } from "@/hooks/useHealthData";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Activity, Heart, Droplets, TrendingUp, Clock, Plus, ArrowRight, LogOut, User, ArrowUp, ArrowDown, Minus, Target, Zap, Brain, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ReadinessData {
  hrv: number;
  baseline: number;
  status: 'train' | 'maintain' | 'recover';
}

interface HydrationData {
  target: number;
  consumed: number;
  remaining: number;
}

interface MovementData {
  steps: number;
  target: number;
  sedentaryMinutes: number;
}

interface SleepData {
  windDownTime: string;
  caffeineRisk: boolean;
}

const Dashboard = () => {
  // ALL HOOKS MUST BE CALLED FIRST, BEFORE ANY CONDITIONAL LOGIC
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, loading: authLoading, signOut } = useAuth();
  const { healthMetrics, loading: healthLoading } = useHealthStatus();
  const { readings, addReading } = useReadings(50);
  const { profile } = useUserProfile();
  const { toast } = useToast();

  // Get latest readings for specific metrics
  const getLatestReading = (metricName: string) => {
    return readings.find(reading => reading.metric?.name === metricName);
  };

  const heartRateReading = getLatestReading('heart_rate');
  const hydrationReading = getLatestReading('hydration');
  const stepsReading = getLatestReading('steps');
  const sleepReading = getLatestReading('sleep_hours');

  const [readiness, setReadiness] = useState<ReadinessData>({
    hrv: heartRateReading?.value || 72,
    baseline: 75,
    status: heartRateReading?.value ? (heartRateReading.value > 75 ? 'train' : 'recover') : 'maintain'
  });
  
  const [hydration, setHydration] = useState<HydrationData>({
    target: 64,
    consumed: hydrationReading?.value || 28,
    remaining: Math.max(0, 64 - (hydrationReading?.value || 28))
  });
  
  const [movement, setMovement] = useState<MovementData>({
    steps: stepsReading?.value || 3420,
    target: 8000,
    sedentaryMinutes: 58
  });
  
  const [sleep, setSleep] = useState<SleepData>({
    windDownTime: "21:30",
    caffeineRisk: false
  });

  // Calculate BioPrecision Score
  const calculateBioPrecisionScore = () => {
    const hrvScore = Math.min(100, (readiness.hrv / readiness.baseline) * 100);
    const hydrationScore = Math.min(100, (hydration.consumed / hydration.target) * 100);
    const movementScore = Math.min(100, (movement.steps / movement.target) * 100);
    const sleepScore = sleep.caffeineRisk ? 70 : 90;
    
    return Math.round((hrvScore + hydrationScore + movementScore + sleepScore) / 4);
  };

  const bioPrecisionScore = calculateBioPrecisionScore();

  const getScoreInterpretation = (score: number) => {
    if (score >= 90) return "Excellent — you're optimized and ready to perform";
    if (score >= 80) return "Strong day, but focus on hydration and sleep to break 90 tomorrow";
    if (score >= 70) return "Decent performance — prioritize recovery actions";
    if (score >= 60) return "Below baseline — focus on rest and hydration today";
    return "Recovery mode — dial back intensity and prioritize sleep";
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getPersonalizedStatus = () => {
    const issues = [];
    if (hydration.consumed / hydration.target < 0.6) issues.push("hydration needs attention");
    if (readiness.status === 'recover') issues.push("recovery looks weak");
    if (movement.sedentaryMinutes > 45) issues.push("movement is low");
    
    if (issues.length === 0) return "all systems looking strong";
    return issues.slice(0, 2).join(", ");
  };

  const [urgentActions] = useState([
    {
      id: 1,
      icon: Droplets,
      text: "Drink 14 oz water",
      timeCue: "within 20 min",
      reason: "You're 22% under hydration target",
      impact: "↑ cognitive function by 15%",
      urgency: "high"
    },
    {
      id: 2,
      icon: Activity,
      text: "Walk 5 minutes",
      timeCue: "before lunch",
      reason: "58 min sedentary - movement improves glucose disposal",
      impact: "↑ glucose clearance by 18%",
      urgency: "medium"
    },
    {
      id: 3,
      icon: Zap,
      text: "Add 25g protein at next meal",
      timeCue: "at next meal",
      reason: "Target 0.4g/kg per meal for optimal recovery",
      impact: "↓ muscle breakdown by 12%",
      urgency: "low"
    }
  ]);

  // Week-over-week trends
  const trends = [
    { metric: "HRV", change: -4, unit: "%" },
    { metric: "Sleep", change: 12, unit: "%" },
    { metric: "Movement", change: -800, unit: " steps/day" },
    { metric: "Hydration", change: 5, unit: "%" }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // CONDITIONAL LOGIC AND EARLY RETURNS COME AFTER ALL HOOKS
  
  // Redirect if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-8 w-8 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const addHydration = async (amount: number) => {
    const newConsumed = hydration.consumed + amount;
    setHydration(prev => ({
      ...prev,
      consumed: newConsumed,
      remaining: Math.max(0, prev.remaining - amount)
    }));

    // Add reading to database if user is authenticated
    if (user) {
      const hydrationMetric = readings.find(r => r.metric?.name === 'hydration')?.metric;
      if (hydrationMetric) {
        await addReading(hydrationMetric.id, newConsumed, 'manual');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'train': return 'bg-primary';
      case 'maintain': return 'bg-accent';
      case 'recover': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const handleActionComplete = (actionText: string) => {
    toast({
      title: "Action completed!",
      description: actionText,
    });
  };

  const handleMovement = () => {
    toast({
      title: "Great job!",
      description: "Movement logged. Keep up the good work!",
    });
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
              <Link to="/bioprecision">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">BioPrecision</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="font-normal text-primary">Quick View</Button>
              </Link>
              <Link to="/actions">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">Actions</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">Settings</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* BioPrecision Score - Hero Section */}
        <Card className="mb-8 p-8 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/30">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl font-light">
                  {getGreeting()}, {profile?.display_name || profile?.first_name || user?.email?.split('@')[0] || 'there'}
                </h1>
                {profile?.persona_type && (
                  <Badge variant="outline" className="text-sm">
                    {profile.persona_type === 'desk_worker' ? 'Desk Worker' : 
                     profile.persona_type === 'athlete' ? 'Athlete' :
                     profile.persona_type === 'senior' ? 'Senior' :
                     profile.persona_type === 'parent' ? 'Parent' : ''}
                  </Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                {getPersonalizedStatus()}
              </p>
              
              {/* Quick Status Badges */}
              <div className="flex flex-wrap gap-3">
                <Badge className={`px-4 py-2 ${
                  readiness.status === 'train' ? 'bg-primary' : 
                  readiness.status === 'maintain' ? 'bg-accent' : 
                  'bg-destructive'
                }`}>
                  Metabolic Health: {readiness.status === 'train' ? 'On Track' : readiness.status === 'maintain' ? 'Steady' : 'Needs Attention'}
                </Badge>
                <Badge className={`px-4 py-2 ${
                  sleepReading?.value && sleepReading.value >= 7 ? 'bg-primary' : 'bg-amber-500'
                }`}>
                  Sleep: {sleepReading?.value && sleepReading.value >= 7 ? 'Good' : 'Needs Improvement'}
                </Badge>
                <Badge className={`px-4 py-2 ${
                  (movement.steps / movement.target) >= 0.8 ? 'bg-primary' : 'bg-accent'
                }`}>
                  Movement: {(movement.steps / movement.target) >= 0.8 ? 'Active' : 'Below Target'}
                </Badge>
              </div>
            </div>
            
            {/* Daily Score */}
            <div className="text-center lg:text-right">
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">BioPrecision Score</div>
              <div className={`text-7xl font-light mb-2 ${
                bioPrecisionScore >= 80 ? 'text-primary' : 
                bioPrecisionScore >= 70 ? 'text-accent' : 
                'text-destructive'
              } animate-fade-in`}>
                {bioPrecisionScore}
              </div>
              <div className="text-xs text-muted-foreground max-w-xs">
                {getScoreInterpretation(bioPrecisionScore)}
              </div>
            </div>
          </div>
        </Card>

        {/* Weekly Trends Snapshot */}
        <Card className="mb-8 p-6">
          <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Week-over-Week Progress
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trends.map((trend) => (
              <div key={trend.metric} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div>
                  <div className="text-sm text-muted-foreground">{trend.metric}</div>
                  <div className={`text-lg font-medium flex items-center gap-1 ${
                    trend.change > 0 ? 'text-primary' : 'text-destructive'
                  }`}>
                    {trend.change > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    {Math.abs(trend.change)}{trend.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Cards Grid - Enhanced with Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {/* Readiness Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary pulse-gentle" />
                <h3 className="font-medium">Readiness</h3>
              </div>
              <Badge className={`${getStatusColor(readiness.status)} text-primary-foreground`}>
                {readiness.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>HRV: {readiness.hrv} ms</span>
                <span className="text-muted-foreground">Baseline: {readiness.baseline} ms</span>
              </div>
              <Progress 
                value={(readiness.hrv / readiness.baseline) * 100} 
                className="h-2"
              />
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-foreground">
                    {readiness.hrv < readiness.baseline * 0.9 
                      ? "Delay intense training until HRV improves. Ideal for Zone 2 cardio today." 
                      : "Ideal for Zone 2 training today — HRV is strong and recovery complete."}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Hydration Card - Dynamic Color */}
          <Card className={`p-6 hover:shadow-lg transition-all ${
            (hydration.consumed / hydration.target) >= 0.8 ? 'border-primary/50' :
            (hydration.consumed / hydration.target) >= 0.5 ? 'border-amber-500/50' :
            'border-destructive/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Droplets className={`h-5 w-5 ${
                  (hydration.consumed / hydration.target) >= 0.8 ? 'text-primary' :
                  (hydration.consumed / hydration.target) >= 0.5 ? 'text-amber-500' :
                  'text-destructive'
                }`} />
                <h3 className="font-medium">Hydration</h3>
              </div>
              <span className="text-sm text-muted-foreground">{hydration.consumed}/{hydration.target} oz</span>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <Progress 
                  value={(hydration.consumed / hydration.target) * 100} 
                  className={`h-3 ${
                    (hydration.consumed / hydration.target) >= 0.8 ? 'bg-primary/20' :
                    (hydration.consumed / hydration.target) >= 0.5 ? 'bg-amber-500/20' :
                    'bg-destructive/20'
                  }`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium">{Math.round((hydration.consumed / hydration.target) * 100)}%</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-light mb-3">{hydration.remaining} oz remaining</p>
                <div className="flex justify-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => addHydration(8)} className="hover:scale-105 transition-transform">
                    +8 oz
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addHydration(12)} className="hover:scale-105 transition-transform">
                    +12 oz
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addHydration(16)} className="hover:scale-105 transition-transform">
                    +16 oz
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Movement Card - With Glucose Context */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary-glow pulse-data" />
                <h3 className="font-medium">Movement</h3>
              </div>
              <Badge 
                variant="destructive"
                className="text-xs px-3 py-1.5"
              >
                {movement.sedentaryMinutes}m sedentary
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{movement.steps.toLocaleString()} steps</span>
                <span className="text-muted-foreground">Goal: {movement.target.toLocaleString()}</span>
              </div>
              <Progress 
                value={(movement.steps / movement.target) * 100} 
                className="h-2"
              />
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-500 mb-1">Glucose trending high</p>
                    <p className="text-xs text-muted-foreground">Walk now to improve glucose clearance by ~18%</p>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full hover:scale-105 transition-transform" onClick={handleMovement}>
                <Plus className="h-3 w-3 mr-1" />
                Move 3 min
              </Button>
            </div>
          </Card>

          {/* Sleep Plan Card - With Countdown */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <h3 className="font-medium">Sleep Plan</h3>
              </div>
              <Badge variant={sleep.caffeineRisk ? "destructive" : "secondary"}>
                {sleep.caffeineRisk ? "Risk" : "On Track"}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Wind-down countdown</p>
                <p className="text-2xl font-light">{sleep.windDownTime}</p>
                <p className="text-xs text-accent mt-1">in 3h 15m</p>
              </div>
              <div className="text-xs space-y-2 p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="h-3 w-3 text-amber-500" />
                  <span>Caffeine cutoff: 2:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-3 w-3 text-primary" />
                  <span>Dim lights by 60% at 8:30 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-accent" />
                  <span>No screens 1hr before bed</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Today's Priority Actions - Coach Style */}
        <Card className="p-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-medium">Priority Actions</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Your body's top three priorities based on today's data
              </p>
            </div>
            <Link to="/actions">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                View All
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4 mt-6">
            {urgentActions.slice(0, 3).map((action, index) => (
              <div 
                key={action.id}
                className={`p-6 rounded-lg border-l-4 ${
                  action.urgency === 'high' ? 'border-l-destructive bg-destructive/5' :
                  action.urgency === 'medium' ? 'border-l-accent bg-accent/5' :
                  'border-l-primary bg-primary/5'
                } hover:shadow-md transition-all`}
              >
                 <div className="flex items-start justify-between gap-4">
                   <div className="flex items-start gap-4 flex-1">
                     <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                       <action.icon className="h-5 w-5 text-primary" />
                     </div>
                     <div className="flex-1">
                       <div className="flex items-center gap-2 mb-2">
                         <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                           #{index + 1} Priority
                         </span>
                         <Badge variant="outline" className="text-xs">
                           {action.timeCue}
                         </Badge>
                       </div>
                       <p className="font-semibold text-base mb-1">{action.text}</p>
                       <p className="text-sm text-muted-foreground mb-2">{action.reason}</p>
                       <div className="flex items-center gap-1 text-xs text-primary">
                         <TrendingUp className="h-3 w-3" />
                         <span className="font-medium">{action.impact}</span>
                       </div>
                     </div>
                   </div>
                   <Button 
                     size="sm" 
                     onClick={() => handleActionComplete(action.text)}
                     className="hover:scale-105 transition-transform shrink-0"
                   >
                     Complete
                   </Button>
                 </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;