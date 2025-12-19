import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Heart, 
  Droplets, 
  Brain, 
  TrendingUp, 
  Zap, 
  Clock,
  Target,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  Lightbulb,
  Thermometer,
  Wind,
  Shield,
  Gauge,
  Moon,
  Sun
} from "lucide-react";

interface DemoMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  status: 'optimal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
}

interface SimulationStep {
  timestamp: string;
  metrics: DemoMetric[];
  insights: string[];
  actions: string[];
}

export function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string>("daily");

  const scenarios = {
    daily: {
      name: "Daily Monitoring",
      description: "Real-time biomarker tracking throughout a typical day",
      icon: BarChart3,
      gradient: "from-blue-500/20 to-cyan-500/20",
      metrics: {
        heart_rate: 72,
        hrv: 58,
        hydration: 65,
        glucose: 95,
        energy: 75,
        blood_pressure_sys: 118,
        blood_pressure_dia: 78,
        body_temp: 98.6,
        oxygen_sat: 98,
        cortisol: 12,
        sleep_score: 85
      }
    },
    exercise: {
      name: "Exercise Analytics",
      description: "Performance optimization during physical activity",
      icon: TrendingUp,
      gradient: "from-green-500/20 to-emerald-500/20",
      metrics: {
        heart_rate: 145,
        hrv: 45,
        hydration: 58,
        glucose: 110,
        energy: 85,
        blood_pressure_sys: 135,
        blood_pressure_dia: 85,
        body_temp: 99.2,
        oxygen_sat: 96,
        cortisol: 18,
        sleep_score: 78
      }
    },
    recovery: {
      name: "Recovery Analysis", 
      description: "Sleep quality and restoration monitoring",
      icon: Activity,
      gradient: "from-purple-500/20 to-violet-500/20",
      metrics: {
        heart_rate: 52,
        hrv: 72,
        hydration: 45,
        glucose: 88,
        energy: 65,
        blood_pressure_sys: 110,
        blood_pressure_dia: 72,
        body_temp: 98.1,
        oxygen_sat: 99,
        cortisol: 8,
        sleep_score: 92
      }
    }
  };

  const simulationSteps: SimulationStep[] = [
    {
      timestamp: "06:00 AM",
      metrics: [
        {
          id: "hrv",
          name: "Heart Rate Variability",
          value: scenarios[selectedScenario].metrics.hrv,
          unit: "ms",
          target: 60,
          status: scenarios[selectedScenario].metrics.hrv > 55 ? 'optimal' : 'warning',
          trend: 'stable',
          icon: Heart,
          color: "text-red-500"
        },
        {
          id: "hydration",
          name: "Hydration Level",
          value: scenarios[selectedScenario].metrics.hydration,
          unit: "%",
          target: 75,
          status: scenarios[selectedScenario].metrics.hydration > 70 ? 'optimal' : 'warning',
          trend: scenarios[selectedScenario].metrics.hydration > 60 ? 'up' : 'down',
          icon: Droplets,
          color: "text-blue-500"
        },
        {
          id: "sleep_score",
          name: "Sleep Quality Score",
          value: scenarios[selectedScenario].metrics.sleep_score,
          unit: "%",
          target: 85,
          status: scenarios[selectedScenario].metrics.sleep_score > 80 ? 'optimal' : 'warning',
          trend: 'up',
          icon: Moon,
          color: "text-purple-500"
        }
      ],
      insights: [
        "Overnight recovery metrics show excellent sleep restoration",
        "Heart rate variability indicates good autonomic balance", 
        "Morning hydration levels need immediate attention"
      ],
      actions: [
        "Hydrate with 16-20 oz water + electrolytes immediately",
        "Begin gentle morning stretching routine",
        "Optimize natural light exposure for circadian rhythm"
      ]
    },
    {
      timestamp: "09:00 AM",
      metrics: [
        {
          id: "glucose",
          name: "Blood Glucose",
          value: Math.round(scenarios[selectedScenario].metrics.glucose * 0.95),
          unit: "mg/dL",
          target: 100,
          status: scenarios[selectedScenario].metrics.glucose > 120 ? 'warning' : 'optimal',
          trend: 'stable',
          icon: Zap,
          color: "text-orange-500"
        },
        {
          id: "blood_pressure",
          name: "Blood Pressure",
          value: scenarios[selectedScenario].metrics.blood_pressure_sys,
          unit: "mmHg",
          target: 120,
          status: scenarios[selectedScenario].metrics.blood_pressure_sys < 130 ? 'optimal' : 'warning',
          trend: 'stable',
          icon: Gauge,
          color: "text-green-500"
        },
        {
          id: "cortisol",
          name: "Cortisol Level",
          value: scenarios[selectedScenario].metrics.cortisol,
          unit: "μg/dL",
          target: 15,
          status: scenarios[selectedScenario].metrics.cortisol < 20 ? 'optimal' : 'warning',
          trend: 'down',
          icon: Shield,
          color: "text-yellow-500"
        }
      ],
      insights: [
        "Post-breakfast glucose response within normal parameters",
        "Morning cortisol levels showing healthy circadian pattern",
        "Blood pressure readings indicate good cardiovascular health"
      ],
      actions: [
        "Maintain current nutrition timing and composition",
        "Consider brief meditation to optimize stress response",
        "Take short walk to support metabolic processing"
      ]
    },
    {
      timestamp: "12:00 PM", 
      metrics: [
        {
          id: "energy",
          name: "Energy Level",
          value: Math.round(scenarios[selectedScenario].metrics.energy * 1.1),
          unit: "%",
          target: 80,
          status: scenarios[selectedScenario].metrics.energy > 75 ? 'optimal' : 'warning',
          trend: 'up',
          icon: Zap,
          color: "text-yellow-500"
        },
        {
          id: "body_temp",
          name: "Core Body Temperature",
          value: scenarios[selectedScenario].metrics.body_temp,
          unit: "°F",
          target: 98.6,
          status: Math.abs(scenarios[selectedScenario].metrics.body_temp - 98.6) < 1 ? 'optimal' : 'warning',
          trend: 'stable',
          icon: Thermometer,
          color: "text-red-400"
        },
        {
          id: "oxygen_sat",
          name: "Blood Oxygen Saturation",
          value: scenarios[selectedScenario].metrics.oxygen_sat,
          unit: "%",
          target: 98,
          status: scenarios[selectedScenario].metrics.oxygen_sat > 95 ? 'optimal' : 'warning',
          trend: 'stable',
          icon: Wind,
          color: "text-cyan-500"
        }
      ],
      insights: [
        "Mid-day energy levels showing positive optimization trends",
        "Thermoregulation patterns indicate efficient metabolic function",
        "Oxygen saturation confirms excellent respiratory efficiency"
      ],
      actions: [
        "Take 5-minute walking break to maintain circulation",
        "Consider protein-rich snack for sustained energy",
        "Adjust workspace environment for optimal comfort"
      ]
    },
    {
      timestamp: "03:00 PM",
      metrics: [
        {
          id: "hydration",
          name: "Hydration Level",
          value: Math.round(scenarios[selectedScenario].metrics.hydration * 1.15),
          unit: "%",
          target: 75,
          status: scenarios[selectedScenario].metrics.hydration * 1.15 > 70 ? 'optimal' : 'warning',
          trend: 'up',
          icon: Droplets,
          color: "text-blue-500"
        },
        {
          id: "heart_rate",
          name: "Resting Heart Rate",
          value: Math.round(scenarios[selectedScenario].metrics.heart_rate * 0.98),
          unit: "bpm",
          target: 70,
          status: scenarios[selectedScenario].metrics.heart_rate < 100 ? 'optimal' : 'warning',
          trend: 'stable',
          icon: Heart,
          color: "text-red-500"
        }
      ],
      insights: [
        "Afternoon hydration recovery showing excellent progress",
        "Heart rate variability indicates balanced autonomic function",
        "Biorhythm patterns suggest optimal activity window approaching"
      ],
      actions: [
        "Continue current hydration protocol",
        "Consider moderate physical activity for circulation boost",
        "Prepare for evening wind-down routine planning"
      ]
    },
    {
      timestamp: "07:00 PM",
      metrics: [
        {
          id: "recovery",
          name: "Recovery Score",
          value: 82,
          unit: "%",
          target: 75,
          status: 'optimal',
          trend: 'up',
          icon: Target,
          color: "text-green-500"
        },
        {
          id: "stress",
          name: "Stress Index",
          value: 2.8,
          unit: "/10",
          target: 4,
          status: 'optimal',
          trend: 'down',
          icon: Brain,
          color: "text-purple-500"
        },
        {
          id: "cortisol_evening",
          name: "Evening Cortisol",
          value: Math.round(scenarios[selectedScenario].metrics.cortisol * 0.6),
          unit: "μg/dL",
          target: 8,
          status: scenarios[selectedScenario].metrics.cortisol * 0.6 < 10 ? 'optimal' : 'warning',
          trend: 'down',
          icon: Moon,
          color: "text-indigo-500"
        }
      ],
      insights: [
        "Daily biomarker analysis reveals positive adaptation patterns",
        "Stress management protocols showing measurable effectiveness",
        "Evening cortisol decline indicates healthy circadian rhythm"
      ],
      actions: [
        "Begin wind-down routine in 2 hours for optimal sleep prep",
        "Review and celebrate today's health optimization wins",
        "Prepare tomorrow's personalized wellness protocol"
      ]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentStep < simulationSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500); // Reduced from 3000ms to 1500ms for smoother transitions
    } else if (currentStep >= simulationSteps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, simulationSteps.length]);

  const currentSimulation = simulationSteps[currentStep];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Real-time Platform Demo */}
      <Card className="glass-effect border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Activity className="h-6 w-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
              </div>
              <div>
                <CardTitle className="text-xl">Real-Time Health Intelligence</CardTitle>
                <CardDescription>
                  Experience continuous biomarker analysis with AI-powered insights
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
              Live Demo
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(scenarios).map(([key, scenario]) => {
              const IconComponent = scenario.icon;
              const isSelected = selectedScenario === key;
              return (
                <Button
                  key={key}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => {
                    setSelectedScenario(key);
                    resetDemo();
                  }}
                  className={`h-auto p-4 flex flex-col items-start gap-2 text-left transition-all duration-300 ${
                    isSelected ? 'shadow-lg scale-105' : 'hover:scale-102'
                  }`}
                >
                  <div className={`w-full rounded-lg bg-gradient-to-r ${scenario.gradient} p-3`}>
                    <IconComponent className="h-6 w-6 text-foreground" />
                  </div>
                  <div className="w-full space-y-1">
                    <div className="font-semibold text-sm line-clamp-1">{scenario.name}</div>
                    <div className="text-xs text-muted-foreground leading-tight line-clamp-2">
                      {scenario.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          {/* Enhanced Demo Controls */}
          <div className="flex items-center gap-4 p-4 bg-card/50 rounded-lg border">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={currentStep >= simulationSteps.length - 1}
              className="gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause Simulation" : "Start Simulation"}
            </Button>
            <Button variant="outline" onClick={resetDemo} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Simulation Progress</span>
                <span className="font-medium">
                  {currentStep + 1} of {simulationSteps.length}
                </span>
              </div>
              <Progress 
                value={(currentStep / (simulationSteps.length - 1)) * 100} 
                className="h-2"
              />
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {currentSimulation.timestamp}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Biomarker Monitoring */}
        <Card className="glass-effect border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <div className="relative">
                <Clock className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping"></div>
              </div>
              Live Biomarker Feed
            </CardTitle>
            <CardDescription>
              {scenarios[selectedScenario].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            {currentSimulation.metrics.map((metric) => {
              const IconComponent = metric.icon;
              const progress = (metric.value / metric.target) * 100;
              return (
                <div key={metric.id} className="space-y-3 p-4 rounded-lg bg-card/30 border backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-background/50">
                        <IconComponent className={`h-4 w-4 ${metric.color}`} />
                      </div>
                      <div>
                        <span className="font-medium">{metric.name}</span>
                        <div className="text-sm text-muted-foreground">
                          Target: {metric.target} {metric.unit}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">
                        {metric.value} 
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          {metric.unit}
                        </span>
                      </div>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Progress 
                      value={Math.min(progress, 100)} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <TrendingUp className={`h-3 w-3 ${
                          metric.trend === 'up' ? 'text-success rotate-0' :
                          metric.trend === 'down' ? 'text-destructive rotate-180' :
                          'text-muted-foreground'
                        }`} />
                        <span>Trend: {metric.trend}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {Math.round(progress)}% of target
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* AI Intelligence Engine */}
        <Card className="glass-effect border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5"></div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <div className="relative">
                <Brain className="h-5 w-5 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              </div>
              AI Health Intelligence
            </CardTitle>
            <CardDescription>
              Real-time analysis and personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <Tabs defaultValue="insights" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="insights" className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Live Insights
                </TabsTrigger>
                <TabsTrigger value="actions" className="gap-2">
                  <Zap className="h-4 w-4" />
                  Smart Actions
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="insights" className="space-y-3 mt-4">
                {currentSimulation.insights.map((insight, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary animate-fade-in backdrop-blur-sm"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium mb-1">Pattern Detected</p>
                        <p className="text-sm opacity-90">{insight}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="actions" className="space-y-3 mt-4">
                {currentSimulation.actions.map((action, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-success/10 border border-success/20 animate-fade-in backdrop-blur-sm"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-success mb-1">Recommended Action</p>
                        <p className="text-sm text-success/90">{action}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-success/30 text-success hover:bg-success/20">
                      Apply
                    </Button>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}