import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useReadings } from '@/hooks/useHealthData';
import { Activity, Heart, Droplets, Scale, Moon, Zap, Target, Clock, Plus, CheckCircle } from 'lucide-react';

interface MetricEntry {
  metricId: string;
  value: number;
  unit: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  color: string;
}

const commonMetrics = [
  {
    metricId: 'heart_rate',
    name: 'Heart Rate',
    unit: 'bpm',
    icon: <Heart className="h-4 w-4" />,
    category: 'cardiovascular',
    color: 'hsl(0 84% 60%)',
    quickValues: [60, 70, 80, 90, 100]
  },
  {
    metricId: 'hydration',
    name: 'Water Intake',
    unit: 'oz',
    icon: <Droplets className="h-4 w-4" />,
    category: 'hydration',
    color: 'hsl(200 100% 45%)',
    quickValues: [8, 12, 16, 20, 24]
  },
  {
    metricId: 'weight',
    name: 'Body Weight',
    unit: 'lbs',
    icon: <Scale className="h-4 w-4" />,
    category: 'body',
    color: 'hsl(270 80% 45%)',
    quickValues: []
  },
  {
    metricId: 'sleep_hours',
    name: 'Sleep Duration',
    unit: 'hrs',
    icon: <Moon className="h-4 w-4" />,
    category: 'recovery',
    color: 'hsl(270 60% 50%)',
    quickValues: [6, 7, 8, 9, 10]
  },
  {
    metricId: 'steps',
    name: 'Daily Steps',
    unit: 'steps',
    icon: <Activity className="h-4 w-4" />,
    category: 'activity',
    color: 'hsl(142 76% 36%)',
    quickValues: [5000, 8000, 10000, 12000, 15000]
  },
  {
    metricId: 'energy_level',
    name: 'Energy Level',
    unit: '/10',
    icon: <Zap className="h-4 w-4" />,
    category: 'wellness',
    color: 'hsl(38 92% 50%)',
    quickValues: [1, 3, 5, 7, 9, 10]
  }
];

interface DataEntryFlowProps {
  onComplete?: () => void;
  showProgress?: boolean;
}

export function DataEntryFlow({ onComplete, showProgress = true }: DataEntryFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [entries, setEntries] = useState<Record<string, number>>({});
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { addReading } = useReadings();

  const totalSteps = showProgress ? 3 : 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleMetricSelection = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const handleValueChange = (metricId: string, value: number) => {
    setEntries(prev => ({ ...prev, [metricId]: value }));
  };

  const handleQuickValue = (metricId: string, value: number) => {
    handleValueChange(metricId, value);
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const promises = Object.entries(entries).map(async ([metricId, value]) => {
        // In a real app, you'd need to get the actual metric ID from the database
        return addReading(metricId, value, 'manual');
      });
      
      await Promise.all(promises);
      
      toast({
        title: "Data saved successfully!",
        description: `Recorded ${Object.keys(entries).length} health metrics`,
      });
      
      setEntries({});
      setSelectedMetrics([]);
      setCurrentStep(0);
      onComplete?.();
    } catch (error) {
      toast({
        title: "Error saving data",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMetricSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2">Select Metrics to Track</h3>
        <p className="text-muted-foreground">Choose which health metrics you'd like to record today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commonMetrics.map((metric) => (
          <Card 
            key={metric.metricId}
            className={`p-4 cursor-pointer transition-all elite-hover ${
              selectedMetrics.includes(metric.metricId) 
                ? 'border-primary bg-primary/5 shadow-glow' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleMetricSelection(metric.metricId)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                {metric.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{metric.name}</h4>
                <p className="text-sm text-muted-foreground capitalize">{metric.category}</p>
              </div>
              {selectedMetrics.includes(metric.metricId) && (
                <CheckCircle className="h-5 w-5 text-primary" />
              )}
            </div>
          </Card>
        ))}
      </div>

      <Button 
        onClick={handleNext}
        disabled={selectedMetrics.length === 0}
        className="w-full"
        size="lg"
      >
        Continue with {selectedMetrics.length} metrics
      </Button>
    </div>
  );

  const renderDataEntry = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2">Enter Your Data</h3>
        <p className="text-muted-foreground">Record your health metrics for today</p>
      </div>

      <div className="space-y-6">
        {selectedMetrics.map((metricId) => {
          const metric = commonMetrics.find(m => m.metricId === metricId);
          if (!metric) return null;

          return (
            <Card key={metricId} className="p-6 gradient-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                  {metric.icon}
                </div>
                <div>
                  <h4 className="font-medium text-lg">{metric.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {metric.category}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor={`${metricId}-input`}>Value ({metric.unit})</Label>
                  <Input
                    id={`${metricId}-input`}
                    type="number"
                    placeholder={`Enter ${metric.name.toLowerCase()}`}
                    value={entries[metricId] || ''}
                    onChange={(e) => handleValueChange(metricId, parseFloat(e.target.value) || 0)}
                    className="text-lg"
                  />
                </div>

                {metric.quickValues.length > 0 && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Quick Values</Label>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {metric.quickValues.map((value) => (
                        <Button
                          key={value}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickValue(metricId, value)}
                          className={entries[metricId] === value ? 'bg-primary text-primary-foreground' : ''}
                        >
                          {value}{metric.unit}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button 
          onClick={showProgress ? handleNext : handleSubmit}
          disabled={Object.keys(entries).length === 0}
          className="flex-1"
        >
          {showProgress ? 'Review' : 'Save Data'}
        </Button>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-2">Review Your Data</h3>
        <p className="text-muted-foreground">Confirm your health metrics before saving</p>
      </div>

      <Card className="p-6 gradient-card">
        <h4 className="font-medium mb-4 flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          Data Summary
        </h4>
        
        <div className="space-y-3">
          {Object.entries(entries).map(([metricId, value]) => {
            const metric = commonMetrics.find(m => m.metricId === metricId);
            if (!metric) return null;

            return (
              <div key={metricId} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  {metric.icon}
                  <span className="font-medium">{metric.name}</span>
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {value} {metric.unit}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back to Edit
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Saving...' : 'Save All Data'}
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    if (!showProgress) return renderDataEntry();
    
    switch (currentStep) {
      case 0: return renderMetricSelection();
      case 1: return renderDataEntry();
      case 2: return renderReview();
      default: return renderMetricSelection();
    }
  };

  return (
    <Card className="p-8 max-w-4xl mx-auto gradient-card">
      {showProgress && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {renderCurrentStep()}
    </Card>
  );
}