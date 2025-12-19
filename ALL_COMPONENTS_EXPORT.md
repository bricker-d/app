import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Brain, TrendingUp, Activity, Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'nutrition' | 'exercise' | 'sleep' | 'recovery' | 'hydration';
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
  confidence: number;
}

const DEMO_RECOMMENDATIONS: Recommendation[] = [
  // Sample recommendations
];

export const AIRecommendations = () => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>(DEMO_RECOMMENDATIONS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date>(new Date());

  // ... rest of implementation
};

export function AccountabilityScore() {
  // Complete implementation showing 0-100 score with category breakdowns
  // ... full implementation
}

export function AdaptiveNudges() {
  // Real-time micro-coaching triggered by biomarker data
  // ... full implementation
}

export function BiofeedbackCard({...}: BiofeedbackCardProps) {
  // Card component for displaying urgent health actions
  // ... full implementation
}

export function BioPrecisionFeaturesShowcase() {
  // Displays all 6 core features: Accountability Score, Weekly BioPlan,
  // 12-Week Trajectory, Labs Optimization, Adaptive Nudges, Milestone Goals
  // ... full implementation
}

export function CustomizableWidgets() {
  // Drag-and-drop dashboard widgets with customization
  // ... full implementation
}

export function Dashboard({ demoMode = false, demoSpeed = 1 }: DashboardProps = {}) {
  // Main dashboard with live biomarker monitoring
  // Real-time metrics updating with status indicators
  // ... full implementation
}

export const DataEcosystemHub = () => {
  // Interactive visualization of all connected data sources
  // Shows Apple Watch, Oura, WHOOP, Garmin, Dexcom, etc.
  // ... full implementation
}

export function DataEntryFlow({ onComplete, showProgress = true }: DataEntryFlowProps) {
  // Multi-step data entry flow: Select metrics → Enter data → Review
  // Includes quick value buttons for common entries
  // ... full implementation
}

export const DataValidation = () => {
  // Automatic anomaly detection and health data quality checks
  // Validates readings against normal ranges and statistical outliers
  // ... full implementation
}

export const DeviceIntegration = () => {
  // Manage health device connections
  // Shows real-time sync status, battery levels, data streams
  // ... full implementation
}

export function EmptyState({ icon: Icon = Activity, title, description, action, className = "" }: EmptyStateProps) {
  // Generic empty state component
}

export function NoDataState() { /* Empty state for no health data */ }
export function NoDevicesState() { /* Empty state for no connected devices */ }
export function NoGoalsState() { /* Empty state for no health goals */ }
export function NoActionsState() { /* All caught up state */ }
export function NoHistoryState() { /* No health history state */ }

export function EnhancedHealthChart({...}: EnhancedHealthChartProps) {
  // Advanced chart with multiple views, time ranges, insights tabs
  // ... full implementation
}

export function EnhancedHero({ heroImage }: EnhancedHeroProps) {
  // Hero section with animated stats and floating indicators
  // ... full implementation
}

export function GoalTracking() {
  // Track health goals with milestones and progress
  // ... full implementation
}

export function HealthChart({...}: HealthChartProps) {
  // Simple health chart with trends and insights
  // ... full implementation
}

export function HealthCoachChat({ userData }: HealthCoachChatProps) {
  // Streaming AI chat interface with health context
  // Connects to health-coach-chat edge function
  // ... full implementation
}

export function HealthDataEntry({ onClose }: { onClose?: () => void }) {
  // Manual health data entry with validation and quick values
  // Categorized by body system (cardiovascular, hydration, etc.)
  // ... full implementation
}

export function HealthInsights({ insights, title = "AI Health Insights", showActions = true }) {
  // Displays AI-generated health insights with actions
  // ... full implementation
}

export function InteractiveDemo() {
  // Interactive simulation showing real-time biomarker tracking
  // Multiple scenarios: daily monitoring, exercise, recovery
  // ... full implementation (600+ lines)
}

export function LabsOptimization() {
  // Upload lab results and get optimization recommendations
  // Shows status (optimal/monitor/action needed) for each biomarker
  // ... full implementation
}

export const LiveDashboardDemo = () => {
  // Animated demo showing BioPrecision Score updating in real-time
  // Displays glucose, HRV, sleep, steps with live updates
  // ... full implementation
}

export function MetricChart({...}: MetricChartProps) {
  // Detailed metric chart with time range selection
  // Supports line and area charts with trend analysis
  // ... full implementation
}

export function MilestoneGoals() {
  // Track specific health milestones with deadlines
  // Examples: "Lower Resting Heart Rate by 5 bpm", "Improve HRV by 15%"
  // ... full implementation
}

export function NotificationSystem({...}: NotificationSystemProps) {
  // Comprehensive notification system with settings
  // Push, email, SMS channels with quiet hours
  // ... full implementation
}

export function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  // 6-step onboarding flow: Persona → Personal → Physical → Health → Tracking → Preferences
  // Saves complete user profile to database
  // ... full implementation (700+ lines)
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  // Fixed header with logo, navigation, and optional page title
  // ... full implementation
}

export const PersonaDemo = () => {
  // Interactive demo showing how BioPrecision adapts to different users
  // Switch between personas to see personalized insights/actions
  // ... full implementation (475 lines)
}

export const PhotoDataEntry = () => {
  // Upload lab results/health documents via photo
  // AI extracts metrics automatically using extract-lab-results edge function
  // ... full implementation
}

export function PredictiveInsights() {
  // AI-powered health forecasting
  // Predicts future values based on current patterns
  // Shows confidence levels and recommended interventions
  // ... full implementation (461 lines)
}

export function RealTimeActions() {
  // Time-sensitive health actions with countdown timers
  // Examples: "Drink 14.2 oz water in 8 minutes", "Take 4-minute walk"
  // Auto-generates new actions periodically
  // ... full implementation
}

export function TrajectoryView() {
  // 12-week trend tracking for HRV, glucose, sleep, VO₂ max
  // Shows improving/stable/declining trends for each metric
  // ... full implementation
}

export function UniversalHealthDemo() {
  // Landing page for voice coach demo
  // Shows how AI adapts to different user personas
  // ... full implementation
}

export function VoiceHealthCoach({ onClose }: VoiceHealthCoachProps) {
  // Full voice-enabled health coach
  // Uses voice-to-text and text-to-voice edge functions
  // Adapts coaching style based on user profile
  // ... full implementation (439 lines)
}

export function WeeklyBioPlan() {
  // Top 3-5 priorities for the week with reasoning
  // Examples: "Sleep: Get 30 More Minutes", "Post-Meal Walks", "Zone 2 Recovery"
  // Shows expected outcomes and timeframes
  // ... full implementation
}

// UI Components (src/components/ui/)

import { useToast, toast } from "@/hooks/use-toast";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { Check } from "lucide-react";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
};

export { Skeleton };

const Toaster = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};

export { Toaster, toast };

export { Badge, badgeVariants };

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
