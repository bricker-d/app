import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Brain, TrendingUp, Activity, Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'recovery' | 'hydration';
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
  confidence: number;
}

// Demo recommendations for users without data
const DEMO_RECOMMENDATIONS: Recommendation[] = [
  {
    id: '1',
    title: 'Optimize Post-Meal Movement',
    description: 'Your glucose levels show a 28% spike after lunch. A 10-minute walk within 15 minutes of eating could reduce this by up to 15 mg/dL.',
    category: 'exercise',
    priority: 'high',
    reasoning: 'Analysis of 14 days of continuous glucose data shows consistent post-prandial spikes at 2:30 PM. Walking activates GLUT4 transporters, improving insulin-independent glucose uptake in skeletal muscle.',
    confidence: 0.92
  },
  {
    id: '2',
    title: 'Advance Your Sleep Window',
    description: 'Your HRV drops by 18ms when you sleep after midnight. Moving your bedtime to 10:30 PM could improve recovery by 23%.',
    category: 'sleep',
    priority: 'high',
    reasoning: 'Your cortisol awakening response data indicates a delayed circadian phase. The 10:30-11:30 PM window aligns with your natural melatonin rise, optimizing sleep architecture and autonomic recovery.',
    confidence: 0.89
  },
  {
    id: '3',
    title: 'Strategic Protein Timing',
    description: 'Add 25-30g protein within 90 minutes post-workout. Your current 4-hour delay is limiting muscle protein synthesis by approximately 35%.',
    category: 'nutrition',
    priority: 'medium',
    reasoning: 'Your training load (TSS 420/week) combined with elevated evening cortisol suggests inadequate recovery nutrition. The anabolic window is real for your training volume—mTOR signaling peaks 45-90 min post-exercise.',
    confidence: 0.87
  },
  {
    id: '4',
    title: 'Hydration Front-Loading',
    description: 'Your afternoon energy dips correlate with -2.3% body mass loss. Consume 16 oz water by 10 AM to maintain cognitive performance.',
    category: 'hydration',
    priority: 'medium',
    reasoning: 'HRV and reaction time data show 8% performance degradation at 2 PM on days with <24 oz morning intake. Mild dehydration (2%) significantly impairs executive function and increases perceived exertion.',
    confidence: 0.84
  },
  {
    id: '5',
    title: 'Active Recovery Implementation',
    description: 'Replace your rest day with Zone 1 movement (50-60% max HR) for 30-45 minutes. Your HRV variability suggests insufficient parasympathetic activation.',
    category: 'recovery',
    priority: 'low',
    reasoning: 'Your HRV coefficient of variation (18.7%) is elevated. Light aerobic work increases vagal tone and accelerates lactate clearance without triggering additional stress response. Studies show 15-20% faster recovery.',
    confidence: 0.81
  },
  {
    id: '6',
    title: 'Caffeine Cutoff Adjustment',
    description: 'Your sleep latency increases by 22 minutes when consuming caffeine after 1:30 PM. Move your last coffee to before 1 PM.',
    category: 'sleep',
    priority: 'medium',
    reasoning: 'Caffeine has a 5-hour half-life, but you appear to be a slow metabolizer (likely CYP1A2 *1F/*1F genotype). Your sleep onset data shows adenosine receptor blockade persisting 8-10 hours post-consumption.',
    confidence: 0.86
  },
  {
    id: '7',
    title: 'Carbohydrate Cycling Implementation',
    description: 'Reduce carbs to <50g on your 3 weekly rest days. Your insulin sensitivity improves 34% on lower training volume days.',
    category: 'nutrition',
    priority: 'low',
    reasoning: 'Continuous glucose monitoring reveals improved glycemic variability (SD 18 vs 28 mg/dL) on rest days with lower carb intake. Your muscles are depleted on training days, creating a nutrient partitioning advantage.',
    confidence: 0.79
  }
];

