import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { 
  FileText, 
  Upload, 
  Brain, 
  TrendingUp, 
  Camera, 
  FileCode, 
  Edit, 
  Target, 
  CheckCircle, 
  Clock, 
  Bell, 
  Shield, 
  Lock, 
  Users, 
  Activity,
  Calendar,
  ClipboardList,
  Flame,
  ArrowRight,
  Check
} from "lucide-react";
import { DataEcosystemHub } from "@/components/DataEcosystemHub";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { WaitlistForm } from "@/components/WaitlistForm";
import { TestimonialsSection } from "@/components/TestimonialsSection";


export default function Landing() {
  const navigate = useNavigate();
  
  // Intersection observers for scroll animations
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [targetRef, targetInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [transparencyRef, transparencyInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [finalCtaRef, finalCtaInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-background/80 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Activity className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">BioPrecision</span>
            </button>

            <div className="flex items-center gap-6">
              <button onClick={() => navigate("/demo")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Demo
              </button>
              <button onClick={() => navigate("/science")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Science
              </button>
              <button onClick={() => navigate("/pricing")} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </button>
              <Button size="sm" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse delay-300" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/10 backdrop-blur-sm animate-fade-in">
                <FileText className="w-3 h-3 mr-1" />
                Lab Results Made Simple
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in">
                Your body{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-[gradient_3s_ease-in-out_infinite] bg-[length:200%_auto]">
                    decoded
                  </span>
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-glow to-accent blur-sm animate-pulse" />
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed animate-fade-in delay-100">
                Your personal health educator and accountability partner. Upload lab results, track biomarkers, and get actionable insights to optimize your health outcomes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="hero" onClick={() => navigate("/pricing")} className="group shadow-neon hover:shadow-glow">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/demo")} className="border-white/20 hover:bg-white/5">
                  See How It Works
                </Button>
              </div>

              {/* Trust Bar */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>HIPAA-secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  <span>Evidence-based</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>Private & encrypted</span>
                </div>
              </div>
            </div>

            {/* Right Side - Lab Analysis Preview */}
            <div className="relative animate-fade-in delay-200">
              {/* Floating Icons Background */}
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-300" />
              
              <Card className="relative glass-card border-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-glow hover:scale-[1.02] group overflow-hidden">
                {/* Animated Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/10 animate-pulse">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Analyzed
                    </Badge>
                    <Badge variant="outline" className="text-blue-400 border-blue-400/30 bg-blue-400/10 animate-pulse delay-75">
                      3 Recommendations
                    </Badge>
                  </div>
                  <CardTitle>Lab Analysis</CardTitle>
                  <CardDescription>Plain-English explanations</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-card/50 border border-border/50 hover:bg-card/70 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">LDL Cholesterol</h4>
                        <p className="text-sm text-muted-foreground">Low-Density Lipoprotein</p>
                      </div>
                      <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                        High
                      </Badge>
                    </div>
                    <div className="text-4xl font-bold mb-2">
                      146 <span className="text-sm text-muted-foreground font-normal">mg/dL</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your LDL is 46 points above optimal. This increases heart disease risk by 20%.
                    </p>
                    <div className="space-y-2 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-primary" />
                        <span>Increase fiber to 25g/day</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className="w-4 h-4 text-primary" />
                        <span>Add 150 min cardio/week</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Retest in 6-8 weeks</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">HDL</span>
                        <span className="text-xs font-semibold text-emerald-400">Good</span>
                      </div>
                      <div className="text-2xl font-bold">58 <span className="text-xs text-muted-foreground font-normal">mg/dL</span></div>
                    </div>
                    <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Glucose</span>
                        <span className="text-xs font-semibold text-emerald-400">Optimal</span>
                      </div>
                      <div className="text-2xl font-bold">92 <span className="text-xs text-muted-foreground font-normal">mg/dL</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent max-w-7xl mx-auto" />

      {/* Who It's For Section */}
      <section ref={targetRef} className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${targetInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Needs BioPrecision?</h2>
            <p className="text-muted-foreground text-lg">If you've ever stared at lab results and thought "what does this actually mean?", this is for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8 text-primary" />,
                title: "Annual Checkup Confusion",
                description: "Got bloodwork from your physical? We explain every number in 60 seconds—no WebMD rabbit holes.",
                delay: "delay-100"
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Parents Tracking Kids",
                description: "Your pediatrician said \"everything looks normal\"—but what does that actually mean? We show you.",
                delay: "delay-200"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-primary" />,
                title: "Biohackers & Athletes",
                description: "Already tracking labs? Add accountability with reminders, progress charts, and retest nudges.",
                delay: "delay-300"
              }
            ].map((item, index) => (
              <Card key={index} className={`glass-card border-white/10 hover:border-white/20 transition-all duration-500 hover-scale hover:shadow-glow ${targetInView ? `opacity-100 translate-y-0 ${item.delay}` : 'opacity-0 translate-y-10'}`}>
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent max-w-7xl mx-auto" />

      {/* How It Works Section */}
      <section ref={stepsRef} className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to understand your health</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className={`relative transition-all duration-700 delay-100 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Card className="glass-card border-white/10 h-full hover-scale hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <CardTitle>Upload Your Lab Results</CardTitle>
                  <CardDescription>
                    Take a photo of your lab report, upload a PDF, or enter values manually. We support lipid panels, metabolic panels, cardio markers, and more.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-white/20">
                      <Camera className="w-3 h-3 mr-1" />
                      Photo
                    </Badge>
                    <Badge variant="outline" className="border-white/20">
                      <FileCode className="w-3 h-3 mr-1" />
                      PDF
                    </Badge>
                    <Badge variant="outline" className="border-white/20">
                      <Edit className="w-3 h-3 mr-1" />
                      Manual
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className={`relative transition-all duration-700 delay-200 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Card className="glass-card border-white/10 h-full hover-scale hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <CardTitle>Get Plain-English Analysis</CardTitle>
                  <CardDescription>
                    Our AI translates medical jargon into clear explanations. No confusing terminology—just what your numbers mean and why they matter.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Doctor's Report:</p>
                    <p className="text-sm font-mono mb-2">LDL-C: 146 mg/dL</p>
                    <p className="text-xs text-muted-foreground mb-1">BioPrecision:</p>
                    <p className="text-sm">Your LDL is 46 points above optimal...</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 3 */}
            <div className={`relative transition-all duration-700 delay-300 ${stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Card className="glass-card border-white/10 h-full hover-scale hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <CardTitle>Follow Recommendations + Stay Accountable</CardTitle>
                  <CardDescription>
                    Receive specific action steps with progress tracking, weekly check-ins, and retest reminders so you never lose momentum.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                      <Bell className="w-4 h-4 text-primary" />
                      <span>Daily action reminders</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Weekly check-ins</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Retest alerts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent max-w-7xl mx-auto" />

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about BioPrecision
            </p>
          </div>

          <div className={`transition-all duration-700 delay-200 ${faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Do I need a wearable device to use BioPrecision?",
                  answer: "No! You only need your lab results. Devices are optional. BioPrecision is designed to work perfectly with just your bloodwork—whether that's a photo, PDF, or manual entry. Wearables are an add-on for power users who want even deeper insights."
                },
                {
                  question: "What lab panels do you support?",
                  answer: "We support all common lab panels including lipid panels (LDL, HDL, triglycerides), metabolic panels (glucose, HbA1c), advanced cardio markers (ApoB, Lp(a), hsCRP), thyroid panels (TSH, T3, T4), inflammation markers, liver function tests, kidney function tests, and more. If you have a lab result, we can likely interpret it."
                },
                {
                  question: "How do you keep my data secure?",
                  answer: "We're fully HIPAA-compliant with bank-level encryption for data at rest and in transit. Your health data is stored on secure servers with strict access controls. We never share, sell, or use your data for anything other than providing you with personalized health insights. You own your data and can export or delete it anytime."
                },
                {
                  question: "Can I connect a glucose monitor?",
                  answer: "Yes! If you already use a continuous glucose monitor (CGM) or fitness tracker, you can connect it as an optional add-on. This gives you real-time data alongside your lab results for even deeper insights. But remember—it's completely optional. BioPrecision works great with just your lab results."
                },
                {
                  question: "How do the reminders work?",
                  answer: "You're in complete control. Choose your preferred channels: in-app notifications, email, or SMS. We send daily action reminders (\"Don't forget to increase fiber today\"), weekly progress check-ins (\"How's your LDL improvement going?\"), and retest alerts (\"It's been 6 weeks—time to retest your lipid panel\"). You can customize frequency and timing in settings."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="glass-card border-white/10 rounded-lg px-6">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent max-w-7xl mx-auto" />

      {/* Testimonials */}
      <TestimonialsSection />


      {/* Optional Device Integration */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-white/20">Optional Advanced Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Already Using a Glucose Monitor? Take It Further
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              BioPrecision works perfectly with just your lab results. But if you already wear a CGM or fitness tracker, you can connect it for deeper insights.
            </p>
          </div>
          
          <DataEcosystemHub />
        </div>
      </section>

      {/* Visual Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent max-w-7xl mx-auto" />

      {/* Transparency Section */}
      <section ref={transparencyRef} className="py-20 px-4 bg-muted/30">
        <div className={`max-w-4xl mx-auto transition-all duration-700 ${transparencyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">Full Transparency</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What's Live Now vs <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Coming Soon</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We're pre-launch. Here's exactly where we are and where we're going.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                  <CardTitle className="text-xl">Live Now (Beta)</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Lab upload & AI interpretation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Plain-English explanations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Basic action recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <CardTitle className="text-xl">Coming Q2 2025</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Weekly accountability check-ins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Progress tracking over time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Advanced biomarker analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Daily personalized nudges</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 glass-card border-white/10">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Beta Program:</strong> During beta, we're validating our AI interpretation 
                accuracy and gathering feedback. You'll get free access to lab interpretation while we build out 
                the full accountability features. No credit card required, no pressure to upgrade.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Visual Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent max-w-7xl mx-auto" />

      {/* Final CTA */}
      <section ref={finalCtaRef} className="py-20 px-4">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${finalCtaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-card border-white/10 p-12 rounded-2xl hover:border-white/20 transition-all duration-300">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Ready to Finally Understand Your Lab Results?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join the waitlist to be notified when we launch
            </p>
            <WaitlistForm source="landing_final_cta" buttonText="Join Waitlist" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 BioPrecision. HIPAA-compliant health data management.</p>
        </div>
      </footer>
    </div>
  );
}
