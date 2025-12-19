import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  Heart, 
  Smartphone, 
  TestTube, 
  Clock,
  Users,
  Shield,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Zap,
  Brain,
  Target,
  BarChart3,
  Lightbulb
} from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Activity className="h-6 w-6 text-primary pulse-data" />
              <span className="text-xl font-bold">BioPrecision</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/"><Button variant="ghost" size="sm">Home</Button></Link>
              <Link to="/features"><Button variant="ghost" size="sm">Features</Button></Link>
              <Link to="/science"><Button variant="ghost" size="sm">Science</Button></Link>
              <Link to="/pricing"><Button variant="ghost" size="sm">Pricing</Button></Link>
              <Link to="/auth"><Button variant="hero" size="sm">Get Started</Button></Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="outline" className="text-primary border-primary/30">
              Platform Features
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
              Every feature designed for <span className="text-primary">precision</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              From real-time biomarker analysis to personalized action delivery, 
              every component of BioPrecision works in harmony to optimize your health.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Core <span className="text-primary">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive health optimization powered by advanced AI and real-time data processing.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="gradient-card p-8">
              <Brain className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-4">AI-Powered Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Advanced machine learning algorithms analyze your unique biopatterns to identify 
                optimization opportunities in real-time.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Pattern recognition across 50+ biomarkers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Predictive health modeling</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Personalized baseline establishment</span>
                </li>
              </ul>
            </Card>

            <Card className="gradient-card p-8">
              <Target className="h-12 w-12 text-accent mb-6" />
              <h3 className="text-xl font-semibold mb-4">Precision Actions</h3>
              <p className="text-muted-foreground mb-6">
                Get exact, quantified recommendations tailored to your current physiological state 
                and delivered at optimal timing.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Specific quantities and timing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Context-aware recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Multi-modal delivery (app, wearable, voice)</span>
                </li>
              </ul>
            </Card>

            <Card className="gradient-card p-8">
              <BarChart3 className="h-12 w-12 text-success mb-6" />
              <h3 className="text-xl font-semibold mb-4">Real-Time Monitoring</h3>
              <p className="text-muted-foreground mb-6">
                Continuous tracking of key biomarkers with instant feedback loops 
                to maintain optimal health states.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>24/7 biomarker surveillance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Anomaly detection and alerts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Trend analysis and projections</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Features */}
      <section className="py-20 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Universal <span className="text-accent">Integration</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Seamlessly connects with your existing health ecosystem for comprehensive monitoring.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="gradient-card p-6 text-center">
              <Smartphone className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Wearable Devices</h3>
              <p className="text-sm text-muted-foreground">Apple Watch, Fitbit, Oura Ring, WHOOP, Garmin</p>
            </Card>

            <Card className="gradient-card p-6 text-center">
              <TestTube className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lab Integration</h3>
              <p className="text-sm text-muted-foreground">Blood panels, continuous glucose monitors, metabolic testing</p>
            </Card>

            <Card className="gradient-card p-6 text-center">
              <Activity className="h-10 w-10 text-success mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Health Apps</h3>
              <p className="text-sm text-muted-foreground">MyFitnessPal, Strava, Apple Health, Google Fit</p>
            </Card>

            <Card className="gradient-card p-6 text-center">
              <Users className="h-10 w-10 text-warning mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Manual Input</h3>
              <p className="text-sm text-muted-foreground">Mood tracking, symptom logging, meal documentation</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Advanced <span className="text-primary">Capabilities</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="gradient-primary w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Contextual Intelligence</h3>
                  <p className="text-muted-foreground">
                    Our AI considers your environment, schedule, preferences, and current activities 
                    to deliver perfectly timed recommendations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="gradient-accent w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Adaptive Learning</h3>
                  <p className="text-muted-foreground">
                    The system continuously learns from your responses and outcomes, 
                    becoming more accurate and personalized over time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="gradient-success w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-success-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
                  <p className="text-muted-foreground">
                    HIPAA-compliant data handling with end-to-end encryption 
                    and user-controlled data permissions.
                  </p>
                </div>
              </div>
            </div>

            <Card className="gradient-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Example Precision Actions</h3>
              <div className="space-y-4">
                <div className="bg-primary/10 rounded-lg p-4">
                  <p className="font-medium text-primary">"Drink 14 ounces of water now"</p>
                  <p className="text-sm text-muted-foreground mt-1">Based on heart rate variability indicating dehydration</p>
                </div>
                
                <div className="bg-accent/10 rounded-lg p-4">
                  <p className="font-medium text-accent">"Walk for 5 minutes to reset glucose"</p>
                  <p className="text-sm text-muted-foreground mt-1">CGM shows elevated levels, movement will optimize insulin sensitivity</p>
                </div>
                
                <div className="bg-success/10 rounded-lg p-4">
                  <p className="font-medium text-success">"Add 25g protein at next meal"</p>
                  <p className="text-sm text-muted-foreground mt-1">Muscle protein synthesis window identified from activity data</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to experience precision health?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join thousands who've transformed their health with real-time, personalized guidance.
            </p>
            <Link to="/auth">
              <Button variant="secondary" size="lg" className="shadow-medium">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Activity className="h-5 w-5 text-primary" />
              <span className="font-semibold">BioPrecision</span>
              <span className="text-muted-foreground">© 2024</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <a href="#" className="hover:text-foreground transition-colors">API</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;