import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Target, Droplets, Activity, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Action {
  id: string;
  title: string;
  description: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  category: 'hydration' | 'movement' | 'nutrition' | 'recovery';
  timeRemaining?: number;
  completed?: boolean;
  metric: {
    name: string;
    current: string;
    target: string;
  };
}

export function RealTimeActions() {
  const { toast } = useToast();
  const [actions, setActions] = useState<Action[]>([
    {
      id: '1',
      title: 'Hydration Boost Needed',
      description: 'Drink 14.2 fl oz water within next 8 minutes to optimize your energy levels',
      urgency: 'high',
      category: 'hydration',
      timeRemaining: 480, // 8 minutes in seconds
      metric: {
        name: 'Hydration Level',
        current: '68%',
        target: '75%'
      }
    },
    {
      id: '2', 
      title: 'Movement Break Time',
      description: 'Take a 4-minute walk to boost your metabolism and improve glucose processing',
      urgency: 'medium',
      category: 'movement',
      timeRemaining: 300,
      metric: {
        name: 'Blood Glucose',
        current: '94 mg/dL',
        target: '< 90 mg/dL'
      }
    },
    {
      id: '3',
      title: 'Protein Synthesis Window',
      description: 'Consume 18g protein within 45 minutes for muscle recovery',
      urgency: 'low',
      category: 'nutrition',
      timeRemaining: 2700,
      metric: {
        name: 'Daily Protein',
        current: '47g',
        target: '65g'
      }
    }
  ]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActions(prev => prev.map(action => {
        if (action.timeRemaining && action.timeRemaining > 0 && !action.completed) {
          const newTime = action.timeRemaining - 1;
          
          // Alert when time is almost up
          if (newTime === 60 && action.urgency === 'high') {
            toast({
              title: "⚡ Action Required",
              description: `${action.title} - Only 1 minute remaining!`,
              variant: "destructive",
            });
          }
          
          return { ...action, timeRemaining: newTime };
        }
        return action;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [toast]);

  // Add new actions periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newActions = [
        {
          id: Date.now().toString(),
          title: 'Heart Rate Variability Detected',
          description: 'Practice 2-minute breathing exercise to optimize autonomic balance',
          urgency: 'medium' as const,
          category: 'recovery' as const,
          timeRemaining: 180,
          metric: {
            name: 'HRV Score',
            current: '42ms',
            target: '> 50ms'
          }
        },
        {
          id: (Date.now() + 1).toString(),
          title: 'Circadian Alignment',
          description: 'Dim lights by 60% to prepare for optimal sleep onset',
          urgency: 'low' as const,
          category: 'recovery' as const,
          timeRemaining: 5400,
          metric: {
            name: 'Sleep Readiness',
            current: '72%',
            target: '> 85%'
          }
        }
      ];

      // Randomly add new action
      if (Math.random() > 0.7) {
        const randomAction = newActions[Math.floor(Math.random() * newActions.length)];
        setActions(prev => {
          if (prev.length >= 5) return prev; // Max 5 actions
          if (prev.some(a => a.title === randomAction.title)) return prev; // No duplicates
          return [...prev, randomAction];
        });
      }
    }, 45000); // Every 45 seconds

    return () => clearInterval(interval);
  }, []);

  const completeAction = (id: string) => {
    setActions(prev => prev.map(action => 
      action.id === id ? { ...action, completed: true } : action
    ));
    
    toast({
      title: "✓ Action Completed",
      description: "Your biomarkers will be recalibrated based on this intervention.",
    });

    // Remove completed actions after 3 seconds
    setTimeout(() => {
      setActions(prev => prev.filter(action => action.id !== id));
    }, 3000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'high': return 'border-orange-500 bg-orange-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hydration': return <Droplets className="h-4 w-4" />;
      case 'movement': return <Activity className="h-4 w-4" />;
      case 'nutrition': return <Target className="h-4 w-4" />;
      case 'recovery': return <Moon className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-primary pulse-data" />
        <h3 className="text-lg font-medium">Smart Health Actions</h3>
        <Badge variant="outline" className="text-sm font-medium text-black dark:text-white">
          {actions.filter(a => !a.completed).length} active
        </Badge>
      </div>

      <div className="space-y-3">
        {actions.map((action) => (
          <Card 
            key={action.id}
            className={`p-4 transition-all duration-300 elite-hover ${
              action.completed 
                ? 'bg-green-50 border-green-200 opacity-60' 
                : getUrgencyColor(action.urgency)
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(action.category)}
                  <h4 className="font-medium text-sm text-black dark:text-white">{action.title}</h4>
                  <Badge 
                    variant={action.urgency === 'high' ? 'destructive' : 'outline'}
                    className="text-sm font-medium text-black dark:text-white"
                  >
                    {action.urgency}
                  </Badge>
                </div>
                
                <p className="text-sm text-black dark:text-white mb-3">
                  {action.description}
                </p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-black dark:text-white">Current:</span>
                    <span className="font-mono text-black dark:text-white">{action.metric.current}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-black dark:text-white">Target:</span>
                    <span className="font-mono text-primary">{action.metric.target}</span>
                  </div>
                  {action.timeRemaining && action.timeRemaining > 0 && !action.completed && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-mono font-medium text-sm text-black dark:text-white">
                        {formatTime(action.timeRemaining)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {action.completed ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium text-black dark:text-white">Complete</span>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant={action.urgency === 'high' ? 'default' : 'outline'}
                    onClick={() => completeAction(action.id)}
                    className="text-xs"
                  >
                    Mark Done
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}