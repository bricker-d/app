import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Activity, 
  TrendingUp, 
  Plus, 
  Smartphone, 
  Heart,
  BarChart3,
  Target
} from "lucide-react";

interface EmptyStateProps {
  icon?: React.ComponentType<any>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  icon: Icon = Activity, 
  title, 
  description, 
  action,
  className = ""
}: EmptyStateProps) {
  return (
    <Card className={`glass-effect border-dashed border-2 border-muted/50 ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="mb-4">
          <Icon className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
        {action && (
          <Button onClick={action.onClick} className="gap-2">
            <Plus className="h-4 w-4" />
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function NoDataState() {
  return (
    <EmptyState
      icon={BarChart3}
      title="No Health Data Yet"
      description="Start tracking your health metrics by connecting a device or manually entering data to see your personalized insights."
      action={{
        label: "Add First Reading",
        onClick: () => console.log("Navigate to data entry")
      }}
    />
  );
}

export function NoDevicesState() {
  return (
    <EmptyState
      icon={Smartphone}
      title="No Devices Connected"
      description="Connect your wearables and health devices to automatically sync your biometric data for real-time insights."
      action={{
        label: "Connect Device",
        onClick: () => console.log("Navigate to device setup")
      }}
    />
  );
}

export function NoGoalsState() {
  return (
    <EmptyState
      icon={Target}
      title="No Health Goals Set"
      description="Set personalized health targets to track your progress and receive tailored recommendations for optimal wellness."
      action={{
        label: "Set First Goal",
        onClick: () => console.log("Navigate to goal setting")
      }}
    />
  );
}

export function NoActionsState() {
  return (
    <EmptyState
      icon={TrendingUp}
      title="All Caught Up!"
      description="Great job! You've completed all your health actions for now. Check back later for new personalized recommendations."
    />
  );
}

export function NoHistoryState() {
  return (
    <EmptyState
      icon={Heart}
      title="No Health History"
      description="Your health timeline will appear here as you track metrics and follow recommendations. Start your wellness journey today!"
      action={{
        label: "Take First Reading",
        onClick: () => console.log("Navigate to data entry")
      }}
    />
  );
}