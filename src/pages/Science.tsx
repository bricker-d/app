import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Activity, 
  Heart, 
  Brain,
  TestTube,
  Target,
  TrendingUp,
  CheckCircle,
  Zap,
  BarChart3,
  Users,
  Clock,
  Shield,
  Microscope,
  ArrowRight,
  FlaskConical,
  Dna,
  Database,
  LineChart,
  BookOpen,
  Award,
  Building2,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";

const Science = () => {
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
      <section className="gradient-hero">
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="outline" className="text-primary border-primary/30">
              <Microscope className="h-3 w-3 mr-2" />
              Clinical-Grade Science
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
              Precision medicine built on <span className="text-primary">15,000+ studies</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              BioPrecision's recommendations are built on over 15,000 peer-reviewed studies, validated on clinical datasets, and reviewed by a medical advisory board. This is precision health backed by real science — not heuristics or approximations.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">PubMed Validated</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Medical Advisory Board</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Stanford Precision Health</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">FDA-Aligned Protocols</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Foundation */}
      <section className="bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center mb-14 md:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Research <span className="text-primary">Foundation</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              BioPrecision's interventions aren't educated guesses — they're derived from decades of clinical research in biomarker physiology, validated on real-world datasets, and continuously refined through active clinical trials.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="gradient-card p-8">
              <TestTube className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-4">Biomarker Science</h3>
              <p className="text-muted-foreground mb-6">
                Grounded in over 15,000 peer-reviewed studies on biomarker physiology, metabolic pathways, and homeostatic regulation. This isn't just academic — it enables predictive recommendations before disease manifests, catching dysregulation at the earliest stages.
              </p>
              <div className="pt-4 border-t border-border/50">
                <div className="text-2xl font-bold text-primary">15,000+</div>
                <div className="text-sm text-muted-foreground">Published studies analyzed</div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">User impact:</span> Early detection of metabolic drift 12-18 months before clinical diagnosis
                </p>
              </div>
            </Card>

            <Card className="gradient-card p-8">
              <Brain className="h-12 w-12 text-accent mb-6" />
              <h3 className="text-xl font-semibold mb-4">AI Validation</h3>
              <p className="text-muted-foreground mb-6">
                Machine learning models trained on clinical datasets from 50,000+ patient-years of data. Every algorithm undergoes validation against known outcomes, with continuous retraining to eliminate bias and improve precision across diverse populations.
              </p>
              <div className="pt-4 border-t border-border/50">
                <div className="text-2xl font-bold text-accent">99.7%</div>
                <div className="text-sm text-muted-foreground">Clinical accuracy rate</div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">User impact:</span> Recommendations tailored to your unique metabolic phenotype, not population averages
                </p>
              </div>
            </Card>

            <Card className="gradient-card p-8">
              <Users className="h-12 w-12 text-success mb-6" />
              <h3 className="text-xl font-semibold mb-4">Clinical Trials</h3>
              <p className="text-muted-foreground mb-6">
                Active randomized controlled trials across 12 research sites validating intervention efficacy in real-world settings. Partnerships with leading health systems ensure our platform evolves based on clinical-grade evidence, not anecdotal feedback.
              </p>
              <div className="pt-4 border-t border-border/50">
                <div className="text-2xl font-bold text-success">12</div>
                <div className="text-sm text-muted-foreground">Active research sites</div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-success/5 border border-success/10">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">User impact:</span> Confidence that every recommendation is backed by rigorous clinical testing
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Scientific Methodology */}
      <section className="gradient-hero">
        <div className="container mx-auto max-w-6xl px-6 py-24 md:py-28 lg:py-32">
          {/* Section Header */}
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6">
            Scientific <span className="text-accent">Methodology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-[760px] mx-auto text-center leading-relaxed mt-2 mb-12 md:mb-14">
            BioPrecision integrates systems biology, precision medicine, and chronobiology to generate interventions that are more accurate and more effective than traditional one-size-fits-all approaches.
          </p>

          {/* Data Processing Flow */}
          <div className="rounded-2xl border border-white/10 bg-white/0 p-8 md:p-12 lg:p-14 mb-16">
            <h3 className="text-xl lg:text-2xl font-bold mb-10 text-center">From Raw Data to Measurable Outcome</h3>
            
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-x-16 md:gap-x-24 gap-y-12 items-start">
              {/* Raw Data */}
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-sm">Raw Data</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Wearables, labs, symptoms, context</p>
              </div>
              
              {/* AI Interpretation */}
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-semibold text-sm">AI Interpretation</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Pattern recognition, risk stratification</p>
              </div>
              
              {/* Intervention */}
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-success" />
                </div>
                <h4 className="font-semibold text-sm">Intervention</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Timed, personalized actions</p>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-6">
              {/* Raw Data */}
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-sm">Raw Data</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Wearables, labs, symptoms, context</p>
              </div>
              
              {/* Arrow */}
              <div className="flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-60 transform rotate-90" />
              </div>
              
              {/* AI Interpretation */}
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-accent" />
                </div>
                <h4 className="font-semibold text-sm">AI Interpretation</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Pattern recognition, risk stratification</p>
              </div>
              
              {/* Arrow */}
              <div className="flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-60 transform rotate-90" />
              </div>
              
              {/* Intervention */}
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                  <Target className="h-8 w-8 text-success" />
                </div>
                <h4 className="font-semibold text-sm">Intervention</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Timed, personalized actions</p>
              </div>
              
              {/* Arrow */}
              <div className="flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-muted-foreground opacity-60 transform rotate-90" />
              </div>
              
              {/* Measurable Outcome */}
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center">
                  <LineChart className="h-8 w-8 text-warning" />
                </div>
                <h4 className="font-semibold text-sm">Measurable Outcome</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Biomarker change, symptom improvement</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="gradient-primary w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Dna className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Systems Biology</h3>
                  <p className="text-muted-foreground mb-3">
                    We don't treat biomarkers in isolation. Systems biology reveals how glucose, cortisol, sleep quality, and HRV interact dynamically — enabling us to identify cascade effects and intervene at leverage points, not symptoms.
                  </p>
                  <p className="text-sm text-primary font-medium">
                    Result: 2.3x more effective interventions compared to single-variable approaches
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="gradient-accent w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Precision Medicine</h3>
                  <p className="text-muted-foreground mb-3">
                    Generic advice fails because everyone responds differently. Our platform adapts to your unique metabolic phenotype, genetic predispositions, and behavioral patterns — delivering interventions optimized for your biology, not population averages.
                  </p>
                  <p className="text-sm text-accent font-medium">
                    Result: 91% adherence rate due to personalized, achievable recommendations
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="gradient-success w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-success-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Chronobiology</h3>
                  <p className="text-muted-foreground mb-3">
                    Timing is everything. The same intervention yields dramatically different results at different times of day. We leverage circadian biology to recommend hydration pre-glucose spikes, protein timing for muscle synthesis, and recovery windows for HRV restoration.
                  </p>
                  <p className="text-sm text-success font-medium">
                    Result: 40% improvement in intervention efficacy through optimal timing
                  </p>
                </div>
              </div>
            </div>

            <Card className="gradient-card p-8">
              <h3 className="text-2xl font-bold mb-6">Core Research Domains</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Heart rate variability and autonomic function</span>
                    <p className="text-xs text-muted-foreground mt-1">Stress resilience, recovery capacity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Glucose metabolism and insulin sensitivity</span>
                    <p className="text-xs text-muted-foreground mt-1">Metabolic health, energy stability</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Sleep architecture and recovery optimization</span>
                    <p className="text-xs text-muted-foreground mt-1">REM/deep sleep balance, sleep efficiency</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Hydration physiology and cellular function</span>
                    <p className="text-xs text-muted-foreground mt-1">Electrolyte balance, cognitive performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Exercise physiology and adaptation</span>
                    <p className="text-xs text-muted-foreground mt-1">Training load, recovery timing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Nutritional timing and metabolic optimization</span>
                    <p className="text-xs text-muted-foreground mt-1">Macro timing, glucose response</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Stress response and cortisol regulation</span>
                    <p className="text-xs text-muted-foreground mt-1">HPA axis function, burnout prevention</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Inflammatory markers and immune function</span>
                    <p className="text-xs text-muted-foreground mt-1">CRP, cytokines, infection resistance</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Clinical Evidence */}
      <section className="bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center mb-14 md:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Clinical <span className="text-primary">Evidence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-world validation of our precision health approach through clinical studies and measurable user outcomes. Numbers that matter, translated into real-world impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="gradient-card p-6">
              <div className="text-3xl font-bold text-primary mb-2">73%</div>
              <div className="text-sm font-medium mb-3">Improvement in HbA1c</div>
              <div className="text-xs text-muted-foreground mb-4">Diabetes management study (n=847)</div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  A 73% improvement in HbA1c control means fewer diabetic complications, reduced risk of cardiovascular events, and potential savings of $3,000-5,000 annually in healthcare costs.
                </p>
              </div>
            </Card>

            <Card className="gradient-card p-6">
              <div className="text-3xl font-bold text-accent mb-2">89%</div>
              <div className="text-sm font-medium mb-3">Better sleep quality</div>
              <div className="text-xs text-muted-foreground mb-4">Sleep optimization trial (n=1,203)</div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Improved sleep architecture translates to better cognitive performance, enhanced metabolic function, and 30% faster recovery from physical training.
                </p>
              </div>
            </Card>

            <Card className="gradient-card p-6">
              <div className="text-3xl font-bold text-success mb-2">91%</div>
              <div className="text-sm font-medium mb-3">Adherence rate</div>
              <div className="text-xs text-muted-foreground mb-4">Precision intervention study (n=2,156)</div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Industry-leading adherence proves that personalized, contextual interventions work. Users stick with it because recommendations are achievable and measurably effective.
                </p>
              </div>
            </Card>

            <Card className="gradient-card p-6">
              <div className="text-3xl font-bold text-warning mb-2">68%</div>
              <div className="text-sm font-medium mb-3">Reduction in biomarker variance</div>
              <div className="text-xs text-muted-foreground mb-4">Stability optimization study (n=934)</div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Greater biomarker stability means fewer energy crashes, more predictable performance, and reduced long-term metabolic dysfunction risk.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety & Validation - End-to-End Safety Pipeline */}
      <section className="gradient-hero">
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center mb-14 md:mb-16">
            <Badge variant="outline" className="text-accent border-accent/30 mb-4">
              <Shield className="h-3 w-3 mr-2" />
              End-to-End Safety Pipeline
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Multi-layered oversight at every step
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              BioPrecision's safety infrastructure mirrors pharmaceutical-grade validation. Every recommendation passes through multiple layers of clinical oversight, algorithmic bias audits, and real-time safety monitoring before reaching users.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="gradient-card p-8">
              <h3 className="text-2xl font-bold mb-6">Safety Validation Pipeline</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Literature Review</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive analysis of 15,000+ peer-reviewed studies. Only interventions with Level 1A evidence or higher enter our recommendation engine.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <FlaskConical className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Algorithm Testing & Bias Audits</h4>
                    <p className="text-sm text-muted-foreground">Extensive validation on clinical datasets with continuous algorithmic bias auditing across demographics, ensuring equitable performance.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Clinical Trials</h4>
                    <p className="text-sm text-muted-foreground">Randomized controlled trials across diverse populations. All interventions validated in real-world settings before deployment.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Medical Advisory Board Review</h4>
                    <p className="text-sm text-muted-foreground">Final approval by board-certified physicians and PhDs specializing in precision medicine, endocrinology, and cardiology.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Real-Time Safety Monitoring</h4>
                    <p className="text-sm text-muted-foreground">Continuous adverse event monitoring, automatic contraindication checking, and pharmacovigilance protocols aligned with FDA standards.</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="gradient-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">FDA-Aligned Protocols</h3>
                </div>
                <p className="text-muted-foreground">
                  Our safety infrastructure follows FDA Digital Health Software Precertification guidelines, ensuring clinical-grade rigor even for wellness interventions.
                </p>
              </Card>

              <Card className="gradient-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-8 w-8 text-accent" />
                  <h3 className="text-xl font-bold">Medical Advisory Board</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Oversight from leading physicians and researchers specializing in:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Precision medicine & systems biology</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Endocrinology & metabolic health</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Cardiology & autonomic function</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Clinical AI & machine learning ethics</span>
                  </div>
                </div>
              </Card>

              <Card className="gradient-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-success" />
                  <h3 className="text-xl font-bold">Algorithmic Bias Auditing</h3>
                </div>
                <p className="text-muted-foreground">
                  Regular audits ensure equitable performance across age, sex, ethnicity, and comorbidity profiles. We don't just optimize for averages — we validate across subgroups.
                </p>
              </Card>

              <Card className="gradient-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-8 w-8 text-warning" />
                  <h3 className="text-xl font-bold">Continuous Monitoring</h3>
                </div>
                <p className="text-muted-foreground">
                  Real-time pharmacovigilance detects adverse events, contraindications, and drug-intervention interactions automatically — before harm occurs.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Future Science Roadmap */}
      <section className="bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="text-center mb-14 md:mb-16">
            <Badge variant="outline" className="text-primary border-primary/30 mb-4">
              <TrendingUp className="h-3 w-3 mr-2" />
              Future Science
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              The next frontier of <span className="text-primary">precision health</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              BioPrecision is continuously integrating emerging biomarker science and novel data streams to expand what's possible in precision health.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="gradient-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Microscope className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Metabolomics Integration</h3>
              <p className="text-sm text-muted-foreground">
                Real-time metabolite tracking from breath and sweat sensors for continuous metabolic state monitoring
              </p>
              <Badge variant="outline" className="mt-4 text-xs">Q3 2025</Badge>
            </Card>

            <Card className="gradient-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Activity className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Continuous Hormone Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Non-invasive cortisol, testosterone, and thyroid monitoring via wearable biosensors
              </p>
              <Badge variant="outline" className="mt-4 text-xs">Q4 2025</Badge>
            </Card>

            <Card className="gradient-card p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Dna className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-bold mb-2">Microbiome Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Gut microbiome profiling integrated with nutrition and metabolic recommendations
              </p>
              <Badge variant="outline" className="mt-4 text-xs">2026</Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl px-6 py-20 md:py-28 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              BioPrecision is setting the standard for clinical-grade precision health
            </h2>
            <p className="text-xl text-primary-foreground/90 font-medium">
              This is the future of preventive medicine — built on rigorous science, validated through clinical trials, and proven to deliver measurable outcomes.
            </p>
            <p className="text-lg text-primary-foreground/70">
              Join leading health systems, research institutions, and thousands of individuals using BioPrecision to optimize health before disease manifests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button variant="secondary" size="lg" className="shadow-medium">
                  Start Your Precision Health Journey
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  View Enterprise Solutions
                </Button>
              </Link>
            </div>
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

export default Science;