import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, FileImage, CheckCircle, AlertCircle, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ExtractedMetric {
  name: string;
  value: number;
  unit: string;
  confidence: number;
  status: 'normal' | 'high' | 'low' | 'unknown';
}

export const PhotoDataEntry = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState<ExtractedMetric[]>([]);
  const [processingStage, setProcessingStage] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setExtractedData([]);
  };

  const processImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);
    setProcessingStage("Uploading image...");

    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      await new Promise((resolve) => {
        reader.onload = resolve;
      });

      setProgress(25);
      setProcessingStage("Analyzing document...");

      const base64Image = reader.result as string;

      // Call edge function to extract data using AI
      const { data, error } = await supabase.functions.invoke('extract-lab-results', {
        body: { image: base64Image }
      });

      if (error) throw error;

      setProgress(75);
      setProcessingStage("Extracting metrics...");

      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      setProgress(100);
      setProcessingStage("Complete!");

      setExtractedData(data.metrics || []);

      toast({
        title: "Lab Results Extracted",
        description: `Found ${data.metrics?.length || 0} health metrics`,
      });

    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Processing Failed",
        description: "Unable to extract data from image. Please try again or enter manually.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setProgress(0);
      setProcessingStage("");
    }
  };

  const saveExtractedData = async () => {
    try {
      const userId = (await supabase.auth.getUser()).data.user?.id;
      if (!userId) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save health data",
          variant: "destructive"
        });
        return;
      }

      // Save all extracted metrics to database
      for (const metric of extractedData) {
        // First, try to find matching metric in database
        const { data: metricData } = await supabase
          .from('metrics')
          .select('id')
          .ilike('name', metric.name)
          .single();

        if (metricData) {
          await supabase.from('readings').insert({
            user_id: userId,
            metric_id: metricData.id,
            value: metric.value,
            source: 'photo_upload',
            recorded_at: new Date().toISOString()
          });
        }
      }

      toast({
        title: "Data Saved",
        description: `Successfully saved ${extractedData.length} health metrics`,
      });

      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
      setExtractedData([]);
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: "Save Failed",
        description: "Unable to save health data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setExtractedData([]);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const getStatusColor = (status: ExtractedMetric['status']) => {
    switch (status) {
      case 'normal': return 'text-success';
      case 'high': return 'text-destructive';
      case 'low': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: ExtractedMetric['status']) => {
    switch (status) {
      case 'normal': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'high': return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'low': return <AlertCircle className="h-4 w-4 text-warning" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Photo-Based Data Entry</CardTitle>
          <CardDescription>
            Upload lab results, test reports, or health documents. We'll automatically extract the metrics for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Area */}
          {!selectedFile ? (
            <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
              <div className="flex justify-center gap-4">
                <div className="p-4 gradient-primary rounded-full">
                  <Camera className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="p-4 gradient-accent rounded-full">
                  <Upload className="h-8 w-8 text-accent-foreground" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Upload Your Lab Results</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Supports JPG, PNG, PDF formats. Max file size: 10MB
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" asChild>
                  <label className="cursor-pointer">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </Button>
                <Button asChild>
                  <label className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Preview */}
              <div className="relative border rounded-lg overflow-hidden">
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Lab result preview"
                    className="w-full max-h-96 object-contain bg-muted"
                  />
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={clearSelection}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Processing Progress */}
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{processingStage}</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {/* Action Buttons */}
              {!isProcessing && extractedData.length === 0 && (
                <Button onClick={processImage} className="w-full">
                  <FileImage className="h-4 w-4 mr-2" />
                  Extract Health Data
                </Button>
              )}
            </div>
          )}

          {/* Extracted Data */}
          {extractedData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Extracted Metrics</h3>
                <Button onClick={saveExtractedData} size="sm">
                  Save All Data
                </Button>
              </div>
              <div className="space-y-2">
                {extractedData.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg bg-card"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(metric.status)}
                      <div>
                        <p className="font-medium">{metric.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Confidence: {(metric.confidence * 100).toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getStatusColor(metric.status)}`}>
                        {metric.value} {metric.unit}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {metric.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 text-success shrink-0" />
              <span>Ensure good lighting and avoid shadows on the document</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 text-success shrink-0" />
              <span>Capture the entire document with all metrics visible</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 text-success shrink-0" />
              <span>Keep the camera steady to avoid blur</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 mt-0.5 text-success shrink-0" />
              <span>Review extracted data before saving</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
