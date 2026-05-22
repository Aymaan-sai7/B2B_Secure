import { useEffect, useState } from "react";
import api from "./axios";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ChartDataset {
  label?: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  fill?: boolean;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface DashboardChartsData {
  bar_chart:  ChartData;
  line_chart: ChartData;
  pie_chart:  ChartData;
}

export interface DashboardSummary {
  companies:    { total: number; approved: number; pending: number };
  transactions: { total_count: number; total_volume: number; fraud_rate: number };
  security:     { fraud_checks: number; suspicious_checks: number; recent_alerts: unknown[] };
  integrity:    { latest_logs: unknown[] };
}

// ── Hook: Summary (Metrics) ────────────────────────────────────────────────────

export function useDashboardSummary() {
  const [data, setData]       = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/dashboard")
      .then((res) => setData(res.data.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

// ── Hook: Charts ───────────────────────────────────────────────────────────────

export function useDashboardCharts() {
  const [charts, setCharts]   = useState<DashboardChartsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/dashboard/charts")
      .then((res) => setCharts(res.data.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return { charts, loading };
}