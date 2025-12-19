import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  FileText, 
  Bell, 
  Activity,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

export function BioPrecisionFeaturesShowcase() {
  const features = [
    {
      icon: Trophy,
      title: "Accountability Score",
      description: "0-100 score tracking sleep, nutrition, glucose, exercise, and biomarkers",
      color: "text-primary",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Target,
      title: "Weekly BioPlan",
      description: "Top 3 priorities with actionable steps based on your data",
      color: "text-accent",
      gradient: "from-accent/20 to-accent/5"
    },
    {
      icon: TrendingUp,
      title: "12-Week Trajectory",
      description: "Track HRV, glucose, sleep, and VO₂ max trends over time",
      color: "text-primary-glow",
      gradient: "from-primary-glow/20 to-primary-glow/5"
    },
    {
      icon: FileText,
      title: "Labs Optimization",
      description: "Upload lab results and get personalized optimization tactics",
      color: "text-accent",
      gradient: "from-accent/20 to-accent/5"
    },
    {
      icon: Bell,
      title: "Adaptive Nudges",
      description: "Real-time micro-coaching triggered by your biomarker data",
      color: "text-primary",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Activity,
      title: "Milestone Goals",
      description: "Set and track specific health objectives with clear timelines",
      color: "text-primary-glow",
      gradient: "from-primary-glow/20 to-primary-glow/5"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <Badge className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium border-primary/40 bg-primary/15 text-primary shadow-glow">
              <Sparkles className="h-6 w-6" />
              Complete Intelligence Platform
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-light tracking-tight leading-tight">
              Everything You Need to
              <span className="block bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent font-medium mt-3">
                Actually Take Action
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              Six integrated features that transform your biomarker data into a complete accountability system.
              Not scattered across apps—one unified platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className={`p-8 gradient-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 bg-gradient-to-br ${feature.gradient}`}
                >
                  <div className="space-y-4">
                    <div className={`${feature.color} pulse-gentle`}>
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Link to="/bioprecision">
              <Button 
                size="lg" 
                className="group h-16 px-12 text-xl font-medium shadow-neon hover:shadow-glow transition-all duration-500"
              >
                See Your BioPrecision Score Now
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              No credit card required. Start with demo data and connect your devices when ready.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}