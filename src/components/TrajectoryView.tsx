import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Activity, Droplets, Moon, Heart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface TrendData {
  date: string;
  hrv: number;
  glucose: number;
  sleep: number;
  vo2max: number;
}

export function TrajectoryView() {
  const [data, setData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrajectoryData();
  }, []);

  const loadTrajectoryData = async () => {
    try {
      // Generate sample 12-week data for demo
      const weeks = 12;
      const sampleData: TrendData[] = [];
      const today = new Date();

      for (let i = weeks - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * 7));
        
        sampleData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          hrv: 45 + Math.random() * 25 + (weeks - i) * 0.5, // Improving trend
          glucose: 95 + Math.random() * 10 - (weeks - i) * 0.3, // Improving (decreasing)
          sleep: 7 + Math.random() * 1.5,
          vo2max: 35 + Math.random() * 5 + (weeks - i) * 0.4 // Improving trend
        });
      }

      setData(sampleData);
    } catch (error) {
      console.error('Error loading trajectory:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrend = (data: TrendData[], key: keyof TrendData) => {
    if (data.length < 2) return "stable";
    const recent = data.slice(-4).map(d => d[key] as number);
    const older = data.slice(-8, -4).map(d => d[key] as number);
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    
    const change = ((recentAvg - olderAvg) / olderAvg) * 100;
    
    if (Math.abs(change) < 3) return "stable";
    return change > 0 ? "improving" : "declining";
  };

  const getTrendBadge = (trend: string, metric: string) => {
    // For glucose, declining is good
    const isGlucose = metric === "glucose";
    const isImproving = isGlucose ? trend === "declining" : trend === "improving";
    
    if (isImproving) {
      return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Improving</Badge>;
    }
    if (trend === "stable") {
      return <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Stable</Badge>;
    }
    return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Declining</Badge>;
  };

  const metrics = [
    { key: "hrv" as const, label: "HRV", icon: Activity, color: "#00D4FF", unit: "ms" },
    { key: "glucose" as const, label: "Fasting Glucose", icon: Droplets, color: "#FF6B9D", unit: "mg/dL" },
    { key: "sleep" as const, label: "Sleep Duration", icon: Moon, color: "#9D4EDD", unit: "hrs" },
    { key: "vo2max" as const, label: "VO₂ Max", icon: Heart, color: "#06FFA5", unit: "ml/kg/min" }
  ];

  if (loading) {
    return (
      <Card className="p-8 gradient-card">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 gradient-card border-primary/30 shadow-neon">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-light mb-2">12-Week Trajectory</h2>
          <p className="text-sm text-muted-foreground">
            Track your progress over time
          </p>
        </div>

        {/* Trend Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const trend = getTrend(data, metric.key);
            return (
              <Card key={metric.key} className="p-4 bg-background/50 border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4" style={{ color: metric.color }} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                {getTrendBadge(trend, metric.key)}
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="space-y-8">
          {metrics.map((metric) => (
            <div key={metric.key}>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <metric.icon className="h-5 w-5" style={{ color: metric.color }} />
                {metric.label}
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)} ${metric.unit}`, metric.label]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={metric.key} 
                    stroke={metric.color}
                    strokeWidth={2}
                    dot={{ fill: metric.color, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}