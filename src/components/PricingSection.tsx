import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    period: "month",
    stripePriceId: null,
    description: "Get started with basic lab analysis",
    features: [
      "1 lab interpretation",
      "Basic recommendations",
      "View results for 30 days",
      "Email support",
    ],
    cta: "Join free beta",
    variant: "secondary" as const,
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9.99",
    period: "month",
    stripePriceId: "price_pro_999",
    description: "Everything you need for optimal health",
    features: [
      "Unlimited lab interpretations",
      "Advanced biomarker insights (ApoB, lp(a), hsCRP)",
      "Weekly accountability check-ins",
      "Supplement recommendations",
      "Export reports for your doctor",
      "Priority support",
    ],
    cta: "Get started",
    variant: "default" as const,
    popular: true,
    guarantee: "30-day money-back guarantee",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: null,
    stripePriceId: null,
    description: "For clinics and organizations",
    features: [
      "Patient monitoring at scale",
      "Multi-user / clinic access",
      "White-label reporting",
      "Dedicated onboarding",
    ],
    cta: "Contact sales",
    variant: "outline" as const,
    popular: false,
  },
];

export default function PricingSection() {
  const handleSelectPlan = (plan: typeof PLANS[0]) => {
    console.log("Selected plan:", plan.id);
    // TODO: Connect to Stripe Checkout
  };

  return (
    <section className="relative py-24 px-4">
      <div className="absolute top-4 right-4 text-xs text-muted-foreground">
        No setup fees. Cancel anytime.
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Plans built for performance-driven clients.
          </h2>
          <p className="text-muted-foreground">
            Start free, upgrade when you want deeper biomarker insights.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Mobile: Show Pro first */}
          <div className="md:hidden">
            {PLANS.filter(p => p.popular).map(plan => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onSelect={() => handleSelectPlan(plan)}
              />
            ))}
          </div>

          {/* Desktop: Show in order, but Pro is visually dominant */}
          {PLANS.map((plan, idx) => (
            <div
              key={plan.id}
              className={plan.popular ? "md:block hidden" : ""}
            >
              <PricingCard
                plan={plan}
                onSelect={() => handleSelectPlan(plan)}
              />
            </div>
          ))}

          {/* Mobile: Show Starter and Enterprise after Pro */}
          <div className="md:hidden space-y-6">
            {PLANS.filter(p => !p.popular).map(plan => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onSelect={() => handleSelectPlan(plan)}
              />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Questions about pricing? Contact support.
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  onSelect,
}: {
  plan: typeof PLANS[0];
  onSelect: () => void;
}) {
  return (
    <div
      className={`relative rounded-lg p-8 transition-all duration-300 ${
        plan.popular
          ? "bg-card border-2 border-accent shadow-accent-glow md:scale-105"
          : "bg-card border border-border hover:border-accent/30"
      }`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-accent text-accent-foreground px-3 py-1">
            Most Popular
          </Badge>
        </div>
      )}

      {/* Plan Name */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {plan.name}
        </h3>
        <p className="text-sm text-muted-foreground">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-muted-foreground">/ {plan.period}</span>
          )}
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Button
        onClick={onSelect}
        variant={plan.variant}
        className="w-full"
        size="lg"
      >
        {plan.cta}
      </Button>

      {/* Guarantee */}
      {plan.guarantee && (
        <p className="text-xs text-center text-muted-foreground mt-3">
          {plan.guarantee}
        </p>
      )}
    </div>
  );
}
