import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { 
  Settings, 
  Heart, 
  Droplets, 
  Activity, 
  Target, 
  TrendingUp, 
  Clock,
  GripVertical,
  Plus,
  X
} from "lucide-react";

interface Widget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'action' | 'insight';
  icon: any;
  enabled: boolean;
  size: 'small' | 'medium' | 'large';
  position: number;
  data?: any;
}

const defaultWidgets: Widget[] = [
  {
    id: 'heart-rate',
    title: 'Heart Rate',
    type: 'metric',
    icon: Heart,
    enabled: true,
    size: 'small',
    position: 0,
    data: { value: 72, unit: 'bpm', status: 'optimal' }
  },
  {
    id: 'hydration',
    title: 'Hydration',
    type: 'metric',
    icon: Droplets,
    enabled: true,
    size: 'small',
    position: 1,
    data: { value: 68, unit: '%', status: 'warning' }
  },
  {
    id: 'steps',
    title: 'Daily Steps',
    type: 'metric',
    icon: Activity,
    enabled: true,
    size: 'medium',
    position: 2,
    data: { value: 8420, unit: 'steps', target: 10000, status: 'optimal' }
  },
  {
    id: 'sleep',
    title: 'Sleep Quality',
    type: 'chart',
    icon: Clock,
    enabled: true,
    size: 'large',
    position: 3,
    data: { quality: 85, duration: 7.5, efficiency: 92 }
  },
  {
    id: 'recovery',
    title: 'Recovery Score',
    type: 'metric',
    icon: Target,
    enabled: false,
    size: 'small',
    position: 4,
    data: { value: 78, unit: '%', status: 'optimal' }
  },
  {
    id: 'trends',
    title: 'Health Trends',
    type: 'chart',
    icon: TrendingUp,
    enabled: false,
    size: 'large',
    position: 5
  }
];

export function CustomizableWidgets() {
  const [widgets, setWidgets] = useState(defaultWidgets);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const enabledWidgets = widgets.filter(w => w.enabled).sort((a, b) => a.position - b.position);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedWidgets = Array.from(enabledWidgets);
    const [removed] = reorderedWidgets.splice(result.source.index, 1);
    reorderedWidgets.splice(result.destination.index, 0, removed);

    const updatedWidgets = widgets.map(widget => {
      if (widget.enabled) {
        const newIndex = reorderedWidgets.findIndex(w => w.id === widget.id);
        return { ...widget, position: newIndex };
      }
      return widget;
    });

    setWidgets(updatedWidgets);
  };

  const toggleWidget = (widgetId: string) => {
    setWidgets(widgets.map(widget =>
      widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget
    ));
  };

  const getWidgetSize = (size: string) => {
    switch (size) {
      case 'small': return 'col-span-1';
      case 'medium': return 'col-span-2';
      case 'large': return 'col-span-2 lg:col-span-3';
      default: return 'col-span-1';
    }
  };

  const renderWidget = (widget: Widget) => {
    const IconComponent = widget.icon;
    
    switch (widget.type) {
      case 'metric':
        return (
          <Card className="glass-effect elite-hover h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {widget.data?.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {widget.data?.unit}
                </span>
              </div>
              {widget.data?.target && (
                <div className="text-xs text-muted-foreground mt-1">
                  Target: {widget.data.target} {widget.data.unit}
                </div>
              )}
              <Badge 
                variant="outline" 
                className={`mt-2 ${
                  widget.data?.status === 'optimal' ? 'text-success border-success' :
                  widget.data?.status === 'warning' ? 'text-warning border-warning' :
                  'text-destructive border-destructive'
                }`}
              >
                {widget.data?.status}
              </Badge>
            </CardContent>
          </Card>
        );
      
      case 'chart':
        return (
          <Card className="glass-effect elite-hover h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconComponent className="h-5 w-5" />
                {widget.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization</p>
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return (
          <Card className="glass-effect elite-hover h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <IconComponent className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">{widget.title}</h3>
                  <p className="text-sm text-muted-foreground">Custom widget</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Health Dashboard</h2>
          <p className="text-muted-foreground">Customize your health monitoring experience</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Customize
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Customize Dashboard</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Toggle widgets on/off and drag to reorder them on your dashboard.
              </p>
              <div className="space-y-3">
                {widgets.map(widget => {
                  const IconComponent = widget.icon;
                  return (
                    <div key={widget.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{widget.title}</span>
                      </div>
                      <Switch
                        checked={widget.enabled}
                        onCheckedChange={() => toggleWidget(widget.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Draggable Widgets Grid */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {enabledWidgets.map((widget, index) => (
                <Draggable key={widget.id} draggableId={widget.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`${getWidgetSize(widget.size)} ${
                        snapshot.isDragging ? 'opacity-75' : ''
                      }`}
                    >
                      <div className="relative group">
                        <div
                          {...provided.dragHandleProps}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-grab"
                        >
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        </div>
                        {renderWidget(widget)}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Widget */}
      <Card className="glass-effect border-dashed border-2 border-muted/50">
        <CardContent className="flex items-center justify-center py-8">
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Widget
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}