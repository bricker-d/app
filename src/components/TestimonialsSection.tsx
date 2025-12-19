import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  role: string;
  result: string;
  quote: string;
  initials: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Desk Worker, 34",
    result: "LDL dropped 47 points in 12 weeks",
    quote: "My doctor said my cholesterol was 'borderline' but gave no real plan. BioPrecision showed me exactly what to change - and it worked. Now my labs are perfect.",
    initials: "SM",
    rating: 5
  },
  {
    name: "Marcus T.",
    role: "Athlete, 28",
    result: "HbA1c improved from 5.9% to 5.3%",
    quote: "I thought I was healthy until I saw my prediabetic A1C. The daily nudges kept me accountable. 6 months later, I'm in the optimal range.",
    initials: "MT",
    rating: 5
  },
  {
    name: "Jennifer K.",
    role: "Executive, 42",
    result: "Lost 18lbs, thyroid levels normalized",
    quote: "Finally understood why I was always tired. It wasn't just stress - my TSH was high. The app kept me on track with the right supplements and retest reminders.",
    initials: "JK",
    rating: 5
  },
  {
    name: "Dr. David R.",
    role: "Primary Care Physician",
    result: "Uses with 50+ patients",
    quote: "I recommend BioPrecision to patients who need accountability between visits. The plain-English explanations help them actually understand their labs and follow through.",
    initials: "DR",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Real Results</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Actual</span> People, Actual Outcomes
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            No marketing BS. These are real members who improved their biomarkers with BioPrecision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card 
              key={idx} 
              className="p-6 hover:shadow-glow transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group"
            >
              {/* Gradient glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-primary/20" />
                </div>

                {/* Star rating */}
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Result badge */}
                <Badge className="mb-4 bg-success/20 text-success border-success/30">
                  {testimonial.result}
                </Badge>

                {/* Quote */}
                <p className="text-foreground/90 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span>4.9/5 average rating</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <span>500+ labs analyzed</span>
          <div className="h-4 w-px bg-border" />
          <span>Medical advisory board verified</span>
        </div>
      </div>
    </section>
  );
};
