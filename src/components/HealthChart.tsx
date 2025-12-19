import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Area, AreaChart, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DataPoint {
  time: string;
  value: number;
  baseline?: number;
  target?: number;
  status?: 'good' | 'warning' | 'danger';
}

interface HealthChartProps {
  title: string;
  data: DataPoint[];
  color?: string;
  unit?: string;
  icon?: React.ReactNode;
  showBaseline?: boolean;
  showTarget?: boolean;
  height?: number;
  trend?: 'up' | 'down' | 'stable';
  currentValue?: number;
  insights?: string[];
}

export function HealthChart({
  title,
  data,
  color = "hsl(var(--primary))",
  unit = "",
  icon = <Activity className="h-4 w-4" />,
  showBaseline = false,
  showTarget = false,
  height = 300,
  trend = 'stable',
  currentValue,
  insights = []
}: HealthChartProps) {
  const latestValue = currentValue || data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const percentChange = previousValue ? ((latestValue - previousValue) / previousValue * 100) : 0;

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-destructive" />;
      default: return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-effect p-4 rounded-lg border border-border shadow-glow">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-lg font-semibold" style={{ color }}>
            {payload[0].value}{unit}
          </p>
          {data.baseline && (
            <p className="text-xs text-muted-foreground">
              Baseline: {data.baseline}{unit}
            </p>
          )}
          {data.target && (
            <p className="text-xs text-muted-foreground">
              Target: {data.target}{unit}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 elite-hover gradient-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-light">{latestValue}{unit}</span>
              {getTrendIcon()}
              <Badge variant="outline" className={`text-xs ${getTrendColor()}`}>
                {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}%
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: `${height}px` }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {showBaseline && data[0]?.baseline && (
              <ReferenceLine 
                y={data[0].baseline} 
                stroke="hsl(var(--muted-foreground))" 
                strokeDasharray="5 5"
                label={{ value: "Baseline", position: "right" }}
              />
            )}
            
            {showTarget && data[0]?.target && (
              <ReferenceLine 
                y={data[0].target} 
                stroke={color}
                strokeDasharray="3 3"
                label={{ value: "Target", position: "right" }}
              />
            )}
            
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${title})`}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'hsl(var(--background))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Key Insights</h4>
          <div className="space-y-1">
            {insights.map((insight, index) => (
              <p key={index} className="text-sm text-foreground/80 leading-relaxed">
                • {insight}
              </p>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}