import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Target, TrendingUp, Calendar, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  description: string;
  current_value: number;
  target_value: number;
  unit: string;
  start_date: string;
  target_date: string;
  status: string;
  progress: number;
}

export function MilestoneGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal_type: "health",
    target_value: "",
    unit: "",
    target_date: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Always prepare sample goals for demo
      const sampleGoals: Goal[] = [
        {
          id: '1',
          title: "Lower Resting Heart Rate by 5 bpm",
          description: "Improve cardiovascular fitness and efficiency",
          current_value: 68,
          target_value: 63,
          unit: "bpm",
          start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          target_date: new Date(Date.now() + 12 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: "active",
          progress: 60
        },
        {
          id: '2',
          title: "Improve HRV by 15%",
          description: "Enhance recovery capacity and autonomic balance",
          current_value: 52,
          target_value: 60,
          unit: "ms",
          start_date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          target_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: "active",
          progress: 45
        },
        {
          id: '3',
          title: "Normalize Fasting Insulin",
          description: "Achieve optimal metabolic health (<10 μIU/mL)",
          current_value: 12,
          target_value: 9,
          unit: "μIU/mL",
          start_date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          target_date: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: "active",
          progress: 25
        }
      ];

      if (user) {
        const { data, error } = await supabase
          .from('goals')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const goalsWithProgress = data.map(goal => {
            const progress = goal.target_value > 0 
              ? Math.min(100, ((goal.current_value || 0) / goal.target_value) * 100)
              : 0;
            return { ...goal, progress } as Goal;
          });
          setGoals(goalsWithProgress);
          setLoading(false);
          return;
        }
      }

      // Use sample data if not logged in or no data exists
      setGoals(sampleGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
      // Show sample data on error
      setGoals([
        {
          id: '1',
          title: "Lower Resting Heart Rate by 5 bpm",
          description: "Improve cardiovascular fitness and efficiency",
          current_value: 68,
          target_value: 63,
          unit: "bpm",
          start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          target_date: new Date(Date.now() + 12 * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: "active",
          progress: 60
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getDaysRemaining = (targetDate: string) => {
    const days = Math.ceil((new Date(targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const handleAddGoal = async () => {
    if (!formData.title || !formData.target_value || !formData.unit) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newGoal: Goal = {
      id: `temp-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      current_value: 0,
      target_value: parseFloat(formData.target_value),
      unit: formData.unit,
      start_date: new Date().toISOString().split('T')[0],
      target_date: formData.target_date || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "active",
      progress: 0
    };

    setGoals([...goals, newGoal]);
    setDialogOpen(false);
    setFormData({
      title: "",
      description: "",
      goal_type: "health",
      target_value: "",
      unit: "",
      target_date: ""
    });

    toast({
      title: "Goal created!",
      description: "Your new milestone goal has been added"
    });

    // If user is logged in, save to database
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('goals').insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          goal_type: formData.goal_type,
          target_value: parseFloat(formData.target_value),
          unit: formData.unit,
          target_date: formData.target_date,
          current_value: 0,
          status: 'active'
        });
      }
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-primary";
    if (progress >= 50) return "bg-accent";
    return "bg-primary-glow";
  };

  if (loading) {
    return (
      <Card className="p-8 gradient-card">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-24 bg-muted rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 gradient-card border-primary/30 shadow-neon">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light mb-1">Milestone Goals</h2>
            <p className="text-sm text-muted-foreground">
              Track your progress toward health objectives
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a milestone goal to track your health progress
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Lower Resting Heart Rate"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Why is this goal important?"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target_value">Target Value *</Label>
                  <Input
                    id="target_value"
                    type="number"
                    placeholder="e.g., 60"
                    value={formData.target_value}
                    onChange={(e) => setFormData({ ...formData, target_value: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bpm">bpm (heart rate)</SelectItem>
                      <SelectItem value="ms">ms (HRV)</SelectItem>
                      <SelectItem value="mg/dL">mg/dL (glucose)</SelectItem>
                      <SelectItem value="%">% (body fat)</SelectItem>
                      <SelectItem value="lbs">lbs (weight)</SelectItem>
                      <SelectItem value="kg">kg (weight)</SelectItem>
                      <SelectItem value="hours">hours (sleep)</SelectItem>
                      <SelectItem value="steps">steps</SelectItem>
                      <SelectItem value="ml/kg/min">ml/kg/min (VO2 max)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target_date">Target Date (optional)</Label>
                <Input
                  id="target_date"
                  type="date"
                  value={formData.target_date}
                  onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddGoal}>Create Goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {goals.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <Target className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-medium">No goals yet</h3>
            <p className="text-sm text-muted-foreground">
              Create your first milestone goal to start tracking progress
            </p>
            <Button className="mt-4" onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Goal
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const daysRemaining = getDaysRemaining(goal.target_date);
              const progressColor = getProgressColor(goal.progress);
              
              return (
                <Card key={goal.id} className="p-6 bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="mt-1 text-primary">
                          <Target className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        {Math.round(goal.progress)}%
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Current: <span className="font-medium text-foreground">{goal.current_value} {goal.unit}</span>
                        </span>
                        <span className="text-muted-foreground">
                          Target: <span className="font-medium text-foreground">{goal.target_value} {goal.unit}</span>
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t border-border/50">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {daysRemaining > 0 
                            ? `${daysRemaining} days remaining` 
                            : 'Due today'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>On track</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}