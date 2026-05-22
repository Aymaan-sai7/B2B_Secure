export interface DashboardSummary {
  companies: {
    total: number;
    approved: number;
    pending: number;
  };

  transactions: {
    total_count: number;
    total_volume: number;
    fraud_rate: number;
  };

  security: {
    fraud_checks: number;
    suspicious_checks: number;

    recent_alerts: {
      id: number;
      message: string;
      severity: string;
      status: string;
      created_at: string;
    }[];
  };

  integrity: {
    latest_logs: {
      id: number;
      action: string;
      actor_id: number;
      ip_address: string;
      created_at: string;
    }[];
  };
}

export interface MonthlyTransactions {
  labels: string[];

  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];

  total: number;
  peak_month: string;
  peak_count: number;
}