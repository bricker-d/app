import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Plus, 
  Edit, 
  Trophy, 
  Calendar, 
  TrendingUp,
  Heart,
  Droplets,
  Activity,
  Clock,
  Zap
} from "lucide-react";
import { NoGoalsState } from "./EmptyStates";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'fitness' | 'nutrition' | 'sleep' | 'wellness' | 'recovery';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  icon: any;
  milestones: { value: number; label: string; achieved: boolean }[];
}

const goalCategories = [
  { value: 'fitness', label: 'Fitness', icon: Activity },
  { value: 'nutrition', label: 'Nutrition', icon: Zap },
  { value: 'sleep', label: 'Sleep', icon: Clock },
  { value: 'wellness', label: 'Wellness', icon: Heart },
  { value: 'recovery', label: 'Recovery', icon: Target }
];

const sampleGoals: Goal[] = [
  {
    id: '1',
    title: 'Daily Steps Target',
    description: 'Maintain consistent daily activity for cardiovascular health',
    category: 'fitness',
    targetValue: 10000,
    currentValue: 8420,
    unit: 'steps',
    deadline: '2024-12-31',
    priority: 'high',
    status: 'active',
    icon: Activity,
    milestones: [
      { value: 2500, label: 'Quarter way', achieved: true },
      { value: 5000, label: 'Halfway', achieved: true },
      { value: 7500, label: 'Three quarters', achieved: true },
      { value: 10000, label: 'Target reached!', achieved: false }
    ]
  },
  {
    id: '2',
    title: 'Sleep Quality Score',
    description: 'Improve sleep efficiency and duration for better recovery',
    category: 'sleep',
    targetValue: 90,
    currentValue: 78,
    unit: '%',
    deadline: '2024-11-30',
    priority: 'high',
    status: 'active',
    icon: Clock,
    milestones: [
      { value: 70, label: 'Good baseline', achieved: true },
      { value: 80, label: 'Strong progress', achieved: false },
      { value: 85, label: 'Excellent', achieved: false },
      { value: 90, label: 'Optimal', achieved: false }
    ]
  },
  {
    id: '3',
    title: 'Hydration Goal',
    description: 'Maintain optimal hydration levels throughout the day',
    category: 'wellness',
    targetValue: 80,
    currentValue: 92,
    unit: '%',
    deadline: '2024-10-31',
    priority: 'medium',
    status: 'completed',
    icon: Droplets,
    milestones: [
      { value: 60, label: 'Basic hydration', achieved: true },
      { value: 70, label: 'Good hydration', achieved: true },
      { value: 80, label: 'Optimal hydration', achieved: true }
    ]
  }
];

export function GoalTracking() {
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const filteredGoals = selectedCategory === 'all' 
    ? goals 
    : goals.filter(goal => goal.category === selectedCategory);

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');
  const completionRate = goals.length > 0 ? (completedGoals.length / goals.length) * 100 : 0;

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-success';
    if (progress >= 75) return 'bg-primary';
    if (progress >= 50) return 'bg-warning';
    return 'bg-muted';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderGoalCard = (goal: Goal) => {
    const progress = (goal.currentValue / goal.targetValue) * 100;
    const IconComponent = goal.icon;
    const isCompleted = goal.status === 'completed';
    
    return (
      <Card key={goal.id} className={`glass-effect elite-hover ${isCompleted ? 'border-success' : ''}`}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isCompleted ? 'bg-success/20' : 'bg-primary/20'}`}>
                <IconComponent className={`h-5 w-5 ${isCompleted ? 'text-success' : 'text-primary'}`} />
              </div>
              <div>
                <CardTitle className="text-base">{goal.title}</CardTitle>
                <CardDescription className="text-sm">{goal.description}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor(goal.priority)}>
                {goal.priority}
              </Badge>
              {isCompleted && <Trophy className="h-4 w-4 text-success" />}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">
                {goal.currentValue.toLocaleString()} / {goal.targetValue.toLocaleString()} {goal.unit}
              </span>
            </div>
            <Progress 
              value={Math.min(progress, 100)} 
              className={`h-2 ${getProgressColor(progress)}`}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{Math.round(progress)}% complete</span>
              <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Target className="h-4 w-4" />
              Milestones
            </div>
            <div className="grid grid-cols-2 gap-2">
              {goal.milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 p-2 rounded text-xs ${
                    milestone.achieved 
                      ? 'bg-success/20 text-success' 
                      : 'bg-muted/50 text-muted-foreground'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    milestone.achieved ? 'bg-success' : 'bg-muted-foreground'
                  }`} />
                  <span>{milestone.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              View Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (goals.length === 0) {
    return <NoGoalsState />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Health Goals</h2>
          <p className="text-muted-foreground">Track your progress towards better health</p>
        </div>
        <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Health Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input id="title" placeholder="e.g., Walk 10,000 steps daily" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalCategories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target">Target Value</Label>
                  <Input id="target" type="number" placeholder="10000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input id="unit" placeholder="steps" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" type="date" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddingGoal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => setIsAddingGoal(false)} className="flex-1">
                  Create Goal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeGoals.length}</p>
                <p className="text-muted-foreground">Active Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-success/20">
                <Trophy className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedGoals.length}</p>
                <p className="text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-accent/20">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round(completionRate)}%</p>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Management */}
      <Tabs defaultValue="active" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Goals</TabsTrigger>
          </TabsList>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {goalCategories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGoals.filter(goal => goal.status === 'active').map(renderGoalCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGoals.filter(goal => goal.status === 'completed').map(renderGoalCard)}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGoals.map(renderGoalCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}