import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Bell, BellOff, AlertTriangle, Info, CheckCircle, Clock, Smartphone, Mail, Heart, Droplets, Activity, Moon } from 'lucide-react';

interface HealthAlert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  category: 'hydration' | 'heart_rate' | 'activity' | 'sleep' | 'recovery';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged?: boolean;
  actionRequired?: boolean;
  autoResolve?: boolean;
  threshold?: {
    value: number;
    operator: '>' | '<' | '=';
    unit: string;
  };
}

interface NotificationSettings {
  enabled: boolean;
  channels: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  types: {
    critical: boolean;
    warning: boolean;
    info: boolean;
    success: boolean;
  };
  categories: {
    hydration: boolean;
    heart_rate: boolean;
    activity: boolean;
    sleep: boolean;
    recovery: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  frequency: 'immediate' | 'hourly' | 'daily';
}

interface NotificationSystemProps {
  alerts?: HealthAlert[];
  settings?: NotificationSettings;
  onSettingsChange?: (settings: NotificationSettings) => void;
  onAlertAcknowledge?: (alertId: string) => void;
}

const defaultSettings: NotificationSettings = {
  enabled: true,
  channels: { push: true, email: true, sms: false },
  types: { critical: true, warning: true, info: true, success: true },
  categories: { hydration: true, heart_rate: true, activity: true, sleep: true, recovery: true },
  quietHours: { enabled: true, start: '22:00', end: '07:00' },
  frequency: 'immediate'
};

const defaultAlerts: HealthAlert[] = [
  {
    id: '1',
    type: 'critical',
    category: 'heart_rate',
    title: 'Elevated Heart Rate Detected',
    message: 'Your resting heart rate has been above 100 bpm for the last 30 minutes. Consider taking a break and practicing deep breathing.',
    timestamp: new Date(Date.now() - 300000),
    actionRequired: true,
    threshold: { value: 100, operator: '>', unit: 'bpm' }
  },
  {
    id: '2',
    type: 'warning',
    category: 'hydration',
    title: 'Hydration Reminder',
    message: 'You\'re 22% below your daily hydration target. Consider drinking 14 oz of water.',
    timestamp: new Date(Date.now() - 600000),
    actionRequired: true,
    threshold: { value: 64, operator: '<', unit: 'oz' }
  },
  {
    id: '3',
    type: 'info',
    category: 'activity',
    title: 'Movement Break',
    message: 'You\'ve been sedentary for 58 minutes. A 5-minute walk can help improve circulation and glucose processing.',
    timestamp: new Date(Date.now() - 180000),
    actionRequired: false
  },
  {
    id: '4',
    type: 'success',
    category: 'sleep',
    title: 'Great Sleep Quality!',
    message: 'You achieved 8.5 hours of quality sleep with 85% sleep efficiency. Your HRV has improved by 12%.',
    timestamp: new Date(Date.now() - 28800000),
    acknowledged: true
  }
];

export function NotificationSystem({
  alerts = defaultAlerts,
  settings = defaultSettings,
  onSettingsChange,
  onAlertAcknowledge
}: NotificationSystemProps) {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(settings);
  const [showSettings, setShowSettings] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState<HealthAlert[]>(alerts);
  const { toast } = useToast();

  useEffect(() => {
    if ('Notification' in window && notificationSettings.enabled && notificationSettings.channels.push) {
      Notification.requestPermission();
    }
  }, [notificationSettings.enabled, notificationSettings.channels.push]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'info': return <Info className="h-4 w-4 text-primary" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hydration': return <Droplets className="h-4 w-4" />;
      case 'heart_rate': return <Heart className="h-4 w-4" />;
      case 'activity': return <Activity className="h-4 w-4" />;
      case 'sleep': return <Moon className="h-4 w-4" />;
      case 'recovery': return <Activity className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-l-destructive bg-destructive/5';
      case 'warning': return 'border-l-warning bg-warning/5';
      case 'info': return 'border-l-primary bg-primary/5';
      case 'success': return 'border-l-success bg-success/5';
      default: return 'border-l-muted';
    }
  };

  const handleSettingsUpdate = (newSettings: Partial<NotificationSettings>) => {
    const updated = { ...notificationSettings, ...newSettings };
    setNotificationSettings(updated);
    onSettingsChange?.(updated);
    
    toast({
      title: "Notification settings updated",
      description: "Your preferences have been saved",
    });
  };

