import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Activity, Moon, Flame } from "lucide-react";

export const LiveDashboardDemo = () => {
  const [metrics, setMetrics] = useState({
    glucose: 92,
    hrv: 68,
    sleep: 7.2,
    steps: 8420,
  });

  const [score, setScore] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        glucose: 88 + Math.random() * 8,
        hrv: 65 + Math.random() * 10,
        sleep: 6.8 + Math.random() * 0.8,
        steps: 8000 + Math.random() * 1000,
      });
      setScore(Math.floor(75 + Math.random() * 8));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="p-8 gradient-card border-primary/30 shadow-strong">
        {/* Score */}
        <div className="text-center mb-8">
          <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            BioPrecision Score
          </div>
          <div className="text-8xl font-light text-primary mb-2 transition-all duration-1000">
            {score}
          </div>
          <div className="text-sm text-accent flex items-center justify-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>+5 this week</span>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 transition-all duration-1000">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Glucose</span>
              <Flame className="h-5 w-5 text-success" />
            </div>
            <div className="text-3xl font-light">{metrics.glucose.toFixed(0)}</div>
            <div className="text-xs text-muted-foreground mt-1">mg/dL</div>
          </div>

          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 transition-all duration-1000">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">HRV</span>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="text-3xl font-light">{metrics.hrv.toFixed(0)}</div>
            <div className="text-xs text-muted-foreground mt-1">ms</div>
          </div>

          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 transition-all duration-1000">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Sleep</span>
              <Moon className="h-5 w-5 text-accent" />
            </div>
            <div className="text-3xl font-light">{metrics.sleep.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground mt-1">hours</div>
          </div>

          <div className="p-5 rounded-xl bg-secondary/50 border border-border/50 transition-all duration-1000">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Steps</span>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div className="text-3xl font-light">{metrics.steps.toFixed(0)}</div>
            <div className="text-xs text-muted-foreground mt-1">today</div>
          </div>
        </div>

        {/* Live Notification */}
        <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/30 animate-pulse">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-primary mt-2 animate-pulse" />
            <div>
              <div className="text-sm font-medium mb-1">Glucose trending up</div>
              <div className="text-xs text-muted-foreground">
                Walk 10 minutes after your next meal to stabilize
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
