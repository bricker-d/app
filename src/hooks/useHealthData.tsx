import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export interface Metric {
  id: string;
  name: string;
  display_name: string;
  unit: string;
  category: string;
  normal_range_min: number | null;
  normal_range_max: number | null;
}

export interface Reading {
  id: string;
  user_id: string;
  metric_id: string;
  value: number;
  recorded_at: string;
  source: string;
  metric?: Metric;
}

export interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  status: 'optimal' | 'warning' | 'attention';
  trend: 'up' | 'down' | 'stable';
  lastReading?: string;
}

export const useHealthMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setMetrics(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching metrics",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { metrics, loading, refetch: fetchMetrics };
};

export const useReadings = (limit: number = 100) => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchReadings();
    }
  }, [user]);

  const fetchReadings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('readings')
        .select(`
          *,
          metric:metrics(*)
        `)
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setReadings(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching readings",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addReading = async (metricId: string, value: number, source: string = 'manual') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('readings')
        .insert({
          user_id: user.id,
          metric_id: metricId,
          value,
          source,
        });

      if (error) throw error;
      await fetchReadings(); // Refresh data
      
      toast({
        title: "Reading added",
        description: "Your health data has been recorded.",
      });
    } catch (error: any) {
      toast({
        title: "Error adding reading",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return { readings, loading, addReading, refetch: fetchReadings };
};

export const useHealthStatus = () => {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchHealthStatus();
    }
  }, [user]);

  const fetchHealthStatus = async () => {
    if (!user) return;

    try {
      // Get latest reading for each metric
      const { data, error } = await supabase
        .from('readings')
        .select(`
          *,
          metric:metrics(*)
        `)
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: false });

      if (error) throw error;

      // Group by metric and get latest reading for each
      const metricMap = new Map<string, Reading>();
      (data || []).forEach((reading) => {
        if (!metricMap.has(reading.metric_id)) {
          metricMap.set(reading.metric_id, reading);
        }
      });

      // Convert to HealthMetric format
      const healthMetricsData: HealthMetric[] = Array.from(metricMap.values()).map((reading) => {
        const metric = reading.metric as Metric;
        const status = getMetricStatus(reading.value, metric.normal_range_min, metric.normal_range_max);
        
        return {
          name: metric.display_name,
          value: reading.value,
          unit: metric.unit,
          status,
          trend: 'stable', // We'd need historical data to calculate trend
          lastReading: reading.recorded_at,
        };
      });

      setHealthMetrics(healthMetricsData);
    } catch (error: any) {
      toast({
        title: "Error fetching health status",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMetricStatus = (
    value: number, 
    min: number | null, 
    max: number | null
  ): 'optimal' | 'warning' | 'attention' => {
    if (min === null || max === null) return 'optimal';
    
    if (value >= min && value <= max) return 'optimal';
    if (value < min * 0.9 || value > max * 1.1) return 'attention';
    return 'warning';
  };

  return { healthMetrics, loading, refetch: fetchHealthStatus };
};