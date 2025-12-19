import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VoiceHealthCoach } from './VoiceHealthCoach';
import { 
  Brain, 
  Mic, 
  Users, 
  Heart, 
  Activity, 
  Clock, 
  Zap, 
  Target,
  Shield,
  Sparkles,
  ChevronRight,
  Play
} from 'lucide-react';

const userPersonas = [
  {
    id: 'athlete',
    title: 'Elite Athlete',
    subtitle: 'Performance & Recovery',
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    description: 'Advanced sports nutrition, training optimization, and injury prevention',
    features: ['HRV Analysis', 'Recovery Protocols', 'Performance Metrics', 'Nutrition Timing'],
    color: 'from-yellow-500/20 to-orange-500/20',
    avatar: '🏃‍♂️'
  },
  {
    id: 'senior',
    title: 'Active Senior',
    subtitle: 'Healthy Aging',
    icon: <Heart className="h-6 w-6 text-pink-500" />,
    description: 'Maintaining independence, preventing falls, and promoting longevity',
    features: ['Fall Prevention', 'Medication Management', 'Gentle Exercise', 'Memory Health'],
    color: 'from-pink-500/20 to-rose-500/20',
    avatar: '👵'
  },
  {
    id: 'desk-worker',
    title: 'Desk Professional',
    subtitle: 'Workplace Wellness',
    icon: <Clock className="h-6 w-6 text-blue-500" />,
    description: 'Combat sedentary lifestyle with movement, posture, and energy optimization',
    features: ['Posture Breaks', 'Eye Strain Relief', 'Energy Boosting', 'Stress Management'],
    color: 'from-blue-500/20 to-cyan-500/20',
    avatar: '💻'
  },
  {
    id: 'parent',
    title: 'Busy Parent',
    subtitle: 'Family Health',
    icon: <Users className="h-6 w-6 text-green-500" />,
    description: 'Quick, effective wellness solutions for time-constrained lifestyles',
    features: ['Quick Workouts', 'Meal Prep Tips', 'Sleep Optimization', 'Stress Reduction'],
    color: 'from-green-500/20 to-emerald-500/20',
    avatar: '👨‍👩‍👧‍👦'
  }
];

const demoFeatures = [
  {
    icon: <Brain className="h-5 w-5 text-primary" />,
    title: 'Personalized AI Coach',
    description: 'Adapts coaching style and advice based on your age, lifestyle, and goals'
  },
  {
    icon: <Mic className="h-5 w-5 text-purple-500" />,
    title: 'Voice Interaction',
    description: 'Natural conversation with speech-to-text and text-to-speech capabilities'
  },
  {
    icon: <Target className="h-5 w-5 text-orange-500" />,
    title: 'Lifestyle-Specific',
    description: 'Tailored advice for athletes, seniors, desk workers, and busy families'
  },
  {
    icon: <Shield className="h-5 w-5 text-green-500" />,
    title: 'Evidence-Based',
    description: 'All recommendations backed by current health research and best practices'
  }
];

export function UniversalHealthDemo() {
  const [showCoach, setShowCoach] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  const handleStartDemo = (personaId?: string) => {
    setSelectedPersona(personaId || null);
    setShowCoach(true);
  };

  if (showCoach) {
    return <VoiceHealthCoach onClose={() => setShowCoach(false)} />;
  }

  return (
    <div className="min-h-screen bg-background gradient-hero">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center gap-2 px-6 py-3 text-base mb-6 shadow-glow">
            <Sparkles className="h-4 w-4" />
            AI Health Demo
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
            Universal Health Coach
            <span className="block bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent mt-2">
              For Every Lifestyle
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Experience personalized AI health coaching that adapts to your unique needs, 
            whether you're an athlete, senior, desk worker, or busy parent.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => handleStartDemo()}
              className="group h-16 px-8 text-lg shadow-neon hover:shadow-glow transition-all duration-500"
            >
              <Play className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
              Try Voice Demo Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 px-8 text-lg border-primary/30 hover:bg-primary/5 hover:shadow-glow"
            >
              <Brain className="mr-3 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {demoFeatures.map((feature, index) => (
            <Card key={index} className="p-6 text-center elite-hover gradient-card">
              <div className="p-3 rounded-full bg-background w-fit mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* User Personas */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Designed for <span className="text-primary">Everyone</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI adapts its coaching style, vocabulary, and recommendations 
              based on your lifestyle and health goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userPersonas.map((persona) => (
              <Card 
                key={persona.id} 
                className={`p-6 elite-hover cursor-pointer transition-all duration-300 bg-gradient-to-br ${persona.color} border-border hover:border-primary/50 hover:shadow-glow`}
                onClick={() => handleStartDemo(persona.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{persona.avatar}</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {persona.icon}
                    <h3 className="font-semibold">{persona.title}</h3>
                  </div>
                  <Badge variant="outline" className="mb-3 text-xs">
                    {persona.subtitle}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {persona.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {persona.features.map((feature, idx) => (
                      <div key={idx} className="text-xs bg-background/50 rounded-full px-3 py-1">
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full group"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartDemo(persona.id);
                    }}
                  >
                    Try Demo
                    <ChevronRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Demo Preview */}
        <Card className="p-8 md:p-12 text-center gradient-card border-primary/20 shadow-neon">
          <div className="max-w-3xl mx-auto">
            <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6">
              <Mic className="h-8 w-8 text-primary" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Experience Natural Health Conversations
            </h3>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Simply speak or type your health questions and get instant, personalized advice. 
              Our AI understands context, remembers your goals, and provides actionable recommendations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-sm">
              <div className="p-4 bg-muted/50 rounded-lg">
                <strong>"I'm tired after lunch every day"</strong>
                <br />
                <span className="text-muted-foreground">→ Blood sugar & meal timing advice</span>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <strong>"My back hurts from sitting"</strong>
                <br />
                <span className="text-muted-foreground">→ Posture exercises & movement breaks</span>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <strong>"How can I sleep better?"</strong>
                <br />
                <span className="text-muted-foreground">→ Personalized sleep hygiene plan</span>
              </div>
            </div>
            
            <Button 
              size="lg" 
              onClick={() => handleStartDemo()}
              className="group h-16 px-10 text-lg shadow-neon hover:shadow-glow transition-all duration-500"
            >
              <Play className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
              Start Interactive Demo
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}