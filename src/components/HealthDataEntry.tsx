import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useHealthMetrics, useReadings } from "@/hooks/useHealthData";
import { Heart, Droplets, Activity, Scale, Clock, Zap, TrendingUp, Save, X } from "lucide-react";
import { healthReadingSchema, metricValueSchema } from "@/lib/validationSchemas";

interface Metric {
  id: string;
  name: string;
  display_name: string;
  unit: string;
  category: string;
  normal_range_min?: number;
  normal_range_max?: number;
}

interface QuickEntry {
  value: number;
  label: string;
}

const METRIC_ICONS: Record<string, any> = {
  cardiovascular: Heart,
  hydration: Droplets,
  activity: Activity,
  body: Scale,
  sleep: Clock,
  energy: Zap,
  default: TrendingUp
};

const QUICK_VALUES: Record<string, QuickEntry[]> = {
  heart_rate: [
    { value: 60, label: "Resting" },
    { value: 80, label: "Light" },
    { value: 120, label: "Moderate" },
    { value: 160, label: "High" }
  ],
  hydration: [
    { value: 8, label: "1 Cup" },
    { value: 16, label: "1 Bottle" },
    { value: 32, label: "1 Liter" },
    { value: 64, label: "Half Gallon" }
  ],
  steps: [
    { value: 1000, label: "Short Walk" },
    { value: 3000, label: "Moderate" },
    { value: 5000, label: "Active" },
    { value: 8000, label: "Very Active" }
  ],
  sleep_hours: [
    { value: 6, label: "6 hours" },
    { value: 7, label: "7 hours" },
    { value: 8, label: "8 hours" },
    { value: 9, label: "9 hours" }
  ],
  weight: [
    { value: 0.5, label: "-0.5 lbs" },
    { value: 0, label: "Same" },
    { value: -0.5, label: "+0.5 lbs" },
    { value: -1, label: "+1 lb" }
  ]
};

export function HealthDataEntry({ onClose }: { onClose?: () => void }) {
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);
  const [value, setValue] = useState("");
  const [source, setSource] = useState("manual");
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const { metrics } = useHealthMetrics();
  const { addReading } = useReadings();
  const { toast } = useToast();

  const categorizedMetrics = metrics.reduce((acc, metric) => {
    if (!acc[metric.category]) {
      acc[metric.category] = [];
    }
    acc[metric.category].push(metric);
    return acc;
  }, {} as Record<string, Metric[]>);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMetric || !value || !user) return;

    const numericValue = parseFloat(value);

    // Validate the reading
    const readingValidation = healthReadingSchema.safeParse({
      metric_id: selectedMetric.id,
      value: numericValue,
      source: source,
    });

    if (!readingValidation.success) {
      toast({
        title: "Invalid input",
        description: readingValidation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    // Validate metric-specific value range
    const metricValidation = metricValueSchema(selectedMetric.name, numericValue);
    if (!metricValidation.success) {
      toast({
        title: "Invalid value",
        description: metricValidation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await addReading(selectedMetric.id, numericValue, source);
      toast({
        title: "Reading Added",
        description: `${selectedMetric.display_name}: ${value} ${selectedMetric.unit}`,
      });
      setValue("");
      setSelectedMetric(null);
      onClose?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add reading. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickEntry = (quickValue: number) => {
    setValue(quickValue.toString());
  };

  const getIcon = (category: string) => {
    const IconComponent = METRIC_ICONS[category] || METRIC_ICONS.default;
    return <IconComponent className="h-4 w-4" />;
  };

  const getStatusColor = (value: number, metric: Metric) => {
    if (!metric.normal_range_min || !metric.normal_range_max) return "bg-muted";
    
    if (value >= metric.normal_range_min && value <= metric.normal_range_max) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (value < metric.normal_range_min * 0.8 || value > metric.normal_range_max * 1.2) {
      return "bg-red-100 text-red-800 border-red-200";
    } else {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-effect border-white/20">
        <CardHeader className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Add Health Reading
              </CardTitle>
              <CardDescription>
                Record your latest health metrics for AI-powered insights
              </CardDescription>
            </div>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Metric Selection */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Select Metric</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(categorizedMetrics).map(([category, categoryMetrics]) => (
                <div key={category} className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground capitalize flex items-center gap-2">
                    {getIcon(category)}
                    {category}
                  </h4>
                  <div className="space-y-1">
                    {categoryMetrics.map((metric) => (
                      <Button
                        key={metric.id}
                        variant={selectedMetric?.id === metric.id ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start h-auto py-2"
                        onClick={() => setSelectedMetric(metric)}
                      >
                        <div className="text-left">
                          <div className="font-medium">{metric.display_name}</div>
                          <div className="text-xs text-muted-foreground">
                            {metric.unit}
                            {metric.normal_range_min && metric.normal_range_max && (
                              <span className="ml-1">
                                ({metric.normal_range_min}-{metric.normal_range_max})
                              </span>
                            )}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Value Entry */}
          {selectedMetric && (
            <div className="space-y-4 p-4 rounded-lg border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2">
                {getIcon(selectedMetric.category)}
                <h3 className="font-medium">{selectedMetric.display_name}</h3>
                <Badge variant="outline">{selectedMetric.unit}</Badge>
              </div>

              {/* Quick Entry Options */}
              {QUICK_VALUES[selectedMetric.name] && (
                <div className="space-y-2">
                  <Label className="text-sm">Quick Entry</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {QUICK_VALUES[selectedMetric.name].map((quick) => (
                      <Button
                        key={quick.value}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickEntry(quick.value)}
                        className="h-auto py-2 hover-scale"
                      >
                        <div className="text-center">
                          <div className="font-medium">{quick.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {quick.value} {selectedMetric.unit}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Entry */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value">Value</Label>
                    <div className="relative">
                      <Input
                        id="value"
                        type="number"
                        step="0.1"
                        placeholder={`Enter ${selectedMetric.display_name.toLowerCase()}`}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                        className="pr-12"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        {selectedMetric.unit}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source">Source</Label>
                    <Select value={source} onValueChange={setSource}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual Entry</SelectItem>
                        <SelectItem value="device">Device Reading</SelectItem>
                        <SelectItem value="lab">Lab Result</SelectItem>
                        <SelectItem value="estimated">Estimated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Value Status */}
                {value && selectedMetric.normal_range_min && selectedMetric.normal_range_max && (
                  <div className={`p-3 rounded-lg border ${getStatusColor(parseFloat(value), selectedMetric)}`}>
                    <div className="text-sm">
                      <strong>Status:</strong>{" "}
                      {parseFloat(value) >= selectedMetric.normal_range_min && parseFloat(value) <= selectedMetric.normal_range_max
                        ? "Normal Range"
                        : parseFloat(value) < selectedMetric.normal_range_min * 0.8 || parseFloat(value) > selectedMetric.normal_range_max * 1.2
                        ? "Outside Normal Range"
                        : "Slightly Elevated"}
                    </div>
                    <div className="text-xs mt-1 opacity-80">
                      Normal: {selectedMetric.normal_range_min}-{selectedMetric.normal_range_max} {selectedMetric.unit}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button type="submit" disabled={loading || !value} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Saving..." : "Save Reading"}
                  </Button>
                  {onClose && (
                    <Button type="button" variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}