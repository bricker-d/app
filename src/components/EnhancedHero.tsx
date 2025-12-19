import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Activity, Heart, CheckCircle, Zap } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface EnhancedHeroProps {
  heroImage: string;
}

export function EnhancedHero({ heroImage }: EnhancedHeroProps) {
  const [stats, setStats] = useState({
    accuracy: 97.3,
    latency: 0.3,
    users: 8547
  });

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Animate stats when in view
  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setStats(prev => ({
        accuracy: Math.min(99.7, prev.accuracy + 0.1),
        latency: Math.max(0.1, prev.latency - 0.01),
        users: Math.min(10000, prev.users + Math.floor(Math.random() * 5))
      }));
    }, 150);

    const timeout = setTimeout(() => clearInterval(interval), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [inView]);

  return (
    <section ref={ref} className="gradient-hero py-32 relative overflow-hidden minimal-grid">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <div className={`space-y-12 transition-all duration-1000 ${inView ? 'fade-in-up' : 'opacity-0 translate-y-12'}`}>
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 elite-border rounded-full bg-background/50 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-normal text-muted-foreground tracking-wide">SELECT EARLY ACCESS</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-light tracking-tighter text-balance leading-[0.95]">
                Transform biodata into
                <br />
                <span className="font-normal">precise interventions</span>
              </h1>
              <p className="text-xl font-light text-muted-foreground text-balance max-w-2xl leading-relaxed">
                For those who demand absolute precision in health optimization. Our proprietary AI analyzes your unique physiological patterns to deliver quantified interventions—<span className="text-primary font-mono text-sm">14.2ml H₂O at 14:23:07</span>—calculated specifically for your biological state at that exact moment. Available to qualified early adopters.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group font-normal shadow-soft hover:shadow-medium transition-all">
                Secure Early Access
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="font-normal glass-effect hover:shadow-glow transition-all">
                View Eligibility
              </Button>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground pt-8">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span className="font-mono">{stats.accuracy.toFixed(1)}% accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span className="font-mono">{stats.latency.toFixed(1)}s latency</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary"></div>
                <span className="font-mono">{stats.users.toLocaleString()} early adopters</span>
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${inView ? 'fade-in-up' : 'opacity-0 translate-y-12'}`}>
            <div className="aspect-[4/3] bg-gradient-card rounded-2xl p-8 elite-border elite-hover">
              <img 
                src={heroImage} 
                alt="Advanced biofeedback interface for elite health optimization" 
                className="w-full h-full object-cover rounded-lg opacity-90"
              />
            </div>
            
            {/* Animated floating indicators */}
            <div className="absolute -top-4 -right-4 glass-effect rounded-lg p-4 elite-border animate-pulse">
              <div className="flex items-center gap-3 text-primary">
                <Heart className="h-4 w-4 pulse-data" />
                <span className="text-sm font-mono">72</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 glass-effect rounded-lg p-4 elite-border">
              <div className="flex items-center gap-3 text-primary">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-mono">optimal</span>
              </div>
            </div>

            {/* New floating status */}
            <div className="absolute top-1/2 -left-6 glass-effect rounded-lg p-3 elite-border animate-bounce">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-3 w-3" />
                <span className="text-xs font-mono">SYNC</span>
              </div>
            </div>

            <div className="absolute top-1/4 -right-6 glass-effect rounded-lg p-3 elite-border data-flow">
              <div className="flex items-center gap-2 text-blue-600">
                <Zap className="h-3 w-3" />
                <span className="text-xs font-mono">AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}