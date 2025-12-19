import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Smartphone, 
  Watch, 
  Activity, 
  Heart, 
  Moon, 
  Droplets,
  CheckCircle,
  AlertCircle,
  Loader2,
  Zap,
  TrendingUp,
  Shield
} from "lucide-react";

interface DeviceConnection {
  id: string;
  name: string;
  type: 'wearable' | 'smartphone' | 'sensor' | 'lab';
  icon: typeof Watch;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
  lastSync?: Date;
  dataTypes: string[];
  batteryLevel?: number;
  syncProgress?: number;
}

interface HealthMetric {
  type: string;
  value: number;
  unit: string;
  timestamp: Date;
  source: string;
  reliability: number;
}

export const DeviceIntegration = () => {
  const { toast } = useToast();
  const [devices, setDevices] = useState<DeviceConnection[]>([
    {
      id: 'apple-health',
      name: 'Apple Health',
      type: 'smartphone',
      icon: Smartphone,
      status: 'disconnected',
      dataTypes: ['steps', 'heart_rate', 'sleep', 'nutrition']
    },
    {
      id: 'fitbit',
      name: 'Fitbit Charge 6',
      type: 'wearable',
      icon: Watch,
      status: 'connected',
      lastSync: new Date(Date.now() - 300000), // 5 minutes ago
      dataTypes: ['steps', 'heart_rate', 'sleep', 'stress'],
      batteryLevel: 78,
      syncProgress: 100
    },
    {
      id: 'oura',
      name: 'Oura Ring Gen 3',
      type: 'wearable',
      icon: Activity,
      status: 'syncing',
      lastSync: new Date(Date.now() - 900000), // 15 minutes ago
      dataTypes: ['sleep', 'hrv', 'temperature', 'readiness'],
      batteryLevel: 45,
      syncProgress: 67
    },
    {
      id: 'whoop',
      name: 'WHOOP 4.0',
      type: 'wearable',
      icon: Heart,
      status: 'connected',
      lastSync: new Date(Date.now() - 120000), // 2 minutes ago
      dataTypes: ['hrv', 'strain', 'recovery', 'sleep'],
      batteryLevel: 92,
      syncProgress: 100
    },
    {
      id: 'cgm',
      name: 'Dexcom G7',
      type: 'sensor',
      icon: Droplets,
      status: 'error',
      lastSync: new Date(Date.now() - 3600000), // 1 hour ago
      dataTypes: ['glucose', 'trends'],
      batteryLevel: 23
    }
  ]);

  const [recentMetrics, setRecentMetrics] = useState<HealthMetric[]>([]);
  const [isAutoSyncing, setIsAutoSyncing] = useState(true);

  useEffect(() => {
    // Simulate real-time data sync
    const interval = setInterval(() => {
      if (isAutoSyncing) {
        simulateDataSync();
      }
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [isAutoSyncing]);

  const simulateDataSync = () => {
    const connectedDevices = devices.filter(d => d.status === 'connected');
    if (connectedDevices.length === 0) return;

    const randomDevice = connectedDevices[Math.floor(Math.random() * connectedDevices.length)];
    const newMetric: HealthMetric = {
      type: randomDevice.dataTypes[Math.floor(Math.random() * randomDevice.dataTypes.length)],
      value: Math.random() * 100,
      unit: getUnitForType(randomDevice.dataTypes[0]),
      timestamp: new Date(),
      source: randomDevice.name,
      reliability: 0.85 + Math.random() * 0.15
    };

    setRecentMetrics(prev => [newMetric, ...prev.slice(0, 9)]);
  };

  const getUnitForType = (type: string): string => {
    const units: Record<string, string> = {
      steps: 'steps',
      heart_rate: 'bpm',
      sleep: 'hours',
      hrv: 'ms',
      glucose: 'mg/dL',
      temperature: '°F',
      strain: 'score',
      recovery: '%'
    };
    return units[type] || '';
  };

  const getStatusIcon = (status: DeviceConnection['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'syncing':
        return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: DeviceConnection['status']) => {
    switch (status) {
      case 'connected':
        return 'default';
      case 'syncing':
        return 'outline';
      case 'error':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const handleConnect = async (deviceId: string) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId 
        ? { ...d, status: 'syncing', syncProgress: 0 }
        : d
    ));

    // Simulate connection process
    const steps = [0, 25, 50, 75, 100];
    for (const progress of steps) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDevices(prev => prev.map(d => 
        d.id === deviceId 
          ? { ...d, syncProgress: progress }
          : d
      ));
    }

    setDevices(prev => prev.map(d => 
      d.id === deviceId 
        ? { 
            ...d, 
            status: 'connected', 
            lastSync: new Date(),
            syncProgress: 100
          }
        : d
    ));

    toast({
      title: "Device Connected",
      description: `Successfully connected to ${devices.find(d => d.id === deviceId)?.name}`,
    });
  };

  const handleDisconnect = (deviceId: string) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId 
        ? { ...d, status: 'disconnected', lastSync: undefined }
        : d
    ));

    toast({
      title: "Device Disconnected",
      description: `Disconnected from ${devices.find(d => d.id === deviceId)?.name}`,
      variant: "destructive"
    });
  };

  const handleRetrySync = (deviceId: string) => {
    setDevices(prev => prev.map(d => 
      d.id === deviceId 
        ? { ...d, status: 'syncing', syncProgress: 0 }
        : d
    ));

    setTimeout(() => {
      setDevices(prev => prev.map(d => 
        d.id === deviceId 
          ? { ...d, status: 'connected', lastSync: new Date(), syncProgress: 100 }
          : d
      ));
    }, 2000);
  };

  const connectedCount = devices.filter(d => d.status === 'connected').length;
  const totalDataPoints = recentMetrics.length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-primary rounded-lg">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Connected Devices</p>
                <p className="text-2xl font-bold">{connectedCount}/{devices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-accent rounded-lg">
                <TrendingUp className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data Points Today</p>
                <p className="text-2xl font-bold">{totalDataPoints}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-success rounded-lg">
                <Zap className="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auto-Sync</p>
                <p className="text-2xl font-bold">{isAutoSyncing ? 'ON' : 'OFF'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-warning rounded-lg">
                <Moon className="h-5 w-5 text-warning-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data Quality</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Connected Devices</CardTitle>
              <CardDescription>
                Manage your health data sources and sync preferences
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsAutoSyncing(!isAutoSyncing)}
            >
              Auto-Sync: {isAutoSyncing ? 'ON' : 'OFF'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {devices.map((device) => {
              const IconComponent = device.icon;
              return (
                <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{device.name}</h3>
                        <Badge variant={getStatusColor(device.status)}>
                          {device.status}
                        </Badge>
                        {getStatusIcon(device.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Data: {device.dataTypes.join(', ')}</span>
                        {device.lastSync && (
                          <span>
                            Last sync: {device.lastSync.toLocaleTimeString()}
                          </span>
                        )}
                        {device.batteryLevel && (
                          <span>Battery: {device.batteryLevel}%</span>
                        )}
                      </div>
                      {device.status === 'syncing' && device.syncProgress !== undefined && (
                        <div className="mt-2">
                          <Progress value={device.syncProgress} className="w-48" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {device.status === 'disconnected' && (
                      <Button 
                        onClick={() => handleConnect(device.id)}
                        size="sm"
                      >
                        Connect
                      </Button>
                    )}
                    {device.status === 'connected' && (
                      <Button 
                        onClick={() => handleDisconnect(device.id)}
                        variant="outline"
                        size="sm"
                      >
                        Disconnect
                      </Button>
                    )}
                    {device.status === 'error' && (
                      <Button 
                        onClick={() => handleRetrySync(device.id)}
                        variant="outline"
                        size="sm"
                      >
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Data Stream */}
      <Card>
        <CardHeader>
          <CardTitle>Real-Time Data Stream</CardTitle>
          <CardDescription>
            Live health metrics from your connected devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recentMetrics.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent data. Connect devices to see real-time metrics.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div>
                      <span className="font-medium capitalize">{metric.type.replace('_', ' ')}</span>
                      <span className="text-muted-foreground text-sm ml-2">
                        from {metric.source}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      {metric.value.toFixed(1)} {metric.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {metric.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};