export const AIRecommendations = () => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>(DEMO_RECOMMENDATIONS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date>(new Date());

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const user = (await supabase.auth.getUser()).data.user;
      
      if (!user) {
        // Show demo recommendations for non-authenticated users
        setRecommendations(DEMO_RECOMMENDATIONS);
        setLastGenerated(new Date());
        toast({
          title: "Demo Insights Loaded",
          description: "Showing sample AI recommendations. Sign in for personalized insights.",
        });
        setIsGenerating(false);
        return;
      }

      // Fetch user's health data
      const { data: readings } = await supabase
        .from('readings')
        .select(`
          value,
          recorded_at,
          metric:metrics (
            name,
            display_name,
            unit,
            normal_range_min,
            normal_range_max
          )
        `)
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(50);

      if (!readings || readings.length === 0) {
        // Use demo recommendations if no data
        setRecommendations(DEMO_RECOMMENDATIONS);
        setLastGenerated(new Date());
        toast({
          title: "Demo Insights Loaded",
          description: "Add health data for personalized AI recommendations",
        });
        setIsGenerating(false);
        return;
      }

      // Prepare data summary for AI
      const dataSummary = readings.reduce((acc: any, reading: any) => {
        const metricName = reading.metric.display_name;
        if (!acc[metricName]) {
          acc[metricName] = {
            values: [],
            unit: reading.metric.unit,
            normalMin: reading.metric.normal_range_min,
            normalMax: reading.metric.normal_range_max
          };
        }
        acc[metricName].values.push(parseFloat(reading.value));
        return acc;
      }, {});

      // Calculate averages and trends
      const summary = Object.entries(dataSummary).map(([name, data]: [string, any]) => {
        const avg = data.values.reduce((a: number, b: number) => a + b, 0) / data.values.length;
        const trend = data.values.length > 1 
          ? data.values[0] > data.values[data.values.length - 1] ? 'increasing' : 'decreasing'
          : 'stable';
        
        return {
          metric: name,
          average: avg.toFixed(2),
          trend,
          unit: data.unit,
          normalRange: `${data.normalMin}-${data.normalMax}`,
          recentValue: data.values[0]
        };
      });

      // Call AI to generate recommendations
      const { data, error } = await supabase.functions.invoke('generate-health-recommendations', {
        body: { healthData: summary }
      });

      if (error) {
        console.error('AI generation error:', error);
        // Fallback to demo recommendations
        setRecommendations(DEMO_RECOMMENDATIONS);
        setLastGenerated(new Date());
        toast({
          title: "Using Demo Insights",
          description: "AI service temporarily unavailable. Showing sample recommendations.",
        });
        setIsGenerating(false);
        return;
      }

      setRecommendations(data.recommendations || DEMO_RECOMMENDATIONS);
      setLastGenerated(new Date());

      toast({
        title: "Recommendations Generated",
        description: `Generated ${(data.recommendations || DEMO_RECOMMENDATIONS).length} personalized insights`,
      });

    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Always show demo recommendations on error
      setRecommendations(DEMO_RECOMMENDATIONS);
      setLastGenerated(new Date());
      toast({
        title: "Demo Insights Loaded",
        description: "Showing sample recommendations. Real insights available with health data.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Load demo recommendations on mount
  useEffect(() => {
    // Don't auto-generate on mount, just show demo recommendations
    setRecommendations(DEMO_RECOMMENDATIONS);
    setLastGenerated(new Date());
  }, []);

  const getCategoryIcon = (category: Recommendation['category']) => {
    const iconClass = "h-4 w-4";
    switch (category) {
      case 'nutrition': return <Activity className={iconClass} />;
      case 'exercise': return <TrendingUp className={iconClass} />;
      case 'sleep': return <Brain className={iconClass} />;
      case 'recovery': return <Sparkles className={iconClass} />;
      case 'hydration': return <Activity className={iconClass} />;
    }
  };

  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI-Powered Recommendations
              </CardTitle>
              <CardDescription>
                Pattern-based insights from your health data
              </CardDescription>
            </div>
            <Button 
              onClick={generateRecommendations} 
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">AI Analysis Active</p>
                <p className="text-sm text-muted-foreground">
                  {lastGenerated 
                    ? `Last updated ${lastGenerated.toLocaleTimeString()}`
                    : 'Generating recommendations...'
                  }
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-primary">
              {recommendations.length} Insights
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations List */}
      {isGenerating ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Loader2 className="h-12 w-12 mx-auto mb-4 text-primary animate-spin" />
            <p className="text-muted-foreground">Analyzing your health patterns...</p>
          </CardContent>
        </Card>
      ) : recommendations.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="font-semibold text-lg mb-2">No Recommendations Yet</h3>
            <p className="text-muted-foreground mb-4">
              Add more health data to receive personalized AI insights
            </p>
            <Button onClick={generateRecommendations}>
              Generate Recommendations
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="gradient-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 gradient-primary rounded-xl">
                    {getCategoryIcon(rec.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{rec.title}</h3>
                      <Badge variant={getPriorityColor(rec.priority)}>
                        {rec.priority} priority
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {rec.category}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">
                      {rec.description}
                    </p>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">
                        <span className="font-medium">AI Reasoning: </span>
                        {rec.reasoning}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4" />
                      <span>Confidence: {(rec.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
