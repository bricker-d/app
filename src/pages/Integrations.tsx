import { DeviceIntegration } from "@/components/DeviceIntegration";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Camera, 
  Upload, 
  Zap, 
  Shield, 
  Clock,
  CheckCircle,
  Star,
  TrendingUp
} from "lucide-react";

const Integrations = () => {
  const integrationCategories = [
    {
      title: "Wearable Devices",
      description: "Fitness trackers, smartwatches, and health sensors",
      icon: Smartphone,
      count: 25,
      popular: ["Apple Watch", "Fitbit", "Oura Ring", "WHOOP", "Garmin"]
    },
    {
      title: "Health Apps",
      description: "Popular health and fitness applications",
      icon: Zap,
      count: 50,
      popular: ["Apple Health", "Google Fit", "MyFitnessPal", "Strava", "Cronometer"]
    },
    {
      title: "Lab & Medical",
      description: "Lab results, medical devices, and CGMs",
      icon: Shield,
      count: 15,
      popular: ["Dexcom", "FreeStyle Libre", "Quest Diagnostics", "LabCorp"]
    },
    {
      title: "Smart Home",
      description: "Sleep trackers, scales, and environmental sensors",
      icon: Clock,
      count: 20,
      popular: ["Withings", "Eight Sleep", "Nest", "Philips Hue", "ResMed"]
    }
  ];

  const features = [
    {
      icon: Camera,
      title: "Photo Data Entry",
      description: "Snap photos of lab results and automatically extract values using AI",
      status: "Coming Soon",
      badge: "AI-Powered"
    },
    {
      icon: Upload,
      title: "File Import",
      description: "Import CSV files from any health platform or export from other apps",
      status: "Available",
      badge: "Universal"
    },
    {
      icon: Zap,
      title: "Real-Time Sync",
      description: "Automatic background syncing every 5 minutes for connected devices",
      status: "Available",
      badge: "Auto-Sync"
    },
    {
      icon: Shield,
      title: "Data Validation",
      description: "Smart algorithms detect and flag unusual readings for your review",
      status: "Available",
      badge: "Smart"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-background via-primary/5 to-background pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 gradient-primary rounded-lg">
                <Smartphone className="h-6 w-6 text-primary-foreground" />
              </div>
              <Badge variant="outline" className="text-primary border-primary/30">
                50+ Integrations
              </Badge>
            </div>
            <h1 className="text-4xl font-light mb-4">
              Connect Your Health Ecosystem
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Seamlessly integrate with your favorite devices and apps. 
              One dashboard for all your health data with automatic syncing and intelligent validation.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Integration Categories */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light mb-3">Integration Categories</h2>
            <p className="text-muted-foreground">
              Choose from over 100+ supported devices and platforms
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrationCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.title} className="gradient-card elite-hover elite-border">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto gradient-primary rounded-2xl flex items-center justify-center mb-4">
                      <IconComponent className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Available</span>
                        <Badge variant="outline">{category.count}+ apps</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-2">Popular:</p>
                        <div className="flex flex-wrap gap-1">
                          {category.popular.slice(0, 3).map((app) => (
                            <Badge key={app} variant="outline" className="text-xs">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Smart Features */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light mb-3">Smart Data Features</h2>
            <p className="text-muted-foreground">
              Beyond simple data collection - intelligent processing and validation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card key={feature.title} className="gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 gradient-accent rounded-xl">
                        <IconComponent className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium text-lg">{feature.title}</h3>
                          <Badge 
                            variant={feature.status === 'Available' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {feature.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{feature.description}</p>
                        <Badge variant="outline" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          {feature.badge}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Device Integration Component */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-light mb-3">Device Management</h2>
            <p className="text-muted-foreground">
              Connect and manage all your health devices in one place
            </p>
          </div>
          
          <DeviceIntegration />
        </section>

        {/* Quick Stats */}
        <section className="bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-muted-foreground">Supported Devices</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">5min</div>
              <p className="text-muted-foreground">Auto-Sync Interval</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">99.9%</div>
              <p className="text-muted-foreground">Data Accuracy</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning mb-2">24/7</div>
              <p className="text-muted-foreground">Continuous Monitoring</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-12">
          <Card className="max-w-2xl mx-auto gradient-card">
            <CardContent className="p-8">
              <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-light mb-4">
                Ready to Connect Your Health Data?
              </h3>
              <p className="text-muted-foreground mb-6">
                Start by connecting your most-used device and see how BioPrecision 
                transforms your health insights in real-time.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="shadow-glow">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Connect First Device
                </Button>
                <Button variant="outline" size="lg">
                  View All Integrations
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Integrations;