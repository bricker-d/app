import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { HealthDataEntry } from "@/components/HealthDataEntry";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const DataEntry = () => {
  const { user, loading } = useAuth();

  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-8 w-8 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

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
              <Link to="/data-entry">
                <Button variant="ghost" size="sm" className="font-normal text-primary">Add Data</Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" size="sm" className="font-normal text-muted-foreground hover:text-primary">Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">Health Data Entry</h1>
          <p className="text-muted-foreground">
            Record your health metrics to build your personalized optimization profile
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Data Entry Form */}
          <div>
            <HealthDataEntry />
          </div>

          {/* Information Cards */}
          <div className="space-y-6">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Supported Metrics
                </CardTitle>
                <CardDescription>
                  Track the biomarkers that matter most for optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span>Heart Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span>Blood Glucose</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <span>Sleep Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>Daily Steps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                    <span>Hydration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <span>Stress Level</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Data Sources
                </CardTitle>
                <CardDescription>
                  Multiple ways to capture your health data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <h4 className="font-medium text-sm mb-1">Manual Entry</h4>
                  <p className="text-xs text-muted-foreground">
                    Add readings directly through this interface
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 opacity-60">
                  <h4 className="font-medium text-sm mb-1">Device Sync (Coming Soon)</h4>
                  <p className="text-xs text-muted-foreground">
                    Automatic data from wearables and health apps
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 opacity-60">
                  <h4 className="font-medium text-sm mb-1">Lab Integration (Coming Soon)</h4>
                  <p className="text-xs text-muted-foreground">
                    Import results from bloodwork and health tests
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-success" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>• Record readings at consistent times for better trends</p>
                <p>• Morning readings are ideal for baseline metrics</p>
                <p>• Note any factors that might affect readings</p>
                <p>• Regular data leads to more accurate recommendations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;