import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LabResult {
  analyte: string;
  value: number;
  unit: string;
  ref_low: number;
  ref_high: number;
  status: "optimal" | "yellow" | "red";
  optimization?: string;
}

export function LabsOptimization() {
  const [labs, setLabs] = useState<LabResult[]>([
    {
      analyte: "Total Cholesterol",
      value: 215,
      unit: "mg/dL",
      ref_low: 100,
      ref_high: 200,
      status: "yellow",
      optimization: "Consider increasing omega-3 intake through fatty fish (salmon, sardines) or supplements. Aim for 2-3 servings per week."
    },
    {
      analyte: "LDL Cholesterol",
      value: 135,
      unit: "mg/dL",
      ref_low: 0,
      ref_high: 100,
      status: "red",
      optimization: "Reduce saturated fat intake and increase soluble fiber. Add oats, legumes, and nuts to your diet to lower LDL."
    },
    {
      analyte: "HDL Cholesterol",
      value: 65,
      unit: "mg/dL",
      ref_low: 40,
      ref_high: 999,
      status: "optimal"
    },
    {
      analyte: "Triglycerides",
      value: 120,
      unit: "mg/dL",
      ref_low: 0,
      ref_high: 150,
      status: "optimal"
    },
    {
      analyte: "HbA1c (3-month glucose average)",
      value: 5.8,
      unit: "%",
      ref_low: 4.0,
      ref_high: 5.6,
      status: "yellow",
      optimization: "HbA1c slightly elevated. Try 15-minute walks after meals to improve glucose disposal and reduce refined carbohydrates."
    },
    {
      analyte: "C-Reactive Protein (CRP)",
      value: 3.2,
      unit: "mg/L",
      ref_low: 0,
      ref_high: 3.0,
      status: "red",
      optimization: "Elevated inflammation marker. Focus on anti-inflammatory foods: berries, leafy greens, fatty fish. Ensure 7-9 hours of sleep."
    },
    {
      analyte: "Vitamin D",
      value: 28,
      unit: "ng/mL",
      ref_low: 30,
      ref_high: 100,
      status: "yellow",
      optimization: "Vitamin D is low. Consider supplementation (2000-4000 IU daily) and increase sun exposure (15-20 minutes daily)."
    }
  ]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Simulate upload and parsing
    setTimeout(() => {
      toast({
        title: "Labs uploaded successfully",
        description: "Your lab results have been analyzed and optimizations generated."
      });
      setUploading(false);
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { class: string; icon: any; label: string }> = {
      optimal: { 
        class: "bg-primary/20 text-primary border-primary/30", 
        icon: CheckCircle,
        label: "Optimal" 
      },
      yellow: { 
        class: "bg-accent/20 text-accent border-accent/30", 
        icon: AlertCircle,
        label: "Monitor" 
      },
      red: { 
        class: "bg-destructive/20 text-destructive border-destructive/30", 
        icon: TrendingDown,
        label: "Action Needed" 
      }
    };
    const variant = variants[status] || variants.yellow;
    const Icon = variant.icon;
    return (
      <Badge className={`${variant.class} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {variant.label}
      </Badge>
    );
  };

  const summaryStats = {
    optimal: labs.filter(l => l.status === "optimal").length,
    yellow: labs.filter(l => l.status === "yellow").length,
    red: labs.filter(l => l.status === "red").length
  };

  return (
    <Card className="p-8 gradient-card border-primary/30 shadow-neon">
      <div className="space-y-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-light mb-2">Lab Results & Optimization</h2>
            <p className="text-sm text-muted-foreground">
              Upload your lab results for personalized optimization recommendations
            </p>
          </div>
          <div>
            <input
              type="file"
              id="lab-upload"
              className="hidden"
              accept=".pdf,.csv,.jpg,.png"
              onChange={handleFileUpload}
            />
            <label htmlFor="lab-upload">
              <Button
                variant="outline"
                className="cursor-pointer"
                disabled={uploading}
                asChild
              >
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload Labs"}
                </span>
              </Button>
            </label>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-primary/10 border-primary/30">
            <div className="text-3xl font-light text-primary">{summaryStats.optimal}</div>
            <div className="text-sm text-muted-foreground">Optimal</div>
          </Card>
          <Card className="p-4 bg-accent/10 border-accent/30">
            <div className="text-3xl font-light text-accent">{summaryStats.yellow}</div>
            <div className="text-sm text-muted-foreground">Monitor</div>
          </Card>
          <Card className="p-4 bg-destructive/10 border-destructive/30">
            <div className="text-3xl font-light text-destructive">{summaryStats.red}</div>
            <div className="text-sm text-muted-foreground">Action Needed</div>
          </Card>
        </div>

        {/* Lab Results */}
        <div className="space-y-3">
          {labs.map((lab, index) => (
            <Card key={index} className="p-5 bg-background/50 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{lab.analyte}</h3>
                    {getStatusBadge(lab.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Value: <span className="font-medium text-foreground">{lab.value} {lab.unit}</span></span>
                    <span>Reference: {lab.ref_low}-{lab.ref_high} {lab.unit}</span>
                  </div>
                </div>
              </div>
              {lab.optimization && (
                <div className="pt-3 border-t border-border/50">
                  <p className="text-sm">
                    <span className="font-medium text-primary">Optimization:</span> {lab.optimization}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
}