import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Target, Activity, TrendingUp, AlertTriangle, CheckCircle, Clock, Moon } from 'lucide-react';

interface Insight {
  id: string;
  type: 'recommendation' | 'warning' | 'achievement' | 'prediction';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: 'nutrition' | 'exercise' | 'sleep' | 'stress' | 'recovery';
  action?: string;
  timeframe?: string;
}

interface HealthInsightsProps {
  insights: Insight[];
  title?: string;
  showActions?: boolean;
}

export function HealthInsights({ 
  insights, 
  title = "AI Health Insights",
  showActions = true 
}: HealthInsightsProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'recommendation': return <Brain className="h-4 w-4 text-primary" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'achievement': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'prediction': return <TrendingUp className="h-4 w-4 text-accent" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    const IconComponent = (() => {
      switch (category) {
        case 'nutrition': return Activity;
        case 'exercise': return TrendingUp;
        case 'sleep': return Moon;
        case 'stress': return Brain;
        case 'recovery': return Zap;
        default: return Activity;
      }
    })();
    return <IconComponent className="h-4 w-4" />;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recommendation': return 'border-l-primary bg-primary/5';
      case 'warning': return 'border-l-warning bg-warning/5';
      case 'achievement': return 'border-l-success bg-success/5';
      case 'prediction': return 'border-l-accent bg-accent/5';
      default: return 'border-l-muted';
    }
  };

  return (
    <Card className="p-6 gradient-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
          {insights.length} insights
        </Badge>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <Card 
            key={insight.id} 
            className={`p-5 border-l-4 ${getTypeColor(insight.type)} elite-hover`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {getInsightIcon(insight.type)}
                  <span className="text-lg font-medium">{insight.title}</span>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(insight.category)}
                    <Badge
                      variant="outline" 
                      className={`text-xs ${getImpactColor(insight.impact)}`}
                    >
                      {insight.impact} impact
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                </div>
                
                <p className="text-foreground/80 leading-relaxed mb-3">
                  {insight.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {insight.timeframe && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{insight.timeframe}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    <span className="capitalize">{insight.category}</span>
                  </div>
                </div>
              </div>

              {showActions && insight.action && (
                <div className="ml-4">
                  <Button size="sm" variant="outline" className="whitespace-nowrap">
                    {insight.action}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {insights.length === 0 && (
        <div className="text-center py-12">
          <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h4 className="text-lg font-medium text-muted-foreground mb-2">
            No insights available yet
          </h4>
          <p className="text-sm text-muted-foreground">
            Add more health data to unlock personalized AI insights
          </p>
        </div>
      )}
    </Card>
  );
}