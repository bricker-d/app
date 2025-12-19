import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, AlertCircle } from "lucide-react";

interface BiofeedbackCardProps {
  title: string;
  action: string;
  urgency: "low" | "medium" | "high";
  timeAgo?: string;
  metric?: string;
  value?: string;
  trend?: "up" | "down" | "stable";
}

export function BiofeedbackCard({
  title,
  action,
  urgency,
  timeAgo = "2m ago",
  metric,
  value,
  trend = "stable"
}: BiofeedbackCardProps) {
  const getUrgencyStyles = () => {
    switch (urgency) {
      case "high":
        return "border-l-warning bg-warning/5 shadow-accent-glow";
      case "medium":
        return "border-l-accent bg-accent/5";
      case "low":
        return "border-l-success bg-success/5";
      default:
        return "border-l-primary bg-primary/5";
    }
  };

  const getUrgencyBadge = () => {
    switch (urgency) {
      case "high":
        return <Badge variant="destructive" className="text-xs">Urgent</Badge>;
      case "medium":
        return <Badge variant="secondary" className="text-xs">Moderate</Badge>;
      case "low":
        return <Badge variant="outline" className="text-xs">Info</Badge>;
    }
  };

  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-success" />;
    if (trend === "down") return <TrendingUp className="h-3 w-3 text-warning rotate-180" />;
    return null;
  };

  return (
    <Card className={`gradient-card border-l-4 p-4 ${getUrgencyStyles()} ${urgency === "high" ? "pulse-gentle" : ""}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">{title}</span>
        </div>
        {getUrgencyBadge()}
      </div>
      
      <p className="text-foreground font-semibold mb-3 text-balance">
        {action}
      </p>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>{timeAgo}</span>
        </div>
        
        {metric && value && (
          <div className="flex items-center gap-1">
            <span>{metric}:</span>
            <span className="font-medium">{value}</span>
            {getTrendIcon()}
          </div>
        )}
      </div>
    </Card>
  );
}