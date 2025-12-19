import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Heart,
  Droplets,
  Brain,
  Utensils,
  TestTube,
  Watch,
  Waves,
  TrendingUp,
  Zap,
  Moon,
  Thermometer,
  Wind,
  Scale,
  Apple,
  CircleDot,
  Smartphone,
  Database
} from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  category: "wearables" | "cgm" | "vitals" | "labs" | "nutrition";
  icon: any;
  color: string;
  metrics: string[];
  influence: string;
  position: { x: number; y: number };
}

const dataSources: DataSource[] = [
  // Wearables
  {
    id: "apple-watch",
    name: "Apple Watch",
    category: "wearables",
    icon: Watch,
    color: "text-primary",
    metrics: ["HRV: 65ms", "Resting HR: 58 bpm", "Sleep: 7.2h", "Steps: 8,450"],
    influence: "Informs recovery readiness, sleep optimization, and stress management protocols",
    position: { x: 10, y: 15 }
  },
  {
    id: "oura",
    name: "Oura Ring",
    category: "wearables",
    icon: CircleDot,
    color: "text-primary",
    metrics: ["Readiness: 82/100", "Sleep Score: 88", "Body Temp: +0.3°C"],
    influence: "Drives personalized recovery timing and sleep architecture recommendations",
    position: { x: 10, y: 40 }
  },
  {
    id: "whoop",
    name: "WHOOP",
    category: "wearables",
    icon: Activity,
    color: "text-primary",
    metrics: ["Strain: 14.2", "Recovery: 76%", "Sleep Performance: 82%"],
    influence: "Optimizes training load, recovery windows, and exertion timing",
    position: { x: 10, y: 65 }
  },
  {
    id: "garmin",
    name: "Garmin",
    category: "wearables",
    icon: Smartphone,
    color: "text-primary",
    metrics: ["VO2 Max: 52", "Training Load: Optimal", "Stress: 38"],
    influence: "Shapes cardio protocols and training periodization strategies",
    position: { x: 10, y: 90 }
  },
  // CGMs
  {
    id: "dexcom",
    name: "Dexcom G7",
    category: "cgm",
    icon: Droplets,
    color: "text-accent",
    metrics: ["Glucose: 94 mg/dL", "Variability: 18%", "Time in Range: 89%"],
    influence: "Triggers real-time nutrition timing, meal composition, and movement interventions",
    position: { x: 90, y: 15 }
  },
  {
    id: "libre",
    name: "Freestyle Libre",
    category: "cgm",
    icon: Waves,
    color: "text-accent",
    metrics: ["Current: 88 mg/dL", "Trend: Steady", "Average: 92 mg/dL"],
    influence: "Personalizes macronutrient timing and post-meal activity recommendations",
    position: { x: 90, y: 40 }
  },
  // Vitals
  {
    id: "bp-monitor",
    name: "BP Monitor",
    category: "vitals",
    icon: Heart,
    color: "text-success",
    metrics: ["BP: 118/76", "Pulse: 62 bpm", "Trend: Stable"],
    influence: "Monitors cardiovascular stress and autonomic function responses",
    position: { x: 90, y: 65 }
  },
  {
    id: "pulse-ox",
    name: "Pulse Oximeter",
    category: "vitals",
    icon: Wind,
    color: "text-success",
    metrics: ["SpO2: 98%", "Perfusion Index: 4.2", "HR: 59 bpm"],
    influence: "Detects sleep apnea risk and respiratory efficiency patterns",
    position: { x: 90, y: 90 }
  },
  // Labs
  {
    id: "lab-glucose",
    name: "Lab Results",
    category: "labs",
    icon: TestTube,
    color: "text-warning",
    metrics: ["HbA1c: 5.1%", "Fasting Glucose: 87", "Insulin: 4.2 µIU/mL"],
    influence: "Validates CGM accuracy and drives long-term metabolic optimization strategies",
    position: { x: 30, y: 5 }
  },
  {
    id: "lab-lipids",
    name: "Lipid Panel",
    category: "labs",
    icon: TestTube,
    color: "text-warning",
    metrics: ["LDL: 95 mg/dL", "HDL: 68 mg/dL", "Triglycerides: 72 mg/dL"],
    influence: "Shapes nutrition macros, fasting protocols, and cardiovascular risk mitigation",
    position: { x: 70, y: 5 }
  },
  // Nutrition
  {
    id: "nutrition",
    name: "Nutrition Tracking",
    category: "nutrition",
    icon: Utensils,
    color: "text-primary",
    metrics: ["Protein: 142g", "Meal Timing: Optimal", "Post-meal glucose: +18mg/dL"],
    influence: "Contextualizes biomarker responses to food and personalizes macro/timing recommendations",
    position: { x: 50, y: 95 }
  }
];

