import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Bell, TrendingUp, Droplets, Moon, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Nudge {
  id: string;
  message: string;
  nudge_type: string;
  priority: string;
  is_read: boolean;
  is_dismissed: boolean;
  created_at: string;
}

export function AdaptiveNudges() {
  const [nudges, setNudges] = useState<Nudge[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadNudges();
  }, []);

  const loadNudges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Always prepare sample nudges for demo
      const sampleNudges: Nudge[] = [
        {
          id: '1',
          message: "Glucose spikes have been higher this week. Try a 10-minute walk after meals to improve glucose disposal.",
          nudge_type: "glucose",
          priority: "high",
          is_read: false,
          is_dismissed: false,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          message: "Sleep debt building. Aim for a 9:30 PM bedtime tonight to restore your HRV (recovery capacity).",
          nudge_type: "sleep",
          priority: "high",
          is_read: false,
          is_dismissed: false,
          created_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '3',
          message: "HRV low and training load high. Today's ideal for Zone 2 only (easy, conversational pace).",
          nudge_type: "recovery",
          priority: "medium",
          is_read: false,
          is_dismissed: false,
          created_at: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: '4',
          message: "Great hydration today! Keep it up to support recovery and metabolic function.",
          nudge_type: "hydration",
          priority: "low",
          is_read: false,
          is_dismissed: false,
          created_at: new Date(Date.now() - 10800000).toISOString()
        }
      ];

      if (user) {
        const { data, error } = await supabase
          .from('nudges')
          .select('*')
          .eq('user_id', user.id)
          .eq('is_dismissed', false)
          .order('created_at', { ascending: false })
          .limit(10);

        if (!error && data && data.length > 0) {
          setNudges(data as Nudge[]);
          setLoading(false);
          return;
        }
      }

      // Use sample data if not logged in or no data exists
      setNudges(sampleNudges);
    } catch (error) {
      console.error('Error loading nudges:', error);
      // Show sample data on error
      setNudges([
        {
          id: '1',
          message: "Glucose spikes have been higher this week. Try a 10-minute walk after meals to improve glucose disposal.",
          nudge_type: "glucose",
          priority: "high",
          is_read: false,
          is_dismissed: false,
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const dismissNudge = async (id: string) => {
    try {
      setNudges(nudges.filter(n => n.id !== id));
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('nudges')
        .update({ is_dismissed: true })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error dismissing nudge:', error);
    }
  };

  const getIcon = (type: string) => {
    const icons: Record<string, any> = {
      glucose: Droplets,
      sleep: Moon,
      recovery: Activity,
      hydration: Droplets,
      default: TrendingUp
    };
    const Icon = icons[type] || icons.default;
    return <Icon className="h-5 w-5" />;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: "text-destructive",
      medium: "text-accent",
      low: "text-primary"
    };
    return colors[priority] || colors.medium;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      high: "bg-destructive/20 text-destructive border-destructive/30",
      medium: "bg-accent/20 text-accent border-accent/30",
      low: "bg-primary/20 text-primary border-primary/30"
    };
    return <Badge className={variants[priority] || variants.medium}>{priority}</Badge>;
  };

  if (loading) {
    return (
      <Card className="p-8 gradient-card">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-20 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  if (nudges.length === 0) {
    return (
      <Card className="p-8 gradient-card border-primary/30">
        <div className="text-center space-y-4">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-medium">All caught up!</h3>
          <p className="text-sm text-muted-foreground">
            No new nudges at the moment. Keep up the great work!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 gradient-card border-primary/30 shadow-neon">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light mb-1">Daily Nudges</h2>
            <p className="text-sm text-muted-foreground">
              Personalized micro-coaching based on your data
            </p>
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {nudges.length} active
          </Badge>
        </div>

        <div className="space-y-3">
          {nudges.map((nudge) => (
            <Card 
              key={nudge.id} 
              className="p-5 bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-300 relative group"
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 ${getPriorityColor(nudge.priority)}`}>
                  {getIcon(nudge.nudge_type)}
                </div>
                <div className="flex-1 pr-8">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm leading-relaxed">{nudge.message}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {getPriorityBadge(nudge.priority)}
                    <span>•</span>
                    <span>{new Date(nudge.created_at).toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit' 
                    })}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => dismissNudge(nudge.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}