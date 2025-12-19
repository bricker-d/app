import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Calendar,
  Lightbulb,
  Activity,
  Heart,
  Clock
} from "lucide-react";

interface Prediction {
  id: string;
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  type: 'improvement' | 'warning' | 'optimal' | 'neutral';
  metric: string;
  currentValue: number;
  predictedValue: number;
  unit: string;
  recommendations: string[];
  impact: 'low' | 'medium' | 'high';
}

interface ForecastData {
  date: string;
  actual?: number;
  predicted: number;
  confidence: number;
}

const samplePredictions: Prediction[] = [
  {
    id: '1',
    title: 'Sleep Quality Improvement',
    description: 'Based on your recent activity patterns and sleep hygiene improvements, your sleep efficiency is projected to increase significantly.',
    confidence: 85,
    timeframe: '2 weeks',
    type: 'improvement',
    metric: 'Sleep Efficiency',
    currentValue: 78,
    predictedValue: 87,
    unit: '%',
    recommendations: [
      'Continue consistent bedtime routine',
      'Maintain room temperature at 67-69°F',
      'Limit blue light exposure 2 hours before bed'
    ],
    impact: 'high'
  },
  {
    id: '2',
    title: 'HRV Recovery Alert',
    description: 'Current training load and stress levels suggest a potential decline in heart rate variability if current patterns continue.',
    confidence: 92,
    timeframe: '5 days',
    type: 'warning',
    metric: 'HRV',
    currentValue: 58,
    predictedValue: 48,
    unit: 'ms',
    recommendations: [
      'Reduce training intensity by 20%',
      'Increase meditation practice to 15 min/day',
      'Prioritize 8+ hours of sleep',
      'Consider a rest day in the next 2 days'
    ],
    impact: 'high'
  },
  {
    id: '3',
    title: 'Hydration Optimization',
    description: 'Your hydration patterns show room for improvement. Optimizing intake timing could enhance performance by 12%.',
    confidence: 76,
    timeframe: '1 week',
    type: 'improvement',
    metric: 'Hydration Efficiency',
    currentValue: 68,
    predictedValue: 81,
    unit: '%',
    recommendations: [
      'Pre-hydrate 2 hours before exercise',
      'Add electrolytes to morning water',
      'Set hourly hydration reminders'
    ],
    impact: 'medium'
  },
  {
    id: '4',
    title: 'Metabolic Flexibility Plateau',
    description: 'Your glucose response patterns indicate excellent metabolic adaptation. Continue current protocols to maintain optimal state.',
    confidence: 89,
    timeframe: 'Ongoing',
    type: 'optimal',
    metric: 'Glucose Variability',
    currentValue: 15,
    predictedValue: 14,
    unit: 'mg/dL',
    recommendations: [
      'Maintain current meal timing',
      'Continue post-meal walking routine',
      'Keep protein intake at 1.6g/kg body weight'
    ],
    impact: 'medium'
  }
];

const forecastData: ForecastData[] = [
  { date: '2024-10-15', actual: 78, predicted: 78, confidence: 100 },
  { date: '2024-10-16', actual: 79, predicted: 79, confidence: 98 },
  { date: '2024-10-17', actual: 77, predicted: 78, confidence: 96 },
  { date: '2024-10-18', actual: 80, predicted: 79, confidence: 94 },
  { date: '2024-10-19', actual: 82, predicted: 81, confidence: 92 },
  { date: '2024-10-20', predicted: 83, confidence: 89 },
  { date: '2024-10-21', predicted: 84, confidence: 86 },
  { date: '2024-10-22', predicted: 85, confidence: 83 },
  { date: '2024-10-23', predicted: 86, confidence: 80 },
  { date: '2024-10-24', predicted: 87, confidence: 77 },
  { date: '2024-10-25', predicted: 87, confidence: 74 },
  { date: '2024-10-26', predicted: 88, confidence: 71 }
];

