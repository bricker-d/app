import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Activity,
  Zap
} from "lucide-react";
import { format, subDays, subHours } from "date-fns";

interface DataPoint {
  timestamp: string;
  value: number;
  status?: 'optimal' | 'warning' | 'critical';
  source?: string;
}

interface MetricChartProps {
  title: string;
  data: DataPoint[];
  unit: string;
  target?: number;
  normalRange?: { min: number; max: number };
  color?: string;
  timeRange?: '24h' | '7d' | '30d' | '90d';
  showTrend?: boolean;
  insights?: string[];
}

const timeRanges = {
  '24h': { label: '24 Hours', days: 1 },
  '7d': { label: '7 Days', days: 7 },
  '30d': { label: '30 Days', days: 30 },
  '90d': { label: '90 Days', days: 90 }
};

// Generate demo data for different time ranges
const generateDemoData = (days: number, baseValue: number, variance: number): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  
  for (let i = days * 24; i >= 0; i--) {
    const timestamp = format(subHours(now, i), 'yyyy-MM-dd HH:mm');
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, baseValue + randomVariance);
    
    data.push({
      timestamp,
      value: Math.round(value * 10) / 10,
      status: value > baseValue * 1.1 ? 'critical' : value > baseValue * 0.9 ? 'optimal' : 'warning',
      source: Math.random() > 0.8 ? 'device' : 'manual'
    });
  }
  
  return data;
};

export function MetricChart({
  title,
  data: providedData,
  unit,
  target,
  normalRange,
  color = "#3b82f6",
  timeRange = '7d',
  showTrend = true,
  insights = []
}: MetricChartProps) {
  const [activeTimeRange, setActiveTimeRange] = useState(timeRange);
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  // Use provided data or generate demo data
  const data = useMemo(() => {
    if (providedData && providedData.length > 0) {
      return providedData;
    }
    
    // Generate demo data based on metric type
    const baseValue = target || 50;
    const variance = baseValue * 0.3;
    
    return generateDemoData(timeRanges[activeTimeRange].days, baseValue, variance);
  }, [providedData, activeTimeRange, target]);

  // Calculate trend and statistics
  const trend = useMemo(() => {
    if (data.length < 2) return { direction: 'stable', percentage: 0 };
    
    const recent = data.slice(-7).reduce((sum, point) => sum + point.value, 0) / 7;
    const previous = data.slice(-14, -7).reduce((sum, point) => sum + point.value, 0) / 7;
    
    const change = ((recent - previous) / previous) * 100;
    
    return {
      direction: change > 5 ? 'up' : change < -5 ? 'down' : 'stable',
      percentage: Math.abs(Math.round(change * 10) / 10)
    };
  }, [data]);

  const latestValue = data[data.length - 1]?.value || 0;
  const average = data.reduce((sum, point) => sum + point.value, 0) / data.length;

  const TrendIcon = trend.direction === 'up' ? TrendingUp : 
                   trend.direction === 'down' ? TrendingDown : Minus;

  const getTrendColor = () => {
    if (trend.direction === 'stable') return 'text-gray-500';
    return trend.direction === 'up' ? 'text-green-500' : 'text-red-500';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{format(new Date(label), 'MMM dd, HH:mm')}</p>
          <p className="text-primary">
            {title}: {payload[0].value} {unit}
          </p>
          {data.source && (
            <p className="text-xs text-muted-foreground">Source: {data.source}</p>
          )}
          {data.status && (
            <Badge 
              variant={data.status === 'optimal' ? 'default' : 'destructive'}
              className="mt-1"
            >
              {data.status}
            </Badge>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-effect border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            <CardDescription>
              Current: {latestValue} {unit} • Average: {Math.round(average * 10) / 10} {unit}
            </CardDescription>
          </div>
          
          {showTrend && (
            <div className="flex items-center gap-2">
              <TrendIcon className={`h-4 w-4 ${getTrendColor()}`} />
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {trend.percentage}%
              </span>
            </div>
          )}
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          {Object.entries(timeRanges).map(([key, range]) => (
            <Button
              key={key}
              variant={activeTimeRange === key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTimeRange(key as keyof typeof timeRanges)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={chartType} onValueChange={(value) => setChartType(value as 'line' | 'area')}>
          <TabsList className="mb-4">
            <TabsTrigger value="area">Area Chart</TabsTrigger>
            <TabsTrigger value="line">Line Chart</TabsTrigger>
          </TabsList>

          <TabsContent value="area" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="timestamp"
                  tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                  stroke="#6b7280"
                />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Reference lines for normal range */}
                {normalRange && (
                  <>
                    <ReferenceLine 
                      y={normalRange.min} 
                      stroke="#ef4444" 
                      strokeDasharray="5 5"
                      label="Min Normal"
                    />
                    <ReferenceLine 
                      y={normalRange.max} 
                      stroke="#ef4444" 
                      strokeDasharray="5 5"
                      label="Max Normal"
                    />
                  </>
                )}
                
                {/* Target line */}
                {target && (
                  <ReferenceLine 
                    y={target} 
                    stroke="#10b981" 
                    strokeDasharray="3 3"
                    label="Target"
                  />
                )}
                
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  fill={color}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="line" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="timestamp"
                  tickFormatter={(value) => format(new Date(value), 'MMM dd')}
                  stroke="#6b7280"
                />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Reference lines */}
                {normalRange && (
                  <>
                    <ReferenceLine y={normalRange.min} stroke="#ef4444" strokeDasharray="5 5" />
                    <ReferenceLine y={normalRange.max} stroke="#ef4444" strokeDasharray="5 5" />
                  </>
                )}
                
                {target && (
                  <ReferenceLine y={target} stroke="#10b981" strokeDasharray="3 3" />
                )}
                
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={3}
                  dot={{ fill: color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>

        {/* Insights Section */}
        {insights.length > 0 && (
          <div className="mt-6 space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Key Insights
            </h4>
            <div className="space-y-2">
              {insights.map((insight, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg bg-muted/50 border border-primary/20 text-sm"
                >
                  {insight}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-lg font-medium">{latestValue}</div>
            <div className="text-xs text-muted-foreground">Current</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-lg font-medium">{Math.round(average * 10) / 10}</div>
            <div className="text-xs text-muted-foreground">Average</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-lg font-medium">{Math.max(...data.map(d => d.value))}</div>
            <div className="text-xs text-muted-foreground">Peak</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/30">
            <div className="text-lg font-medium">{Math.min(...data.map(d => d.value))}</div>
            <div className="text-xs text-muted-foreground">Low</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}