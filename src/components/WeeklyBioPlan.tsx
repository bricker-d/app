import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, AlertCircle, CheckCircle2, Clock, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Priority {
  title: string;
  reason: string;
  action: string;
  impact: "high" | "medium" | "low";
  completed?: boolean;
  timeframe?: string;
  expectedOutcome?: string;
}

interface WeeklyPlan {
  priorities: Priority[];
  summary: string;
  week_start: string;
}

export function WeeklyBioPlan() {
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadWeeklyPlan();
  }, []);

  const loadWeeklyPlan = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());

      // Always prepare sample data for demo
      const samplePlan = {
        priorities: [
          {
            title: "Sleep: Get 30 More Minutes",
            reason: "You're averaging 45 minutes less sleep than usual this week",
            action: "Set a bedtime alarm for 10:30 PM to wind down earlier",
            impact: "high" as const,
            completed: false,
            timeframe: "Daily for 7 days",
            expectedOutcome: "Improve HRV by 8-12% and reduce morning cortisol"
          },
          {
            title: "Fasting Glucose: Post-Meal Walks",
            reason: "Morning fasting glucose is slightly elevated (105 vs 95 mg/dL baseline)",
            action: "Try a 15-minute walk after dinner to improve glucose disposal",
            impact: "high" as const,
            completed: false,
            timeframe: "After dinner daily",
            expectedOutcome: "Lower fasting glucose by 5-10 mg/dL within 2 weeks"
          },
          {
            title: "HRV: Focus on Zone 2 Recovery",
            reason: "Heart rate variability (HRV) is 12% below your baseline - signals need for recovery",
            action: "Keep workouts in Zone 2 (conversational pace) this week to rebuild capacity",
            impact: "medium" as const,
            completed: false,
            timeframe: "All workouts this week",
            expectedOutcome: "Restore HRV to baseline, improve aerobic capacity"
          },
          {
            title: "Hydration: Front-Load Morning Intake",
            reason: "Hydration tracking shows you're consistently under-hydrated in the AM",
            action: "Drink 16 oz water within 30 minutes of waking",
            impact: "medium" as const,
            completed: false,
            timeframe: "Every morning",
            expectedOutcome: "Boost cognitive performance, reduce afternoon fatigue"
          },
          {
            title: "Protein Distribution: Optimize Breakfast",
            reason: "Current breakfast averages only 12g protein (target: 30g minimum)",
            action: "Add Greek yogurt or eggs to increase breakfast protein to 30g+",
            impact: "low" as const,
            completed: false,
            timeframe: "Daily breakfast",
            expectedOutcome: "Better satiety, muscle protein synthesis, blood sugar stability"
          }
        ],
        summary: "This week, focus on sleep recovery and metabolic control (glucose management). Your body is showing signs of accumulated fatigue—prioritize rest and recovery before increasing training intensity.",
        week_start: weekStart.toISOString().split('T')[0]
      };

      if (user) {
        const { data, error } = await supabase
          .from('weekly_plans')
          .select('*')
          .eq('user_id', user.id)
          .gte('week_start', weekStart.toISOString().split('T')[0])
          .order('week_start', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          setPlan({
            priorities: (data.priorities as unknown) as Priority[],
            summary: data.summary || "",
            week_start: data.week_start
          });
          setLoading(false);
          return;
        }
      }

      // Use sample data if not logged in or no data exists
      setPlan(samplePlan);
    } catch (error) {
      console.error('Error loading weekly plan:', error);
      // Show sample data on error
      const today = new Date();
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      setPlan({
        priorities: [
          {
            title: "Sleep: Get 30 More Minutes",
            reason: "You're averaging 45 minutes less sleep than usual this week",
            action: "Set a bedtime alarm for 10:30 PM to wind down earlier",
            impact: "high" as const
          },
          {
            title: "Fasting Glucose: Post-Meal Walks",
            reason: "Morning fasting glucose is slightly elevated (105 vs 95 mg/dL baseline)",
            action: "Try a 15-minute walk after dinner to improve glucose disposal",
            impact: "high" as const
          },
          {
            title: "HRV: Focus on Zone 2 Recovery",
            reason: "Heart rate variability (HRV) is 12% below your baseline - signals need for recovery",
            action: "Keep workouts in Zone 2 (conversational pace) this week to rebuild capacity",
            impact: "medium" as const
          }
        ],
        summary: "This week, focus on sleep recovery and metabolic control (glucose management)",
        week_start: weekStart.toISOString().split('T')[0]
      });
    } finally {
      setLoading(false);
    }
  };

  const getImpactBadge = (impact: string) => {
    const variants: Record<string, { class: string; label: string }> = {
      high: { class: "bg-destructive/20 text-destructive border-destructive/30", label: "High Impact" },
      medium: { class: "bg-accent/20 text-accent border-accent/30", label: "Medium Impact" },
      low: { class: "bg-primary/20 text-primary border-primary/30", label: "Low Impact" }
    };
    const variant = variants[impact] || variants.medium;
    return <Badge className={variant.class}>{variant.label}</Badge>;
  };

  const getIcon = (index: number) => {
    const icons = [AlertCircle, TrendingUp, Target];
    const Icon = icons[index] || Target;
    return <Icon className="h-5 w-5" />;
  };

  const togglePriorityComplete = (index: number) => {
    if (!plan) return;
    
    const updatedPriorities = [...plan.priorities];
    updatedPriorities[index] = {
      ...updatedPriorities[index],
      completed: !updatedPriorities[index].completed
    };
    
    setPlan({ ...plan, priorities: updatedPriorities });
    
    toast({
      title: updatedPriorities[index].completed ? "Priority completed! 🎉" : "Priority reopened",
      description: updatedPriorities[index].completed 
        ? "Great work staying on track with your BioPlan" 
        : "Keep pushing forward"
    });
  };

  const completedCount = plan?.priorities.filter(p => p.completed).length || 0;
  const totalCount = plan?.priorities.length || 0;
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  if (loading || !plan) {
    return (
      <Card className="p-8 gradient-card">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/2"></div>
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 gradient-card border-primary/30 shadow-neon">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-light mb-2">Your Weekly BioPlan</h2>
            <p className="text-muted-foreground text-sm">
              Week of {new Date(plan.week_start).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-light text-primary">{completedCount}/{totalCount}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Week Progress</span>
            <span className="font-medium">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>

        {plan.summary && (
          <p className="text-lg text-foreground/90 font-light italic border-l-4 border-primary pl-4">
            {plan.summary}
          </p>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Top {totalCount} Priorities</h3>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {completedCount} of {totalCount} done
            </Badge>
          </div>
          {plan.priorities.map((priority, index) => (
            <Card 
              key={index} 
              className={`p-6 transition-all duration-300 ${
                priority.completed 
                  ? 'bg-primary/5 border-primary/30 opacity-75' 
                  : 'bg-background/50 border-border/50 hover:border-primary/50'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`mt-0.5 h-6 w-6 rounded-full border-2 ${
                        priority.completed 
                          ? 'border-primary bg-primary text-primary-foreground' 
                          : 'border-muted-foreground/30'
                      }`}
                      onClick={() => togglePriorityComplete(index)}
                    >
                      {priority.completed && <CheckCircle2 className="h-4 w-4" />}
                    </Button>
                    <div className="flex-1">
                      <h4 className={`font-medium text-lg ${priority.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {priority.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{priority.reason}</p>
                    </div>
                  </div>
                  {getImpactBadge(priority.impact)}
                </div>
                
                <div className="pl-9 space-y-3">
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-sm">
                      <span className="font-medium text-primary">Action:</span> {priority.action}
                    </p>
                  </div>
                  
                  {priority.timeframe && (
                    <div className="flex items-start gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">
                        <span className="font-medium">Timeframe:</span> {priority.timeframe}
                      </span>
                    </div>
                  )}
                  
                  {priority.expectedOutcome && (
                    <div className="flex items-start gap-2 text-sm">
                      <Zap className="h-4 w-4 text-accent mt-0.5" />
                      <span className="text-muted-foreground">
                        <span className="font-medium text-accent">Expected Outcome:</span> {priority.expectedOutcome}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}