import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Target, TrendingUp, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-biofeedback.jpg";

const floatingStats = [
  { value: "2.3s", label: "Response Time", position: "top-4 left-4" },
  { value: "99.9%", label: "Accuracy", position: "top-16 right-8" },
  { value: "47ms", label: "HRV Score", position: "bottom-20 left-8" },
  { value: "24/7", label: "Monitoring", position: "bottom-8 right-4" }
];

export function MobileOptimizedHero() {
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % floatingStats.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.2fr] gap-12 lg:gap-16 items-center">
            
            {/* Content */}
            <div className="space-y-12 text-center lg:text-left order-2 lg:order-1 fade-in-up">
              <div className="space-y-10">
                <Badge className="inline-flex items-center gap-3 px-6 py-3.5 text-base font-medium border-primary/40 bg-primary/15 text-primary shadow-glow">
                  <Brain className="h-5 w-5 pulse-gentle" />
                  Precision Health Platform
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
                  The Future of Health is
                  <span className="block bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent font-light mt-2">
                    Predictive, Personal, Perfect
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  Revolutionary AI analyzes millions of biomarkers in real-time to predict health 
                  events before they happen and deliver precise interventions at the perfect moment.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button size="lg" className="group h-14 px-10 text-lg font-medium shadow-neon hover:shadow-glow transition-all duration-500">
                  Start Free Trial
                  <ChevronRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-medium border-primary/60 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-glow transition-all duration-500">
                  Watch Demo
                </Button>
              </div>

              {/* Key Metrics */}
              <div className="flex justify-between items-start pt-14 w-full max-w-5xl mx-auto lg:mx-0">
                {[
                  { icon: <Zap className="h-10 w-10" />, value: "24/7", label: "Monitoring" },
                  { icon: <Target className="h-10 w-10" />, value: "99.9%", label: "Accuracy" },
                  { icon: <TrendingUp className="h-10 w-10" />, value: "2.3s", label: "Response" },
                  { icon: <Brain className="h-10 w-10" />, value: "AI", label: "Powered" }
                ].map((metric, index) => (
                  <div key={index} className="text-center elite-hover flex-1">
                    <div className="flex justify-center mb-4 text-primary pulse-gentle">
                      {metric.icon}
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-medium bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">{metric.value}</div>
                    <div className="text-sm sm:text-base text-muted-foreground font-light mt-2">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative order-1 lg:order-2 elite-hover">
              <div className="relative mx-auto max-w-2xl lg:max-w-none">
                {/* Main Image Card */}
                <Card className="relative overflow-hidden gradient-card border-primary/30 shadow-neon">
                  <div className="aspect-[16/10] relative">
                    <img 
                      src={heroImage}
                      alt="Precision health monitoring dashboard"
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    {/* Floating Stats - Desktop */}
                    <div className="hidden lg:block">
                      {floatingStats.map((stat, index) => (
                        <Card 
                          key={index}
                          className={`absolute ${stat.position} p-3 glass-effect border-primary/20 backdrop-blur-md bg-background/40 transition-all duration-700 ${
                            currentStat === index ? 'scale-105 shadow-glow' : 'scale-100 opacity-80'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.value}</div>
                            <div className="text-xs text-muted-foreground font-light">{stat.label}</div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Mobile Stats Carousel */}
                    <div className="lg:hidden absolute bottom-6 left-6 right-6">
                      <Card className="p-6 glass-effect border-primary/30 text-center shadow-glow">
                        <div className="text-3xl font-light bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                          {floatingStats[currentStat].value}
                        </div>
                        <div className="text-base text-muted-foreground font-light">
                          {floatingStats[currentStat].label}
                        </div>
                      </Card>
                    </div>
                  </div>
                </Card>

                {/* Glow Effect */}
                <div className="absolute -inset-6 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
                <div className="absolute -inset-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-80"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}