export const DataEcosystemHub = () => {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);

  const activeSource = selectedSource || hoveredSource;
  const activeData = dataSources.find(s => s.id === activeSource);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "wearables": return "bg-primary/10 border-primary/30";
      case "cgm": return "bg-accent/10 border-accent/30";
      case "vitals": return "bg-success/10 border-success/30";
      case "labs": return "bg-warning/10 border-warning/30";
      case "nutrition": return "bg-primary/10 border-primary/30";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="outline" className="text-accent border-accent/30">
          <Database className="h-3 w-3 mr-2" />
          Connected Data Ecosystem
        </Badge>
        <h2 className="text-3xl lg:text-4xl font-bold">
          Your <span className="text-accent">central intelligence</span> hub
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          BioPrecision unifies wearables, lab results, CGMs, vital signs, and nutrition data into one real-time precision health platform. Click any source to see how it influences your personalized recommendations.
        </p>
      </div>

      {/* Interactive Visualization */}
      <Card className="gradient-card p-8 lg:p-12">
        <div className="relative aspect-[16/10] lg:aspect-[16/8]">
          {/* SVG for connection lines - positioned behind everything */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {dataSources.map((source) => {
              const isActive = activeSource === source.id;
              
              // Calculate actual pixel positions
              const sourceX = (source.position.x / 100) * 100; // percentage of viewBox width
              const sourceY = (source.position.y / 100) * 100; // percentage of viewBox height
              const centerX = 50; // center of viewBox
              const centerY = 50; // center of viewBox
              
              return (
                <line
                  key={`line-${source.id}`}
                  x1={`${sourceX}%`}
                  y1={`${sourceY}%`}
                  x2="50%"
                  y2="50%"
                  stroke={isActive ? "hsl(var(--accent))" : "hsl(var(--border))"}
                  strokeWidth={isActive ? "3" : "1.5"}
                  strokeDasharray={isActive ? "0" : "5,5"}
                  opacity={isActive ? "0.9" : "0.2"}
                  className="transition-all duration-500"
                  style={{
                    filter: isActive ? "drop-shadow(0 0 8px hsl(var(--accent) / 0.6))" : "none"
                  }}
                />
              );
            })}
          </svg>

          {/* Central Hub */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="relative">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: "3s" }} />
              <div className="absolute inset-0 rounded-full bg-accent/10 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
              
              {/* Central node */}
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full gradient-accent flex items-center justify-center shadow-neon">
                <div className="text-center">
                  <Brain className="h-12 w-12 lg:h-16 lg:w-16 text-accent-foreground mx-auto mb-2" />
                  <div className="text-xs lg:text-sm font-bold text-accent-foreground">BioPrecision</div>
                  <div className="text-[10px] lg:text-xs text-accent-foreground/80">AI Engine</div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          {dataSources.map((source) => {
            const Icon = source.icon;
            const isActive = activeSource === source.id;
            
            return (
              <div
                key={source.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                style={{
                  left: `${source.position.x}%`,
                  top: `${source.position.y}%`,
                  zIndex: isActive ? 30 : 10
                }}
                onMouseEnter={() => setHoveredSource(source.id)}
                onMouseLeave={() => setHoveredSource(null)}
                onClick={() => setSelectedSource(selectedSource === source.id ? null : source.id)}
              >
                {/* Source node */}
                <div
                  className={`
                    w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 flex items-center justify-center
                    transition-all duration-300 backdrop-blur-sm
                    ${isActive ? getCategoryColor(source.category) + " shadow-lg scale-110" : "bg-background/50 border-border/50"}
                    hover:scale-105
                  `}
                  style={{
                    boxShadow: isActive ? `0 0 20px hsl(var(--accent) / 0.4)` : undefined
                  }}
                >
                  <Icon className={`h-7 w-7 lg:h-9 lg:w-9 ${isActive ? source.color : "text-muted-foreground"} transition-colors duration-300`} />
                </div>

                {/* Source label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-center whitespace-nowrap">
                  <div className={`text-xs font-medium transition-colors duration-300 ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {source.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Source Details */}
        {activeData && (
          <div className="mt-8 p-6 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm animate-fade-in">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getCategoryColor(activeData.category)}`}>
                <activeData.icon className={`h-6 w-6 ${activeData.color}`} />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h4 className="font-bold text-lg mb-1">{activeData.name}</h4>
                  <p className="text-sm text-muted-foreground italic">{activeData.influence}</p>
                </div>
                
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Live Metrics</div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {activeData.metrics.map((metric, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Category Legend */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 text-center gradient-card">
          <Watch className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-sm font-semibold mb-1">Wearables</div>
          <div className="text-xs text-muted-foreground">HRV, sleep, activity</div>
        </Card>
        
        <Card className="p-4 text-center gradient-card">
          <Droplets className="h-8 w-8 text-accent mx-auto mb-2" />
          <div className="text-sm font-semibold mb-1">CGM</div>
          <div className="text-xs text-muted-foreground">Real-time glucose</div>
        </Card>
        
        <Card className="p-4 text-center gradient-card">
          <Heart className="h-8 w-8 text-success mx-auto mb-2" />
          <div className="text-sm font-semibold mb-1">Vitals</div>
          <div className="text-xs text-muted-foreground">BP, SpO2, pulse</div>
        </Card>
        
        <Card className="p-4 text-center gradient-card">
          <TestTube className="h-8 w-8 text-warning mx-auto mb-2" />
          <div className="text-sm font-semibold mb-1">Lab Results</div>
          <div className="text-xs text-muted-foreground">Blood work, biomarkers</div>
        </Card>
        
        <Card className="p-4 text-center gradient-card">
          <Utensils className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-sm font-semibold mb-1">Nutrition</div>
          <div className="text-xs text-muted-foreground">Meals, macros, timing</div>
        </Card>
      </div>

      {/* Nutrition Integration Showcase */}
      <Card className="gradient-card p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Utensils className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Nutrition Intelligence Layer</h3>
                <p className="text-sm text-muted-foreground">Personalized nutrition based on your biomarkers</p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              BioPrecision integrates nutrition data with your biomarker responses to deliver contextual meal timing, protein optimization, and personalized macro recommendations — all driven by your unique metabolic profile.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Meal Tagging & Timing</div>
                <p className="text-sm text-muted-foreground">Tag meals and see real-time glucose responses. Optimize meal timing for peak performance.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-accent/5 border border-accent/10">
              <Scale className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Protein Tracking</div>
                <p className="text-sm text-muted-foreground">Track daily protein intake and distribution. AI recommends timing for muscle synthesis.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-success/5 border border-success/10">
              <Zap className="h-5 w-5 text-success mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Biomarker-Driven Recommendations</div>
                <p className="text-sm text-muted-foreground">Postprandial glucose spikes, inflammation, and sleep quality inform nutrition interventions.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/5 border border-warning/10">
              <Apple className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Contextual Macro Guidance</div>
                <p className="text-sm text-muted-foreground">Adjust carbs, fats, and protein based on training load, recovery state, and metabolic health.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};