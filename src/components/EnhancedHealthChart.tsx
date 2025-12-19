import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Calendar, Download, Share2, Maximize2 } from "lucide-react";
import { ChartSkeleton } from "./LoadingStates";

interface MetricData {
  timestamp: string;
  value: number;
  target?: number;
  status: 'optimal' | 'warning' | 'critical';
}

interface EnhancedHealthChartProps {
  title: string;
  description?: string;
  data: MetricData[];
  metric: string;
  unit: string;
  loading?: boolean;
  timeRange?: '24h' | '7d' | '30d' | '90d';
  onTimeRangeChange?: (range: string) => void;
  showComparison?: boolean;
  chartType?: 'line' | 'area' | 'bar';
}

export function EnhancedHealthChart({
  title,
  description,
  data,
  metric,
  unit,
  loading = false,
  timeRange = '7d',
  onTimeRangeChange,
  showComparison = false,
  chartType = 'line'
}: EnhancedHealthChartProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  if (loading) {
    return (
      <Card className="glass-effect border-white/20">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <ChartSkeleton />
        </CardContent>
      </Card>
    );
  }

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const change = currentValue - previousValue;
  const changePercent = previousValue ? (change / previousValue) * 100 : 0;
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

  const averageValue = data.reduce((sum, item) => sum + item.value, 0) / data.length;
  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1} 
              fill="url(#colorMetric)" 
              strokeWidth={2}
            />
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
            />
            {showComparison && (
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            )}
          </LineChart>
        );
    }
  };

  return (
    <Card className="glass-effect border-white/20 elite-hover">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {title}
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={onTimeRangeChange}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24H</SelectItem>
                <SelectItem value="7d">7D</SelectItem>
                <SelectItem value="30d">30D</SelectItem>
                <SelectItem value="90d">90D</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold flex items-center justify-center gap-1">
              {currentValue.toFixed(1)}
              <span className="text-sm text-muted-foreground">{unit}</span>
            </p>
            <p className="text-xs text-muted-foreground">Current</p>
          </div>
          <div className="text-center">
            <div className={`flex items-center justify-center gap-1 ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
              {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="font-medium">{Math.abs(changePercent).toFixed(1)}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Change</p>
          </div>
          <div className="text-center">
            <p className="font-medium">{averageValue.toFixed(1)} {unit}</p>
            <p className="text-xs text-muted-foreground">Average</p>
          </div>
          <div className="text-center">
            <Badge variant="outline" className={getStatusColor(data[data.length - 1]?.status || 'optimal')}>
              {data[data.length - 1]?.status || 'optimal'}
            </Badge>
            <p className="text-xs text-muted-foreground">Status</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Minimum</p>
                  <p className="text-lg font-semibold">{minValue.toFixed(1)} {unit}</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Maximum</p>
                  <p className="text-lg font-semibold">{maxValue.toFixed(1)} {unit}</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Range</p>
                  <p className="text-lg font-semibold">{(maxValue - minValue).toFixed(1)} {unit}</p>
                </div>
              </Card>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <h4 className="font-medium text-primary mb-2">AI Insight</h4>
                <p className="text-sm">Your {metric} levels show consistent improvement over the past week, with 15% better stability during peak hours.</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <h4 className="font-medium text-accent mb-2">Pattern Recognition</h4>
                <p className="text-sm">Data suggests optimal readings occur between 10 AM - 2 PM. Consider timing important activities during this window.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}