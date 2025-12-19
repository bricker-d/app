import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Activity } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { WaitlistForm } from '@/components/WaitlistForm';
import PricingSection from '@/components/PricingSection';

const Pricing = () => {
  const navigate = useNavigate();

  const competitors = [
    {
      name: 'BioPrecision',
      realTimeAlerts: true,
      labIntegration: true,
      personalizedInterventions: true,
      weeklyScoring: true,
      logo: Activity
    },
    {
      name: 'InsideTracker',
      realTimeAlerts: false,
      labIntegration: 'Sells tests',
      personalizedInterventions: 'Nutrition only',
      weeklyScoring: false,
    },
    {
      name: 'Levels',
      realTimeAlerts: 'CGM only',
      labIntegration: false,
      personalizedInterventions: 'Glucose only',
      weeklyScoring: false,
    },
    {
      name: 'Apple Health',
      realTimeAlerts: false,
      labIntegration: false,
      personalizedInterventions: false,
      weeklyScoring: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">BioPrecision</span>
            </button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>Home</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/features')}>Features</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/science')}>Science</Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/pricing')}>Pricing</Button>
              <Button size="sm" onClick={() => navigate('/auth')}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Pricing Section */}
      <PricingSection />

      {/* Competitor Comparison */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">Honest Comparison</Badge>
            <h2 className="text-3xl font-bold mb-4">
              How We Compare to <span className="text-primary">The Competition</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We explain YOUR labs (not sell you new tests), and keep you accountable (not just track data)
            </p>
          </div>

          <Card className="max-w-5xl mx-auto overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Platform</th>
                    <th className="text-center p-4 font-semibold">Accountability</th>
                    <th className="text-center p-4 font-semibold">Your Labs</th>
                    <th className="text-center p-4 font-semibold">Action Plans</th>
                    <th className="text-center p-4 font-semibold">Weekly Check-ins</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp, idx) => (
                    <tr key={idx} className={`border-t ${comp.logo ? 'bg-primary/5 font-semibold' : ''}`}>
                      <td className="p-4 flex items-center gap-2">
                        {comp.logo && <comp.logo className="w-5 h-5 text-primary" />}
                        {comp.name}
                      </td>
                      <td className="text-center p-4">
                        {comp.realTimeAlerts === true ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : comp.realTimeAlerts === false ? (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-xs text-muted-foreground">{comp.realTimeAlerts}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {comp.labIntegration === true ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : comp.labIntegration === false ? (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-xs text-muted-foreground">{comp.labIntegration}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {comp.personalizedInterventions === true ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : comp.personalizedInterventions === false ? (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-xs text-muted-foreground">{comp.personalizedInterventions}</span>
                        )}
                      </td>
                      <td className="text-center p-4">
                        {comp.weeklyScoring === true ? (
                          <Check className="w-5 h-5 text-success mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Why is this so cheap compared to InsideTracker?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Because we don't sell you lab tests. We explain the labs YOU already have. InsideTracker charges $300+ per test panel, then another $29/mo for the app. We just charge for the interpretation and accountability—no upsell.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Can I really start for free?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. During beta, you can upload 1 lab panel/month and get full AI analysis + recommendations. No credit card required. If you love it, upgrade to Essential ($4.99/mo) for unlimited labs and accountability features.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Why pay monthly if I only get labs 3-4 times per year?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Great question! You're paying for ongoing accountability between lab tests. Upload labs whenever you get them (3-4x/year is typical), but get weekly check-ins, progress tracking, and retest reminders year-round. Think of it like a gym membership—you don't go every day, but it keeps you consistent.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">What's the difference between Essential and Plus?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Essential ($4.99/mo) gives unlimited lab interpretations and weekly accountability. Plus ($9.99/mo) adds advanced biomarker analysis (ApoB, Lp(a), hsCRP), daily SMS nudges personalized to your last results, supplement recommendations, and optional CGM integration (+$10/mo, coming Q3).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Is my health data secure?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes. We're HIPAA-compliant and use bank-level encryption. Your data is never sold or shared. We only use it to generate your personalized recommendations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">Do I need a continuous glucose monitor (CGM)?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No. BioPrecision starts with your lab results (which you already have from annual checkups). CGM integration is an optional $10/mo add-on for Plus users who want real-time glucose tracking—coming Q3 2025.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Understand Your Health?</h2>
          <p className="text-muted-foreground mb-8">
            Join the waitlist to be notified when we launch
          </p>
          <WaitlistForm source="pricing_final_cta" buttonText="Join Waitlist" />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 BioPrecision. Understand your labs. Stay accountable.</p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;