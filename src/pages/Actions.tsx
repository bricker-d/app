import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Clock, CheckCircle, Target, Droplets, Moon, TrendingUp, AlertCircle, Zap, Brain, Utensils, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/hooks/useNotifications";

interface Action {
  id: string;
  instruction: string;
  headline: string;
  rationale: string;
  impact: string;
  impactValue: number;
  urgency: 'high' | 'medium' | 'low';
  category: 'hydration' | 'movement' | 'nutrition' | 'recovery';
  status: 'pending' | 'done' | 'snoozed';
  timestamp: Date;
  timeSensitivity: string;
  contextualTiming: string[];
}

const Actions = () => {
  const { toast } = useToast();
  const { notificationState, requestPermission, scheduleSmartNotifications, showInstantNotification } = useNotifications();
  
  const [actions, setActions] = useState<Action[]>([
    {
      id: '1',
      instruction: 'Drink 14 oz water',
      headline: 'Hydration is low — glucose clearance may suffer',
      rationale: 'Your hydration is 22% below optimal levels for this time of day',
      impact: '↑ cognitive function by 15%',
      impactValue: 15,
      urgency: 'high',
      category: 'hydration',
      status: 'pending',
      timestamp: new Date(),
      timeSensitivity: 'Best done within 20 min',
      contextualTiming: ['Now', 'Before workout', 'After lunch']
    },
    {
      id: '2',
      instruction: 'Take a 5-minute walk',
      headline: 'Glucose trending high post-meal',
      rationale: "You've been sitting for 58 minutes - movement helps your body process glucose",
      impact: '↑ glucose clearance by 18%',
      impactValue: 18,
      urgency: 'high',
      category: 'movement',
      status: 'pending',
      timestamp: new Date(Date.now() - 300000),
      timeSensitivity: 'Do before next meal',
      contextualTiming: ['Now', 'Before lunch', 'After work']
    },
    {
      id: '3',
      instruction: 'Add 25g protein at next meal',
      headline: 'Protein intake below recovery threshold',
      rationale: 'Hit 0.4g/kg per meal to support recovery and muscle synthesis',
      impact: '↓ muscle breakdown by 12%',
      impactValue: 12,
      urgency: 'medium',
      category: 'nutrition',
      status: 'pending',
      timestamp: new Date(Date.now() - 600000),
      timeSensitivity: 'At next meal',
      contextualTiming: ['At breakfast', 'At lunch', 'At dinner']
    },
    {
      id: '4',
      instruction: 'Start wind-down routine',
      headline: 'Sleep efficiency needs improvement',
      rationale: '60 min pre-bed protocol improves HRV and sleep quality',
      impact: '↑ HRV by +8ms',
      impactValue: 8,
      urgency: 'medium',
      category: 'recovery',
      status: 'pending',
      timestamp: new Date(Date.now() - 900000),
      timeSensitivity: 'Do before 10:10 PM',
      contextualTiming: ['Tonight at 8 PM', 'Tonight at 9 PM', 'Before bed']
    }
  ]);

  const [proactiveSuggestions] = useState([
    {
      id: 'ps1',
      text: "You're trending low on protein this week — consider a 30g breakfast tomorrow",
      category: 'nutrition',
      impact: 'Could improve recovery by 8-12%'
    },
    {
      id: 'ps2',
      text: "Your best glucose responses happen with 10-min post-meal walks — try 3x tomorrow",
      category: 'movement',
      impact: 'Expected glucose stability improvement: 14%'
    }
  ]);

  const completeAction = (actionId: string) => {
    setActions(prev => prev.map(action => 
      action.id === actionId ? { ...action, status: 'done' } : action
    ));
    
    showInstantNotification(
      "Action completed!", 
      "Great job! Your biomarkers will be recalibrated based on this intervention."
    );
    
    toast({
      title: "Action completed!",
      description: "Your biomarkers will be recalibrated based on this intervention.",
    });
  };

  const snoozeAction = (actionId: string, timing: string) => {
    setActions(prev => prev.map(action => 
      action.id === actionId ? { 
        ...action, 
        status: 'snoozed', 
        timestamp: new Date(Date.now() + 3600000)
      } : action
    ));
    
    toast({
      title: `Scheduled for ${timing}`,
      description: "We'll remind you at the right time.",
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hydration': return Droplets;
      case 'movement': return Activity;
      case 'nutrition': return Utensils;
      case 'recovery': return Moon;
      default: return Activity;
    }
  };

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'high': 
        return {
          border: 'border-l-destructive',
          bg: 'bg-destructive/5',
          badge: 'bg-destructive',
          glow: 'animate-pulse shadow-lg shadow-destructive/20'
        };
      case 'medium':
        return {
          border: 'border-l-amber-500',
          bg: 'bg-amber-500/5',
          badge: 'bg-amber-500',
          glow: ''
        };
      case 'low':
        return {
          border: 'border-l-primary',
          bg: 'bg-primary/5',
          badge: 'bg-primary',
          glow: ''
        };
      default:
        return {
          border: 'border-l-border',
          bg: 'bg-secondary/5',
          badge: 'bg-secondary',
          glow: ''
        };
    }
  };

  const pendingActions = actions.filter(a => a.status === 'pending').sort((a, b) => b.impactValue - a.impactValue);
  const completedActions = actions.filter(a => a.status === 'done');
  const totalImpact = pendingActions.reduce((sum, a) => sum + a.impactValue, 0);
  const avgImpact = pendingActions.length > 0 ? Math.round(totalImpact / pendingActions.length) : 0;

  useEffect(() => {
    if (notificationState.permission === 'granted' && pendingActions.length > 0) {
      scheduleSmartNotifications(pendingActions);
    }
  }, [pendingActions.length, notificationState.permission, scheduleSmartNotifications]);

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
                <Button variant="ghost" size="sm" className="font-normal text-primary">Actions</Button>
              </Link>
              <Link to="/history">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">History</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-3">Today's Health Actions</h1>
          <p className="text-lg text-muted-foreground">
            Real-time coaching based on your biomarkers and behavior patterns
          </p>
        </div>

        {/* Smart Priorities Summary Bar */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-medium mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Smart Priorities
              </h2>
              <p className="text-sm text-muted-foreground">Optimized order based on impact and timing</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-primary">{pendingActions.length}</div>
              <div className="text-sm text-muted-foreground">actions pending</div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Projected readiness boost</span>
                <span className="text-sm font-medium text-primary">+{avgImpact}%</span>
              </div>
              <Progress value={(avgImpact / 20) * 100} className="h-2" />
            </div>
            <div className="text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 inline mr-1 text-primary" />
              Complete all to optimize today's performance
            </div>
          </div>
        </Card>

        {/* Notification Banner */}
        {notificationState.supported && notificationState.permission !== 'granted' && (
          <Card className="p-5 mb-6 border-l-4 border-l-primary bg-primary/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-primary mb-1">Enable Smart Notifications</h3>
                <p className="text-sm text-foreground">Get timely reminders based on urgency and optimal timing</p>
              </div>
              <Button 
                onClick={requestPermission}
                className="bg-primary hover:bg-primary/90"
              >
                Enable
              </Button>
            </div>
          </Card>
        )}

        {/* Pending Actions - Premium Design */}
        {pendingActions.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Action Required
            </h2>
            
            <div className="space-y-6">
              {pendingActions.map((action, index) => {
                const Icon = getCategoryIcon(action.category);
                const styles = getUrgencyStyles(action.urgency);
                
                return (
                  <Card 
                    key={action.id} 
                    className={`p-6 border-l-4 ${styles.border} ${styles.bg} ${styles.glow} hover:shadow-xl transition-all`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        {/* Priority Badge & Time Sensitivity */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="text-xs font-semibold">
                              #{index + 1} Priority
                            </Badge>
                            <Badge className={`${styles.badge} text-primary-foreground text-xs`}>
                              {action.urgency.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {action.timeSensitivity}
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Headline */}
                        <h3 className="text-lg font-semibold mb-2">{action.headline}</h3>
                        
                        {/* Instruction */}
                        <p className="font-medium text-base mb-2">{action.instruction}</p>
                        
                        {/* Rationale */}
                        <p className="text-sm text-muted-foreground mb-3">{action.rationale}</p>
                        
                        {/* Impact Metric */}
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm font-semibold text-primary">Predicted Impact:</span>
                          <span className="text-sm font-medium">{action.impact}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-3 shrink-0">
                        <Button 
                          onClick={() => completeAction(action.id)}
                          className="bg-primary hover:bg-primary/90 hover:scale-105 transition-transform px-6"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete
                        </Button>
                        
                        {/* Contextual Timing Options */}
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground text-center">Schedule for:</p>
                          {action.contextualTiming.map((timing, idx) => (
                            <Button 
                              key={idx}
                              size="sm" 
                              variant="outline"
                              onClick={() => snoozeAction(action.id, timing)}
                              className="w-full text-xs hover:scale-105 transition-transform"
                            >
                              {timing}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Proactive Suggestions */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/30">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-medium">Proactive Suggestions</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Optional actions based on your trending patterns and historical data
          </p>
          
          <div className="space-y-4">
            {proactiveSuggestions.map((suggestion) => {
              const Icon = getCategoryIcon(suggestion.category);
              return (
                <div 
                  key={suggestion.id}
                  className="p-4 rounded-lg bg-background/50 border border-accent/20 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-accent mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-2">{suggestion.text}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Brain className="h-3 w-3" />
                        <span>{suggestion.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Completed Actions */}
        {completedActions.length > 0 && (
          <div>
            <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Completed Today
            </h2>
            
            <div className="space-y-3">
              {completedActions.map((action) => {
                const Icon = getCategoryIcon(action.category);
                return (
                  <Card key={action.id} className="p-4 bg-primary/5 border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{action.instruction}</p>
                          <p className="text-xs text-muted-foreground mt-1">{action.impact}</p>
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Actions;