export function PredictiveInsights() {
  const [selectedMetric, setSelectedMetric] = useState('sleep');
  const [selectedTimeframe, setSelectedTimeframe] = useState('2week');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'improvement': return <TrendingUp className="h-4 w-4 text-success" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'optimal': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'improvement': return 'border-success bg-success/10';
      case 'warning': return 'border-warning bg-warning/10';
      case 'optimal': return 'border-success bg-success/10';
      default: return 'border-muted bg-muted/10';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const highImpactPredictions = samplePredictions.filter(p => p.impact === 'high');
  const averageConfidence = samplePredictions.reduce((sum, p) => sum + p.confidence, 0) / samplePredictions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Predictive Health Insights
          </h2>
          <p className="text-muted-foreground">AI-powered forecasting based on your health patterns</p>
        </div>
        <Badge variant="outline" className="text-primary border-primary">
          Model Confidence: {Math.round(averageConfidence)}%
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-success/20">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{samplePredictions.filter(p => p.type === 'improvement').length}</p>
                <p className="text-muted-foreground">Improvements Forecasted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-warning/20">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{samplePredictions.filter(p => p.type === 'warning').length}</p>
                <p className="text-muted-foreground">Early Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(averageConfidence)}%</p>
                <p className="text-muted-foreground">Avg. Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* High Priority Alerts */}
      {highImpactPredictions.length > 0 && (
        <Card className="glass-effect border-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              High Priority Predictions
            </CardTitle>
            <CardDescription>
              Critical insights requiring immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {highImpactPredictions.map(prediction => (
                <div key={prediction.id} className="flex items-start gap-4 p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="mt-1">
                    {getTypeIcon(prediction.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{prediction.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{prediction.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span>Confidence: {prediction.confidence}%</span>
                      <span>Timeframe: {prediction.timeframe}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Predictions */}
      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="predictions">All Predictions</TabsTrigger>
          <TabsTrigger value="trends">Trend Forecasting</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {samplePredictions.map(prediction => (
              <Card key={prediction.id} className={`glass-effect ${getTypeColor(prediction.type)}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(prediction.type)}
                      <div>
                        <CardTitle className="text-base">{prediction.title}</CardTitle>
                        <CardDescription>{prediction.metric}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getImpactColor(prediction.impact)}>
                        {prediction.impact} impact
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Prediction Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-card">
                      <p className="text-sm text-muted-foreground">Current</p>
                      <p className="text-lg font-bold">{prediction.currentValue} {prediction.unit}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-card">
                      <p className="text-sm text-muted-foreground">Predicted</p>
                      <p className="text-lg font-bold">{prediction.predictedValue} {prediction.unit}</p>
                    </div>
                  </div>

                  {/* Confidence & Timeframe */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Level</span>
                      <span>{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Expected in {prediction.timeframe}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{prediction.description}</p>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Lightbulb className="h-4 w-4 text-warning" />
                      Recommendations
                    </div>
                    <ul className="space-y-1">
                      {prediction.recommendations.map((rec, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Sleep Efficiency Forecast
              </CardTitle>
              <CardDescription>
                14-day prediction based on current patterns and interventions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <ReferenceLine x="2024-10-19" stroke="hsl(var(--muted-foreground))" strokeDasharray="2 2" />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                      name="Actual"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="hsl(var(--accent))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                      name="Predicted"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>• Solid line represents historical data</p>
                <p>• Dashed line shows AI predictions with decreasing confidence over time</p>
                <p>• Vertical line marks transition from actual to predicted data</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  HRV Pattern Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Weekly Rhythm Detected</h4>
                    <p className="text-sm text-blue-700">
                      Your HRV shows a consistent weekly pattern with peaks on Wednesdays and dips on Sundays.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">Recovery Correlation</h4>
                    <p className="text-sm text-green-700">
                      85% correlation between sleep quality and next-day HRV values identified.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  Circadian Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">Optimal Performance Window</h4>
                    <p className="text-sm text-purple-700">
                      Peak cognitive and physical performance predicted between 10 AM - 2 PM.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                    <h4 className="font-medium text-orange-800 mb-2">Natural Energy Dip</h4>
                    <p className="text-sm text-orange-700">
                      Consistent energy decline observed at 3 PM. Consider light exercise or strategic break.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}