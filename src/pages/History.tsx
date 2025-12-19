import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, TrendingUp, TrendingDown, Trophy, Target, Heart, Droplets, Moon, Utensils, Zap, CheckCircle, Calendar, Brain, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface BiometricResponse {
  metric: string;
  before: string;
  after: string;
  change: string;
  direction: 'up' | 'down' | 'stable';
  duration: string;
  timestamp: string;
}

interface HistoryEntry {
  id: string;
  date: string;
  time: string;
  action: string;
  category: 'hydration' | 'movement' | 'nutrition' | 'recovery';
  completed: boolean;
  response?: BiometricResponse;
}

interface TrendData {
  category: string;
  avgImpact: string;
  frequency: number;
  successRate: number;
}

const History = () => {
  const [timeFilter, setTimeFilter] = useState('7d');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [historyData] = useState<HistoryEntry[]>([
    {
      id: '1',
      date: 'Today',
      time: '2:15 PM',
      action: 'Drank 16 oz water',
      category: 'hydration',
      completed: true,
      response: {
        metric: 'Hydration Level',
        before: '58%',
        after: '70%',
        change: '+12%',
        direction: 'up',
        duration: 'Effect lasted ~2.5 hours',
        timestamp: '30 min later'
      }
    },
    {
      id: '2',
      date: 'Today',
      time: '1:45 PM',
      action: '5-minute walk (680 steps)',
      category: 'movement',
      completed: true,
      response: {
        metric: 'Glucose',
        before: '98 mg/dL',
        after: '90 mg/dL',
        change: '↓8 mg/dL',
        direction: 'down',
        duration: 'Effect lasted ~3 hours',
        timestamp: '45 min later'
      }
    },
    {
      id: '3',
      date: 'Today',
      time: '12:30 PM',
      action: 'Added 28g protein to lunch',
      category: 'nutrition',
      completed: true,
      response: {
        metric: 'Satiety Index',
        before: '62%',
        after: '88%',
        change: '+26%',
        direction: 'up',
        duration: 'Effect lasted ~4 hours',
        timestamp: '1 hour later'
      }
    },
    {
      id: '4',
      date: 'Yesterday',
      time: '10:10 PM',
      action: 'Started wind-down routine',
      category: 'recovery',
      completed: true,
      response: {
        metric: 'Sleep Efficiency',
        before: '81%',
        after: '87%',
        change: '+6%',
        direction: 'up',
        duration: 'Full night impact',
        timestamp: 'Next morning'
      }
    },
    {
      id: '5',
      date: 'Yesterday',
      time: '6:30 PM',
      action: '3-minute breathing exercise',
      category: 'recovery',
      completed: true,
      response: {
        metric: 'HRV',
        before: '58 ms',
        after: '80 ms',
        change: '+22 ms',
        direction: 'up',
        duration: 'Effect lasted ~2 hours',
        timestamp: '2 hours later'
      }
    },
    {
      id: '6',
      date: 'Yesterday',
      time: '3:15 PM',
      action: 'Walk 10 minutes post-meal',
      category: 'movement',
      completed: true,
      response: {
        metric: 'Post-meal Glucose',
        before: '102 mg/dL',
        after: '90 mg/dL',
        change: '↓12 mg/dL',
        direction: 'down',
        duration: 'Fastest recovery in 30 days',
        timestamp: '1 hour later'
      }
    },
  ]);

  const [trendInsights] = useState<TrendData[]>([
    {
      category: 'Hydration',
      avgImpact: '+14% glucose stability',
      frequency: 12,
      successRate: 95
    },
    {
      category: 'Sleep',
      avgImpact: '+6% sleep efficiency',
      frequency: 8,
      successRate: 88
    },
    {
      category: 'Movement',
      avgImpact: '38% ↓ sedentary time',
      frequency: 15,
      successRate: 92
    },
    {
      category: 'Nutrition',
      avgImpact: '+18% satiety duration',
      frequency: 10,
      successRate: 90
    }
  ]);

  const [personalBests] = useState([
    {
      id: '1',
      icon: Droplets,
      title: 'Longest hydration streak',
      value: '7 days',
      color: 'text-blue-500'
    },
    {
      id: '2',
      icon: TrendingDown,
      title: 'Fastest glucose recovery',
      value: '-12 mg/dL in 40 min',
      color: 'text-green-500'
    },
    {
      id: '3',
      icon: Heart,
      title: 'Highest HRV improvement',
      value: '+22 ms in a single day',
      color: 'text-red-500'
    },
    {
      id: '4',
      icon: Moon,
      title: 'Best sleep efficiency',
      value: '94% (last Tuesday)',
      color: 'text-purple-500'
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hydration': return <Droplets className="h-4 w-4 text-blue-500" />;
      case 'movement': return <Activity className="h-4 w-4 text-green-500" />;
      case 'nutrition': return <Utensils className="h-4 w-4 text-orange-500" />;
      case 'recovery': return <Moon className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getResponseIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="h-4 w-4 text-primary" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-primary" />;
      default: return <div className="h-3 w-3 rounded-full bg-muted" />;
    }
  };

  const filteredHistory = historyData.filter(entry => {
    if (categoryFilter !== 'all' && entry.category !== categoryFilter) return false;
    return true;
  });

  const completionRate = Math.round((filteredHistory.filter(h => h.completed).length / filteredHistory.length) * 100);
  const responsesCount = filteredHistory.filter(h => h.response).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Activity className="h-5 w-5 text-primary pulse-data" />
              <span className="text-lg font-medium tracking-tight text-primary">BioPrecision</span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">Dashboard</Button>
              </Link>
              <Link to="/actions">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">Actions</Button>
              </Link>
              <Link to="/history">
                <Button variant="ghost" size="sm" className="font-normal text-primary">History</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-3">Action History</h1>
          <p className="text-lg text-muted-foreground">
            Data-driven insights showing cause and effect of your interventions
          </p>
        </div>

        {/* Impact Overview Panel */}
        <Card className="mb-8 p-8 bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/30">
          <h2 className="text-2xl font-medium mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Impact Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendInsights.map((trend) => (
              <div key={trend.category} className="p-4 rounded-lg bg-background/50 border border-primary/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{trend.category}</h3>
                  <Badge variant="outline" className="text-xs">{trend.frequency} actions</Badge>
                </div>
                <p className="text-sm text-primary font-medium mb-2">{trend.avgImpact}</p>
                <div className="flex items-center gap-2">
                  <Progress value={trend.successRate} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground">{trend.successRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Personal Bests & Milestones */}
        <Card className="mb-8 p-6 bg-gradient-to-r from-accent/5 to-primary/5 border-accent/30">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-medium">Personal Bests & Milestones</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalBests.map((best) => {
              const Icon = best.icon;
              return (
                <div key={best.id} className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-accent/20 hover:border-accent/40 transition-colors">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-accent/10`}>
                    <Icon className={`h-6 w-6 ${best.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{best.title}</p>
                    <p className="text-lg font-semibold">{best.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Today</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="hydration">Hydration</SelectItem>
              <SelectItem value="movement">Movement</SelectItem>
              <SelectItem value="nutrition">Nutrition</SelectItem>
              <SelectItem value="recovery">Recovery</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* History Timeline & Trend Insights Tabs */}
        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="trends">Trend Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-4">
            {filteredHistory.map((entry) => (
              <Card key={entry.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center">
                    {getCategoryIcon(entry.category)}
                    {entry.response && <div className="w-px h-16 bg-border mt-2" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium">{entry.date}</span>
                      <span className="text-sm text-muted-foreground">{entry.time}</span>
                      <Badge 
                        variant={entry.completed ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {entry.completed ? <CheckCircle className="h-3 w-3 mr-1" /> : null}
                        {entry.completed ? "Completed" : "Skipped"}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-4">{entry.action}</h3>
                    
                    {entry.response && (
                      <div className="p-5 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getResponseIcon(entry.response.direction)}
                            <span className="font-semibold text-base">{entry.response.metric}</span>
                          </div>
                          <Badge className="bg-primary text-primary-foreground">
                            {entry.response.change}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Before</p>
                            <p className="text-sm font-medium">{entry.response.before}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">After</p>
                            <p className="text-sm font-medium">{entry.response.after}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            {entry.response.duration}
                          </span>
                          <span>•</span>
                          <span>Measured {entry.response.timestamp}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {trendInsights.map((trend) => (
                <Card key={trend.category} className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">{trend.category} Interventions</h3>
                    <Badge variant="outline">{trend.frequency} actions in 30 days</Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Average Impact</p>
                      <p className="text-2xl font-semibold text-primary">{trend.avgImpact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Success Rate</p>
                      <div className="flex items-center gap-3">
                        <Progress value={trend.successRate} className="h-3 flex-1" />
                        <span className="text-xl font-semibold">{trend.successRate}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Frequency</p>
                      <p className="text-2xl font-semibold">{trend.frequency} times</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* What's Working Analysis */}
        <Card className="mt-8 p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/30">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-medium">What's Working</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            AI-analyzed patterns from your completed actions
          </p>
          
          <div className="space-y-4">
            <div className="p-5 rounded-lg bg-background/50 border border-primary/20">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold mb-2">Walking post-meal appears to have the biggest impact on your glucose</p>
                  <p className="text-sm text-muted-foreground">
                    Average glucose reduction: <span className="text-primary font-medium">-10 mg/dL</span> within 1 hour. 
                    Keep doing this 3x/day for optimal glucose management.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-lg bg-background/50 border border-accent/20">
              <div className="flex items-start gap-3">
                <Target className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-semibold mb-2">Wind-down routines show consistent sleep efficiency gains</p>
                  <p className="text-sm text-muted-foreground">
                    Average improvement: <span className="text-accent font-medium">+6%</span> sleep efficiency. 
                    Your best results occur when started 60-90 minutes before bed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default History;