  const handleAlertAction = (alertId: string, action: 'acknowledge' | 'snooze' | 'resolve') => {
    setActiveAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: action === 'acknowledge' || action === 'resolve' }
        : alert
    ));
    
    onAlertAcknowledge?.(alertId);
    
    toast({
      title: action === 'acknowledge' ? "Alert acknowledged" : "Alert resolved",
      description: action === 'snooze' ? "You'll be reminded again in 30 minutes" : "Thank you for taking action",
    });
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const unacknowledgedAlerts = activeAlerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = activeAlerts.filter(alert => alert.acknowledged);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 gradient-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Health Notifications</h3>
              <p className="text-muted-foreground">
                {unacknowledgedAlerts.length} active alerts • {acknowledgedAlerts.length} resolved
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              Settings
            </Button>
            <div className="flex items-center gap-2">
              <Switch
                checked={notificationSettings.enabled}
                onCheckedChange={(enabled) => handleSettingsUpdate({ enabled })}
              />
              <Label>Notifications {notificationSettings.enabled ? 'ON' : 'OFF'}</Label>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings Panel */}
      {showSettings && (
        <Card className="p-6 gradient-card">
          <h4 className="text-lg font-semibold mb-4">Notification Preferences</h4>
          
          <div className="space-y-6">
            {/* Channels */}
            <div>
              <h5 className="font-medium mb-3">Delivery Channels</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notificationSettings.channels.push}
                    onCheckedChange={(push) => 
                      handleSettingsUpdate({ 
                        channels: { ...notificationSettings.channels, push } 
                      })
                    }
                  />
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <Label>Push Notifications</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notificationSettings.channels.email}
                    onCheckedChange={(email) => 
                      handleSettingsUpdate({ 
                        channels: { ...notificationSettings.channels, email } 
                      })
                    }
                  />
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label>Email</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notificationSettings.channels.sms}
                    onCheckedChange={(sms) => 
                      handleSettingsUpdate({ 
                        channels: { ...notificationSettings.channels, sms } 
                      })
                    }
                  />
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <Label>SMS</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Alert Types */}
            <div>
              <h5 className="font-medium mb-3">Alert Types</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(notificationSettings.types).map(([type, enabled]) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => 
                        handleSettingsUpdate({
                          types: { ...notificationSettings.types, [type]: checked }
                        })
                      }
                    />
                    <Label className="capitalize">{type}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Quiet Hours */}
            <div>
              <h5 className="font-medium mb-3">Quiet Hours</h5>
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notificationSettings.quietHours.enabled}
                    onCheckedChange={(enabled) => 
                      handleSettingsUpdate({
                        quietHours: { ...notificationSettings.quietHours, enabled }
                      })
                    }
                  />
                  <Label>Enable Quiet Hours</Label>
                </div>
                
                {notificationSettings.quietHours.enabled && (
                  <>
                    <div className="flex items-center gap-2">
                      <Label>From</Label>
                      <input
                        type="time"
                        value={notificationSettings.quietHours.start}
                        onChange={(e) => 
                          handleSettingsUpdate({
                            quietHours: { ...notificationSettings.quietHours, start: e.target.value }
                          })
                        }
                        className="px-2 py-1 border rounded"
                      />
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Label>To</Label>
                      <input
                        type="time"
                        value={notificationSettings.quietHours.end}
                        onChange={(e) => 
                          handleSettingsUpdate({
                            quietHours: { ...notificationSettings.quietHours, end: e.target.value }
                          })
                        }
                        className="px-2 py-1 border rounded"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Active Alerts */}
      {unacknowledgedAlerts.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Active Alerts ({unacknowledgedAlerts.length})
          </h4>
          
          <div className="space-y-3">
            {unacknowledgedAlerts.map((alert) => (
              <Card 
                key={alert.id} 
                className={`p-5 border-l-4 ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getAlertIcon(alert.type)}
                      {getCategoryIcon(alert.category)}
                      <h5 className="font-semibold">{alert.title}</h5>
                      <Badge variant="outline" className="text-xs">
                        {alert.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(alert.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-foreground/80 mb-3 leading-relaxed">
                      {alert.message}
                    </p>

                    {alert.threshold && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          Threshold: {alert.threshold.operator} {alert.threshold.value} {alert.threshold.unit}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      onClick={() => handleAlertAction(alert.id, 'acknowledge')}
                    >
                      {alert.actionRequired ? 'Done' : 'OK'}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAlertAction(alert.id, 'snooze')}
                    >
                      Snooze
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recent Alerts */}
      {acknowledgedAlerts.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Recent Activity ({acknowledgedAlerts.length})
          </h4>
          
          <div className="space-y-2">
            {acknowledgedAlerts.slice(0, 5).map((alert) => (
              <Card key={alert.id} className="p-4 opacity-75">
                <div className="flex items-center gap-3">
                  {getAlertIcon(alert.type)}
                  {getCategoryIcon(alert.category)}
                  <span className="font-medium text-sm">{alert.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {alert.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {formatTimeAgo(alert.timestamp)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}